import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AniPix = () => {
  const [character, setCharacter] = useState('');
  const [action, setAction] = useState('');
  const [style, setStyle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setImageUrl('https://via.placeholder.com/300');
      setLoading(false);
    }, 2000);
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Text style={styles.title}>AniPix</Text>
      
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Your animation will appear here</Text>
          </View>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Character description"
          placeholderTextColor="#a0a0a0"
          value={character}
          onChangeText={setCharacter}
        />
        <TextInput
          style={styles.input}
          placeholder="Action or animation"
          placeholderTextColor="#a0a0a0"
          value={action}
          onChangeText={setAction}
        />
        <TextInput
          style={styles.input}
          placeholder="Art style"
          placeholderTextColor="#a0a0a0"
          value={style}
          onChangeText={setStyle}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Generate Animation</Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
    fontFamily: 'Arial',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#ffffff',
    textAlign: 'center',
    padding: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    color: '#ffffff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AniPix;