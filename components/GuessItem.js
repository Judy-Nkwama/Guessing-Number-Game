import React from "react";
import {View, StyleSheet} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import MyText from "./MyText";


const GuessItem = props  => {
    return (
        <View style={{...styles.guessItem, backgroundColor : (props.comparison == "UPPER") ? "#fa28eb" : "#34e6fe"}}>
            <MyText style={styles.text}>{props.value}</MyText>
            <FontAwesome name={props.comparison == "UPPER" ? "arrow-up" : "arrow-down"} color="white" size={20} />
        </View>
    );
};

const styles = StyleSheet.create({
    guessItem : {
        flexDirection : "row",
        justifyContent : "space-between",
        backgroundColor : "blue",
        padding : 7,
        width : "100%",
        marginVertical : 2,
        borderRadius : 5
    },
    text : {
        color : "white",
        fontFamily : "myFont1"
    }
});


export default GuessItem;