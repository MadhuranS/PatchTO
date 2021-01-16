import React, { useState, useEffect } from "react";
import Map from "./Components/Map";
import LoginScreen from "./Screens/LoginScreen";
import CreateUser from "./Screens/CreateUser";
import Navigator from "./routes/homeStack";

export default function App() {
  return <Navigator />;
}
