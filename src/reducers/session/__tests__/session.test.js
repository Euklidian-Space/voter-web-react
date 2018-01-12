import reducer, { initialState } from '../session';
import deepFreeze from '../../../testing_utils/deepFreeze';

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
			  willRegister: true
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
					willRegister: false,
					currentUser: {
						name: "johndoe",
						username: "doejohn",
					}
				});
		});

		it("should clear all errors", () => {
			let currentState = deepFreeze({
				...initialState,
				errors: {
					registration_errs: { field1: "err msg" },
					login_errs: { detail: "Unauthorized" }
				}
			});
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
					willRegister: false,
					currentUser: {
						name: "johndoe",
						username: "doejohn",
					},
					errors: {
						registration_errs: null,
						login_errs: null
					}
				});
		});

	});

	describe("Clearing Errors", () => {
		let currentState = deepFreeze({
			...initialState,
			errors: {
				registration_errs: { field1: "err msg" },
				login_errs: { detail: "Unauthorized" }
			}
		});
		it("should handle CLEAR_LOGIN_ERRS", () => {
			expect(reducer(currentState, { type: "CLEAR_LOGIN_ERRS" }))
				.toMatchObject({
					errors: {
						registration_errs: { field1: "err msg" },
						login_errs: null
					}
				});
		});

		it("should handle CLEAR_REG_ERRS", () => {
			expect(reducer(currentState, { type: "CLEAR_REG_ERRS" }))
				.toMatchObject({
					errors: {
						registration_errs: null,
						login_errs: { detail: "Unauthorized" }
					}
				});
		});
	});

});
