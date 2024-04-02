import React, { Component, useState } from "react";
import { View, Text, TouchableOpacity, ToastAndroid, StyleSheet, Modal, Image, ScrollView, TextInput} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

class Daycare extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isPopupVisibleBath: false,
            isPopupVisibleGrooming: false,
            isPopupVisibleManicure: false,
         };
    }
    
    render() {
        return (
            <View style={styles.container}>
                {/* Sticky Navbar */}
                <View style={[styles.navbar, styles.shadowProp, styles.borderProp]}>
                    <TouchableOpacity style={[styles.iconNavt4, styles.borderProp, {backgroundColor: '#F9F5EC'}]} onPress={ () => this.props.navigation.navigate('Daycare')}>
                        <Image style={styles.iconNav} source={require('./icon/pump-medical-solid.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconNavt4} onPress={ () => this.props.navigation.navigate('Home')}>
                        <Image style={styles.iconNav} source={require('./icon/house-solid.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconNavt4} onPress={ () => this.props.navigation.navigate('Nyoba')}>
                        <Image style={styles.iconNav} source={require('./icon/clipboard-regular.png')} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{marginHorizontal: 22}} showsVerticalScrollIndicator={false}>
                    {/* JENIS DAYCARE */}
                    <View>
                        <Text style={{fontSize: 25, fontWeight:'bold', color: 'black', marginTop: 80}}>Pilih Jenis Daycare yang Ingin Dilakukan!</Text>
                        <View style={styles.t4JenisDC}>
                            <TouchableOpacity 
                                style={[styles.JenisDC, styles.borderProp]}
                                onPress={() => this.setState({ isPopupVisibleBath: true })}
                            >
                                <Image style={styles.iconJenisDC} source={require('./icon/soap-solid.png')}/>
                                <Text style={{paddingTop: 8}}>Bath</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.JenisDC, styles.borderProp]}
                                onPress={() => this.setState({ isPopupVisibleGrooming: true })}
                            >
                            <Image style={styles.iconJenisDC} source={require('./icon/scissors-solid.png')}/>
                                <Text style={{paddingTop: 8}}>Grooming</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.JenisDC, styles.borderProp]}
                                onPress={() => this.setState({ isPopupVisibleManicure: true })}
                            >
                            <Image style={styles.iconJenisDC} source={require('./icon/paw-solid.png')}/>
                                <Text style={{paddingTop: 8}}>Manicure</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Bath Modal */}
                    <Modal
                        visible={this.state.isPopupVisibleBath}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={() => this.setState({ isPopupVisibleBath: false })}
                        style={styles.modal}
                    >
                        <View style={styles.popupContainer}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Bath</Text>
                            <Text>Menyediakan layanan untuk memandikan pet anda !</Text>
                            <TouchableOpacity onPress={() => this.setState({ isPopupVisibleBath: false })} style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{ color: 'black', backgroundColor: '#C5BDF0', width: 60, height: 20, textAlign: 'center', borderRadius: 10, marginVertical: 8, borderWidth: 1 }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    {/* Grooming Modal */}
                    <Modal
                        visible={this.state.isPopupVisibleGrooming}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={() => this.setState({ isPopupVisibleGrooming: false })}
                        style={styles.modal}
                    >
                        <View style={styles.popupContainer}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Grooming</Text>
                            <Text>Menyediakan layanan untuk Grooming pet anda !</Text>
                            <TouchableOpacity onPress={() => this.setState({ isPopupVisibleGrooming: false })} style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{ color: 'black', backgroundColor: '#C5BDF0', width: 60, height: 20, textAlign: 'center', borderRadius: 10, marginVertical: 8, borderWidth: 1 }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    {/* Manicure Modal */}
                    <Modal
                        visible={this.state.isPopupVisibleManicure}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={() => this.setState({ isPopupVisibleManicure: false })}
                        style={styles.modal}
                    >
                        <View style={styles.popupContainer}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Manicure</Text>
                            <Text>Menyediakan layanan untuk merawat kuku pet anda !</Text>
                            <TouchableOpacity onPress={() => this.setState({ isPopupVisibleManicure: false })} style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{ color: 'black', backgroundColor: '#C5BDF0', width: 60, height: 20, textAlign: 'center', borderRadius: 10, marginVertical: 8, borderWidth: 1 }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

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
                    <Text style={{fontSize: 25, fontWeight:'bold', color: 'black'}}>Pilih Tanggal:</Text>
                    <View style={styles.t4Tgl}>
                        <View>
                            <Text>Tanggal :</Text>
                            <TextInput 
                                style={[styles.input, styles.borderProp]} 
                                // onChangeText={handleChange} 
                                // value={inputValue} 
                                keyboardType="numeric"
                            />
                        </View>

                        <View>
                            <Text>Bulan :</Text>
                            <TextInput 
                                style={[styles.input, styles.borderProp]}
                                // onChangeText={handleChange} 
                                // value={inputValue} 
                                keyboardType="numeric"
                            />
                        </View>

                        <View>
                            <Text>Tahun :</Text>
                            <TextInput 
                                style={[styles.input, styles.borderProp]}
                                // onChangeText={handleChange} 
                                // value={inputValue} 
                                keyboardType="numeric"
                            />
                        </View>
                        
                    </View>

                    {/* TIME PICKER */}
                    <Text style={{fontSize: 25, fontWeight:'bold', color: 'black', marginTop: 6}}>Pilih Sesi:</Text>
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

                    <TouchableOpacity style={[styles.borderProp, styles.shadowProp, {backgroundColor: '#F47356', alignItems:'center', padding: 5, marginVertical: 10}]}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Pesan Sekarang!</Text>
                    </TouchableOpacity>


                    {/* <TouchableOpacity onPress={ () => this.props.navigation.goBack()}>
                        <Text> BACK </Text>
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
        alignItems: 'center',
        
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
    t4Tgl: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    input: {
        width: 100,
        height: 40,
        marginVertical: 6
    },
    sesi: {
        alignItems: 'center',
        backgroundColor: '#F9F5EC',
        width: 90,
        height: 130,
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 50,
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
    popupContainer: {
        backgroundColor: '#F9F5EC',
        elevation: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Daycare;