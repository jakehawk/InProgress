import _ from 'lodash';
import { FETCH_DECKS } from '../actions/types';

export default function(state = {}, action) {
	// console.log(action.payload);
	// if (action.payload.length > 1) {
	// 	console.log(_.mapKeys(action.payload.data, '_id'));
	// }
	switch(action.type) {
		case FETCH_DECKS:
			let test = _.mapKeys(action.payload.data, '_id');
			return test;
		default:
			return state;
	}
}