import React from 'react';
import {useState, useEffect} from 'react';
import './DogGameStyles.css'

const DogGame = () => {
    const [choice1, setChoice1] = useState('');
    const [choice2, setChoice2] = useState('');
    const [choice3, setChoice3] = useState('');
    const [choice4, setChoice4] = useState('');
    const [choice5, setChoice5] = useState('');
    const [choice6, setChoice6] = useState('');
    const [dog1, setDog1] = useState('');
    const [dog2, setDog2] = useState('');
    const [dog3, setDog3] = useState('');
    const [winner, setWinner] = useState('');
    const [counter, setCounter] = useState(0);


    useEffect(() => {
        fetchDogData()
    }, [])

    const fetchDogData = async () => {
        const url = 'https://api.thedogapi.com/v1/images/search?limit=6';
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
            }
        } catch (error) {
            console.error("error retrieving api data", error);
        }
    }

    const increaseCounter = () => {
        setCounter(counter + 1);
    }

    const extractBreedFromImageUrl = (url) => {
        const parts = url.split('/');
        // Find the index of the part containing 'breeds'
        const breedsIndex = parts.findIndex(part => part === 'breeds');
        // Extract the breed name from the next part after 'breeds'
        if (breedsIndex !== -1 && parts.length > breedsIndex + 1) {
            return parts[breedsIndex + 1];
        } else {
            return 'Breed not found';
        }
    }


    return(
        <>
        <div className="game-container">
            <h1 className="game-title">Wesley's Dog Game</h1>
            {counter === 0 &&
            <div>
                <button
                    onClick={() => {
                        increaseCounter();
                    }}>
                        Start Game
                </button>
            </div>}
            {counter === 1 &&
            <>
            <div>
                <h1>Choose your favorite!</h1>
            </div>
            <div className="image-grid">
                <button
                    onClick={() => {
                        increaseCounter();
                        setDog1(choice1);
                    } }><img src={choice1} alt='dog1' />
                </button>
                <button
                    onClick={() => {
                        increaseCounter();
                        setDog1(choice2);
                    } }><img src={choice2} alt='dog2' />
                </button>
            </div>
            </>
            }
            {counter === 2 &&
            <>
            <div>
                <h1>Choose your favorite!</h1>
            </div>
            <div className = "image-grid">
                <button
                    onClick = {() => {
                        increaseCounter();
                        setDog2(choice3);
                    }}><img src={choice3} alt='dog3' />
                </button>
                <button
                    onClick = {() => {
                        increaseCounter();
                        setDog2(choice4);
                    }}><img src={choice4} alt='dog4' />
                </button>
            </div>
            </>
            }
            {counter === 3 &&
            <>
            <div>
                <h1>Choose your favorite!</h1>
            </div>
            <div className = "image-grid">
                <button
                    onClick = {() => {
                        increaseCounter();
                        setDog3(choice5);
                    }}><img src={choice5} alt='dog5' />
                </button>
                <button
                    onClick = {() => {
                        increaseCounter();
                        setDog3(choice6);
                    }}><img src={choice6} alt='dog6' />
                </button>
            </div>
            </>
            }
            {counter === 4 &&
            <>
            <div>
                <h1>Choose your favorite!</h1>
            </div>
            <div className = "image-grid">
                <button
                    onClick = {() => {
                        increaseCounter();
                        setWinner(dog1);
                    }}><img src={dog1} alt='winner dog 1' />
                </button>
                <button
                    onClick = {() => {
                        increaseCounter();
                        setWinner(dog2);
                    }}><img src={dog2} alt='winner dog 2' />
                </button>
            </div>
            </>
            }
            {counter === 5 &&
            <>
            <div>
                <h1>Choose your favorite!</h1>
            </div>
            <div className = "image-grid">
                <button
                    onClick = {() => {
                        increaseCounter();
                    }}><img src={winner} alt='winner dog' />
                </button>
                <button
                    onClick = {() => {
                        increaseCounter();
                        setWinner(dog3);
                    }}><img src={dog3} alt='winner dog 3' />
                </button>
            </div>
            </>
            }
            {counter === 6 &&
            <div className="winner-container">
                <div className="winner-image">
                    <h2>Winner!</h2>
                    <img src={winner} alt="winner dog" />
                    <h3>Breed: {extractBreedFromImageUrl(winner)}</h3>
                    <div className="play-again-button">
                        <button
                            onClick= {() => {
                                setCounter(1);
                                fetchDogData();
                                }
                            }>
                                Play Again?
                        </button>
                    </div>
                </div>
            </div>
            }
        </div>
        </>
    )
}

export default DogGame;
