import React, { Component } from 'react';
import MoreChoice from './MoreChoice';
import MoreChoiceList from './MoreChoiceList';


class MultipleChoice extends Component {

constructor(props) {
	  super(props);
	  this.state = {
		newChoice: {
	  		choices: []
	  	},
	  };   

	  this.addMultipleChoice = this.addMultipleChoice.bind(this);
}

addMultipleChoice() {
		this.props.addMultipleChoicetask(this.question.value,this.choices.value);
		this.question.value = "";
		this.choicecontent.value = "";
	}	

addMoreChoice(choicecontent) {
		
		let newChoice = this.state.newChoice;
		newChoice.choices.push({choicecontent: choicecontent});
		this.setState({newChoice: newChoice});
		
}

render() {
		
        	return(
              	<div className="col-md-6 col-md-offset-3">
					 <h3>Multiple Choice Question</h3>
                  	 <textarea 
                   			ref={(input) => {this.question = input}}
                   			className="form-control" 
                   			id="question" 
                   			placeholder="Enter the question content" />
                   <MoreChoiceList choice={this.state.newChoice}/>
				   <MoreChoice addMoreChoice={(choicecontent) => {this.addMoreChoice(choicecontent)}}/>

                  
            	</div>
          );
	}
}

export default MultipleChoice;