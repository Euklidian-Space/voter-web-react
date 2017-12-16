import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';


let data = {
	email: null,
	password: null
}

const fieldsReady = () => data.email && data.password;

const RBclicked = handler => () => {
	if (fieldsReady) {
		handler(data.email, data.password);
	}
};

function onChange(name) {
	return e => {
		data[name.toLowerCase()] = e.target.value;
	}
}

const Login =  ({ btnAction }) => {
	return (
		<div>
			<div>
				<TextField
					hintText="Email field"
					floatingLabelText="Email"
					onChange={ onChange("Email") }
				/> <br/>
				<TextField
					hintText="Password field"
					floatingLabelText="Password"
					onChange={ onChange("Password") }
				/> <br/>
			</div>
			<div>
				<RaisedButton
					label="Log In"
					onClick={ RBclicked(btnAction) }
				/>
				<RaisedButton
					label="Register"
				/>
			</div>
		</div>
	);
}


Login.propTypes = {
	btnAction: PropTypes.func.isRequired,
	registerAction: PropTypes.func.isRequired
};

export default Login;
