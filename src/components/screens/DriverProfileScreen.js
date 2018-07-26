import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    Text,
    BackHandler
} from "react-native";


import AppLogo from "../../assets/app_logo.png";
import { Actions } from "react-native-router-flux";
class DriverProfileScreen extends Component {

    onEditButtonPress() {
        Actions.EditProfileScreen();
    }
    render() {
        return (

            <View
                style={{ flex: 1, backgroundColor: '#fff', }}>
                <View
                    style={styles.imageContainer}>

                    <Image
                       // style={{ width: 200, height: 50 }}
                        source={AppLogo
                        }></Image>





                </View>

                <View
                    style={{ backgroundColor: '#f1f1fd', paddingBottom: 20 }}>
                    <Text
                        style={styles.inputTextStyle} >
                        xyzxyz
                                   </Text>
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

                    <Text
                        style={{
                            fontSize: 18,
                            paddingStart: 10,
                            paddingEnd: 10,
                            paddingBottom: 5,
                            paddingTop: 10
                        }}>
                        a@gmail.com
                                   </Text>


                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            marginStart: 10,
                            marginEnd: 10
                        }}
                    />


                    <Text
                        style={styles.inputTextStyle} >
                        +91 9812321234
                                   </Text>


                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            marginStart: 10,
                            marginEnd: 10
                        }}
                    />



                    <Text
                        style={styles.inputTextStyle}>
                        ***************
            </Text>

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
                        flex: 1, backgroundColor: '#fff', justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={styles.buttonContainer}

                    >
                        <Text
                            onPress={this.onEditButtonPress.bind(this)}
                            style={{
                                color: '#14136d',
                                fontWeight: 'bold',
                                fontSize: 16,
                                textAlign: 'center',
                                width: 150,
                                height: 35,
                            }}
                        >EDIT PROFILE</Text>
                    </View>
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
        paddingTop: 30
    }
    , buttonContainer: {

        margin: 20,
        marginTop: 30,
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

export default DriverProfileScreen;