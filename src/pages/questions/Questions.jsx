import React, { useEffect, useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Body from "../../components/body/Body";
import SectionTitle from "../../components/section-title/SectionTitle";

import "./questions.css";
import {
  setNextQuestion,
  setTimeSpent,
  setCorrectAnswer,
  setIncorrectAnswer,
  setSkippedAnswer,
} from "../../redux/reducers/game";
import LinearProgressWithLabel from "../../components/progress/Progress";
import Timer from "../../components/timer/Timer";
import { setPage } from "../../redux/reducers/page";

export default function Questions() {
  const [answers, setAnswers] = useState([]);
  const [progress, setProgress] = useState(10);
  const [answer, setAnswer] = useState(null);
  // local save time spent of the question
  const [time, setTime] = useState(0);
  const [showError, setShowError] = useState(false);
  //  rerender the timer
  const [renderTimer, setRenderTimer] = useState(true);

  const dispatch = useDispatch();
  const { selectedQuestion, questionIndex, questions } = useSelector((state) => state.game );

  // Handle Progress Bar
  useEffect(() => {
    setProgress((questionIndex / questions.length) * 100);
  }, [questionIndex, questions]);

  // Shuffle Questions
  const shuffle = (array) => array.sort(() => Math.random() - 0.5);
  const handleMultipleChoice = (selectedQuestion) => {
    console.log(selectedQuestion);
    const ans = [];
    selectedQuestion.incorrect_answers.map((answer) => ans.push(answer));
    ans.push(selectedQuestion.correct_answer);
    shuffle(ans);
    setAnswers(ans);
  };
  useEffect(() => {
    if (selectedQuestion) {
      // Handle the arrangements of Choices
      selectedQuestion.type === "multiple"
        ? handleMultipleChoice(selectedQuestion)
        : setAnswers(["True", "False"]);
    } else {
      setAnswers([]);
    }
    // empty the error message
    setShowError(false);
  }, [selectedQuestion]);

  const decodeEntity = (inputStr) => {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    // console.log(textarea.value);
    return textarea.value;
}
  const handleSubmit = (e) => {
    if (questionIndex < questions.length - 1 && answer) {
      // Handle The Correct Answer, Incorrect Answer and Skipped Answer
      dispatch(setTimeSpent(time));
      answer === selectedQuestion.correct_answer
        ? dispatch(setCorrectAnswer())
        : selectedQuestion.incorrect_answers.includes(answer)
        ? dispatch(setIncorrectAnswer())
        : dispatch(setSkippedAnswer());

      // Handle Next Question
      dispatch(setNextQuestion());
      setRenderTimer(prev => !prev);

    } else if (answer === null) {
      setShowError(true);
    } else {
      dispatch(setPage("score"));
    }
    setAnswer(null);
  };

  const handleSkip = () => {
    if (questionIndex < questions.length - 1) {
      setAnswer(null);
      dispatch(setTimeSpent(time));
      dispatch(setSkippedAnswer());
      dispatch(setNextQuestion());
    } else {
      dispatch(setSkippedAnswer());
      dispatch(setPage("score"));
    }
    setRenderTimer(prev => !prev);
  };

  return (
    <>
      <LinearProgressWithLabel color="secondary" value={progress} />

      <Body>
        <section className="questions-container" id="questions">
          <Timer render={renderTimer} setRender={setRenderTimer} setTime={setTime} />
          <SectionTitle>Questions</SectionTitle>
          <div className="buttons-container w100">
            <Box className="question-container">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box className="question-box">
                    <div className="question-text">
                      {
                        selectedQuestion?.question && decodeEntity(selectedQuestion.question)
                      }
                      {/* {selectedQuestion?.question} */}
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
                              className={`button w100 ${
                                ans === answer ? "selected" : ""
                              }`}
                              onClick={() => setAnswer(ans)}
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
                  <span className="error-text">
                    {showError ? "Please Select Choice" : ""}
                  </span>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} className="button-box-container">
                <Box className="button-box submit w100">
                  <Button className="button w100" onClick={handleSkip}>
                    <span className="button-text">Skip</span>
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} className="button-box-container">
                <Box className="button-box submit w100">
                  <Button className="button w100" onClick={handleSubmit}>
                    <span className="button-text">Submit</span>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>
      </Body>
    </>
  );
}
