import React, { Component } from 'react';

class MoreLocationList extends Component {

	displayMoreLocations(){
		let resultsArray = [];
		this.props.location.locations.map((item, i) => {
			resultsArray.push(<li key={i}>{[item.pointlat1+',',item.pointlng1+',',item.pointlat2+',',item.pointlng2]}</li>);
		});
		return resultsArray;
	}

	render() {
		return (
			<ul>
				{this.displayMoreLocations()}
			</ul>
		);
	}
}

export default MoreLocationList;