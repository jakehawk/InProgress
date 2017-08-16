const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');

const User = mongoose.model('user');
const Deck = mongoose.model('deck');

describe('Deck controller', () => {
	xit('POST to /deck/add creates a new deck for a user', done => {
		request(app)
			.post('/signup')
			.send({ 
				username: 'test',
				email: 't@t.com', 
				password: 'password'
			})
			.then(res => {
				const token = res.body.token;

				request(app)
					.post('/deck/add')
					.set('Authorization', token)
					.send({ name: 'test' })
					.then(res => {
						console.log(res.body);
					});
				done();
			});
	});
});
