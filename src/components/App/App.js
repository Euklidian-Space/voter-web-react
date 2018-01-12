import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import '../../style/App.css';

import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import FlatButton from 'material-ui/FlatButton';
import { registerRequest } from '../../actions/session';

const form = (willRegister, onClick) => {
	if (willRegister) {
		return <RegisterForm />;
	} else {
		return (
			<div>
				<LoginForm />
				<FlatButton
					secondary={true}
					label="Register"
					onClick={onClick}
				/>
			</div>
		);
	}
}


export class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Voter"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            style={{
              backgroundColor: "#4527A0"
            }}
          />
          <div className="container">
            <div className="row">
              <div className="col-md-2 col-md-offset-4">
								{ form(this.props.willRegister, this.props.registerRequest) }
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = state => {
	const { session } = state;
	return {
		willRegister: session.willRegister
	};
};

export default connect(mapStateToProps, { registerRequest })(App);
