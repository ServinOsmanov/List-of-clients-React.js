import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import clientsStore from '../stores/AppStore';

class ClientPage extends Component {
	constructor() {
		super()
		this.state = {
			clients: clientsStore.getAll()
		}
	}

	componentWillMount() {
		clientsStore.on('change', () => {
			this.setState({
				clients: clientsStore.getAll()
			})
		})
	}

	render(props) {
		let clientInformation = this.state.clients.map((client, index) => {
			if(this.props.match.params.client === client.name) {	
				return (
					<div className="card">
						<Link to={'/'}>Back to the List Of Clients</Link>
						<img src={client.image||'https://24usl.ru/images/face235.jpg'}></img>
						<h3>{client.name}</h3>
						<p>Номер карты: {client.cardNumber ||'не указан'}</p>
						<p>Пол: {client.gender || 'не указан'}</p>
						<p>Дата рождения: {client.birthDay}.{client.birthMonth}.{client.birthYear}</p>
						<p>Номер телефона: {client.phone || 'не указан'}</p>
						<p>E-mail: {client.email || 'не указан'}</p>
						<p>Адрес: {client.adress || 'не указан'}</p>
					</div>
				)
			}
		}) 
		return <div>{ clientInformation }</div>;
	}
}	

export default ClientPage;