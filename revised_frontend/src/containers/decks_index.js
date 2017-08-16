import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchDecks } from '../actions';

class DecksIndex extends Component {
	componentDidMount() {
		this.props.fetchDecks();
	}

	renderDecks() {
		return _.map(this.props.decks, deck => {
			return (
				<li key={deck._id} className="deck-summary">
					<div>
						{deck.name} 
						{deck.mainBoard.length} 
						{deck.user._id} 
					</div>
				</li>
			);
		});
	}

	render() {
		return (
			<div>
				<h3>Decks</h3>
				<ul className="deck-index">
					{this.renderDecks()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps({ decks }) {
	return { decks };
}

export default connect(mapStateToProps, { fetchDecks })(DecksIndex);