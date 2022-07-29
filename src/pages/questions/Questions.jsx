import React, { useEffect, useState } from "react";
import { Container, Grid, Box, Button } from "@mui/material";
import { getCategories, getQuestions } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import Body from "../../components/body/Body";
import SectionTitle from "../../components/section-title/SectionTitle";

import "./questions.css";
import { setNextQuestion, setQuestions } from "../../redux/reducers/game";
import LinearProgressWithLabel from "../../components/progress/Progress";

export default function Questions() {
  const [answers, setAnswers] = useState([]);
  const [progress, setProgress] = useState(10);

  const dispatch = useDispatch();
  const { selectedCategory, level, selectedQuestion, questionIndex, questions } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    getQuestions({
      amount: 10,
      category: selectedCategory,
      difficulty: level,
    }).then((res) => {
      dispatch(setQuestions(res.data?.results));
    });
  }, []);

  useEffect(() => {
    setProgress((questionIndex/questions.length)*100);
  }, [questionIndex, questions]);

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);
  useEffect(() => {
    if (selectedQuestion) {
      console.log(selectedQuestion);
      const ans = [];
      selectedQuestion.incorrect_answers.map((answer) => ans.push(answer));
      ans.push(selectedQuestion.correct_answer);
      shuffle(ans);
      setAnswers(ans);
    } else {
      setAnswers([]);
    }
  }, [selectedQuestion]);

  const handleClick = (e) => {
    console.log(e.target.value);
    dispatch(setNextQuestion());
  };

  return (
    <>
      <LinearProgressWithLabel color="secondary" value={progress}/>

      <Body>
        <section className="categories-container">
          <SectionTitle>Questions</SectionTitle>
          <div className="buttons-container w100">
            <Box className="question-container">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box className="question-box">
                    <div className="question-text">
                      {selectedQuestion?.question}
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <div className="question-answer">
                    <Grid container spacing={3} className="text-center">
                      {answers?.map((ans, index) => {
                        return (
                          <Grid item xs={12} sm={6}>
                            <Button
                              className="w100"
                              onClick={handleClick}
                              value={ans}
                            >
                              {ans}
                            </Button>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} className="button-box-container">
                <Box className="error">
                  {/* <span className="error-text">{ showError ? 'Please fill all fields' : '' }</span> */}
                </Box>
                <Box className="button-box submit w100">
                  {/* <Button className="button w100" onClick={handleSubmit}>
                              <span className="button-text">Play</span>
                          </Button> */}
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>
      </Body>
    </>
  );
}
