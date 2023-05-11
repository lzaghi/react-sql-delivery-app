import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Details from './pages/Details';
import Orders from './pages/Orders';
import Admin from './pages/Admin';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders" component={ Orders } />
      <Route path="/customer/orders/:id" component={ Details } />
      <Route exact path="/seller/orders" component={ Orders } />
      <Route path="/seller/orders/:id" component={ Details } />
      <Route path="/admin/manage" component={ Admin } />
    </Switch>
  );
}

export default App;
