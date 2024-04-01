import React, { Component } from "react";
import { View, Text, TouchableOpacity, ToastAndroid, StyleSheet, Image, ScrollView} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <ScrollView  style={[styles.container]}>
                <View style={{marginHorizontal: 22}}>
                    {/* SAMBUTAN */}
                    <View style={[styles.sambutan, styles.shadowProp, styles.borderProp]}>
                        <View style={styles.texthello}>
                            <Text style={{fontSize: 36, fontWeight:'bold'}}>Halo,</Text>
                            <Text style={{fontSize: 20, fontWeight:'bold'}}>Username</Text>
                        </View>
                        <Image source={require('./cat.png')} style = {{width: 200, height:200}}></Image>
                    </View>

                    {/* FITUR */}
                    <View>
                        <Text style={{fontSize: 25, fontWeight:'bold', color: 'black'}}>Apa yang Mau Anda Lakukan Hari Ini?</Text>
                        <View style={styles.t4fitur}>
                            <View style={[styles.fitur, styles.shadowProp, styles.borderProp,{backgroundColor: '#F1C654'}]}>
                                <Image source={require('./gendongAnjing.png')} style = {{width: 150, height: 150}}/>
                                <TouchableOpacity style={styles.t4txtfitur} onPress={ () => this.props.navigation.navigate('Daycare')}>
                                    <Text style={{fontSize: 17, fontWeight:'600', textAlign: 'center', color: 'black'}}>Daycare</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.fitur, styles.shadowProp, styles.borderProp, {backgroundColor: '#F47356'}]}>
                                <Image source={require('./gendongKelinci.png')} style = {{width: 150, height: 150}}/>
                                <TouchableOpacity style={styles.t4txtfitur}>
                                    <Text style={{fontSize: 17, fontWeight:'600', textAlign: 'center', color: 'black'}}>Konsultasi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* EXPLORE */}
                    <View>
                        <Text style={{fontSize: 25, fontWeight:'bold', color: 'black'}}>EXPLORE</Text>
                        <Text style={{fontSize: 15}}>Pelajari Gejala Penyakit yang Umum Terjadi!</Text>
                        <View style={[styles.boxPenyakit, {backgroundColor: '#8FB6F1'}, styles.borderProp, styles.shadowProp]}>
                            <View style={styles.deskripsiPenyakit}>
                                <View style={styles.judulPenyakit}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>Cacingan</Text>
                                </View>
                                <Text>Gejala :</Text>
                                <Text>1. Muntah-muntah.</Text>
                                <Text>2. Lemas</Text>
                                <Text>3. Tidak Selera makan.</Text>
                                <Text>4. Mencret.</Text>
                            </View>
                            <View style={[styles.panah, {backgroundColor: '#F47356'}]}>
                                <Image style={styles.panahicon} source={require('./icon/chevron-right-solid.png')}/>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Daycare')}>
                        <Text>Pindah screen ke detail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Nyoba')}>
                        <Text>Pindah screen ke detail</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F5EC',
    },
    sambutan: {
        marginVertical: 18,
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingLeft: 20,
        backgroundColor: '#F9F5EC',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    texthello: {
        

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
    deskripsiPenyakit: {

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
  });

export default Home;