import React, {Component} from "react";
import { View,
	Text,
	BackHandler,
	StyleSheet,
	Image,
	TouchableHighlight,
	Button,
	Keyboard,
	Alert,
	AsyncStorage,
	FlatList,
    TouchableOpacity } from "react-native";


    import { Actions, Stack } from 'react-native-router-flux';

import { connect } from "react-redux";
import hamburger from "../../assets/hamburger.png";
import { Card,List } from 'react-native-elements';
import UsernameIcon from "../../assets/name.png";
import Order from "../../assets/order.png";
import DummyOrder from "../../assets/dummyOrder.png";
import Phone from "../../assets/phone.png";
import HalfBottomIcon from "../../assets/halfBottom.png";
import Moment from 'moment';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { PermissionsAndroid } from 'react-native';


import {
	orderDeliveredData,
	showOrderDeliveredLoading,
    clearListData,
} from "../../actions/index";

class AcceptedDeliveryRequestScreen extends Component {

    constructor(props) {

		super(props);
		this.state = {
			loading: false,
			orderDeliveredData: '',
			pressStatus: false,
			usertype: '',
			isActive: true,

		}
    }
    
    componentWillMount() {
		
	
		this.getProfileData();


    }
    
    componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	}

	componentWillUnmount() {

        
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        

	}

	getProfileData() {

		AsyncStorage.getItem("userData").then((value) => {
            
			if (value) {
				usertype = JSON.parse(value).type;
				phoneNumber = JSON.parse(value).phone;
				userId = JSON.parse(value)._id;

				this.props.showOrderDeliveredLoading(true);
				if (JSON.parse(value).type == 'customer') {
					var dashboard = {
						shipment_status: "Progress",
						userid: phoneNumber,
						type: usertype

					};
				}
				else {
					var dashboard = {
						shipment_status: "Progress",
						userid: userId,
						type: usertype

					};
				}

				this.props.orderDeliveredData(dashboard);


			}

		}).done();

	}
	componentWillReceiveProps(nextProps) {





		if (nextProps.orderDeliveredResponseData != undefined && nextProps.orderDeliveredResponseData != '') {
			

			if (nextProps.orderDeliveredResponseData.status == 200) {
				this.props.showOrderDeliveredLoading(false);

				this.setState({ data: nextProps.orderDeliveredResponseData.data })

			}

			else {
				this.props.showOrderDeliveredLoading(false);
				alert(nextProps.orderDeliveredResponseData.message);


			}



		}

        }
        
        onBackPress() {
            if (Actions.state.index === 1) {
                
                BackHandler.exitApp();
                return false;
            }
            
            //this.props.clearListData();
            Actions.pop();
            return true;
        }

    	_renderItem({ item,index }) {
            Moment.locale('en');
            var dt = item.receiveddate;
            var orderStatus = item.shipment_status;
            return	<TouchableOpacity
            onPress={() =>this._onPress(item)}
            >
            <Card
                containerStyle={{ padding: 0, marginTop: 15, marginEnd: 6, marginStart: 6 }}
            //	onPress={this._onPress}
            >
    
                <View style={styles.inputContainer}>
                    <View
                        style={styles.statusIconContainer}>
                        <Text
                            style={
                                orderStatus == "Pending"
                                    ? styles.statusTextContainer1
                                    : styles.statusTextContainer
                            }
                        >{item.shipment_status}</Text>
                        <View style={styles.iconContainer}>
    
    
                            <Image
                                source={DummyOrder}
                                style={styles.inputIcon}
    
                            />
    
                        </View>
                    </View>
                    <View
                        style={styles.informationContainer}>
                        
                            <View style={styles.phoneIconContainer}
                            >
    
                            <TouchableOpacity
                            onPress={() => this._onPhoneIconPress(item)}
                            >
    
                                <Image
                                    source={Phone}
                                    style={styles.phoneIcon}
    
                                />
                               </TouchableOpacity>
                            </View>
                        
                        <View
                            style={{ flexDirection: 'row' }}>
                            <Text
                                style={{ fontSize: 14, color: '#333333' }}
                            >ORDER ID  :  </Text>
                            <Text
                                style={{ fontSize: 14, color: '#5e5e5e' }}
                            >{item.packageno}</Text>
    
                        </View>
    
                        <View
                            style={{ flexDirection: 'row', marginBottom: 30 }}>
    
                            <Image
                                source={HalfBottomIcon}
                                style={styles.halfBottomIcon}
    
                            />
                            <Text
                                style={{ fontSize: 11, color: '#333333', marginTop: 11, marginStart: 3, }}
                            >WAREHOUSE : </Text>
                            <Text
                                numberOfLines={4}
    
                                style={{ fontSize: 11, color: '#53a602', marginTop: 11, paddingEnd: 20, flexWrap: 'wrap', flex: 1 }}
                            >{item.sender_address}</Text>
    
                        </View>
    
                        <Text
                            style={styles.shippingDateContainer}
                        >Shipped on {Moment(dt).format('DD/MM/YYYY')}</Text>
    
                    </View>
                </View>
            </Card>
                        </TouchableOpacity>;
    
    
    
        }
    
    
        render() {
    
    
            return (
               
                    <View style={styles.parentContainer}>
                    
    
    
    
                        <View style={styles.mainContainer}>
                            
                            <FlatList
                                data={this.state.data}
                                renderItem={this._renderItem.bind(this)}
                                keyExtractor={this._keyExtractor}
    
                            />
    
    
    
    
                        </View>
    
                    </View>
                
            );
        }
    }
    const styles = StyleSheet.create({

        mainContainer: {
    
            flex: 1,
            backgroundColor: '#f1f1fd',
    
        },
    
        parentContainer: {
            flex: 1,
            backgroundColor: '#d2e0fc',//#2e97db',
    
        },
    
    
        hamBurgerContainer: {
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            width: 70,
        },
        cardContainer: {
            borderWidth: 1,
            borderRadius: 2,
            borderColor: '#ddd',
            borderBottomWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 1,
            marginLeft: 5,
            marginRight: 5,
            marginTop: 10,
        },
        logoContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 18,
            marginBottom: 18
        },
    
        inputContainer: {
            flexDirection: 'row',
            position: "relative"
            //alignItems: 'center',
    
        },
        statusIconContainer: {
            marginLeft: 10,
            flexDirection: 'column'
    
    
        },
        statusTextContainer: {
            backgroundColor: '#53a602',
            fontSize: 10,
            padding: 2,
            textAlign: 'center',
            color: '#ffffff'
    
        },
        statusTextContainer1: {
            backgroundColor: '#e60722',
            fontSize: 10,
            padding: 2,
            textAlign: 'center',
            color: '#ffffff'
    
        },
        shippingDateContainer: {
    
            alignSelf: 'flex-end',
            backgroundColor: '#d2e0fc',
            fontSize: 10,
            paddingTop: 3,
            paddingBottom: 3,
            paddingStart: 5,
            paddingEnd: 5,
            textAlign: 'center',
            color: '#5e5e5e',
    
            position: "absolute",
            bottom: 0,
            right: 0
    
    
        },
    
        iconContainer: {
            backgroundColor: '#d2e0fc',
            alignItems: "center",
            padding: 10,
            marginTop: 15,
            marginBottom: 15,
    
        },
        informationContainer: {
            marginStart: 10,
            flex: 1,
            flexDirection: "column",
            
    
        },
        phoneIconContainer: {
          alignSelf: 'flex-end',
            // position:"absolute",
            // right: 0
    
        },
    
        cardContainerRight: {
            flexDirection: 'row',
            alignContent: 'space-between',
        },
    
        cardContainerCenter: {
            flexDirection: 'row',
            alignContent: 'space-between',
            alignItems: 'center',
            justifyContent: 'center',
        },
    
    
        listHeaderText: {
            fontSize: 15,
            backgroundColor: 'transparent',
            color: 'black',
            marginLeft: 10,
            marginRight: 10,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        listText: {
            fontSize: 14,
            backgroundColor: 'transparent',
            color: 'black',
            marginLeft: 10,
            marginRight: 10,
            textAlign: 'center',
        },
    
    
        buttonContainer: {
    
            backgroundColor: '#53a602',
            width: '30%',
            height: 25,
            alignItems: 'center',
            borderRadius: 25,
            padding: 3,
            borderColor: '#14136d',
            borderWidth: 1,
        },
        acceptButtonContainer: {
    
            backgroundColor: '#53a602',
            width: '30%',
            height: 25,
            alignItems: 'center',
            borderRadius: 10,
            padding: 1,
            borderColor: '#53a602',
            borderWidth: 1,
        }
        ,
    
        rejectButtonContainer: {
    
            backgroundColor: '#d3071f',
            width: '30%',
            height: 25,
            alignItems: 'center',
            borderRadius: 10,
            padding: 1,
            borderColor: '#d3071f',
            borderWidth: 1,
        }
        ,
        callButtonContainer: {
    
            backgroundColor: '#14136d',
            width: '30%',
            height: 25,
            alignItems: 'center',
            borderRadius: 10,
            padding: 1,
            borderColor: '#14136d',
            borderWidth: 1,
        }
        ,
        inputIcon: {
            width: 50,
            height: 50,
    
        },
        phoneIcon: {
            width: 40,
            height: 40,
            
    
    
        },
    
        halfBottomIcon: {
            width: 12,
            height: 25,
    
    
        },
        buttonTextOnPress: {
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center',
            width: 120,
            height: 35,
    
        },
        buttonText: {
            color: '#14136d',
            fontWeight: 'bold',
            fontSize: 14,
            textAlign: 'center',
            width: 120,
            height: 30,
    
        },
        acceptButtonText: {
            color: '#ffffff',
    
            fontSize: 14,
            textAlign: 'center',
            width: 120,
            height: 25,
    
    
        }
        // , onDutyText: {
        // 	color: '#000000',
        // 	fontSize: 15,
        // 	alignItems: 'center',
        // 	marginEnd: 15,
        // 	paddingBottom: 2
    
    
    
    
        // }
    
    });
    
    const mapStateToProps = ({ orderDeliveredReducer }) => {
        const { orderDeliveredResponseData, isLoading } = orderDeliveredReducer;
    
    
        return {
            orderDeliveredResponseData: orderDeliveredResponseData,
            isLoading: isLoading
        }
    }
//export default OrderDeliveredScreen;
export default connect(mapStateToProps, { orderDeliveredData, showOrderDeliveredLoading,clearListData })(AcceptedDeliveryRequestScreen);