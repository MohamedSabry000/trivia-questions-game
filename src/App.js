import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';

function App() {

  const { currentPage } = useSelector(state => state.page);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
