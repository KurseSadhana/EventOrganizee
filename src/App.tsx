import './App.css';
import React from 'react';
import SignIn from './Login/login.tsx'
import Dashboard from './Dashboard/dashboard.tsx';
import { Routes, Route } from "react-router-dom";



function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
