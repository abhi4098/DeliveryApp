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
    Image
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import AddressIcon from "../../assets/addressIcon.png";
import Delete from "../../assets/delete.png";

import { Card, List } from 'react-native-elements';

import { addressList, ShowAddressLoading } from '../../actions';

class MyAddress extends Component {
    constructor(props) {

        super(props);
        this.state = {
            loading: false,


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

                this.props.ShowAddressLoading(true);

                var address = {

                    userid: userId,
                    //type: usertype

                };


                this.props.addressList(address);


            }

        }).done();

    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.addressListResponse != undefined && nextProps.addressListResponse != '') {
            console.log("nextProps.dasboardResponseData'''''''''''''''''''''''---------------------", nextProps.addressListResponse);

            if (nextProps.addressListResponse.status == 200) {
                this.props.ShowAddressLoading(false);

                this.setState({ data: nextProps.addressListResponse.data })

            }

            else {
                this.props.ShowAddressLoading(false);
                alert(nextProps.addressListResponse.message);


            }



        }




    }

    _renderItem({ item, index }) {

        return  <Card
                containerStyle={{ padding: 5, marginTop: 15, marginEnd: 6, marginStart: 6 }}
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
						//onPress={() => this._onPhoneIconPress(item)}
						>
                    <Image
                        source={Delete}
                        style={styles.inputIconDelete}

                    />
                    </TouchableOpacity>
                    </View>
                    



                </View>
            </Card>;



    }
    render() {

        return (


            <View
                style={styles.parentContainer}>

                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}

                />
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
      

    },
   
    inputIconAdd: {
		width: 60,
		height: 60,

    },
    inputIconDelete: {
		width: 38,
        height: 38,
        
        },
        
    deleteIconContainer: {
       position:"absolute",
       right: 0
        
        }
});
const mapStateToProps = ({ address }) => {
    const { addressListResponse } = address;
    return {

        addressListResponse: addressListResponse,

    };
};


export default connect(mapStateToProps, { addressList, ShowAddressLoading })(MyAddress);