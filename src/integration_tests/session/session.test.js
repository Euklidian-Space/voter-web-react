import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import sessionReducer, { initialState as sessionState } from '../../reducers/session/session';
import reducers from '../../reducers';
import { getRegistrationErrs } from '../../reducers/session/session_selector';
import { signup } from '../../actions/session';

describe("signup", () => {

	const mockResponse = (status, statusText, response, token) => {
		return new window.Response(response, {
			status,
			statusText,
			headers: {
				'Content-type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer: ${token}`
			}
		});
	}

	const createStroreWithMiddleware = applyMiddleware(thunk)(createStore);

	let store;

	beforeEach(() => {
		store = createStroreWithMiddleware(reducers)
	});

	it("should add registration_errs on api promise rejection", () => {
		let response = {
			errors: {
				username: ["can't be blank"],
				name: ["can't be blank"],
				credential: {
					password_hash: ["can't be blank"],
					email: ["can't be blank"]
				}
			}
		};

		const expected = {
			username: "can't be blank",
			name: "can't be blank",
			password: "can't be blank",
			email: "can't be blank"
		};

		window.fetch = jest.fn().mockImplementation(() => {
			return Promise.resolve(mockResponse(422, null, JSON.stringify(response)))
		});

		return store.dispatch(signup({}))
			.then(() => {
				let errs = getRegistrationErrs(store.getState());
				expect(errs).toEqual(expected);
			});
	});
});
