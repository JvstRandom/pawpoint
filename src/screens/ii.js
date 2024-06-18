import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Modal, TextInput, KeyboardAvoidingView, Platform } from "react-native";
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
            .select('*, profiles(*), locations(*)')
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
            .select('*')
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
            const { data, error } = await supabase
                .from('comments')
                .insert([{ content: newComment, post_id: selectedPost, user_id: 'YOUR_USER_ID' }])
                .select();
            if (error) {
                console.error(error);
            } else {
                this.setState((prevState) => ({
                    comments: [...prevState.comments, ...data],
                    newComment: ''
                }));
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
                    {posts.map((post) => (
                        <View key={post.id} style={[styles.post, styles.shadowProp, styles.borderProp]}>
                            <View style={styles.texttime}>
                                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{new Date(post.created_at).toLocaleTimeString()}</Text>
                                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{new Date(post.created_at).toLocaleDateString()}</Text>
                            </View>

                            <Image source={{ uri: post.photo_url }} style={{ width: screenWidth - 85, height: 200, borderRadius: 12 }} />

                            <View style={[styles.t4fitur, { justifyContent: 'space-evenly', marginTop: 12 }]}>
                                <Image source={{ uri: post.profiles.avatar_url }} style={{ width: screenWidth / 8, height: screenWidth / 8, borderRadius: 50 }} />
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 2 }}>{post.profiles.username}</Text>
                                    <Text>{post.caption}</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={[styles.borderProp, styles.comment]} onPress={() => this.toggleCommentsModal(post.id)}>
                                <Text>Add a comment..</Text>
                            </TouchableOpacity>

                            <View style={[styles.t4fitur, { marginTop: 16 }]}>
                                <View style={styles.kotakPengisiKonten}>
                                    <Text>{post.type_tag}</Text>
                                </View>
                                <View style={[styles.kotakPengisiKonten, { backgroundColor: '#8FB6F1' }]}>
                                    <Text>{post.locations.name}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Comments Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={commentsModalVisible}
                    onRequestClose={() => this.toggleCommentsModal()}
                >
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                                <Text style={styles.modalText}>Comments</Text>
                                {comments.map((comment, index) => (
                                    <Text key={index} style={styles.scrollText}>{comment.content}</Text>
                                ))}
                            </ScrollView>
                            <TextInput
                                style={styles.input}
                                placeholder="Type your comment here..."
                                value={newComment}
                                onChangeText={this.handleCommentChange}
                            />
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
                                <TouchableOpacity style={[styles.kotakPengisiKonten, { backgroundColor: '#8FB6F1', margin: 4, padding: 9 }]} onPress={this.addComment}>
                                    <Text style={styles.buttonText}>Add Comment</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.kotakPengisiKonten, { backgroundColor: '#F47356', margin: 4, padding: 9, borderRadius: 9 }]} onPress={() => this.toggleCommentsModal()}>
                                    <Text style={[styles.buttonText, { fontSize: 20 }]}>X</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
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
        marginTop: 80,
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
    t4fitur: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
