import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-web";
import { useAuthStore } from "../../stores/store";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    console.log({ email, password });
  }, [email, password]);

  return (
    <View>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        value={email}
        placeholder="email"
        autoCapitalize="none"
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        value={password}
        placeholder="password"
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => login(email, password)}
      >
        <Text style={styles.buttonText}>Login</Text>
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
    color: "white",
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
