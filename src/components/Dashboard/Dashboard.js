
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { getUserInfo } from '../../reducers/session/session_selector';
import { GridList } from 'material-ui/GridList';

const Dashboard = ({ welcomeMessage, grids, gridListProps }) => {
	if (grids === undefined || grids() === null) return <div>No grids given</div>;
	return (
		<MuiThemeProvider>
			<div>
				<div>{welcomeMessage}</div>
				<GridList {...gridListProps}>
					{
						grids()
					}
				</GridList>
			</div>
		</MuiThemeProvider>
	);
};

export default Dashboard;

// export class Dashboard extends Component {
// 	render() {
// 		return (
// 			<div>
// 				<div>Hello, {this.props.name}</div>
// 				<div className="container">
// 					<div className="row">
// 						<div className="col-md-2 col-md-offset-4">
// 							<div className="btnHorizAlign"> <FlatButton label="Create Poll"/> </div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }
//
// const mapStateToProps = state => {
// 	const { name } = getUserInfo(state);
// 	return {
// 		name
// 	};
// }
//
// export default connect(mapStateToProps)(Dashboard);
