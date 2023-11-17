import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Modal, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/Header';
const HomeScreen = ({ navigation }) => {
  const [likedPosts, setLikedPosts] = useState({});
  const [expandedPosts, setExpandedPosts] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Dummy data for posts
  const posts = [
    { id: '1', text: 'یہ پہلی پوسٹ ہے', likes: 10, comments: 5 },
    { id: '2', text: 'یہدوسریدوسریدوسریدوسری دوسری پوسٹ ہے', likes: 7, comments: 3 },
    // ... more posts
  ];

  const toggleLike = (postId) => {
    setLikedPosts(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  const toggleText = (postId) => {
    setExpandedPosts(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  const openModal = (postId) => {
    setSelectedPost(postId);
    setModalVisible(true);
  };
  const renderHeader = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('CreatePost')} style={styles.whatOnMind}>
        <Text style={styles.whatOnMindText}>What's on your mind?</Text>
      </TouchableOpacity>
    );
  };

  const renderPost = ({ item }) => {
    const isLiked = likedPosts[item.id];
    const isExpanded = expandedPosts[item.id];
    const shouldShowMore = item.text.split(' ').length > 25;
    const textToShow = isExpanded ? item.text : `${item.text.split(' ').slice(0, 25).join(' ')}...`;

    return (
      <View style={styles.postContainer}>
        <TouchableOpacity style={styles.postOptions} onPress={() => openModal(item.id)}>
          <MaterialCommunityIcons name="dots-vertical" size={20} color="#65676b" />
        </TouchableOpacity>
        <Text style={styles.postText}>
          {textToShow}
        </Text>
        {shouldShowMore && (
          <Text style={styles.showMoreText} onPress={() => toggleText(item.id)}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </Text>
        )}
        <View style={styles.divider} />
        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => toggleLike(item.id)}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? "red" : "black"}
            />
            <Text style={[styles.actionText, isLiked && styles.likedText]}>{item.likes} Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#65676b" />
            <Text style={styles.actionText}>{item.comments} Comments</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header onMessagesPress={() => navigation.navigate('Messages')} />
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Report</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  scrollView: {
    flex: 1,
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
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DADDE1',
    flexDirection: 'column',
  },
  postOptions: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  postText: {
    fontSize: 16,
    color: '#1C1E21',
    lineHeight: 24,
  },
  showMoreText: {
    color: '#4B4F56',
    marginTop: 5,
  },
  divider: {
    borderBottomColor: '#DADDE1',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  likedText: {
    color: '#2078F4',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: '#E7F3FF',
  },
  textStyle: {
    color: '#2E89FF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
