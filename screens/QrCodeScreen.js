import React from "react";

import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import QRCode from "react-native-qrcode-svg";
import COLORS from "../colors";

const QrCodeScreen = ({ navigation, route }) => {
    const { data } = route.params;
    console.log("Qr data ", data);

    return (
        <View style={styles.MainContainer}>
            <QRCode
                value={data.walletAddress}
                size={250}
                bgColor="#000"
                fgColor="#fff"
            />
            <Text style={styles.TextInputStyle}>
                Username : {data.username}
            </Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen", { data })}
                style={[
                    styles.button,
                    {
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                        marginTop: 15,
                    },
                ]}
            >
                <Text
                    style={[
                        styles.textSign,
                        {
                            color: COLORS.primary,
                        },
                    ]}
                >
                    Go to Wallet
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default QrCodeScreen;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        margin: 10,
        alignItems: "center",
        paddingTop: 40,
    },

    TextInputStyle: {
        width: "100%",
        height: 40,
        marginTop: 20,
        borderWidth: 1,
        textAlign: "center",
    },

    button: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },

    TextStyle: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
    },
});