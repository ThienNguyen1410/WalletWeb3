import "react-native-gesture-handler";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../colors";
import { View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import TransferScreen from "../screens/TransferScreen";
import TransactionScreen from "../screens/TransferScreen";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                style: {
                    height: 55,
                    borderTopWidth: 0,
                    elevation: 0,
                },
                activeTintColor: COLORS.primary,
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="home-filled" color={color} size={28} />
                    ),
                }}
            />
            <Tab.Screen
                name="Transfer"
                component={TransferScreen}
                options={{
                    tabBarStyle: { display: "none" },
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                height: 60,
                                width: 60,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: COLORS.white,
                                borderColor: COLORS.primary,
                                borderWidth: 2,
                                borderRadius: 30,
                                top: -25,
                                elevation: 5,
                            }}
                        >
                            <Icon
                                name="swap-horiz"
                                color={COLORS.primary}
                                size={28}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={TransactionScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="history" color={color} size={28} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigator;
