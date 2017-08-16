import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
	renderAuthLinks() {
		if (this.props.authenticated) {
			return [
				<li className="nav-item" key={1}>
					<Link to="/" className="nav-link">My Decks</Link>
				</li>,
				<li className="nav-item" key={2}>
					<Link to="/signout" className="nav-link">Log Out</Link>
				</li>
			];
		} else {
			return [
				<li className="nav-item" key={1}>
					<Link to="/signin" className="nav-link">Log In</Link>
				</li>,
				<li className="nav-item" key={2}>
					<Link to="/signup" className="nav-link">Sign Up</Link>
				</li>
			];
		}
	}

	render() {
		return (
			<nav className="navbar">
				<div className="nav-space"></div>
				<Link to="/" className="nav-home">
					how2mana
				</Link>
				<ul>
					{this.renderAuthLinks()}
				</ul>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps)(Header);