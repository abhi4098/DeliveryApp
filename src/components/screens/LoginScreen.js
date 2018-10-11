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
import { connect } from "react-redux";
import Loader from '../common/Loader';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

import { Actions } from "react-native-router-flux";
import UsernameIcon from "../../assets/username.png";
import PasswordIcon from "../../assets/password.png";



import AppLogo from "../../assets/app_logo.png";
import {
  usernameChanged,
  passwordChanged,
  showLoading,
  loginUser,
  clearLoginRecord,
} from "../../actions/index";




class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loginUser: '',
      password: '',
      username: '',
      isCustomer: false
    }
  }


  componentWillMount() {
    //Actions.Dashboard();
    this.props.usernameChanged('');
    this.props.passwordChanged('');

    this.props.showLoading(true);
   
    setTimeout(() => {
      AsyncStorage.getItem("userData").then((token) => {
        if (token) {
          if (token.length > 0) {
            Actions.Dashboard();
            this.props.showLoading(false);
          }
        } else {
          this.props.showLoading(false);
        }
      }).done();
    }, 500);

  }

  onUserNameChanged(username) {
    this.props.usernameChanged(username);
  }

  onPasswordChange(password) {
    this.props.passwordChanged(password);
  }

  onClickHerePress() {
    this.props.usernameChanged('');
    this.props.passwordChanged('');
    Actions.pop();
    Actions.ForgotPasswordScreen();
  }

  onRegisteNowPress() {
    this.props.usernameChanged('');
    this.props.passwordChanged('');
    Actions.RegistrationScreen();
  }

  onLoginButtonPress() {
   //Actions.Dashboard();
    

    Keyboard.dismiss();

    if (this.props.username == '') {
      Alert.alert("Please Enter Username");
    }
    else if (this.props.password == '') {
      Alert.alert("Please Enter Password");
    }
    else {
      this.props.showLoading(true);
      var user = {
        phone: this.props.username,
        password: this.props.password,
        accountstatus: 'active'

      };

      this.props.loginUser(user);
    }


  }



  componentWillReceiveProps(nextProps) {





    if (nextProps.loginResponseData != undefined && nextProps.loginResponseData != '') {
      console.log("nextProps.loginResponseData'''''''''''''''''''''''---------------------", nextProps.loginResponseData);

      if (nextProps.loginResponseData.status == 200) {

        this.props.showLoading(false);

        // Clear any previous data if exist.


        if (nextProps.loginResponseData.message == "UserExist" && nextProps.loginResponseData.data.type == userType) {
          AsyncStorage.setItem("userData", JSON.stringify(nextProps.loginResponseData.data));
          if (userType == 'driver') {
            this.props.usernameChanged('');
            this.props.passwordChanged('');

            Actions.pop();
            Actions.DriverStatusScreen();
          }
          else {
            Actions.pop();
            Actions.Dashboard();
          }
        }

        else {
          Alert.alert("Invalid Credentials")
        }


      }

      else {
        this.props.showLoading(false);
        alert(nextProps.loginResponseData.message);
        this.props.clearLoginRecord();
      }

    }




  }


  componentDidMount() {
    console.log("componentDidMount...............................................");
    AsyncStorage.getItem("nboxitUserType").then((nboxitUserType) => {
      userType = nboxitUserType;
      if (nboxitUserType == 'customer') {
        this.setState({ isCustomer: true })
      }
      else {
        this.setState({ isCustomer: false })
      }

    }).done();

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    if (this.props.loginResponseData != undefined && this.props.loginResponseData != '') {
      this.props.clearLoginRecord();
    }

  }


  componentDidUpdate() {
    console.log("componentDidUpdate...............................................");
    if (this.props.loginResponseData != undefined && this.props.loginResponseData != '') {
      this.props.clearLoginRecord();
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount...............................................");
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);

  }

  onBackPress() {
    if (Actions.state.index === 1) {
      console.log("onBackPress1.................", Actions.state.index)
      BackHandler.exitApp();
      return false;
    }
    console.log("onBackPress2..............", Actions.state.index)
    Actions.pop();
    return true;
  }


  renderRegisrationText() {
    if (this.state.isCustomer) {
      return ;
    } else {
      return<View
      style={{ alignItems: 'center', flexDirection: 'row', marginTop: 50 }}>
      <View>
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }} >Don't Have Account,</Text>
      </View>
      <TouchableHighlight underlayColor="transparent" >
        <View>
          <Text
            onPress={this.onRegisteNowPress.bind(this)}
            style={{ color: '#14136d', marginLeft: 5, fontSize: 16, fontWeight: 'bold' }} >Register Now</Text>
        </View>
      </TouchableHighlight>
    </View>;
    }
  }


  render() {
    return (

      <View style={{ flex: 1, backgroundColor: "#f1f1fd" }}>
        <Loader
          loading={this.props.isLoading} />
        <View style={styles.controlsContainer}>

          <Image

            source={AppLogo
            }></Image>
          <View>

            <Text
              style={styles.loginText}>
              LOGIN
						</Text>

          </View>

          <View style={styles.inputsContainer}>



            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={UsernameIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <View>
                <TextInput
                  style={{ width: 250, flex: 1, marginLeft: 10, fontSize: 18 }}
                  underlineColorAndroid='transparent'
                  autoCapitalize='none'
                  keyboardType='email-address'
                  returnKeyType='next'
                  placeholder="Enter Email/Phone No."
                  placeholderTextColor="#696969"
                  onChangeText={this.onUserNameChanged.bind(this)}
                  value={this.props.username}

                />
              </View>
            </View>

            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}
            />
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={PasswordIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <View>
                <TextInput
                  style={{ width: 250, flex: 1, marginLeft: 10, fontSize: 18 }}
                  underlineColorAndroid='transparent'
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="#696969"
                  onChangeText={this.onPasswordChange.bind(this)}
                  value={this.props.password}
                  ref='passwordField'
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
          <View style={styles.forgotPasswordContainer}>
            <View>
              <Text style={{ color: 'black', marginLeft: 5, fontWeight: 'bold', fontSize: 16 }} >Forgot Password,</Text>
            </View>
            <TouchableHighlight underlayColor="transparent" >
              <View>
                <Text
                  onPress={this.onClickHerePress.bind(this)}
                  style={{ color: '#14136d', marginLeft: 5, fontWeight: 'bold', fontSize: 16 }} >Click Here</Text>
              </View>
            </TouchableHighlight>
          </View>


          <View
            style={styles.buttonContainer}

          >
            <Text
              onPress={this.onLoginButtonPress.bind(this)}
              style={{
                color: '#14136d',
                fontWeight: 'bold',
                fontSize: 16,
                textAlign: 'center',
                width: 150,
                height: 35,
              }}
            >LOGIN</Text>
          </View>
          {this.renderRegisrationText()}
         





        </View>
      </View>

    );

  }
}

const styles = StyleSheet.create({



  welcomeContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,


    backgroundColor: '#f1f1fd',
    color: '#393939',
  },

  controlsContainer: {
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
  buttonContainer: {

    margin: 20,
    marginTop: 20,
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

  forgotPasswordContainer: {
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

  inputIcon: {
    width: 35,
    height: 35,
    marginBottom: 5
  }


});

const mapStateToProps = ({ login }) => {
  const { username, password, loginResponseData, isLoading } = login;


  return {
    username: username,
    password: password,
    loginResponseData: loginResponseData,
    isLoading: isLoading
  }
}
export default connect(mapStateToProps, { usernameChanged, passwordChanged, showLoading, loginUser, clearLoginRecord })(LoginScreen);