import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./screens/SignInScreen";
import CreateUserScreen from "./screens/CreateUserScreen";
import CreateWalletScreen from "./screens/CreateWalletScreen";
import CreatePinScreen from "./screens/CreatePinScreen";
import HomeScreen from "./screens/HomeScreen";
import SeedPhraseScreen from "./screens/SeedPhraseScreen";
import QrCodeScreen from "./screens/QrCodeScreen";
import TransferScreen from "./screens/TransferScreen";
import PasscodeScreen from "./screens/PasscodeScreen";

const RootStack = createStackNavigator();

const SignNavigation = ({ navigation }) => (
    <RootStack.Navigator
        screenOptions={{
            headerShown: false,
            headerBackTitleVisible: false,
            headerLeft: null,
        }}
    >
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        <RootStack.Screen
            name="CreateUserScreen"
            component={CreateUserScreen}
        />
        <RootStack.Screen
            name="CreateWalletScreen"
            component={CreateWalletScreen}
        />
        <RootStack.Screen name="Create Pin" component={CreatePinScreen} />
        <RootStack.Screen name="Seed Phrase" component={SeedPhraseScreen} />
        <RootStack.Screen name="QR Code" component={QrCodeScreen} />
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        <RootStack.Screen name="Passcode" component={PasscodeScreen} />
        <RootStack.Screen name="TransferScreen" component={TransferScreen} />
    </RootStack.Navigator>
);

export default SignNavigation;
