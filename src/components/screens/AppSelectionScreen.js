import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    BackHandler,
    TouchableHighlight,
    AsyncStorage,
    TouchableOpacity

} from "react-native";
import { Actions } from "react-native-router-flux";
import AppLogo from "../../assets/app_logo.png";
import DriverIcon from "../../assets/driver_icon.png";
import UserIcon from "../../assets/user_icon.png";
import Button  from '../common/Button';





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
            
            BackHandler.exitApp();
            return false;

        }
        
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
                        style={{flexDirection: 'row', marginTop: 30, marginStart: 10, marginEnd: 10,   }}>


                      <TouchableOpacity onPress={() =>this.onDriverButtonPress()} style= {styles.buttonStyle}>
		<Text style = {styles.textStyle}>
        DRIVER
			</Text>
            </TouchableOpacity>

             <TouchableOpacity  onPress={() =>this.onClientButtonPress()} style= {styles.buttonStyle1}>
		<Text style = {styles.textStyle}>
        CLIENT
			</Text>
            </TouchableOpacity>
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
    },
    textStyle: {
        
        fontSize: 16,
        fontWeight: '600',
        marginTop:6,
        color:'#fff'
        
    },

	buttonStyle: {
        width:100,
	    alignItems:'center',
		borderRadius: 3,
		backgroundColor: '#14136d',
        height:35,
        shadowOpacity:0.3,
        shadowRadius:3,
        shadowColor:'#000',
        shadowOffset:5,
        elevation: 3,
        marginEnd:30

    },
    buttonStyle1: {
        width:100,
        marginStart:30,
	    alignItems:'center',
		borderRadius: 3,
		backgroundColor: '#14136d',
        height:35,
        shadowOpacity:0.3,
        shadowRadius:3,
        shadowColor:'#000',
        shadowOffset:5,
        elevation: 3

	}


});
export default AppSelectionScreen;