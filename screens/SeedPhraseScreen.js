import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";

import COLORS from "../colors";

import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const SeedPhraseScreen = ({ navigation, route }) => {
    const { seed, data } = route.params;
    const Card = ({ item }) => {
        return (
            <View style={style.card}>
                <Text>
                    {item + 1} : {seed[item]}
                </Text>
            </View>
        );
    };

    return (
        <View>
            <View style={style.header}>
                <Text style={{ fontSize: 28 }}> Remember your seed phrase</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={true}
                numColumns={2}
                data={seed}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <Card item={(item, index)} />}
            />
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
                    onPress={() => navigation.navigate("Create Pin", { data })}
                >
                    <Text style={[style.textSign]}> Continue </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    card: {
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        marginLeft: 1,
        marginRight: 10,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#68a0cf",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#fff",
    },
    button: {
        alignItems: "center",
        marginTop: 50,
    },
    signIn: {
        width: "200%",
        height: 50,
        backgroundColor: "#68a0cf",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    textSign: {
        fontSize: 28,
        fontWeight: "normal",
    },
});

export default SeedPhraseScreen;
