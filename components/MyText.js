import React from "react";
import {Text, StyleSheet } from "react-native";

export default function MyText(props){
    return <Text {...props} style={{...styles.text,...props.style}}>{props.children}</Text>;
}

const styles = StyleSheet.create({
    text : {
        fontFamily : "myFont2",
        fontSize : 15,
    }
});