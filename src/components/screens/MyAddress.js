import React, { Component } from "react";
import {
    View,
    TextInput,
    Button,
    Text,
    AsyncStorage,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import AddressIcon from "../../assets/location.png";
import Delete from "../../assets/delete.png";
import Loader from '../common/Loader';

import { Card, List } from 'react-native-elements';

import { addressList, showAddressLoading,clearAddressRecord ,deleteAddress,clearDeleteAddress} from '../../actions/MyAddressActions';

class MyAddress extends Component {
    constructor(props) {

        super(props);
        this.state = {
            loading: false,
            selectedItem: 'test'


        }
    }

    componentWillMount() {
        console.log(" from......................................................",this.props.from)
        this.getProfileData();
    }

    getProfileData() {

        AsyncStorage.getItem("userData").then((value) => {
            if (value) {
                usertype = JSON.parse(value).type;
                phoneNumber = JSON.parse(value).phone;
                userId = JSON.parse(value)._id;

                this.props.showAddressLoading(true);

                var address = {

                    userid: userId,
                    //type: usertype

                };


                this.props.addressList(address);


            }

        }).done();

    }


    _onPress(item) {
        if(this.props.from != "Dashboard")
        {  
            console.log("item longitude................................Dashboard",this.props.shipId);
            Actions.pop();
            Actions.MapScreen({ lat:item.lat,
                                lng:item.lng, 
                                isFrom:'MyAddress',
                                addName: item.street,
                                addId:item._id,
                                shipmentId:this.props.shipId});
        }
        else{
            console.log("item number................................Dashboard");
        }
		
		
    };
    
    _onDeleteIconPress(item) {
        this.props.showAddressLoading(true);
        this.props.clearAddressRecord();
       // selectedItem = item;
        AsyncStorage.getItem("userData").then((value) => {
            if (value) {
                userId = JSON.parse(value)._id;
        console.log("item id..........................................", item._id);
                var delAdd = {

                    addressid : item._id,
                    _id: userId

                };


                this.props.deleteAddress(delAdd);
                
            }

        }).done();


    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.addressListResponse != undefined && nextProps.addressListResponse != '') {
            console.log("nextProps.dasboardResponseData'''''''''''''''''''''''---------------------", nextProps.addressListResponse);

            if (nextProps.addressListResponse.status == 200) {
                this.props.showAddressLoading(false);

                this.setState({ data: nextProps.addressListResponse.data })

            }

            else {
                this.props.showAddressLoading(false);
                alert(nextProps.addressListResponse.message);


            }



        }

        if (nextProps.deleteAddressResponse != undefined && nextProps.deleteAddressResponse != '') {
            console.log("nextProps.deleteAddressResponse'''''''''''''''''''''''---------------------", nextProps.deleteAddressResponse);

            if (nextProps.deleteAddressResponse.status == 200) {
                this.props.showAddressLoading(false);

                this.setState({ data: nextProps.deleteAddressResponse.data })
                //this.deleteAddressItem(selectedItem);

            }

            else {
                this.props.showAddressLoading(false);
                alert(nextProps.deleteAddressResponse.message);


            }



        }




    }
    componentWillUnmount()
    {
        console.log("componentWillUnmount...........................................................");
        this.props.clearDeleteAddress();
    }
    // deleteAddressItem(selectedItem) {
    //     var data = [...this.state.data]
    //     let index = data.indexOf(selectedItem);
    //     data.splice(index, 1);
    //     this.setState({ data });
    //     selectedItem = '';
    // }

    _renderItem({ item, index }) {
        //console.log("addr status..............................................." +item.addr_status);
           //if(item.addr_status == true )
           //{
        return 	<TouchableOpacity
		onPress={() =>this._onPress(item)}
		>
        <Card
                containerStyle={{ padding: 2, marginTop: 15, marginEnd: 6, marginStart: 6 }}
            >

                <View style={styles.inputContainer}>




                    <Image
                        source={AddressIcon}
                        style={styles.inputIconAdd}

                    />

                    <Text
                        style={{ fontSize: 16, color: '#5e5e5e' }}
                    >{item.street}</Text>


                    
                    <View style={styles.deleteIconContainer}
						>

                        <TouchableOpacity
						onPress={() => this._onDeleteIconPress(item)}
						>
                    <Image
                        source={Delete}
                        style={styles.inputIconDelete}

                    />
                    </TouchableOpacity>
                    </View>
                    



                </View>
            </Card>
            </TouchableOpacity>;
           //}
           



    }
    render() {

        return (


            <View
                style={styles.parentContainer}>
<Loader
                    loading={this.props.isLoading} />
                    <View
                style={styles.parentContainer}>


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

    parentContainer: {
        flex: 1,
        
 },
    inputContainer: {

        flexDirection: 'row',
        position: "relative",
        alignItems: 'center',
        paddingTop:5,
        paddingBottom:5
      
      

    },
   
    inputIconAdd: {
		width: 50,
        height: 50,
        marginStart:-5
       

    },
    inputIconDelete: {
		width: 25,
        height: 25,
    
        
        },
        
    deleteIconContainer: {
       position:"absolute",
       right: 0
        
        }
});
const mapStateToProps = ({ address }) => {
    const { addressListResponse ,deleteAddressResponse,isLoading} = address;
    return {

        addressListResponse: addressListResponse,
        deleteAddressResponse: deleteAddressResponse,
        isLoading: isLoading

    };
};


export default connect(mapStateToProps, { addressList, showAddressLoading,clearAddressRecord,deleteAddress,clearDeleteAddress })(MyAddress);