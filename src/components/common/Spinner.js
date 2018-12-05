import React, { Component } from 'react';
import { View ,ActivityIndicator} from 'react-native';

const Spinner =  ({size}) => {
	return(
		<View style= {styles.containerStyle}>
		<ActivityIndicator size = {size || "large"}>
            </ActivityIndicator>
			</View>
	);
};

const styles = {
	containerStyle: {
	
	    flex:1,
		backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
       
	}
}

export {Spinner};