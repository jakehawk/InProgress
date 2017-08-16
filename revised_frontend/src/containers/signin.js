import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Signin extends Component {

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
			)
		}
	}

	onSubmit(values) {
		this.props.signinUser(values);
	}

	render() {
		const { handleSubmit } = this.props

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
				{this.renderAlert()}
				<button input="submit" className="btn btn-primary">Sign In</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default reduxForm({
	form: 'SigninForm'
})(
	connect(mapStateToProps, actions)(Signin)
);


















