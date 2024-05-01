import React, { useState } from "react";
import { Button, Box, Typography, Container, Grid } from "@mui/material";

function getTime(startTime) {
    const elapsedTimeMilliseconds = new Date().getTime() - startTime.getTime();
    return elapsedTimeMilliseconds / 1000;
}

function getRandomNumber(max = 20) {
    return Math.floor(Math.random() * max) + 1;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateOptions(correctAnswer) {
    const options = new Set();
    options.add(correctAnswer);
    while (options.size < 5) {
        const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
        if (wrongAnswer !== correctAnswer) {
            options.add(wrongAnswer);
        }
    }
    return shuffleArray(Array.from(options));
}

function calculateMeanTime(times) {
    if (times.length === 0) {
        return 0;
    }
    const sum = times.reduce((total, time) => total + time, 0);
    const meanTime = sum / times.length;
    return meanTime.toFixed(3);
}

function getCategory(time) {
    let category = "";
    if (time < 2) {
        category = "Mennesklig datamaskin";
    } else if (time < 4) {
        category = "Mattegeni";
    } else if (time < 7) {
        category = "B-student";
    } else if (time < 10) {
        category = "Sannsynligvis sovnet";
    } else {
        category = "High School Drop Out";
    }

    return category + "! Du brukte " + Math.floor(time) + " sekunder";
}

function MathGame() {
    const [incorrect, setIncorrect] = useState(false);
    const [category, setCategory] = useState(null);
    const [num1, setNum1] = useState(getRandomNumber());
    const [num2, setNum2] = useState(getRandomNumber());
    const [correctAnswer, setCorrectAnswer] = useState(num1 + num2);
    const [options, setOptions] = useState(generateOptions(correctAnswer));
    const [startTime, setStartTime] = useState(new Date());
    const [times, setTimes] = useState([]);

    const refreshGame = () => {
        const newNum1 = getRandomNumber();
        const newNum2 = getRandomNumber();
        setNum1(newNum1);
        setNum2(newNum2);
        setIncorrect(false);
        setCorrectAnswer(newNum1 + newNum2);
        setOptions(generateOptions(newNum1 + newNum2));
        setStartTime(new Date());
    };

    const checkAnswer = (answer) => {
        if (answer === correctAnswer) {
            const time = getTime(startTime);
            setTimes([...times, time]);
            setCategory(getCategory(time));
            refreshGame();
        } else {
            setIncorrect(true);
            setCategory(null);
        }
    };

    const newGame = () => {
        setCategory(null);
        setTimes([]);
        refreshGame();
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h5" align="center" sx={{ my: 4 }}>
                    Hva er {num1} + {num2}?
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {options.map((option, index) => (
                        <Grid item key={index}>
                            <Button
                                variant="contained"
                                onClick={() => checkAnswer(option)}
                            >
                                {option}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
                {incorrect && (
                    <Typography align="center" color="red" sx={{ my: 4 }}>
                        Prøv igjen!
                    </Typography>
                )}
                {category && (
                    <Typography align="center" sx={{ my: 4 }}>
                        {category}
                    </Typography>
                )}
                {times.length > 0 && (
                    <Typography align="center" sx={{ my: 4 }}>
                        Din snittid er {calculateMeanTime(times)} sekunder
                    </Typography>
                )}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button
                        onClick={newGame}
                        variant="outlined"
                        color="primary"
                    >
                        Start på nytt
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default MathGame;
