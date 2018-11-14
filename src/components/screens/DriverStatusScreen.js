import React, { Component } from "react";
import {
	View,
	Text,
	Image,
	BackHandler,
	AsyncStorage
} from "react-native";
import RedBulb from "../../assets/driver_off.png";
import GreenBulb from "../../assets/driver_on.png";
import FlipToggle from 'react-native-flip-toggle-button';
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import {
	driverStatusCall,
	showDriverStatusLoading,
	clearDriverStatusRecord
} from "../../actions/index";
class DriverStatusScreen extends Component {
	constructor(props) {

		super(props);
		this.state = {
			loading: false,
			dashboardData: '',
		}


	}


	state = {

		isActive: false,
		showRedBulb: true

	};

	componentWillMount()
	{
		if (this.props.driverStatusResponseData != undefined && this.props.driverStatusResponseData != '') {
			this.props.clearDriverStatusRecord();
		}
	}

	componentDidMount() {
		
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
	}

	onBackPress() {
		if (Actions.state.index === 1) {
			
			BackHandler.exitApp();
			return false;
		}
		
		Actions.pop();
		return true;
	}




	renderBulbImage() {
		var imgSource = this.state.showRedBulb ?  GreenBulb : RedBulb ;
		return (

			<Image
				style={{ width: 128, height: 209 }}
				source={imgSource}
			/>

		);




	}

	componentWillReceiveProps(nextProps) {


		if (nextProps.driverStatusResponseData != undefined && nextProps.driverStatusResponseData != '') {
			

			if (nextProps.driverStatusResponseData.status == 200) {

				this.props.showDriverStatusLoading(false);

				AsyncStorage.setItem("userData", JSON.stringify(nextProps.driverStatusResponseData.data));
				Actions.pop();
				Actions.Dashboard();

			}

			else {
				this.props.showDriverStatusLoading(false);
				alert(nextProps.driverStatusResponseData.message);
				
			}

		}




	}

	onToggleButtonClicked() {
		
		AsyncStorage.getItem("userData").then((value) => {

			if (value) {
				userId = JSON.parse(value)._id;

				this.props.showDriverStatusLoading(true);
				if (JSON.parse(value).type == 'driver') {
					var driverStatus = {
						driverid: userId,
						dutystatus: 'off'

					};
				}
				this.props.driverStatusCall(driverStatus);


			}

		}).done();
	}
	render() {
		return (
			<View
				style={{ alignItems: 'center', marginTop: 50 }}>
				{this.renderBulbImage()}
				<Text
					style={{ fontSize: 25, color: '#14136d', fontWeight: 'bold', marginTop: 30, marginBottom: 20 }}>
					Current Status
				 </Text>


				<Text
					style={{ fontSize: 18, marginTop: 10, marginBottom: 40, marginStart: 10, marginEnd: 10 }}>
					Please select on Duty if you are Available and ready to Deliver !!
				 </Text>

				<FlipToggle
					value={this.state.isActive}
					buttonWidth={200}
					buttonHeight={50}
					buttonRadius={50}
					sliderWidth={50}
					sliderHeight={50}
					sliderRadius={50}
					onLabel={'ON DUTY'}
					offLabel={'OFF DUTY'}
					sliderOnColor="black"
					sliderOffColor="black"
					buttonOnColor="green"
					buttonOffColor="red"
					labelStyle={{ fontSize: 16, color: 'white' }}
					onToggle={(value) => { this.setState({ isActive: value, showRedBulb: !this.state.showRedBulb }), this.onToggleButtonClicked() }}

				/>
			</View>
		);
	}
}

const mapStateToProps = ({ driverStatusReducer }) => {
	const { driverStatusResponseData, isLoading } = driverStatusReducer;


	return {
		driverStatusResponseData: driverStatusResponseData,
		isLoading: isLoading
	}
}
export default connect(mapStateToProps, { driverStatusCall, showDriverStatusLoading,clearDriverStatusRecord })(DriverStatusScreen);