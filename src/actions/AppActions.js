import dispatcher from '../dispatcher/AppDispatcher';

export default {
 loadFirstPeople() {
	dispatcher.dispatch({type: 'LOAD_CLIENTS'});
 },

 changePage(arg) {
 	dispatcher.dispatch({type: 'LOAD_OR_NOT', argum: arg})
 }
}
