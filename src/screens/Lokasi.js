import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, TextInput } from "react-native";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const screenWidth = Dimensions.get('window').width;

        return (
            <View style={styles.container}>
                {/* Sticky Navbar */}
                <View style={[styles.navbar, styles.shadowProp, styles.borderProp]}>
                    <TouchableOpacity style={styles.iconNavt4} onPress={() => this.props.navigation.navigate('Profile')}>
                        <Image style={styles.iconNav} source={require('./icon/pump-medical-solid.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconNavt4, styles.borderProp, { backgroundColor: '#F9F5EC' }]} onPress={() => this.props.navigation.navigate('Home')}>
                        <Image style={styles.iconNav} source={require('./icon/house-solid.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconNavt4} onPress={() => this.props.navigation.navigate('Upload')}>
                        <Image style={styles.iconNav} source={require('./icon/clipboard-regular.png')} />
                    </TouchableOpacity>
                </View>

                {/* Scrollable Content */}
                <ScrollView style={{ marginHorizontal: 22 }} showsVerticalScrollIndicator={false}>
                    {/* POST */}
                    <View style={[styles.kotakPengisiKonten, styles.borderProp, { paddingHorizontal: 16, borderWidth: 0 }]}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Pantai Suramadu, Surabaya</Text>
                    </View>
                    <View style={[styles.post, styles.shadowProp, styles.borderProp]}>
                        <View style={styles.texttime}>
                            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>10:30</Text>
                            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>21 Juni 2024</Text>
                        </View>

                        <Image source={require('../asset/dogdipantai.jpeg')} style={{ width: screenWidth - 85, height: 200, borderRadius: 12, marginBottom: 20 }}></Image>
                    </View>

                    <View style={[styles.t4fitur, styles.borderKomen, { justifyContent: 'space-evenly', marginTop: 12 }]}>
                        <Image source={require('../asset/dogdipantai.jpeg')} style={{ width: screenWidth / 8, height: screenWidth / 8, borderRadius: 50 }} />
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 2 }}>DogLovers</Text>
                            <Text>"Wah bagus sekali, lain kali saya akan kesana"</Text>
                        </View>
                    </View>
                    <View>
                        <TextInput
                            style={[styles.borderKomen, { paddingHorizontal: 16 }]}
                            placeholder="Tambahkan komentar"
                        />
                    </View>
                    <View>
                        <View style={[styles.kotakPengisiKonten, styles.borderProp, { marginTop: 30, marginRight: 200, backgroundColor: '#F1C654' }]}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Post Terkait</Text>
                        </View>
                    </View>

                    {/* Terkait Posts */}
                    <View style={styles.t4Post}>
                        <View style={[styles.relatedPost, styles.borderProp]}>
                            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>21 Juni 2024 / 10:30</Text>
                            <Image source={require('../asset/dogdipantai.jpeg')} style={styles.relatedImage}></Image>
                        </View>
                        <View style={[styles.relatedPost, styles.borderProp]}>
                            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>21 Juni 2024 / 10:30</Text>
                            <Image source={require('../asset/dogdipantai.jpeg')} style={styles.relatedImage}></Image>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F5EC',
        alignItems: 'center'
    },
    post: {
        marginTop: 15,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#F9F5EC',
        justifyContent: 'center'
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
    texttime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3
    },
    kotakPengisiKonten: {
        backgroundColor: '#8FB6F1',
        borderRadius: 18,
        paddingVertical: 4,
        paddingHorizontal: 16,
        marginTop: 100,
    },
    t4fitur: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    borderKomen: {
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20,
        padding: 5,
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
    t4Post: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    relatedPost: {
        width: (Dimensions.get('window').width - 64) / 2,
        borderWidth: 1,
        borderRadius: 0,
        padding: 10,
        backgroundColor: '#F9F5EC',
    },
    relatedImage: {
        width: '100%',
        height: 150,
        marginTop: 10,
    }
});

export default Home;
