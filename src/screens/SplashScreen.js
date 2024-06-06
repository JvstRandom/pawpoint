import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { StackActions } from "@react-navigation/native";

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.dispatch(StackActions.replace('Home'))
        }, 2000);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('./logoo.jpg')} 
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: Dimensions.get('window').width * 0.8, 
        height: Dimensions.get('window').width * 0.8,
        marginBottom: 20,
    },
    text: {
        marginTop: 25,
    },
});

export default SplashScreen;
