const API = process.env.REACT_APP_API_URL;
//const API = 'http://localhost:4000/api';

function headers() {
  // const token = JSON.parse(localStorage.getItem('token'));
	const token = localStorage.getItem("token");
	// console.log("localStorage: " + localStorage.getItem("token"));

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${token}`,
  };
}

function parseResponse(response) {
  return response.json().then((json) => {
    if (!response.ok) {
			console.log(json);
      return Promise.reject(json);
    }
    return json;
  });
}

function queryString(params) {
  const query = Object.keys(params)
                      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
                      .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  fetch(url, params = {}) {
    return fetch(`${API}${url === "root" ? "" : url}${queryString(params)}`, {
      method: 'GET',
      headers: headers(),
    })
    .then(parseResponse);
  },

  post(url, data) {
    const body = JSON.stringify(data);

		return fetch(`${API}${url}`, {
      method: 'POST',
			headers: headers(),
			body: body
		})
		.then(parseResponse);
  },

  patch(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${API}${url}`, {
      method: 'PATCH',
      headers: headers(),
      body,
    })
    .then(parseResponse);
  },

  delete(url) {
    return fetch(`${API}${url}`, {
      method: 'DELETE',
      headers: headers(),
    })
    .then(parseResponse);
  },
};
