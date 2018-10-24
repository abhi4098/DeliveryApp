import React, { Component } from "react";
import { 
          View,
          TextInput,
          Button,
          Text,
           
         } from "react-native";
import { Actions  } from "react-native-router-flux";
import { Card } from "../common/index";
import { connect } from "react-redux";

import {addressList,ShowAddressLoading} from '../../actions';

class MyAddress extends Component {

   
     componentWillMount()
     { 
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
						type: usertype

					};
				

				this.props.addressList(address);


			}

		}).done();

	}


    componentWillReceiveProps(nextProps) {

if (nextProps.addressListResponse != undefined && nextProps.addressListResponse != '') {
			console.log("nextProps.dasboardResponseData'''''''''''''''''''''''---------------------", nextProps.addressListResponse);

			if (nextProps.addressListResponse.status == 200) {
				this.props.showDashBoardLoading(false);

				this.setState({ data: nextProps.addressListResponse.data })

			}
  
			else {
				this.props.showDashBoardLoading(false);
				alert(nextProps.addressListResponse.message);


			}



		}

	


	}

 
    render(){
        const placesOutput =this.props.places.map((place,i) =>(
          <Card
          key = {i}
          placeName = {place}
          />
        ));
        return (

           
            <View>

               <View>
               
                
                <Button
                 title = "Add"
                 onPress = {this.placeSubmitHandler}
                 
                />
                </View>
             <View>
                 {placesOutput}
                 </View>
            
            </View>
        );
    }
}

const mapStateToProps = ({address}) =>{
  const {addressListResponse} = address;
    return{
    
        addressListResponse: addressListResponse,
       
    };
};


export default connect(mapStateToProps, {addressList,ShowAddressLoading})(MyAddress);