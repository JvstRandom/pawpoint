import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { Input } from 'react-native-elements';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        setLoading(false);

        if (error) {
            Alert.alert(error.message);
        } else {
            navigation.navigate('Home'); // Redirect to Home on successful login
        }
        
    }

    async function signUpWithEmail() {
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        if (!session) Alert.alert("Please check your inbox for email verification!");
        setLoading(false);
    }

    return (
        <View style={styles.container}>

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
                <Input
                    
                    label="Email"
                    leftIcon={{ type: "font-awesome", name: "envelope" }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="Masukkan email Anda..."
                    autoCapitalize={"none"}
                />
                <Input
                    
                    label="Password"
                    leftIcon={{ type: "font-awesome", name: "lock" }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    autoCapitalize={"none"}
                    placeholder="Masukkan password Anda..."
                />
                <TouchableOpacity style={styles.Button} onPress={signInWithEmail} disabled={loading}>
                    <Text style={styles.ButtonText}>Login Sekarang</Text>
                </TouchableOpacity>

                <Text style={styles.signupText}>
                    Belum mempunyai akun?
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signupLink}> Signup</Text>
                    </TouchableOpacity>
                </Text>
            </View>

        </View>
    );
};

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

export default Login;
