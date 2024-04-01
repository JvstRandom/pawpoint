import React, { Component, useState } from "react";
import { View, Text, TouchableOpacity, ToastAndroid, StyleSheet, Image, ScrollView, TextInput} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

class Daycare extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            chosenDate: new Date(),
            showDatePicker: false // to control the visibility of the date picker
         };
    }
    
    render() {
        const { chosenDate, showDatePicker } = this.state;
        return (
            <View style={styles.container}>
                <View style={{marginHorizontal: 22}}>
                    {/* JENIS DAYCARE */}
                    <View>
                        <Text style={{fontSize: 25, fontWeight:'bold', color: 'black', marginTop: 10}}>Pilih Jenis Daycare yang Ingin Dilakukan!</Text>
                        <View style={styles.t4JenisDC}>
                            <TouchableOpacity style={[styles.JenisDC, styles.borderProp]}>
                                <Image style={styles.iconJenisDC} source={require('./icon/soap-solid.png')}/>
                                <Text style={{paddingTop: 8}}>Bath</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.JenisDC, styles.borderProp]}>
                            <Image style={styles.iconJenisDC} source={require('./icon/scissors-solid.png')}/>
                                <Text style={{paddingTop: 8}}>Grooming</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.JenisDC, styles.borderProp]}>
                            <Image style={styles.iconJenisDC} source={require('./icon/paw-solid.png')}/>
                                <Text style={{paddingTop: 8}}>Manicure</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* JENIS PET */}
                    <Text style={{fontSize: 25, fontWeight:'bold', color: 'black'}}>Tentang Pet Anda:</Text>
                    <View style={styles.t4jenisPet}>
                        <TouchableOpacity style={[styles.jenisPet, styles.borderProp]}>
                            <Text style={{fontSize: 18, fontWeight: 600}}>Kucing</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.jenisPet, styles.borderProp]}>
                            <Text  style={{fontSize: 18, fontWeight: 600}}>Anjing</Text>
                        </TouchableOpacity>
                    </View>

                    {/* NAMA PET */}
                    <TextInput
                        style={[{ height: 40, width: 345, borderColor: 'black', marginVertical: 15, paddingHorizontal: 10 }, styles.borderProp]}
                        // onChangeText={handleInputChange}
                        // value={inputValue}
                        placeholder="Masukkan Nama Pet Anda"
                    />

                    {/* DATE PICK */}
                    <View>
                        <Text style={{fontSize: 25, fontWeight:'bold', color: 'black'}}>Pilih Tanggal:</Text>
                        
                    </View>

                    {/* TIME PICKER */}
                    <Text style={{fontSize: 25, fontWeight:'bold', color: 'black'}}>Pilih Sesi:</Text>
                    <View style={styles.t4JenisDC}>
                        <TouchableOpacity style={[styles.sesi]}>
                            <Text style={{fontWeight: 'bold'}}>Sesi 1:</Text>
                            <Text>9 : 00</Text>
                            <Text>  -  </Text>
                            <Text>11 : 00</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sesi}>
                            <Text style={{fontWeight: 'bold'}}>Sesi 2:</Text>
                            <Text>11 : 00</Text>
                            <Text>  -  </Text>
                            <Text>14 : 00</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sesi}>
                            <Text style={{fontWeight: 'bold'}}>Sesi 3:</Text>
                            <Text>14 : 00</Text>
                            <Text>  -  </Text>
                            <Text>15 : 00</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={ () => this.props.navigation.goBack()}>
                        <Text> BACK </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F5EC',
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
    t4JenisDC: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 0,
        gap: 3
    },
    JenisDC: {
        alignItems: 'center',
        backgroundColor: '#F9F5EC',
        width: 100,
        height: 100,
        justifyContent: 'center'
    },
    iconJenisDC: {
        width: 45,
        height: 45
    },
    t4jenisPet: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginVertical: 10
    },
    jenisPet: {
        backgroundColor: '#8FB6F1',
        width: 130,
        height: 40,
        marginHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',

    },
    sesi: {
        alignItems: 'center',
        backgroundColor: '#F9F5EC',
        width: 100,
        height: 130,
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 50,
    },
});

export default Daycare;