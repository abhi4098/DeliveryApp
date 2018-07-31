 import React, { Component } from 'react';
import { Scene ,Router} from 'react-native-router-flux';
//import LoginForm from "./components/LoginForm";
//import EmployeeList from './components/EmployeeList'
//import EmployeeCreate from './components/EmployeeCreate'
import { View,StyleSheet } from "react-native";
import { Actions,Stack } from "react-native-router-flux";
import Splash from './components/screens/Splash';
import LoginScreen from "./components/screens/LoginScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import RegistrationScreen from "./components/screens/RegistrationScreen";
import Dashboard from './components/screens/Dashboard';
import MapScreen from './components/screens/MapScreen';
import MyAddress from './components/screens/MyAddress';
import GeoLocationExampleScreen from './components/screens/GeoLocationExampleScreen';
import DriverProfileScreen from './components/screens/DriverProfileScreen';
import AcceptedDeliveryRequestScreen from './components/screens/AcceptedDeliveryRequestScreen';
import OrderDeliveredScreen from './components/screens/OrderDeliveredScreen';
import EditProfileScreen from './components/screens/EditProfileScreen';
import DriverStatusScreen from './components/screens/DriverStatusScreen';
import UpdatePasswordScreen from './components/screens/UpdatePasswordScreen';



const RouterComponent = () => {
	return(
		<Router
		navigationBarStyle={styles.navBar}>
        <Scene key ="root" >
		<Scene key="Splash"             
				   component={Splash}              
				   hideNavBar={true} 
				   initial
				    />
			
			<Scene 
				   key="LoginScreen"            
				   component={LoginScreen}   
				   hideNavBar={true}
				   
				 />
			<Scene
					key="ForgotPasswordScreen"           
					component={ForgotPasswordScreen}   
					hideNavBar={true}
					/>
			<Scene 
					key="RegistrationScreen"             
					component={RegistrationScreen}             
				    hideNavBar={true}  />
				

					<Scene 
					key="DriverStatusScreen"             
					component={DriverStatusScreen}             
				    hideNavBar={true}  />	

			<Scene
	                key="Dashboard"      
	                component={Dashboard}  
	                title = "Dashboard"
	                panHandlers={null}
					hideNavBar = {true}
					renderBackButton={()=><View/>}
	   />

	        <Scene
	                key="MapScreen"      
	                component={MapScreen}  
					title = "MapScreen"
					
	               
					
	   />

	    <Scene
	                key="MyAddress"      
	                component={MyAddress}  
					title = "My Address"
					
					
	                />

	     <Scene
	                key="GeoLocationExampleScreen"      
	                component={GeoLocationExampleScreen}  
					title = "GeoLocationExampleScreen"
				  
					
					
	               
					
	   />


 <Scene
					key="DriverProfileScreen"   
	                component={DriverProfileScreen}  
					title = "Driver Profile"
				
					
					
	                />

					 <Scene
	                key="AcceptedDeliveryRequestScreen"      
	                component={AcceptedDeliveryRequestScreen}  
					title = "Accepted Delivery Requests"
					
					
	                />

					 <Scene
	                key="OrderDeliveredScreen"      
	                component={OrderDeliveredScreen}  
					title = "Order Delivered"
					
					
	                />

						 <Scene
	                key="EditProfileScreen"      
	                component={EditProfileScreen}  
					title = "Edit Profile"
				
					
	                />

					 <Scene
	                key="UpdatePasswordScreen"      
	                component={UpdatePasswordScreen}  
					title = "Update Password"
				
					
	                />
	   


	 
    
       </Scene>

	
	 {/* </Scene> */}
	


		</Router>  
	);
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#F5FCFF',
	},
	welcome: {
	  fontSize: 20,
	  textAlign: 'center',
	  margin: 10,
	},
	instructions: {
	  textAlign: 'center',
	  color: '#333333',
	  marginBottom: 5,
	},
  
	navBar: {
	  backgroundColor:'#d2e0fc',//'#1a5fa2',
	},
  
	navBarTitle:{
	  color:'#FFFFFF'
	},
  
	barButtonTextStyle:{
		color:'#FFFFFF'
	},
  
	barButtonIconStyle:{
		tintColor:'rgb(255,255,255)'
	},
  
  });
export default RouterComponent; 