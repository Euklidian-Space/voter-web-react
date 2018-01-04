import reducer from '../session';

const initialState = {
	isAuthenticated: false,
	willAuthenticate: false,
	currentUser: {
		willRegister: false,
		name: null,
		username: null
	},
	errors: {
		registration_errs: null,
		login_errs: null
	}
};

describe("session reducer", () => {
	it("should return initial state", () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it("should handle AUTHENTICATION_REQUEST", () => {
		expect(reducer(undefined, {type: "AUTHENTICATION_REQUEST", response: null}))
			.toMatchObject({
				willAuthenticate: true
			});
	});


	it("should handle REGISTRATION_REQUEST", () => {
		expect(reducer(undefined, { type: "REGISTRATION_REQUEST"}))
			.toMatchObject({
				currentUser: {
					willRegister: true
				}
			});
	});

	it("should handle REGISTRATION_ERR", () => {
		let errs = {
				field1: ["error message"]
		};
		let response = {
			errors: errs
		};

		expect(reducer(undefined, { type: "REGISTRATION_ERR", response }))
			.toMatchObject({
				errors: {
					registration_errs: {
						field1: "error message"
					}
				}
			});
	});

	it("should flatten error object received from backend API for REGISTRATION_ERR type", () => {
		let errs = {
			field1: ["err msg"],
			field2: {
				field2a: ["err msg"],
				field2b: ["err msg"]
			}
		}
		let response = { errors: errs };

		expect(reducer(undefined, { type: "REGISTRATION_ERR", response }))
			.toMatchObject({
				errors: {
					registration_errs: {
						"field1": "err msg",
						"field2a": "err msg",
						"field2b": "err msg"
					}
				}
			});
	});

	it("should handle LOGIN_ERR", () => {
		let errs = {
			detail: "Unauthorized"
		};
		let response = { errors: errs };
		expect(reducer(undefined, { type: "LOGIN_ERR", response }))
			.toMatchObject({
				errors: {
					login_errs: errs
				}
			});
	});

	describe("AUTHENTICATION_SUCCESS", () => {

		it("should be handled", () => {
			let response = {
				data: {
					name: "johndoe",
					username: "doejohn"
				}
			};
			expect(reducer(undefined, { type: "AUTHENTICATION_SUCCESS", response}))
				.toMatchObject({
					isAuthenticated: true,
					willAuthenticate: false,
					currentUser: {
						name: "johndoe",
						username: "doejohn",
						willRegister: false
					}
				});
		});

		it("should clear all errors", () => {
			let currentState = {
				...initialState,
				errors: {
					registration_errs: { field1: "err msg" },
					login_errs: { detail: "Unauthorized" }
				}
			};
			let response = {
				data: {
					name: "johndoe",
					username: "doejohn"
				}
			};

			expect(reducer(currentState, { type: "AUTHENTICATION_SUCCESS", response }))
				.toMatchObject({
					...currentState,
					isAuthenticated: true,
					currentUser: {
						name: "johndoe",
						username: "doejohn",
						willRegister: false
					},
					errors: {
						registration_errs: null,
						login_errs: null
					}
				});
		});

	});

});
