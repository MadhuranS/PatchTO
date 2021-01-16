import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import EventForm from "./EventForm";

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
  const [search, setSearch] = useState("");
  const [loadingModal, setLoadingModal] = useState(true);

  //https://jumbopowerfulcurrencies.patchto.repl.co/api/coordinates/106%20Dolly%20Varden%20Boulevard

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("usssseddd");
      setLocation(location);
      setLoadingModal(false);
    })();

    //getAllData();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const getAllData = () => {
    fetch("https://jumbopowerfulcurrencies.patchto.repl.co/data/read/pins")
      .then((response) => response.json())
      .then((data) => {
        setMarkers(data);
      })
      .catch((error) => {
        Alert.alert("Error");
      });
  };

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const addMarkerButton = (location, markers, values, date, address) => {
    setMarkers([
      ...markers,
      {
        latlng: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        values: values,
        date: date,
        address: address.address,
      },
    ]);

    fetch(
      "https://jumbopowerfulcurrencies.patchto.repl.co/data/write/pins/" +
        location.coords.latitude +
        "/" +
        location.coords.longitude +
        "/" +
        values.name +
        "/" +
        values.description +
        "/" +
        date +
        "/" +
        address.address
    );

    console.log(search);

    setModalOpen(false),
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
  };

  const newSearch = (search) => {
    console.log(search);
  };

  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    })();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={loadingModal}>
        <SafeAreaView style={styles.loading}>
          <Text style={styles.loadingText}>Loading</Text>
        </SafeAreaView>
      </Modal>
      <Modal
        visible={modalOpen}
        animationType="slide"
        style={styles.modalContent}
      >
        <SafeAreaView style={styles.container}>
          <Ionicons
            name="close"
            onPress={() => setModalOpen(false)}
            size={30}
            style={styles.closeButton}
          ></Ionicons>
          <EventForm
            location={location}
            addMarkerButton={addMarkerButton}
            markers={markers}
          ></EventForm>
        </SafeAreaView>
      </Modal>

      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChange}
        //onPress={addMarker}
      >
        {markers.map((marker, i) => (
          <Marker key={i} coordinate={marker.latlng} description="test">
            <Callout tooltip>
              <SafeAreaView>
                <SafeAreaView style={styles.bubble}>
                  <Text>Address: {marker.address}</Text>
                  <Text>Date Posted: {marker.date}</Text>
                  <Text>Event Name: {marker.values.name}</Text>
                  <Text>Event Description: {marker.values.description}</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.arrowBorder} />
                <SafeAreaView style={styles.arrow} />
              </SafeAreaView>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity style={styles.find} onPress={() => getLocation()}>
        <Text style={styles.searchText}>Find Location</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={(search) => setSearch({ search })}
      ></TextInput>
      <TouchableOpacity style={styles.search} onPress={() => newSearch(search)}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
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

  search: {
    position: "absolute",
    top: 80,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 30,
    width: 70,
    margin: "auto",
    borderRadius: 10,
    backgroundColor: "rgb(51, 204, 255)",
    marginTop: 10,
  },

  find: {
    position: "absolute",
    top: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 30,
    width: 125,
    margin: "auto",
    borderRadius: 10,
    backgroundColor: "#9075E3",
    marginTop: 10,
  },

  searchText: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",

    alignItems: "center",
    alignSelf: "center",
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

  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 250,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },

  loading: {
    padding: 30,
    position: "absolute",
    top: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  loadingText: {
    fontSize: 40,
  },
});

export default Map;
