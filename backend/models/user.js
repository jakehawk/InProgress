const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


const Schema = mongoose.Schema;

// Define our model
const UserSchema = new Schema({
	username: String,
	email: { type: String, unique: true, lowercase: true },
	password: String,
	decks: [{
		type: Schema.Types.ObjectId,
		ref: 'deck'
	}]
});

UserSchema.pre('remove', next => {
	const Deck = mongoose.model('deck');

	Deck.remove({ _id: { $in: this.decks } })
		.then(() => next());
});

// On Save Hook, encrypt password
// Before saving a model, run this function
UserSchema.pre('save', function (next) {
	// Get access to user model
	const user = this;

	// generate a salt then run callback
	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);

		// Hash(encrypt) our password using the salt
		bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
			if (hashErr) return next(hashErr);
			
			// overwrite plain text password with encrypted password
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return callback(err);

		callback(null, isMatch);
	});
};

// Create the model class
const User = mongoose.model('user', UserSchema);

// Export the model
module.exports = User;
