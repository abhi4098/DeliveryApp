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
    AsyncStorage
} from 'react-native';
import { Actions, Stack } from 'react-native-router-flux';
import SideMenu from "react-native-side-menu";
import Menu from "./Menu";
import hamburger from "../../assets/hamburger.png";



class Dashboard extends Component {
	constructor() {

		super();

		// Creating Global Variable.
		//global.isLogin = true;
		console.log(global.isLogin)
	}


	state = {
		isOpen: false,
		userType: 1,
		selectedItem: 'MyAddress',
		isActive: false,
		showRedBulb: true

	};

	
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
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
			AsyncStorage.setItem("userData", '');
			Actions.pop();
			BackHandler.exitApp();
			

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
								resizeMode="contain">
							</Image>
						</TouchableHighlight>
                  <Text
				  style={{fontSize:20, fontWeight:'bold'}}
				  >Dashboard</Text>
				  
					</View>
                     <View
					   style = {{alignItems:'center',paddingBottom:10}}>
					<Text>Welcome back </Text>
					</View>
					<View style={styles.mainContainer}>

				




						

						 

					</View>

				</View>
			</SideMenu>
		);
	}
}

const styles = StyleSheet.create({

	mainContainer: {
		alignItems: 'center',
		flex: 1,
		backgroundColor: '#f1f1fd',
		paddingTop: 30
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

	logoContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 10
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

	buttonContainer: {



		padding: 5,
		width: 130,
		height: 40,
		alignItems: 'center',
		borderRadius: 25,
		padding: 5,
		borderColor: '#14136d',
		borderWidth: 1,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 10,
		shadowOpacity: 0.25,




	},

});
export default Dashboard;