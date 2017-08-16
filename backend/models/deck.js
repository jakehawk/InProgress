const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeckSchema = new Schema({
	name: String,
	description: String,
	format: String,
	colors: [String],
	thumbnail: String,
	mainBoard: [{
		type: Schema.Types.ObjectId, 
		ref: 'standardSpell',
		quantity: { type: Number, default: 1 }
	}],
	sideBoard: [{
		type: Schema.Types.ObjectId, 
		ref: 'standardSpell',
		quantity: { type: Number, default: 1 }
	}],
	user: { type: Schema.Types.ObjectId, ref: 'user' }
});

DeckSchema.post('remove', (doc) => {
	const User = mongoose.model('user');

	User.update(
		{ _id: doc.user },
		{ $pull: { decks: doc._id } })
		.then(user => console.log(user));
});

const Deck = mongoose.model('deck', DeckSchema);

module.exports = Deck;
