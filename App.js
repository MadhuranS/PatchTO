import React, { useState, useEffect } from "react";
import Map from "./Components/Map";
import LoginScreen from "./Screens/LoginScreen";
import CreateUser from "./Screens/CreateUser";
import Navigator from "./routes/homeStack";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

//const HomeStack = createStackNavigator();

export default function App() {
  return <Navigator />;
  // return (
  //   <HomeStack.Navigator>
  //     <HomeStack.Screen name="LoginScreen" component={LoginScreen} />
  //     <HomeStack.Screen name="Map" component={Map} />
  //     <HomeStack.Screen name="CreateUser" component={CreateUser} />
  //   </HomeStack.Navigator>
  // );
}
