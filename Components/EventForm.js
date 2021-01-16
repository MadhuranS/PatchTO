import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";

export default function EventForm({ addMarkerButton, location, markers }) {
  const [date, setDate] = useState(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return month + "-" + date + "-" + year; //format: dd-mm-yyyy;
  });
  const get_address = () => {
    return new Promise((resolve, reject) => {
      console.log(location.coords);
      fetch(
        "https://jumbopowerfulcurrencies.patchto.repl.co/api/address/" +
          location.coords.latitude +
          "/" +
          location.coords.longitude
      )
        .then((res) => res.json())
        .then((res) => {
          //setlinks(res);
          resolve(res);
          //setloading2(false);
        });
    });
  };
  const [address, setAddress] = useState({ address: "test" });

  useEffect(() => {
    (async () => {
      const address = await get_address();
      console.log(address);
      setAddress(address);
    })();
  }, []);

  return (
    <SafeAreaView>
      <Formik
        initialValues={{ name: "", description: "" }}
        onSubmit={(values) => {
          if (values.name == "" || values.description == "") {
            Alert.alert(
              "Error",
              "Please fill out event title and event description before submitting",
              [{ text: "OK" }],
              { cancelable: false }
            );
            return;
          }
          addMarkerButton(location, markers, values, date, address);
        }}
      >
        {(props) => (
          <SafeAreaView>
            <Text style={styles.text1}>{address.address}</Text>
            <Text style={styles.text2}>{date}</Text>
            <TextInput
              placeholder="Event name"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
              style={styles.input1}
            ></TextInput>

            <TextInput
              placeholder="Description"
              onChangeText={props.handleChange("description")}
              value={props.values.description}
              style={styles.input2}
              multiline={true}
            ></TextInput>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={props.handleSubmit}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text1: {
    marginTop: 25,
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 5,
    fontSize: 15,
    paddingLeft: 7,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  text2: {
    marginLeft: 5,
    fontSize: 20,
    fontSize: 15,
    paddingLeft: 7,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  input1: {
    marginTop: 0,
    borderColor: "grey",
    height: 50,
    width: 400,
    marginLeft: 5,
    borderBottomWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 20,
  },

  input2: {
    marginTop: 10,
    borderColor: "grey",
    height: 200,
    width: 400,
    marginLeft: 5,
    borderWidth: 2,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 10,
  },

  submitButton: {
    position: "absolute",
    bottom: -50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 50,
    width: 200,
    margin: "auto",
    borderRadius: 50,
    backgroundColor: "#9075E3",
  },

  submitText: {
    color: "white",
  },
});
