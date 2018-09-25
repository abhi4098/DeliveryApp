import React, { Component } from "react";
import {
    Text,
    View,
    Button,
    TextInput,
    Image,
    ScrollView,
    Alert,
    AsyncStorage,
    TouchableHighlight,
    StyleSheet
} from "react-native";
import { Actions } from "react-native-router-flux";
import AppLogo from "../../assets/app_logo.png";
import CodeInput from 'react-native-confirmation-code-input';
import SmsListener from 'react-native-android-sms-listener';
import { PermissionsAndroid } from 'react-native';
import Loader from '../common/Loader';
import { connect } from "react-redux";
import CountDown from 'react-native-countdown-component';

import {
    verifyOtp,
    showVerifyOtpLoading,
    resendOtp,
    clearVerifyOtpData
    
} from "../../actions/index";
class OtpVerificationScreen extends Component {


    constructor(props) {
        super(props);

        this.state = {
            pressStatus: false,
            loading: false,
            code: '',
            phoneNumber: '',
            smsOTP: '',
            isTimerVisible: true
        }
    }

    componentDidUpdate() {

        if(this.props.verifyOtpResponseData != undefined && this.props.verifyOtpResponseData != ''){
          this.props.clearVerifyOtpData();
        }
    }
    async requestReadSmsPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_SMS, {
                    title: 'Auto Verification OTP',
                    message: 'need access to read sms, to verify OTP'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("RECEIVE_SMS permissions granted")
            } else {
                console.log("RECEIVE_SMS permission denied")
            }
        } catch (err) {
            console.warn(err)
        }

    }

    componentDidMount() {

        this.requestReadSmsPermission();
        SmsListener.addListener(message => {
            console.log("sms listerner response........................", message.body);
            code = message.body;
            this.setState({ code: message.body });

            

        });


        AsyncStorage.getItem("userPhoneNumber").then((userPhoneNumber) => {
            if (userPhoneNumber) {
                this.setState({ phoneNumber: userPhoneNumber });
            } else {
                phoneNumber = "";
            }
        }).done();


        AsyncStorage.getItem("verificationCode").then((otp) => {
            if (otp) {
                smsOTP = otp;

            } else {
                smsOTP = "";
            }
        }).done();

    }
    _onHideUnderlay() {
        this.setState({ pressStatus: false });
    }
    _onShowUnderlay() {
        this.setState({ pressStatus: true });
    }

    onVerifyOtpButtonPress() {

        Actions.RegistrationScreen();
    }



    _onFulfill(code) {
        // TODO: call API to check code here
        // If code does not match, clear input with: this.refs.codeInputRef1.clear()
        if (code == null)
            alert("Please enter OTP");
            console.error("code-----------------------------------------", code)
            console.error("sms otp............................................", smsOTP)
        if (code == smsOTP) {
            this.props.showVerifyOtpLoading(true);
            var optVerifyRequest = {
                phoneNumber: phoneNumber,
                code: code
            };
            this.props.verifyOtp(optVerifyRequest);

        } else {
            console.log("code-----------------------------------------", code)
            console.log("sms otp............................................", smsOTP)
            Alert.alert(
                'Confirmation Code',
                'Code not match!',
                [{ text: 'OK' }],
                { cancelable: false }
            );

            this.refs.codeInputRef1.clear();
        }
    }


    componentWillReceiveProps(nextProps) {


        if (nextProps.verifyOtpResponseData != undefined && nextProps.verifyOtpResponseData != '') {
            console.log("nextProps.verifyOtpResponseData'''''''''''''''''''''''---------------------", nextProps.verifyOtpResponseData);
            console.log("nextProps.verifyOtpResponseData.status'''''''''''''''''''''''---------------------", nextProps.verifyOtpResponseData.status);

            if (nextProps.verifyOtpResponseData.status == 200) {

                this.props.showVerifyOtpLoading(false);
                //AsyncStorage.setItem("verificationCode", nextProps.receiveOtpResponseData.verificationCode);


                // Actions.RegistrationScreen();
            }

            else {
                this.props.showVerifyOtpLoading(false);

                alert(nextProps.verifyOtpResponseData.message);
                // this.props.clearLoginRecord();
            }

        }

        if (nextProps.resendOTPResponseData != undefined && nextProps.resendOTPResponseData != '') {
            console.log("nextProps.resendOTPResponseData'''''''''''''''''''''''---------------------", nextProps.resendOTPResponseData);
            console.log("nextProps.resendOTPResponseData.status'''''''''''''''''''''''---------------------", nextProps.resendOTPResponseData.status);

            if (nextProps.resendOTPResponseData.status == 200) {

                this.props.showVerifyOtpLoading(false);
                //AsyncStorage.setItem("verificationCode", nextProps.receiveOtpResponseData.verificationCode);


                // Actions.RegistrationScreen();
            }

            else {
                this.props.showVerifyOtpLoading(false);

                alert(nextProps.resendOTPResponseData.message);
                // this.props.clearLoginRecord();
            }

        }
    }

    onResendOTPPressed(){
        this.props.showVerifyOtpLoading(true);
        var resendOptRequest = {
            phoneNumber: phoneNumber
         };
         this.props.resendOtp(resendOptRequest);
        this.setState({ isTimerVisible: true })  
    }


    displayTimer() {
        if (this.state.isTimerVisible) {
            return <CountDown
                style={{ marginTop: 40, borderColor: "#14136d" }}
                until={10}
                onFinish={() => this.onTimerFinish()}
                onPress={() => alert('hello')}
                size={15}
                timeToShow={['M', 'S']}
                digitBgColor="#D3D3D3"
                digitTxtColor="#808080"
                timeTxtColor="#D3D3D3"

            />;
        } else {
            return <Text
                style={styles.textStyle3}
                onPress={this.onResendOTPPressed.bind(this)}
            >Resend OTP?</Text>;
        }
    }

    onTimerFinish() {
        this.setState({ isTimerVisible: false })
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: "#f1f1fd" }}>

                <ScrollView>
                    <Loader
                        loading={this.props.isLoading} />
                    <View style={styles.controlsContainer}>

                        <Image
                            style={{ marginBottom: 30, marginTop: 130 }}
                            source={AppLogo
                            }></Image>

                        <Text
                            style={styles.textStyle1}
                        >Enter 6 Digit OTP Number</Text>
                        <Text
                            style={styles.textStyle2}
                        >{this.state.phoneNumber}</Text>


                        <CodeInput
                            ref="codeInputRef1"
                            secureTextEntry
                            className={'border-b'}
                            value={this.state.code}
                            space={5}
                            size={35}
                            codeLength={6}
                            keyboardType="numeric"
                            inputPosition='left'
                            inactiveColor='rgba(211, 211, 211, 1)'
                            activeColor='rgba(20, 19, 109, 1)'
                            onFulfill={(code) => this._onFulfill(code)}
                            containerStyle={{ marginTop: 40, marginBottom: 10, }}

                        />
                        {this.displayTimer()}

                      
                        <TouchableHighlight
                            style={styles.buttonContainer}
                            underlayColor={'#14136d'}
                            onPress={this.onVerifyOtpButtonPress.bind(this)}
                            onHideUnderlay={this._onHideUnderlay.bind(this)}
                            onShowUnderlay={this._onShowUnderlay.bind(this)}
                        >
                            <Text
                                style={
                                    this.state.pressStatus
                                        ? styles.buttonTextOnPress
                                        : styles.buttonText
                                }
                            >SUBMIT</Text>
                        </TouchableHighlight>
                    </View>




                </ScrollView>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    mainViewStyles: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'

    },
    textInputStyle: {
        fontSize: 18,
        width: 250,
        marginBottom: 10,
        marginTop: 20

    },
    controlsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30


    },
    buttonContainer: {

        marginTop: 80,
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
    textStyle1: {
        marginTop: 20,
        fontSize: 20,
        color: '#000000'
    },
    textStyle2: {

        fontSize: 13,
        color: '#000000'
    },
    textStyle3: {
        color: '#c70c1a',
        fontSize: 16,
        marginTop: 40
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

const mapStateToProps = ({ verifyReceivedOtp }) => {
    const { verifyOtpResponseData, isLoading,resendOTPResponseData } = verifyReceivedOtp;


    return {
        isLoading: isLoading,
        verifyOtpResponseData: verifyOtpResponseData,
        resendOTPResponseData: resendOTPResponseData
    }
}
export default connect(mapStateToProps, { verifyOtp, showVerifyOtpLoading,resendOtp,clearVerifyOtpData })(OtpVerificationScreen);