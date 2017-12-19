import { combineReducers } from 'redux';
import session from './session/session';
// import UserReducer from './user_reducer';

const rootReducer = combineReducers({
	session
	// UserReducer
});

export default rootReducer;
