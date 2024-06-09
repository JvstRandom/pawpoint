import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, Image } from "react-native";
import { supabase } from "../../lib/supabase";

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const maxRetries = 5;
    const delayRef = useRef(1000); // Initial delay of 1 second

    const resetRateLimit = () => {
        setRetryCount(0);
        delayRef.current = 1000;
    };

    const signUpWithEmail = async () => {
        if (loading) return;

        setLoading(true);
        const { data: { session }, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        }, {
            data: {
                full_name: username, // Map username to full_name
            }
        });

        if (error) {
            if (error.message.includes("rate limit")) {
                if (retryCount < maxRetries) {
                    Alert.alert(`Rate limit exceeded, retrying in ${delayRef.current / 1000} seconds...`);
                    setTimeout(() => {
                        setRetryCount(retryCount + 1);
                        delayRef.current *= 2; // Exponential backoff
                        signUpWithEmail(); // Retry signup
                    }, delayRef.current);
                } else {
                    Alert.alert("Rate limit exceeded, please try again later.");
                    resetRateLimit();
                }
            } else {
                Alert.alert(error.message);
                resetRateLimit();
            }
        } else {
            Alert.alert("Please check your inbox for email verification!");
            resetRateLimit();
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            {/* SAMBUTAN */}
            <View style={[styles.sambutan, styles.shadowProp, styles.borderProp]}>
                <View style={styles.texthello}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Masukkan</Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Informasi</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Anda!</Text>
                </View>
                <Image source={require('./cat.png')} style={{ width: 200, height: 200 }} />
            </View>

            <View style={styles.formContainer}>
                {/* <TextInput
                    style={styles.form1}
                    placeholder="Masukkan username Anda..."
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    autoCapitalize={"none"}
                /> */}
                <TextInput
                    style={styles.form1}
                    placeholder="Masukkan email Anda..."
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    autoCapitalize={"none"}
                />
                <TextInput
                    style={styles.form2}
                    placeholder="Masukkan password Anda..."
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    autoCapitalize={"none"}
                />
                <TouchableOpacity style={styles.Button} onPress={signUpWithEmail} disabled={loading}>
                    <Text style={styles.ButtonText}>Daftar Sekarang</Text>
                </TouchableOpacity>

                <Text style={styles.signupText}>
                    Sudah mempunyai akun?
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.signupLink}> Login</Text>
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
        fontSize: 16
    },
    Button: {
        backgroundColor: '#8FB6F1',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 2,
        marginTop: 25
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

export default Signup;
