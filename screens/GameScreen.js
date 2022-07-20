import React, {useState, useRef, useEffect} from "react";
import {View, Text, StyleSheet, Alert, ScrollView, Dimensions} from "react-native";
import MeanNumber from "../components/MeanNumber";
import Card from "../components/Card";
import Bouton from "../components/Bouton";
import Colors from "../constants/Colors";
import GuessItem from "../components/GuessItem";
import MyText from "../components/MyText";


const TRY_BIGGER = true, TRY_SMALLER = false;

const genGuessNumber = (min, max, exclude) => {
    min = Math.ceil(min); 
    max = Math.floor(max);
    const guess = Math.floor((Math.random() * (max - min)) + min);
    if(guess == exclude){
        genGuessNumber(min, max, exclude);
    }
    return guess;
}


const GameScreen = props => {
    const firstGuess = genGuessNumber(1, 100, props.useChoice);
    const [currentGuess, setCurrentGuess] = useState(firstGuess);
    let currentGuesses = useRef([]);
    const tryNbr = useRef(0);
    const closestHigher = useRef(100), closestLower = useRef(1);

    const [editableStyles, setEditableStyles] = useState(      
        () => {
		    if(Dimensions.get("window").height < 450){
                return {div2Direction : "row", div2JContent : "center", div2DalignItems : "center", cardWidth: "55%", cardWidth2: "35%",  inputZonePR : 10}; 	
            }else{
                return {div2Direction : "column", div2JContent : "center", div2DalignItems : "center", cardWidth: "100%"}
            }
        }
    );

    useEffect(() => {
    const widthHandler = () => {
		if(Dimensions.get("window").height < 450){
			setEditableStyles({div2Direction : "row", div2JContent : "center", div2DalignItems : "center", cardWidth: "55%", cardWidth2: "35%",  inputZonePR : 10}); 	
		}else{
			setEditableStyles({div2Direction : "column", div2JContent : "center", div2DalignItems : "center", cardWidth: "100%", cardWidth2: "100%", inputZonePR : 0});
		}
    };
    Dimensions.addEventListener("change", widthHandler);
    return () => {
      Dimensions.removeEventListener("change", widthHandler);
    };
  });

    const newGuestHandler = direction => {
        if((currentGuess > props.useChoice && direction) || (currentGuess < props.useChoice && !direction) ){
            Alert.alert(
                "Wacth out!",
                "We can see you. Dont cheat the computer ;)",
                [{
                    text : "Alright",
                    style : "cancel"
                }]
            );
        }else{
            if(direction){
                closestLower.current = currentGuess;
                setCurrentGuess(genGuessNumber(currentGuess + 1, closestHigher.current, -1));
            }else{
                closestHigher.current = currentGuess;
                setCurrentGuess(genGuessNumber(closestLower.current, currentGuess, -1));
            }
        }
    };

    useEffect(() => {
        tryNbr.current += 1;
        if(props.useChoice != currentGuess){
            currentGuesses.current = [
                {
                    key : (currentGuesses.current.length <= 0) ? 1 : (parseInt(currentGuesses.current[0].key) + 1),
                    state : (props.useChoice < currentGuess) ? "UPPER" : "LOWER",
                    value : currentGuess,
                },
                ...currentGuesses.current
            ];
        }
        
        if(currentGuess == props.useChoice){
            props.onEndGame({tryNbr : tryNbr.current, overview : currentGuesses.current});
        }
    });
    
    return (
        <View style={{...styles.container, flexDirection : editableStyles.div2Direction}} >
            <Card style={{...styles.computerGuessCard, width: editableStyles.cardWidth, marginRight : editableStyles.inputZonePR}}>
                <Text style={styles.guessTitle}>Computer's Guess</Text>
                <MeanNumber>{currentGuess}</MeanNumber>
                <View style={styles.boutonZone}>
                    <Bouton 
                        icon={{name:"minus-circle", color:"white", size:20}}
                        style={{...styles.buton,...{backgroundColor : Colors.secodary, width: 120}}}
                        title="Try Smaller" 
                        task={newGuestHandler.bind(this, TRY_SMALLER)}
                    />
                    <Bouton 
                        icon={{name:"plus-circle", color:"white", size:20}}
                        style={{...styles.buton,...{backgroundColor : Colors.primary, width: 120}}} 
                        title="Try Bigger" 
                        task={() => {newGuestHandler(TRY_BIGGER);}} 
                    />
                </View>
            </Card>
            <Card style={{...styles.guessCart, width: editableStyles.cardWidth2, marginRight : editableStyles.inputZonePR}}>
                <MyText style={styles.geussListTitle}>Previous Guesses</MyText>
                <ScrollView contentContainerStyle={styles.guessScrollView}>
                    {currentGuesses.current.map(geuss => {
                        return (
                            <GuessItem 
                                key={geuss.key}
                                comparison={geuss.state}
                                value={geuss.value}
                            />
                        );
                    })}
                </ScrollView>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignContent : "center",
        paddingHorizontal : 10,
    },
    computerGuessCard : {
        alignItems : "center",
        width : "80%",
    },
    guessTitle :{
        marginBottom : 5,
        fontSize : 18
    },
    boutonZone : {
        padding : 5,
        flexDirection : "row",
        justifyContent : "center",
        width : "100%",
        paddingLeft : 10
    },
    BoutonguessTitle : {
        fontSize : 18,
        fontWeight : "bold",
        textAlign : "center"
    },
    buton : {
        width : 100,
        marginRight : 5,
        color : "white"
    },
    guessCart : {
        width : "90%",
        flexGrow : 1
    },
    geussListTitle:{
        textAlign : "center",
        fontSize : 18,
        marginBottom : 3
    }
});

export default GameScreen;