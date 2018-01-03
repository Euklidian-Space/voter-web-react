import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';


class LoginForm extends Component {
	state = {
		open: false
	};
	render() {
		const actions = [
				<FlatButton
					label="cancel"
					primary={true}
					onClick={() => this.setState({open: false})}
				/>
		];
		// return (
		// 	<div>
		// 		<RaisedButton label="Alert" onClick={() => this.setState({open: true})} />
		// 		<Dialog
		// 			actions={actions}
		// 			modal={false}
		// 			open={this.state.open}
		// 			onRequestClose={() => this.setState({open: false})}
		// 		>
		// 			Discard?
		// 		</Dialog>
		// 	</div>
		// );
		return (
			<div>
				<Dialog
					actions={actions}
					modal={false}
					open={true}
					onRequestClose={() => null}
				>
					Hello
				</Dialog>
			</div>
		);
	}
}

// const mapStateToProps = state => {
// 	return {
// 		errors: state.session.
// 	}
// };

export default connect()(LoginForm);
