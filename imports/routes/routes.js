import { Meteor } from 'meteor/meteor';
import React, {Component} from 'react';
//import './main.html';
import { Router, Route, Link, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Signup from '../ui/signup';
import link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const history = createHistory();
const unauthenticatedPages=['/','/signup'];
const authenticatedPages=['/link'];
const onEnterPublicPage = ()=>{
  if(Meteor.userId())
  {
    history.replace("/link");
  }
};
const onEnterPrivatePage=()=>{
  if(!Meteor.userId())
  {
    history.replace("/");
  }
};

export const onAuthChange=(isAuthenticated)=>{
  const pathname= history.location.pathname;
  const isUnauthenticatedPage= unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage= authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated ){
    history.replace("/link");
  }else if(isAuthenticatedPage && !isAuthenticated){
    history.replace("/");
  }
};

export const routes =(

    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={Login} onEnter={onEnterPublicPage}/>
          <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
          <Route path="/link" component={link} onEnter={onEnterPrivatePage}/>
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>

);
