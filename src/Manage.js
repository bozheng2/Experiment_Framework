import React, { Component } from 'react';
import request from 'superagent';
import axios from 'axios';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import createHistory from 'history/createBrowserHistory'

 const TrueFalseTasks =  JSON.parse(localStorage.getItem('TrueFalseTasks')) || [];
 const count1 = (TrueFalseTasks.length);
 const option_id1 = Array.from(Array(count1).keys());
 var selected1 = 0; 

 const MultipleChoiceTasks = JSON.parse(localStorage.getItem('MultipleChoiceTasks')) || [];
 const count2 = (MultipleChoiceTasks.length);
 const option_id2 = Array.from(Array(count2).keys());
 var selected2 = 0;
 
 const MessageTasks = JSON.parse(localStorage.getItem('MessageTasks')) || [];
 const count3 = (MessageTasks.length);
 const option_id3 = Array.from(Array(count3).keys());
 var selected3 = 0;

 const LocationConditions = JSON.parse(localStorage.getItem('Triggerbylocations')) || [];
 const count4 = (LocationConditions.length);
 const option_id4 = Array.from(Array(count4).keys());
 var selected4 = 0;

 const TimeConditions = JSON.parse(localStorage.getItem('Triggerbytimes')) || [];
 const count5 = (TimeConditions.length);
 const option_id5 = Array.from(Array(count5).keys());
 var selected5 = 0;
 

class Manage extends Component {

    constructor(props){
        super(props);
        this.state={
          newFirstTimeEnter: {
              instruction: "instruction",
              TrueFalseTask: "",
              MultipleChoiceTask: "",
              MessageTask: ""
            },
            newTriggerByCondition: {
              LocationCondition: "",
              TimeCondition:"",
              TrueFalseTask: "",
              MultipleChoiceTask: "",
              MessageTask: ""
            },
            display: "firsttimeenter",
            FirstTimeEnters: JSON.parse(localStorage.getItem('FirstTimeEnters')) || [],
            TriggerByConditions: JSON.parse(localStorage.getItem('TriggerByConditions')) || [],
        };
        this.handleChange = this.handleChange.bind(this);  
        this.submitFirstTimeEnter = this.submitFirstTimeEnter.bind(this); 
        this.submitTriggerByCondition = this.submitTriggerByCondition.bind(this); 
        this.continue = this.continue.bind(this);  
    }


handleChange(e) {

    this.setState({ display: e.target.value });

 }

  continue(){
      this.props.history.push('/preview');
    }


 submitFirstTimeEnter() {
    let newFirstTimeEnter = this.state.newFirstTimeEnter;
    newFirstTimeEnter.instruction = this.instruction.value;
    newFirstTimeEnter.TrueFalseTask = this.TrueFalseTask.value;
    newFirstTimeEnter. MultipleChoiceTask = this.MultipleChoiceTask.value;
    newFirstTimeEnter.MessageTask = this.MessageTask.value;

    this.setState({newFirstTimeEnter}); 

    let FirstTimeEnters = this.state.FirstTimeEnters;
    FirstTimeEnters.push(newFirstTimeEnter);

    this.setState({FirstTimeEnters});
    localStorage.setItem('FirstTimeEnters', JSON.stringify(FirstTimeEnters));
    alert('First time enter stored!');
    window.location.reload();
  }

  submitTriggerByCondition() {
    let newTriggerByCondition = this.state.newTriggerByCondition;
    newTriggerByCondition.LocationCondition = this.LocationCondition.value;
    newTriggerByCondition.TimeCondition = this.TimeCondition.value;
    newTriggerByCondition.TrueFalseTask = this.TrueFalseTask.value;
    newTriggerByCondition.MultipleChoiceTask = this.MultipleChoiceTask.value;
    newTriggerByCondition.MessageTask = this.MessageTask.value;

    this.setState({newTriggerByCondition}); 

    let TriggerByConditions = this.state.TriggerByConditions;
    TriggerByConditions.push(newTriggerByCondition);

    this.setState({TriggerByConditions});
    localStorage.setItem('TriggerByConditions', JSON.stringify(TriggerByConditions));
    alert('Trigger by condition stored!');
    window.location.reload();
  }
    

render(){
     if(this.state.display === "firsttimeenter"){
        return(
            <div className="col-md-6 col-md-offset-3">
                
                <h1> Manage Experiment Workflow </h1> 
                    <select className="custom-select mb-2 mr-sm-2 mb-sm-0" onChange={this.handleChange}>
                    <option value="firsttimeenter">First time enter</option>
                    <option value="triggerbycondition">Trigger by condition</option>
                    </select>
                    
                    <h3>First time enter</h3>

                    <label htmlFor="instruction"> First time instruction </label>
                   <textarea 
                   ref={(input) => {this.instruction = input}}
                   className="form-control" 
                   id="step1" 
                   placeholder="Enter the first time enter instruction" />


                    <h4>TrueFalseTasks</h4>
                    <select  ref = {(input)=> this.TrueFalseTask = input}

                             id = "TrueFalseTask" defaultValue={selected1}>
                      {option_id1.map(id =>
                            <option  value={TrueFalseTasks[id].taskname}>{TrueFalseTasks[id].taskname}</option>

                      )}
                       <option value="notrequired">Not Required</option>
                    </select>

                    


                    <h4>MultipleChoiceTasks</h4>
                    <select ref = {(input)=> this.MultipleChoiceTask = input}
                        id = "MultipleChoiceTask" 
                       defaultValue={selected2}>
                      {option_id2.map(id =>
                            <option value={MultipleChoiceTasks[id].taskname}>{MultipleChoiceTasks[id].taskname}</option>
                      )}
                       <option value="notrequired">Not Required</option>
                    </select>



                    <h4>MessageTasks</h4>
                    <select ref = {(input)=> this.MessageTask = input}
                      id = "MessageTask"
                     defaultValue={selected3}>
                      {option_id3.map(id =>
                            <option value={MessageTasks[id].taskname}>{MessageTasks[id].taskname}</option>
                      )}
                       <option value="notrequired">Not Required</option>
                    </select>


                    <div>
                    <button className="btn btn-success" type="submit"  onClick={this.submitFirstTimeEnter} > Save </button>
                    </div>

                    <div>
                    <button className="btn btn-info" type="submit" onClick={this.continue}> Continue to next step </button>
                    </div>

                    
          
            </div>
          );
      }
      else {
        return(
              <div className="col-md-6 col-md-offset-3">
                
                   <h1> Manage Experiment Workflow </h1> 
                   <select className="custom-select mb-2 mr-sm-2 mb-sm-0" onChange={this.handleChange}>
                    <option value="firsttimeenter">First time enter</option>
                    <option value="triggerbycondition">Trigger by condition</option>
                    </select>
                   
                    <h3>Trigger by condition</h3>

                    <h4>Choose Location Condition</h4>

                    <select  ref = {(input)=> this.LocationCondition = input}

                             id = "LocationCondition" defaultValue={selected4}>
                      {option_id4.map(id =>
                            <option  value={LocationConditions[id].conditionname}>{LocationConditions[id].conditionname}</option>

                      )}
                       <option value="notrequired">Not Required</option>
                    </select>



                    <h4>Choose Time Condition</h4>
                     <select  ref = {(input)=> this.TimeCondition = input}

                             id = "TimeCondition" defaultValue={selected5}>
                      {option_id5.map(id =>
                            <option  value={TimeConditions[id].conditionname}>{TimeConditions[id].conditionname}</option>

                      )}
                       <option value="notrequired">Not Required</option>
                    </select>


                     <h4>TrueFalseTasks</h4>
                    <select  ref = {(input)=> this.TrueFalseTask = input}

                             id = "TrueFalseTask" defaultValue={selected1}>
                      {option_id1.map(id =>
                            <option  value={TrueFalseTasks[id].taskname}>{TrueFalseTasks[id].taskname}</option>

                      )}
                       <option value="notrequired">Not Required</option>
                    </select>

                    


                    <h4>MultipleChoiceTasks</h4>
                    <select ref = {(input)=> this.MultipleChoiceTask = input}
                        id = "MultipleChoiceTask" 
                       defaultValue={selected2}>
                      {option_id2.map(id =>
                            <option value={MultipleChoiceTasks[id].taskname}>{MultipleChoiceTasks[id].taskname}</option>
                      )}
                       <option value="notrequired">Not Required</option>
                    </select>



                    <h4>MessageTasks</h4>
                    <select ref = {(input)=> this.MessageTask = input}
                      id = "MessageTask"
                     defaultValue={selected3}>
                      {option_id3.map(id =>
                            <option value={MessageTasks[id].taskname}>{MessageTasks[id].taskname}</option>
                      )}
                       <option value="notrequired">Not Required</option>
                    </select>

                    <div>
                    <button className="btn btn-success" type="submit" onClick={this.submitTriggerByCondition}  > Save </button>
                    </div>

                    <div>
                    <button className="btn btn-info" type="submit" onClick={this.continue} > Continue to next step </button>
                    </div>


                 
              </div>  
          );
        }
}

}
export default Manage;