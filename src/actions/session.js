import api from "../api";
// const API_URL = process.env.REACT_APP_API_URL;

export function login(data) {
	return dispatch => {
		dispatch({ type: "AUTHENTICATION_REQUEST" });
		return api.post("/users", data)
			.then(response => {
				dispatch({ type: "AUTHENTICATION_SUCCESS", response });
			});
	};
}

export function signup(data) {
	return dispatch => {
		return api.post("/sessions", data)
			.then(response => {
				if (response.errors) {
					dispatch({ type: "REGISTRATION_ERR", response });
				} else {
					dispatch({ type: "AUTHENTICATION_SUCCESS", response });
				}
			});
	};
}
