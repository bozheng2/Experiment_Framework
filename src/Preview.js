import React, { Component } from 'react';
import request from 'superagent';
import axios from 'axios';

class Preview extends Component {
    constructor(props) {
       super(props);
       this.state = {
            Basics: JSON.parse(localStorage.getItem('Basics')) || [],
            FirstTimeEnters: JSON.parse(localStorage.getItem('FirstTimeEnters')) || [],
            TriggerByConditions: JSON.parse(localStorage.getItem('TriggerByConditions')) || [],
       };
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
                   {this.state.triggerdisplay ? <h3>Taskset 1 is triggered !</h3> : <h1></h1>} 
                   <form>
                      <div class="checkbox">
                        <h4>Time Contion</h4>
                        <label><input type="checkbox" value=""/>Time Condition 1</label>
                        <label><input type="checkbox" value=""/>Time Condition 2</label>
                      </div>
                  </form>
                  <form>
                      <div class="checkbox">
                        <h4>Location Contion</h4>
                        <label><input type="checkbox" value=""/>Location Condition 1</label>
                        <label><input type="checkbox" value=""/>Location Condition 2</label>
                        <button type="button" className="btn btn-info" onClick={this.triggerdisplay}> Test Trigger </button>
                        
                      </div>
                  </form>

                  
               </div>

            <button type="button" className="btn btn-success" > Publish Experiment </button>




            </div>
            );
    }
}
export default Preview;