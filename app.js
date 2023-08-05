const http = require("http");

function handleRequest(request, response) {
  // localhost:3000/currenttime
  ///currenttime부분
  if (request.url === "/currenttime") {
    response.statusCode = 200;
    // new Date().toISOString() = 현재시간 출력
    response.end("<h1>" + new Date().toISOString() + "<h1>");
  } else if (request.url === "/") {
    // localhost:3000
    response.statusCode = 200; // 요청이 성공했는지 알리는 코드
    response.end("<h1>Hello World!<h1>"); // 보내야 하는 데이터를 전달 가능.
  }
}

const server = http.createServer(handleRequest); // 들어오는 요청을 받았을때 handleRequest 실행

server.listen(3000); // 포트 번호    주소창에 localhost:3000으로 접속가능.
// ctrl + c 입력시 서버 종료.
