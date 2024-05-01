import React, { useState } from "react";
import { Button, Box, Typography, Container, Grid } from "@mui/material";

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

function getCategory(time) {
    if (time < 2) {
      return "Mennesklig datamaskin";
    } else if (time < 4) {
      return "Mattegeni";
    } else if (time < 7) {
      return "B-student";
    } else if (time < 10) {
      return "Sannsynligvis sovnet";
    } else {
      return "High School Drop Out";
    }
}

function MathGame() {
    const [incorrect, setIncorrect] = useState(false);
    const [category, setCategory] = useState(null);
    const [num1, setNum1] = useState(getRandomNumber());
    const [num2, setNum2] = useState(getRandomNumber());
    const [correctAnswer, setCorrectAnswer] = useState(num1 + num2);
    const [options, setOptions] = useState(generateOptions(correctAnswer));
    const [startTime, setStartTime] = useState(new Date());

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
            const time = new Date().getTime() - startTime.getTime();
            setCategory(getCategory(time / 1000));
            refreshGame();
        } else {
            setIncorrect(true);
            setCategory(null);
        }
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
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button
                        onClick={refreshGame}
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
