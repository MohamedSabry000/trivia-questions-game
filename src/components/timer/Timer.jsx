import React, { useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useDispatch, useSelector } from 'react-redux';
import { setNextQuestion, setSkippedAnswer, setTimeSpent } from '../../redux/reducers/game';
import { setPage } from '../../redux/reducers/page';

import './timer.css'
export default function Timer({duration, setTime}) {
  const [t, setT] = useState(0);

  const dispatch = useDispatch();
  const { questionIndex, questions } = useSelector((state) => state.game);

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
    <CountdownCircleTimer
      isPlaying={true}
      duration={duration}
      colors={['#d3d2d4', '#F7B801', '#A30000', '#59b192']}
      colorsTime={[90, 30, 15, 0]}
      onUpdate={(counter) => setT(duration-counter)}
      onComplete={handleComplete}
    >
      {({ remainingTime }) => remainingTime }
    </CountdownCircleTimer>
  )
}
