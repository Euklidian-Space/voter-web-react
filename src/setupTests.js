const localStorageMock = {
	getItem: jest.fn().mockImplementation(() => JSON.stringify("token")),
	setItem: jest.fn(),
	clear: jest.fn()
};
global.localStorage = localStorageMock;
