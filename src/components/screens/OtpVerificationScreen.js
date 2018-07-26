import React, { Component } from "react";
import { Text ,View ,Button ,TextInput} from "react-native";
import { Actions } from "react-native-router-flux";



class OtpVerificationScreen extends Component {
    onVerifyOtpButtonPress() {
        Actions.RegistrationScreen();
    }

    
    render(){

        return(
            <View style = {styles.mainViewStyles}>
                <Text>Enter 6 Digit OTP</Text>
                <Text>Send to +91 234 556 6781</Text>
                <TextInput
                     style = {styles.textInputStyle}
                     placeholder = "Enter OTP"
                     />

                      <Button
                     onPress = {this.onVerifyOtpButtonPress.bind(this)}
                     title="SUBMIT"
                     color="#000000"
                     
/>

                </View>
        );
    }

}


styles = {
    mainViewStyles: {
        flex:1,
        backgroundColor: '#fff',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center'

    },
    textInputStyle: {
        fontSize:18,
         width:250,
         marginBottom: 10
         
    }
}
export default OtpVerificationScreen;