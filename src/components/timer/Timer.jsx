import React, { useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useDispatch, useSelector } from 'react-redux';
import { setNextQuestion, setSkippedAnswer, setTimeSpent } from '../../redux/reducers/game';
import { setPage } from '../../redux/reducers/page';

import './timer.css'
export default function Timer({render, setRender, setTime}) {
  const [t, setT] = useState(0);
  const [temp, setTemp] = useState(false);

  const dispatch = useDispatch();
  const { questionIndex, questions, level } = useSelector((state) => state.game);

  // Handle Duration of Each Question
  const countDown = level === "easy" ? 90 : level === "medium" ? 60 : 30;

  useEffect(() => {
    setRender(true);
  }, [render]);

  useEffect(() => {
    setTime(t)
  }, [t])

  const handleComplete = () => {
    dispatch(setSkippedAnswer());
    dispatch(setNextQuestion());
    dispatch(setTimeSpent(t));
    if(questionIndex < questions.length - 1) {
      return { shouldRepeat: true, delay: 1 };
    }else {
      dispatch(setPage('score'));
    }
  }

  return (
    render && <CountdownCircleTimer
      render={render}
      isPlaying={true}
      duration={countDown}
      colors={['#d3d2d4', '#F7B801', '#A30000', '#59b192']}
      colorsTime={[90, 30, 15, 0]}
      onUpdate={(counter) => setT(countDown-counter)}
      onComplete={handleComplete}
    >
      {({ remainingTime }) => remainingTime }
    </CountdownCircleTimer>

  )
}
