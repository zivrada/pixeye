import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import OpenAI from 'openai';

const AniPix = () => {
  const [character, setCharacter] = useState('');
  const [action, setAction] = useState('');
  const [style, setStyle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const openai = new OpenAI({ apiKey: "i'll enter an .env file momentarily", dangerouslyAllowBrowser: true});

  const handleSubmit = async () => {
    setLoading(true);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "Draw a pure spritesheet without background, pixel style art, " + character + " , " + action + " , the spritesheet needs to have " + style + " frames of animation, which means drawing the character that amount of times",
      n: 1,
      size: "1024x1024",
    });
    var urlr = response.data[0]?.url || "";
    setImageUrl(urlr);

    setLoading(false);
  };

  return (
    <LinearGradient
      colors={['#b3ccff', '#4d88ff', '#192f6a']}
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
    backgroundColor: '#99ccff',
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