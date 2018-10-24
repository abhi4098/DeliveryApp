import React, { Component } from "react";
import { View , Dimensions  } from "react-native";
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import TestImage from "../../assets/marker_icon1.png";
const { width,height} = Dimensions.get("window")

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.0030
const LONGITUDE_DELTA = LATITUDE_DELTA*ASPECT_RATIO

class GeoLocationExampleScreen extends Component {
    constructor(props){
        super(props)

        this.state = {
            initialPositon : {
                latitude: 0,  
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta:0
            },
            markerPosition: new AnimatedRegion({
                latitude: 0,
                longitude: 0
            })
        }
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
                longitudeDelta:LONGITUDE_DELTA
            }

            this.setState({initialPositon: initialRegion})
            this.setState({markerPosition: initialRegion})

        },
        (error) =>alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout:20000})

        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)

            var lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta:LONGITUDE_DELTA
            }
            
            this.setState({initialPositon: lastRegion})
            this.setState({markerPosition: lastRegion})
        })

    }
    
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID)
    }
    render() {
        return(
            <View>
                <MapView
                  style = {{width: "100%" ,height:'100%'}}
                region = {this.state.initialPositon}
                showsMyLocationButton = {true}
                showsUserLocation={true}
                
                
                >

                    <MapView.Marker.Animated
                    image={TestImage}
                    flat = {true}
                    ref={marker => { this.marker = marker }}
                    coordinate = {this.state.markerPosition}>

                    </MapView.Marker.Animated>
                </MapView>

                		<View style={styles.inputContainer}>
              					<View style={styles.iconContainer}>
                					<Image 
                  					source={username} 
                  					style={styles.inputIcon} 
                  					resizeMode="contain"
                					/>
              					</View>
              					<View>
                					<TextInput
               						style={ { width:250, flex:1, marginLeft: 10}}
                          underlineColorAndroid='transparent'
                          autoCapitalize='none'
                          keyboardType='email-address'
                          returnKeyType='next'
                					placeholder="Username"
                					placeholderTextColor="#696969"
                          onChangeText={this.onEmailChange.bind(this)}
                          value={this.props.username}
                          returnKeyType='next'
                          onSubmitEditing={(event)=>{this.refs.passwordField.focus()}}
              						/>
              					</View>
            				</View>
                </View>
        );
    }
}

export default GeoLocationExampleScreen;