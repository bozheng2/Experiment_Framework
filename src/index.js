import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Home from './Home';
import Edit from './Edit';
import Basic from './Basic';
import Task from './Task';
//import Notificationcondition from './Notificationcondition';
import Manage from './Manage';
import Test from './Test';
import Preview from './Preview';
//import Random from './Random';



const history = createBrowserHistory()

ReactDOM.render(
<Router>
<div>
    <nav className="navbar navbar-default navbar-static-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Experiment Platform</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li><NavLink exact activeClassName="activeNav" to="/">Home</NavLink></li>
              <li><NavLink exact activeClassName="activeNav" to="/basic">Experiment Basic</NavLink></li>
              <li><NavLink exact activeClassName="activeNav" to="/task">Task</NavLink></li>
              <li><NavLink exact activeClassName="activeNav" to="/test">Notificationcondition</NavLink></li>
              <li><NavLink exact activeClassName="activeNav" to="/manage">Manage</NavLink></li>
              <li><NavLink exact activeClassName="activeNav" to="/preview">Preview</NavLink></li>
             
             
             
          </ul>
        </div>
      </div>
    </nav>

      <Route exact path="/" component={Home}/>
      <Route path="/basic" component={Basic} history={history}/>
      <Route path="/task" component={Task} history={history}/>
      <Route path="/test" component={Test} history={history}/>
      <Route path="/manage" component={Manage} history={history}/>
      <Route path="/preview" component={Preview} history={history}/>
     
     

      <Route path="/edit/:id" component={Edit}/>
    </div>
  </Router>,
  document.getElementById('root')
);