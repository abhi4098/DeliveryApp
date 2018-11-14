import React, { Component } from "react";
import { Dimensions, StyleSheet,Image, View, StatusBar, TouchableOpacity } from "react-native";
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import TestImage from "../../assets/marker_icon1.png";
import Polyline from '@mapbox/polyline';
const { width, height } = Dimensions.get("window")

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0030
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class GeoLocationExampleScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
            cordLatitude: -6.23,
            cordLongitude: 106.75,
            error: null,
            concat: null,
            coords: [],
            x: 'false',
        }
        this.mergeLot = this.mergeLot.bind(this);

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

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)

            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }

            this.setState({ initialPositon: initialRegion })
            this.setState({ markerPosition: initialRegion })
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
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }

            this.setState({ initialPositon: lastRegion })
            this.setState({ markerPosition: lastRegion })
        })




    }

    async getDirections(startLoc, destinationLoc) {

        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({ coords: coords })
            this.setState({ x: "true" })
            return coords
        } catch (error) {
            console.log('masuk fungsi')
            this.setState({ x: "error" })
            return error
        }
    }

    mergeLot() {
        if (this.state.latitude != null && this.state.longitude != null) {
            let concatLot = this.state.latitude + "," + this.state.longitude
            this.setState({
                concat: concatLot
            }, () => {
                this.getDirections(concatLot, "-6.270565,106.759550");
            });
        }

    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID)
    }
    render() {
        return (
            <MapView style={styles.map} initialRegion={{
                latitude: -6.270565,
                longitude: 106.759550,
                latitudeDelta: 1,
                longitudeDelta: 1
            }}>

                {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                    coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
                    title={"Your Location"}
                />}

                {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker
                    coordinate={{ "latitude": this.state.cordLatitude, "longitude": this.state.cordLongitude }}
                    title={"Your Destination"}
                />}

                {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
                    coordinates={this.state.coords}
                    strokeWidth={2}
                    strokeColor="red" />
                }

                {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
                    coordinates={[
                        { latitude: this.state.latitude, longitude: this.state.longitude },
                        { latitude: this.state.cordLatitude, longitude: this.state.cordLongitude },
                    ]}
                    strokeWidth={2}
                    strokeColor="red" />
                }
            </MapView>
        );
    }
}
const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
export default GeoLocationExampleScreen;