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
    userProfileUpdate,
    showUpdateProfileLoading,


} from "../../actions/ProfileActions";
import Loader from '../common/Loader';
import AppLogo from "../../assets/app_logo.png";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { loginUser } from "../../actions";
class EditProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //...other state
            userProfileUpdate: '',
            loading: false,
            updateProfileResponseData: '',
            name: '',
            email: '',
            phone: '',
            pressStatus: false,
            selectedButton: null
        };
    }


    _onHideUnderlay() {
        this.setState({ pressStatus: false });
    }
    _onShowUnderlay() {
        this.setState({ pressStatus: true });
    }


    componentDidMount() {
        this.getProfileData();
    }


    getProfileData() {

        AsyncStorage.getItem("userData").then((value) => {
            if (value) {
                userId = JSON.parse(value)._id;
                this.setState({ name: JSON.parse(value).firstname + " " + JSON.parse(value).lastname })
                this.setState({ email: JSON.parse(value).email });
                this.setState({ phone: JSON.parse(value).phone });


            }

        }).done();

    }
    onChangePasswordButtonPress() {
        this.setState({ selectedButton: "changePassword" });
        Actions.pop();
        Actions.UpdatePasswordScreen();
    }

    onUpdateButtonPress() {
        this.setState({ selectedButton: "update" });
        this.props.showUpdateProfileLoading(true);
        AsyncStorage.getItem("userData").then((value) => {
            if (value) {
                userId = JSON.parse(value)._id;
                userType = JSON.parse(value).type;
                console.log("type with state................................................", userType)



                var updateProfile = {
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                    userId: userId,
                    type: userType,
                    mode: 'mobile'

                }

                this.props.userProfileUpdate(updateProfile);

            }

        }).done();

        // Actions.pop();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.updateProfileResponseData != undefined && nextProps.updateProfileResponseData != '') {
            this.props.showUpdateProfileLoading(false);

            if (nextProps.updateProfileResponseData.status == 200) {
                alert("Profile Updated");
                //  Actions.pop();
            }

            else {
                this.props.showUpdateProfileLoading(false);
                alert(nextProps.updateProfileResponseData.message);
                //this.props.clearLoginRecord();
            }
        }
    }


    render() {
        return (

            <View
                style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'flex-end' }}>
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

                        underlineColorAndroid='transparent'
                        placeholder="Username"

                        defaultValue={this.state.defaultValue1}
                        onChange={this.changeName}
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })}


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
                    style={{ backgroundColor: '#fff' }}>
                    <TextInput
                        style={{
                            fontSize: 18,
                            paddingStart: 10,
                            paddingEnd: 10,
                            paddingBottom: 5,
                            paddingTop: 10
                        }}
                        underlineColorAndroid='transparent'
                        placeholder="Email Id"

                        onChange={this.changeName}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}

                    />



                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            marginStart: 10,
                            marginEnd: 10
                        }}
                    />

                    <TextInput
                        style={styles.inputTextStyle}
                        underlineColorAndroid='transparent'
                        placeholder="Contact No"
                        onChange={this.changeName}
                        value={this.state.phone}
                        onChangeText={(phone) => this.setState({ phone })}

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
                    style={{
                        flex: 1, backgroundColor: '#fff',
                        alignItems: 'center',
                    }}>
                   

                        <TouchableHighlight

                            style={styles.buttonContainer1}
                            underlayColor={'#14136d'}
                            onPress={this.onUpdateButtonPress.bind(this)}
                            onHideUnderlay={this._onHideUnderlay.bind(this)}
                            onShowUnderlay={this._onShowUnderlay.bind(this)}
                        >
                            <Text
                                style={
                                    this.state.pressStatus && this.state.selectedButton == "update"
                                        ? styles.buttonTextOnPress
                                        : styles.buttonText
                                }

                            >UPDATE</Text>
                        </TouchableHighlight>
              
                </View>

                <View
                    style={{
                        flex: 1, backgroundColor: '#fff',
                        alignItems: 'center',
                    }}>
                   
                        <TouchableHighlight

                            style={styles.buttonContainer2}
                            underlayColor={'#14136d'}
                            onPress={this.onChangePasswordButtonPress.bind(this)}
                            onHideUnderlay={this._onHideUnderlay.bind(this)}
                            onShowUnderlay={this._onShowUnderlay.bind(this)}
                        >
                            <Text
                                style={
                                    this.state.pressStatus && this.state.selectedButton == "changePassword"
                                        ? styles.buttonTextOnPress
                                        : styles.buttonText
                                }

                            >CHANGE PASSWORD</Text>
                        </TouchableHighlight>
                       
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
    },
    buttonContainer1: {


        marginTop: 70,
       
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




    }
    ,buttonContainer2: {


        marginTop:10,
        width: 250,
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
   

    buttonTextOnPress: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        width: 150,
        height: 35,
    },
    buttonText: {
        color: '#14136d',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        width: 250,
        height: 35,
    }


});

const mapStateToProps = ({ profile }) => {
    const { updateProfileResponseData, isLoading } = profile;


    return {
        updateProfileResponseData: updateProfileResponseData,
        isLoading: isLoading
    }
}

export default connect(mapStateToProps, { userProfileUpdate, showUpdateProfileLoading })(EditProfileScreen);