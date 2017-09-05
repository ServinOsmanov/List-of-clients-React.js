import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ListOfClients from './pages/ListOfClients';
import ClientPage from './pages/ClientInformation';
import FormComponent from './pages/RegistrationForm'

class App extends Component {
  render() {
    return (
    	<div>
    		<Route exact path={'/'} component={ListOfClients}/>
    		<Route exact path={'/:client'} component={ClientPage}/>
    		<Route exact path={'/NewClient'} component={FormComponent}/>
    	</div>
    );
  }
}	


export default App;

