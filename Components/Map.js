import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
} from "react-native";
import MapView, { Marker, Callout, CalloutSubview } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import EventForm from "./EventForm";

const Map = ({ navigation }) => {
  const { uid } = navigation.state.params;
  console.log(uid);

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
  const [voteModal, setVoteModal] = useState(false);
  const [liveAddresses, setLiveAddresses] = useState([]);

  const [selectedpin, setselectedpin] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoadingModal(false);
    })();

    getAllData();
  }, []);

  useEffect(() => {
    setTimeout(function () {
      updateSearchList();
    }, 3000);
  }, [search]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const getAllData = () => {
    fetch("https://patchto.herokuapp.com/api/pins/all")
      .then((response) => response.json())
      .then((data) => {
        const arr = data.map((x) => {
          const coors = x.latlng;
          const lat = coors.latitude;
          const lng = coors.longitude;
          x.latlng = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
          };
          return x;
        });

        setMarkers(arr);
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
      "https://patchto.herokuapp.com/api/pins/create/" +
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

    getAllData();

    setModalOpen(false),
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
  };

  const newSearch = () => {
    (async () => {
      const coords = await get_coords();

      setRegion({
        latitude: coords.coordinates.lat,
        longitude: coords.coordinates.lng,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    })();
    console.log("tessst");
  };

  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    })();
  };

  const get_coords = () => {
    return new Promise((resolve, reject) => {
      fetch("https://patchto.herokuapp.com/api/coordinates/" + search)
        .then((res) => res.json())
        .then((res) => {
          //setlinks(res);
          resolve(res);

          //setloading2(false);
        });
    });
  };

  const searchAutocomplete = () => {
    return new Promise((resolve, reject) => {
      fetch("https://patchto.herokuapp.com/api/autocomplete/" + search.search)
        .then((res) => res.json())
        .then((res) => {
          resolve(res.addresses);
        });
    });
  };

  const updateSearchList = () => {
    (async () => {
      const searchList = await searchAutocomplete();
      console.log(searchList);
      setLiveAddresses(searchList);
    })();
  };

  const upvote = () => {
    fetch(
      "https://patchto.herokuapp.com/api/pins/upvote/" +
        markers[selectedpin].id +
        "/" +
        uid
    ).then((res) => {
      setVoteModal(false);
      getAllData();
    });
  };

  const downvote = () => {
    fetch(
      "https://patchto.herokuapp.com/api/pins/downvote/" +
        markers[selectedpin].id +
        "/" +
        uid
    ).then((res) => {
      setVoteModal(false);
      getAllData();
    });
  };

  const makeVoteModal = (marker) => {
    setVoteModal(true);
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

      <Modal visible={voteModal} style={styles.voteModal}>
        <Ionicons
          name="close"
          onPress={() => setVoteModal(false)}
          size={30}
          style={styles.closeButton}
        ></Ionicons>
        <SafeAreaView style={styles.voteView}>
          <TouchableOpacity
            style={styles.vote1}
            onPress={() => {
              console.log("test1");
              upvote();
            }}
          >
            <Text style={styles.voteText}>Up!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.vote2}
            onPress={() => {
              console.log("test1");
              downvote();
            }}
          >
            <Text style={styles.voteText}>Down!</Text>
          </TouchableOpacity>
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
            <Callout
              onPress={() => {
                makeVoteModal(marker);
                setselectedpin(i);
              }}
              tooltip
            >
              <SafeAreaView>
                <SafeAreaView style={styles.bubble}>
                  <Text>Address: {marker.address}</Text>
                  <Text>Date Posted: {marker.date}</Text>
                  <Text>Event Name: {marker.values.name}</Text>
                  <Text>Event Description: {marker.values.description}</Text>
                  <Text>
                    votes: {marker.upvotes.length - marker.downvotes.length}
                  </Text>
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
      <SafeAreaView style={styles.liveAddresses}>
        {liveAddresses.map((x, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setSearch(x);
              newSearch();
            }}
          >
            <Text>{x}</Text>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
      <TouchableOpacity style={styles.search} onPress={() => newSearch()}>
        <Text style={styles.searchText}>Go</Text>
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
    bottom: 100,
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
    top: 40,
    right: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 30,
    width: 30,
    margin: "auto",
    borderRadius: 10,
    backgroundColor: "rgb(51, 204, 255)",
    marginTop: 10,
  },

  liveAddresses: {
    position: "absolute",
    top: 70,
    left: 56,
    flexDirection: "column",
    paddingLeft: 20,
    alignSelf: "center",
    width: 300,
    margin: "auto",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "white",
    marginTop: 10,
  },

  find: {
    position: "absolute",
    top: 500,

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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: "auto",
    backgroundColor: "rgba(255, 255, 255, 1)",
    color: "black",
    paddingLeft: 15,
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

  voteView: {
    flexDirection: "row",
    marginTop: 30,
  },

  vote1: {
    position: "absolute",
    left: 50,
    top: 250,
    marginRight: 30,

    width: 125,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "green",
  },

  vote2: {
    position: "absolute",
    right: 50,
    marginLeft: 30,
    top: 250,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    borderRadius: 10,
    backgroundColor: "red",
    width: 125,
  },

  voteModal: {
    padding: 100,
    margin: 100,
  },

  voteText: {
    fontSize: 30,
  },
});

export default Map;
