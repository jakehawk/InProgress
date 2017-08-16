import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Signup extends Component {

	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input 
					className="form-control"
					type={field.type}
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	onSubmit(values) {
		this.props.signupUser(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					label="Username"
					type="text"
					name="username"
					component={this.renderField}
				/>
				<Field
					label="Email"
					type="text"
					name="email"
					component={this.renderField}
				/>
				<Field
					label="Password"
					type="password"
					name="password"
					component={this.renderField}
				/>
				<Field
					label="Confirm Password"
					type="password"
					name="passwordConfirm"
					component={this.renderField}
				/>
				{this.renderAlert()}
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.username)
		errors.username = 'Please enter a username';

	if (!values.email)
		errors.email = 'Please enter a valid email';

	if (!values.password || values.password.length < 6)
		errors.password = 'Password must be at least 6 characters long'

	if (values.password !== values.passwordConfirm)
		errors.passwordConfirm = 'Passwords must match';

	return errors;
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default reduxForm({
	validate,
	form: 'SignupForm'
})(
	connect(mapStateToProps, actions)(Signup)
);
















