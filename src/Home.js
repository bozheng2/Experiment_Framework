import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
       super(props);
       this.state = {
            Basics: JSON.parse(localStorage.getItem('Basics')) || []
       };
       
    }
    


displayBasics() {
    let resultsArray = [];

    this.state.Basics.map((Basic, i) => {
      resultsArray.push(
        <div className="col-md-6 col-md-offset-3">
          <div className="thumbnail">
            <div className="caption">
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

  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Home</h1>
        {this.displayBasics()}
      </div>
    );
  }
}


export default Home;