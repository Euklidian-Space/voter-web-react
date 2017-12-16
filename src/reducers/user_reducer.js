const initialState = {
	willRegister: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case "REGISTRATION_REQUEST":
			return {
				...state,
				willRegister: true
			};
		default:
			return state;

	}
};
