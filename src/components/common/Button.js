import React, { Component } from 'react';
import { Text , TouchableOpacity } from 'react-native';

const Button =  ({onPress,children}) => {

    const {textStyle,buttonStyle} = styles;
	return(
        <TouchableOpacity onPress = {onPress} style= {buttonStyle}>
		<Text style = {textStyle}>
        {children}
			</Text>
            </TouchableOpacity>
	);
};

const styles = {

    textStyle: {
        
        fontSize: 16,
        fontWeight: '600',
        marginTop:6,
        color:'#fff'
        
    },

	buttonStyle: {
        width:100,
	    alignItems:'center',
		borderRadius: 3,
		backgroundColor: '#14136d',
        height:35,
        shadowOpacity:0.3,
        shadowRadius:3,
        shadowColor:'#000',
        shadowOffset:{width: 0,height:5},
        elevation: 3

	}

}

export default Button;