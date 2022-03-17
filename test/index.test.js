var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require("mongoose");
require('sinon-mongoose');

//Importing our tasks model for our unit testing.
var Task = require("../models/task");



describe("[GET] Fetch all Tasks", function(){
    // Test will pass if we get all tasks
   it("returns all tasks", function(done){
       var TaskMock = sinon.mock(Task);
       var expectedResult = {status: true, task: []};
       TaskMock.expects('find').yields(null, expectedResult);
       Task.find(function (err, result) {
            TaskMock.verify();
            TaskMock.restore();
            expect(result.status).to.be.true;
            done();
       });
   });

   // Test will pass if we fail to get a task
   it("returns error", function(done){
       var TaskMock = sinon.mock(Task);
       var expectedResult = {status: false, error: "Something went wrong"};
       TaskMock.expects('find').yields(expectedResult, null);
       Task.find(function (err, result) {
            TaskMock.verify();
            TaskMock.restore();
            expect(err.status).to.not.be.true;
            done();
       });
   });
});

// Test will pass if the task is saved
describe("[POST] Create new Task", function(){
    it("returns new task", function(done){
        var TaskMock = sinon.mock(new Task({ task: 'Saving new task from mock'}));
        var task = TaskMock.object;
        var expectedResult = { status: true };
        TaskMock.expects('save').yields(null, expectedResult);
        task.save(function (err, result) {
            TaskMock.verify();
            TaskMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the task is not saved
    it("returns error", function(done){
        var TaskMock = sinon.mock(new Task({ task: 'Save new tasks from mock'}));
        var task = TaskMock.object;
        var expectedResult = { status: false };
        TaskMock.expects('save').yields(expectedResult, null);
        task.save(function (err, result) {
            TaskMock.verify();
            TaskMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

// Test will pass if the task is updated
describe("[PUT] Mark task as completed", function(){
    it("updates todo", function(done){
      var TaskMock = sinon.mock(new Task({ task: "test", completed: true }));
      var todo = TaskMock.object;
      var expectedResult = { status: true };
      TaskMock.expects('save').yields(null, expectedResult);
      todo.save(function (err, result) {
        TaskMock.verify();
        TaskMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });
    // Test will pass if the todo is not not updated
    it("returns error", function(done){
      var TaskMock = sinon.mock(new Task({ task: "test", completed: true }));
      var todo = TaskMock.object;
      var expectedResult = { status: false };
      TaskMock.expects('save').yields(expectedResult, null);
      todo.save(function (err, result) {
        TaskMock.verify();
        TaskMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });


// Test will pass if the todo is deleted
describe("[DEL] Delete a Task by ID", function(){
    it("deletes task", function(done){
        var TaskMock = sinon.mock(Task);
        var expectedResult = { status: true };
        TaskMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);
        Task.remove({_id: 12345}, function (err, result) {
            TaskMock.verify();
            TaskMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the todo is not deleted
    it("returns error", function(done){
        var TaskMock = sinon.mock(Task);
        var expectedResult = { status: false };
        TaskMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);
        Task.remove({_id: 12345}, function (err, result) {
            TaskMock.verify();
            TaskMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});