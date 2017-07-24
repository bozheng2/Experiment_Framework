/* eslint-disable no-undef */
import React, { Component } from 'react';
import request from 'superagent';
import axios from 'axios';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import createHistory from 'history/createBrowserHistory'
import { withGoogleMap, GoogleMap, Marker, Rectangle} from "react-google-maps";
import Helmet from "react-helmet";
import SearchBox from 'react-google-maps/lib/places/SearchBox';

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
};

const TimeConditions = JSON.parse(localStorage.getItem('Triggerbytimes')) || [];
const count5 = (TimeConditions.length);
const option_id5 = Array.from(Array(count5).keys());
var selected5 = 0;

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}

    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Customized your placeholder"
      inputStyle={INPUT_STYLE}
    />
  </GoogleMap>
));


class Preview extends Component {
    constructor(props) {
       super(props);
       this.state = {
            testResult:"",
            bounds: null,
            center: {
              lat: 47.6205588,
              lng: -122.3212725,
            },
            markers: [],
            Basics: JSON.parse(localStorage.getItem('Basics')) || [],
            FirstTimeEnters: JSON.parse(localStorage.getItem('FirstTimeEnters')) || [],
            TriggerByConditions: JSON.parse(localStorage.getItem('TriggerByConditions')) || [],
            markers: [{
                position: {
                  lat: 25.0112183,
                  lng: 121.52067570000001,
                },
            
             defaultAnimation: 2,
            }],
            marker_count: 0,
            marker_coordinate: "",
            lat:0,
            lng:0,
       };
       this.handleChange = this.handleChange.bind(this);  
       this.handleMapLoad = this.handleMapLoad.bind(this);
       this.handleMapClick = this.handleMapClick.bind(this);
       this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
       this.testTrigger = this.testTrigger.bind(this);
       this.handleMapMounted = this.handleMapMounted.bind(this);
       this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
       this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
       this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
       this.continue = this.continue.bind(this); 
    }

 continue(){
      this.props.history.push('/');
    }
  
 handleMapMounted(map) {
    this._map = map;
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();

    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers,
    });
  }



testTrigger(){
    let resultsArray = [];
    var triggerOnEnter = 0;
    var triggerOnExit = 0;
    var inside = 0;
    var selectedTime = this.TimeCondition.value;
    var triggerbyconditions = JSON.parse(localStorage.getItem('TriggerByConditions')) || [];
    var triggerbylocations = JSON.parse(localStorage.getItem('Triggerbylocations')) || [];
    var index = 0;
    var count1 = (triggerbyconditions.length);
    var count2 = (triggerbylocations.length);
    
    for (var i = 0; i < count1; i++){
        var currentCondition = triggerbyconditions[i];
        console.log(currentCondition);
        if(currentCondition.TimeCondition === selectedTime){
            for(var j = 0; j < count2; j++){
                var currentLocation = triggerbylocations[j];
                console.log(currentLocation);
                if(currentCondition.LocationCondition === currentLocation.conditionname){
                    var count3 = (currentLocation.coordinates.length);
                    for(var k = 0; k < count3 ; k++){
                        var currentCoordinate = JSON.stringify(currentLocation.coordinates[k]);
                        console.log(currentCoordinate);
                        var currentCoordinateParse = JSON.parse(currentCoordinate);
                        var east = Number(currentCoordinateParse.east);
                        var west = Number(currentCoordinateParse.west);
                        var south = Number(currentCoordinateParse.south);
                        var north = Number(currentCoordinateParse.north);
                        var lat = Number(this.state.lat);
                        var lng = Number(this.state.lng);
                        if(lat > south && lat < north && lng > west && lng < east){
                          inside = 1;
                          triggerOnEnter = 1;
                          console.log(inside);
                          console.log("inside");
                          index = i;
                          break;
                        }
                    }
                }
            }

        }
          
    }
    resultsArray.push("TrueFalseTask :");
    resultsArray.push(triggerbyconditions[index].TrueFalseTask+',');
    resultsArray.push("MultipleChoiceTask :");
    resultsArray.push(triggerbyconditions[index].MultipleChoiceTask+',');
    resultsArray.push("MessageTask :");
    resultsArray.push(triggerbyconditions[index].MessageTask+',');
    console.log(resultsArray);   
    this.setState({
     testResult: resultsArray,
    });
    
}


handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  
 handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), 
      },
    ];
     
    if (this.state.marker_count === 0) {
       this.setState({
      markers: nextMarkers,
      marker_count: 1,
      marker_coordinate: JSON.stringify(event.latLng),
      
      
    });
       //console.log(event.latLng);
       //console.log(this.state.marker_coordinate);
    var coordinate = JSON.parse(this.state.marker_coordinate);
    console.log(coordinate);
       this.setState({
        lat: coordinate.lat,
        lng: coordinate.lng,
    });
       //console.log(this.state.marker_coordinate);
       //console.log(this.state.lat);
       //console.log(this.state.lng);
    }
  }

  handleMarkerRightClick(targetMarker) {
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
      marker_count: 0, 
      marker_coordinate: "",
      lat: 0,
      lng: 0,
    });
    console.log(this.state.marker_coordinate);
  }


handleChange(e) {

    this.setState({ display: e.target.value });

 }

displayBasics() {
    let resultsArray = [];

    this.state.Basics.map((Basic, i) => {
      resultsArray.push(
        <div className="col-md-6 col-md-offset-3">
          <div className="thumbnail">
            <div className="caption">

              <h2>Basic Information</h2>
              <h4>Title:</h4>
              <h3>{Basic.title}</h3>
              <h3>{Basic.version}</h3>
              <h3>{Basic.contact}</h3>
              <p>{Basic.studydescription}</p>
              <p>{Basic.instruction}</p>
              <p>{Basic.consentform}</p>
            </div>
          </div>
        </div>
        );
    });
    return resultsArray;
  }

displayFirstTimeEnters() {
    let resultsArray = [];

    this.state.FirstTimeEnters.map((FirstTimeEnter, i) => {
      resultsArray.push(
        <div className="col-md-6 col-md-offset-3">
          <div className="thumbnail">
            <div className="caption">

              <h2>FirstTimeEnter</h2>
              <p>{FirstTimeEnter.instruction}</p>
              <h3>{FirstTimeEnter.TrueFalseTask}</h3>
              <h3>{FirstTimeEnter.MultipleChoiceTask}</h3>
              <h3>{FirstTimeEnter.MessageTask}</h3>
            </div>
          </div>
        </div>
        );
    });
    return resultsArray;
  }

displayTriggerByConditions() {
    let resultsArray = [];

    this.state.TriggerByConditions.map((TriggerByCondition, i) => {
      resultsArray.push(
        <div className="col-md-6 col-md-offset-3">
          <div className="thumbnail">
            <div className="caption">

              <h2>TriggerByCondition</h2>
              <h3>{TriggerByCondition.LocationCondition}</h3>
              <h3>{TriggerByCondition.TimeCondition}</h3>
              <h3>{TriggerByCondition.TrueFalseTask}</h3>
              <h3>{TriggerByCondition.MultipleChoiceTask}</h3>
              <h3>{TriggerByCondition.MessageTask}</h3>
            </div>
          </div>
        </div>
        );
    });
    return resultsArray;
  }

render() {
        return(
            

            <div className="col-md-6 col-md-offset-3">

              <h1> Experiment Preview </h1>
              {this.displayBasics()}
              {this.displayFirstTimeEnters()}
              {this.displayTriggerByConditions()}
                   

                  

               <div className="col-md-6 col-md-offset-3">
                   <h2>Test Trigger Condition</h2>
                   <h3>Please select time condition</h3>
                    <select  ref = {(input)=> this.TimeCondition = input}

                             id = "TimeCondition" defaultValue={selected5}>
                      {option_id5.map(id =>
                            <option  value={TimeConditions[id].conditionname}>{TimeConditions[id].conditionname}</option>

                      )}
                       <option value="notrequired">Not Required</option>
                    </select>


                    <h3>Please select a location</h3>
                    <h3>Hint:</h3>
                    <h4>Click on map to place a maker.</h4>
                    <h4>Right click on marker to remove it.</h4>
                    <h4>{this.state.marker_coordinate}</h4>
                    
                    <button type="button" className="btn btn-info" onClick = {this.testTrigger} > Test </button>
                    <h2>The following tasks will be triggered:</h2>
                    {this.state.testResult}
        <div style={{height: 100}}>
        <Helmet
          title="Getting Started"
        />
        <GettingStartedGoogleMap
          containerElement={
            <div style={{ height: 100 }} />
          }
          mapElement={
            <div style={{ height: 400 }} />
          }

          center={this.state.center}
          onMapMounted={this.handleMapMounted}
          onBoundsChanged={this.handleBoundsChanged}
          onSearchBoxMounted={this.handleSearchBoxMounted}
          bounds={this.state.bounds}
          onPlacesChanged={this.handlePlacesChanged}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
        />
      </div>        
  </div>   
            <button type="button" className="btn btn-success" onClick = {this.continue}> Publish Experiment </button>
            </div>
            );
    }
}
export default Preview;