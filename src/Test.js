/* eslint-disable no-undef */
import React, { Component } from 'react';
import MoreLocation from './MoreLocation';
import MoreLocationList from './MoreLocationList';
import request from 'superagent';
import axios from 'axios';
import {ButtonToolbar, DropdownButton, MenuItem, Checkbox} from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker, Rectangle} from "react-google-maps";
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager';
import createHistory from 'history/createBrowserHistory'

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

class Test extends Component {
    constructor(props){
        super(props);
        this.state={
               bounds:0,
               coords:[],
               //Coords: JSON.parse(localStorage.getItem('Coords')) || [],
               // newCoord: {
               //    coordinate:[]
               // },
               pointlat1: 0,
               pointlng1: 0,
               pointlat2: 0,
               pointlng2: 0,
            Triggerbylocations: JSON.parse(localStorage.getItem('Triggerbylocations')) || [],
            Triggerbytimes: JSON.parse(localStorage.getItem('Triggerbytimes')) || [],
            newTriggerbylocation: {
              conditionname: "conditionname",
              onEnter: false,
              onExit: false,
              coordinates: []
            },
            newTriggerbytime: {
              conditionname: "conditionname",
              period: "period",
              repeatevery1: "",
              repeatevery2: "",
              samplingmethod:"",
              frequency1:"",
              frequency2:"",
              minimumbetween:"",
              between1:"",
              between2:"",
              between3:""
            },  
            display:"triggerbylocation"
        };  
        // this.onDragEnd1 = this.onDragEnd1.bind(this); 
        // this.onDragEnd2 = this.onDragEnd2.bind(this);     
        this.handleChange = this.handleChange.bind(this);  
        this.continue = this.continue.bind(this);  
        this.submitTriggerbylocation = this.submitTriggerbylocation.bind(this); 
        this.submitTriggerbytime = this.submitTriggerbytime.bind(this); 
        this.handleOnEnterChecked = this.handleOnEnterChecked.bind(this); 
        this.handleOnExitChecked = this.handleOnExitChecked.bind(this); 
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.handleRepeatEvery1Change = this.handleRepeatEvery1Change.bind(this);
        this.handleRepeatEvery2Change = this.handleRepeatEvery2Change.bind(this);
        this.handleSamplingMethodChange = this.handleSamplingMethodChange.bind(this);
        this.handleFrequency1Change = this.handleFrequency1Change.bind(this);
        this.handleFrequency2Change = this.handleFrequency2Change.bind(this);
        this.handleMinimumBetweenChange = this.handleMinimumBetweenChange.bind(this);
        this.handleBetween1Change = this.handleBetween1Change.bind(this);
        this.handleBetween2Change = this.handleBetween2Change.bind(this);
        this.handleBetween3Change = this.handleBetween3Change.bind(this);
        this.handleRectangleComplete = this.handleRectangleComplete.bind(this); 
        //this.saveCoord = this.saveCoord.bind(this);
    }   
 
    onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }
 
  // onDragEnd1(e) {
  //   const { latLng } = e;
  //   console.log(latLng.lat());
  //   console.log(latLng.lng());
  //   this.setState({pointlat1:latLng.lat(), pointlng1:latLng.lng()});
  // }
  // onDragEnd2(e) {
  //   const { latLng } = e;
  //   console.log(latLng.lat());
  //   console.log(latLng.lng());
  //   this.setState({pointlat2:latLng.lat(), pointlng2:latLng.lng()});
  // }
 
 
  onClick(e) {
    console.log('onClick', e);
  }


    handleChange(e) {
      this.setState({ display: e.target.value });
    }

    continue(){
      this.props.history.push('/manage');
    }

    // addMoreLocation(pointlat1, pointlng1, pointlat2, pointlng2) {
    // let newTriggerbylocation = this.state.newTriggerbylocation;
    // newTriggerbylocation.locations.push({pointlat1:pointlat1,pointlng1:pointlng1,pointlat2:pointlat2,pointlng2:pointlng2});
    // this.setState({newTriggerbylocation: newTriggerbylocation});
    // }

submitTriggerbylocation() {
    
    let newTriggerbylocation = this.state.newTriggerbylocation;
    newTriggerbylocation.conditionname = this.conditionname.value;
    newTriggerbylocation.onEnter = this.state.onEnter;
    newTriggerbylocation.onExit = this.state.onExit;
    newTriggerbylocation.coordinates = this.state.coords;
    this.setState({newTriggerbylocation}); 

    let Triggerbylocations = this.state.Triggerbylocations;
    Triggerbylocations.push(newTriggerbylocation);

    this.setState({Triggerbylocations});
    localStorage.setItem('Triggerbylocations', JSON.stringify(Triggerbylocations));
    this.state.coords = [];
    window.location.reload();
  }

handleOnEnterChecked(e){
        const val = e.target.value;
        this.setState({
            onEnter : val
        })
    }
handleOnExitChecked(e){
        const val = e.target.value;
        this.setState({
            onExit : val
        })
    }

submitTriggerbytime() {
    
    let newTriggerbytime = this.state.newTriggerbytime;
    newTriggerbytime.conditionname = this.conditionname.value;
    newTriggerbytime.period = this.period.value;
    newTriggerbytime.repeatevery1 = this.repeatevery1.value;
    newTriggerbytime.repeatevery2 = this.repeatevery2.value;
    newTriggerbytime.samplingmethod = this.samplingmethod.value;
    newTriggerbytime.frequency1 = this.frequency1.value;
    newTriggerbytime.frequency2 = this.frequency2.value;
    newTriggerbytime.minimumbetween = this.minimumbetween.value;
    newTriggerbytime.between1 = this.between1.value;
    newTriggerbytime.between2 = this.between2.value;
    newTriggerbytime.between3 = this.between3.value;
    
    this.setState({newTriggerbytime}); 

    let Triggerbytimes = this.state.Triggerbytimes;

    Triggerbytimes.push(newTriggerbytime);
    this.setState({Triggerbytimes});
    localStorage.setItem('Triggerbytimes', JSON.stringify(Triggerbytimes));
    window.location.reload();
  }

handlePeriodChange(e){
        const val = e.target.value;
        this.setState({
            period : val
        })
    }
handleRepeatEvery1Change(e){
        const val = e.target.value;
        this.setState({
            repeatevery1 : val
        })
    }

handleRepeatEvery2Change(e){
        const val = e.target.value;
        this.setState({
            repeatevery2 : val
        })
    }

handleSamplingMethodChange(e){
        const val = e.target.value;
        this.setState({
            samplingmethod : val
        })
    }

handleFrequency1Change(e){
        const val = e.target.value;
        this.setState({
            frequency1 : val
        })
    }

handleFrequency2Change(e){
        const val = e.target.value;
        this.setState({
            frequency2 : val
        })
    }

handleMinimumBetweenChange(e){
        const val = e.target.value;
        this.setState({
            minimumbetween : val
        })
    }

handleBetween1Change(e){
        const val = e.target.value;
        this.setState({
            between1 : val
        })
    }

handleBetween2Change(e){
        const val = e.target.value;
        this.setState({
            between2 : val
        })
    }

handleBetween3Change(e){
        const val = e.target.value;
        this.setState({
            between3 : val
        })
    }

handleRectangleComplete = rectangle => {
 // var bounds = JSON.stringify(rectangle.getBounds());
  var bounds = rectangle.getBounds();
  console.log(bounds);
  this.state.coords.push(bounds);
  console.log(this.state.coords);
}

// saveCoord() {
       
//         let newCoord = this.state.newCoord;
//         newCoord.coordinate = this.state.coords;
       
//         this.setState(newCoord);

//         let Coords = this.state.Coords;
//         Coords.push(newCoord);

//     this.setState({Coords});
//     localStorage.setItem('Coords', JSON.stringify(Coords));
//     //this.props.history.push('/task');
//     }



//     render() {
//       if(this.state.display === "triggerbylocation") {
//         return (
//           <div className="col-md-6 col-md-offset-3">
                  
//                    <h1> Notification Condition </h1> 
                
//                    <div className="form-group">
//                         <select className="custom-select mb-2 mr-sm-2 mb-sm-0" onChange={this.handleChange}>
//                             <option value="triggerbylocation">Trigger by location</option>
//                             <option value="triggerbytime">Trigger by time</option> 
//                         </select>
//                         <h3>Trigger by location</h3>
//                    </div>

//                     <div>
//                         <textarea 
//                             ref={(input) => {this.conditionname = input}}
//                             className="form-control" 
//                             id="conditionname" 
//                             placeholder="Enter the condition name"/>
//                     </div>

//                       <div>
                         
//                       </div>

//                     <form>
//                          <label><input type="checkbox" onChange={this.handleOnEnterChecked} value="true"/>On Enter</label>

//                         <div>
//                             <label><input type="checkbox" onChange={this.handleOnExitChecked} value="true"/>On Exit</label>
//                         </div>
//                     </form>
                
//                    <div>
//                       <button type="button" className="btn btn-success" onClick={this.submitTriggerbylocation}> Save </button>
//                    </div> 
                  
//                   <div>
//                       <button className="btn btn-info" type="submit" onClick={this.continue}>Continue to next step</button>
//                   </div>

//           </div>


//           );
//       }

//        else {
//             return(
//                 <div className="col-md-6 col-md-offset-3">
//                     <h1>Notification Condition</h1>
//                     <select class="custom-select mb-2 mr-sm-2 mb-sm-0" onChange={this.handleChange}>
//                     <option value="triggerbylocation">Trigger by location</option>
//                     <option value="triggerbytime">Trigger by time</option> 
//                     </select>

//                     <h3>Trigger by time</h3>
//                     <div>
//                       <textarea 
//                       ref={(input) => {this.conditionname = input}}
//                       className="form-control" 
//                       id="conditionname" 
//                       placeholder="Enter the condition name"/>
//                     </div>
                   
                    


//                     <select id = "period" 
//                             onChange={this.handlePeriodChange}
//                             ref = {(input) => {this.period = input}}> 
//                         <option value="Daily">Daily</option>
//                         <option value="Weekly">Weekly</option>
//                         <option value="Monthly">Monthly</option>
//                     </select>



//                     <div className="form-inline form-group">
                   
//                     <label class="mr-sm-2" for="inlineFormCustomSelect">Repeat every</label>
                    
//                     <select class="custom-select mb-2 mr-sm-2 mb-sm-0" 
//                     ref = {(input)=> {this.repeatevery1 = input} }
//                     onChange={this.handleRepeatEvery1Change} 
//                     id="repeatevery1">
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     <option value="5">5</option>
//                     <option value="6">6</option>
//                     <option value="7">7</option>
//                     </select>

                  


//                     <select class="custom-select mb-2 mr-sm-2 mb-sm-0" 
//                     ref = {(input)=> {this.repeatevery2 = input} }
//                     onChange={this.handleRepeatEvery2Change} id="repeatevery2">
//                     <option value="Day">Day</option>
//                     <option value="Week">Week</option>
//                     <option value="Month">Month</option>
//                     </select>
//                     </div>


                   
//                     <select class="custom-select mb-2 mr-sm-2 mb-sm-0" 
//                     ref = {(input)=> {this.samplingmethod = input} }
//                     onChange={this.handleSamplingMethodChange} id="samplingmethod"> 
//                     <option value="randomsampling"> Random sampling</option>
//                     <option value="fixedtime">Fixed time</option>
//                     </select>
                    

//                     <div className="form-inline form-group">
//                     <label class="mr-sm-2" for="inlineFormCustomSelect">Frequency:</label>
//                     <select class="custom-select mb-2 mr-sm-2 mb-sm-0"  
//                     ref = {(input)=> {this.frequency1 = input} }
//                     onChange={this.handleFrequency1Change} id="frequency1">
                   
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     <option value="5">5</option>
//                     <option value="6">6</option>
//                     <option value="7">7</option>
//                     </select>


//                     <label class="mr-sm-2" for="inlineFormCustomSelect">per</label>

//                     <select class="custom-select mb-2 mr-sm-2 mb-sm-0" 
//                     ref = {(input)=> {this.frequency2 = input} }
//                     onChange={this.handleFrequency2Change} id="frequency2">
                    
//                     <option value="Day">Day</option>
//                     <option value="Week">Week</option>
//                     <option value="Month">Month</option>
//                     </select>
//                     </div>

//                     <div className="form-inline form-group">
//                     <label class="mr-sm-2" for="inlineFormCustomSelect">Minimum between</label>
//                     <select class="custom-select mb-2 mr-sm-2 mb-sm-0" 
//                     ref = {(input)=> this.minimumbetween = input}
//                     onChange={this.handleMinimumBetweenChange} id="minimumbetween">
//                     <option value="10">10</option>
//                     <option value="20">20</option>
//                     <option value="30">30</option>
//                     <option value="40">40</option>
//                     <option value="50">50</option>
//                     <option value="60">60</option>
//                     </select>
//                     <label class="mr-sm-2" for="inlineFormCustomSelect">Minutes</label>
//                     </div>

//                     <div className="form-inline form-group">
//                     <label class="mr-sm-2" for="inlineFormCustomSelect">Between</label>
//                     <select class="custom-select mb-2 mr-sm-2 mb-sm-0"
//                     ref = {(input)=> this.between1 = input}
//                     onChange={this.handleBetween1Change} id="between1">
//                     <option value="1">1:00</option>
//                     <option value="2">2:00</option>
//                     <option value="3">3:00</option>
//                     <option value="4">4:00</option>
//                     <option value="5">5:00</option>
//                     <option value="6">6:00</option>
//                     <option value="7">7:00</option>
//                     <option value="8">8:00</option>
//                     <option value="9">9:00</option>
//                     <option value="10">10:00</option>
//                     <option value="11">11:00</option>
//                     <option value="12">12:00</option>
//                     <option value="13">13:00</option>
//                     <option value="14">14:00</option>
//                     <option value="15">15:00</option>
//                     <option value="16">16:00</option>
//                     <option value="17">17:00</option>
//                     <option value="18">18:00</option>
//                     <option value="19">19:00</option>
//                     <option value="20">20:00</option>
//                     <option value="21">21:00</option>
//                     <option value="22">22:00</option>
//                     <option value="23">23:00</option>
//                     <option value="24">24:00</option>
//                     </select>
                    
//                     <label class="mr-sm-2" for="inlineFormCustomSelect">and</label>
//                     <select class="custom-select mb-2 mr-sm-2 mb-sm-0" 
//                     ref = {(input)=> this.between2 = input}
//                     onChange={this.handleBetween2Change} id="between2">        
//                       <option value="1">1:00</option>
//                       <option value="2">2:00</option>
//                       <option value="3">3:00</option>
//                       <option value="4">4:00</option>
//                       <option value="5">5:00</option>
//                       <option value="6">6:00</option>
//                       <option value="7">7:00</option>
//                       <option value="8">8:00</option>
//                       <option value="9">9:00</option>
//                       <option value="10">10:00</option>
//                       <option value="11">11:00</option>
//                       <option value="12">12:00</option>
//                       <option value="13">13:00</option>
//                       <option value="14">14:00</option>
//                       <option value="15">15:00</option>
//                       <option value="16">16:00</option>
//                       <option value="17">17:00</option>
//                       <option value="18">18:00</option>
//                       <option value="19">19:00</option>
//                       <option value="20">20:00</option>
//                       <option value="21">21:00</option>
//                       <option value="22">22:00</option>
//                       <option value="23">23:00</option>
//                       <option value="24">24:00</option>
//                     </select>

//                     <select class="custom-select mb-2 mr-sm-2 mb-sm-0" 
//                     ref = {(input)=> this.between3 = input}
//                     onChange={this.handleBetween3Change} id="between3">
//                       <option value="onWeekdays">On Weekdays</option>
//                       <option value="onWeekends">On Weekends</option>
//                     </select>          
                 
//                     <button className="btn btn-success" type="submit" onClick={this.submitTriggerbytime}> Save </button>
//                     </div>
//                     <button className="btn btn-info" type="submit" onClick={this.continue}>Continue to next step</button>                
//             </div>
          
//           );
//       }
     
//     }
// }

render(){
    if(this.state.display === "triggerbylocation"){
    return(
        <div className="col-md-6 col-md-offset-3">
            <h1> Notification Condition </h1> 
           
             <select class="custom-select mb-2 mr-sm-2 mb-sm-0" onChange={this.handleChange}>
                     <option value="triggerbylocation">Trigger by location</option>
                     <option value="triggerbytime">Trigger by time</option> 
             </select>
             <h3>Trigger by location</h3>
             <textarea 
                    ref={(input) => {this.conditionname = input}}
                    className="form-control" 
                    id="conditionname" 
                    placeholder="Enter the condition name"/>
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
                    <form>
                          <label><input type="checkbox" onChange={this.handleOnEnterChecked} value="true"/>On Enter</label>

                          <div>
                             <label><input type="checkbox" onChange={this.handleOnExitChecked} value="true"/>On Exit</label>
                          </div>
                    </form>
                   <button type="button" className="btn btn-success" onClick={this.submitTriggerbylocation}> Save </button>
            </div>
                  <button className="btn btn-info" type="submit" onClick={this.continue}>Continue to next step</button>


        </div>
        );
    }
    else{

        return(
            <div className="col-md-6 col-md-offset-3">
            <h1> Notification Condition </h1> 
            
             <select class="custom-select mb-2 mr-sm-2 mb-sm-0" onChange={this.handleChange}>
                     <option value="triggerbylocation">Trigger by location</option>
                     <option value="triggerbytime">Trigger by time</option> 
             </select>

             <h3>Trigger by Time</h3>
             <textarea 
                    ref={(input) => {this.conditionname = input}}
                    className="form-control" 
                    id="conditionname" 
                    placeholder="Enter the condition name"/>

             <select id = "period" 
                            onChange={this.handlePeriodChange}
                            ref = {(input) => {this.period = input}}> 
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>



                    <div className="form-inline form-group">
                   
                    <label class="mr-sm-2" for="inlineFormCustomSelect">Repeat every</label>
                    
                    <select class="custom-select mb-2 mr-sm-2 mb-sm-0" 
                    ref = {(input)=> {this.repeatevery1 = input} }
                    onChange={this.handleRepeatEvery1Change} 
                    id="repeatevery1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    </select>

                  


                    <select class="custom-select mb-2 mr-sm-2 mb-sm-0" 
                    ref = {(input)=> {this.repeatevery2 = input} }
                    onChange={this.handleRepeatEvery2Change} id="repeatevery2">
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                    </select>
                    </div>


                   
                    <select class="custom-select mb-2 mr-sm-2 mb-sm-0" 
                    ref = {(input)=> {this.samplingmethod = input} }
                    onChange={this.handleSamplingMethodChange} id="samplingmethod"> 
                    <option value="randomsampling"> Random sampling</option>
                    <option value="fixedtime">Fixed time</option>
                    </select>
                    

                    <div className="form-inline form-group">
                    <label class="mr-sm-2" for="inlineFormCustomSelect">Frequency:</label>
                    <select class="custom-select mb-2 mr-sm-2 mb-sm-0"  
                    ref = {(input)=> {this.frequency1 = input} }
                    onChange={this.handleFrequency1Change} id="frequency1">
                   
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    </select>


                    <label class="mr-sm-2" for="inlineFormCustomSelect">per</label>

                    <select class="custom-select mb-2 mr-sm-2 mb-sm-0" 
                    ref = {(input)=> {this.frequency2 = input} }
                    onChange={this.handleFrequency2Change} id="frequency2">
                    
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                    </select>
                    </div>

                    <div className="form-inline form-group">
                    <label class="mr-sm-2" for="inlineFormCustomSelect">Minimum between</label>
                    <select class="custom-select mb-2 mr-sm-2 mb-sm-0" 
                    ref = {(input)=> this.minimumbetween = input}
                    onChange={this.handleMinimumBetweenChange} id="minimumbetween">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                    </select>
                    <label class="mr-sm-2" for="inlineFormCustomSelect">Minutes</label>
                    </div>

                    <div className="form-inline form-group">
                    <label class="mr-sm-2" for="inlineFormCustomSelect">Between</label>
                    <select class="custom-select mb-2 mr-sm-2 mb-sm-0"
                    ref = {(input)=> this.between1 = input}
                    onChange={this.handleBetween1Change} id="between1">
                    <option value="1">1:00</option>
                    <option value="2">2:00</option>
                    <option value="3">3:00</option>
                    <option value="4">4:00</option>
                    <option value="5">5:00</option>
                    <option value="6">6:00</option>
                    <option value="7">7:00</option>
                    <option value="8">8:00</option>
                    <option value="9">9:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                    <option value="19">19:00</option>
                    <option value="20">20:00</option>
                    <option value="21">21:00</option>
                    <option value="22">22:00</option>
                    <option value="23">23:00</option>
                    <option value="24">24:00</option>
                    </select>
                    
                    <label class="mr-sm-2" for="inlineFormCustomSelect">and</label>
                    <select class="custom-select mb-2 mr-sm-2 mb-sm-0" 
                    ref = {(input)=> this.between2 = input}
                    onChange={this.handleBetween2Change} id="between2">        
                      <option value="1">1:00</option>
                      <option value="2">2:00</option>
                      <option value="3">3:00</option>
                      <option value="4">4:00</option>
                      <option value="5">5:00</option>
                      <option value="6">6:00</option>
                      <option value="7">7:00</option>
                      <option value="8">8:00</option>
                      <option value="9">9:00</option>
                      <option value="10">10:00</option>
                      <option value="11">11:00</option>
                      <option value="12">12:00</option>
                      <option value="13">13:00</option>
                      <option value="14">14:00</option>
                      <option value="15">15:00</option>
                      <option value="16">16:00</option>
                      <option value="17">17:00</option>
                      <option value="18">18:00</option>
                      <option value="19">19:00</option>
                      <option value="20">20:00</option>
                      <option value="21">21:00</option>
                      <option value="22">22:00</option>
                      <option value="23">23:00</option>
                      <option value="24">24:00</option>
                    </select>

                    <select class="custom-select mb-2 mr-sm-2 mb-sm-0" 
                    ref = {(input)=> this.between3 = input}
                    onChange={this.handleBetween3Change} id="between3">
                      <option value="onWeekdays">On Weekdays</option>
                      <option value="onWeekends">On Weekends</option>
                    </select> 
                </div>         
                 <button className="btn btn-success" type="submit" onClick={this.submitTriggerbytime}> Save </button>
                  <button className="btn btn-info" type="submit" onClick={this.continue}>Continue to next step</button>
            </div>
            );
    }
}
}


export default Test;



