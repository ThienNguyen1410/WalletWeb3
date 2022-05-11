import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../colors";

const LoggedScreen = ({ route }) => {
    const { email, data } = route.params;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ height: 400 }}>
                <Text
                    style={{
                        fontSize: 32,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    V Wallet
                </Text>
            </View>
            <View style={style.textContainer}>
                <View>
                    <Text
                        style={{
                            fontSize: 32,
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Hello: {data.username}
                    </Text>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Your Email {email}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    textContainer: {
        flex: 1,
        paddingHorizontal: 50,
        justifyContent: "space-between",
        paddingBottom: 40,
    },
    indicatorContainer: {
        height: 50,
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    currentIndicator: {
        height: 12,
        width: 30,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        marginHorizontal: 5,
    },
    indicator: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: COLORS.grey,
        marginHorizontal: 5,
    },
});

export default LoggedScreen;
