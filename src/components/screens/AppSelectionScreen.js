import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    Text,
    BackHandler,
    Keyboard,
    Alert
} from "react-native";
import { Actions } from "react-native-router-flux";
import AppLogo from "../../assets/app_logo.png";



class AppSelectionScreen extends Component {


    onDriverButtonPress(){
        Actions.LoginScreen();
    }

    onClientButtonPress(){
        Actions.CustomerLoginScreen();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#f1f1fd" }}>
                <View style={styles.controlsContainer}>

                    <Image

                        source={AppLogo
                        }></Image>
                    <View>
                        <Text
                            style={styles.loginText}>
                            Select Your Prefrence
            </Text>
                    </View>

                      <View
                 style ={{flexDirection:'row', marginTop:50, marginStart:10,marginEnd:10}}>
                        <View
                         style={styles.buttonContainer1} 
                      
                       >
                             <Text
                              onPress = {this.onDriverButtonPress.bind(this)}
                             style={{
                                      color:'#14136d',
                                      fontWeight:'bold',
                                      fontSize:16,
                                      textAlign:'center',
                                      width:120,
                                      height:35,
                                     
                                       }}
                             >DRIVER</Text>
						</View>

             <View
                         style={styles.buttonContainer2} 
                      
                       >
                             <Text
                              onPress = {this.onClientButtonPress.bind(this)}
                             style={{
                                      color:'#14136d',
                                      fontWeight:'bold',
                                      fontSize:16,
                                      textAlign:'center',
                                      width:120,
                                      height:35,
                                       }}
                             >CLIENT</Text>
						</View>
            </View>
           
                    </View>
                </View>

                );
            }
        }

        const styles = StyleSheet.create({

   
  
    welcomeContainer:{
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
    },
  
    loginText: {
      fontSize: 23,
      fontWeight:'normal',
      marginTop:20,
      marginBottom:30,
    
      backgroundColor: '#f1f1fd',
      color: '#393939',
    },
  
    controlsContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
     
    },
  
    inputsContainer: {
      alignContent: 'space-between'
    },
  
    inputContainer: {
      flexDirection: 'row',
      width: 300,
      height: 40,
      backgroundColor: '#f1f1fd',
      alignItems: 'center',
      shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
        marginTop: 25
    },
  
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
    },
  
    inputIcon: {
      width: 35,
      height: 35,
      marginBottom: 5
     
      
    },
  
    buttonContainer1:{
        
        
        marginTop:20,
        marginEnd:30,
        marginStart:10,
        padding:5,
        width:120,
        height:35,
        alignItems:'center',
        borderRadius: 25,
        padding: 5,
        borderColor:'#14136d',
        borderWidth: 1,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
        marginTop: 30,
        
       
        
    },
    buttonContainer2:{
        
        
        marginTop:20,
        marginEnd:10,
        padding:5,
        marginStart:30,
        width:120,
        height:35,
        alignItems:'center',
        borderRadius: 25,
        padding: 5,
        borderColor:'#14136d',
        borderWidth: 1,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
        marginTop: 30,
        
       
        
    },
  
    forgotContainer: {
      flexDirection: 'row',
      width: 300,
      height: 40,
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderRadius: 3,
      shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
        marginTop: 2
    },
  
    circles: {
      flex:1,
      left:0,
      right:0,
      top:0,
      bottom:0,
      position:'absolute',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'rgba(52, 52, 52, 0.8)',
      width: null,
        height: null
    },
  
    progress: {
      margin: 10,
    },
  
  });
export default AppSelectionScreen;