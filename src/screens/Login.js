import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";

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
                    <TouchableOpacity style={styles.iconNavt4} onPress={() => this.props.navigation.navigate('Daycare')}>
                        <Image style={styles.iconNav} source={require('./icon/pump-medical-solid.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconNavt4, styles.borderProp, { backgroundColor: '#F9F5EC' }]} onPress={() => this.props.navigation.navigate('Login')}>
                        <Image style={styles.iconNav} source={require('./icon/house-solid.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconNavt4} onPress={() => this.props.navigation.navigate('Konsul')}>
                        <Image style={styles.iconNav} source={require('./icon/clipboard-regular.png')} />
                    </TouchableOpacity>
                </View>

                {/* SAMBUTAN */}
                <View style={[styles.sambutan, styles.shadowProp, styles.borderProp]}>
                    <View style={styles.texthello}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Selamat</Text>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Datang</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>di Meaps!</Text>
                    </View>
                    <Image source={require('./cat.png')} style={{ width: 200, height: 200 }} />
                </View>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.form1}
                        placeholder="Masukkan email Anda..."
                    />
                    <TextInput
                        style={styles.form2}
                        placeholder="Masukkan password Anda..."
                    />
                    <TouchableOpacity style={styles.Button}>
                        <Text style={styles.ButtonText}>Login Sekarang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={styles.signupText}>
                            Belum mempunyai akun? <Text style={styles.signupLink}>Signup</Text>
                        </Text>
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
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    sambutan: {
        width: '90%',
        marginVertical: 18,
        marginTop: 120,
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
        shadowOffset: { width: -12, height: 19 },
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
    navbar: {
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
    formContainer: {
        width: '90%',
        alignItems: 'center',
        marginTop: 20
    },
    form1: {
        borderWidth: 2,
        borderColor: "black",
        color: 'black',
        paddingHorizontal: 20,
        width: '100%',
        borderRadius: 20,
        height: 55,
        marginTop: 20,
        fontSize: 16
    },
    form2: {
        borderWidth: 2,
        borderColor: "black",
        color: 'black',
        paddingHorizontal: 20,
        width: '100%',
        borderRadius: 20,
        height: 55,
        marginTop: 20,
        fontSize: 16,
        marginBottom: 20
    },
    Button: {
        backgroundColor: '#8FB6F1',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 2,
    },
    ButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    signupText: {
        fontSize: 16,
        marginTop: 10,
    },
    signupLink: {
        color: '#F47356',
        textDecorationLine: 'underline',
    }
});

export default Home;
