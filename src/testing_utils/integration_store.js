import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const createStroreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function realStore(reducers) {
	return createStroreWithMiddleware(reducers);
}
