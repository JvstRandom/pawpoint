import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import PropTypes from 'prop-types';
import { Input, Button } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationProp } from '@react-navigation/native';

type ProfileProps = {
  session : Session,
  navigation: NavigationProp<any>
}

export default function Profile({ session, navigation }: ProfileProps) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
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

  async function updateProfile({ username, website, avatarUrl }: { username: string; website: string; avatarUrl: string }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');
  
      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url: avatarUrl, // Corrected variable name
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
  
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      {/* Sticky Navbar */}
      <View style={[styles.navbar, styles.shadowProp, styles.borderProp]}>
        <TouchableOpacity style={[styles.iconNavt4, styles.borderProp, { backgroundColor: '#F9F5EC' }]} onPress={() => navigation.navigate('Daycare')}>
          <Image style={styles.iconNav} source={require('./icon/pump-medical-solid.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconNavt4]} onPress={() => navigation.navigate('Home')}>
          <Image style={styles.iconNav} source={require('./icon/house-solid.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconNavt4} onPress={() => navigation.navigate('Konsul')}>
          <Image style={styles.iconNav} source={require('./icon/clipboard-regular.png')} />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 80, alignItems: 'center' }}>
        <Image source={require('../asset/dogdipantai.jpeg')} style={{ width: screenWidth / 3, height: screenWidth / 3, borderRadius: 100 }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>DogLovers</Text>
        <View style={[styles.kotakPengisiKonten, styles.borderProp, { paddingHorizontal: 16 }]}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Upload Foto</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={{ marginHorizontal: 22 }} showsVerticalScrollIndicator={false}>
        {/* POST */}
        <View style={styles.t4fitur}>
          <View style={[styles.post, styles.borderProp, { borderWidth: 1, borderRadius: 0 }]}>
            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>21 Juni 2024 / 10:30</Text>
            <Image source={require('../asset/dogdipantai.jpeg')} style={{ width: (screenWidth - 85) / 2, height: 200 }} />
          </View>
          <View style={[styles.post, styles.borderProp, { borderWidth: 1, borderRadius: 0 }]}>
            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>21 Juni 2024 / 10:30</Text>
            <Image source={require('../asset/dogdipantai.jpeg')} style={{ width: (screenWidth - 85) / 2, height: 200 }} />
          </View>
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
});