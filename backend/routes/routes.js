const passport = require('passport');
const mongoose = require('mongoose');

require('../services/passport');
const { signin, signup } = require('../controllers/authentication');
const { greeting, auth } = require('../controllers/temp_controller');
const { 
	createDeck, 
	allDecks, 
	getDeck,
	deleteDeck, 
	editDeck, 
	addSpellToMain 
	} = require('../controllers/deck_controller');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


module.exports = app => {
	app.get('/', greeting);

	app.get('/testAuth', requireAuth, auth);

	app.get('/decks', allDecks);

	app.get('/deck/:id', getDeck);

	app.post('/signin', requireSignin, signin);

	app.post('/signup', signup);

	app.post('/deck/add', requireAuth, createDeck);

	app.put('/deck/edit/:id', requireAuth, editDeck);

	app.put('/deck/main/:id', requireAuth, addSpellToMain);

	app.delete('/deck/delete/:id', requireAuth, deleteDeck);

	app.delete('/user/delete/:id', requireAuth, (req, res) => {
		const User = mongoose.model('user');
		const userId = req.params.id;

		User.findById(userId)
			.then(user => user.remove());
	});
};







