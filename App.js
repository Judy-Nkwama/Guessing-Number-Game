import React, {useState} from 'react';
import { Alert, StyleSheet, View, SafeAreaView } from 'react-native';
import Header from './components/appHeader';
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as FontUtilities from "expo-font";
import AppLoading from 'expo-app-loading';

const fontLoader = () => {
  return FontUtilities.loadAsync(
    {
      "myFont1" : require("./assets/fonts/OpenSans-Bold.ttf"),
      "myFont2" : require("./assets/fonts/OpenSans-Regular.ttf")
    }
  );
};

export default function App() {
  
  const [gameNumber, setGameNumber] = useState();
  const [actifScreen, setActifScreen] = useState();
  const [result, setResult] = useState();
  const [fontsAreLoaded, setFontsAreLoaded] = useState(false);

  if(!fontsAreLoaded){
    return <AppLoading 
      startAsync={fontLoader}
      onFinish={() => {setFontsAreLoaded(true);}}
      onError={
        (errorMess) => {
          Alert.alert("Error!","' " + errorMess + "' error occured when requesting some data for the App. Can you please re-start your app?",[{
            text : "Okay", style:"cancel"
          }]);
        }
      }
    />
  }

  const startGameHandler = number => {
    setGameNumber(parseInt(number));
    setActifScreen("gameScreen");
  };

  const gaveOverHandler = result => {
    setResult(result);
    setActifScreen("gameOverScreen");
  }

  const newGameHandler = () => {
    setGameNumber(undefined);
    setActifScreen(undefined);
    setResult(undefined);
  }

  let content;
  if(gameNumber && actifScreen == "gameScreen"){
    content = <GameScreen useChoice={gameNumber} onEndGame={gaveOverHandler}/>;
  }else if(actifScreen == "gameOverScreen"){
    content = <GameOverScreen tryNbr={result.tryNbr} overview={result.overview} chosenNum={gameNumber} onStartNewGame={newGameHandler}/>;
  }else{
    content = <StartGameScreen onStartGame={startGameHandler}/>;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a number"/>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen : {
    flex: 1,
  }
});
