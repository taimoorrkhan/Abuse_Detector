import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import useFirebase from '../hook/useFirebase';

const ProfileScreen = ({ navigation }) => {
  const { user, fetchUserProfile, getCurrentUserPosts, toggleLikeOnPost } = useFirebase();
  const [userdata, setUserData] = useState({ name: "", imageUri: "" });
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const loadUserProfileAndPosts = async () => {
      if (user && user.uid) {
        try {
          const userProfile = await fetchUserProfile(user.uid);
          if (userProfile) {
            setUserData({ name: userProfile.name, imageUri: userProfile.profileImageUrl });
          }
          const posts = await getCurrentUserPosts();
          setUserPosts(posts);
        } catch (error) {
          console.error(error);
        }
      }
    };
    loadUserProfileAndPosts();
  }, [user]);

  const handleToggleLike = async (postId) => {
    await toggleLikeOnPost(postId);
    setUserPosts(currentPosts => currentPosts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(user.uid);
        return {
          ...post,
          likes: isLiked ? post.likes.filter(id => id !== user.uid) : [...post.likes, user.uid]
        };
      }
      return post;
    }));
  };

  const renderPost = ({ item }) => {
    const isLiked = item.likes.includes(user.uid);

    return (
      <View style={styles.postContainer}>
        <Text style={styles.postText}>{item.text}</Text>
        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleToggleLike(item.id)}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? "red" : "black"}
            />
            <Text style={styles.actionText}>{item.likes.length} Likes</Text>
          </TouchableOpacity>
          {/* Implement Comments button similarly if needed */}
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.profileHeader}>
      {userdata.imageUri ? (
        <Image source={{ uri: userdata.imageUri }} style={styles.profilePic} />
      ) : (
        <MaterialCommunityIcons name="account-circle" size={100} color="gray" />
      )}
      <Text style={styles.userName}>{userdata.name}</Text>
    </View>
  );

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
  postContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DADDE1',
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
