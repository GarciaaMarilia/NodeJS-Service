const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
 res.setHeader("Content-Type", "text/plain"); // Define conteudo como texto simples

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
