import React, { Component } from 'react';

class MultipleChoiceList extends Component {

	displayMultipleChoice(){
		let resultsArray = [];

		this.props.multiplechoice.multiplechoice.map((item, i) => {
			resultsArray.push(<li key={i}>{item.question} - {item.choices}</li>);
		});
		return resultsArray;
	}

	render() {
		return (
			<ul>
				{this.displayMultipleChoice()}
			</ul>
		);
	}
}

export default MultipleChoiceList;