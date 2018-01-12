import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { login, clearLoginErrs } from '../../actions/session';
import { getLoginErrs } from "../../reducers/session/session_selector";
import Form from '../Form';


export class LoginForm extends Component {
	onDismiss = () => {
		console.log("onDismiss!");
		this.props.clearLoginErrs();
	}

	onClickHandler = data => {
		this.props.login(data);
	}

	render() {
		const actions = [
				<FlatButton
					label="Dismiss"
					primary={true}
					onClick={this.onDismiss}
				/>
		];
		const fields = ["Email", "Password"] ;
		return (
			<div>
				<Form fields={fields} onClickHandler={this.onClickHandler}/>
				<Dialog
					actions={actions}
					modal={false}
					open={this.props.errors ? true : false}
					onRequestClose={this.onDismiss}
				>
					Incorrect email or password
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

export default connect(mapStateToProps, { login, clearLoginErrs })(LoginForm);
