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
} from "react-native";
import COLORS from "../colors";
import { FontAwesome, Feather } from "react-native-vector-icons/";
import * as Animatable from "react-native-animatable";
import { useTheme } from "react-native-paper";
import { auth, database } from "../firebase/config";
import { GoogleAuthProvider } from "firebase/auth";
import * as Google from "expo-google-app-auth";
import * as GooleSignIn from "expo-google-sign-in";

const SignInScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        profile_picture: "",
        first_name: "",
        last_name: "",
        created_at: "",
        username: "",
        userId: "",
        pin: {},
        pk: "",
        walletAddress: "",
        password: "",
        backup: "",
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const iosClientId =
        "38761714098-up0ai7rhhvojehmu11fgct1bsksqij6u.apps.googleusercontent.com";
    const androidClientId =
        "44538382106-ib72raq54m933sbf43qo29egq27dsrjq.apps.googleusercontent.com";

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false,
            });
        }
    };

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
            });
        }
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                isValidUser: false,
            });
        }
    };

    const onGoogleSignIn = (googleUser) => {
        setLoading(true);
        var credential = GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
        );

        auth.signInWithCredential(credential)
            .then((result) => {
                if (result.additionalUserInfo.isNewUser) {
                    let data = {
                        email: result.user.email,
                        profile_picture:
                            result.additionalUserInfo.profile.picture,
                        first_name:
                            result.additionalUserInfo.profile.given_name,
                        last_name:
                            result.additionalUserInfo.profile.family_name,
                        created_at: Date.now(),
                        username: "",
                        userId: result.user.uid,
                        pin: {},
                        pk: "",
                        walletAddress: "",
                        backup: "",
                    };
                    navigation.navigate("CreateUserScreen", { data });
                } else {
                    database
                        .ref("/users/" + result.user.uid)
                        .once("value")
                        .then(
                            (snapshot) => {
                                if (snapshot.child("wallet_Address").exists()) {
                                    const username = snapshot.val().username;
                                    const wallet_Address =
                                        snapshot.val().wallet_Address;
                                    console.log("Username :", username);
                                    console.log(
                                        "Wallet Address",
                                        wallet_Address
                                    );
                                    let pk = "";
                                    const data = {
                                        username,
                                        wallet_Address,
                                        pk,
                                    };
                                    navigation.navigate("Passcode", { data });
                                    setLoading(false);
                                }
                            },
                            (err) => console.log(err)
                        );
                }
            })
            .catch((err) => console.log(err));

        // if (result.additionalUserInfo.isNewUser) {
        //     setData({
        //         email: result.user.email,
        //         profile_picture: result.additionalUserInfo.profile.picture,
        //         first_name: result.additionalUserInfo.profile.given_name,
        //         last_name: result.additionalUserInfo.profile.family_name,
        //         created_at: Date.now(),
        //         userId: result.user.uid,
        //     });

        //     console.log("Data on SignInScreen call time 1 : ", data);
        //     console.log("Data on SignInScreen call time 2 : ", data);
        //     let user = result.user;
        //     let uid = result.user.uid;
        //     // navigation.navigate("CreateUserScreen", { data });
        // } else {
        //     database
        //         .ref("/users/" + result.user.uid)
        //         .once("value")
        //         .then(
        //             (snapshot) => {
        //                 if (snapshot.child("wallet_Address").exists()) {
        //                     const username = snapshot.val().username;
        //                     const wallet_Address =
        //                         snapshot.val().wallet_Address;
        //                     console.log("Username :", username);
        //                     console.log("Wallet Address", wallet_Address);
        //                     let pk = "";
        //                     const data = { username, wallet_Address, pk };
        //                     navigation.navigate("Passcode", { data });
        //                     setLoading(false);
        //                 }
        //             },
        //             (err) => console.log(err)
        //         );
        // }
    };
    //Build Standard Alone app
    // const initGoogleSignIn = async () => {
    //     try {
    //         await GooleSignIn.initAsync({
    //             clientId:
    //                 Platform.OS === "android" ? androidClientId : iosClientId,
    //         });
    //     } catch ({ message }) {
    //         Alert.alert("Error", message, [
    //             {
    //                 text: "Cancel",
    //                 onPress: () => console.log("Cancel Pressed"),
    //                 style: "cancel",
    //             },
    //             { text: "OK", onPress: () => navigation.goBack() },
    //         ]);
    //     }
    // };

    // useEffect(() => {
    //     initGoogleSignIn();
    // });

    const handleGoogleSignIn = async () => {
        const config = {
            iosClientId:
                "38761714098-up0ai7rhhvojehmu11fgct1bsksqij6u.apps.googleusercontent.com",
            androidClientId:
                "44538382106-ib72raq54m933sbf43qo29egq27dsrjq.apps.googleusercontent.com",
            scope: ["email", "profile"],
        };
        try {
            //  Build Standard alone app
            // await GooleSignIn.askForPlayServicesAsync();
            // const result = await GooleSignIn.signInAsync();
            const result = await Google.logInAsync(config);
            const { type, user } = result;
            if (type == "success") {
                // Build Standard Alone App
                // await onGoogleSignIn(user.auth);
                onGoogleSignIn(result);
            } else {
                Alert.alert("Cancel SignIn", "Sign In by Google canceled ", [
                    {
                        text: "OK",
                        style: "cancel",
                    },
                ]);
            }
        } catch (err) {
            Alert.alert("Error", err, [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
            ]);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>V Wallet</Text>
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
                        },
                    ]}
                >
                    Email
                </Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#666666"
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) =>
                            handleValidUser(e.nativeEvent.text)
                        }
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

                <Text
                    style={[
                        styles.text_footer,
                        {
                            color: colors.text,
                            marginTop: 35,
                        },
                    ]}
                >
                    Mật Khẩu
                </Text>
                <View style={styles.action}>
                    <Feather name="lock" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Mật Khẩu"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ? (
                            <Feather name="eye-off" color="grey" size={20} />
                        ) : (
                            <Feather name="eye" color="grey" size={20} />
                        )}
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>
                            Mật khẩu phải có 8 ký tự trở lên.
                        </Text>
                    </Animatable.View>
                )}
            </Animatable.View>
            <View style={styles.button}>
                <TouchableOpacity
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
                        Sign In
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleGoogleSignIn()}
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
                        Sign In with Google
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        paddingBottom: 40,
        paddingHorizontal: 15,
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
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

export default SignInScreen;
