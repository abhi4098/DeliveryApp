import React, { Component } from "react";
import {
   
    StyleSheet,
    Dimensions,
    View,
    Image,
    TextInput,
    Platform,
    AsyncStorage,
    Button,
    Text
} from "react-native";
import MapView from 'react-native-maps';
import { Actions } from "react-native-router-flux";
import Location from "../../assets/location.png";
const { width, height } = Dimensions.get("window")

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0030
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO


class MapScreen extends Component {
    state = {

    }


    constructor(props) {
        super(props)

        this.state = {
            focusedLocation: {
                latitude: 37.7900352,
                longitude: -122.4013726,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            locationChosen: false,
            marginBottom: 1

        }
    }


    _onMapReady = () => this.setState({ marginBottom: 0 })
    onTestButtonPress() {
        Actions.GeoLocationExampleScreen();
    }

    pickLocationHandler = event => {
        const pickedCoordinates = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: pickedCoordinates.latitude,
            longitude: pickedCoordinates.longitude

        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: pickedCoordinates.latitude,
                    longitude: pickedCoordinates.longitude
                },
                locationChosen: true
            };


        });
    }

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordinateEvents = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordinateEvents);
        },
            err => {
                console.log(err);
                alert("Location not fetched,please select manually!!");

            })
    }


    render() {
        let marker = null;

        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        }
        return (
            <View
            style={styles.controlsContainer}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    style={{ width: "100%", height: 370, marginBottom: this.state.marginBottom, marginTop:0 }}
                    onMapReady={this._onMapReady}
                    showsUserLocation={true}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}
                >
                    {marker}
                </MapView>
                <View style={styles.inputContainer}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={Location}
                            style={styles.inputIcon}
                            resizeMode="contain"
                        />
                    </View>
                    <View>
                        <TextInput
                            style={{ width: 250, flex: 1, marginLeft: 10 }}
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            placeholder="Location name (ex Home,office)"
                            placeholderTextColor="#696969"
                            //onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.username}
                            returnKeyType='next'
                            onSubmitEditing={(event) => { this.refs.passwordField.focus() }}
                        />
                    </View>
                </View>


                <Button
						//	onPress={this.onTestButtonPress.bind(this)}
							title="Confirm Order"
							color="#14136d"

						/>
<Text
style={{ marginTop:15 }}>-OR-</Text>

<Text
style={{marginTop:15  }}>Select from Saved Address</Text>
                        
                {/* <View>
                    <Button
                    title = "Current Location"
                    onPress ={this.getLocationHandler}
                       />
                    </View>

                    	<Button
							onPress={this.onTestButtonPress.bind(this)}
							title="Geolocation Screen"
							color="#000000"

						/>  */}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    controlsContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      marginBottom: 80,
    },
   

    inputContainer: {
        flexDirection: 'row',
        width: 300,
        height: 40,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 3,
    
        borderColor: 'gray',
        borderWidth: 1,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
        marginTop: 20,
        marginBottom: 25
    },

    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        height: 40,
    },

    inputIcon: {
        width: 30,
        height: 30,
       
    },

  

});

export default MapScreen;