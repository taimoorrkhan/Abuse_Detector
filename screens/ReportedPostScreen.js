// ReportedPostScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ReportedPostScreen = () => {

  const [reportedPosts, setReportedPosts] = useState([
    { id: '1', title: 'یہ ایک طویل عنوان ہے جو معمول کی سائز سے آگے جاتا ہے', content: 'یہ مکمل پوسٹ کا مواد ہے جو کافی لمبا ہے اور کسی وجہ سے رپورٹ کیا گیا ہے', reportedBy: 'صارف1', dateReported: '2023-01-01' },
    { id: '2', title: 'یہ ایک طویل عنوان ہے جو معمول کی سائز سے آگے جاتا ہے', content: 'یہ مکمل پوسٹ کا مواد ہے جو کافی لمبا ہے اور کسی وجہ سے رپورٹ کیا گیا ہے', reportedBy: 'صارف1', dateReported: '2023-01-01' },
    { id: '3', title: 'یہ ایک طویل عنوان ہے جو معمول کی سائز سے آگے جاتا ہے', content: 'یہ مکمل پوسٹ کا مواد ہے جو کافی لمبا ہے اور کسی وجہ سے رپورٹ کیا گیا ہے', reportedBy: 'صارف1', dateReported: '2023-01-01' },
    { id: '4', title: 'یہ ایک طویل عنوان ہے جو معمول کی سائز سے آگے جاتا ہے', content: 'یہ مکمل پوسٹ کا مواد ہے جو کافی لمبا ہے اور کسی وجہ سے رپورٹ کیا گیا ہے', reportedBy: 'صارف1', dateReported: '2023-01-01' },
    { id: '5', title: 'یہ ایک طویل عنوان ہے جو معمول کی سائز سے آگے جاتا ہے', content: 'یہ مکمل پوسٹ کا مواد ہے جو کافی لمبا ہے اور کسی وجہ سے رپورٹ کیا گیا ہے', reportedBy: 'صارف1', dateReported: '2023-01-01' },
    { id: '6', title: 'یہ ایک طویل عنوان ہے جو معمول کی سائز سے آگے جاتا ہے', content: 'یہ مکمل پوسٹ کا مواد ہے جو کافی لمبا ہے اور کسی وجہ سے رپورٹ کیا گیا ہے', reportedBy: 'صارف1', dateReported: '2023-01-01' },
    { id: '7', title: 'یہ ایک طویل عنوان ہے جو معمول کی سائز سے آگے جاتا ہے', content: 'یہ مکمل پوسٹ کا مواد ہے جو کافی لمبا ہے اور کسی وجہ سے رپورٹ کیا گیا ہے', reportedBy: 'صارف1', dateReported: '2023-01-01' },
    { id: '8', title: 'یہ ایک طویل عنوان ہے جو معمول کی سائز سے آگے جاتا ہے', content: 'یہ مکمل پوسٹ کا مواد ہے جو کافی لمبا ہے اور کسی وجہ سے رپورٹ کیا گیا ہے', reportedBy: 'صارف1', dateReported: '2023-01-01' },
    { id: '9', title: 'یہ ایک طویل عنوان ہے جو معمول کی سائز سے آگے جاتا ہے', content: 'یہ مکمل پوسٹ کا مواد ہے جو کافی لمبا ہے اور کسی وجہ سے رپورٹ کیا گیا ہے', reportedBy: 'صارف1', dateReported: '2023-01-01' },
    { id: '10', title: 'یہ ایک طویل عنوان ہے جو معمول کی سائز سے آگے جاتا ہے', content: 'یہ مکمل پوسٹ کا مواد ہے جو کافی لمبا ہے اور کسی وجہ سے رپورٹ کیا گیا ہے', reportedBy: 'صارف1', dateReported: '2023-01-01' },
    { id: '11', title: 'یہ ایک طویل عنوان ہے جو معمول کی سائز سے آگے جاتا ہے', content: 'یہ مکمل پوسٹ کا مواد ہے جو کافی لمبا ہے اور کسی وجہ سے رپورٹ کیا گیا ہے', reportedBy: 'صارف1', dateReported: '2023-01-01' },
    { id: '12', title: 'یہ ایک طویل عنوان ہے جو معمول کی سائز سے آگے جاتا ہے', content: 'یہ مکمل پوسٹ کا مواد ہے جو کافی لمبا ہے اور کسی وجہ سے رپورٹ کیا گیا ہے', reportedBy: 'صارف1', dateReported: '2023-01-01' },

    // Add more posts as needed
  ]);
  const [expandedPostId, setExpandedPostId] = useState(null);

  const togglePostExpansion = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const handleDelete = (postId) => {
    // Handle the delete action
    setReportedPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
  };

  const handleResolve = (postId) => {
    // Handle the resolve action
    // For demo, simply remove from the list
    setReportedPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
  };

  const renderPost = ({ item }) => {
    const isExpanded = item.id === expandedPostId;

    return (
      <Swipeable
        renderLeftActions={() => (
          <TouchableOpacity
            style={[styles.swipeButton, styles.resolveButton]}
            onPress={() => handleResolve(item.id)}>
            <Ionicons name="checkmark-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        )}
        renderRightActions={() => (
          <TouchableOpacity
            style={[styles.swipeButton, styles.deleteButton]}
            onPress={() => handleDelete(item.id)}>
            <Ionicons name="trash-outline" size={24} color="white" />
          </TouchableOpacity>
        )}
      >
        <TouchableOpacity
          style={styles.postContainer}
          onPress={() => togglePostExpansion(item.id)}
        >
          <Text style={styles.postTitle}>{isExpanded ? item.title : `${item.title.substring(0, 100)}...`}</Text>
          {isExpanded && (
            <View style={styles.expandedContent}>
              <Text style={styles.postContent}>{item.content}</Text>
              <Text style={styles.reportDetails}>رپورٹ کردہ بذریعہ: {item.reportedBy} پر {item.dateReported}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={reportedPosts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  // Container for the whole screen
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  // Style for each post container
  postContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DADDE1',
  },
  // Style for the title of each post
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1E21',
  },
  // Style for the expanded content of each post
  expandedContent: {
    marginTop: 10,
  },
  // Style for the content of each post
  postContent: {
    fontSize: 14,
    color: '#4B4F56',
  },
  // Style for the report details
  reportDetails: {
    fontSize: 12,
    color: '#90949C',
  },
  // Styles for the swipeable action buttons
  swipeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
  },
  resolveButton: {
    backgroundColor: '#36A420', // A green color for resolve
  },
  deleteButton: {
    backgroundColor: '#E02424', // A red color for delete
  },
});

export default ReportedPostScreen;
