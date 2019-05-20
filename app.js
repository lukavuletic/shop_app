var express = require("express");
var mon = require("mon");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var mysql = require("mysql");

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/static"))

var users = [];
var secret = "neka-fraza";

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shop"
});

connection.connect(function(err) {
  if (err){
    console.log("Error connecting to database", err);
  } else {
    console.log("Successfully connected to database");
  }
})

var query = "SELECT * FROM users;";
connection.query(query, function(error, result) {
  if (error) {
    console.log("Mysql query error", error);
  } else {
    console.log("Users list:", result);
    users = result;
  }
});

//connection.end();

app.listen(8088, function () {
  console.log('Listening on port 8088!');
});

app.get('/', function(req, res){
  //response.send(request);
  res.sendFile(__dirname + "/static/views/index.html");
});

//////////////////////////////////

app.post("/auth", function (req, res){
  var status = 401;
  var response = {"success": false};
  
  var login = {
    username:req.body.username,
    password:req.body.password
  }

  console.log(login);
  var user = getUser(login.username, login.password);

  if (user != null) {
    var token = jwt.sign(user, secret);
    response.success = true;
    response.token = token;
    status = 200;
    res.status(status).json(response);
  } else {
    res.json(response);
  }
});

app.post("/post", function (req, res){
  var username = req.body.username;
  var balance = req.body.balance;
  var success = false;

  var user = {"username": username, "balance":balance};
    updateUser(username,balance);
    success = true;
    console.log("user", user);
    res.json({"success": success});
    

    connection.query('UPDATE users SET balance= ? WHERE username= ?  ', 
      [balance, username] , function(err, result){
      if (err) {
        console.log("Mysql query error", err);
      } else {
        console.log("Users:", result);
      }
    });
});

app.post("/register", function (req, res){
  var username = req.body.username;
  var password = req.body.password;
  var success = false;

  if (!userExists(username)) {
    var user = {"username": username, "password": password};
    users.push(user);
    success = true;
    console.log("user", user);
    res.json({"success": success});
    
    connection.query('INSERT INTO users SET?', user , function(err, result){
      if (err) {
        console.log("Mysql query error", err);
      } else {
        console.log("Users:", result);
      }
    });
  } else {
    res.json({"success": success});
  }
});
app.get("/login", function (req, res){
  res.sendFile(__dirname + "/login.html");
});

app.get("/register", function (req, res){
  res.sendFile(__dirname + "/register.html");
});


//////////////////////////////////

var apiRoute = express.Router();

apiRoute.use(function (req, res, next) {
  var token = req.query.token || req.headers["x-auth-token"];
  console.log(req.headers);
  if (token) {
    jwt.verify(token, secret, function(err, payload) {
      if (err) {
        return res.status(401).json({success: false, message: "Krivi token"});
      } else {
        next();
      }
    });
  } else {
    return res.status(401).json({success: false, message: "Fali token"});
  }
});

apiRoute.get("/users", function (req, res) {
  res.status(200).json(users);
});

app.use("/api", apiRoute);

//-------------------------------------------------------------------

function getUser(username, password) {
  
  for (var i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      return users[i];
    }
  }
  return null;
}

function verifyLogin(username, password){
  for (var i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      return true;
    }
  }
  return false;
}

function userExists(username) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].username == username) {
      return true;
    }
  }
  return false;
}

function updateUser(username,balance){
  for (var i = 0; i < users.length; i++) {
    if(users[i].username == username) {
      users[i].balance = balance;
    }
  }
}