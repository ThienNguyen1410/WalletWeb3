import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../colors";
import { useTheme } from "react-native-paper";

const CreateUserScreen = ({ navigation, route }) => {
    const { data } = route.params;
    // const [data, setData] = React.useState({
    //     username: "",
    //     userId: uid,
    //     pin: {},
    //     walletAddress: "",
    //     pk: "",
    //     check_textInputChange: false,
    //     secureTextEntry: true,
    //     isValidUser: true,
    // });
    console.log("Data on CreateUserScreen : ", data);

    const { colors } = useTheme();
    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            data.username = val;
            data.check_textInputChange = true;
            data.isValidUser = true;
        } else {
            data.username = val;
            data.check_textInputChange = false;
            data.isValidUser = false;
        }
    };

    // const handleValidUser = (val) => {
    //     if (val.trim().length >= 4) {
    //         setData({
    //             ...data,
    //             isValidUser: true,
    //         });
    //     } else {
    //         setData({
    //             ...data,
    //             isValidUser: false,
    //         });
    //     }
    // };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.primary}
                barStyle="light-content"
            />
            <View style={styles.header}>
                <Text style={styles.text_header}>Wellcome: {data.email}</Text>
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
                    Create Username
                </Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#666666"
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ? (
                        <Animatable.View animation="bounceIn">
                            <Feather
                                name="check-circle"
                                color={COLORS.primary}
                                size={20}
                            />
                        </Animatable.View>
                    ) : null}
                </View>
                {data.isValidUser ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>
                            Username must be 4 characters long.
                        </Text>
                    </Animatable.View>
                )}

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
                        onPress={() => {
                            navigation.navigate("CreateWalletScreen", { data });
                        }}
                    >
                        <Text
                            style={[
                                styles.textSign,
                                {
                                    color: COLORS.primary,
                                },
                            ]}
                        >
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default CreateUserScreen;

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
});
