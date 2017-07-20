import React, { Component } from 'react';

class MoreChoice extends Component {

	constructor(props) {
	  super(props);
	  this.state = {};
	  this.addMoreChoices = this.addMoreChoices.bind(this);
	}

	addMoreChoices() {
		this.props.addMoreChoice(this.choicecontent.value);
		this.choicecontent.value = "";	
	}	

	render() {
		return (
		   	<div className="form-inline form-group">
                     		<input type="text"
                     				ref={(input) => {this.choicecontent = input;}}
                     				className="form-control" 
                     				id="choicecontent" 
                     				placeholder="Enter choice content" />
                 			<button className="btn btn-success" type="button" onClick={this.addMoreChoices}>Add more choices</button>
		   </div>
		);
	}
}

export default MoreChoice;






