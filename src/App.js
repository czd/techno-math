import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MathGame from "./MathGame";

export default function App() {
    return (
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
            <Typography
                variant="h2"
                component="h1"
                style={{ textAlign: "center" }}
                gutterBottom
            >
                Techno Math
            </Typography>
            <MathGame />
        </Container>
    );
}
