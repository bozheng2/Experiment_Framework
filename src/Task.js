import MoreChoice from './MoreChoice';
import MoreChoiceList from './MoreChoiceList';
import React, { Component } from 'react';
import request from 'superagent';
import createHistory from 'history/createBrowserHistory'


class Task extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TrueFalseTasks: JSON.parse(localStorage.getItem('TrueFalseTasks')) || [],
      MultipleChoiceTasks: JSON.parse(localStorage.getItem('MultipleChoiceTasks')) || [],
      MessageTasks: JSON.parse(localStorage.getItem('MessageTasks')) || [],
      newTrueFalseTask: {
        taskname: "taskname",
        truefalsecontent: "question"
      },
      newMultipleChoice: {
        taskname: "taskname",
        question: "question",
        choices:[]
      },
      newMessage: {
        taskname: "taskname",
        message: "message"
      },
      display: "true/false"
    };
    this.submitTrueFalse = this.submitTrueFalse.bind(this);
    this.submitMultipleChoice = this.submitMultipleChoice.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.handleChange = this.handleChange.bind(this); 
    this.continue = this.continue.bind(this); 
  }
 
 continue(){
  this.props.history.push('/test');
 }

  handleChange(e) {
    this.setState({ display: e.target.value });
  }

  submitTrueFalse() {
    //console.log('Submit Recipie');
    //console.log(this.name.value, this.description.value);
    let newTrueFalseTask = this.state.newTrueFalseTask;

    newTrueFalseTask.taskname = this.taskname.value;
    newTrueFalseTask.truefalsecontent = this.truefalsecontent.value;

    this.setState({newTrueFalseTask});

    let TrueFalseTasks = this.state.TrueFalseTasks;
    TrueFalseTasks.push(newTrueFalseTask);

    this.setState({TrueFalseTasks});
    localStorage.setItem('TrueFalseTasks', JSON.stringify(TrueFalseTasks));
    window.location.reload();
    //console.log(recipies);
  }


addMoreChoice(choicecontent) {
    
    let newMultipleChoice = this.state.newMultipleChoice;
    newMultipleChoice.choices.push({choicecontent: choicecontent});
    this.setState({newMultipleChoice: newMultipleChoice});
    
}

submitMultipleChoice(){

  let newMultipleChoice = this.state.newMultipleChoice;

    newMultipleChoice.taskname = this.taskname.value;
    newMultipleChoice.question = this.question.value;

    this.setState({newMultipleChoice});

    let MultipleChoiceTasks = this.state.MultipleChoiceTasks;
    MultipleChoiceTasks.push(newMultipleChoice); 

    this.setState({MultipleChoiceTasks});
    localStorage.setItem('MultipleChoiceTasks', JSON.stringify(MultipleChoiceTasks));
    window.location.reload();
  }

  submitMessage(){

  let newMessage = this.state.newMessage;

    newMessage.taskname = this.taskname.value;
   newMessage.message = this.message.value;

    this.setState({newMessage});

    let MessageTasks = this.state.MessageTasks;
    MessageTasks.push(newMessage);

    this.setState({MessageTasks});
    localStorage.setItem('MessageTasks', JSON.stringify(MessageTasks));
    window.location.reload();
  }

  render() {
     if(this.state.display === "true/false"){
        return(
            <div className="col-md-6 col-md-offset-3">
                    <h1> Experiment Task </h1>
                    <select className="custom-select mb-2 mr-sm-2 mb-sm-0" onChange={this.handleChange}>
                    <option value="true/false">True/False</option>
                    <option value="multiplechoice">Multiple Choice</option>
                    <option value="message">Message</option>
                    </select>

                    <h3>True/False Question</h3>
                    <div className="form-group">

                      <textarea 
                      ref={(input) => {this.taskname = input}}
                      className="form-control" 
                      id="taskname" 
                      placeholder="Enter the taskname"/>

                      <textarea 
                      ref={(input) => {this.truefalsecontent = input}}
                      className="form-control" 
                      id="truefalsecontent" 
                      placeholder="Enter the question content"/>
                    </div> 
                      <button className="btn btn-success" type="submit" onClick={this.submitTrueFalse}>Save</button>
                      <div>
                         <button className="btn btn-info" type="submit" onClick={this.continue}>Continue to next step</button>
                      </div>
            </div>
          );
      }
      else if (this.state.display === "multiplechoice"){
          return (
            <div className="col-md-6 col-md-offset-3">
              <h1> Experiment Task </h1>
                    <select class="custom-select mb-2 mr-sm-2 mb-sm-0" onChange={this.handleChange}>
                    <option value="true/false">True/False</option>
                    <option value="multiplechoice">Multiple Choice</option>
                    <option value="message">Message</option>
                    </select>
           <h3>Multiple Choice Question</h3>
                  <textarea 
                      ref={(input) => {this.taskname = input}}
                      className="form-control" 
                      id="taskname" 
                      placeholder="Enter the taskname"/>
                     <textarea 
                        ref={(input) => {this.question = input}}
                        className="form-control" 
                        id="question" 
                        placeholder="Enter the question content" />
           <MoreChoiceList choice={this.state.newMultipleChoice}/>
           <MoreChoice addMoreChoice={(choicecontent) => {this.addMoreChoice(choicecontent)}}/>
           <button className="btn btn-success" type="submit" onClick={this.submitMultipleChoice}>Save</button>
            <button className="btn btn-info" type="submit" onClick={this.continue}>Continue to next step</button>
           </div>
            );
      }
      else {
        return(
              <div className="col-md-6 col-md-offset-3">
                   <h1> Experiment Task </h1>
                   
                  <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="questiontype" onChange={this.handleChange}>
                    <option value="true/false">True/False</option>
                    <option value="multiplechoice">Multiple Choice</option>
                    <option value="message">Message</option>
                    </select>
                   <h3>Message</h3>

                    <textarea 
                      ref={(input) => {this.taskname = input}}
                      className="form-control" 
                      id="taskname" 
                      placeholder="Enter the taskname"/>
                   <textarea 
                   ref={(input) => {this.message = input}}
                   className="form-control" 
                   id="message" 
                   placeholder="Enter the message content"/>
                   <button className="btn btn-success" type="submit" onClick={this.submitMessage}>Save</button>
                   <div>
                     <button className="btn btn-info" type="submit" onClick={this.continue}>Continue to next step</button>
                   </div>
              </div>  
          );
        }
  }
}

export default Task;