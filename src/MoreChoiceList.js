import React, { Component } from 'react';

class MoreChoiceList extends Component {

	displayMoreChoices(){
		let resultsArray = [];
		this.props.choice.choices.map((item, i) => {
			resultsArray.push(<li key={i}>{item.choicecontent}</li>);
		});
		return resultsArray;
	}

	render() {
		return (
			<ul>
				{this.displayMoreChoices()}
			</ul>
		);
	}
}

export default MoreChoiceList;