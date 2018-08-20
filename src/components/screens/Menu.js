import PropTypes from 'prop-types';
import React, { Component } from 'react';
import  {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  AsyncStorage,
  TouchableHighlight,
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
    padding: 20,
    alignItems:'center',
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
    backgroundColor: '#014292',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },

  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#2e97db',
  },

  welcomeText: {
    color: '#014292',
    marginTop:10,
    fontSize: 18,
    color:'white'
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

});

export default class Menu extends Component {
            constructor() {
              super();
              this.state = {
                selectedMenuColor: 'transparent'

              };
            }
 
         /*    static propTypes = {
              onItemSelected: PropTypes.func.isRequired,
            }; */
          
  render() {

    console.log("selectedMenu>>> " + this.props.selectedMenu);


    return (
      <View style={styles.container}>

      <View style={styles.userInfoContainer}>
      <Image
                  source={AppLogo}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
        <Text style={styles.welcomeText}>xyz</Text>
        <Text style={{fontSize:15,color:'white'}}>Abc</Text>
        <Text style={{fontSize:15,color:'white'}}>+91 9876450321</Text>
       
      </View>
      <View style={styles.lineView}></View>

      <View style={styles.menuItemContainer}>

        <ScrollView scrollsToTop={false} style={styles.menu}>

         <View style={{
              height: 40, paddingLeft: 10,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: (this.props.selectedMenu == 'Dashboard') ? '#014292' : 'transparent'
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


 <View style={{
              height: 40, paddingLeft: 10,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: (this.props.selectedMenu == 'DriverProfileScreen') ? '#014292' : 'transparent'
            }}>
 <Image style={styles.itemImage} source={Profile}>
              </Image>
              <TouchableHighlight underlayColor="transparent" style={{ width: "90%", height: 40, justifyContent: 'center' }} onPress={() => this.props.onItemSelected('DriverProfileScreen')}>
                <Text
                  style={styles.item}>
                  Driver Profile
                </Text>
              </TouchableHighlight>
            </View>


 <View style={{
              height: 40, paddingLeft: 10,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: (this.props.selectedMenu == 'AcceptedDeliveryRequestScreen') ? '#014292' : 'transparent'
            }}>
 <Image style={styles.itemImage} source={AcceptedReq}>
              </Image>
              <TouchableHighlight underlayColor="transparent" style={{ width: "90%", height: 40, justifyContent: 'center' }} onPress={() => this.props.onItemSelected('AcceptedDeliveryRequestScreen')}>
                <Text
                  style={styles.item}>
                 Accepted Requests
                </Text>
              </TouchableHighlight>
            </View>

                              
          <View style={{
              height: 40, paddingLeft: 10,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: (this.props.selectedMenu == 'OrderDeliveredScreen') ? '#014292' : 'transparent'
            }}>
 <Image style={styles.itemImage} source={OrderDelivered}>
              </Image>
              <TouchableHighlight underlayColor="transparent" style={{ width: "90%", height: 40, justifyContent: 'center' }} onPress={() => this.props.onItemSelected('OrderDeliveredScreen')}>
                <Text
                  style={styles.item}>
                  Order Delivered
                </Text>
              </TouchableHighlight>
            </View>


 <View style={{
              height: 40, paddingLeft: 10,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: (this.props.selectedMenu == 'Logout') ? '#014292' : 'transparent'
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
