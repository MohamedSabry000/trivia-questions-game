import React, { useEffect } from "react";
import { Grid, Box, Button } from "@mui/material";
import Body from "../../components/body/Body";
import SectionTitle from "../../components/section-title/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { setPage } from "../../redux/reducers/page";
import { resetGame, setFinishedCategories } from "../../redux/reducers/game";
import './score.css'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Score() {
  const { answers } = useSelector((state) => state.game);

  const data = {
    labels: ["Correct", "Wrong", "Skipped"],
    datasets: [
      {
        label: "# of Answers",
        data: [answers.correct, answers.wrong, answers.skipped],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dispatch = useDispatch();
  const { timeSpent, selectedCategory } = useSelector((state) => state.game);

  const getTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    dispatch(setFinishedCategories(selectedCategory));
  }, []);

  const handleNewGame = () => {
    dispatch(resetGame());
    dispatch(setPage("home"));
  };
  return (
    <Body>
      <section className="questions-container" id="score">
        <SectionTitle>Score</SectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box className="question-box">
              <div className="question-text">Time is: {getTime(timeSpent)}</div>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="question-box">
              <div className="question-text">
                <Pie data={data} />
              </div>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {/* You have to pass the category with all correct and not skipped answers */}
          {!answers.incorrect && !answers.skipped &&
          <Grid item xs={12} md={6} className="button-box-container">
            <Box className="button-box submit w100">
              <Button
                className="button w100"
                onClick={() => dispatch(setPage("categories"))}
              >
                <span className="button-text">Go to Another Category</span>
              </Button>
            </Box>
          </Grid>}
          {/* Handle The Width in case  */}
          <Grid item xs={12} md={!answers.incorrect && !answers.skipped? 6 : 12} className="button-box-container">
            <Box className="button-box submit w100">
              <Button className="button w100" onClick={handleNewGame}>
                <span className="button-text">New Game</span>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </section>
    </Body>
  );
}
