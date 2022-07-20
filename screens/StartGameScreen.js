import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from "react-native";

import Card from "../components/Card";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import Bouton from "../components/Bouton";
import MeanNumber from "../components/MeanNumber";

const StartGameScreen = (props) => {
  const [typedNumber, setTypedNumber] = useState("");
  const [userHasConfirmedNumber, setUserHasConfirmedNumber] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const [editableStyles, setEditableStyles] = useState(
		{div2Direction : "column", div2JContent : "center", div2DalignItems : "center", cardWidth: "100%"}
  );

  useEffect(() => {
    const widthHandler = () => {
		if((Dimensions.get("window").height < 450) && userHasConfirmedNumber){
			setEditableStyles({div2Direction : "row", div2JContent : "center", div2DalignItems : "center", cardWidth: "50%", inputZonePR : 10}); 	
		}else{
			setEditableStyles({div2Direction : "column", div2JContent : "center", div2DalignItems : "center", cardWidth: "100%", inputZonePR : 0});
		}
    };
    Dimensions.addEventListener("change", widthHandler);
    return () => {
      Dimensions.removeEventListener("change", widthHandler);
    };
  });
  let confirmedOutput;

  const handleTypedNumber = (number) => {
    setTypedNumber(number.replace(/[^0-9]/g, ""));
  };

  const handleResetTypedNumber = () => {
	setEditableStyles({div2Direction : "column", div2JContent : "center", div2DalignItems : "center", cardWidth: "100%", inputZonePR : 0});
    setTypedNumber("");
    setUserHasConfirmedNumber(false);
  };

  const handleConfirmTypedNumber = () => {
    if (isNaN(typedNumber) || typedNumber <= 0) {
      Alert.alert("Invalid Input!", "You can only enter values from 1 to 99", [
        {
          text: "Okay",
          style: "default",
          onPress: confirmedOutput ? () => {} : handleResetTypedNumber,
        },
      ]);
      return;
    }
	if(Dimensions.get("window").height < 450){
		setEditableStyles({div2Direction : "row", div2JContent : "center", div2DalignItems : "center", cardWidth: "50%", inputZonePR : 10}); 
	}
    setUserHasConfirmedNumber(true);
    setSelectedNumber(parseInt(typedNumber));
    setTypedNumber("");
  };

  if (userHasConfirmedNumber) {
    confirmedOutput = (
      <Card style={styles.selectedNumber}>
        <Text style={styles.selectedNumberTitle}> The user selected </Text>
        <MeanNumber style={styles.meanNumber}>{selectedNumber}</MeanNumber>
        <Bouton
          icon={{ name: "play-circle", color: "white", size: 20 }}
          title="Start Gamme"
          style={{
            ...styles.buttonView,
            backgroundColor: Colors.primary,
            width: 130,
          }}
          task={() => {
            props.onStartGame(selectedNumber);
          }}
        />
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View
            style={styles.screen}
          >
            <Text style={styles.screenTitle}>Start a new Gamme!</Text>
            <View style={{flexDirection : editableStyles.div2Direction, justifyContent : editableStyles.div2JContent}}>
              <Card
                style={{...styles.inputZone, width: editableStyles.cardWidth, marginRight : editableStyles.inputZonePR}}
              >
                <Text style={styles.entete}>Enter a number</Text>

                <Input
                  style={styles.guessInput}
                  placeholder="Enter your guess here"
                  blurOnSubmit
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="number-pad"
                  maxLength={2}
                  value={typedNumber}
                  onChangeText={handleTypedNumber}
                />
                <View style={styles.buttonsContainer}>
                  <Bouton
                    icon={{ name: "times-circle", color: "white", size: 20 }}
                    title="Reset"
                    style={{
                      ...styles.buttonView,
                      backgroundColor: Colors.secodary,
                    }}
                    task={handleResetTypedNumber}
                  />
                  <Bouton
                    icon={{ name: "check-circle", color: "white", size: 20 }}
                    title="Confirm"
                    style={{
                      ...styles.buttonView,
                      backgroundColor: Colors.primary,
                    }}
                    task={handleConfirmTypedNumber}
                  />
                </View>
              </Card>
              <View>{confirmedOutput}</View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  screenTitle: {
    width: "100%",
    fontSize: 18,
    fontFamily: "myFont1",
    textAlign: "center",
  },
  inputZone: {
    alignItems: "center",
    fontFamily: "myFont2",
  },
  guessInput: {
    width: "75%",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonsContainer: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingLeft: 10,
  },
  buttonView: {
    width: 100,
    marginRight: 5,
    color: "white",
  },
  selectedNumber: {
    alignItems: "center",
  },
  selectedNumberTitle: {
    fontSize: 15,
    fontFamily: "myFont1",
  },
});

export default StartGameScreen;
