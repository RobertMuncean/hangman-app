import React from "react";

const Word = (props) => {
  const { selectedWord, correctLetters } = props;

  return (
    <div className="word">
      {selectedWord.split("").map((letter, index) => {
        return (
          <span className="letter" key={index}>
            {correctLetters.includes(letter) ? letter : ""}
          </span>
        );
      })}
    </div>
  );
};

export default Word;
