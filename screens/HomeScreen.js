import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Dimensions,
    Platform,
    StyleSheet,
    Image,
    StatusBar,
    FlatList,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../colors";
import { useTheme } from "react-native-paper";
import { getBalance, getSymbol, getAllNft } from "../utility/web3Call";
import * as GooleSignIn from "expo-google-sign-in";
import * as Google from "expo-google-app-auth";
import { clearAsyncStorage, getAsyncStorage } from "../asyncStorage";
const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 40;

const HomeScreen = ({ navigation, route }) => {
    const { data } = route.params;
    const [balance, setBalance] = useState("");
    const [nft, setNft] = useState([]);
    const [symbol, setSymbol] = useState("");
    const { colors } = useTheme();
    const [refreshing, setRefreshing] = useState(true);

    const axiesImage = {
        1: "https://axie.zone/assets/images/axies/star_boy.png",
        2: "https://axie.zone/assets/images/axies/froot_loop.png",
        3: "https://theaxiescholar.com/img/axie-red.png",
        4: "https://lh3.googleusercontent.com/AkLCMLljZvk1gvQsGlTnOhnNNA4rZpvUJ0nqrSU-6xI42UdWgsWtyBLAY-AA5IKZNdy1mNHmO8_ltxcyPZbyL3Sdgg=w600",
        5: "https://lh3.googleusercontent.com/9CMgalObOtK7fG3TXVhwS-iAPbWmH8CwjmOskKBdpGIi4QGEpi9MaPD5H9-mylW4ZkBrdve10zxXJu3GIJjARhPf6g=w600",
        6: "https://lh3.googleusercontent.com/aUqnUWLIs77KoA0TvjIp6iHNBRQidzXM43zYodw2Sm-YKUZmO9A2fsXMUfnXdvfOhr_z3ZLDNbV643S-w7GmAA-j=w600",
        7: "https://lh3.googleusercontent.com/QBsYeBH7-PWXQZOh225T4JWnjAj_x-9LMXLnHeP8hOA0zox-xrKazOdRXpZEG69aEZdiYYgoLFMGJRFY0g6U7TM=w600",
        8: "https://lh3.googleusercontent.com/5Dnb0juKgTZMjFWvyMAIPBIlnGtklC-3oHn-MNjZV_q6wTwFHEieFrxqFRCtJphYTEGwz-emAt3CCvBPJT04-js=w600",
        9: "https://lh3.googleusercontent.com/hJAIv-CjKPxDCyqe-Ftg3nIPvPhmt_SbDHTe-Kh8IuITn4TFDkZtjK0gKDgT0yiBR2aCIORptbLrm6GzXunjUsBdOweEDZUC2px-vw=w600",
        18: "https://lh3.googleusercontent.com/skFxo1q3HEvKA3kYAteY2YXWjyg1i6dqB8Pe0CfYsmWXPdAfUxfNVqxj3wPDQ-axGLzODP6cAKrKpL4tf7fTgeyK=w600",
        26: "https://lh3.googleusercontent.com/r-hBsk0XnHEjWBkU9xP3qT13YTcvyEVerDVsOlV2Ep8k4aBQ7GAnUNfCKnDrXHgH2PvzckXlDY-YiVnASP0nwtM=w600",
        14: "https://lh3.googleusercontent.com/r-hBsk0XnHEjWBkU9xP3qT13YTcvyEVerDVsOlV2Ep8k4aBQ7GAnUNfCKnDrXHgH2PvzckXlDY-YiVnASP0nwtM=w600",
        15: "https://lh3.googleusercontent.com/joMrC6QAue-EqeF2TF5OYiZDdtzwkm2K8iTd9ZbeiNym9lIhBT9DnNOe81RdBhThy9DD9AdwolwAcC08zKeA3g1C6W3dqqOTpC183cg=w600",
        32: "https://lh3.googleusercontent.com/W2ouyKBzhXBMkDtxk4nDm9jQrVeuFHR7AwkBlth7gEioUbMkTBT2_ZfxJJi2v-XDzjvSk4OWUha7xyRjKKzYjfqXv-ou8_SyziXX65Q=w600",
    };

    const selectImage = (axieId) => {
        var url = "";

        if (axiesImage[axieId] != null) {
            url = axiesImage[axieId];
        } else {
            url = "https://axie.zone/assets/images/axies/star_boy.png";
        }
        return url;
    };

    const loadUserData = async () => {
        setRefreshing(false);
        const newBalance = await getBalance(data.wallet_Address);
        const currencySymbol = await getSymbol();
        const axieIds = await getAllNft(data.wallet_Address);
        const axies = axieIds.map((axieId) => {
            const axies = {
                id: axieId,
                name: "Axie Infinity",
                image: selectImage(axieId),
            };
            return axies;
        });
        setNft(axies);
        setBalance(newBalance.toString());
        setSymbol(currencySymbol.toString());
    };

    const onSignOut = async () => {
        try {
            if (!__DEV__) {
                await GooleSignIn.signOutAsync();
                clearAsyncStorage();
            } else {
                clearAsyncStorage();
            }
            navigation.navigate("SignInScreen");
        } catch ({ message }) {
            Alert.alert("Error", message, [
                {
                    text: "OK",
                    style: "cancel",
                },
            ]);
        }
    };

    useEffect(async () => {
        await loadUserData();
    }, []);

    const Card = ({ item }) => {
        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}
                onPress={() =>
                    navigation.navigate("TransferNFTScreen", {
                        data,
                        item,
                    })
                }
            >
                <View style={styles.card}>
                    <View style={{ alignItems: "center", top: 10 }}>
                        <Image
                            source={{ uri: item.image }}
                            style={{ height: 120, width: 120 }}
                        />
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            ID : {item.id}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: COLORS.grey,
                                marginTop: 2,
                            }}
                        >
                            {item.name}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.secondary}
                barStyle="light-content"
            />
            <View style={styles.header}>
                <FontAwesome name="user-o" color={colors.text} size={20} />
                <Text style={styles.text_header}>{data.username}</Text>
                <Text style={styles.text_header}>Balance {balance}</Text>
                <View flexDirection="row">
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() =>
                            navigation.navigate("TransferScreen", { data })
                        }
                    >
                        <Icon name="send" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => navigation.navigate("QR Code", { data })}
                    >
                        <FontAwesome name="user-o" size={20} />
                    </TouchableOpacity>
                </View>
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
                    Tokens
                </Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} />
                    <Text style={styles.textInput}> {balance} </Text>
                    <Animatable.View animation="bounceIn">
                        <Text style={styles.textInput}> {symbol} </Text>
                    </Animatable.View>
                </View>
                <Text
                    style={[
                        styles.text_footer,
                        {
                            color: colors.text,
                        },
                    ]}
                >
                    NFT
                </Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} />
                    <Text style={styles.textInput}> 1 NFT </Text>
                    <Animatable.View animation="bounceIn">
                        <Text style={styles.textInput}> {symbol} </Text>
                    </Animatable.View>
                </View>
                {refreshing ? (
                    <ActivityIndicator size="large" color="#00ff00" />
                ) : null}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={nft}
                    renderItem={({ item }) => <Card item={item} />}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={loadUserData}
                        />
                    }
                />
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
                        onPress={() => onSignOut()}
                    >
                        <Text
                            style={[
                                styles.textSign,
                                {
                                    color: COLORS.primary,
                                },
                            ]}
                        >
                            Sign Out
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    header: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        marginTop: 50,
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
        fontSize: 20,
        margin: 5,
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
    card: {
        height: 180,
        width: cardWidth,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 50,
        borderRadius: 15,
        elevation: 13,
        backgroundColor: COLORS.white,
    },
    iconContainer: {
        backgroundColor: COLORS.white,
        margin: 16,
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
    },
    categoriesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 16,
    },
});
