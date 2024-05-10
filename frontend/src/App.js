import React from 'react';
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import BankAcc from './Pages/BankAcc/BankAcc';
import Goal from "./Pages/Goal/Goal"
// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home/Home';
import SetAvatar from './Pages/Avatar/setAvatar';
import Landing from "./Pages/Landing/Landing"


const App = () => {
  return (
    
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/bank" element={<BankAcc />} />
          <Route path="/goal" element={<Goal />} />
        </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App