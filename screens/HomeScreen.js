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
import { getBalance, createWallet, getSymbol } from "../utility/web3Call";
const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const HomeScreen = ({ navigation, route }) => {
    const { data } = route.params;
    const [balance, setBalance] = useState("");
    const [symbol, setSymbol] = useState("");
    const { colors } = useTheme();
    const [refreshing, setRefreshing] = useState(true);

    const loadUserData = async () => {
        setRefreshing(false);
        const newBalance = await getBalance(data.wallet_Address);
        const currencySymbol = await getSymbol();
        console.log(newBalance.toString());
        setBalance(newBalance.toString());
        setSymbol(currencySymbol.toString());
    };

    useEffect(async () => {
        await loadUserData();
    }, []);

    const nft = [
        {
            id: "1",
            name: "Axie 1",
            ingredients: "Axie infinity",
            price: "1000$",
            image: require("../assets/axie1.png"),
        },
    ];

    const Card = ({ item }) => {
        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}
            >
                <View style={styles.card}>
                    <View style={{ alignItems: "center", top: 10 }}>
                        <Image
                            source={item.image}
                            style={{ height: 120, width: 120 }}
                        />
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            {item.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: COLORS.grey,
                                marginTop: 2,
                            }}
                        >
                            {item.ingredients}
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            marginHorizontal: 20,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            {item.price.toLocaleString("en-US")} đ
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
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() =>
                        navigation.navigate("TransferScreen", { data })
                    }
                >
                    <Icon name="send" size={20} />
                </TouchableOpacity>
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
        height: 220,
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
