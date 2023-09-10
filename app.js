const fs = require('fs');  // file system
const path = require('path');

const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "<h1>");
}); // localhost:3000/currenttime

app.get("/", function(req, res) {
  res.send(
    "<form action='/store-user' method='POST'><label>Your Name: </label><input type='text' name='username'><button>Submit</button></form>"
  );  
}); // localhost:3000/

app.post("/store-user", function(req, res) {
  const userName = req.body.username;

  const filePath = path.join(__dirname, 'data', 'users.json');
  // __dirname = 프로젝트 디렉토리에 대한 절대 경로를 실제로 보유하는 내장된 변수

  const fileData = fs.readFileSync(filePath); // 데이터 텍스트화
  const existingUsers = JSON.parse(fileData);  // 자바스크립트 객체, 배열로 변환

  existingUsers.push(userName); // 추가할 데이터

  fs.writeFileSync(filePath, JSON.stringify(existingUsers)); // 경로, 데이터  // 데이터 저장.

  res.send("<h1>Username stored!</h1>");
});

app.get('/users', function(req, res) {
  const filePath = path.join(__dirname, 'data', 'users.json');

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  let responseData = '<ul>';

  for (const user of existingUsers) {
    responseData += '<li>' + user + '</li>';
    responseData += '</ul>';
  }

  res.send(existingUsers);
})

app.listen(3000);
