import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const Map = () => {
  const [region, setRegion] = useState({
    latitude: 43.6532,
    longitude: -79.3832,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });

  const [markers, setMarkers] = useState([]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log("test");
      console.log(location.coords.longitude);
      console.log(location.coords.latitude);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const addMarker = (e) => {
    setMarkers([...markers, { latlng: e.nativeEvent.coordinate }]);
  };

  const addMarkerButton = (location) => {
    setMarkers([
      ...markers,
      {
        latlng: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      },
    ]);

    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    });
    console.log("Test");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={modalOpen}
        animationType="slide"
        style={styles.modalContent}
      >
        <View style={styles.container}>
          <Ionicons
            name="close"
            onPress={() => setModalOpen(false)}
            size={30}
            style={styles.closeButton}
          ></Ionicons>
        </View>
      </Modal>

      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChange}
        onPress={addMarker}
      >
        {markers.map((marker, i) => (
          <Marker key={i} coordinate={marker.latlng} />
        ))}
      </MapView>
      <TextInput style={styles.input}></TextInput>
      <TouchableOpacity
        style={styles.overlay}
        onPress={() => setModalOpen(true)}
      >
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 50,
    width: 50,
    margin: "auto",
    borderRadius: 50,
    borderColor: "rgba(255, 255, 255, 1)",
    borderWidth: 5,
  },
  text: {
    fontSize: 50,
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 5,
    alignItems: "center",
    alignSelf: "center",
  },
  input: {
    position: "absolute",
    top: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 30,
    width: 300,
    borderRadius: 20,
    margin: "auto",
    backgroundColor: "rgba(255, 255, 255, 1)",
    color: "black",
    paddingLeft: 10,
    paddingRight: 10,
  },

  closeButton: {
    position: "absolute",
    right: 10,
    color: "grey",
  },

  submitButton: {
    position: "absolute",
    bottom: 5,
  },

  modalContent: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Map;
