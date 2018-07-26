import React, { Component } from "react";
import { 
         Text, 
         View, 
         Dimensions,
         Button
         } from "react-native";
import MapView from 'react-native-maps';
import {Actions  } from "react-native-router-flux";

class MapScreen extends Component {
    state = {
         focusedLocation : {
             latitude: 37.7900352,
             longitude: -122.4013726,
             latitudeDelta: 0.0122,
             longitudeDelta:
             Dimensions.get("window").width/
             Dimensions.get("window").height *
             0.0122
         },
         locationChosen: false
    }


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


    render(){
        let marker = null;

        if(this.state.locationChosen)
        {
            marker = <MapView.Marker coordinate = {this.state.focusedLocation}/>
        }
        return(
            <View> 
                <MapView 
                initialRegion = {this.state.focusedLocation}
                style = {{width: "100%" ,height:400}}
                onPress = {this.pickLocationHandler}
                ref = {ref => this.map = ref}
                >
                {marker}
                </MapView>

                <View>
                    <Button
                    title = "Current Location"
                    onPress ={this.getLocationHandler}
                       />
                    </View>

                    	<Button
							onPress={this.onTestButtonPress.bind(this)}
							title="Geolocation Screen"
							color="#000000"

						/> 
            </View>
        );
    }
}
export default MapScreen;