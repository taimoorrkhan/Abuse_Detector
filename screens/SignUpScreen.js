import React from "react";
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useFirebase from "../hook/useFirebase";

export default function SignupScreen({ navigation }) {
  const { createUserWithEmailAndPassword } = useFirebase();

  const handleSignup = async (values) => {
    try {
      await createUserWithEmailAndPassword(values.email, values.password);
      navigation.navigate("NextScreen"); // Replace with your desired navigation logic
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image
          source={require('../assets/logo.png')} // Make sure the logo image is correctly referenced
          style={styles.logo}
        />
        <Text style={styles.title}>Create an Account</Text>
        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={yup.object().shape({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Invalid email').required('Email is required'),
            password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
          })}
          onSubmit={handleSignup}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <>
              <TextInput
                placeholder="Your Name"
                value={values.name}
                onChangeText={handleChange('name')}
                style={styles.input}
              />
              {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
              <TextInput
                placeholder="Email Address"
                value={values.email}
                onChangeText={handleChange('email')}
                style={styles.input}
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
              <TextInput
                placeholder="Password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                style={styles.input}
              />
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                style={styles.input}
              />
              {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginTop: 50,
    borderRadius: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4B4F56',
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: '#BDC7D8',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  error: {
    color: "#D8000C",
    backgroundColor: "#FFD2D2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: 'center',
    width: '90%',
  },
  button: {
    backgroundColor: '#4267B2',
    height: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
