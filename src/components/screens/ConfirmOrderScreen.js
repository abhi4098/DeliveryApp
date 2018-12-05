import React, { Component } from 'react';
import {
    Text,
    BackHandler,
    View,
 
   } from 'react-native';
    import { Actions } from "react-native-router-flux";

    class ConfirmOrderScreen extends Component {

        componentDidMount() {
            BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        }
    
        componentWillUnmount() {
            
            BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    
        }

        onBackPress() {
            // console.log("Actions state index...................." ,Actions.state.index);
            // if (Actions.state.index === 1) {
                
            //     BackHandler.exitApp();
            //     return false;
            // }
            
            Actions.pop();
            Actions.Dashboard();
            return true;
        
        }
           render(){
               return(
                   <View>
                       <Text> Order details with shippping cost .(To be implemented in next sprint) </Text>
                   </View>
               );
           }
    }

    export default ConfirmOrderScreen;