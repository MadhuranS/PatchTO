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
              style={styles.input}
            ></TextInput>

            <TextInput
              placeholder="Event time"
              onChangeText={props.handleChange("time")}
              value={props.values.time}
              style={styles.input}
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
  input: {
    marginTop: 50,
  },
});
