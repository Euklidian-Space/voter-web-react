
import { shallow } from 'enzyme';
import configureMockstore from 'redux-mock-store';
import thunk from 'redux-thunk'

export function mockStore(state) {
	return configureMockstore([thunk])(state);
}

export function shallowWithStore(component, store) {
	const context = {
		store
	};
	return shallow(component, { context });
}

export function shallowNoStore(component) {
	return shallow(component);
}
