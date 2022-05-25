import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SignNavigation from "./navigation/SignNavigation";
import "./global";

const App = () => {
    return (
        <NavigationContainer>
            <SignNavigation />
        </NavigationContainer>
    );
};

export default App;
