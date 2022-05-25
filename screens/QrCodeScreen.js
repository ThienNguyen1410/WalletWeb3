import React, { useContext } from "react";

import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import QRCode from "react-native-qrcode-svg";
import COLORS from "../colors";
import { UserContext } from "../utility/context/UserContext";

const QrCodeScreen = ({ navigation }) => {
    const { data } = useContext(UserContext);

    return (
        <View style={styles.MainContainer}>
            <QRCode
                value={data.wallet_Address}
                size={250}
                margin={20}
                bgColor="#000"
                fgColor="#fff"
            />
            <Text style={styles.TextInputStyle}>
                Username : {data.username}
            </Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("BottomNavigator")}
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
        borderRadius: 10,
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
