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
    Alert,
    ImageBackground
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import AddressIcon from "../../assets/location.png";
import Delete from "../../assets/delete.png";
import Loader from '../common/Loader';
var isListEmpty = "";

import { Card, List } from 'react-native-elements';

import { addressList, showAddressLoading,clearAddressRecord ,deleteAddress,clearDeleteAddress} from '../../actions/MyAddressActions';

class MyAddress extends Component {
    constructor(props) {

        super(props);
        this.state = {
            loading: false,
            selectedItem: 'test',
            isListEmpty:false


        }
    }

    componentWillMount() {
        
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
            console.log("addId......................................", item.street);
            Actions.pop();
            Actions.MapScreen({ lat:item.lat,
                                lng:item.lng, 
                                isFrom:'MyAddress',
                                addName: item.street,
                                addId:item._id,
                                shipmentId:this.props.shipId});
        }
        else{
            
        }
		
		
    };
    
    _onDeleteIconPress(item) {
        this.props.showAddressLoading(true);
        this.props.clearAddressRecord();
       // selectedItem = item;
        AsyncStorage.getItem("userData").then((value) => {
            if (value) {
                userId = JSON.parse(value)._id;
        
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
            

            if (nextProps.deleteAddressResponse.status == 200) {
                this.props.showAddressLoading(false);

                this.setState({ data: nextProps.deleteAddressResponse.data })
                console.log("data id.................................................",nextProps.deleteAddressResponse.data.length)
                if(nextProps.deleteAddressResponse.data.length == 0)
                {
                    
                this.setState({ isListEmpty: false })
                }

            }

            else {
                this.props.showAddressLoading(false);
                alert(nextProps.deleteAddressResponse.message);


            }



        }




    }

    backgroundImage()
    {

        console.log("data....................................................",this.state.isListEmpty);
        if (!this.state.isListEmpty) {
          return<ImageBackground
          //resizeMode={'stretch'} // or cover
          style={{flex: 0, width: null, height: '100%', justifyContent: 'center', alignItems: 'center'}} // must be passed from the parent, the number may vary depending upon your screen size
          source={require('../../assets/noAddressFound.png/')}
        >
         </ImageBackground>;
        }
    }


    componentWillUnmount()
    {
        
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
        console.log("item.....................................................",item)
        this.setState({ isListEmpty: true })
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
                
                {this.backgroundImage()} 
                

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
        flex: 0,
        justifyContent: 'center'
        
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