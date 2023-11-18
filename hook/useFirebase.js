import { useState, useEffect } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
export default function useFirebase() {
  const [isConnected, setIsConnected] = useState(false)
  const [user, setUser] = useState(null)


  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        firebase.initializeApp({
          apiKey: "AIzaSyCYW5J0c-eIwtTWFLoAPfRw7uQY6Rap5kY",
          authDomain: "abuse-7447.firebaseapp.com",
          projectId: "abuse-7447",
          storageBucket: "abuse-7447.appspot.com",
          messagingSenderId: "704182685782",
          appId: "1:704182685782:web:9a5cc01d8f3a0967ca2bf7",
          measurementId: "G-66Y8MYNVYM"
        })
        setIsConnected(true)
      } catch (error) {
        console.log(error)
      }
    }
    initializeFirebase()

    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
    })

  }, [])
  const uploadImageAndGetUrl = async (imageUri, uid) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', imageUri, true);
        xhr.send(null);
      });

      const ref = firebase.storage().ref().child(`profileImages/${uid}`);
      const snapshot = await ref.put(blob);
      blob.close();

      const imageUrl = await snapshot.ref.getDownloadURL();
      return imageUrl;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const reauthenticateWithCredential = async (email, oldPassword) => {
    const credential = firebase.auth.EmailAuthProvider.credential(email, oldPassword);
    await user.reauthenticateWithCredential(credential);
  };

  const updatePassword = async (newPassword) => {
    await user.updatePassword(newPassword);
  };

  const updateUserProfile = async (uid, name, email, imageUrl) => {
    try {
      await firebase.auth().currentUser.updateProfile({ displayName: name, photoURL: imageUrl });
      await firebase.auth().currentUser.updateEmail(email);
      await firebase.firestore().collection('users').doc(uid).update({
        name: name,
        email: email,
        profileImageUrl: imageUrl,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  const fetchUserProfile = async (uid) => {
    try {
      const doc = await firebase.firestore().collection('users').doc(uid).get();
      if (doc.exists) {
        return doc.data();
      } else {
        throw new Error('No user profile found');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      setUser(result.user);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


  const createUserWithEmailAndPassword = async (name, email, password) => {
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await result.user.updateProfile({ displayName: name });
      setUser(result.user);

      await firebase.firestore().collection('users').doc(result.user.uid).set({
        name: name,
        email: email,
        uid: result.user.uid,
        userRole: 'admin'
      });

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };



  const signOut = async () => {
    try {
      await firebase.auth().signOut()
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }


  const createPost = async (postData) => {
    try {
      await firebase.firestore().collection('posts').add({
        ...postData,
        authorId: user.uid, 
        createdAt: firebase.firestore.FieldValue.serverTimestamp(), 
        likes: [], 
        comments: [], 
      });
    } catch (error) {
      console.error("Error creating post: ", error);
      throw error;
    }
  };
  const getCurrentUserPosts = async () => {
    try {
      const querySnapshot = await firebase.firestore().collection('posts')
        .where('authorId', '==', user.uid) // Filter posts by the current user
        .orderBy('createdAt', 'desc') // Order by creation time, newest first
        .get();

      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching user's posts: ", error);
      throw error;
    }
  };

  const getAllPosts = async () => {
    try {
      const querySnapshot = await firebase.firestore().collection('posts')
        .orderBy('createdAt', 'desc') // Order by creation time, newest first
        .get();

      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching all posts: ", error);
      throw error;
    }
  };
  const toggleLikeOnPost = async (postId) => {
    try {
      const postRef = firebase.firestore().collection('posts').doc(postId);
      const postDoc = await postRef.get();

      if (!postDoc.exists) {
        throw new Error("Post not found");
      }

      const post = postDoc.data();
      const likesArray = post.likes || [];
      const userId = user.uid;

      if (likesArray.includes(userId)) {
        await postRef.update({
          likes: likesArray.filter(id => id !== userId)
        });
      } else {
        await postRef.update({
          likes: [...likesArray, userId]
        });
      }
    } catch (error) {
      console.error("Error toggling like on post: ", error);
      throw error;
    }
  };
  const reportPost = async (postId, userId) => {
    try {
      const postRef = firebase.firestore().collection('posts').doc(postId);
      const postDoc = await postRef.get();

      if (!postDoc.exists) {
        throw new Error("Post not found");
      }

      const post = postDoc.data();
      await firebase.firestore().collection('reportedPosts').doc(postId).set({
        ...post,
        reportedBy: userId,
        reportedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Optional: Remove post from the original collection or flag it as reported
      // await postRef.update({ reported: true });
    } catch (error) {
      console.error("Error reporting post: ", error);
      throw error;
    }
  };
  const getReportedPosts = async () => {
    try {
      const querySnapshot = await firebase.firestore().collection('reportedPosts').get();
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching reported posts: ", error);
      throw error;
    }
  };
  const deleteReportedPost = async (postId) => {
    try {
      const postRef = firebase.firestore().collection('posts').doc(postId);
      const reportedPostRef = firebase.firestore().collection('reportedPosts').doc(postId);

      const batch = firebase.firestore().batch();

      batch.delete(postRef);
      batch.delete(reportedPostRef);

      await batch.commit();
    } catch (error) {
      console.error("Error deleting reported post: ", error);
      throw error;
    }
  };
  const handleNotAbusivePost = async (postId) => {
    try {
      await firebase.firestore().collection('reportedPosts').doc(postId).delete();
    } catch (error) {
      console.error("Error handling not abusive post: ", error);
      throw error;
    }
  };



  


  return {
    isConnected, user, updateUserProfile, uploadImageAndGetUrl,
    signInWithEmailAndPassword, createUserWithEmailAndPassword,
    signOut, fetchUserProfile, reauthenticateWithCredential, updatePassword,
    createPost, getCurrentUserPosts, getAllPosts, toggleLikeOnPost
    
  }
}
