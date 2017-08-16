const assert = require('assert');

const User = require('../../models/user');
const Deck = require('../../models/deck');
const StandardSpell = require('../../models/standardSpell');

describe('Deck Subdocument', () => {
	let joe;
	let deck; 
	let mainSpell;
	let sideSpell;

	beforeEach(done => {
		joe = new User({
			username: 'Joe',
			email: 'joe@email.com',
			password: 'password'
		});
		deck = new Deck({
			name: 'UG Deck',
			format: 'Standard',
			colors: ['U', 'G']
		});
		mainSpell = new StandardSpell({
			name: 'Rashmi, Eternities Crafter',
			converted_mana_cost: 4,
			power: 2,
			toughness: 3,
			superTypes: ['Legendary'],
			subTypes: ['Elf', 'Druid'],
			uCount: 1,
			gCount: 1,
			image_url: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=417757&type=card'
		});
		sideSpell = new StandardSpell({
			name: 'Disallow',
			converted_mana_cost: 3,
			subTypes: ['Instant'],
			uCount: 2,
			image_url: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=423698&type=card'
		});

		joe.decks.push(deck);
		deck.mainBoard.push(mainSpell);
		deck.sideBoard.push(sideSpell);

		Promise.all([joe.save(), deck.save(), mainSpell.save(), sideSpell.save()])
			.then(() => done());
	});

	it('saves a relation between a user and a deck', done => {
		User.findOne({ username: 'Joe' })
			.populate('decks')
			.then(user => {
				assert(user.decks[0].name === 'UG Deck');
				done();
			});
	});

	it('saves a full relation graph', done => {
		User.findOne({ username: 'Joe' })
			.populate({
				path: 'decks',
				populate: {
					path: 'mainBoard sideBoard',
					model: 'standardSpell'
				}
			})
			.then(user => {
				done();
			});
	});
});












