import { getRegistrationErrs, getLoginErrs } from "../session_selector";

describe("sesssion selector", () => {
	it("should return the errors present in redux state", () => {
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
});
