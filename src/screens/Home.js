import React, { Component, useState } from "react";
import { View, Text, TouchableOpacity, ToastAndroid, StyleSheet, Image, ScrollView, Dimensions, Modal, TextInput, KeyboardAvoidingView, Platform} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { supabase } from "../../lib/supabase";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            commentsModalVisible: false,
            posts: [],
            selectedPost: null,
            comments: [],
            newComment: ''
        };
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts = async () => {
        const { data: posts, error } = await supabase
            .from('posts')
            .select(`
                *,
                profiles:user_id (id, username, avatar_url),
                locations:location_id (id, name)
            `)
            .order('created_at', { ascending: false });
    
        if (error) {
            console.error(error);
        } else {
            this.setState({ posts });
        }
    };
    

    fetchComments = async (postId) => {
        const { data: comments, error } = await supabase
            .from('comments')
            .select(`*, profiles:user_id (id, username, avatar_url)`)
            .eq('post_id', postId);
        if (error) {
            console.error(error);
        } else {
            this.setState({ comments, commentsModalVisible: true });
        }
    };
    
    toggleCommentsModal = (postId = null) => {
        if (postId) {
            this.fetchComments(postId);
            this.setState({ selectedPost: postId });
        } else {
            this.setState({ commentsModalVisible: false, comments: [], selectedPost: null });
        }
    };

    handleCommentChange = (text) => {
        this.setState({ newComment: text });
    };

    addComment = async () => {
        const { newComment, selectedPost } = this.state;
        if (newComment.trim() !== '') {
            try {
                // Get the current user from supabase
                const user = await supabase.auth.getUser();
    
                const { data, error } = await supabase
                    .from('comments')
                    .insert([{ content: newComment, post_id: selectedPost, user_id: user.data.user.id }])
                    .select();
    
                if (error) {
                    console.error(error);
                } else {
                    this.setState((prevState) => ({
                        comments: [...prevState.comments, ...data],
                        newComment: ''
                    }));
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    

    render() {
        const screenWidth = Dimensions.get('window').width;
        const { posts, commentsModalVisible, comments, newComment } = this.state;

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
                </View>

                {/* Scrollable Content */}
                <ScrollView style={{marginHorizontal: 22}} showsVerticalScrollIndicator={false}>
                    {/* POST */}
                    {posts.map((post) => (
                        <View key={post.id} style={[styles.post, styles.shadowProp, styles.borderProp]}>
                            <View style={styles.texttime}>
                                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{new Date(post.created_at).toLocaleTimeString()}</Text>
                                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{new Date(post.created_at).toLocaleDateString()}</Text>
                            </View>

                            <Image source={{ uri: post.photo_url }} style={{ width: screenWidth - 85, height: 200, borderRadius: 12 }} />

                            {/* Username and caption */}
                            <View style={[styles.t4fitur, { justifyContent: 'flex-start', marginTop: 12, gap: 10, marginLeft: 20}]}>
                                {post.profiles && (
                                    <Image source={{ uri: post.profiles.avatar_url }} style={{ width: screenWidth / 8, height: screenWidth / 8, borderRadius: 50 }} />
                                )}
                                <View>
                                    {post.profiles && (
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 2 }}>{post.profiles.username}</Text>
                                    )}
                                    <Text>{post.caption}</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={[styles.borderProp, styles.comment]} onPress={() => this.toggleCommentsModal(post.id)}>
                                <Text>Tambahkan Komentar..</Text>
                            </TouchableOpacity>

                            {/* Type Tag and Location */}
                            <View style={[styles.t4fitur, { marginTop: 16 }]}>
                                <View style={styles.kotakPengisiKonten}>
                                    <Text>{post.type_tag}</Text>
                                </View>
                                <TouchableOpacity style={[styles.kotakPengisiKonten, { backgroundColor: '#8FB6F1' }]} onPress={() => this.props.navigation.navigate('Lokasi', { locationId: post.locations.id })}>
                                    {post.locations && (
                                        <Text>{post.locations.name}</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={commentsModalVisible}
                    onRequestClose={() => this.toggleCommentsModal()}
                >
                    <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                                <Text style={styles.modalText}>Comments</Text>
                                {comments.map((comment, index) => (
                                    <Text key={index} style={styles.scrollText}>{comment.profiles.username} : {comment.content}</Text>
                                ))}
                            </ScrollView>
                            <TextInput
                                style={styles.input}
                                placeholder="Ketik komen anda disini..."
                                value={newComment}
                                onChangeText={this.handleCommentChange}
                            />
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
                                <TouchableOpacity style={[styles.kotakPengisiKonten, { backgroundColor: '#8FB6F1', margin: 4, padding: 9 }]} onPress={this.addComment}>
                                    <Text style={styles.buttonText}>Post</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.kotakPengisiKonten, { backgroundColor: '#F47356', margin: 4, padding: 9, borderRadius: 20 }]} onPress={() => this.toggleCommentsModal()}>
                                    <Text style={[styles.buttonText,]}>Exit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>  

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
    
    kotakPengisiKonten: {
        backgroundColor: '#F1C654',
        borderRadius: 18,
        paddingVertical: 4,
        paddingHorizontal: 10
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
    comment: {
        padding: 6,
        paddingHorizontal: 10,
        marginTop: 15,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollText: {
        marginVertical: 10,
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        padding: 6
    }
  });

export default Home;