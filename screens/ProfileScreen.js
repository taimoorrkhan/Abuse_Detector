import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const ProfileScreen = ({ navigation }) => {

  const renderHeader = () => {
    return (
      <>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={handleSelectImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profilePic} />
            ) : (
              <Icon name="account-circle" size={100} color="gray" />
            )}
          </TouchableOpacity>
          <Text style={styles.userName}>{user.displayName}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')} style={styles.whatOnMind}>
          <Text style={styles.whatOnMindText}>What's on your mind?</Text>
        </TouchableOpacity>
      </>
    );
  };
  const user = { displayName: "Taimoor Khan", uid: "12345" };

  const [profileImage, setProfileImage] = useState(null);
  const [userPosts, setUserPosts] = useState([

    { id: '1', text: 'یہ پہلی پوسٹ ہے', likes: 10, comments: 5 },
    { id: '2', text: 'یہدوسریدوسریدوسریدوسری دوسری پوسٹ ہے', likes: 7, comments: 3 },
    { id: '3', text: 'یہ پہلی پوسٹ ہے', likes: 10, comments: 5 },
    { id: '4', text: 'یہدوسریدوسریدوسریدوسری دوسری پوسٹ ہے', likes: 7, comments: 3 },
    { id: '5', text: 'یہ پہلی پوسٹ ہے', likes: 10, comments: 5 },
    { id: '23', text: 'یہدوسریدوسریدوسریدوسری دوسری پوسٹ ہے', likes: 7, comments: 3 },
    { id: '14', text: 'یہ پہلی پوسٹ ہے', likes: 10, comments: 5 },
    { id: '22', text: 'یہدوسریدوسریدوسریدوسری دوسری پوسٹ ہے', likes: 7, comments: 3 },
    { id: '15', text: 'یہ پہلی پوسٹ ہے', likes: 10, comments: 5 },
    { id: '21', text: 'یہدوسریدوسریدوسریدوسری دوسری پوسٹ ہے', likes: 7, comments: 3 },   
  ]);
  const [likedPosts, setLikedPosts] = useState({});

  const toggleLike = (postId) => {
    setLikedPosts(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const renderPost = ({ item }) => {
    const isLiked = likedPosts[item.id];

    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
        </View>
        <Text style={styles.postText}>{item.text}</Text>
        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => toggleLike(item.id)}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? "red" : "black"}
            />
            <Text style={styles.actionText}>{item.likes} Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
            <Text style={styles.actionText}>{item.comments} Comments</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      
      <FlatList
        data={userPosts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  whatOnMind: {
    backgroundColor: '#FFF',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DADDE1',
  },
  whatOnMindText: {
    color: '#65676B',
    fontSize: 18,
  },
  postContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DADDE1',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  postText: {
    fontSize: 16,
    color: '#1C1E21',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 8,
    color: '#65676B',
    fontSize: 16,
  },
});

export default ProfileScreen;
