import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
	FETCH_DECKS,
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR,
	FETCH_MESSAGE
} from './types';

const BASE_URL = 'http://localhost:3050';

export function fetchDecks() {
	const request = axios.get(`${BASE_URL}/decks`);

	return {
		type: FETCH_DECKS,
		payload: request
	};
}

export function signinUser({ email, password }) {
	return (dispatch) => {
		// Submit email/password to the server
		axios.post(`${API_URL}/signin`, { email, password })
			.then(res => {
				// If request is good...
				// - Update state to indicate user is authenticated
				dispatch({ type: AUTH_USER });
				// - Save the JWT token
				localStorage.setItem('token', res.data.token);
				// - Redirect to the route '/feature'
				browserHistory.push('/');
			})
			.catch(() => {
				// If request is bad...
				// - Show an error to the user
				dispatch(authError('Bad Login Info'));
			});
	}
}

export function signupUser({ username, email, password }) {
	return function(dispatch) {
		axios.post(`${BASE_URL}/signup`, { username, email, password })
			.then(res => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem('token', res.data.token);
				browserHistory.push('/');
			})
			.catch(res => dispatch(authError(res.data.err)))
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function signoutUser() {
	localStorage.removeItem('token');


	return { type: UNAUTH_USER };
}

export function fetchMessage() {
	return function(dispatch) {
		axios.get(BASE_URL, {
			headers: { authorization: localStorage.getItem('token') }
		})
			.then(res => {
				dispatch({
					type: FETCH_MESSAGE,
					payload: res.data.message
				});
			});
	}
}



// REDUX PROMISE STRUCTURE
// export function fetchMessage() {
// 	const request = axios.get(API_URL, {
// 		headers: { authorization: localStorage.getItem('token') }
// 	});

// 	return {
// 		type: FETCH_MESSAGE,
// 		payload: request
// 	};
// }








