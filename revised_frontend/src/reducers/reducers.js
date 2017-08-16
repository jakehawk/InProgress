import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth_reducer';
import decks from './deck_reducers';

const rootReducer = combineReducers({
	form,
	auth,
	decks
});

export default rootReducer;
