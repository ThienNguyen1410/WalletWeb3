import React, { useContext, useEffect, useState } from "react";
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../colors";
import { generateMnemonic, generateWallet } from "../utility";
import { UserContext } from "../utility/context/UserContext";

const CreateWalletScreen = ({ navigation, route }) => {
    const { data } = useContext(UserContext);

    const [isLoading, setLoading] = useState(false);

    const onCreateWallet = async () => {
        const mnemonic = generateMnemonic();
        const wallet = generateWallet(mnemonic);
        data.wallet_Address = wallet.address;
        data.pk = wallet.privateKey;
        const mnemonics = mnemonic.split(" ");
        const seed = mnemonics;
        navigation.navigate("Seed Phrase", { seed, data });
    };
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
            {isLoading ? (
                <ActivityIndicator size="large" color="#00ff00" />
            ) : null}
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
                    <View style={style.button}>
                        <TouchableOpacity
                            style={[
                                style.signIn,
                                {
                                    borderColor: COLORS.primary,
                                    borderWidth: 1,
                                    marginTop: 15,
                                },
                            ]}
                            onPress={() => {
                                setLoading(true);
                                onCreateWallet();
                            }}
                        >
                            <Text style={[style.textSign]}>Create Wallet</Text>
                        </TouchableOpacity>
                    </View>
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
    button: {
        alignItems: "center",
        marginTop: 50,
    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default CreateWalletScreen;
