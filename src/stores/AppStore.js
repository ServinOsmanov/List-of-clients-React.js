import { EventEmitter} from 'events';
import dispatcher from '../dispatcher/AppDispatcher';

class ClientsStore extends EventEmitter {
	constructor() {
		super()
		this.clients = [];
		this.handleActions = this.handleActions.bind(this);
		this.start = 0;
		this.currentNumber;
	}

	getAll() {
		return this.clients;
	}

	handleActions(action) {
		switch(action.type) {
			case 'LOAD_CLIENTS': {
				let response;
			 	let url = "http://localhost:9000/listUsers?_start=0&_limit=30";
			    let xhr = new XMLHttpRequest();
			    xhr.open("GET", url, false);
			    xhr.onreadystatechange = function() {
					if (xhr.readyState !== 4) return;

				  	if (xhr.status !== 200) {
				    	alert(xhr.status + ': ' + xhr.statusText);
				  	} else {
				  		response = JSON.parse(xhr.responseText);
				  	}
				}
   				xhr.send();
				this.clients = response;
				this.emit('change');
			}
			case 'LOAD_OR_NOT': {
				if(action.argum === 'Next') {
					this.currentNumber += 1;
				}
				else if(action.argum === 'Previous') {
					this.currentNumber -= 1;
				}
				else if(typeof +action.argum === 'number') {
					this.currentNumber = +action.argum || 1;
				}

				if(this.clients.length === 30) {
					this.start = 15;
				}
				
				if(this.clients.length/this.currentNumber === 15) {
					this.start += 15;
	 				let limit =  15;
					let response;
					let url = "http://localhost:9000/listUsers?_start=" + this.start + "&_limit=" + limit;
					let xhr = new XMLHttpRequest();

					xhr.open("GET", url, false);

					xhr.onreadystatechange = function() {
						if (xhr.readyState !== 4) return;

					  	if (xhr.status !== 200) {
					    	alert(xhr.status + ': ' + xhr.statusText);
					  	} else {
					    	response = JSON.parse(xhr.responseText);
					  	}
					}
					xhr.send();
					this.clients = [...this.clients, ...response];
					this.emit('change');
				}
			}
		}
	}
}

const clientsStore = new ClientsStore;
dispatcher.register(clientsStore.handleActions);
export default clientsStore;