import api from "../api";

function setCurrentUser(dispatch, response) {
	localStorage.setItem("token", JSON.stringify(response.token));
	dispatch({ type: "AUTHENTICATION_SUCCESS", response });
}

export function login(data) {
	return dispatch => {
		dispatch({ type: "AUTHENTICATION_REQUEST" });
		return api.post("/sessions", data)
			.then(response => {
				dispatch({ type: "AUTHENTICATION_SUCCESS", response });
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
