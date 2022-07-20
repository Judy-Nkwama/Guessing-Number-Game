import React from "react";
import {View, Text, StyleSheet, StatusBar, Platform} from "react-native";

StatusBar.setBarStyle("light-content");

export default function Header(props){
    return(
        <View style={styles.header}>
            <Text  style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
}
  

const styles = StyleSheet.create({
    header : {
        width : "100%",
        height : 90,
        paddingTop : 25,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#0cb5ee",
        borderBottomWidth : Platform.OS === "android" ? 2 : 0,
        borderBottomColor : Platform.OS === "android" ? "navy" : "transparent"
    }, 
    headerTitle : {
        color : "white",
        fontSize : 20,
        fontFamily : "myFont1"
    }
});