import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Colors from "../constants/Colors";

const MeanNumber = props => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        borderWidth : 4,
        borderColor : Colors.secodary,
        width : 60,
        height : 60,
        borderRadius : 60,
        alignItems : "center",
        justifyContent : "center",
        marginVertical : 5
    },
    text : {
        color : Colors.primary,
        fontSize : 25,
        fontWeight : "bold"      
    }
});

export default MeanNumber;