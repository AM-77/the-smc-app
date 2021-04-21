import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import { theme } from '../core/theme';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';

export default function PpicPicker({ setPpic, ppic }) {
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setPpic(result.base64);
      setImage(result.uri);
    }
  };

  const removeImage = () => {
    setPpic(null);
    setImage(null);
  };

  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.imgWrap}>
          <Image
            source={
              ppic ? { uri: `data:image/jpeg;base64,${ppic}` } : { uri: image }
            }
            style={styles.img}
          />
        </View>
      ) : (
        <Image
          source={
            ppic
              ? { uri: `data:image/jpeg;base64,${ppic}` }
              : require('../assets/no-ppic.png')
          }
          style={styles.img}
        />
      )}
      <Button style={styles.btn} onPress={pickImage}>
        {ppic
          ? 'Edit the profile picture'
          : image
          ? 'Change the profile picture'
          : 'Set a profile picture'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  imgWrap: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.bgTransparent,
    overflow: 'hidden',
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  btn: {
    padding: 15,
  },
});
