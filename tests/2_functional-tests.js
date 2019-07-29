/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
        let issue_title = 'Title';
        let issue_text = 'text';
        let created_by = 'Functional Test - Every field filled in';
        let assigned_to = 'Chai and Mocha';
        let status_text = 'In QA';
        let date = new Date();
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: issue_title,
          issue_text: issue_text,
          created_by: created_by,
          assigned_to: assigned_to,
          status_text: status_text
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, issue_title, res.body.issue_title + " does not equal " + issue_title);
          assert.equal(res.body.issue_text, issue_text, res.body.issue_text + " does not equal " + issue_text);
          assert.equal(res.body.created_by, created_by, res.body.created_by + " does not equal " + created_by);
          assert.equal(res.body.assigned_to, assigned_to, res.body.assigned_to + " does not equal " + assigned_to);
          assert.equal(res.body.status_text, status_text, res.body.status_text + " does not equal " + status_text);
          assert.equal(res.body.open, true, res.body.open + " is not equal to " + true);
          assert.exists(res.body.created_on, "created_on date does not exist");
          assert.exists(res.body.updated_on, "updated_on date does not exist");
          done();
        });
      });
      
    //   test('Required fields filled in', function(done) {
        
    //   });
      
    //   test('Missing required fields', function(done) {
        
    //   });
      
    // });
    
    // suite('PUT /api/issues/{project} => text', function() {
      
    //   test('No body', function(done) {
        
    //   });
      
    //   test('One field to update', function(done) {
        
    //   });
      
    //   test('Multiple fields to update', function(done) {
        
    //   });
      
    });
    
    // suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
    //   test('No filter', function(done) {
    //     chai.request(server)
    //     .get('/api/issues/test')
    //     .query({})
    //     .end(function(err, res){
    //       assert.equal(res.status, 200);
    //       assert.isArray(res.body);
    //       assert.property(res.body[0], 'issue_title');
    //       assert.property(res.body[0], 'issue_text');
    //       assert.property(res.body[0], 'created_on');
    //       assert.property(res.body[0], 'updated_on');
    //       assert.property(res.body[0], 'created_by');
    //       assert.property(res.body[0], 'assigned_to');
    //       assert.property(res.body[0], 'open');
    //       assert.property(res.body[0], 'status_text');
    //       assert.property(res.body[0], '_id');
    //       done();
    //     });
    //   });
      
    //   test('One filter', function(done) {
        
    //   });
      
    //   test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        
    //   });
      
    // });
    
    // suite('DELETE /api/issues/{project} => text', function() {
      
    //   test('No _id', function(done) {
        
    //   });
      
    //   test('Valid _id', function(done) {
        
    //   });
      
    // });

});
