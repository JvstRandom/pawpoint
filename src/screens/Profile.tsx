import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import PropTypes from 'prop-types';
import { Input, Button } from '@rneui/themed';
import { useFocusEffect, NavigationProp } from '@react-navigation/native';

type ProfileProps = {
  session: Session,
  navigation: NavigationProp<any>
}

type Post = {
  id: number;
  user_id: string;
  photo_url: string;
  caption?: string;
  location_id?: number;
  created_at: string;
};

export default function Profile({ session, navigation }: ProfileProps) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (session) {
      getProfile();
      getUserPosts();
    }
  }, [session]);

  useFocusEffect(
    useCallback(() => {
      if (session) {
        getProfile();
      }
    }, [session])
  );

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function getUserPosts() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', session?.user.id);

      if (error) {
        throw error;
      }

      setPosts(data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatarUrl }: { username: string; website: string; avatarUrl: string }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      Alert.alert('Logged out successfully');
      navigation.navigate('Login'); // Navigate to login screen after logout
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      {/* Sticky Navbar */}
      <View style={[styles.navbar, styles.shadowProp, styles.borderProp]}>
        <TouchableOpacity style={[styles.iconNavt4, styles.borderProp, { backgroundColor: '#F9F5EC' }]} onPress={() => navigation.navigate('Daycare')}>
          <Image style={styles.iconNav} source={require('./icon/user-solid.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconNavt4]} onPress={() => navigation.navigate('Home')}>
          <Image style={styles.iconNav} source={require('./icon/house-solid.png')} />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 80, alignItems: 'center' }}>
      <Image
          source={avatarUrl ? { uri: avatarUrl } : require('../asset/profileDefault1.jpg')}
          style={[
              styles.avatar,
              !avatarUrl && { backgroundColor: '#E4E4E7', alignItems: 'center', justifyContent: 'center' }
          ]}
      />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>{username}</Text>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12}}>
          <TouchableOpacity style={[styles.kotakPengisiKonten, styles.borderProp, { paddingHorizontal: 16 }]} onPress={() => navigation.navigate('Upload', { userId: session.user.id })}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Upload Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.kotakPengisiKonten, styles.borderProp, { paddingHorizontal: 16, backgroundColor: "#F47356" }]} onPress={() => navigation.navigate('EditProfile', { userId: session.user.id })}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Edit Profile</Text>
          </TouchableOpacity>
          
        </View>
        <TouchableOpacity style={[styles.kotakPengisiKonten, styles.borderProp, { paddingHorizontal: 16, backgroundColor: "#D9534F", marginTop: 15}]} onPress={handleLogout}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFF' }}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={{ marginHorizontal: 22 }} showsVerticalScrollIndicator={false}>
        <View style={styles.t4fitur}>
          {posts.map((post) => (
            <View key={post.id} style={[styles.post, styles.borderProp, { borderWidth: 1}]}>
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{new Date(post.created_at).toLocaleString()}</Text>
              <Image source={{ uri: post.photo_url }} style={{ width: (screenWidth - 85) / 2, height: 200 }} />
              <Text>"{post.caption}"</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5EC',
    alignItems: 'center'
  },
  post: {
    marginTop: 20,
    paddingHorizontal: 8,
    paddingVertical: 10,
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
    justifyContent: 'center'
  },
  boxPenyakit: {
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  kotakPengisiKonten: {
    backgroundColor: '#F1C654',
    borderRadius: 18,
    paddingVertical: 4,
    paddingHorizontal: 10
  },
  judulPenyakit: {
    backgroundColor: '#F9F5EC',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 6,
    width: 200
  },
  panah: {
    borderColor: 'black',
    zIndex: 2,
    width: 100,
    height: 150,
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  panahicon: {
    width: 40,
    height: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20
},
});
