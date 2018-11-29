import React, { Component } from "react";
import {
    Dimensions,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    StatusBar,
    Alert,
    Text,
    BackHandler,
    ImageBackground,
    TouchableHighlight,
    Modal
} from "react-native";
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import TestImage from "../../assets/marker_icon1.png";
import Polyline from '@mapbox/polyline';
const { width, height } = Dimensions.get("window")
import { Actions } from "react-native-router-flux";
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0030
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const GOOGLE_MAPS_APIKEY = 'AIzaSyA9kTgADps5-FpFzq56Dbn9-tCU-kUUFMw';
import getDirections from 'react-native-google-maps-directions';
import { Button } from "react-native-elements";
var concatLot = '';
var destLoc = '';
import NavIcon from "../../assets/navIcon.png";
import Cross from "../../assets/cross.png";
import HalfBottomIcon from "../../assets/halfBottom.png";
class GeoLocationExampleScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            initialPositon: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            markerPosition: new AnimatedRegion({
                latitude: 0,
                longitude: 0
            }),
            cordLatitude: 0,
            cordLongitude: 0,
            error: null,
            concat: null,
            coords: [],
            x: 'false',
        }
        this.mergeLot = this.mergeLot.bind(this);

    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    componentDidMount() {
        console.log("componentDidMount  geolocation////////////////////////////////////////////////////////")
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillReceiveProps(nextProps) {
        const duration = 500

        if (this.props.markerPosition !== nextProps.markerPosition) {
            if (Platform.OS === 'android') {
                if (this.marker) {
                    this.marker._component.animateMarkerToCoordinate(
                        nextProps.markerPosition,
                        duration
                    );
                }
            } else {
                this.state.markerPosition.timing({
                    ...nextProps.markerPosition,
                    duration
                }).start();
            }
        }
    }

    watchID: ?number = null

    componentWillMount() {
        
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)

            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5
            }

            this.setState({ initialPositon: initialRegion })
            this.setState({ markerPosition: initialRegion })
            console.log("initial regions................................", initialRegion);
            this.mergeLot();

        },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000 })

        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)

            var lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5
            }

            this.setState({ initialPositon: lastRegion })
            this.setState({ markerPosition: lastRegion })
        })




    }

    onBackPress() {
        console.log("Actions state index....................", Actions.state.index);
        if (Actions.state.index === 1) {

            BackHandler.exitApp();
            return false;
        }

        Actions.pop();
        return true;

    }

    async getDirections(startLoc, destinationLoc) {

        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${GOOGLE_MAPS_APIKEY}`)

            // let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=${GOOGLE_MAPS_APIKEY}`)

            console.log("resp..............................................", resp);
            let respJson = await resp.json();
            console.log("respJson................................................", respJson);
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            console.log("points................................................", points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            console.log("coords................................................", coords);
            this.setState({ coords: coords })
            this.setState({ x: "true" })
            return coords
        } catch (error) {
            console.log('error get direction.........................................', error)
            Alert.alert("Message", "Not able to fetch location path  Network Error !!")
            this.setState({ x: "error" })
            return error
        }
    }

    mergeLot() {
        destLoc = this.props.destination.lat + "," + this.props.destination.lng;
        var clat = parseFloat(this.props.destination.lat)
        var clong = parseFloat(this.props.destination.lng)
        this.setState({ cordLatitude: clat });
        this.setState({ cordLongitude: clong });

        if (this.state.initialPositon.latitude != null && this.state.initialPositon.longitude != null) {
            concatLot = this.state.initialPositon.latitude + "," + this.state.initialPositon.longitude
            console.log("concatLot................................", concatLot);
            this.setState({
                concat: concatLot
            }, () => {
                this.getDirections(concatLot, destLoc);
                console.log("getDirections................................", this.props.destination.lat);
            });
        }

    }

    onPressShipmentDetails()
    {
        //var shipData = this.props.ship_data;
       
          console.log("destination.........................",this.props.destination)
        console.log("ship data.........................",this.props.ship_data)
        this.setModalVisible(true);
    }

    onStartNavigationPress() {

        var destLat = parseFloat(this.props.destination.lat);
        var destlong = parseFloat(this.props.destination.lng)
        const data = {
            source: {
                latitude: this.state.initialPositon.latitude,
                longitude: this.state.initialPositon.longitude
            },
            destination: {
                latitude: destLat,
                longitude: destlong
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode 
                }
            ]

        }
        console.log("data...................................................", data)
        getDirections(data);
    }


    
   

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        navigator.geolocation.clearWatch(this.watchID)
    }
    render() {
        return (<View
            style={styles.controlsContainer}>
            <Modal
                transparent={true}  
                animationType="slide"
                
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{
                    position:'absolute',
                    bottom:110,
                    left:10,
                    right:10
                    
                
                }}>

                    <View
                    style={{
                        width: "100%",
                        height: "auto",
                        
                        backgroundColor: 'rgba(255,255,255,0.95)'}}>
                         <View
                        style={styles.informationContainer}>
                         <View
                            style={{ flexDirection: 'row' }}>
                            <Text
                                style={{ fontSize: 15, color: '#14136d' }}
                            >ORDER ID   :  </Text>
                            <Text
                                style={{ fontSize: 14, color: '#5e5e5e' }}
                            >{this.props.ship_data.packageno}</Text>
    
                        </View>
    
                        <View
                            style={{ flexDirection: 'row', }}>
    
                            <Image
                                source={HalfBottomIcon}
                                style={styles.halfBottomIcon}
    
                            />
                            <Text
                                style={{ fontSize: 11, color: '#14136d', marginTop: 11, marginStart: 3, }}
                            >WAREHOUSE : </Text>
                            <Text
                                numberOfLines={4}
    
                                style={{ fontSize: 11, color: '#53a602', marginTop: 11, paddingEnd: 10, flexWrap: 'wrap', flex: 1 }}
                            >{this.props.ship_data.sender_address}</Text>
    
                        </View>

                         <View
                            style={{ flexDirection: 'row',marginTop:10 }}>
                            <Text
                                style={{ fontSize: 15, color: '#14136d' }}
                            >RECIPIENT :  </Text>
                            <Text
                                style={{ fontSize: 14, color: '#5e5e5e' }}
                            >{this.props.ship_data.recipient_name}</Text>
    
                        </View>

                         <View
                            style={{ flexDirection: 'row' }}>
                            <Text
                                style={{ fontSize: 15, color: '#14136d' }}
                            >ADDRESS   :  </Text>
                            <Text
                                style={{ fontSize: 14, color: '#5e5e5e' }}
                            >{this.props.ship_data.recipient_address.street}</Text>
    
                        </View>
                        </View>

                        <TouchableHighlight
                        style = {{position:"absolute",right:0,top:0}}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                           <Image
                        style={{ width:30, height:30 }}
                        source={Cross
                        }>

                    </Image>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

            <MapView style={{ width: "100%", height: "100%", marginBottom: this.state.marginBottom, marginTop: 0 }}
                showsUserLocation={true}
                region={this.state.initialPositon}>

                {!!this.state.initialPositon.latitude && !!this.state.initialPositon.longitude && <MapView.Marker
                    coordinate={{ "latitude": this.state.initialPositon.latitude, "longitude": this.state.initialPositon.longitude }}
                    title={"Your Location"}
                />}

                {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker
                    coordinate={{ "latitude": this.state.cordLatitude, "longitude": this.state.cordLongitude }}
                    title={"Your Destination"}
                />}

                {!!this.state.initialPositon.latitude && !!this.state.initialPositon.longitude && this.state.x == 'true' && <MapView.Polyline
                    coordinates={this.state.coords}
                    strokeWidth={5}
                    strokeColor="#14136d" />
                }

                {!!this.state.initialPositon.latitude && !!this.state.initialPositon.longitude && this.state.x == 'error' && <MapView.Polyline
                    coordinates={[
                        { latitude: this.state.initialPositon.latitude, longitude: this.state.initialPositon.longitude },
                        { latitude: this.state.cordLatitude, longitude: this.state.cordLongitude },
                    ]}
                    strokeWidth={5}
                    strokeColor="#14136d" />
                }
            </MapView>

            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 100,
                    position: 'absolute',
                    bottom: 0,
                    left: 10,
                    right: 10,
                    backgroundColor: 'rgba(255,255,255,0.95)',

                }}>
                <TouchableOpacity
                    onPress={() => this.onPressShipmentDetails()}
                    style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>
                        SHIPMENT DETAILS
			</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.onStartNavigationPress()}
                    style={{ flexDirection: 'column', alignItems: 'center', marginStart: 50 }}
                >
                    <Image
                        style={{ width: 60, height: 60 }}
                        source={NavIcon
                        }>

                    </Image>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#14136d',
                        }}
                    >START</Text>

                </TouchableOpacity>




            </View>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    controlsContainer: {
        flex: 1,
        //   justifyContent: 'center',

        backgroundColor: '#f1f1fd'
    },
    textStyle: {

        fontSize: 15,
        fontWeight: '600',
        marginTop: 6,
        color: '#fff'

    },
    informationContainer: {
       padding:10,  
        flex: 1,
        flexDirection: "column",
        marginStart:10
        

    },
    halfBottomIcon: {
        width: 12,
        height: 25,


    },
    buttonStyle: {
        width: 170,
        alignItems: 'center',
        borderRadius: 3,
        backgroundColor: '#14136d',
        height: 35,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        elevation: 3

    }
});
export default GeoLocationExampleScreen;