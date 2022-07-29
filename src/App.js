import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';

import './App.css'
import Header from './components/header/Header';
import Categories from './pages/categories/Categories';
import Questions from './pages/questions/Questions';
import { useEffect } from 'react';
import { resetGame } from './redux/reducers/game';
import Score from './pages/score/Score';

function App() {

  const { page } = useSelector(state => state.page);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetGame())
  }, []);

  return (
    <div className="App">
      <Header />

      <Routes>
        { page === 'home' && <Route index element={<Home />} /> }
        { page === 'categories' && <Route index element={<Categories />} /> }
        { page === 'questions' && <Route index element={<Questions />} /> }
        { page === 'score' && <Route index element={<Score />} /> }
      </Routes>
    </div>
  );
}

export default App;
