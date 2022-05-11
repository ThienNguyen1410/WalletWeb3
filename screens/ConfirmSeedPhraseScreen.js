import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
} from "react-native";

import COLORS from "../colors";

import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const ConfirmSeedPhraseScreen = ({ navigation, route }) => {
    const { seed, data } = route.params;
    console.log(seed);
    var confirmSeed = [];

    const onTextInputChange = (val) => {
        if (val.trim().length > 0) {
            confirmSeed.push(val);
            console.log(confirmSeed);
        } else {
            Alert.alert("Empty Field", "Field is empty", [{ text: "Okay" }]);
            return;
        }
    };
    const validSeedPhrase = () => {
        if (JSON.stringify(seed) === JSON.stringify(confirmSeed)) {
            return true;
        } else {
            return false;
        }
    };
    const onHandleConfirm = () => {
        if (validSeedPhrase()) {
            navigation.navigate("Create Pin", { data });
        } else {
            Alert.alert(
                "Wrong Seed Phrase",
                "Seed Phrases are incorrect, Please try again !"
            );
            confirmSeed = [];
        }
    };
    console.log(confirmSeed);
    const Card = ({ item }) => {
        return (
            <View style={style.card}>
                <Text> {item + 1} : </Text>
                <TextInput
                    placeholder="Phrase"
                    placeholderTextColor="#666666"
                    autoCapitalize="none"
                    onEndEditing={(e) => onTextInputChange(e.nativeEvent.text)}
                />
            </View>
        );
    };

    return (
        <View>
            <View style={style.header}>
                <Text style={{ fontSize: 28 }}> Confirm Your Seed Phrase </Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
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
                    onPress={() => onHandleConfirm()}
                >
                    <Text style={[style.textSign]}> Confirm </Text>
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
        flexDirection: "row",
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
        borderRadius: 10,
    },
    textSign: {
        fontSize: 28,
        fontWeight: "normal",
    },
});

export default ConfirmSeedPhraseScreen;
