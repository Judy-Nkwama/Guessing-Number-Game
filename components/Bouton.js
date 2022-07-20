import React from "react";
import { View, Text, TouchableOpacity,  StyleSheet} from "react-native";
import { FontAwesome, Io} from "@expo/vector-icons";


const Bouton = props => {
    let icon = null;
    if(props.icon){
        icon = <FontAwesome name={props.icon.name} color={props.icon.color} size={props.icon.size} />;
    }
    return (
        <TouchableOpacity onPress={props.task}>
            <View style={{...styles.bouton,...props.style}}>
                <Text style = {{...styles.buttonText,...props.style ? {color : props.style.color} : {color : "#389af5"}}}>{props.title}</Text>
                {icon}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    bouton : {
        flexDirection : "row",
        justifyContent : "center",
        paddingVertical : 7,
        elevation : 3,
        borderRadius : 10,
    },
    buttonText:{
        fontFamily : "myFont1",
        marginHorizontal : 5
    }
});

export default Bouton;