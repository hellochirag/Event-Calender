import passport from 'passport';
import LocalStrategy from 'passport-local';

import UserModel from '../models/user.model';

passport.use('local', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
}, (email, password, done) => {
	UserModel.findOne({ email })
		.then(async (user) => {
			if (!user) {
				return done(null, false, { errors: { message: 'email is invalid' } });
			}
			if (!(await user.comparePassword(password))) {
				return done(null, false, { errors: { message: 'password is invalid' } });
			}
			return done(null, user);
		}).catch(done);
}));
