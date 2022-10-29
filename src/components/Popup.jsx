import React, { useEffect } from "react";
import { checkWin } from "../utils/Helpers";
import success from "../utils/sound/success.mp3";
import fail from "../utils/sound/fail.wav";

const Popup = (props) => {
  const { correctLetters, wrongLetters, selectedWord, setPlayable, playAgain } =
    props;

  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playable = true;

  if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
    finalMessage = "Congratulations! You won! 😃";
    playable = false;
    const successAudio = new Audio(success);
    successAudio.volume = 0.6;
    successAudio.play();
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === "lose") {
    finalMessage = "Game over ! 😕";
    finalMessageRevealWord = `The correct word was : ${selectedWord}`;
    playable = false;
    const failAudio = new Audio(fail);
    failAudio.volume = 0.3;
    failAudio.play();
  }

  useEffect(() => {
    setPlayable(playable);
  });

  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
