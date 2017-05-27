var Task = require('./models/task');
var User = require('./models/user');
var Comment = require('./models/comment');
var express = require('express')
var app = express();
var multer  = require('multer');
//var upload = multer();
 var upload = multer({ dest: './public/uploads/' });


function getUser(res) {
    Task.find(function(err, user) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(user); // return all todos in JSON format
    });
};

function getUserProfile(res) {
    User.find().populate('task').exec(function(err, user) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(user); // return all todos in JSON format
    });
};
function getComments(res) {
    Comment.find().exec(function(err, user) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(user); // return all todos in JSON format
    });
};


module.exports = function(app) {

   app.post('/api/upload/image', upload.any(), function (req, res, next) {
    //console.log(req.body, 'Body');
  //console.log(req.files, 'files');
  res.json(req.files[0].path);
  // req.body contains the text fields
 
 // upload();
})
    app.get('/api/user', function(req, res) {
        // use mongoose to get all todos in the database
        getUser(res);
    });
    app.get('/api/comment', function(req, res) {
        // use mongoose to get all todos in the database
        getComments(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/user', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Task.create({
            text: req.body.text,
            time: req.body.time,
            done: false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getUser(res);
        });

    });
     app.post('/api/comment', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Comment.create({
            comment: req.body.comment,
            
            done: false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getUser(res);
        });

    });
     app.post('/api/userprofile/login', function(req, res) {
         
        // create a todo, information comes from AJAX request from Angular
        User.findOne({
            userid: req.body.userid
        }, function(err, user) {
            //   console.log(user);
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(user); // return all todos in JSON format
        });
    });

    
    app.get('/api/userprofile', function(req, res) {
        // use mongoose to get all todos in the database
        getUserProfile(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/userprofile', function(req, res) {
      //  console.log('sadd');
        // create a todo, information comes from AJAX request from Angular
        User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            userid: req.body.userid,
             password: req.body.password,
              path: req.body.path,
            taskname: req.body.taskname,

            done: false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getUserProfile(res);
        });

    });
    app.get('/api/task/:todo_id', function(req, res) {

        Task.findOne({
            'text': req.params.todo_id
        }, 'text time', function(err, user) {
            //   console.log(user);
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(user); // return all todos in JSON format
        });
    });
    // delete a todo
    app.delete('/api/user/:todo_id', function(req, res) {
        Task.remove({
            _id: req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            getUser(res);
        });
    });
    app.delete('/api/userprofile/:todo_id', function(req, res) {
        console.log('sdf');
        User.remove({
            _id: req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            getUserProfile(res);
        });
    });

    // application -------------------------------------------------------------

};