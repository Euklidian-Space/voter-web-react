import reducer from '../user_reducer';

describe("user reducer", () => {
	it("should return initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			willRegister: false
		});
	});

	it("should handle REGISTRATION_REQUEST", () => {
		expect(reducer(undefined, { type: "REGISTRATION_REQUEST" })).toEqual({
			willRegister: true
		});
	});
});
