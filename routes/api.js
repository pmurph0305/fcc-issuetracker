/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;




module.exports = function (app, db) {

      app.route('/api/issues/:project') 
        // .get(function (req, res){
        //   var project = req.params.project;
          
        // })
        
        // US 2: I can POST /api/issues/{projectname} with form data containing
        // required issue_title, issue_text, created_by, 
        // and optional assigned_to and status_text.
        .post(function (req, res){
          var project = req.params.project;
          let issue_title = req.body.issue_title;
          let issue_text = req.body.issue_text;
          let created_by = req.body.created_by;
          if (!issue_title || !issue_text || !created_by) {
            res.json("Missing required data. Please fill out title, text, and created by fields.")
          } else {
            // US 3: The object saved (and returned) will include all of those fields
            // (blank for optional no input) and also include created_on(date/time),
            // updated_on(date/time), open(boolean, true for open, false for closed), 
            // and _id.
            db.collection('issues').insertOne({
              issue_title: issue_title,
              issue_text: issue_text,
              created_by: created_by,
              assigned_to: req.body.assigned_to || "",
              status_text: req.body.status_text || "",
              open: true,
              created_on: new Date(),
              updated_on: new Date(),
            }, function(err, result) {
              if (err) {
                res.json("Database Error, unable to create new issue.");
              } else {
                // return the new document.
                res.json(result.ops[0]);
              }
            })
          }
        });
        
  //       .put(function (req, res){
  //         var project = req.params.project;
          
  //       })
        
  //       .delete(function (req, res){
  //         var project = req.params.project;
          
  //       });
  //     }
  //   })
};
