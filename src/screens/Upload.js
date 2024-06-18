import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { supabase } from "../../lib/supabase";
import { Picker } from '@react-native-picker/picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'base64-arraybuffer';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            base64Image: null,
            location: '',
            customLocation: '',
            tags: '',
            caption: '',
            locations: [],
            selectedLocation: '',
        };
    }

    componentDidMount() {
        this.fetchLocations();
        const { userId, otherParameter } = this.props.route.params;
        console.log('User ID:', userId);
        console.log('Other Parameter:', otherParameter);
    }

    fetchLocations = async () => {
        const { data, error } = await supabase.from('locations').select('*');
        if (error) {
            console.error(error);
        } else {
            this.setState({ locations: data });
        }
    };

    pickImage = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 0.7,
            includeBase64: true, // Ensure this is correctly set
        };
    
        launchImageLibrary(options, async (response) => {
            console.log('Image Picker Response: ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0 && response.assets[0].base64) {
                const base64Image = response.assets[0].base64;
                console.log("Picked image base64 length:", base64Image.length);
                this.setState({ image: response.assets[0].uri, base64Image });
            } else {
                console.error('Invalid image picker response');
                Alert.alert('Invalid image picker response');
            }
        });
    };    
    

    uploadImage = async (base64Image) => {
        try {
            const user = await supabase.auth.getUser();
            const filePath = `${user.data.user.id}/${uuidv4()}.jpg`;
            const arrayBuffer = decode(base64Image);
            console.log("Picked image base64 lengthhh:", base64Image.length);

            const { data, error } = await supabase.storage
                .from('uploadfoto')
                .upload(filePath, arrayBuffer, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: 'image/jpeg'
                });

            if (error) {
                console.error(error);
                return null;
            }

            const { data: publicURLData, error: urlError } = supabase.storage
                .from('uploadfoto')
                .getPublicUrl(filePath);

            if (urlError) {
                console.error(urlError);
                return null;
            }

            return publicURLData.publicUrl;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    handleUpload = async () => {
        const { image, base64Image, selectedLocation, customLocation, tags, caption } = this.state;
        const { userId } = this.props.route.params;
    
        if (!image) {
            alert('Please select an image to upload.');
            return;
        }
    
        const imageUrl = await this.uploadImage(base64Image);
        if (!imageUrl) {
            alert('Failed to upload image.');
            return;
        }
    
        let locationId;
    
        // Check if the location is a custom location
        if (selectedLocation === 'custom') {
            // Insert new location if it's a custom location
            const { data: locationData, error: locationError } = await supabase
                .from('locations')
                .insert([{ name: customLocation }])
                .select();
    
            if (locationError) {
                console.error(locationError);
                alert('Failed to add new location.');
                return;
            }
    
            locationId = locationData[0].id;
        } else {
            // Get the id of the selected location
            const { data: locationData, error: locationError } = await supabase
                .from('locations')
                .select('id')
                .eq('name', selectedLocation)
                .single();
    
            if (locationError) {
                console.error(locationError);
                alert('Failed to retrieve selected location.');
                return;
            }
    
            locationId = locationData.id;
        }
    
        // Insert the post with the location id
        const { data, error } = await supabase
            .from('posts')
            .insert([
                {
                    photo_url: imageUrl,
                    location_id: locationId,
                    type_tag: tags,
                    caption: caption,
                    user_id: userId
                }
            ])
            .select();
    
        if (error) {
            console.error(error);
            alert('Failed to upload post.');
        } else {
            alert('Post uploaded successfully!');
            this.setState({ image: null, base64Image: null, selectedLocation: '', customLocation: '', tags: '', caption: '' });
            this.props.navigation.navigate('Home');
        }
    };
    

    render() {
        const { image, selectedLocation, customLocation, tags, caption, locations } = this.state;

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
                <View>
                    <TouchableOpacity style={[styles.form1, {display: 'flex', alignItems: 'center', justifyContent: 'center'}]} onPress={this.pickImage}>
                        
                        {image ? (
                            <Image source={{ uri: image }} style={styles.image} />
                        ) : (
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{textAlign: "center"}}>Upload Foto Anda</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <View style={styles.dropdown}>
                        <Picker
                            selectedValue={selectedLocation}
                            onValueChange={(itemValue) => this.setState({ selectedLocation: itemValue })}
                            mode="dropdown"
                        >
                            <Picker.Item label="Select Location" value="" />
                            {locations.map((location) => (
                                <Picker.Item key={location.id} label={location.name} value={location.name} />
                            ))}
                            <Picker.Item label="Add new location" value="custom" />
                        </Picker>
                    </View>

                    {selectedLocation === 'custom' && (
                        <TextInput
                            style={styles.form2}
                            placeholder="Enter custom location"
                            value={customLocation}
                            onChangeText={(text) => this.setState({ customLocation: text })}
                        />
                    )}
                    <TextInput
                        style={styles.form2}
                        placeholder="Tags"
                        value={tags}
                        onChangeText={(text) => this.setState({ tags: text })}
                    />
                    <TextInput
                        style={styles.form3}
                        placeholder="Caption"
                        multiline={true}
                        numberOfLines={4}
                        textAlignVertical="top"
                        value={caption}
                        onChangeText={(text) => this.setState({ caption: text })}
                    />

                    <TouchableOpacity style={styles.Button} onPress={this.handleUpload}>
                        <Text style={styles.ButtonText}>Upload photo now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: "#F9F5EC", 
        padding: 20,
        alignItems: 'center',
        paddingTop: 60,
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
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    image: {
        width: '100%',
        height: 140,
        borderRadius: 15,
    },
    kotakPengisiKonten: {
        backgroundColor: '#F1C654',
        borderRadius: 18,
        paddingVertical: 4,
        paddingHorizontal: 10
    },
    form1: { 
        borderWidth: 2,
        borderColor: "black",
        color: 'black',
        paddingHorizontal: 10,
        marginHorizontal: 6,
        borderRadius: 20,
        height: 150,
        marginTop: 50,
    },
    form2: { 
        borderWidth: 2,
        borderColor: "black",
        color: 'black',
        paddingHorizontal: 10,
        marginHorizontal: 6,
        borderRadius: 20,
        height: 55,
        marginTop: 20,
    },
    form3: {
        borderWidth: 2,
        borderColor: "black",
        color: 'black',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        marginTop: 20,
        height: 150,
    },
    Button: {
        backgroundColor: '#8FB6F1',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginHorizontal: 60,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 2,
    },
    ButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    dropdown: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 20,
        marginHorizontal: 6,
        marginTop: 20,
        height: 55,
        justifyContent: 'center',
    },
});

export default Upload;
