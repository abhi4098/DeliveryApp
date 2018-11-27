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
	TouchableOpacity,
	Swiper,
	Dimensions,
	ImageBackground

} from 'react-native';
import { Actions, Stack } from 'react-native-router-flux';
import SideMenu from "react-native-side-menu";
import Menu from "./Menu";
import { connect } from "react-redux";
import hamburger from "../../assets/hamburger.png";
import { Card, List } from 'react-native-elements';
import UsernameIcon from "../../assets/name.png";
import Order from "../../assets/order.png";
import DummyOrder from "../../assets/dummyOrder.png";
import Phone from "../../assets/phone.png";
import HalfBottomIcon from "../../assets/halfBottom.png";
import Moment from 'moment';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { PermissionsAndroid } from 'react-native';
import FlipToggle from 'react-native-flip-toggle-button';
import DashListIcon from "../../assets/dashboardlistIcon.png";
import DashPersonIcon from "../../assets/dashmanIcon.png";
import DashTruckIcon from "../../assets/dashTruckIcon.png";
import DashRoundIcon from "../../assets/dashroundIcon.png";
var userType = '';





import {
	dashboardData,
	showDashBoardLoading,
	driverStatusCallFromDashboard,
	clearDriverStatusResponseRecord,
	dashboardCounts
} from "../../actions/index";
import { bold } from 'ansi-colors';


class Dashboard extends Component {
	constructor(props) {

		super(props);
		this.state = {
			loading: false,
			dashboardData: '',
			dashboardCounts:'',
			pressStatus: false,
			isActive: true,
			userType: ''
		}
	}



	componentWillMount() {
		console.log("componentWillMount////////////////////////////////////////////////////////")

		if (this.props.driverStatusResData != undefined && this.props.driverStatusResData != '') {
			this.props.clearDriverStatusResponseRecord();
		}
		this.getProfileData();


	}
	async requestMakeCallPermission(number) {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.CALL_PHONE, {
					title: 'Make Call',
					message: 'need access to call from phone'
				}
			)
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {

				RNImmediatePhoneCall.immediatePhoneCall(number);
			} else {

			}
		} catch (err) {

		}

	}


	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	}

	componentWillUnmount() {

		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);

	}

	getProfileData() {

		AsyncStorage.getItem("userData").then((value) => {
			if (value) {

				phoneNumber = JSON.parse(value).phone;
				userId = JSON.parse(value)._id;
				userType = JSON.parse(value).type;

				this.props.showDashBoardLoading(true);
				if (JSON.parse(value).type == 'customer') {
					var dashboard = {
						shipment_status: "Pending",
						userid: phoneNumber,
						type: JSON.parse(value).type

					};
					this.props.dashboardData(dashboard);
				}
				else {
					var dashCount = {
						id:userId

					};
					this.props.dashboardCounts(dashCount)
				}




			}

		}).done();

	}



	componentWillReceiveProps(nextProps) {

		if (nextProps.dashboardCountResponse != undefined && nextProps.dashboardCountResponse != '') {


			if (nextProps.dashboardCountResponse.status == 200) {
				this.props.showDashBoardLoading(false);
                //console.log("dasg board count.....................................",nextProps.dashboardCountResponse.data[2].assignedJobs);
				this.setState({ data: nextProps.dashboardCountResponse.data })

			}

			else {
				this.props.showDashBoardLoading(false);
				alert(nextProps.dashboardCountResponse.message);


			}



		}



		if (nextProps.dasboardResponseData != undefined && nextProps.dasboardResponseData != '') {

			//console.log("dasboardResponseData.....................................");
			if (nextProps.dasboardResponseData.status == 200) {
				this.props.showDashBoardLoading(false);

				this.setState({ data: nextProps.dasboardResponseData.data })

			}

			else {
				this.props.showDashBoardLoading(false);
				alert(nextProps.dasboardResponseData.message);


			}



		}

		if (nextProps.driverStatusResData != undefined && nextProps.driverStatusResData != '') {

			//console.log("driverStatusResData.....................................");
			if (nextProps.driverStatusResData.status == 200) {


				this.props.showDashBoardLoading(false);

				AsyncStorage.getItem("isClicked").then((value) => {
					if (value) {

						if (value == 'logout') {
							AsyncStorage.setItem("userData", '');
							AsyncStorage.setItem("isClicked", '');
							Actions.pop();
							Actions.AppSelectionScreen();
						}
						else {
							AsyncStorage.setItem("isClicked", '');
							Actions.pop();
							Actions.DriverStatusScreen();
						}
					}
					else {
						AsyncStorage.setItem("isClicked", '');
						Actions.pop();
						Actions.DriverStatusScreen();
					}

				}).done();


			}

			else {
				this.props.showDashBoardLoading(false);
				alert(nextProps.driverStatusResData.message);

			}

		}






	}


	onBackPress() {
		console.log("Actions state index....................", Actions.state.index);
		if (Actions.state.index === 1) {

			BackHandler.exitApp();
			return false;
		}

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

		if (item == 'MyAddress') {
			Actions.MyAddress({ from: 'Dashboard' });
		}

		if (item == 'AcceptedDeliveryRequestScreen') {
			Actions.AcceptedDeliveryRequestScreen();
		}

		if (item == 'OrderDeliveredScreen') {
			Actions.OrderDeliveredScreen();
		}
		if (item == 'PinLocation') {
			Actions.MapScreen({ from: 'SlidingMenu' });
		}


		if (item == 'Logout') {
			//Actions.MapScreen();

			AsyncStorage.setItem("isClicked", 'logout');
			this.onLogoutOrToggleClicked();
			this.setState({ isActive: false });
			// Actions.pop();
			// BackHandler.exitApp();


		}

	}

	onLogoutOrToggleClicked() {
		AsyncStorage.getItem("userData").then((value) => {

			if (value) {

				userId = JSON.parse(value)._id;
				this.props.showDashBoardLoading(true);

				if (JSON.parse(value).type == 'driver' && !this.state.isActive) {
					var driverStatus = {
						driverid: userId,
						dutystatus: 'on'

					};
					this.props.driverStatusCallFromDashboard(driverStatus);
				}
				else if (JSON.parse(value).type == 'customer') {
					AsyncStorage.setItem("userData", '');
					Actions.pop();
					BackHandler.exitApp();

				}



			}

		}).done();
	}
	onPlaceOrderPress() {
		Alert.alert("Place Oreder Button Pressed");

	}

	_onPress(item) {
		// your code on item press
		AsyncStorage.getItem("userData").then((value) => {

			if (value) {

				if (JSON.parse(value).type == 'driver') {
					console.log("recipient_address add...................................", item.recipient_address);
					Actions.GeoLocationExampleScreen({ destination: item.recipient_address });
				}
				else if (JSON.parse(value).type == 'customer') {

					Actions.MapScreen({ shipmentId: item._id, from: 'Dashboard' });
				}



			}

		}).done();



	};

	_onPhoneIconPress(item) {

		this.requestMakeCallPermission(item.sender_phone);

	}


	renderFlipFlopToggleButton() {

		if (userType != 'customer') {
			return <View
				style={{
					flexDirection: 'row',
					justifyContent: 'flex-end',
					marginEnd: 10,
					alignItems:"center",
					position:'absolute',
					right:0,
					bottom:0
					
				
				}}>

				<Text
					style={styles.onDutyText}
				>On-Duty</Text>
				<FlipToggle
				
					value={this.state.isActive}
					buttonWidth={40}
					buttonHeight={12}
					buttonRadius={50}
					sliderWidth={10}
					sliderHeight={10}
					sliderRadius={50}
					
					//onLabel={'ON DUTY'}
					//offLabel={'OFF DUTY'}
					sliderOnColor="black"
					sliderOffColor="black"
					buttonOnColor="green"
					buttonOffColor="red"
					//labelStyle={{ fontSize: 16, color: 'white' }}

					onToggle={(value) => { this.setState({ isActive: value }), this.onLogoutOrToggleClicked() }}

				/>
			</View>;
		}
		else {
			return;
		}



	}


	renderFlatList() {
		console.log("usertype..........................................", userType);
		if (userType == 'customer') {
			return <View
				style={{
					flex: 1
				}}>

				<FlatList
					data={this.state.data}
					renderItem={this._renderItem.bind(this)}
					keyExtractor={this._keyExtractor}

				/>
			</View>;
		}
		else {

			console.log("values........................................",this.state.data);

			return <View style={styles.container}>
				<View style={styles.content}>
					<View style={{ backgroundColor: '#ffffff', flex: 1, justifyContent: 'center' }}>

						<View style={styles.rowContent}>
						<TouchableOpacity
						style={{ backgroundColor: '#e8e8e8', height: "45%", justifyContent: 'center', alignItems: 'center' }}
								onPress={() =>Actions.OpenJobsScreen()}
							>
							
								<Image

									source={DashTruckIcon
									}
								></Image>
								<Text
									style={{ color: '#2a2a2a', fontSize: 12, marginTop: 25, }}
								>OPEN</Text>
								<Text
									style={{ color: '#2a2a2a', fontWeight: "bold", fontSize: 17, marginBottom: 5 }}
								>JOBS</Text>
								<ImageBackground
								style={{width: 70, height: 70, alignItems:'center',justifyContent:'center'}}
                                    source={DashRoundIcon
									}>
									<Text
									style={{fontSize:24,color:'#14136d',fontWeight:"bold"}}>20</Text>
									</ImageBackground>
							
							</TouchableOpacity>
							
							<TouchableOpacity 
							onPress={() => Actions.AcceptedDeliveryRequestScreen()}
						
							style={{ backgroundColor: '#f2f2f2', height: "55%", justifyContent: 'center', alignItems: 'center' }}
							>
								<Image

									source={DashListIcon
									}
								></Image>

								<Text
									style={{ color: '#2a2a2a', fontSize: 12, marginTop: 25, }}
								>ASSIGNED</Text>
								<Text
									style={{ color: '#2a2a2a', fontWeight: "bold", fontSize: 17, marginBottom: 5 }}
								>SHIPMENTS</Text>
								
									<ImageBackground
								style={{width: 70, height: 70, alignItems:'center',justifyContent:'center'}}
                                    source={DashRoundIcon
									}>
									<Text
									style={{fontSize:25,color:'#14136d',fontWeight:"bold"}}>10</Text>
									</ImageBackground>
							</TouchableOpacity>

						</View>
					</View>
					<TouchableOpacity style={{ backgroundColor: '#ffffff', flex: 1, justifyContent: 'center', alignItems: 'center' }}
					onPress={() => Actions.OrderDeliveredScreen()}>
						<Image

							source={DashPersonIcon
							}
						></Image>
						<Text
							style={{ color: '#2a2a2a', fontSize: 12, marginTop: 25, }}
						>SHIPMENT</Text>
						<Text
							style={{ color: '#2a2a2a', fontWeight: "bold", fontSize: 17, marginBottom: 5 }}
						>DELIVERED</Text>

						<ImageBackground
								style={{width: 70, height: 70, alignItems:'center',justifyContent:'center'}}
                                    source={DashRoundIcon
									}>
									<Text
									style={{fontSize:25,color:'#14136d',fontWeight:"bold"}}>10</Text>
									</ImageBackground>
					</TouchableOpacity>
				</View>
			</View>;
		}


	}

	_renderItem({ item, index }) {
		Moment.locale('en');
		var dt = item.receiveddate;
		var orderStatus = item.shipment_status;
		return <TouchableOpacity
			onPress={() => this._onPress(item)}
		>
			<Card
				containerStyle={{ padding: 0, marginTop: 15, marginEnd: 6, marginStart: 6 }}
			//	onPress={this._onPress}
			>

				<View style={styles.inputContainer}>
					<View
						style={styles.statusIconContainer}>
						<Text
							style={
								orderStatus == "Pending"
									? styles.statusTextContainer1
									: styles.statusTextContainer
							}
						>{item.shipment_status}</Text>
						<View style={styles.iconContainer}>


							<Image
								source={DummyOrder}
								style={styles.inputIcon}

							/>

						</View>
					</View>
					<View
						style={styles.informationContainer}>

						<View style={styles.phoneIconContainer}
						>

							<TouchableOpacity
								onPress={() => this._onPhoneIconPress(item)}
							>

								<Image
									source={Phone}
									style={styles.phoneIcon}

								/>
							</TouchableOpacity>
						</View>

						<View
							style={{ flexDirection: 'row' }}>
							<Text
								style={{ fontSize: 14, color: '#333333' }}
							>ORDER ID  :  </Text>
							<Text
								style={{ fontSize: 14, color: '#5e5e5e' }}
							>{item.packageno}</Text>

						</View>

						<View
							style={{ flexDirection: 'row', marginBottom: 30 }}>

							<Image
								source={HalfBottomIcon}
								style={styles.halfBottomIcon}

							/>
							<Text
								style={{ fontSize: 11, color: '#333333', marginTop: 11, marginStart: 3, }}
							>WAREHOUSE : </Text>
							<Text
								numberOfLines={4}

								style={{ fontSize: 11, color: '#53a602', marginTop: 11, paddingEnd: 20, flexWrap: 'wrap', flex: 1 }}
							>{item.sender_address}</Text>

						</View>

						<Text
							style={styles.shippingDateContainer}
						>Shipped on {Moment(dt).format('DD/MM/YYYY')}</Text>

					</View>
				</View>
			</Card>
		</TouchableOpacity>;



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
								style={{ width: 40, height: 40 }}
							>
							</Image>
						</TouchableHighlight>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}
						>Dashboard</Text>
						
                           {this.renderFlipFlopToggleButton()}
					</View>
                           


					<View style={styles.mainContainer}>

						
						{this.renderFlatList()}





					</View>

				</View>
			</SideMenu>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		height: " 100%",
		
	},

	rowContent: {
		flex: 1,
		alignItems: 'stretch',
		flexDirection: 'column',
	},
	content: {
		flex: 1,
		alignItems: 'stretch',
		flexDirection: 'row',
	},
	mainContainer: {

		flex: 1,
		backgroundColor: '#f1f1fd',

	},

	parentContainer: {
		flex: 1,
		backgroundColor: '#d2e0fc',//#2e97db',

	},


	hamBurgerContainer: {
		alignItems: 'center',
		position: 'absolute',
		left: 0,
		width: 70,
	},
	cardContainer: {
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
	},
	logoContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 20
	},

	inputContainer: {
		flexDirection: 'row',
		position: "relative"
		//alignItems: 'center',

	},
	statusIconContainer: {
		marginLeft: 10,
		flexDirection: 'column'


	},
	statusTextContainer: {
		backgroundColor: '#53a602',
		fontSize: 10,
		padding: 2,
		textAlign: 'center',
		color: '#ffffff'

	},
	statusTextContainer1: {
		backgroundColor: '#e60722',
		fontSize: 10,
		padding: 2,
		textAlign: 'center',
		color: '#ffffff'

	},
	shippingDateContainer: {

		alignSelf: 'flex-end',
		backgroundColor: '#d2e0fc',
		fontSize: 10,
		paddingTop: 3,
		paddingBottom: 3,
		paddingStart: 5,
		paddingEnd: 5,
		textAlign: 'center',
		color: '#5e5e5e',

		position: "absolute",
		bottom: 0,
		right: 0


	},

	iconContainer: {
		backgroundColor: '#d2e0fc',
		alignItems: "center",
		padding: 10,
		marginTop: 15,
		marginBottom: 15,

	},
	informationContainer: {
		marginStart: 10,
		flex: 1,
		flexDirection: "column",


	},
	phoneIconContainer: {
		alignSelf: 'flex-end',
		// position:"absolute",
		// right: 0

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
		width: 50,
		height: 50,

	},
	phoneIcon: {
		width: 40,
		height: 40,



	},

	halfBottomIcon: {
		width: 12,
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
	, onDutyText: {
		color: '#000000',
		fontSize: 15,
		alignItems: 'center',
		marginEnd: 5,
		marginBottom:2
		
		




	}

});

const mapStateToProps = ({ dashboardReducer }) => {
	const { dasboardResponseData,dashboardCountResponse, isLoading, driverStatusResData } = dashboardReducer;


	return {
		dasboardResponseData: dasboardResponseData,
		dashboardCountResponse: dashboardCountResponse,
		driverStatusResData: driverStatusResData,
		isLoading: isLoading
	}
}

export default connect(mapStateToProps, { dashboardData,dashboardCounts, showDashBoardLoading, clearDriverStatusResponseRecord, driverStatusCallFromDashboard })(Dashboard);