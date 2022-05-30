import React, { useContext, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { database } from "../firebase/config";
import { useTheme } from "react-native-paper";
import { setAsyncStorage } from "../asyncStorage";
import COLORS from "../colors";
import CryptoES from "crypto-es";
import { createIdentity, createUserIdentity } from "../network/IDM";
import { UserContext } from "../utility/context/UserContext";

const CreatePinScreen = ({ navigation }) => {
    const { data } = useContext(UserContext);
    const { colors } = useTheme();
    const [isLoading, setLoading] = useState(false);

    const firstInput = React.useRef();
    const secondInput = React.useRef();
    const thirdInput = React.useRef();
    const fourthInput = React.useRef();
    const fivethInput = React.useRef();
    const sixthInput = React.useRef();
    const [passcode, setPasscode] = React.useState({
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
    });
    const createNewUser = async (data) => {
        await createIdentity(data.email, data.pk);
        data.isNewUser = false;
    };
    const backupToCloud = async (data) => {
        try {
            const password = data.pin + data.userId;
            const encrypted = CryptoES.AES.encrypt(data.pk, password);

            database.ref("/users/" + data.userId).set({
                username: data.username,
                wallet_Address: data.walletAddress,
                email: data.email,
                created_at: Date.now(),
                wallet_Address: data.walletAddress,
                backup: encrypted.toString(),
            });
        } catch (err) {
            console.log(err);
        }
    };

    const backupToLocal = async (data) => {
        const password = data.pin + data.userId;
        const encrypted = CryptoES.AES.encrypt(data.pk, password).toString();
        setAsyncStorage(data.userId, encrypted);
    };

    const onCreatePin = async (passcode) => {
        try {
            data.pin =
                passcode[1] +
                passcode[2] +
                passcode[3] +
                passcode[4] +
                passcode[5] +
                passcode[6];
            if (data.isNewUser) {
                await createNewUser(data);
            }
            await backupToCloud(data);
            await backupToLocal(data);
            navigation.navigate("QR Code");
        } catch (err) {
            console.log(err);
            alert(err);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.primary}
                barStyle="light-content"
            />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome :{data.username}</Text>
            </View>
            {isLoading ? (
                <ActivityIndicator size="large" color="#00ff00" />
            ) : null}
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
                            marginTop: 35,
                        },
                    ]}
                >
                    Pin
                </Text>
                <View style={styles.passcodeContainer}>
                    <View style={styles.passcodeBox}>
                        <TextInput
                            style={styles.passcodeText}
                            keyboardType="number-pad"
                            secureTextEntry={true}
                            maxLength={1}
                            ref={firstInput}
                            onChangeText={(text) => {
                                setPasscode({ ...passcode, 1: text });
                                text && secondInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.passcodeBox}>
                        <TextInput
                            style={styles.passcodeText}
                            keyboardType="number-pad"
                            secureTextEntry={true}
                            maxLength={1}
                            ref={secondInput}
                            onChangeText={(text) => {
                                setPasscode({ ...passcode, 2: text });
                                text
                                    ? thirdInput.current.focus()
                                    : firstInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.passcodeBox}>
                        <TextInput
                            style={styles.passcodeText}
                            keyboardType="number-pad"
                            secureTextEntry={true}
                            maxLength={1}
                            ref={thirdInput}
                            onChangeText={(text) => {
                                setPasscode({ ...passcode, 3: text });
                                text
                                    ? fourthInput.current.focus()
                                    : secondInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.passcodeBox}>
                        <TextInput
                            style={styles.passcodeText}
                            keyboardType="number-pad"
                            secureTextEntry={true}
                            maxLength={1}
                            ref={fourthInput}
                            onChangeText={(text) => {
                                setPasscode({ ...passcode, 4: text });
                                text
                                    ? fivethInput.current.focus()
                                    : thirdInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.passcodeBox}>
                        <TextInput
                            style={styles.passcodeText}
                            keyboardType="number-pad"
                            secureTextEntry={true}
                            maxLength={1}
                            ref={fivethInput}
                            onChangeText={(text) => {
                                setPasscode({ ...passcode, 5: text });
                                text
                                    ? sixthInput.current.focus()
                                    : fourthInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.passcodeBox}>
                        <TextInput
                            style={styles.passcodeText}
                            keyboardType="number-pad"
                            secureTextEntry={true}
                            maxLength={1}
                            ref={sixthInput}
                            onChangeText={(text) => {
                                setPasscode({ ...passcode, 6: text });
                                !text && fivethInput.current.focus();
                            }}
                        />
                    </View>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={[
                            styles.signIn,
                            {
                                borderColor: COLORS.primary,
                                borderWidth: 1,
                                marginTop: 15,
                            },
                        ]}
                        onPress={() => onCreatePin(passcode)}
                        disabled={isLoading}
                    >
                        <Text
                            style={[
                                styles.textSign,
                                {
                                    color: COLORS.primary,
                                },
                            ]}
                        >
                            Create Pin
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30,
    },
    text_footer: {
        color: "#05375a",
        fontSize: 18,
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
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
    passcodeContainer: {
        margin: 20,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
    },
    passcodeBox: {
        margin: 20,
        borderRadius: 5,
        borderColor: COLORS.primary,
        borderWidth: 0.5,
    },
    passcodeText: {
        fontSize: 25,
        color: "#000000",
        padding: 0,
        textAlign: "center",
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
});

export default CreatePinScreen;
