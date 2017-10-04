import React from 'react';
import { Route } from 'react-router-dom';
import Post from './Post';
import Home from './Home';
import Profile from './Profile';
import Header from '../../shared/components/Header';


const Pages = () => (
  <div>
    <Header />
    <Route exact path="/" component={Home} />
    <Route exact path="/post/:id" component={Post} />
    <Route exact path="/user/:id" component={Profile} />
  </div>
);

export default Pages;
