import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, TextInput } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { supabase } from "../../lib/supabase";
import { decode } from 'base64-arraybuffer';
import { v4 as uuidv4 } from 'uuid';

const EditProfile = ({ navigation, route }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const user = await supabase.auth.getUser();
            const { data, error } = await supabase
                .from('profiles')
                .select('username, avatar_url')
                .eq('id', user.data.user.id)
                .single();

            if (error) {
                throw error;
            }

            if (data) {
                console.log("Fetched profile data:", data);
                setUsername(data.username);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const pickImage = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 200,
            maxHeight: 200,
            quality: 1,
            includeBase64: true, // Ensure this is correctly set
        };

        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0 && response.assets[0].base64) {
                const base64Image = response.assets[0].base64;
                console.log("Picked image base64 length:", base64Image.length);
                const avatarUrl = await uploadAvatar(base64Image);
                if (avatarUrl) {
                    console.log("Uploaded avatar URL:", avatarUrl); // Log uploaded avatar URL
                    setAvatarUrl(avatarUrl);
                }
            } else {
                console.error('Invalid image picker response');
                Alert.alert('Invalid image picker response');
            }
        });
    };

    const uploadAvatar = async (base64String) => {
        try {
            const user = await supabase.auth.getUser();
            const filePath = `${user.data.user.id}/${uuidv4()}.jpg`;
            const { data, error } = await supabase.storage
                .from('avatars')
                .upload(filePath, decode(base64String), {
                    cacheControl: '3600',
                    upsert: true,
                    contentType: 'image/jpeg'
                });
    
            if (error) {
                console.error('Error uploading image:', error.message);
                Alert.alert('Error uploading image:', error.message);
                return null;
            }
    
            const { data: publicUrlData, error: urlError } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);
    
            if (urlError) {
                console.error('Error getting public URL:', urlError.message);
                Alert.alert('Error getting public URL:', urlError.message);
                return null;
            }
    
            return publicUrlData.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error.message);
            Alert.alert('Error uploading image:', error.message);
            return null;
        }
    };
    

    const updateProfile = async () => {
        try {
            const user = await supabase.auth.getUser();
            const updates = {
                id: user.data.user.id,
                username,
                avatar_url: avatarUrl, // Make sure this value is updated correctly
                updated_at: new Date(),
            };

            console.log('Profile updates:', updates); // Log profile updates before upserting

            const { error } = await supabase
                .from('profiles')
                .upsert(updates, { returning: "minimal" });

            if (error) {
                console.error('Error updating profile:', error);
                Alert.alert('Error updating profile:', error.message);
            } else {
                Alert.alert('Profile updated successfully!');
                navigation.navigate('Profile'); // Redirect to Profile page
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error updating profile:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
                {avatarUrl ? (
                    <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                ) : (
                    <View style={styles.placeholderAvatar} />
                )}
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TouchableOpacity style={styles.button} onPress={updateProfile}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9F5EC',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    placeholderAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'grey',
    },
    input: {
        width: '100%',
        padding: 15,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#8FB6F1',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default EditProfile;
