import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  View,
  Button,
} from "react-native";
import { Formik } from "formik";

export default function EventForm() {
  return (
    <SafeAreaView>
      <Formik
        initialValues={{ name: "", time: "" }}
        /*onSubmit={(values) => {
          addItem(items, timestamp, values);
        }}*/
      >
        {(props) => (
          <SafeAreaView>
            <TextInput
              placeholder="Event name"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
              style={styles.input1}
            ></TextInput>

            <TextInput
              placeholder="Event time"
              onChangeText={props.handleChange("time")}
              value={props.values.time}
              style={styles.input2}
            ></TextInput>
            <Button title="submit"></Button>
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
  input1: {
    marginTop: 40,
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
    height: 50,
    width: 400,
    marginLeft: 5,
    borderWidth: 5,
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
});
