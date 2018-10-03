import React, { Component } from 'react';
import {
	View,
	Text,
	BackHandler,
	StyleSheet,
	Image,
	TouchableHighlight,
	Button,
	Keyboard,
	Alert,
	AsyncStorage,
	FlatList,


} from 'react-native';
import { Actions, Stack } from 'react-native-router-flux';
import SideMenu from "react-native-side-menu";
import Menu from "./Menu";
import { connect } from "react-redux";
import hamburger from "../../assets/hamburger.png";
import { Card } from 'react-native-elements';
import UsernameIcon from "../../assets/name.png";
import Order from "../../assets/order.png";
import Time from "../../assets/time.png";
import Location from "../../assets/location.png";
import Tick from "../../assets/tick.png";



import {
	dashboardData,
	showDashBoardLoading,
	driverStatusCallFromDashboard,
	clearDriverStatusResponseRecord
} from "../../actions/index";


class Dashboard extends Component {
	constructor(props) {

		super(props);
		this.state = {
			loading: false,
			dashboardData: '',
			pressStatus: false,
			usertype: ''
		}
	}


	state = {
		isOpen: false,
		userType: 1,
		selectedItem: 'MyAddress',
		isActive: false,
		showRedBulb: true

	};

	componentWillMount() {
		if (this.props.driverStatusResponseData != undefined && this.props.driverStatusResponseData != '') {
			this.props.clearDriverStatusResponseRecord();
		  }
		this.getProfileData();


	}
	// _onHideUnderlay() {
	// 	this.setState({ pressStatus: false });
	//   }
	//   _onShowUnderlay() {
	// 	this.setState({ pressStatus: true });
	//   }

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
	}

	getProfileData() {

		AsyncStorage.getItem("userData").then((value) => {
			if (value) {
				usertype = JSON.parse(value).type;
				phoneNumber = JSON.parse(value).phone;
				userId = JSON.parse(value)._id;
				// userId = JSON.parse(value)._id;
				// this.setState({ name: JSON.parse(value).firstname + " " + JSON.parse(value).lastname })
				// this.setState({ email: JSON.parse(value).email });
				// this.setState({ phone: JSON.parse(value).phone });
				this.props.showDashBoardLoading(true);
				if (JSON.parse(value).type == 'customer') {
					var dashboard = {
						shipment_status: "Pending",
						userid: phoneNumber,
						type: usertype

					};
				}
				else {
					var dashboard = {
						shipment_status: "Pending",
						userid: userId,
						type: usertype

					};
				}

				this.props.dashboardData(dashboard);


			}

		}).done();

	}

	componentWillReceiveProps(nextProps) {





		if (nextProps.dasboardResponseData != undefined && nextProps.dasboardResponseData != '') {
			console.log("nextProps.dasboardResponseData'''''''''''''''''''''''---------------------", nextProps.dasboardResponseData);

			if (nextProps.dasboardResponseData.status == 200) {

				this.props.showDashBoardLoading(false);

				this.setState({ data: nextProps.dasboardResponseData.data })

			}

			else {
				this.props.showDashBoardLoading(false);
				alert(nextProps.dasboardResponseData.message);
				
				
			}


			
		}

		if (nextProps.driverStatusResponseData != undefined && nextProps.driverStatusResponseData != '') {
			console.log("nextProps.driverStatusResponseData'''''''''''''''''''''''---------------------", nextProps.driverStatusResponseData);

			if (nextProps.driverStatusResponseData.status == 200) {

				this.props.showDashBoardLoading(false);
				AsyncStorage.setItem("userData", '');
				//AsyncStorage.setItem("driverStatus", JSON.stringify(nextProps.driverStatusResponseData.data));
				console.log("driverStatus.......................................................");
				Actions.pop();
				BackHandler.exitApp();

			}

			else {
				this.props.showDashBoardLoading(false);
				alert(nextProps.driverStatusResponseData.message);
				
			}

		}






	}


	onBackPress() {
		if (Actions.state.index === 1) {
			console.log("onBackPress.............", Actions.state.index)
			BackHandler.exitApp();
			return false;
		}
		console.log("onBackPress..............", Actions.state.index)
		Actions.pop();
		return true;
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

	updateMenuState(isOpen) {
		this.setState({ isOpen, });
	}




	onMenuItemSelected = (item) => {
		this.setState({
			isOpen: false,
			selectedItem: item,

		});

		if (item == 'Dashboard') {
			Actions.Dashboard();
		}

		if (item == 'DriverProfileScreen') {
			Actions.DriverProfileScreen();
		}

		if (item == 'AcceptedDeliveryRequestScreen') {
			Actions.AcceptedDeliveryRequestScreen();
		}

		if (item == 'OrderDeliveredScreen') {
			Actions.OrderDeliveredScreen();
		}

		if (item == 'Logout') {
			//Actions.MapScreen();
			console.log("logout clicked..................................")
			//AsyncStorage.setItem("userData", '');
			//AsyncStorage.setItem("driverStatus", '');
			AsyncStorage.getItem("userData").then((value) => {

				if (value) {
					userId = JSON.parse(value)._id;
					this.props.showDashBoardLoading(true);
				
					if (JSON.parse(value).type == 'driver') {
						var driverStatus = {
							driverid: userId,
							dutystatus: 'on'
	
						};
					}
					this.props.driverStatusCallFromDashboard(driverStatus);
	
	
				}
	
			}).done();
			// Actions.pop();
			// BackHandler.exitApp();


		}

	}


	onPlaceOrderPress() {
		Alert.alert("Place Oreder Button Pressed");
	}

	_renderItem({ item }) {

		if (usertype == 'customer') {
			return <Card>
				<View style={styles.inputContainer}>
					<View style={styles.iconContainer}>
						<Image
							source={Order}
							style={styles.inputIcon}

						/>
					</View>
					<View>
						<Text
							style={styles.listHeaderText} >
							{item.packageno} </Text>
					</View>


				</View>
				<View style={styles.inputContainer}>
					<View style={styles.iconContainer}>
						<Image
							source={UsernameIcon}
							style={styles.inputIcon}

						/>
					</View>
					<View>
						<Text
							style={styles.listText} >
							{item.recipient_name} </Text>
					</View>


				</View>
				<View style={styles.inputContainer}>
					<View style={styles.iconContainer}>
						<Image
							source={Tick}
							style={styles.inputIcon}

						/>
					</View>
					<View>
						<Text
							style={styles.listText} >
							{item.receivedfrom} </Text>
					</View>


				</View>

				<View style={styles.inputContainer}>
					<View style={styles.iconContainer}>
						<Image
							source={Location}
							style={styles.inputIcon}

						/>
					</View>
					<View>
						<Text
							style={styles.listText} >
							{item.sender_address} </Text>
					</View>


				</View>
				<View
					style={{ marginTop: 20, alignItems: 'center' }}>
					<TouchableHighlight
						style={styles.buttonContainer}
						underlayColor={'#14136d'}
						onPress={() => Alert.alert("place order button pressed")}
					// onHideUnderlay={() => this.setState({ pressStatus: false })}
					// onShowUnderlay={() => this.setState({ pressStatus: false })}
					>
						<Text
							style={
								styles.buttonText
								// this.state.pressStatus
								//   ? styles.buttonTextOnPress
								//   : styles.buttonText
							}
						>Deliver Now</Text>
					</TouchableHighlight>
				</View>

			</Card>
				;
		}
		else {
			return <Card>
				<View style={styles.inputContainer}>
					<View style={styles.iconContainer}>
						<Image
							source={Order}
							style={styles.inputIcon}

						/>
					</View>
					<View>
						<Text
							style={styles.listHeaderText} >
							{item.packageno} </Text>
					</View>


				</View>
				<View style={styles.inputContainer}>
					<View style={styles.iconContainer}>
						<Image
							source={UsernameIcon}
							style={styles.inputIcon}

						/>
					</View>
					<View>
						<Text
							style={styles.listText} >
							{item.recipient_name} </Text>
					</View>


				</View>
				<View style={styles.inputContainer}>
					<View style={styles.iconContainer}>
						<Image
							source={Tick}
							style={styles.inputIcon}

						/>
					</View>
					<View>
						<Text
							style={styles.listText} >
							{item.receivedfrom} </Text>
					</View>


				</View>

				<View style={styles.inputContainer}>
					<View style={styles.iconContainer}>
						<Image
							source={Location}
							style={styles.inputIcon}

						/>
					</View>
					<View>
						<Text
							style={styles.listText} >
							{item.sender_address} </Text>
					</View>


				</View>
				<View
					style={{
						marginTop: 15,
						marginStart:5,
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}>
					<TouchableHighlight
						style={styles.acceptButtonContainer}
						underlayColor={'#27630a'}
						onPress={() => Alert.alert("Accept button pressed")}

					>
						<Text
							style={
								styles.acceptButtonText
								// this.state.pressStatus
								//   ? styles.buttonTextOnPress
								//   : styles.buttonText
							}
						>Accept</Text>
					</TouchableHighlight>

					<TouchableHighlight
						style={styles.rejectButtonContainer}
						underlayColor={'#A20518'}
						onPress={() => Alert.alert("Reject button pressed")}

					>
						<Text
							style={
								styles.acceptButtonText
								// this.state.pressStatus
								//   ? styles.buttonTextOnPress
								//   : styles.buttonText
							}
						>Reject</Text>
					</TouchableHighlight>

					<TouchableHighlight
						style={styles.callButtonContainer}
						underlayColor={'#0C0B42'}
						onPress={() => Alert.alert("call button pressed")}

					>
						<Text
							style={
								styles.acceptButtonText
								// this.state.pressStatus
								//   ? styles.buttonTextOnPress
								//   : styles.buttonText
							}
						>Call</Text>
					</TouchableHighlight>
				</View>

			</Card>
				;
		}
	}


	render() {


		const menu = <Menu
			onItemSelected={this.onMenuItemSelected}
			selectedMenu={this.state.selectedItem} />;
		return (
			<SideMenu
				menu={menu}
				isOpen={this.state.isOpen}
				menuPosition='left'
				onChange={(isOpen) => this.updateMenuState(isOpen)}>


				<View style={styles.parentContainer}>
					<View style={styles.logoContainer}>

						<TouchableHighlight underlayColor="transparent" style={styles.hamBurgerContainer} onPress={() => this.toggle()}>
							<Image
								source={hamburger}
								style={{ marginLeft: 5 }}
							>
							</Image>
						</TouchableHighlight>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}
						>Dashboard</Text>

					</View>
					<View
						style={{ alignItems: 'center', paddingBottom: 10 }}>
						<Text>Welcome back </Text>
					</View>
					<View style={styles.mainContainer}>


						<FlatList
							data={this.state.data}
							renderItem={this._renderItem}
							keyExtractor={this._keyExtractor}

						/>



					</View>

				</View>
			</SideMenu>
		);
	}
}

const styles = StyleSheet.create({

	mainContainer: {
		//alignItems: 'center',
		flex: 1,
		backgroundColor: '#f1f1fd',
		//paddingTop: 30
	},

	parentContainer: {
		flex: 1,
		backgroundColor: '#d2e0fc',//#2e97db',

	},
	dashboardListStyle: {
		marginRight: 10,
		marginLeft: 10,
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		elevation: 5,
		marginBottom: 15,
		marginBottom: 15


	},

	hamBurgerContainer: {
		alignItems: 'center',
		position: 'absolute',
		left: 0,
		width: 70,
	},

	logoContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 10
	},

	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',

	},

	iconContainer: {
		justifyContent: 'center',
		height: 35,
	},
	cardContainerRight: {
		flexDirection: 'row',
		alignContent: 'space-between',
	},

	cardContainerCenter: {
		flexDirection: 'row',
		alignContent: 'space-between',
		alignItems: 'center',
		justifyContent: 'center',
	},

	headerText: {
		fontSize: 13,
		backgroundColor: 'transparent',
		color: 'black',
		marginLeft: 20,
		marginRight: 20,
		textAlign: 'center',
	},
	listHeaderText: {
		fontSize: 15,
		backgroundColor: 'transparent',
		color: 'black',
		marginLeft: 10,
		marginRight: 10,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	listText: {
		fontSize: 14,
		backgroundColor: 'transparent',
		color: 'black',
		marginLeft: 10,
		marginRight: 10,
		textAlign: 'center',
	},


	buttonContainer: {

		backgroundColor: '#53a602',
		width: '30%',
		height: 25,
		alignItems: 'center',
		borderRadius: 25,
		padding: 3,
		borderColor: '#14136d',
		borderWidth: 1,
	},
	acceptButtonContainer: {

		backgroundColor: '#53a602',
		width: '30%',
		height: 25,
		alignItems: 'center',
		borderRadius: 10,
		padding: 1,
		borderColor: '#53a602',
		borderWidth: 1,
	}
	,

	rejectButtonContainer: {

		backgroundColor: '#d3071f',
		width: '30%',
		height: 25,
		alignItems: 'center',
		borderRadius: 10,
		padding: 1,
		borderColor: '#d3071f',
		borderWidth: 1,
	}
	,
	callButtonContainer: {

		backgroundColor: '#14136d',
		width: '30%',
		height: 25,
		alignItems: 'center',
		borderRadius: 10,
		padding: 1,
		borderColor: '#14136d',
		borderWidth: 1,
	}
	,
	inputIcon: {
		width: 25,
		height: 25,

	},
	buttonTextOnPress: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center',
		width: 120,
		height: 35,

	},
	buttonText: {
		color: '#14136d',
		fontWeight: 'bold',
		fontSize: 14,
		textAlign: 'center',
		width: 120,
		height: 30,

	},
	acceptButtonText: {
		color: '#ffffff',

		fontSize: 14,
		textAlign: 'center',
		width: 120,
		height: 25,


	}

});

const mapStateToProps = ({ dashboardReducer }) => {
	const { dasboardResponseData, isLoading,driverStatusResponseData } = dashboardReducer;


	return {
		dasboardResponseData: dasboardResponseData,
		driverStatusResponseData:driverStatusResponseData,
		isLoading: isLoading
	}
}
	
	export default connect(mapStateToProps, { dashboardData, showDashBoardLoading, clearDriverStatusResponseRecord,driverStatusCallFromDashboard})(Dashboard);