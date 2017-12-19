
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

import { signup } from '../../actions/session';
import { getRegistrationErrs } from '../../reducers/session/session_selector';

// const fieldsReady = fields => {
// 	let vals = Object.values(fields);
// 	for (let i = 0; i < vals.length; i++) {
// 		if (!vals[i]) return false;
// 	}
//
// 	return true;
// };

const onClickHandler = (data, handler) => () => {
	console.log(process.env.REACT_APP_API_URL);
	// if (fieldsReady(data))
	handler(data);
}

const onChange = (name, data) => e => {
	data[name.toLowerCase()] = e.target.value;
};

let data = {
	name: null,
	username: null,
	email: null,
	password: null
};

const form = errs => {
	let fields = ["Name", "Username", "Email", "Password"];
	return (
		<div>
			{ fields.map(f => {
				let prop = f === "Password" ? `${f.toLowerCase()}_hash` : f.toLowerCase();
				console.log(f + " prop: ", prop);
				return (
					<div key={f}>
						<TextField
							hintText={`${f} field`}
							floatingLabelText={f}
							onChange={ onChange(f, data) }
							errorText={errs[prop]}
						/> <br/>
					</div>
				);
			}) }
		</div>
	);
};
class RegisterForm extends Component {

	// constructor() {
	// 	this
	// }

	render() {
		let errors = this.props.errors ? this.props.errors : {};
		return (
			<div>
				{ form(errors) }
				<RaisedButton
					label="Register"
					onClick={onClickHandler(data, this.props.signup)}
				/>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		errors:	getRegistrationErrs(state)
	};
};

export default connect(mapStateToProps, { signup })(RegisterForm);
