module.exports = {
	greeting(req, res) {
		res.send({ hi: 'there' });
	},

	auth(req, res) {
		res.send({ valid: 'token' });
	},
};
