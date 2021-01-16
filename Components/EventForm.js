import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  Button,
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

  return (
    <SafeAreaView>
      <Formik
        initialValues={{ name: "", description: "" }}
        onSubmit={(values) => {
          addMarkerButton(location, markers, values, date);
        }}
      >
        {(props) => (
          <SafeAreaView>
            <Text style={styles.text}>{date}</Text>
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
            <Button
              style={styles.submitButton}
              title="submit"
              onPress={props.handleSubmit}
            ></Button>
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
  text: {
    marginTop: 20,
    marginLeft: 5,
    fontSize: 20,
  },
  input1: {
    marginTop: 10,
    borderColor: "grey",
    height: 50,
    width: 400,
    marginLeft: 5,
    borderWidth: 5,
    paddingLeft: 10,
    borderRadius: 10,
  },

  input2: {
    marginTop: 10,
    borderColor: "grey",
    height: 200,
    width: 400,
    marginLeft: 5,
    borderWidth: 5,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 10,
  },

  submitButton: {
    width: "30%",
  },
});
