import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import '../../style/App.css';

import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import Dashboard from '../Dashboard/Dashboard';
import FlatButton from 'material-ui/FlatButton';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import { MdMouse } from 'react-icons/lib/md';
import { registerRequest } from '../../actions/session';
import { getUserInfo } from '../../reducers/session/session_selector';

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
};

const grids = names => () => {
	return names.map(name => <GridTile key={name}/>);
};

const userPresent = obj => obj.name && obj.username;

const form_or_dashboard = props => {
  const { currentUser, willRegister, registerRequest } = props;
	if (userPresent(currentUser)) {
		return <Dashboard {...dashBoardProps} />
	}
	
	return form(willRegister, registerRequest)
};

const gridListProps = {
	style: {
		width: 500,
		height: 450,
		overflowY: 'auto'
	},
	cellHeight: 180
};

export class App extends Component {
  render() {
		const dashBoardProps = {
			welcomeMessage: `Welcome, ${this.props.currentUser.name}`,
			grids: grids(["1", "2", "3"]),
			gridListProps
		};

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
								{form_or_dashboard(this.props)}
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
		willRegister: session.willRegister,
		currentUser: getUserInfo(state)
	};
};

export default connect(mapStateToProps, { registerRequest })(App);
