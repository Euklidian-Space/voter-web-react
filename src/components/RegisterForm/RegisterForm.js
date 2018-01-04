
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

import { signup } from '../../actions/session';
import { getRegistrationErrs } from '../../reducers/session/session_selector';
import Form from '../Form';

const onChange = (name, data) => e => {
	data[name.toLowerCase()] = e.target.value;
};

const fields = ["Name", "Username", "Email", "Password"];

const onClickHandler = handler => data => {
	console.log("click!", data);
	handler(data);
}

class RegisterForm extends Component {
	render() {
		let errors = this.props.errors;
		let props = { fields, errors, onClickHandler: onClickHandler(this.props.signup) };
		return <Form { ...props } />;
	}
};

const mapStateToProps = (state) => {
	return {
		errors:	getRegistrationErrs(state)
	};
};

export default connect(mapStateToProps, { signup })(RegisterForm);
