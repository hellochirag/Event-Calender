import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		default: '',
	},
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

UserSchema.pre('save', function (next) {
	const user = this;
	if (!this.isModified('password')) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
	return new Promise((res, rej) => {
		bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
			if (isMatch) res(true);
			res(false);
		});
	})
};

UserSchema.methods.generateJWT = function () {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 60);

	return jwt.sign({
		email: this.email,
		firstName: this.firstName,
		lastName: this.lastName,
		id: this._id,
		exp: parseInt(expirationDate.getTime() / 1000, 10),
	}, process.env.SECRET);
}

UserSchema.methods.toAuthJSON = function () {
	return {
		_id: this._id,
		email: this.email,
		firstName: this.firstName,
		lastName: this.lastName,
		token: this.generateJWT(),
	};
};

const User = mongoose.model('users', UserSchema);
// var User = module.exports = mongoose.model('users', UserSchema);

User.createUser = (newUser) => {
	return new Promise((res, rej) => {
		User(newUser).save((err, data) => {
			if (err) rej(err);
			res(data);
		});
	});
}

User.getUser = (query) => {
	return new Promise((res, rej) => {
		User.findOne(query, (err, data) => {
			if (err) rej(err);
			res(data);
		});
	});
}

export default User;
