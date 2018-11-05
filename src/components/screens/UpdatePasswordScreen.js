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
    Alert,
    AsyncStorage
} from "react-native";

import {
    userPasswordUpdate,
    showUpdatePasswordLoading,

    
  } from "../../actions/ProfileActions";
  import Loader from '../common/Loader';
  import Button  from '../common/Button';
import AppLogo from "../../assets/app_logo.png";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
class UpdatePasswordScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
         //...other state
         userPasswordUpdate: '',
         loading: false,
         updatePasswordResponseData:'',
         newPassword: '',
         confirmPassword:'',
        };
    }
       

    onchangeButtonPress(){
        
        Keyboard.dismiss();
         
        if (this.state.newPassword == ''){
          Alert.alert("Please Enter New Password");
        }
        else{
            this.props.showUpdatePasswordLoading(true);
        AsyncStorage.getItem("userData").then((value) => {
            if(value) {
                userId = JSON.parse(value)._id;
                
                
              

                var updatePass={
                    password: this.state.newPassword,
                   /*  email: this.state.email,
                    phone: this.state.phone, */
                    userId:userId
                    
                  }
                
                  this.props.userPasswordUpdate(updatePass);
            
          }
        
        }).done();
    }
    } 

   

    componentWillReceiveProps(nextProps)
    {
      if(nextProps.updatePasswordResponseData != undefined && nextProps.updatePasswordResponseData != '')
      {
        this.props.showUpdatePasswordLoading(false);

          if(nextProps.updatePasswordResponseData.status == 200){
            alert("Password Updated");
            Actions.pop();
            Actions.pop();
            Actions.Dashboard();
          }
        
        else{
          this.props.showUpdatePasswordLoading(false);
          alert(nextProps.updatePasswordResponseData.message);
          //this.props.clearLoginRecord();
        }
      }
    }
    render() {
        return (
           
            <View
                style={{ flex: 1, backgroundColor: '#fff',justifyContent:'flex-end' }}>
                <Loader
          loading={this.props.isLoading} />
                <View
                    style={styles.imageContainer}>

                    <Image
                       // style={{ width: 200, height: 50 }}
                        source={AppLogo
                        }></Image>





                </View>

                <View
                    style={{ backgroundColor: '#f1f1fd', paddingBottom: 20 }}>
                     <TextInput
                  style={styles.inputTextStyle}
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  placeholder="New Password"
                  onChange={this.changeName} 
                  value={this.state.newPassword}
                  onChangeText = {(newPassword) => this.setState({newPassword})}
                 
                 
                />
                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            marginStart: 10,
                            marginEnd: 10
                        }}
                    />

                </View>

              
                <View
                style={{ flex: 1, backgroundColor: '#fff', 
                alignItems: 'center',
                marginBottom:20 }}>
                <Button
                  
                  onPress={() =>this.onchangeButtonPress()}
                             
       > UPDATE</Button>
             
          </View>

          
            </View>
        );
    }
}

const styles = StyleSheet.create({



    imageContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 40,
        backgroundColor: '#f1f1fd',
    },

    inputTextStyle: {
        fontSize: 18,
        paddingStart: 10,
        paddingEnd: 10,
        paddingBottom: 5,
        paddingTop: 25
    }
,  buttonContainer: {

    margin: 20,
    marginTop: 40,
    padding: 5,
    width: 150,
    height: 35,
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
    marginTop: 30,



  },



});

const mapStateToProps = ({ profile }) => {
    const { updatePasswordResponseData, isLoading } = profile;
    
  
    return {
        updatePasswordResponseData: updatePasswordResponseData,
        isLoading: isLoading
    }
  }

export default connect(mapStateToProps,{userPasswordUpdate,showUpdatePasswordLoading})(UpdatePasswordScreen);