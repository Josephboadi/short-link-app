import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
//import moment from 'moment';

import '../imports/api/users';
import {Links} from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next)=>{
    const _id=req.url.slice(1);
    const link = Links.findOne({_id});

    if(link){
      res.statusCode=302;
      res.setHeader('Location',link.url);
      res.end();
      Meteor.call('links.trackVisit',_id);
    }else{
      next();
    }
    //console.log('This is from my custom middleware');
    //console.log(req.url, req.method, req.headers, req.query);
  //  res.statusCode = 404;
    //res.setHeader('my-custom-header','Joe was here!');
    //res.write('<h1>This is my middleware at work!</h1>')
    //res.end();
    //next();
  });
  // code to run on server at startup
});
