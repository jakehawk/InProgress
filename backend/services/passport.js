const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Strategy, ExtractJwt } = require('passport-jwt');

const User = require('../models/user');
const config = require('../config');

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	// Verify this email and password
	User.findOne({ email }, (findErr, user) => {
		if (findErr) return done(findErr);
		if (!user) return done(null, false);

		// Compare passwords
		user.comparePassword(password, (passwordErr, isMatch) => {
			if (passwordErr) return done(passwordErr);
			if (!isMatch) return done(null, false);

			return done(null, user);
		});
	});
});

// Setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret,
};

// Create JWT Strategy
const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
	// See if the user ID in the payload exists in our DB
	// If it does, call 'done' with that user
	// otherwise, call 'done' without a user object
	const sub = payload.sub;

	User.findById(sub, (findErr, user) => {
		if (findErr) return done(findErr, false);

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
