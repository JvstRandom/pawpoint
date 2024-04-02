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
            <View style={styles.container}>
                {/* Sticky Navbar */}
                <View style={[styles.navbar, styles.shadowProp, styles.borderProp]}>
                    <TouchableOpacity style={styles.iconNavt4} onPress={ () => this.props.navigation.navigate('Daycare')}>
                        <Image style={styles.iconNav} source={require('./icon/pump-medical-solid.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconNavt4, styles.borderProp, {backgroundColor: '#F9F5EC'}]} onPress={ () => this.props.navigation.navigate('Home')}>
                        <Image style={styles.iconNav} source={require('./icon/house-solid.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconNavt4} onPress={ () => this.props.navigation.navigate('Nyoba')}>
                        <Image style={styles.iconNav} source={require('./icon/clipboard-regular.png')} />
                    </TouchableOpacity>
                </View>

                {/* Scrollable Content */}
                <ScrollView style={{marginHorizontal: 22}} showsVerticalScrollIndicator={false}>
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

                        <View style={[styles.boxPenyakit, {backgroundColor: '#F1C654'}, styles.borderProp, styles.shadowProp]}>
                            <View style={styles.deskripsiPenyakit}>
                                <View style={styles.judulPenyakit}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>Parainfluenza</Text>
                                </View>
                                <Text>Gejala :</Text>
                                <Text>1. Batuk kering.</Text>
                                <Text>2. Demam</Text>
                                <Text>3. Bersin.</Text>
                                <Text>4. Peradangan Mata.</Text>
                            </View>
                            <View style={[styles.panah, {backgroundColor: '#C5BDF0'}]}>
                                <Image style={styles.panahicon} source={require('./icon/chevron-right-solid.png')}/>
                            </View>
                        </View>
                    </View>
                    {/* <TouchableOpacity onPress={ () => this.props.navigation.navigate('Daycare')}>
                        <Text>Pindah screen ke detail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Nyoba')}>
                        <Text>Pindah screen ke detail</Text>
                    </TouchableOpacity> */}
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
    sambutan: {
        marginVertical: 18,
        marginTop: 80,
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