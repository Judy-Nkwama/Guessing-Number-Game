import React, {useState, useEffect} from "react";
import { ScrollView, View, StyleSheet, Image, Dimensions, Alert } from "react-native";
import Bouton from "../components/Bouton";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import MyText from "../components/MyText";
import GuessItem from "../components/GuessItem";

    const GameOverScreen = (props) => {

    const [editableStyles, setEditableStyles] = useState(
        {div2Direction : "column", div2JContent : "center", div2DalignItems : "center", cardWidth: "100%"}
    );

    useEffect(() => {
        const widthHandler = () => {
            if(Dimensions.get("window").height < 450){
                setEditableStyles({div2Direction : "row", div2JContent : "center", div2DalignItems : "center", cardWidth: "48%", inputZonePR : 10}); 	
            }else{
                setEditableStyles({div2Direction : "column", div2JContent : "center", div2DalignItems : "center", cardWidth: "100%", inputZonePR : 0});
            }
        };
        Dimensions.addEventListener("change", widthHandler);
        return () => {
            Dimensions.removeEventListener("change", widthHandler);
        };
    });

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{flexDirection : editableStyles.div2Direction, justifyContent: "center", alignItems: "center"}}>

            <View style={{width: editableStyles.cardWidth, marginRight : editableStyles.inputZonePR, alignItems: "center"}}>
                <Card style={styles.goTitleContainer}>
                <MyText style={styles.goTitleText}>Game's Over!</MyText>
                </Card>
                <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require("../assets/success.png")}
                    resizeMode="cover"
                />
                </View>
            </View>

            <View style={{...styles.resultContainer, width: editableStyles.cardWidth, justifyContent: "center"}}>
                <View style={styles.lineResult}>
                    <MyText style={styles.resultItem}>Chosen Number : </MyText>
                    <MyText style={styles.resultVal}>{props.chosenNum}</MyText>
                </View>
                <View style={styles.lineResult}>
                    <MyText style={styles.resultItem}>Trials Number : </MyText>
                    <MyText style={styles.resultVal}>{props.tryNbr}</MyText>
                </View>
                <Bouton
                icon={{ name: "play-circle", color: "white", size: 20 }}
                title="Start a new Gamme"
                style={{
                    ...styles.buttonView,
                    backgroundColor: Colors.primary,
                    fontFamily: "myFont2",
                }}
                task={() => {
                    props.onStartNewGame();
                }}
                />
            </View>
        </View>



        <ScrollView style={styles.guessScrollView}>
          <MyText style={styles.geussListTitle}>Overview</MyText>
          <Card style={styles.guessCart}>
            {props.overview.map((geuss) => {
              return (
                <GuessItem
                  key={geuss.key}
                  comparison={geuss.state}
                  value={geuss.value}
                />
              );
            })}
          </Card>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  goTitleContainer: {
    alignItems: "center",
    padding: 10,
    width: "80%",
  },
  goTitleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resultContainer: {
    padding: 10,
    width: "80%",
    minWidth: 270,
    maxWidth: "95%",
    padding: 10,
    marginVertical: 5,
    borderWidth: 3,
    borderRadius: 2,
    borderColor: Colors.secodary,
  },
  lineResult: {
    flexDirection: "row",
    justifyContent: "center",
  },
  resultItem: {
    width: "60%",
    color: Colors.secodary,
    paddingEnd: 3,
  },
  resultVal: {
    width: "30%",
    color: Colors.primary,
    paddingStart: 3,
  },
  buttonView: {
    color: "white",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderColor: Colors.secodary,
    borderWidth: 2,
    borderRadius: 75,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height <= 600 ? 10 : 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  guessScrollView: {
    width: "90%",
    padding: 10,
  },
  geussListTitle: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 3,
  },
});

export default GameOverScreen;
