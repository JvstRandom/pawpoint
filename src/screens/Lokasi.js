import React, { Component } from "react";
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";

class Lokasi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationId: props.route.params.locationId,
            locationName: '',
            posts: [],
        };
    }

    componentDidMount() {
        this.fetchLocationName();
        this.fetchPosts();
    }

    fetchLocationName = async () => {
        const { data, error } = await supabase
            .from('locations')
            .select('name')
            .eq('id', this.state.locationId)
            .single();

        if (data) {
            this.setState({ locationName: data.name });
        } else {
            console.error(error);
        }
    };

    fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select(`*, profiles:user_id (id, username, avatar_url)`)
            .eq('location_id', this.state.locationId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error(error);
        } else {
            this.setState({ posts: data });
        }
    };

    render() {
        const screenWidth = Dimensions.get('window').width;

        return (
            <View style={styles.container}>
                {/* Sticky Navbar */}
                <View style={[styles.navbar, styles.shadowProp, styles.borderProp]}>
                    <TouchableOpacity style={styles.iconNavt4} onPress={() => this.props.navigation.navigate('Profile')}>
                        <Image style={styles.iconNav} source={require('./icon/pump-medical-solid.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconNavt4} onPress={() => this.props.navigation.navigate('Home')}>
                        <Image style={styles.iconNav} source={require('./icon/house-solid.png')} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ marginHorizontal: 22 }} showsVerticalScrollIndicator={false}>
                    <View style={[styles.kotakPengisiKonten, styles.borderProp, { paddingHorizontal: 16, borderWidth: 0 }]}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.state.locationName}</Text>
                    </View>

                    {/* Display posts related to this location */}
                    {this.state.posts.map((post) => (
                        <View key={post.id} style={[styles.post, styles.shadowProp, styles.borderProp]}>
                            <Image source={{ uri: post.photo_url }} style={{ width: screenWidth - 85, height: 200, borderRadius: 12, marginBottom: 20 }} />
                            <Text>{post.caption}</Text>
                            <Text>Posted by : {post.profiles.username}</Text>
                        </View>
                    ))}
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

export default Lokasi;
