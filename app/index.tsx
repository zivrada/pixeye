import React, { useState } from "react";
import { Text, View, Image, TextInput, StyleSheet, Button, Platform } from "react-native";
import OpenAI from "openai";

export default function Index() {
  const [inputText, setInputText] = useState("");
  const openaithing = new OpenAI();
  var urlr = " ";

  const openai = new OpenAI();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>PixEye</Text>
      <Image
        source={{ uri: urlr }}
        style={styles.image}
      />

      <TextInput
        style={styles.input}

        placeholder="Type something..."
        onChangeText={text => setInputText(text)}
        value={inputText}
      />
      <Button title="Submit" onPress={onPress} />
    </View>
  );

  async function onPress() {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: inputText,
      n: 1,
      size: "1024x1024",
    });
    urlr = response.data[0].url;    
  }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  containerRow: {
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  image: {
    width: 256,
    height: 256,
    marginBottom: 50,
    marginTop: 50,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    textAlign: "center",

    ... Platform.select({
      web: {
        width: "50%",
      },
      ios: {
        width: "100%",
      },
      android: {
        width: "100%",
      },

    }),
  },
  output: {
    fontSize: 18,
  },
});
function OnPress() {
  throw new Error("Function not implemented.");
}

