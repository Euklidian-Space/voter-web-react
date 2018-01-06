export const initialState = {
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

function flatten(obj) {
	const inner = (o, result) => {
		for (let prop in o) {
			let val = o[prop];
			if (typeof val !== "object") {
				result[prop] = val;
			} else if (Array.isArray(val)) {
				result[prop] = val[0];
			} else {
				result = inner(val, result);
			}
		}

		return result;
	};

	return inner(obj, {});
}

export default function (state = initialState, action) {
	switch (action.type) {
		case "REGISTRATION_REQUEST":
			return {
				...state,
				currentUser: {
					willRegister: true
				}
			};
		case "REGISTRATION_ERR":
			return {
				...state,
				errors: {
					registration_errs: flatten(action.response.errors),
					login_errs: state.errors.login_errs
				}
			};
		case "LOGIN_ERR":
			return {
				...state,
				errors: {
					registration_errs: state.errors.registration_errs,
					login_errs: action.response.errors
				}
			};
		case "AUTHENTICATION_REQUEST":
			return {
				...state,
				willAuthenticate: true
			};
		case "AUTHENTICATION_SUCCESS":
			return {
				...state,
				isAuthenticated: true,
				willAuthenticate: false,
				currentUser: {
					name: action.response.data.name,
					username: action.response.data.username,
					willRegister: false
				},
				errors: {
					registration_errs: null,
					login_errs: null
				}
			};
		case "CLEAR_ERRS":
			return {
				...state,
				errors: {
					registration_errs: null,
					login_errs: null
				}
			}
		default:
			return state;
	}
}
