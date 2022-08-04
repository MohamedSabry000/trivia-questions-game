import React, { useEffect, useRef, useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import { getCategories, getQuestions } from "../../api";
import { useDispatch, useSelector } from "react-redux";

import { setQuestions, setSelectedCategory } from "../../redux/reducers/game";
import { setPage } from "../../redux/reducers/page";

import "./categories.css";
import Body from "../../components/body/Body";
import SectionTitle from "../../components/section-title/SectionTitle";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // get Finished Categories, so if selected category is finished, it will force to choose another category
  const { finishedCategories, level } = useSelector((state) => state.game);

  const numberOfQuestions = useRef(10);

  const dispatch = useDispatch();

  useEffect(() => {
    // Get Categories from API
    getCategories().then((res) => {
      console.log(res.data);
      dispatch(setCategories(res.data?.trivia_categories));
      setCategories(res.data?.trivia_categories);
    });
    numberOfQuestions.current = level === "easy" ? 10 : level === "medium" ? 15 : 20;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category === "") {
      setErrorMessage("Please select a category");
      setShowError(true);
    } else {
      // After Choose Category, get its Questions from API
      dispatch(setSelectedCategory(category));
      getQuestions({
        amount: numberOfQuestions.current,
        category: category,
        difficulty: level,
      }).then((res) => {
        if(res.data?.results && res.data?.results.length > 0) {
          dispatch(setQuestions(res.data?.results));
          dispatch(setPage("questions"));
        } else {
          setErrorMessage("No questions found for this category");
          setShowError(true);
        }
      }).catch((err) => {
        console.log(err);
        setErrorMessage("Something went wrong, please try again");
        setShowError(true);
      });
    }
  };

  // Handle Random Category Choice, but not finished ones
  const handleRandom = (e) => {
    e.preventDefault();
    const random = Math.floor(Math.random() * categories.length);
    if (finishedCategories.includes(categories[random].id)) {
      handleRandom(e);
    } else {
      setCategory(categories[random].id);
    }
  };

  return (
    <Body>
      <section id="categories-container">
        <SectionTitle>Choose your Category</SectionTitle>
        <Grid container spacing={3}>
          {categories.map((cat, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              className={finishedCategories.includes(cat.id) ? "disabled" : ""}
              readOnly={finishedCategories.includes(cat.id)}
            >
              <Box className="button-box" onClick={() => setCategory(cat.id)}>
                <Button
                  className={`button w100 ${
                    cat.id === category ? "selected" : ""
                  }`}
                >
                  <span className="button-text">{cat.name}</span>
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
        <div className="buttons-container w100">
          <Grid container spacing={3}>
            <Grid item xs={12} className="button-box-container">
              <Box className="error">
                <span className="error-text">
                  {showError ? errorMessage : ""}
                </span>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className="button-box-container">
              <Box className="button-box submit w100">
                <Button className="button w100" onClick={handleSubmit}>
                  <span className="button-text">Start Gaming</span>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className="button-box-container">
              <Box className="button-box submit w100">
                <Button className="button w100" onClick={handleRandom}>
                  <span className="button-text">Random</span>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
      </section>
    </Body>
  );
}
