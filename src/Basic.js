import React, { Component } from 'react';
import request from 'superagent';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory'

class Basic extends Component {
    constructor(props){
        super(props);
        this.state={
            Basics: JSON.parse(localStorage.getItem('Basics')) || [],
            newBasic: {
                title: "Title",
                version: "Version",
                contact: "Contact",
                studydescription: "Study description",
                instruction: "Instruction",
                consentform: "Consentform",
               },
            };
        this.saveBasic = this.saveBasic.bind(this);   
    }

saveBasic() {
       
        let newBasic = this.state.newBasic;
        newBasic.title = this.title.value;
        newBasic.version = this.version.value;
        newBasic.contact = this.contact.value;
        newBasic.studydescription = this.studydescription.value;
        newBasic.instruction = this.instruction.value;
        newBasic.consentform = this.consentform.value;
        this.setState({newBasic});

        let Basics = this.state.Basics;
        Basics.push(newBasic);

    this.setState({Basics});
    localStorage.setItem('Basics', JSON.stringify(Basics));

    this.props.history.push('/task');
       
  //       axios.post('/Basics', {Basics: this.state.newBasic})
  // .then(response => {
  //   console.log(response.config.data);
  // });
  //        console.log(newBasic);
  //        this.props.history.push('/task');
    }
    
render() {
        return(
            <div className="container">
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                   <h1> Experiment Basic Info </h1>
                  <form>

                  <div className="form-inline form-group">

                     <label htmlFor="title"> Title</label>
                     <input type="text"
                     ref={(input) => {this.title = input;}}
                     className="form-control" 
                     id="title" 
                     placeholder="Title" />

                     <label htmlFor="version"> Version </label>
                     <input type="text" 
                     ref={(input) => {this.version = input;}}
                     className="form-control" 
                     id="version" 
                     placeholder="Version" />
                  </div>  

                  <div className="form-inline form-group">
                     <label htmlFor="contact">Contact</label>
                     <input type="text" 
                     ref={(input) => {this.contact = input;}}
                     className="form-control" 
                     id="contact" 
                     placeholder="Contact"/>
                  </div>  

                   <div className="form-group">
                   <label htmlFor="studydescription"> Study Description </label>
                   <textarea 
                   ref={(input) => {this.studydescription = input}}
                   className="form-control" 
                   id="studydescription" 
                   placeholder="Enter the study description" />
                   </div>  

                   <div className="form-group">
                   <label htmlFor="instruction"> Instruction </label>
                   <textarea 
                   ref={(input) => {this.instruction = input}}
                   className="form-control" 
                   id="instruction" 
                   placeholder="Enter the instruction" />
                   </div>  

                   <div className="form-group">
                   <label htmlFor="consentform"> Consent Form </label>
                   <textarea 
                   ref={(input) => {this.consentform = input}}
                   className="form-control" 
                   id="consentform" 
                   placeholder="Enter the consent form" />
                   </div>  

                   <button className="btn btn-info" type="button" onClick={this.saveBasic}> Save Experiment Basic</button>
                   </form>
                </div>
                </div>
            
            </div>
            );
    }
}

export default Basic;