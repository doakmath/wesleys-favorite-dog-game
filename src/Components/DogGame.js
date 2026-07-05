import React from "react";
import { useState, useEffect } from "react";
import "./DogGameStyles.css";

const DogGame = () => {
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [choice4, setChoice4] = useState("");
  const [choice5, setChoice5] = useState("");
  const [choice6, setChoice6] = useState("");
  const [dog1, setDog1] = useState("");
  const [dog2, setDog2] = useState("");
  const [dog3, setDog3] = useState("");
  const [winner, setWinner] = useState("");
  const [counter, setCounter] = useState(0);
  const [breed1, setBreed1] = useState("");
  const [breed2, setBreed2] = useState("");
  const [breed3, setBreed3] = useState("");
  const [breed4, setBreed4] = useState("");
  const [breed5, setBreed5] = useState("");
  const [breed6, setBreed6] = useState("");
  const [winnerBreed, setWinnerBreed] = useState("");
  const [dog1Breed, setDog1Breed] = useState("");
  const [dog2Breed, setDog2Breed] = useState("");
  const [dog3Breed, setDog3Breed] = useState("");

  useEffect(() => {
    fetchDogData();
  }, []);

  const fetchDogData = async () => {
    const url =
      "https://api.thedogapi.com/v1/images/search?limit=6&has_breeds=1";
    const response = await fetch(url);
    try {
      if (response.ok) {
        const data = await response.json();
        setChoice1(data[0].url);
        setChoice2(data[1].url);
        setChoice3(data[2].url);
        setChoice4(data[3].url);
        setChoice5(data[4].url);
        setChoice6(data[5].url);
        setBreed1(data[0].breeds?.[0]?.name || "Breed unknown");
        setBreed2(data[1].breeds?.[0]?.name || "Breed unknown");
        setBreed3(data[2].breeds?.[0]?.name || "Breed unknown");
        setBreed4(data[3].breeds?.[0]?.name || "Breed unknown");
        setBreed5(data[4].breeds?.[0]?.name || "Breed unknown");
        setBreed6(data[5].breeds?.[0]?.name || "Breed unknown");
      }
    } catch (error) {
      console.error("error retrieving api data", error);
    }
  };

  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <div className="game-container">
        <h1 className="game-title">Wesley's Dog Game</h1>
        {counter === 0 && (
          <div>
            <button
              onClick={() => {
                increaseCounter();
              }}
            >
              Start Game
            </button>
          </div>
        )}
        {counter === 1 && (
          <>
            <div>
              <h1>Choose your favorite!</h1>
            </div>
            <div className="image-grid">
              <button
                onClick={() => {
                  increaseCounter();
                  setDog1(choice1);
                  setDog1Breed(breed1);
                }}
              >
                <img src={choice1} alt="dog1" />
              </button>
              <button
                onClick={() => {
                  increaseCounter();
                  setDog1(choice2);
                  setDog1Breed(breed2);
                }}
              >
                <img src={choice2} alt="dog2" />
              </button>
            </div>
          </>
        )}
        {counter === 2 && (
          <>
            <div>
              <h1>Choose your favorite!</h1>
            </div>
            <div className="image-grid">
              <button
                onClick={() => {
                  increaseCounter();
                  setDog2(choice3);
                  setDog2Breed(breed3);
                }}
              >
                <img src={choice3} alt="dog3" />
              </button>
              <button
                onClick={() => {
                  increaseCounter();
                  setDog2(choice4);
                  setDog2Breed(breed4);
                }}
              >
                <img src={choice4} alt="dog4" />
              </button>
            </div>
          </>
        )}
        {counter === 3 && (
          <>
            <div>
              <h1>Choose your favorite!</h1>
            </div>
            <div className="image-grid">
              <button
                onClick={() => {
                  increaseCounter();
                  setDog3(choice5);
                  setDog3Breed(breed5);
                }}
              >
                <img src={choice5} alt="dog5" />
              </button>
              <button
                onClick={() => {
                  increaseCounter();
                  setDog3(choice6);
                  setDog3Breed(breed6);
                }}
              >
                <img src={choice6} alt="dog6" />
              </button>
            </div>
          </>
        )}
        {counter === 4 && (
          <>
            <div>
              <h1>Choose your favorite!</h1>
            </div>
            <div className="image-grid">
              <button
                onClick={() => {
                  increaseCounter();
                  setWinner(dog1);
                  setWinnerBreed(dog1Breed);
                }}
              >
                <img src={dog1} alt="winner dog 1" />
              </button>
              <button
                onClick={() => {
                  increaseCounter();
                  setWinner(dog2);
                  setWinnerBreed(dog2Breed);
                }}
              >
                <img src={dog2} alt="winner dog 2" />
              </button>
            </div>
          </>
        )}
        {counter === 5 && (
          <>
            <div>
              <h1>Choose your favorite!</h1>
            </div>
            <div className="image-grid">
              <button
                onClick={() => {
                  increaseCounter();
                }}
              >
                <img src={winner} alt="winner dog" />
              </button>
              <button
                onClick={() => {
                  increaseCounter();
                  setWinner(dog3);
                  setWinnerBreed(dog3Breed);
                }}
              >
                <img src={dog3} alt="winner dog 3" />
              </button>
            </div>
          </>
        )}
        {counter === 6 && (
          <div className="winner-container">
            <div className="winner-image">
              <h2>Winner!</h2>
              <img src={winner} alt="winner dog" />
              <h3>Breed: {winnerBreed}</h3>
              <div className="play-again-button">
                <button
                  onClick={() => {
                    setWinner("");
                    setWinnerBreed("");
                    setDog1("");
                    setDog2("");
                    setDog3("");
                    setDog1Breed("");
                    setDog2Breed("");
                    setDog3Breed("");

                    fetchDogData();
                    setCounter(1);
                  }}
                >
                  Play Again?
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DogGame;
