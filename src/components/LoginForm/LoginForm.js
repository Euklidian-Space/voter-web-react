import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { login } from '../../actions/session';
import { getLoginErrs } from "../../reducers/session/session_selector";

class LoginForm extends Component {
	render() {
		const actions = [
				<FlatButton
					label="cancel"
					primary={true}
					onClick={() => null}
				/>
		];
		return (
			<div>
				<Dialog
					actions={actions}
					modal={false}
					open={this.props.errors ? true : false}
					onRequestClose={() => null}
				>
					Hello
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		errors: getLoginErrs(state)
	};
};

export default connect(mapStateToProps, { login })(LoginForm);
