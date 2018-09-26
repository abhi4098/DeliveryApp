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
import { Actions } from "react-native-router-flux";
import AppLogo from "../../assets/app_logo.png";
import PhoneIcon from "../../assets/phone.png";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-input";
import CountryPicker from 'react-native-country-picker-modal';
import Loader from '../common/Loader';


import {
  userPhoneChanged,
  receiveOtp,
  showReceiveOtpLoading,
  clearReceiveOtpData
} from "../../actions/index";




class CustomerLoginScreen extends Component {

  constructor(props) {
    super(props);
    // this.state = { pressStatus: false};
    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.state = {
      pressStatus: false,
      cca2: 'US',
      callingCode: '1',
      phone: '',
      receiveOtp: '',
      loading: false
    }
  }


  _onHideUnderlay() {
    this.setState({ pressStatus: false });
  }
  _onShowUnderlay() {
    this.setState({ pressStatus: true });
  }

  onPhoneChanged(phone) {
    this.props.userPhoneChanged(phone);

  }

  onSubmitButtonPress() {

    Keyboard.dismiss();
    if (this.props.phone == '') {
      Alert.alert("Please Enter Phone Number");
    }
    else {

      phoneNumber = '+' + this.state.callingCode + this.props.phone;
      AsyncStorage.setItem("userPhoneNumber", phoneNumber);

      this.props.showReceiveOtpLoading(true);
      //.OtpVerificationScreen();
      var optRequest = {
         phoneNumber: phoneNumber
      };
      this.props.receiveOtp(optRequest);
    }

  }

  componentDidMount() {



    if (this.props.receiveOtpResponseData != undefined && this.props.receiveOtpResponseData != '') {
      this.props.clearReceiveOtpData();
    }
    this.setState({
      pickerData: this.phone.getPickerData(),
    });
  }






  componentDidUpdate() {

    if (this.props.receiveOtpResponseData != undefined && this.props.receiveOtpResponseData != '') {
      this.props.clearReceiveOtpData();
    }
  }

  componentWillReceiveProps(nextProps) {


    if (nextProps.receiveOtpResponseData != undefined && nextProps.receiveOtpResponseData != '') {
      console.log("nextProps.receiveOtpResponseData'''''''''''''''''''''''---------------------", nextProps.receiveOtpResponseData);
      console.log("nextProps.receiveOtpResponseData.status'''''''''''''''''''''''---------------------", nextProps.receiveOtpResponseData.status);

      if (nextProps.receiveOtpResponseData.status == 200) {

        this.props.showReceiveOtpLoading(false);
        AsyncStorage.setItem("verificationCode", nextProps.receiveOtpResponseData.verificationCode);
        Actions.pop();
        Actions.OtpVerificationScreen();
      }

      else {
        this.props.showReceiveOtpLoading(false);

        alert(nextProps.receiveOtpResponseData.message);
        // this.props.clearLoginRecord();
      }

    }
  }

  onPressFlag() {
    this.countryPicker.openModal();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({
      cca2: country.cca2,
      callingCode: country.callingCode
    });

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


          <View style={styles.inputsContainer}>



            <View style={styles.inputContainer}>
              <View style={styles.container}>
                <PhoneInput
                  ref={(ref) => {
                    this.phone = ref;
                  }}
                  onPressFlag={this.onPressFlag}
                />

                <CountryPicker
                  ref={(ref) => {
                    this.countryPicker = ref;
                  }}
                  onChange={value => this.selectCountry(value)}
                  translation="eng"
                  cca2={this.state.cca2}
                >
                  <View />
                </CountryPicker>


              </View>
              <View>
                <TextInput
                  style={{ width: 210, flex: 1, fontSize: 18 }}
                  underlineColorAndroid='transparent'
                  keyboardType="numeric"
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


          <TouchableHighlight
            style={styles.buttonContainer}
            underlayColor={'#14136d'}
            onPress={this.onSubmitButtonPress.bind(this)}
            onHideUnderlay={this._onHideUnderlay.bind(this)}
            onShowUnderlay={this._onShowUnderlay.bind(this)}
          >
            <Text
              style={
                this.state.pressStatus
                  ? styles.buttonTextOnPress
                  : styles.buttonText
              }
            >SEND OTP</Text>
          </TouchableHighlight>








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
  container: {
    flex: 1,
    marginBottom: 5

  },

  loginText: {
    fontSize: 23,
    fontWeight: 'normal',
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
    alignContent: 'space-between',
    marginTop: 100
  },

  inputContainer: {
    flexDirection: 'row',
    width: 300,
    height: 40,
    marginTop: 50,
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

  buttonContainer: {

    marginTop: 50,
    padding: 5,
    width: 120,
    height: 33,
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
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: null,
    height: null
  },

  progress: {
    margin: 10,
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
    fontSize: 16,
    textAlign: 'center',
    width: 120,
    height: 35,

  }

});

const mapStateToProps = ({ otpReceive }) => {
  const { phone, receiveOtpResponseData, isLoading } = otpReceive;


  return {
    phone: phone,
    isLoading: isLoading,
    receiveOtpResponseData: receiveOtpResponseData
  }
}
export default connect(mapStateToProps, { userPhoneChanged, receiveOtp, showReceiveOtpLoading, clearReceiveOtpData })(CustomerLoginScreen);