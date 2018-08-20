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
import PhoneIcon from "../../assets/phone.png";




class CustomerLoginScreen extends Component {

    onPhoneChanged(){

    }

    onSubmitButtonPress(){
       
    }


    onDriverButtonPress(){
        Actions.LoginScreen();
    }

    onClientButtonPress(){
        Actions.Dashboard();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#f1f1fd" }}>
            
                    <View style={styles.controlsContainer}>
            
                      <Image
                        source={AppLogo
                        }></Image>
                     
            
                      <View style={styles.inputsContainer}>
            
    
            
                        <View style={styles.inputContainer}>
                          <View style={styles.iconContainer}>
                            <Image
                              source={PhoneIcon}
                              style={styles.inputIcon}
                              resizeMode="contain"
                            />
                          </View>
                          <View>
                            <TextInput
                              style={{ width: 250, flex: 1, marginLeft: 10, fontSize: 18 }}
                              underlineColorAndroid='transparent'
                              keyboardType = "numeric"
                              placeholder="Phone Number"
                              placeholderTextColor="#696969"
                              onChangeText={this.onPhoneChanged.bind(this)}
                              value={this.props.phone}
                           
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                          }}
                        />
            
                      
                      </View>
            
                      <View
                        style={styles.buttonContainer}
            
                      >
                        <Text
                          onPress={this.onSubmitButtonPress.bind(this)}
                          style={{
                            color: '#14136d',
                            fontWeight: 'bold',
                            fontSize: 16,
                            textAlign: 'center',
                            width: 150,
                            height: 35,
                          }}
                        >SEND OTP</Text>
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
      alignContent: 'space-between',
      marginTop:100
    },
  
    inputContainer: {
      flexDirection: 'row',
      width: 300,
      height: 40,
      marginTop:50,
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
  
    buttonContainer:{
        
        marginTop:50,
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
export default CustomerLoginScreen;