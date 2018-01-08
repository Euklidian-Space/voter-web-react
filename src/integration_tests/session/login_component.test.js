import reducers from '../../reducers';
import { getRegistrationErrs, getLoginErrs } from '../../reducers/session/session_selector';
import { signup, login } from '../../actions/session';
import realStore from '../../testing_utils/integration_store';
import LoginForm from '../../components/LoginForm/LoginForm';


let store;

beforeEach(() => {
	store = realStore(reducers);
});
