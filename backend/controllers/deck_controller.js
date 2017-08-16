// const checkUserAuth = require('../services/checkUserAuth');

const Deck = require('../models/deck');
const User = require('../models/user');
const Spell = require('../models/standardSpell');

module.exports = {
	async createDeck(req, res) {
		const username = req.user.username;
		const deck = new Deck(req.body);

		const user = await User.findOne({ username });
		deck.user = user;
		user.decks.push(deck);

		await user.save();
		const newDeck = await deck.save();

		res.send({ newDeck });
	},

	async allDecks(req, res) {
		const decks = await Deck.find({})
			.populate({
				path: 'user',
				model: 'user',
				select: 'username'
			})
			.populate({
				path: 'mainBoard',
				model: 'standardSpell',
				select: 'name'
			})
			.sort('-date');

		res.send(decks);
	},

	async getDeck(req, res) {
		const deckId = req.params.id;

		const deck = await Deck.findOne({ _id: deckId });
		res.send(deck);
	},

	async deleteDeck(req, res) {
		const deckId = req.params.id;
		const user = req.user;
		console.log(user._id);

		const deck = await Deck.findOne({ _id: deckId })
			.populate({
				path: 'user',
				model: 'user',
				select: 'username'
			});

		console.log(deck);

		if (user._id.toString() === deck.user._id.toString()) {
			deck.remove();
			res.send(deck);
		} else {
			res.send({ warning: 'Unauthorized User' });
		}
	},

	editDeck(req, res) {
		const deckId = req.params.id;
		console.log(req.body);

		checkUserAuth(req.user, deckId)
			.then(() => {
				Deck.findOne({ _id: deckId })
					.then(deck => {
						if (req.body) {
							for (let prop in req.body) {
								deck[prop] = req.body[prop];
							}
							deck.save()
								.then(() => res.send(deck));
						}
					});
			})
			.catch(() => res.send({ warning: 'Unauthorized User' }));
	}, 

	addSpellToMain(req, res) {
		const deckId = req.params.id;
		const { spellName, qty, setThumbnail } = req.body;

		checkUserAuth(req.user, deckId)
			.then(() => {
				Spell.findOne({ name: spellName })
					.then(spell => {
						if (spell) {
							Deck.findOne({ _id: deckId })
								.then(deck => {
									let inDeckQty = 0;
									deck.mainBoard.forEach(inDeckSpell => {
										if (inDeckSpell.toString() === spell._id.toString()) {
											inDeckQty++;
										}
									});
									if (inDeckQty < qty) {
										for (let i = inDeckQty; i < qty; i++) {
											deck.mainBoard.push(spell);
										}
									} else if (inDeckQty > qty) {
										for (let i = deck.mainBoard.length - 1; i >= 0; i -= 1) {
											if (deck.mainBoard[i].toString() === spell._id.toString() && inDeckQty > qty) {
												deck.mainBoard.splice(i, 1);
												inDeckQty -= 1;
											}
										}
									}
									if (setThumbnail) deck.thumbnail = spell.image_url;

									deck.save()
										.then(() => res.send(spell));
								});
						}
					});
			})
			.catch(() => res.send({ warning: 'Unauthorized User' }));
	}
};

const checkUserAuth = (user, deckId) => {
	return new Promise((resolve, reject) => {
		Deck.findOne({ _id: deckId })
			.populate({
					path: 'user',
					model: 'user',
					select: 'username'
				})
			.then(deck => {
				if (user._id.toString() === deck.user._id.toString()) {
					resolve();
				} else {
					reject();
				}
			});
	});
};
