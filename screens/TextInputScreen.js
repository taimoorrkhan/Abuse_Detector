import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TextInputScreen = () => {
  const [text, setText] = useState("");

  const checkForAbusiveContent = () => {
    // Dummy function to simulate text checking
    const isAbusive = text.toLowerCase().includes('abusive'); // Simplistic check
    Alert.alert(
      isAbusive ? "Abusive Content Detected" : "Content is Clean",
      isAbusive ? "Please refrain from using abusive language." : "No abusive content found."
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="What's on your mind?"
          placeholderTextColor="#90949C"
          style={styles.textInput}
          multiline
        />
      </View>
      <TouchableOpacity onPress={checkForAbusiveContent} style={styles.checkButton}>
        <Ionicons name="checkmark-circle" size={24} color="white" />
        <Text style={styles.checkButtonText}>Check</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    paddingTop: 15,
    paddingBottom: 100, // Ample space for multiple lines of text
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  textInput: {
    fontSize: 18,
    color: '#1C1E21',
    lineHeight: 24,
  },
  checkButton: {
    flexDirection: 'row',
    backgroundColor: '#4267B2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  checkButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default TextInputScreen;
