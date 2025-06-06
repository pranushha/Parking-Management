import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchFilter from './SearchFilter';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage'; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />           
        <Route path="/search" element={<SearchFilter />} />   
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
