import React, { useEffect, useState } from "react";
import { Container, Grid, Box, Button } from "@mui/material";
import { getCategories, getQuestions } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import Body from "../../components/body/Body";
import SectionTitle from "../../components/section-title/SectionTitle";

export default function Questions() {
  const dispatch = useDispatch();
  const { selectedCategory, level } = useSelector((state) => state.game);

  useEffect(() => {
    getQuestions({
      amount: 10,
      category: selectedCategory,
      difficulty: level,
    }).then((res) => {
      console.log(res.data);
      // dispatch(setCategories(res.data?.trivia_categories));
      // setCategories(res.data?.trivia_categories);
    });
  }, []);

  return (
    <Body>
      <section className="categories-container">
        <SectionTitle>Questions</SectionTitle>
        <div className="buttons-container w100">
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
  );
}
