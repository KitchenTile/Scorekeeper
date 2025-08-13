import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
// import { TextInput } from "react-native-web";
import { useAuthStore } from "../../stores/store";
import { auth } from "../../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const signUp = useAuthStore((state) => state.signUp);

  return (
    <View>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        value={email}
        placeholder="Email"
        placeholderTextColor="#fff"
        autoCapitalize="none"
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        value={password}
        placeholder="Password"
        placeholderTextColor="#fff"
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => login(auth, email, password)}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => signUp(auth, email, password)}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#161F23",
  },
  title: {
    fontSize: 28,
    color: "white",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1E293B",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#586DFF",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
