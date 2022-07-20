import React from "react";
import { View, StyleSheet } from "react-native";

const Card = props => {
    return(
        <View style={{...styles.card,...props.style}}>{props.children}</View>
    );
};
const styles = StyleSheet.create({
    card : {
        marginVertical : 10,
        padding: 10,
        backgroundColor : "white",
        shadowColor : "black",
        shadowOffset : {width : 0, height : 0},
        shadowOpacity : 0.4,
        shadowRadius : 5,
        borderRadius : 5,
        elevation : 8
    }
});
export default Card;