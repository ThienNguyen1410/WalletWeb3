import React from "react";
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
import { useTheme } from "react-native-paper";
import { getAsyncStorage } from "../asyncStorage";
import COLORS from "../colors";

const PasscodeScreen = ({ navigation, route }) => {
    const { data } = route.params;
    console.log("Data is passcode : ", data);
    const { colors } = useTheme();

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
    const onPasscode = async (passcode) => {
        data.pin = passcode;
        const pk = await getAsyncStorage(data.wallet_Address);
        console.log("Pk : ", pk);
        data.pk = pk;
        navigation.navigate("HomeScreen", { data });
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.primary}
                barStyle="light-content"
            />
            <View style={styles.header}>
                <Text style={styles.text_header}>
                    Welcome : {data.username}
                </Text>
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
                        onPress={() => onPasscode(passcode)}
                    >
                        <Text
                            style={[
                                styles.textSign,
                                {
                                    color: COLORS.primary,
                                },
                            ]}
                        >
                            OK
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
        justifyContent: "center",
        alignItems: "center",
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
        borderRadius: 5,
        borderColor: COLORS.primary,
        borderWidth: 0.5,
        margin: 20,
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

export default PasscodeScreen;
