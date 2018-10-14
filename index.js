const http = require('http');
const url = require('url');
let {StringDecoder} = require('string_decoder');

let server = http.createServer((req,res)=> {
  //Get the url and parse it
  let parsedUrl = url.parse(req.url);
  //Get the path and remove extra characters
  let path = parsedUrl.path.replace(/^\/+|\/+$/g,'');
  //Get the HTTP method
  let method = req.method;
  //Get the headers
  let headers = req.headers;
  //Get querystring as an object
  let queryStringObject = parsedUrl.pathname;
  console.log(queryStringObject);
  //Get the payload as an object
  console.log('server listening on port 3000');

  //parse payload and store it in buffer
  let stringDecoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data)=>{
    buffer+=stringDecoder.write(data);
  });

  req.on('end', ()=>{
    buffer+=stringDecoder.end();
  });
  
  res.end();
});

server.listen(3000);
