import React, { useEffect, useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import { getCategories } from "../../api";
import { useDispatch } from "react-redux";

import { setSelectedCategory } from "../../redux/reducers/game";
import { setPage } from "../../redux/reducers/page";

import "./categories.css";
import Body from "../../components/body/Body";
import SectionTitle from "../../components/section-title/SectionTitle";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getCategories().then((res) => {
      console.log(res.data);
      dispatch(setCategories(res.data?.trivia_categories));
      setCategories(res.data?.trivia_categories);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category === "") {
      setShowError(true);
    } else {
      dispatch(setSelectedCategory(category));
      dispatch(setPage("questions"));
    }
  };

  return (
    <Body>
      <section id="categories-container">
        <SectionTitle>Choose your Category</SectionTitle>
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              onClick={() => setCategory(category.id)}
            >
              <Box className="button-box">
                <Button className="button w100">
                  <span className="button-text">{category.name}</span>
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
                  {showError ? "Please fill all fields" : ""}
                </span>
              </Box>
              <Box className="button-box submit w100">
                <Button className="button w100" onClick={handleSubmit}>
                  <span className="button-text">Play</span>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
      </section>
    </Body>
  );
}
