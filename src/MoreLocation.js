import React, { Component } from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import ReactDOM from 'react-dom';


const coords = {
  lat: 40.114033, 
  lng: -88.224884
};
 
const params = {v: '3.exp', key: 'AIzaSyAYfHajEX8bPOGdxvReoDxcXGBC2rMChrw'};

class MoreLocation extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	       pointlat1: 0,
               pointlng1: 0,
               pointlat2: 0,
               pointlng2: 0
	  };
	  this.addMoreLocations = this.addMoreLocations.bind(this);
	  this.onDragEnd1 = this.onDragEnd1.bind(this); 
      this.onDragEnd2 = this.onDragEnd2.bind(this);  
	}

	addMoreLocations() {
		this.props.addMoreLocation([this.state.pointlat1,this.state.pointlng1,this.state.pointlat2,this.state.pointlng2]);
	}	

	 onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }
 
 
  onDragEnd1(e) {
    const { latLng } = e;
    console.log(latLng.lat());
    console.log(latLng.lng());
    this.setState({pointlat1:latLng.lat(), pointlng1:latLng.lng()});
  }
  onDragEnd2(e) {
    const { latLng } = e;
    console.log(latLng.lat());
    console.log(latLng.lng());
    this.setState({pointlat2:latLng.lat(), pointlng2:latLng.lng()});
  }
 
  onCloseClick() {
    console.log('onCloseClick');
  }
 
  onClick(e) {
    console.log('onClick', e);
  }
 

	render() {
		return (
      <div>
      <Gmaps
        width={'800px'}
        height={'600px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={18}
        loadingMessage={''}
        params={params}
        onMapCreated={this.onMapCreated}>
        <Marker
          lat={coords.lat}
          lng={coords.lng}
          draggable={true}
          onDragEnd={this.onDragEnd1} />
        <Marker
          lat={coords.lat}
          lng={coords.lng}
          draggable={true}
          onDragEnd={this.onDragEnd2} />
        
      </Gmaps>

      <div>
      {this.state.pointlat1}
      ,
      {this.state.pointlng1}
      </div>
       <div>
      {this.state.pointlat2}
      ,
      {this.state.pointlng2}
      </div>
      <button className="btn btn-success" type="button" onClick={this.addMoreLocations}>Add more locations</button>
      </div>
    );
	}
}

export default MoreLocation;