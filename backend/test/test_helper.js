const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
	mongoose.connect('mongodb://localhost/how2mana_test', { useMongoClient: true });
	mongoose.connection
		.once('open', () => done())
		.on('error', err => {
			console.warn(`Warning: ${err}`);
		});
});

afterEach(done => {
	const { users, decks } = mongoose.connection.collections;

	users.drop(() => {
		decks.drop(() => {
			done();
		});
	});
});
