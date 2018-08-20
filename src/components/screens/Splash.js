import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
	AppRegistry,
	StyleSheet,
	Dimensions,
	View,
	Image,
  	Platform,
  	AsyncStorage,
} from 'react-native';

//var isLogin = false;
import {Actions} from 'react-native-router-flux';

import splashImage from "../../assets/splash_screen.png";
// const isLogin = false;
export default class Splash extends Component{

	componentWillMount() {
		setTimeout(()=>{
			console.log("user data................................")

			AsyncStorage.getItem("userData").then((token) => {
			    if(token) {
					console.log("user data........................",token)
			    	if(token.length > 0){
			    		Actions.Dashboard();
			    	}else{
			    		Actions.AppSelectionScreen();
					}
				}else{
						Actions.AppSelectionScreen();
					}
				}
		
			
			)

			
		},2000);
		
		
	}

	render(){
		return(			
			<View style={{flex:1, justifyContent:'center'}}>
              	<Image style={{flex:1, width: null, height: null,justifyContent:'center', alignItems:'center'}}
                source={splashImage}>               
              	</Image>
            </View>
		);
	}
}


const styles = StyleSheet.create({
	background:{
	    flex: 1,
    	width: null,
    	height: null,
    	alignItems: 'center',
	    justifyContent: 'center',
	},
	
	logoContainer:{
     position : 'absolute',
     alignItems: 'center',
    },
});