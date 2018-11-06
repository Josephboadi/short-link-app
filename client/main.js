import { Meteor } from 'meteor/meteor';
import  ReactDom from 'react-dom';
import './main.html';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import{routes, onAuthChange} from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(()=>{
  const isAuthenticated=!!Meteor.userId();
  onAuthChange(isAuthenticated);
  //console.log('isAuthenticated', isAuthenticated);
});

/*/stateless funtional Component
import React from 'react';
const MyComponent = () =>{
  return (
    <div>
      <hi>MyComponen tis here</hi>
    </div>
  );
};*/

Meteor.startup(()=>{
  Session.set('showVisible', true);
  ReactDom.render(routes, document.getElementById('app') );
});
