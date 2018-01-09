
export default function mockResponse(status, statusText, response, token) {
	return new window.Response(response, {
		status,
		statusText,
		headers: {
			'Content-type': 'application/json',
			'Accept': 'application/json',
			'Authorization': `Bearer: ${token}`
		}
	});
}
