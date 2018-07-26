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
class EditProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
         //...other state
         defaultValue1: "xyzxyz",
         defaultValue2: "a@gmail.com",
         defaultValue3: "+91 9812321234",
         defaultValue4: "******************"
        };
    }
       

    onUpdateButtonPress() {
       Actions.pop();
    }
    render() {
        return (
           
            <View
                style={{ flex: 1, backgroundColor: '#fff',justifyContent:'flex-end' }}>
                <View
                    style={styles.imageContainer}>

                    <Image
                        style={{ width: 200, height: 50 }}
                        source={AppLogo
                        }></Image>





                </View>

                <View
                    style={{ backgroundColor: '#f1f1fd', paddingBottom: 20 }}>
                     <TextInput
                  style={styles.inputTextStyle}
                  
                  underlineColorAndroid='transparent'
                  placeholder="Username"
                  autoFocus = "true"
                  defaultValue={this.state.defaultValue1} 
                  onChange={this.changeName} 
                  value={this.state.nameNow}
                 
                 
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
                  style={{ fontSize: 18,
                    paddingStart: 10,
                    paddingEnd: 10,
                    paddingBottom: 5,
                    paddingTop: 10 }}
                  underlineColorAndroid='transparent'
                  placeholder="Email Id"
                  defaultValue={this.state.defaultValue2} 
                  onChange={this.changeName} 
                  value={this.state.nameNow}
                 
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
              
                  defaultValue={this.state.defaultValue3} 
                  onChange={this.changeName} 
                  value={this.state.nameNow}
                 
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
                 secureTextEntry ={true}
                 defaultValue={this.state.defaultValue4} 
                  onChange={this.changeName} 
                  value={this.state.nameNow}
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
                alignItems: 'center', }}>
                 <View
            style={styles.buttonContainer}

          >
            <Text
             onPress={this.onUpdateButtonPress.bind(this)}
              style={{
                color: '#14136d',
                fontWeight: 'bold',
                fontSize: 16,
                textAlign: 'center',
                width: 150,
                height: 35,
              }}
            >UPDATE</Text>
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

export default EditProfileScreen;