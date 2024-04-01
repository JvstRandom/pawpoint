import { StackActions } from "@react-navigation/native";
import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        setTimeout( () => {
            this.props.navigation.dispatch(StackActions.replace('Home'))
        }, 2000);
    }

    render() {
        return (
            <View>
                <Text>SPLASHSCREEN</Text>
                
            </View>
        )
    }
}

export default SplashScreen;