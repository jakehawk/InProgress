const Deck = require('../models/deck');

module.exports = async (user, deckId) => {
	const deck = await Deck.findOne({ _id: deckId })
		.populate({
			path: 'user',
			model: 'user',
			select: 'username'
		});
	console.log(deck);
	if (user._id.toString() === deck.user._id.toString()) {
		return true;
	}

	return false;
};
