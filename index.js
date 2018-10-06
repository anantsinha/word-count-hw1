const http = require('http');
const url = require('url');
let server = http.createServer((req,res)=> {
  //Get the url and parse it
  let parsedUrl = url.parse(req.url);
  //Get the path and remove extra characters
  let path = parsedUrl.path.replace(/^\/+|\/+$/g,'');
  //Get the HTTP method
  let method = req.method;
  //Get the headers
  let headers = req.headers;
  //Get the payload as an object
  console.log('server listening on port 3000');
res.end();
});

server.listen(3000);
