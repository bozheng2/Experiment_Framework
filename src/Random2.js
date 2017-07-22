/* eslint-disable no-undef */
import React, { Component } from 'react';
import request from 'superagent';
import axios from 'axios';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager'

// const DrawingExampleGoogleMap = withGoogleMap(props => (
//   <GoogleMap
//     defaultZoom={15}
//     defaultCenter={new google.maps.LatLng(40.114033, -88.224884)}
//   >
//     <DrawingManager
//       defaultDrawingMode={google.maps.drawing.OverlayType.RECTANGLE}
//       defaultOptions={{
//         drawingControl: true,
//         drawingControlOptions: {
//           position: google.maps.ControlPosition.TOP_CENTER,
//           drawingModes: [
//             google.maps.drawing.OverlayType.RECTANGLE,
//           ],
//         },
//       }}
//       onRectanglecomplete={this.handleRectangleComplete}
//     />
//   </GoogleMap>
// ));


// export default class Random extends Component {

//   render() {
//     return (
//       <DrawingExampleGoogleMap
//         containerElement={
//           <div style={{ height: 500 }} />
//         }
//         mapElement={
//           <div style={{ height: 500 }} />
//         }
//       />
//     );
//   }
// }




// class Random extends Component {
//     constructor(props){
//         super(props);
//         this.state={
//             bounds:0
//             };
//         //this.saveExperiment = this.saveExperiment.bind(this);   
//     }


// handleRectangleComplete = rectangle => {
//   console.log('active');
//   this.setState({bounds:rectangle.getBounds()});
//   console.log(rectangle.getBounds());
// }

render() {
        return(
          <div>
             <h1>haha</h1>
        </div>
            );
    }
}

export default Random;

