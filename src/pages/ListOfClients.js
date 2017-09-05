import React, { Component } from 'react';
import { Table } from 'reactable';
import { Link } from 'react-router-dom'

import clientsStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';


class ListOfClients extends Component {
	constructor() {
		super();
		this.state = {
			clients: clientsStore.getAll()
		}
	}

	componentDidMount() {
		AppActions.loadFirstPeople();
	}

	handlePagination(event) {
		AppActions.changePage(event.target.innerHTML);
	}


	componentWillMount() {
		clientsStore.on('change', () => {
			this.setState({
				clients: clientsStore.getAll()
			})
		})
	}

	render() {
		let listOfClients;
		if(typeof this.state.clients === 'object') {
		listOfClients = this.state.clients.map((client, index) => {
			return ({
				Name: <Link to={`/${client.name}`}>{client.name}</Link>,
				Phone: client.phone || '-',
				Gender: client.gender || '-',
				Email: client.email || '-',
				DateOfBirth: `${client.birthDay}.${client.birthMonth}.${client.birthYear}` || '-',
				Adress: client.adress || '-'
			})
		});
	} else {
		listOfClients = [{Error: this.state.clients}];
	}
		
		return(
			<div>
				<p className='registrationForm'>
	 				<Link to={'/NewClient'}>Create a new client </Link>
	 			</p>
				<h1>List Of Clients</h1>

				<Table className="table" data={listOfClients} itemsPerPage={15} pageButtonLimit={2} onClick={this.handlePagination}
				sortable={[
    				{
				        column: 'Gender',
				        sortFunction: function(a,b){
				        	return a > b ? 1 : -1;
	        			}
    				},
    				{
    					column: 'Name',
    					sortFunction: function(a,b) {
    						return a.props.children > b.props.children? 1: -1;
    					}
    				}
				]}
				/>
			</div>
		)
	}
}

export default ListOfClients;