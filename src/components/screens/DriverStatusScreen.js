import React, { Component } from "react";
import { 
		View ,
		Text,
		Image,
	    BackHandler } from "react-native";
import RedBulb from "../../assets/driver_off.png";
import GreenBulb from "../../assets/driver_on.png";
import FlipToggle from 'react-native-flip-toggle-button';
import { Actions } from "react-native-router-flux";
class DriverStatusScreen extends Component {
    constructor() {

		super();


	}


	state = {
	
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
		  console.log("onBackPress1", Actions.state.index)
		  BackHandler.exitApp();
		  return false;
		}
		console.log("onBackPress2", Actions.state.index)
		Actions.pop();
		return true;
	  }



	
    renderBulbImage() {
		var imgSource = this.state.showRedBulb ? RedBulb : GreenBulb;
		return (
            
			<Image
				style={{ width: 128, height: 209 }}
				source={imgSource}
			/>
            
        );

        
    
     
    }
    
    componentDidUpdate() {
        setTimeout(()=>{
			Actions.pop();
            Actions.Dashboard();
			},1000);
       
    }

    render() {
        return(
            <View
            style = {{alignItems:'center',marginTop:50}}>
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
							buttonOnColor ="green"
							buttonOffColor ="red"
							labelStyle={{ fontSize: 16, color: 'white' }}
							onToggle={(value) => { this.setState({ isActive: value, showRedBulb: !this.state.showRedBulb }) }}

						/>
                </View>
        ) ;
    }
}
export default DriverStatusScreen;