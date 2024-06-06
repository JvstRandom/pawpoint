import React, { Component } from "react";
import { View, Text, TouchableOpacity, ToastAndroid, StyleSheet, Image, ScrollView, Dimensions} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;

        return (
            <View style={styles.container}>
                {/* Sticky Navbar */}
                <View style={[styles.navbar, styles.shadowProp, styles.borderProp]}>
                    <TouchableOpacity style={styles.iconNavt4} onPress={ () => this.props.navigation.navigate('Profile')}>
                        <Image style={styles.iconNav} source={require('./icon/pump-medical-solid.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconNavt4, styles.borderProp, {backgroundColor: '#F9F5EC'}]} onPress={ () => this.props.navigation.navigate('Home')}>
                        <Image style={styles.iconNav} source={require('./icon/house-solid.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconNavt4} onPress={ () => this.props.navigation.navigate('Upload')}>
                        <Image style={styles.iconNav} source={require('./icon/clipboard-regular.png')} />
                    </TouchableOpacity>
                </View>

                {/* Scrollable Content */}
                <ScrollView style={{marginHorizontal: 22}} showsVerticalScrollIndicator={false}>
                    {/* POST */}
                    <View style={[styles.post, styles.shadowProp, styles.borderProp]}>
                        <View style={styles.texttime}>
                            <Text style={{fontSize: 10, fontWeight:'bold'}}>10:30</Text>
                            <Text style={{fontSize: 10, fontWeight:'bold'}}>21 Juni 2024</Text>
                        </View>

                        <Image source={require('../asset/dogdipantai.jpeg')} style = {{width: screenWidth-85, height:200, borderRadius: 12, }}></Image>

                        <View style={[styles.t4fitur, {justifyContent: 'space-evenly', marginTop: 12}]}>
                            <Image source={require('../asset/dogdipantai.jpeg')} style = {{width: screenWidth/8, height: screenWidth/8, borderRadius: 50}}/>
                            <View>
                                <Text style={{fontSize: 18, fontWeight:'bold', marginBottom: 2}}>DogLovers</Text>
                                <Text>"Anjingku bisa bersantai disini!"</Text>
                            </View>
                        </View>

                        <View style={[styles.t4fitur, {marginTop: 16}]}>
                            <View style={styles.kotakPengisiKonten}>
                                <Text>#beach</Text>
                            </View>
                            <View style={[styles.kotakPengisiKonten, {backgroundColor: '#8FB6F1'}]}>
                                <Text>Pantai Madura Surabaya</Text>
                            </View>
                        </View>
                    </View>

                    
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F5EC',
        alignItems: 'center'
    },
    post: {
        marginTop: 80,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#F9F5EC',
        justifyContent: 'center'
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
    texttime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3

    },
    t4fitur: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    fitur: {
        marginVertical: 12,
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    t4txtfitur: {
        paddingHorizontal: 4,
        paddingVertical: 5,
        marginHorizontal: 6,
        backgroundColor: '#F9F5EC',
        borderColor: 'black',
        borderWidth: 1.4,
        borderRadius: 10,
        justifyContent: 'center',
        
    },
    boxPenyakit: {
        paddingHorizontal: 18,
        paddingVertical: 15,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    kotakPengisiKonten: {
        backgroundColor: '#F1C654',
        borderRadius: 18,
        paddingVertical: 4,
        paddingHorizontal: 10
    },
    judulPenyakit: {
        backgroundColor: '#F9F5EC',
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 6,
        width: 200
    },
    panah: {
        borderColor: 'black',
        zIndex: 2,
        width: 100,
        height: 150,
        borderRadius: 50,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    panahicon: {
        width: 40,
        height: 60,
        
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
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
  });

export default Home;