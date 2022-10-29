import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HangmanBody from "./components/HangmanBody";
import wordsToGuess from "./utils/wordsToGuess";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";
import Popup from "./components/Popup";
import Notifications from "./components/Notifications";
import { showNotification as show } from "./utils/Helpers";
import "./App.css";
import keyPress from "./utils/sound/keyPress.wav";

let selectedWord =
  wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
        let keyPressSound = new Audio(keyPress);
        keyPressSound.play();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  const playAgain = () => {
    setPlayable(true);

    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * wordsToGuess.length);
    selectedWord = wordsToGuess[random];
  };

  return (
    <>
      <Header />
      <div className="game-container">
        <HangmanBody wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notifications showNotification={showNotification} />
    </>
  );
}

export default App;
