import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";

import Home from './pages/Home';
import Details from './pages/Details';
import Navbar from './includes/Navbar';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App() {
  return (
    <BrowserRouter>
     <Navbar/>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/:id" element={<Details />} />
       <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
