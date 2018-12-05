import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  AsyncStorage,
  TouchableHighlight,
  PixelRatio
} from 'react-native';


const window = Dimensions.get('window');
import AppLogo from "../../assets/app_logo.png";
import Dashboard from "../../assets/dashboard.png";
import Profile from "../../assets/profile.png";
import OrderDelivered from "../../assets/order_delivered.png";
import Logout from "../../assets/logout.png";
import AcceptedReq from "../../assets/current_orders.png";





var userName = '';
var userEmail = '';
var userPhone = '';
var userType = '';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'white',
    padding: 0,

  },

  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },

  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },

  item: {
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 5,
    paddingLeft: 15,
    color: 'black'
  },


  userInfoContainer: {
    flex: 1,
    padding: 10,
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuItemContainer: {
    flex: 3
  },

  logoutContainer: {
    flex: 0.1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d2e0fc',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },

  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#14136d',
  },

  welcomeText: {
    color: '#014292',
    marginTop: 15,
    fontSize: 18,
    color: 'white',
    alignItems: 'center'
  },

  userNameText: {
    color: '#FFFFFF',
    fontSize: 24,
  },

  userEmailText: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  lineView: {
    height: 1,
    backgroundColor: '#FFFFFF'
  },

  lineViewItem: {
    marginTop: 20,
    marginBottom: 20,
    height: 1,
    backgroundColor: '#FFFFFF'
  },

  itemContainer: {
    height: 40,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemImage: {
    height: 25,
    width: 25,
  },

  logoutText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 10
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    
  },
  avatar: {
    borderRadius: 45,
    width: 90,
    height: 90,
  },


});

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
      selectedMenuColor: 'transparent',
      userName: '',
      userEmail: '',
      userPhone: '',
      userType: ''

    };
  }

  componentWillMount() {
    this.updateUserProfile();
  }

  updateUserProfile() {
    /********************** Call getUsersInfo from ASYNC Storage **********************/
    AsyncStorage.getItem("userData").then((value) => {
      if (value) {
        userId = JSON.parse(value)._id;
        userName = JSON.parse(value).firstname + " " + JSON.parse(value).lastname;
        userEmail = JSON.parse(value).email;
        userPhone = JSON.parse(value).phone;
        userType = JSON.parse(value).type;
        var imageUrl = "https://nboxitdb.azurewebsites.net/images/profiles/" + JSON.parse(value).profilepic;
        var source = { uri: imageUrl }
        console.log("imageurl.................................................",imageUrl);
        this.setState({avatarSource:source});


      }

    }).done();
    /*********************************************************************************/
  }
  
  renderPinLocation() {

    if (userType == 'customer') {
      return <View style={{
        height: 40, paddingLeft: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: (this.props.selectedMenu == 'Pin Location') ? '#d2e0fc' : 'transparent'
      }}>
        <Image style={styles.itemImage} source={AcceptedReq}>
        </Image>
        <TouchableHighlight underlayColor="transparent" style={{ width: "90%", height: 40, justifyContent: 'center' }} onPress={() => this.props.onItemSelected('PinLocation')}>
          <Text
            style={styles.item}>
            Pin Location
                        </Text>
        </TouchableHighlight>
      </View>;
    }
    else {
      return ;
    }



  }

  renderMyAddress() {

    if (userType == 'customer') {
      return <View style={{
        height: 40, paddingLeft: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: (this.props.selectedMenu == 'MyAddress') ? '#d2e0fc' : 'transparent'
      }}>
        <Image style={styles.itemImage} source={AcceptedReq}>
        </Image>
        <TouchableHighlight underlayColor="transparent" style={{ width: "90%", height: 40, justifyContent: 'center' }} onPress={() => this.props.onItemSelected('MyAddress')}>
          <Text
            style={styles.item}>
            Address List
                        </Text>
        </TouchableHighlight>
      </View>;
    }
    else {
      return ;
    }



  }

  render() {

    


    return (
      <View style={styles.container}>

        <View style={styles.userInfoContainer}>
        <View
            style={[
              styles.avatar,
              styles.avatarContainer,
              
            ]}
          >
            {this.state.avatarSource === null ? (
              <Text>Select a Photo</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.avatarSource} />
            )}
          </View>
          <Text style={styles.welcomeText}>{userName}</Text>
          <Text style={{ fontSize: 13, color: 'white', alignItems: 'center', marginTop: 5 }}>{userEmail}</Text>
          <Text style={{ fontSize: 13, color: 'white', alignItems: 'center', marginTop: 5 }}>{userPhone}</Text>

        </View>
        <View style={styles.lineView}></View>

        <View style={styles.menuItemContainer}>

          <ScrollView scrollsToTop={false} style={styles.menu}>

            <View style={{
              height: 40, paddingLeft: 10,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: (this.props.selectedMenu == 'Dashboard') ? '#d2e0fc' : 'transparent'
            }}>
              <Image style={styles.itemImage} source={Dashboard}>
              </Image>
              <TouchableHighlight underlayColor="transparent" style={{ width: "90%", height: 40, justifyContent: 'center' }} onPress={() => this.props.onItemSelected('Dashboard')}>
                <Text
                  style={styles.item}>
                  Dashboard
                </Text>
              </TouchableHighlight>
            </View>

            {this.renderMyAddress()}

             {this.renderPinLocation()}

            <View style={{
              height: 40, paddingLeft: 10,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: (this.props.selectedMenu == 'DriverProfileScreen') ? '#d2e0fc' : 'transparent'
            }}>
              <Image style={styles.itemImage} source={Profile}>
              </Image>
              <TouchableHighlight underlayColor="transparent" style={{ width: "90%", height: 40, justifyContent: 'center' }} onPress={() => this.props.onItemSelected('DriverProfileScreen')}>
                <Text
                  style={styles.item}>
                  Profile
                </Text>
              </TouchableHighlight>
            </View>


            <View style={{
              height: 40, paddingLeft: 10,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: (this.props.selectedMenu == 'AcceptedDeliveryRequestScreen') ? '#d2e0fc' : 'transparent'
            }}>
              <Image style={styles.itemImage} source={AcceptedReq}>
              </Image>
              <TouchableHighlight underlayColor="transparent" style={{ width: "90%", height: 40, justifyContent: 'center' }} onPress={() => this.props.onItemSelected('AcceptedDeliveryRequestScreen')}>
                <Text
                  style={styles.item}>
                  Assigned Shipments
                </Text>
              </TouchableHighlight>
            </View>


            <View style={{
              height: 40, paddingLeft: 10,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: (this.props.selectedMenu == 'OrderDeliveredScreen') ? '#d2e0fc' : 'transparent'
            }}>
              <Image style={styles.itemImage} source={OrderDelivered}>
              </Image>
              <TouchableHighlight underlayColor="transparent" style={{ width: "90%", height: 40, justifyContent: 'center' }} onPress={() => this.props.onItemSelected('OrderDeliveredScreen')}>
                <Text
                  style={styles.item}>
                  Shipment Delivered
                </Text>
              </TouchableHighlight>
            </View>


            <View style={{
              height: 40, paddingLeft: 10,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: (this.props.selectedMenu == 'Logout') ? '#d2e0fc' : 'transparent'
            }}>
              <Image style={styles.itemImage} source={Logout}>
              </Image>

              <TouchableHighlight underlayColor="transparent" style={{ width: "90%", height: 40, justifyContent: 'center' }} onPress={() => this.props.onItemSelected('Logout')}>
                <Text
                  style={styles.item}>
                  Logout
                </Text>
              </TouchableHighlight>
            </View>

          </ScrollView>
        </View>
      </View>


    );

  }
};
