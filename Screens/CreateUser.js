import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const CreateUser = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //   useEffect(() => {
  //     setTimeout(() => {
  //       if (auth().currentUser) {
  //         props.navigation.navigate("inApp", {});
  //       }
  //     }, 1500);
  //   }, []);

  const createNewUser = () => {
    console.log("clicked");
    fetch(
      "https://patchto.herokuapp.com/api/auth/create/" + email + "/" + password
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          const id = data.id;
          props.navigation.navigate("Map", { uid: id });
        }
      })
      .catch((error) => {
        Alert.alert("Invalid credentials");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <View style={{ marginHorizontal: 32 }}>
        <Text style={styles.header}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={(text) => setemail(text)}
          value={email}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="password"
          onChangeText={(text) => setpassword(text)}
          value={password}
          secureTextEntry={true}
        ></TextInput>
        <View style={{ alignItems: "flex-end", marginTop: 64 }}>
          <TouchableOpacity style={styles.screen} onPress={createNewUser}>
            <Ionicons name="md-arrow-forward" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f7",
    paddingTop: 50,
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: "#fff",
    position: "absolute",
    left: -120,
    top: 50,
  },
  header: {
    fontWeight: "800",
    fontSize: 30,
    fontStyle: "normal",
    color: "#514e5a",
    marginTop: 32,
  },
  input: {
    marginTop: 32,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#BAB7C3",
    paddingHorizontal: 16,
    borderRadius: 30,
    color: "#514e5a",
    fontWeight: "600",
  },
  screen: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#9075E3",
    alignItems: "center",
    justifyContent: "center",
    bottom: 50,
  },
  signup: {
    position: "absolute",
    bottom: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 50,
    width: 100,
    margin: "auto",
    borderRadius: 50,
    color: "white",
    backgroundColor: "#9075E3",
  },

  text: {
    color: "white",
  },
});

export default CreateUser;
