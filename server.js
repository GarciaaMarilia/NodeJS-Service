const http = require("http");
const url = require("url");
const { authenticateToken, SECRET_KEY } = require("./auth");
const { authorizeRoles } = require("./authorize");
const jwt = require("jsonwebtoken");

const hostname = "127.0.0.1";
const port = 3000;

const loggerMiddleware = (req, res, next) => {
 console.log(`Logger Middleware: ${req.method} request for ${req.url}`);
 next();
};

const headerMiddleware = (req, res, next) => {
 console.log("Header Middleware: Adding custom header");
 res.setHeader("X-Custom-Header", "Middleware Test");
 next();
};

const applyMiddleware = (req, res, middlewares, finalHandler) => {
 const runMiddleware = (index) => {
  if (index < middlewares.length) {
   middlewares[index](req, res, () => runMiddleware(index + 1)); // recursao?
  } else {
   finalHandler();
  }
 };
 runMiddleware(0);
};

const parseBody = (req, callback) => {
 let body = "";
 req.on("data", (chunk) => {
  body += chunk.toString();
 });
 req.on("end", () => {
  callback(JSON.parse(body));
 });
};

const server = http.createServer((req, res) => {
 const parsedUrl = url.parse(req.url, true).pathname;

 const middlewares = [loggerMiddleware, headerMiddleware];

 if (
  parsedUrl === "/about" ||
  parsedUrl === "/contact" ||
  parsedUrl === "/contact"
 ) {
  middlewares.push(authenticateToken);
 }

 applyMiddleware(req, res, middlewares, () => {
  if (parsedUrl === "/") {
   res.statusCode = 200;

   res.end("Hello, world!\n");
  } else if (parsedUrl === "/about") {
   res.statusCode = 200;

   res.end("About Page\n");
  } else if (parsedUrl === "/contact") {
   res.statusCode = 200;

   res.end("Contact Page\n");
  } else if (parsedUrl === "/data" && req.method === "POST") {
   parseBody(req, (data) => {
    console.log("Received data:", data);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Data received succesfully", data }));
   });
  } else {
   res.statusCode = 404;

   res.end("Page not found\n");
  }
 });
});

server.listen(port, hostname, () => {
 console.log(`Server running at http://${hostname}:${port}/`);
});
