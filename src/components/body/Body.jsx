import React, { useRef, useState } from 'react'
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'

import './body.css'
// import ButtonsContainer from '../buttons-container/ButtonsContainer';
// import LinearProgressWithLabel from '../progress/Progress';
import { useEffect } from 'react';
import { setLevel, setUserName } from '../../redux/reducers/game';
import { setPage } from '../../redux/reducers/page';

export default function Body() {
  const [user, setUser] = useState('');
  const [levelLocal, setLevelLocal] = useState('');
  const [showError, setShowError] = useState(false);

  const buttons = useRef(['Easy', 'Medium', 'Hard']);

  const dispatch = useDispatch();

  const handleLevelChange = (level) => {
    setLevelLocal(level.toLowerCase());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === '' || levelLocal === '') {
      setShowError(true);
    } else {
      dispatch(setUserName(user));
      dispatch(setLevel(user));
      dispatch(setPage('categories'));
    }
  }

  return (
    <section id="main-body">
        <div className="body-wrapper">
          <Container className="main-body-container">
            <div className="container-default">
              <section className="word-container">
                <div className="word-wrapper">
                  <Box className="word-box">
                    <input className="username" type="text" placeholder="Type your Name here" value={user} onChange={e => setUser(e.target.value)} />
                  </Box>
                </div>
                <div className="buttons-container">
                  <Grid container spacing={3}>
                    {
                      buttons.current.map((button, index) => (
                        <Grid item xs={12} sm={6} md={4}>
                          <Box className="button-box">
                            <Button className="button w100" onClick={() => handleLevelChange(button)}>
                                <span className="button-text">{button}</span>
                            </Button>
                          </Box>
                        </Grid>
                      ))
                    }
                  </Grid>
                </div>
                <div className="buttons-container">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Box className="button-box">
                        <Button className="button w100" onClick={handleSubmit}>
                            <span className="button-text">Play</span>
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
                <div className={`buttons-container ${showError? 'show' : 'hide'}`}>
                    <div className="error-message">
                      {
                        user === '' ? 'Please Enter your Name' : ''
                      }
                      <br />
                      {
                        levelLocal === '' ? 'Please select a level' : ''
                      }
                    </div>

                </div>
              </section>
            </div>
          </Container>
        </div>
    </section>
  )
}
