
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Error from './pages/Error/Error';
function App() {
  return (
    <div className="App">
    <Header />
   
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/*" element={<Error />} />
      </Routes>
    </main>
   
  </div>
  );
}

export default App;
