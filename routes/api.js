/*
*
*
*       Complete the API routing below
*
*
*/
'use strict';
const ObjectID = require('mongodb').ObjectID;


module.exports = function (app, db) { 

  //US 6: I can GET /api/issues/{projectname} for an array of all issues
  // on that specific project with all the information for each issue 
  // as was returned when posted.
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
        res.json({ message: "Missing required data." })
      } else {
        // US 3: The object saved (and returned) will include all of those fields
        // (blank for optional no input) and also include created_on(date/time),
        // updated_on(date/time), open(boolean, true for open, false for closed), 
        // and _id.
        db.collection(project).insertOne({
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
    })
    
    // US 4: I can PUT /api/issues/{projectname} with a _id and any fields in the object with a value
    // to object said object. Returned will be 'successfully updated' or 'could not update '+_id.
    // This should always update updated_on. If no fields are sent return 'no updated field sent'.
    .put(function (req, res){
      var project = req.params.project;
      // empty object
      if (!Object.keys(req.body).length) {
        res.json({message: "no updated field sent"});
      } else {
        // use an empty object and add updated fields to it so we don't add everything in req.body.
        let newDoc = {};
        if (req.body.issue_title) newDoc.issue_title = req.body.issue_title;
        if (req.body.issue_text) newDoc.issue_text = req.body.issue_text;
        if (req.body.created_by) newDoc.created_by = req.body.created_by;
        if (req.body.assigned_to) newDoc.assigned_to = req.body.assigned_to;
        if (req.body.status_text) newDoc.status_text = req.body.status_text;
        // has own property as open is a bool.
        if (req.body.hasOwnProperty('open')) newDoc.open = req.body.open; 
        newDoc.updated_on = new Date();
        db.collection(project).findOneAndUpdate(
          { _id: ObjectID(req.body._id) },
          { $set: newDoc },
          function(err, result) {
            if (err) {
              res.json({ message: 'could not update ' + req.body._id });
            } else {
              res.json({ message: 'successfully updated' });
            }
        })
      }
    })
    
    // US 5: I can DELETE /api/issues/{projectname} with a _id to completely delete
    // an issue. If no _id is sent 
    //return '_id error',
    //  success: 'deleted '+_id, 
    // failed: 'could not delete '+_id.
    .delete(function (req, res){
      var project = req.params.project;
      if (!req.body._id) {
        res.json({ message: "_id error" });
      } else {
        db.collection(project).findOneAndDelete(
          { _id: ObjectID(req.body._id) },
          function(err, result) {
            if (err) res.json({ message: "could not delete " + req.body._id });
            else {
              res.json({ message: "deleted " + req.body._id });
            }
          }
        )
      }
    });
};
