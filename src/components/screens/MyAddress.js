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

import {addPlace,deletePlace,selectPlace,deselectPlace} from '../../actions';

class MyAddress extends Component {

   

    placeNameChangedHandler = placeName => {
    this.props.onAddPlace(placeName);
    }

    placeSubmitHandler = () => {
        
     if(this.props.places.name === "")
     {
         return;
     }
    return this.props.places.name;
    };

 
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
                 <TextInput
                 placeholder = "Add Place"
                 value ={this.props.places.name}
                  onChangeText = {this.placeNameChangedHandler}
                 />
                
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

const mapStateToProps = state =>{
  console.log("abhi....................." ,state.places.places);
    return{
    
        places: state.places.places,
        selectedPlace:state.places.selectedPlace
    };
};

const mapDispatchToProps = dispatch => {

    return{
        onAddPlace: (name) =>dispatch(addPlace(name)),
        onDeletePlace: () => dispatch(deletePlace()),
        onSelectPlace:(key) => dispatch(selectPlace(key)),
        onDeselectPlace: () => dispatch(deselectPlace())
    };

}; 

export default connect(mapStateToProps,mapDispatchToProps)(MyAddress);