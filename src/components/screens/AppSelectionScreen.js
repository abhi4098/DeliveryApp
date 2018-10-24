import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    BackHandler,
    TouchableHighlight,
    AsyncStorage

} from "react-native";
import { Actions } from "react-native-router-flux";
import AppLogo from "../../assets/app_logo.png";
import DriverIcon from "../../assets/driver_icon.png";
import UserIcon from "../../assets/user_icon.png";





class AppSelectionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { pressStatus: false,selectedButton: null  };
    }

    _onHideUnderlay() {
        this.setState({ pressStatus: false });
    }
    _onShowUnderlay() {
        this.setState({ pressStatus: true });
    }

    onDriverButtonPress() {
        AsyncStorage.setItem("nboxitUserType", "driver");
        this.setState({ selectedButton: "driver" });
        Actions.pop();
       Actions.LoginScreen();
        
    }

    onClientButtonPress() {
        AsyncStorage.setItem("nboxitUserType", "customer");
        this.setState({ selectedButton: "client" });
        Actions.pop();
        Actions.CustomerLoginScreen();
       
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
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

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#f1f1fd" }}>
                <View style={styles.controlsContainer}>

                    <Image

                        source={AppLogo
                        }></Image>
                    <View style={{ marginTop: 30 }}>
                        <Text
                            style={styles.loginText}>
                            Select Your Preference
            </Text>
                    </View>

                    <View
                        style={{ flexDirection: 'row', marginTop: 20, marginStart: 20, marginEnd: 20 }}>


                        <View
                            style={styles.iconsStyle1}

                        >
                            <Image
                                style={{ width: 130, height: 130 }}
                                source={DriverIcon}
                            ></Image>
                        </View>

                        <View
                            style={styles.iconsStyle2}

                        >
                            <Image

                                source={UserIcon}
                                style={{ width: 130, height: 130 }}
                            ></Image>
                        </View>
                    </View>

                    <View
                        style={{ flexDirection: 'row', marginTop: 20, marginStart: 10, marginEnd: 10 }}>


                        <TouchableHighlight

                            style={styles.buttonContainer1}
                            underlayColor={'#14136d'}
                            onPress={this.onDriverButtonPress.bind(this)}
                            onHideUnderlay={this._onHideUnderlay.bind(this)}
                            onShowUnderlay={this._onShowUnderlay.bind(this)}
                        >
                            <Text
                                style={
                                    this.state.pressStatus && this.state.selectedButton == "driver"
                                        ? styles.buttonTextOnPress
                                        : styles.buttonText
                                }

                            >DRIVER</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.buttonContainer2}
                            underlayColor={'#14136d'}
                            onPress={this.onClientButtonPress.bind(this)}
                            onHideUnderlay={this._onHideUnderlay.bind(this)}
                            onShowUnderlay={this._onShowUnderlay.bind(this)}
                        >
                            <Text

                                style={
                                    this.state.pressStatus && this.state.selectedButton == "client"
                                        ? styles.buttonTextOnPress
                                        : styles.buttonText
                                }
                            >CLIENT</Text>
                        </TouchableHighlight>
                    </View>

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
    buttonContainer: {

        marginTop: 50,
        padding: 5,
        width: 120,
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

    buttonContainer1: {


        marginTop: 20,
        marginEnd: 30,
        marginStart: 10,
        padding: 5,
        width: 120,
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




    },
    buttonContainer2: {


        marginTop: 20,
        marginEnd: 10,
        padding: 5,
        marginStart: 30,
        width: 120,
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

    iconsStyle1: {

        marginEnd: 15,

    },

    iconsStyle2: {

        marginStart: 15,


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
export default AppSelectionScreen;