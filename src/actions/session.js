import api from "../api";

function setCurrentUser(dispatch, response) {
	localStorage.setItem("token", JSON.stringify(response.token));
	dispatch({ type: "AUTHENTICATION_SUCCESS", response });
}

export function login({ email, password }) {
	let data = {
		user: {
			credential: {
				email: email || "",
				password_hash: password || ""
			}
		}
	};

	return dispatch => {
		dispatch({ type: "AUTHENTICATION_REQUEST" });
		return api.post("/sessions", data)
			.then(response => {
				dispatch({ type: "AUTHENTICATION_SUCCESS", response });
			}).catch(({ errors }) => {
				dispatch({ type: "LOGIN_ERR", response: { errors }});
			});
	};
}

export function signup({ username, name, email, password }) {
	let data = {
		username,
		name,
		credential: {
			email,
			password_hash: password
		}
	};
	return dispatch => {
		return api.post("/users", data)
			.then(response => {
				setCurrentUser(dispatch, response);
			}).catch(({ errors }) => {
				dispatch({ type: "REGISTRATION_ERR", response: { errors } });
			});
	};
}

export function clearLoginErrs() {
	return dispatch => dispatch({ type: "CLEAR_LOGIN_ERRS" });
}

export function clearRegErrs() {
	return dispatch => dispatch({ type: "CLEAR_REG_ERRS" });
}

export function registerRequest() {
	return dispatch => dispatch({ type: "REGISTRATION_REQUEST" });
}
