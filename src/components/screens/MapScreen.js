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
    Text,
    Alert,
    TouchableOpacity
} from "react-native";
import MapView from 'react-native-maps';
import { Actions } from "react-native-router-flux";
import Location from "../../assets/location.png";
const { width, height } = Dimensions.get("window")
import { connect } from "react-redux";

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0030
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
import { saveAdd, showSaveAddLoading,clearSaveAddressRecord} from '../../actions/MapScreenActions';
import Loader from '../common/Loader';



class MapScreen extends Component {



    constructor(props) {
        super(props)

        this.state = {
            focusedLocation: {
                latitude: 0,  
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta:0
            },
            locationChosen: false,
            marginBottom: 1,
            saveLocationname: '',
            loading: false,

        }
    }

componentWillUnmount()
{
    this.props.clearSaveAddressRecord();
}

componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var initialRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta:LONGITUDE_DELTA
        }

        this.setState({focusedLocation: initialRegion})
        //this.setState({markerPosition: initialRegion})

    },
    (error) =>alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout:20000})
}


    onConfirmButtonPress() {
        AsyncStorage.getItem("userData").then((value) => {
            if (value) {
               
                userId = JSON.parse(value)._id;
                console.log("saved location name............................",this.state.focusedLocation.latitude,this.state.focusedLocation.longitude );
                this.props.showSaveAddLoading(true);

                var location = {
                    _id : userId,
                    latitude : this.state.focusedLocation.latitude,
                    longitude :this.state.focusedLocation.longitude,
                    street : this.state.saveLocationname

                };


                this.props.saveAdd(location);
               


            }

        }).done();
    }

    _onMapReady = () => this.setState({ marginBottom: 0 })
    // onTestButtonPress() {
    //     Actions.GeoLocationExampleScreen();
    // }

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

    _onSaveAddressPress(){
        Actions.MyAddress();
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.saveAddResponse != undefined && nextProps.saveAddResponse != '') {
            console.log("nextProps.saveAddResponse'''''''''''''''''''''''---------------------", nextProps.saveAddResponse);

            if (nextProps.saveAddResponse.status == 200) {
                this.props.showSaveAddLoading(false);

                //this.setState({ data: nextProps.saveAddResponse.data })

            }

            else {
                this.props.showSaveAddLoading(false);
                alert(nextProps.saveAddResponse.message);


            }



        }

       




    }


    render() {
        let marker = null;

        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        }
        return (
            <View
                style={styles.controlsContainer}>
                <Loader
                    loading={this.props.isLoading} />
                   
                <MapView
                    initialRegion={this.state.focusedLocation}
                    style={{ width: "100%", height: 370, marginBottom: this.state.marginBottom, marginTop: 0 }}
                    onMapReady={this._onMapReady}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
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
                            onChangeText={(saveLocationname) => this.setState({saveLocationname})}
                            value={this.state.saveLocationname}
                            returnKeyType='next'
                           
                        />
                    </View>
                </View>


                <Button
                    onPress={this.onConfirmButtonPress.bind(this)}
                    title="Confirm Order"
                    color="#14136d"

                />
             
                <Text
                    style={{ marginTop: 15 }}>-OR-</Text>

                <TouchableOpacity
                    onPress={() => this._onSaveAddressPress()}
                >
                    <Text
                        style={{ marginTop: 15, color: "#14136d" }}>Select from Saved Address</Text>
                </TouchableOpacity>

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
    controlsContainer: {
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


const mapStateToProps = ({ mapScreenReducer }) => {
    const { saveAddResponse ,isLoading} = mapScreenReducer;
    return {

        saveAddResponse: saveAddResponse,
        isLoading: isLoading

    };
};


export default connect(mapStateToProps, { saveAdd, showSaveAddLoading,clearSaveAddressRecord })(MapScreen);