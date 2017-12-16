import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import '../../style/App.css';

import Login from '../LoginForm/Login';
import RegisterForm from '../RegisterForm/RegisterForm';
import { login } from '../../actions/session';

// const paper_style = {
//   height: 300,
//   width: 300,
//   margin: "1em",
//   textAlign: 'center',
//   display: 'inline-block'
// };


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			willRegister: false
		};
	}

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
								{ /* { !this.state.willRegister ? <Login btnAction={ login }/> : "" } */ }
								<RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
