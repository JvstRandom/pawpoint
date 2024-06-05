import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";

class Upload extends React.Component {
    constructor (props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={styles.container}>
                {/* Sticky Navbar */}
                <View style={[styles.navbar, styles.shadowProp, styles.borderProp]}>
                    <TouchableOpacity style={styles.iconNavt4} onPress={ () => this.props.navigation.navigate('Daycare')}>
                        <Image style={styles.iconNav} source={require('./icon/pump-medical-solid.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconNavt4} onPress={ () => this.props.navigation.navigate('Home')}>
                        <Image style={styles.iconNav} source={require('./icon/house-solid.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconNavt4, styles.borderProp, {backgroundColor: '#F9F5EC'}]} onPress={ () => this.props.navigation.navigate('Konsul')}>
                        <Image style={styles.iconNav} source={require('./icon/clipboard-regular.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{}}>
                <View>
                    <TextInput
                        style={styles.form1}
                        placeholder="Upload Foto Anda"
                        textAlignVertical="top"
                    />
                    <TextInput
                        style={styles.form2}
                        placeholder="Lokasi"
                    />
                    <TextInput
                        style={styles.form2}
                        placeholder="Tags"
                    />
                    <TextInput
                        style={styles.form3}
                        placeholder="Caption"
                        multiline={true}
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                    <TouchableOpacity style={styles.Button}>
                        <Text style={styles.ButtonText}>Upload Foto Sekarang</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: "#F9F5EC", 
        padding: 20,
        alignItems: 'center',
        paddingTop: 60,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -12, height: 19},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20
    },
    borderProp: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20,
    },
    icon: {
        marginRight: 10,
      },
      navbar:{
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#C5BDF0',
          paddingHorizontal: 10,
          paddingVertical: 5,
          marginVertical: 14,
          zIndex: 1,
      },
      iconNav: {
          width: 20,
          height: 25
      },
      iconNavt4: {
          borderRadius: 20,
          width: 100,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 4
      },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    image: {
        width: '100%',
        height: 170,
    },
    form1: { 
        borderWidth: 2,
        borderColor: "black",
        color: 'black',
        paddingHorizontal: 10,
        marginHorizontal: 6,
        borderRadius: 20,
        height: 150,
        marginTop: 50,
    },
    form2: { 
        borderWidth: 2,
        borderColor: "black",
        color: 'black',
        paddingHorizontal: 10,
        marginHorizontal: 6,
        borderRadius: 20,
        height: 55,
        marginTop: 20,
    },
    form3: {
        borderWidth: 2,
        borderColor: "black",
        color: 'black',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        marginTop: 20,
        height: 150,
    },
    Button: {
        backgroundColor: '#8FB6F1',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginHorizontal: 60,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 2,
    },
    ButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Upload;
