import React, { useEffect, useState } from "react";
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

  const [breed1, setBreed1] = useState("");
  const [breed2, setBreed2] = useState("");
  const [breed3, setBreed3] = useState("");
  const [breed4, setBreed4] = useState("");
  const [breed5, setBreed5] = useState("");
  const [breed6, setBreed6] = useState("");

  const [dog1Breed, setDog1Breed] = useState("");
  const [dog2Breed, setDog2Breed] = useState("");
  const [dog3Breed, setDog3Breed] = useState("");
  const [winnerBreed, setWinnerBreed] = useState("");

  const [counter, setCounter] = useState(0);

  // NEW: loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Keeping hardcoded for now as requested
  const apiKey =
    "live_2FBczWeKHFILBa1gYqDBX1uSB0gqCwSxbSzNfW9Ge74stZIeNeVPBQijYF5heZH4";

  const clearTournamentState = () => {
    setDog1("");
    setDog2("");
    setDog3("");
    setWinner("");

    setDog1Breed("");
    setDog2Breed("");
    setDog3Breed("");
    setWinnerBreed("");
  };

  // Fetch one valid image for a breed
  const fetchImageForBreed = async (breed) => {
    const imageResponse = await fetch(
      `https://api.thedogapi.com/v1/images/search?breed_ids=${breed.id}&limit=1`,
      {
        headers: {
          "x-api-key": apiKey,
        },
      }
    );

    if (!imageResponse.ok) {
      throw new Error(
        `Image request failed for ${breed.name}: ${imageResponse.status}`
      );
    }

    const imageData = await imageResponse.json();

    const imageUrl = imageData?.[0]?.url;

    // Some breeds may not return an image
    if (!imageUrl) {
      return null;
    }

    return {
      name: breed.name,
      imageUrl,
    };
  };

  const fetchDogData = async () => {
    setLoading(true);
    setError("");

    try {
      // Get all breeds
      const breedResponse = await fetch(
        "https://api.thedogapi.com/v1/breeds",
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );

      if (!breedResponse.ok) {
        throw new Error(
          `Breed request failed: ${breedResponse.status}`
        );
      }

      const breeds = await breedResponse.json();

      const validBreeds = breeds.filter(
        (breed) => breed?.id && breed?.name
      );

      // Shuffle the breed list
      const shuffledBreeds = [...validBreeds].sort(
        () => Math.random() - 0.5
      );

      const dogs = [];

      /*
        Keep trying breeds until we actually have
        SIX dogs with valid image URLs.

        This prevents the API from giving us an
        empty image and breaking the game.
      */
      for (const breed of shuffledBreeds) {
        if (dogs.length >= 6) {
          break;
        }

        try {
          const dog = await fetchImageForBreed(breed);

          if (dog) {
            dogs.push(dog);
          }
        } catch (imageError) {
          console.warn(
            `Skipping ${breed.name}:`,
            imageError
          );
        }
      }

      if (dogs.length < 6) {
        throw new Error(
          "The Dog API did not return enough usable dog images. Please try again."
        );
      }

      // Set images
      setChoice1(dogs[0].imageUrl);
      setChoice2(dogs[1].imageUrl);
      setChoice3(dogs[2].imageUrl);
      setChoice4(dogs[3].imageUrl);
      setChoice5(dogs[4].imageUrl);
      setChoice6(dogs[5].imageUrl);

      // Set breed names
      setBreed1(dogs[0].name);
      setBreed2(dogs[1].name);
      setBreed3(dogs[2].name);
      setBreed4(dogs[3].name);
      setBreed5(dogs[4].name);
      setBreed6(dogs[5].name);
    } catch (fetchError) {
      console.error(
        "Error retrieving API data:",
        fetchError
      );

      setError(
        fetchError?.message ||
          "Unable to load dog images. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Load dogs when page first opens
  useEffect(() => {
    fetchDogData();
  }, []);

  const increaseCounter = () => {
    setCounter((currentCounter) => currentCounter + 1);
  };

  /*
    Handles genuine image-loading failures.

    Instead of displaying the browser's ugly
    broken-image icon, hide that image.
  */
  const imageProps = (src, alt) => ({
    src,
    alt,

    onError: (event) => {
      event.currentTarget.style.visibility = "hidden";
    },

    onLoad: (event) => {
      event.currentTarget.style.visibility = "visible";
    },
  });

  return (
    <>
      <div className="game-container">
        <h1 className="game-title">
          Wesley's Favorite Dog Game
        </h1>

        {/* START SCREEN */}
        {counter === 0 && (
          <div>
            {loading && (
              <p>Loading dogs...</p>
            )}

            {!loading && error && (
              <div>
                <p>{error}</p>

                <button onClick={fetchDogData}>
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && (
              <button onClick={increaseCounter}>
                Start Game
              </button>
            )}
          </div>
        )}

        {/* ROUND 1 */}
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
                <img
                  {...imageProps(
                    choice1,
                    breed1 || "dog 1"
                  )}
                />
              </button>

              <button
                onClick={() => {
                  increaseCounter();
                  setDog1(choice2);
                  setDog1Breed(breed2);
                }}
              >
                <img
                  {...imageProps(
                    choice2,
                    breed2 || "dog 2"
                  )}
                />
              </button>
            </div>
          </>
        )}

        {/* ROUND 2 */}
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
                <img
                  {...imageProps(
                    choice3,
                    breed3 || "dog 3"
                  )}
                />
              </button>

              <button
                onClick={() => {
                  increaseCounter();
                  setDog2(choice4);
                  setDog2Breed(breed4);
                }}
              >
                <img
                  {...imageProps(
                    choice4,
                    breed4 || "dog 4"
                  )}
                />
              </button>
            </div>
          </>
        )}

        {/* ROUND 3 */}
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
                <img
                  {...imageProps(
                    choice5,
                    breed5 || "dog 5"
                  )}
                />
              </button>

              <button
                onClick={() => {
                  increaseCounter();
                  setDog3(choice6);
                  setDog3Breed(breed6);
                }}
              >
                <img
                  {...imageProps(
                    choice6,
                    breed6 || "dog 6"
                  )}
                />
              </button>
            </div>
          </>
        )}

        {/* SEMIFINAL */}
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
                <img
                  {...imageProps(
                    dog1,
                    dog1Breed || "winner dog 1"
                  )}
                />
              </button>

              <button
                onClick={() => {
                  increaseCounter();
                  setWinner(dog2);
                  setWinnerBreed(dog2Breed);
                }}
              >
                <img
                  {...imageProps(
                    dog2,
                    dog2Breed || "winner dog 2"
                  )}
                />
              </button>
            </div>
          </>
        )}

        {/* FINAL */}
        {counter === 5 && (
          <>
            <div>
              <h1>Choose your favorite!</h1>
            </div>

            <div className="image-grid">
              <button
                onClick={increaseCounter}
              >
                <img
                  {...imageProps(
                    winner,
                    winnerBreed ||
                      "current tournament winner"
                  )}
                />
              </button>

              <button
                onClick={() => {
                  increaseCounter();
                  setWinner(dog3);
                  setWinnerBreed(dog3Breed);
                }}
              >
                <img
                  {...imageProps(
                    dog3,
                    dog3Breed || "winner dog 3"
                  )}
                />
              </button>
            </div>
          </>
        )}

        {/* WINNER */}
        {counter === 6 && (
          <div className="winner-container">
            <div className="winner-image">
              <h2>Winner!</h2>

              <img
                {...imageProps(
                  winner,
                  winnerBreed || "winning dog"
                )}
              />

              <h3>
                Breed: {winnerBreed}
              </h3>

              <div className="play-again-button">
                <button
                  onClick={async () => {
                    /*
                      IMPORTANT:

                      Go back to loading screen FIRST.
                      Then get six fresh valid dogs.

                      This prevents the next game from
                      starting with stale/empty images.
                    */
                    clearTournamentState();

                    setCounter(0);

                    await fetchDogData();
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
