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

  // Method to update the user profile
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
        userRole : 'admin',
        uid: result.user.uid,
      });

      const token = await result.user.getIdToken();
      return { user: result.user, token };

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
 
  
  


  return {
    isConnected, user, updateUserProfile, uploadImageAndGetUrl,
    signInWithEmailAndPassword, createUserWithEmailAndPassword,
    signOut, fetchUserProfile, reauthenticateWithCredential, updatePassword,
    
  }
}
