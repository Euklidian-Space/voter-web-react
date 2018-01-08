import reducers from '../../reducers';
import { getRegistrationErrs, getLoginErrs } from '../../reducers/session/session_selector';
import { signup, login } from '../../actions/session';
import realStore from '../../testing_utils/integration_store';


let store;

beforeEach(() => {
	store = realStore(reducers);
});

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

describe("signup", () => {

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

describe("login", () => {

	it("should add login_errs on api promise rejection", () => {
		const response = {
			errors: { detail: "Unauthorized" }
		};

		const expected = "Unauthorized";

		window.fetch = jest.fn().mockImplementation(() => {
			return Promise.resolve(mockResponse(422, null, JSON.stringify(response)))
		});

		return store.dispatch(login({}))
			.then(() => {
				let errs = getLoginErrs(store.getState());
				expect(errs).toEqual(expected);
			});

	});

});
