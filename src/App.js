import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';

import './App.css'
import Header from './components/header/Header';
import Categories from './pages/categories/Categories';

function App() {

  const { page } = useSelector(state => state.page);

  return (
    <div className="App">
      <Header />

      <Routes>
        { page === 'home' && <Route index element={<Home />} /> }
        { page === 'categories' && <Route index element={<Categories />} /> }
        {/* { page === 'questions' && <Route index element={<Questions />} /> } */}
      </Routes>
    </div>
  );
}

export default App;
