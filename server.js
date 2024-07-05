const http = require("http");

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

const applyMiddleware = (req, res, middlewares) => {
 const runMiddleware = (index) => {
  if (index < middlewares.length) {
   middlewares[index](req, res, () => runMiddleware(index + 1)); // recursao?
  }
 };
 runMiddleware(0);
};

const server = http.createServer((req, res) => {
 const middlewares = [loggerMiddleware, headerMiddleware];

 applyMiddleware(req, res, middlewares);

 const url = req.url; //Obtém a url da solicitacao recebida

 if (url === "/") {
  res.statusCode = 200;

  res.end("Hello, world!\n");
 } else if (url === "/about") {
  res.statusCode = 200;

  res.end("About Page\n");
 } else if (url === "/contact") {
  res.statusCode = 200;

  res.end("Contact Page\n");
 } else {
  res.statusCode = 404;

  res.end("Page not found\n");
 }
});

server.listen(port, hostname, () => {
 console.log(`Server running at http://${hostname}:${port}/`);
});
