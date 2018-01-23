import { getRegistrationErrs, getLoginErrs, willAuthenticate, getUserInfo } from "../session_selector";
import { initialState as sessionState } from '../session';

describe("sesssion selector", () => {
	it("should return registration errors present in redux state", () => {
		let state = {
			session: {
				errors: {
					registration_errs: {
						"error": "details"
					}
				}
			}
		};
		expect(getRegistrationErrs(state))
			.toMatchObject({"error": "details"});
	});

	describe("getLoginErrs", () => {
		it("should return login errors present in redux state", () => {
			let state = {
				session: {
					errors: {
						login_errs: {"detail": "Unauthorized"}
					}
				}
			};

			expect(getLoginErrs(state))
				.toBe("Unauthorized");
		});

		it("should handle null and undefined login_errs", () => {
			let state = {
				session: {
					errors: { login_errs: null }
				}
			};

			expect(getLoginErrs(state)).toBe(null);
		});
	});

	describe("willAuthenticate", () => {
		it("should return the willAuthenticate piece of redux state", () => {
			let state = {
				session: {
					willAuthenticate: true
				}
			};

			expect(willAuthenticate(state)).toBe(true);
		});
	});

	describe("getUserInfo", () => {
		it("should return currentUser", () => {
			const currentUser = { name: "john", username: "johnny5" };
			const state = {
				session: { ...sessionState, currentUser }
			};
			expect(getUserInfo(state)).toEqual(currentUser);
		});
	});
});
