// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './components/FormPage';
import SecondPage from './components/SecondPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route  path="/form-page" element={<FormPage/>} > </Route>
        <Route  path="/second-page" element={<SecondPage/>} > </Route>
        <Route  path="/"  element={<FormPage/>} > </Route>
      </Routes>
    </Router>
  );
};

export default App;
