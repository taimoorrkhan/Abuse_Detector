// CreatePost.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CreatePostScreen = ({ navigation }) => {
  const [postText, setPostText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={24} color="#4267B2" />
          <Text style={styles.headerText}>Create post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Handle post submission */ }} style={styles.postButton}>
          <Text style={styles.postButtonText}>POST</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/logo.png')} // Replace with your profile picture
          style={styles.profilePic}
        />
        <Text style={styles.profileName}>Logged In User Name </Text>
      </View>
      <TextInput
        value={postText}
        onChangeText={setPostText}
        placeholder="What's on your mind?"
        style={styles.postInput}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DADDE1',
    backgroundColor: '#FFF',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#4267B2',
    fontSize: 18,
    marginLeft: 10,
  },
  postButton: {
    backgroundColor: '#4267B2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  postButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    color: '#1C1E21',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postInput: {
    fontSize: 18,
    color: '#1C1E21',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 100, // Give ample space for typing long texts
  },
});

export default CreatePostScreen;
