import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  Button,
} from "react-native";
import { Formik } from "formik";

export default function EventForm({ addMarkerButton, location, markers }) {
  return (
    <SafeAreaView>
      <Formik
        initialValues={{ name: "", date: "" }}
        onSubmit={(values) => {
          addMarkerButton(location, markers);
        }}
      >
        {(props) => (
          <SafeAreaView>
            <Text style={styles.text}>Today's date</Text>
            <TextInput
              placeholder="Event name"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
              style={styles.input1}
            ></TextInput>

            <TextInput
              placeholder="Event Date"
              onChangeText={props.handleChange("date")}
              value={props.values.date}
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
