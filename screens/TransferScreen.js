import React, { useEffect, useState } from "react";
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Platform,
    TextInput,
    Alert,
    ActivityIndicator,
    FlatList,
} from "react-native";
import COLORS from "../colors";
import { FontAwesome, Feather } from "react-native-vector-icons/";
import * as Animatable from "react-native-animatable";
import { useTheme } from "react-native-paper";
import { createWallet, transferToken } from "../utility/web3Call";

const TransferScreen = ({ navigation, route }) => {
    const { data } = route.params;
    const { colors } = useTheme();
    const [isLoading, setLoading] = useState(false);

    const [transaction, setTransaction] = React.useState({
        receiver: "",
        amount: "",
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidAmount: true,
    });
    const wallet = createWallet(data.pk);
    const user = {
        username: "Trang",
        address: "0x76A95c88CE72C2b820d97e6a38fE72bee4cE23A9",
    };

    const onTransfer = async (wallet) => {
        setLoading(true);
        console.log("Transaction : ", transaction.receiver);
        const parseReceiver = transaction.receiver.replace(/\s+/g, "");

        transferToken(wallet, parseReceiver, transaction.amount)
            .then((value) => onSuccess(value.transactionHash.toString()))
            .catch((err) => onFailed(err.message));
    };
    const onSuccess = (value) => {
        setLoading(false);
        Alert.alert("Success", `Transaction Hash:  ${value} `, [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            { text: "OK", onPress: () => navigation.goBack() },
        ]);
    };
    const onFailed = (err) => {
        setLoading(false);
        Alert.alert("Failed", err, [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            { text: "OK", onPress: () => navigation.goBack() },
        ]);
    };
    const onReceiverChange = (val) => {
        if (val.trim().length >= 42) {
            setTransaction({
                ...transaction,
                receiver: val,
                check_textInputChange: true,
                isValidUser: true,
            });
        } else {
            setTransaction({
                ...transaction,
                receiver: val,
                check_textInputChange: false,
                isValidUser: false,
            });
        }
    };

    const handleAmountChange = (val) => {
        if (parseInt(val) > 0) {
            setTransaction({
                ...transaction,
                amount: parseInt(val),
                isValidAmount: true,
            });
        } else {
            setTransaction({
                ...transaction,
                amount: val,
                isValidAmount: false,
            });
        }
    };

    const handleValidUser = (val) => {
        if (val.trim().length >= 42) {
            setTransaction({
                ...transaction,
                isValidUser: true,
            });
        } else {
            setTransaction({
                ...transaction,
                isValidUser: false,
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Transfer</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[
                    styles.footer,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                <Text
                    style={[
                        styles.text_footer,
                        {
                            color: colors.text,
                        },
                    ]}
                >
                    Token
                </Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Amount"
                        keyboardType="number-pad"
                        placeholderTextColor="#666666"
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                        autoCapitalize="none"
                        onChangeText={(val) => handleAmountChange(val)}
                    />
                    {transaction.check_textInputChange ? (
                        <Animatable.View animation="bounceIn">
                            <Feather
                                name="check-circle"
                                color={COLORS.primary}
                                size={20}
                            />
                        </Animatable.View>
                    ) : null}
                </View>
                {transaction.isValidAmount ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Amout Insufficient</Text>
                    </Animatable.View>
                )}
                {isLoading ? (
                    <ActivityIndicator size="large" color="#00ff00" />
                ) : null}
                <Text
                    style={[
                        styles.text_footer,
                        {
                            color: colors.text,
                        },
                    ]}
                >
                    Receiver
                </Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Address"
                        placeholderTextColor="#666666"
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                        autoCapitalize="none"
                        onChangeText={(val) => {
                            onReceiverChange(val);
                        }}
                        onEndEditing={(e) =>
                            handleValidUser(e.nativeEvent.text)
                        }
                    />

                    {transaction.check_textInputChange ? (
                        <Animatable.View animation="bounceIn">
                            <Feather
                                name="check-circle"
                                color={COLORS.primary}
                                size={20}
                            />
                        </Animatable.View>
                    ) : null}
                </View>
                {transaction.isValidUser ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Invalid Address</Text>
                    </Animatable.View>
                )}
            </Animatable.View>
            <View style={styles.button}>
                <TouchableOpacity
                    onPress={() => onTransfer(wallet)}
                    disabled={isLoading}
                    style={[
                        styles.signIn,
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
                        Send
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TransferScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 15,
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        margin: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    footer: {
        flex: 0.5,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    text_header: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 30,
    },
    text_footer: {
        color: "#05375a",
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 15,
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#000000",
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#FF0000",
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -12,
        paddingLeft: 10,
        color: "#05375a",
    },
    errorMsg: {
        color: "#FF0000",
        fontSize: 14,
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
