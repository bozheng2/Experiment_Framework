import React, { Component } from 'react';
import InlineEdit from 'react-edit-inline';
import { BrowserHistory } from 'react-history'
class TrueFalse extends Component {

	constructor(props) {
	  super(props);
	
	   this.state = {
        TrueFalseTasks: JSON.parse(localStorage.getItem('TrueFalseTasks')) || [],
        newTrueFalseTask: {
        taskname: "New True/False",
        truefalsecontent: "True/False question content",
      }
    };
	  //this.addTrueFalse = this.addTrueFalse.bind(this);
    //this.submitTrueFalse = this.submitTrueFalse.bind(this);
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
    //console.log(recipies);
    //BrowserHistory.push('/');  
  }


// addTrueFalse() {
// 		console.log('Truefalse Added');
// 		//this.taskname.value = "Task name";
// 		//console.log(this.taskname.value, this.truefalsecontent.value);
// 		this.props.addTrueFalsetask(this.taskname.value,this.truefalsecontent.value);
// 		this.taskname.value = "";
// 		this.truefalsecontent.value = "";
// 	}	

	render() {
		
        	return(
              <div className="col-md-6 col-md-offset-3">
		    		          <input type="text" 
		    				          className="form-control" 
		    				          id="taskname" 
		    				          ref={(input) => {this.taskname = input;}}
		    				          placeholder="Task name"/>
					         <h3>True/False Question</h3>
            <div className="form-group">
                    <textarea 
                      		ref={(input) => {this.truefalsecontent = input}}
                      		className="form-control" 
                      		id="truefalsecontent" 
                      		placeholder="Enter the true/false question content"/>
            </div> 
                	<button className="btn btn-success" type="button" onClick={this.submitTrueFalse}>Save</button>
  
            </div>
          );
	}
}

export default TrueFalse;