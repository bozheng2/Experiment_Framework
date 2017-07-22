/* eslint-disable no-undef */
import React, { Component } from 'react';
import request from 'superagent';
import axios from 'axios';
import {ButtonToolbar, DropdownButton, MenuItem, Checkbox} from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker, Rectangle} from "react-google-maps";
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager';

const DrawingExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={new google.maps.LatLng(40.114033, -88.224884)}
  >
    <DrawingManager
      defaultDrawingMode={google.maps.drawing.OverlayType.RECTANGLE}
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.RECTANGLE,
          ],
        },
      }}  
        onRectangleComplete={props.onRectangleComplete}
    />
  </GoogleMap>
));

class Random extends Component {
    constructor(props){
        super(props);
        this.state={
            bounds:0,
            coords:[],
            Coords: JSON.parse(localStorage.getItem('Coords')) || [],
            newCoord: {
               coordinate:[]
               },
            };
      this.handleRectangleComplete = this.handleRectangleComplete.bind(this); 
      this.saveCoord = this.saveCoord.bind(this);
    }

saveCoord() {
       
        let newCoord = this.state.newCoord;
        newCoord.coordinate = this.state.coords;
       
        this.setState(newCoord);

        let Coords = this.state.Coords;
        Coords.push(newCoord);

    this.setState({Coords});
    localStorage.setItem('Coords', JSON.stringify(Coords));
    //this.props.history.push('/task');
    }
    

handleRectangleComplete = rectangle => {
  var bounds = JSON.stringify(rectangle.getBounds());
  console.log(bounds);
  this.state.coords.push(bounds);
  console.log(this.state.coords)
}

render() {
        return(
          <div>
        <DrawingExampleGoogleMap 
          
        containerElement={
          <div style={{ height: 500 }} />
        }
        mapElement={
          <div style={{ height: 500 }} />
        }
        onRectangleComplete = {this.handleRectangleComplete}
      />
       <button className="btn btn-info" type="button" onClick={this.saveCoord}> Save </button>
        </div>
            );
    }
}

export default Random;