//Models
import UserModel from '../models/user.model';
import passport from 'passport';

const UserControllers = {
	signUp: async (req, res) => {
		const user = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			userName: req.body.userName,
			email: req.body.email,
			password: req.body.password,
		};
		let newUser = {};
		try {
			newUser = await UserModel.createUser(user);
		} catch (error) {
			let errorMessage = error.message;
			if (error.code === 11000) {
				errorMessage = 'Username or email is taken'
			}
			return res.status(500).json({
				isError: true,
				errorMessage,
				error,
			})
		}

		res.status(200).json({
			isError: false,
			data: newUser,
			message: 'Succesfully sign up',
		});
	},

	login: (req, res, next) => {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(422).json({
				isError: false,
				data: newUser,
				message: 'Email and password are required.',
			});
		}

		return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
			if (err) {
				return next(err);
			}
			if (passportUser) {
				return res.json({ isError: false, data: passportUser.toAuthJSON(), message: 'Succesfully Login' });
			}
			return res.json({ isError: true, errorMessage: 'Something went wrong' });
		})(req, res, next);
	}

};

export default UserControllers;
