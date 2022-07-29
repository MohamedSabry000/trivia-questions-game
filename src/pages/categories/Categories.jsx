import React, { useEffect, useState } from 'react'
import { Container, Grid, Box, Button } from '@mui/material'
import { getCategories } from '../../api';
import { useDispatch } from 'react-redux';

import './categories.css'
import { setSelectedCategory } from '../../redux/reducers/game';
import { setPage } from '../../redux/reducers/page';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getCategories().then(res => {
      console.log(res.data);
      dispatch(setCategories(res.data?.trivia_categories));
      setCategories(res.data?.trivia_categories);
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category === '') {
      setShowError(true);
    } else {
      dispatch(setSelectedCategory(category));
      dispatch(setPage('questions'));
    }
  }

  return (
    <section id="main-body">
      <div className="body-wrapper">
          <Container className="main-body-container">
            <div className="container-default">
              <section className="categories-container">
              <Grid container spacing={3}>
                      <Grid item xs={12} sm={12} md={12}>
                        <Box className="button-box">
                          <div className="title-container w100">
                              <span className="button-text">Choose your Category</span>
                          </div>
                        </Box>
                      </Grid>
                </Grid>
                <Grid container spacing={3}>
                  {
                    categories.map((category, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index} onClick={() => setCategory(category.id)}>
                        <Box className="button-box">
                          <Button className="button w100">
                              <span className="button-text">{ category.name }</span>
                          </Button>
                        </Box>
                      </Grid>
                    ))
                  }
                </Grid>
                <div className="buttons-container w100">
                  <Grid container spacing={3}>
                    <Grid item xs={12} className="button-box-container">
                      <Box className="error">
                        <span className="error-text">{ showError ? 'Please fill all fields' : '' }</span>
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
            </div>
          </Container>
      </div>

    </section>
  )
}
