import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Body from '../../components/body/Body';
import Header from '../../components/header/Header';
import { resetGame } from '../../redux/reducers/game';

export default function Home() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetGame())
  }, []);

  return (
    <div id="home">
      <Body />
    </div>
  )
}
