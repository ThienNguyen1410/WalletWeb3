import "react-native-gesture-handler";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "./colors";
import TransferScreen from "./screens/TransferScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
                headerShown: false,
                headerBackTitleVisible: false,
                headerLeft: null,
                showLabel: false,
                activeTintColor: COLORS.primary,
                tabBarActiveTintColor: "#F9813A",
                tabBarShowLabel: false,
                tabBarStyle: [
                    {
                        display: "flex",
                    },
                    null,
                ],
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
                name="Search"
                component={TransferScreen}
                options={{
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
                                name="search"
                                color={COLORS.primary}
                                size={28}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigator;
