/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.MONGO_URI; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  

  MongoClient.connect(CONNECTION_STRING, function(err, client) {
    if (err) {
      console.log("DB Error:" + err)
    } else {
      console.log("Connected to Database");
    }
  })
  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    // US 2: I can POST /api/issues/{projectname} with form data containing
    // required issue_title, issue_text, created_by, 
    // and optional assigned_to and status_text.
    .post(function (req, res){
      var project = req.params.project;


      // US 3: The object saved (and returned) will include all of those fields
      // (blank for optional no input) and also include created_on(date/time),
      // updated_on(date/time), open(boolean, true for open, false for closed), 
      // and _id.
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
