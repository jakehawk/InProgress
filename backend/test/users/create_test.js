const assert = require('assert');

const User = require('../../models/user');

describe('Creating records', () => {
	it('saves a user', done => {
		const testUser = new User({ 
			username: 'test',
			email: 'test@email.com',
			password: 'password'
		});

		testUser.save()
			.then(() => {
				assert(!testUser.isNew);
				done();
			});
	});
});
