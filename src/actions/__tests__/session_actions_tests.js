import configureMockstore from "redux-mock-store";
import thunk from "redux-thunk";
import { login, signup } from "../session";
import { getRegistrationErrs, getLoginErrs } from '../../reducers/session/session_selector';

const middlewares = [ thunk ];
const mockStore = configureMockstore(middlewares);
const store = mockStore({});

const mockResponse = (status, statusText, response, token) => {
	return new window.Response(response, {
		test: "dootie",
		status,
		statusText,
		headers: {
			'Content-type': 'application/json',
			'Accept': 'application/json',
			'Authorization': `Bearer: ${token}`
		}
	});
}

let token, username, name, password, response, post_data;

beforeEach(() => {
	 token = "random_string_!@#$";
	 username = "pooter123";
	 name = "dooter";
	 password = "password123";
	 response = {
		meta: { token },
		data: {
			username,
			name,
			id: 6
		}
	};
  post_data = {};

});

describe("login", () => {

	window.fetch = jest.fn().mockImplementation(() => {
		return Promise.resolve(mockResponse(200, null, JSON.stringify(response), token));
	});

	it("should exist", () => {
		expect(login).toBeDefined();
	});

	it("should return a function", () => {
		expect(typeof login()).toBe("function");
	});

	it("should dispatch AUTHENTICATION_REQUEST action if fetch response was successful", () => {
		return store.dispatch(login(post_data))
			.then(() => {
				const expectedActions = store.getActions();
				expect(expectedActions).toContainEqual({ type: "AUTHENTICATION_REQUEST" });
				expect(expectedActions).toContainEqual({ type: "AUTHENTICATION_SUCCESS", response });
			});
	});
});

describe("signup", () => {
	response = {
		meta: { token },
		data: {
			username,
			name,
			id: 6
		}
	};

	window.fetch = jest.fn().mockImplementation(() => {
		return Promise.resolve(mockResponse(200, null, JSON.stringify(response), token));
	});

	it("should exist", () => {
		expect(signup).toBeDefined();
	});

	it("should return a function", () => {
		expect(typeof signup(post_data)).toBe("function");
	});

	it("should dispatch AUTHENTICATION_SUCCESS action if fetch was successfull", () => {
		return store.dispatch(signup(post_data))
			.then(() => {
				const expectedActions = store.getActions();
				expect(expectedActions).toContainEqual({ type: "AUTHENTICATION_SUCCESS", response });
			});
	});

	it("should dispatch REGISTRATION_ERR action if response contains an 'errors' field", () => {
		let errs = {
			username: ["can't be blank"],
			name: ["can't be blank"],
			credential: {
				password_hash: ["can't be blank"],
				email: ["can't be blank"]
			}
		};
		response = {
			errors: errs
		};

		window.fetch = jest.fn().mockImplementation(() => {
			return Promise.resolve(mockResponse(422, null, JSON.stringify(response)))
		});

		return store.dispatch(signup(post_data))
			.then(() => {
				const expectedActions = store.getActions();
				const state = store.getState();
				expect(expectedActions).toContainEqual({ type: "REGISTRATION_ERR", response });
			});
	});
});
