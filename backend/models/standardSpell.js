const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StandardSpellSchema = new Schema({
	name: String,
	converted_mana_cost: Number,
	power: String,
	toughness: String,
	colors: [String],
	superTypes: [String],
	subTypes: [String],
	wCount: { type: Number, required: true, default: 0 },
	uCount: { type: Number, required: true, default: 0 },
	bCount: { type: Number, required: true, default: 0 },
	rCount: { type: Number, required: true, default: 0 },
	gCount: { type: Number, required: true, default: 0 },
	cCount: { type: Number, required: true, default: 0 },
	image_url: String,
});

const StandardSpell = mongoose.model('standardSpell', StandardSpellSchema);

module.exports = StandardSpell;
