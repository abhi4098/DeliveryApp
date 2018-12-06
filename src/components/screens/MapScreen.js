import React, { Component } from "react";
import {

    StyleSheet,
    Dimensions,
    View,
    Image,
    TextInput,
    Platform,
    AsyncStorage,
    Text,
    Alert,
    TouchableOpacity,
    TouchableNativeFeedback,
    ScrollView ,
    

} from "react-native";
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import { Actions } from "react-native-router-flux";
import Location from "../../assets/location.png";
const { width, height } = Dimensions.get("window")
import { connect } from "react-redux";
import { CheckBox } from 'react-native-elements';

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0030
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
import { saveAdd, showSaveAddLoading, clearSaveAddressRecord } from '../../actions/MapScreenActions';
import Loader from '../common/Loader';
import Button  from '../common/Button';

var saveLocationname = '';

class MapScreen extends Component {



    constructor(props) {
        super(props)

        this.state = {
            focusedLocation: {
                latitude: 25.0582,
                longitude:  -77.3431,
                latitudeDelta: .05,
                longitudeDelta: .05
            },
            markerPosition: new AnimatedRegion({
                latitude:25.0582,
                longitude: -77.3431
            }),
            locationChosen: true,
            marginBottom: 1,
            saveLocationname: '',
            isAddressSaved:'',
            loading: false,
            onPress:'',
            children:'',
            //checked:false

        }
    }

    componentWillUnmount() {
        console.log( "componentWillUnmount.................................................mapscreen");
        this.props.clearSaveAddressRecord();
    }

    

    componentWillMount() {
        
        if (this.props.isFrom == "MyAddress") {
            var lat = parseFloat(this.props.lat)
            var long = parseFloat(this.props.lng)
            this.setState({ saveLocationname: this.props.addName })

            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }

            this.setState({ focusedLocation: initialRegion })
            this.setState({ markerPosition: initialRegion })
        }
        else
        {

        navigator.geolocation.getCurrentPosition((position) => {
            console.log( " navigator.geolocation.getCurrentPosition((position)t.................................................",this.props.isFrom);
           
                var lat = parseFloat(position.coords.latitude)
                var long = parseFloat(position.coords.longitude)
                
            

            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }

            this.setState({ focusedLocation: initialRegion })
            this.setState({ markerPosition: initialRegion })
            console.log('initialRegion:..................................... ', initialRegion);
            

        },
            (error) =>  console.log("Location not fetched, please select manually!!"),
            {  enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 10000 })
            
    }
}


    componentDidMount()
    {
        this.componentWillMount();
    }

    onConfirmButtonPress() {
        AsyncStorage.getItem("userData").then((value) => {
            if (value) {

                userId = JSON.parse(value)._id;
                
                this.props.showSaveAddLoading(true);
                //console.log('this.state.checked...............................', this.state.checked);
                if(this.state.checked ==true || this.props.from == "SlidingMenu")
                {
                    isAddressSaved = 1
                    console.log('isAddressSaved: true...............................', isAddressSaved);
                    
                }
                else{
                    isAddressSaved = 0
                    console.log('isAddressSaved: false...............................', isAddressSaved);

                }
                
                var location = {
                    _id: userId,
                    latitude: this.state.focusedLocation.latitude,
                    longitude: this.state.focusedLocation.longitude,
                    street: this.state.saveLocationname,
                    addressid: this.props.addId,
                    shipment_id: this.props.shipmentId,
                    mode: 'mobile',
                    saveaddress:isAddressSaved
                    

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
                
                alert("Location not fetched,please select manually!!");

            })
    }

    
      
    _onSaveAddressPress() {
        
        Actions.pop();
        Actions.MyAddress({ from: 'Mapscreen', shipId: this.props.shipmentId });
    }

    SaveAddressOption()
    {
        if(this.props.from != "SlidingMenu")
    {
        return <View
        style = {{alignItems:'center'}}>
<Text
                    style={{ marginTop: 15 }}>-OR-</Text>

                <TouchableOpacity
                    onPress={() => this._onSaveAddressPress()}
                >
                    <Text
                        style={{ marginTop: 15, color: "#14136d" }}>Select from Saved Address</Text>
                </TouchableOpacity>
        </View>;
     }
     

    }

    showCheckBox()
    {
        if(this.props.from != "SlidingMenu")
    {
        return <CheckBox
        center
        title='Save Address'
        checked={this.state.checked}
        onPress={() => this._onCheckboxPress()}
        containerStyle={{backgroundColor: '#f1f1fd',marginTop:-20,borderColor:'#f1f1fd'}}
      
      />;
     }


     

    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.saveAddResponse != undefined && nextProps.saveAddResponse != '') {
            

            if (nextProps.saveAddResponse.status == 200) {
                this.props.showSaveAddLoading(false);
                console.log("this.props.from........................",this.props.from);
                if(this.props.from != "SlidingMenu")
                {
                    Actions.pop();
                    Actions.Dashboard();
                    Alert.alert("Message","Shipment Ordered Successfully");
                //Actions.ConfirmOrderScreen();
                //this.setState({ data: nextProps.saveAddResponse.data })
                }
                else{
                  
                    Actions.pop();
                    Actions.Dashboard();
                    Alert.alert("Message","Address saved Successfully");
                }

            }

            else {
                this.props.showSaveAddLoading(false);
                alert(nextProps.saveAddResponse.message);


            }



        }






    }
    _onCheckboxPress(){
        if(this.state.checked == 'undefined')
        {
            this.setState({checked: true});
            console.log("checked...dfsdgfdsfdf..................................." ,this.state.checked);
        }
        else{
            this.setState({checked: !this.state.checked});
        }
        
       
    }

    render() {
        let marker = null;

        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        }
        return (<View
                style={styles.controlsContainer}>
                <Loader
                    loading={this.props.isLoading} />

                <MapView
                    region={this.state.focusedLocation}
                    style={{ width: "100%", height: "100%", marginBottom: this.state.marginBottom, marginTop: 0 }}
                    onMapReady={this._onMapReady}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}

                >
                    {marker}
                </MapView>
                <View
                style={{
                    padding:20,
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: "auto",
                    position: 'absolute',
                    bottom: 0,
                    left: 10,
                    right: 10,
                    backgroundColor: 'rgba(255,255,255,0.95)',

                }}>
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
                            onChangeText={(saveLocationname) => this.setState({ saveLocationname })}
                            value={this.state.saveLocationname}
                            returnKeyType='next'

                        />
                    </View>
                </View>



                {this.showCheckBox()}  

         <Button
                 
            onPress={() =>this.onConfirmButtonPress()}
                       
 > CONFIRM</Button> 
               
            {this.SaveAddressOption()}
                {/* <Text
                    style={{ marginTop: 15 }}>-OR-</Text>

                <TouchableOpacity
                    onPress={() => this._onSaveAddressPress()}
                >
                    <Text
                        style={{ marginTop: 15, color: "#14136d" }}>Select from Saved Address</Text>
                </TouchableOpacity> */}

             </View>
            </View>
           
        );
    }
}
const styles = StyleSheet.create({
    controlsContainer: {
        flex: 1,
     //   justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1fd'
    },


    inputContainer: {
        flexDirection: 'row',
        width: "auto",
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
        marginTop: 10,
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
    const { saveAddResponse, isLoading } = mapScreenReducer;
    return {

        saveAddResponse: saveAddResponse,
        isLoading: isLoading

    };
};


export default connect(mapStateToProps, { saveAdd, showSaveAddLoading, clearSaveAddressRecord })(MapScreen);