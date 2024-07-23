import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import User from './pages/User';
import Category from './pages/Category';
import Product from './pages/Product';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Dashboard} />
        <Route path='/admins' Component={Admin} />
        <Route path='/users' Component={User} />
        <Route path='/categories' Component={Category} />
        <Route path='/products' Component={Product} />
        <Route path='/settings' Component={Settings} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

