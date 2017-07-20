import React, { Component } from 'react';
import axios from 'axios';
import request from 'superagent';

class Edit extends Component {
   constructor(props) {
    super(props);
      this.state={
            newExperiment: {
                title: "",
                version: "",
                contact: "",
                studydescription: "",
                instruction: "",
                consentform: ""
            },
                
            };
           this.loadExperimentFromServer = this.loadExperimentFromServer.bind(this);
           this.handleTitleChange = this.handleTitleChange.bind(this);
           this.handleVersionChange = this.handleVersionChange.bind(this);
           this.handleContactChange = this.handleContactChange.bind(this);
           this.handleStudydescriptionChange = this.handleStudydescriptionChange.bind(this);
           this.handleInstructionChange = this.handleInstructionChange.bind(this);
           this.handleConsentformChange = this.handleConsentformChange.bind(this);

           this.submitExperiment = this.submitExperiment.bind(this);
  }


 loadExperimentFromServer() {
      axios.get(`/edit/${this.props.match.params.id}`)
      .then(response => {
        this.setState({newExperiment: response.data.foundExperiment});
      })
        .catch(function (error) {
    console.log(error);
  }); 
 }
  
  componentDidMount(){
     console.log("This is the edit route!");
      this.loadExperimentFromServer();
    
  }
     
  handleStudydescriptionChange(e){
    let newDesc = this.state.newExperiment;
    newDesc.studydescription = e.target.value;
    this.setState({newExperiment: newDesc});
    console.log(e.target.value);
  }
    
    handleTitleChange(e){
    let newTitle = this.state.newExperiment;
    newTitle.title = e.target.value;
    this.setState({newExperiment: newTitle});
    console.log(e.target.value);
  }
  handleVersionChange(e){
    let newVersion = this.state.newExperiment;
    newVersion.version = e.target.value;
    this.setState({newExperiment: newVersion});
    console.log(e.target.value);
  }

  handleContactChange(e){
    let newContact = this.state.newExperiment;
    newContact.contact = e.target.value;
    this.setState({newExperiment: newContact});
    console.log(e.target.value);
  }

  handleInstructionChange(e){
    let newInstruction = this.state.newExperiment;
    newInstruction.instruction = e.target.value;
    this.setState({newExperiment: newInstruction});
    console.log(e.target.value);
  }

  handleConsentformChange(e){
    let newConsentform = this.state.newExperiment;
    newConsentform.consentform = e.target.value;
    this.setState({newExperiment: newConsentform});
    console.log(e.target.value);
  }


  submitExperiment() {
        
        let newExperiment = this.state.newExperiment;
        this.setState({newExperiment});
       
        axios.put(`/edit/${this.props.match.params.id}`, {experiments: this.state.newExperiment})
  .then(response => {
    console.log(response.config.data);
  });
        console.log(newExperiment);
        this.props.history.push('/');
    }
    

  render() {
    return (
                 
          <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-12">
                   <h1> Experiment Basic </h1>
                  <form>
  
                  <div className="form-inline form-group">
                     <label htmlFor="title"> Title</label>
                     <input 
                     onChange={this.handleTitleChange}
                     type="text"
                     className="form-control" 
                     id="title" 
                    value={this.state.newExperiment.title}/>

                     <label htmlFor="version"> Version </label>
                     <input 
                     onChange={this.handleVersionChange}
                     type="text" 
                     className="form-control" 
                     id="version" 
                    value={this.state.newExperiment.version}/>
                  </div>  

                  <div className="form-inline form-group">
                     <label htmlFor="contact">Contact</label>
                     <input 
                     onChange={this.handleContactChange}
                     type="text" 
                     className="form-control" 
                     id="contact" 
                     value={this.state.newExperiment.contact}/>
                  </div>  

                   <div className="form-group">
                   <label htmlFor="studydescription"> Study Description </label>
                   <textarea 
                   onChange={this.handleStudydescriptionChange}
                   className="form-control" 
                   id="studydescription" 
                   value={this.state.newExperiment.studydescription}/>
                   </div>  

                   <div className="form-group">
                   <label htmlFor="instruction"> Instruction </label>
                   <textarea 
                   onChange={this.handleInstructionChange}
                   className="form-control" 
                   id="instruction" 
                   value={this.state.newExperiment.instruction}/>
                   </div>  

                   <div className="form-group">
                   <label htmlFor="consentform"> Consent Form </label>
                   <textarea 
                   onChange={this.handleConsentformChange}
                   className="form-control" 
                   id="consentform" 
                   value={this.state.newExperiment.consentform}/>
                   </div>  

                   <button className="btn btn-info" type="submit" onClick={this.saveExperiment}> Save Experiment Basic</button>
                   </form>

                </div>
                </div>
            
            </div>
);
}}

export default Edit;
