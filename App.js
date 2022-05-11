import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignNavigation from "./SignNavigation";
import "./global";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <SignNavigation />
        </NavigationContainer>
    );
};

export default App;
