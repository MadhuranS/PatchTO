import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Map from "../Components/Map";
import LoginScreen from "../Screens/LoginScreen";
import CreateUser from "../Screens/CreateUser";

const screens = {
  LoginScreen: {
    screen: LoginScreen,
  },
  Map: {
    screen: Map,
  },
  CreateUser: {
    screen: CreateUser,
  },
};

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
