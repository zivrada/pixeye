import React, { useState } from "react";
import { Text, View, Image, TextInput, StyleSheet, Button, Platform, Pressable, KeyboardAvoidingView, ScrollView } from "react-native";
import OpenAI from "openai";

export default function Index() {
  const [inputText, setInputText] = useState("");
  const [inputText2, setInputText2] = useState("");
  const [inputText3, setInputText3] = useState("");
  const [safeUrlr, setSafeUrlr] = useState("https://oaidalleapiprodscus.blob.core.windows.net/private/org-JymSjHC0q9ksMLuKFQaHrytG/user-0FdHfSSsGmIc7qPTrEd4pOIt/img-eayyspdfBxTSwcPM8NPFjSSJ.png?st=2024-08-04T06%3A42%3A00Z&se=2024-08-04T08%3A42%3A00Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-08-04T00%3A28%3A59Z&ske=2024-08-05T00%3A28%3A59Z&sks=b&skv=2023-11-03&sig=jNqeacmgXXMRPBfjlTLuH5pGb%2BpNFJNvL0mNORrvwdc%3D");

  const openai = new OpenAI({ apiKey: "sk-proj-iViW2Xd0tqtZV5PwWfGxT3BlbkFJ3Uy2pj3eueKQjROHYZmU", dangerouslyAllowBrowser: true});

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust this value as needed
      >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>

          <Text style={styles.title}>PixEye</Text>
          <Image
            source={{ uri: safeUrlr }}
            style={styles.image}
          />
          
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Character description"
              onChangeText={text => setInputText(text)}
              value={inputText}
            />
            <TextInput
              style={styles.input}
              placeholder="What animation"
              onChangeText={text => setInputText2(text)}
              value={inputText2}
            />
            <TextInput
              style={styles.input}
              placeholder="Number of frames"
              onChangeText={text => setInputText3(text)}
              value={inputText3}
            />
          </View>
          <Pressable onPress={onPress}>
            <Text>Submit</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  async function onPress() {
    console.log("Button pressed");
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "Draw a pure spritesheet without background, pixel style art, " + inputText + " , " + inputText2 + " , the spritesheet needs to have " + inputText3 + " frames of animation, which means drawing the character that amount of times",
      n: 1,
      size: "1024x1024",
    });
    var urlr = response.data[0]?.url || "";
    setSafeUrlr(urlr);
      
  }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
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
    width: "80%",
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

