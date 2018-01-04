import { getRegistrationErrs, getLoginErrs } from "../session_selector";

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

	// it("should return login errors present in redux state", () => {
	// 	let state = {
	// 		session: {
	// 			errors: {
	// 				login_errs: "Unauthorized"
	// 			}
	// 		}
	// 	};
  //
	// 	expect(getLoginErrs(state))
	// 		.toMatchObject({})
	// });
});
