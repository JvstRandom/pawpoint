import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";

class Konsul extends React.Component {
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
                <View style={styles.imageContainer}>
                    <Image
                        source={require('./formkonsul.jpg')} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.form1}
                        placeholder="Masukkan nama Pet Anda"
                    />
                    <View style={styles.column}>
                        <TextInput
                            style={styles.form2}
                            placeholder="Jenis Pet"
                        />
                        <TextInput
                            style={styles.form2}
                            placeholder="Usia Pet"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.column}>
                        <TextInput
                            style={styles.form2}
                            placeholder="Gender Pet"
                        />
                        <TextInput
                            style={styles.form2}
                            placeholder="Berat Pet"
                            keyboardType="numeric"
                        />
                    </View>
                    <TextInput
                        style={styles.form3}
                        placeholder="Keluhan"
                        multiline={true}
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                    <TouchableOpacity style={styles.Button}>
                        <Text style={styles.ButtonText}>Konsultasi Sekarang</Text>
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
        alignItems: 'center'
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
        marginTop: 60
    },
    image: {
        width: '100%',
        height: 170,
    },
    column: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    form1: { 
        borderWidth: 1.5,
        borderColor: "black",
        color: 'black',
        paddingHorizontal: 10,
        marginHorizontal: 6,
        borderRadius: 3,
        height: 40,
        marginTop: 10,
    },
    form2: { 
        flex: 1,
        borderWidth: 1.5,
        borderColor: "black",
        color: 'black',
        paddingHorizontal: 10,
        borderRadius: 3,
        marginLeft: 6,
        marginRight: 4,
        height: 40,
        marginTop: 10,
    },
    form3: {
        borderWidth: 1.5,
        borderColor: "black",
        color: 'black',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 3,
        marginTop: 10,
        height: 150,
        marginTop: 10,
    },
    Button: {
        backgroundColor: '#8FB6F1',
        paddingVertical: 10,
        marginHorizontal: 60,
        borderRadius: 3,
        marginTop: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    ButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Konsul;
