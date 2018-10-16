const http = require('http');
const url = require('url');
let {StringDecoder} = require('string_decoder');

//create server
let server = http.createServer((req,res)=> {
  //Get the url and parse it
  let parsedUrl = url.parse(req.url);
  //Get the path and remove extra characters
  let path = parsedUrl.path.replace(/^\/+|\/+$/g,'');

  //get payload (coming from client) as an object
  let stringDecoder = new StringDecoder('utf-8');
  let buffer = '';
  //parse payload and store it in buffer as a String
  req.on('data', (data)=>{
    buffer+=stringDecoder.write(data);
  });


  req.on('end', ()=>{
    //call appropirate handler
    let chosenHandler = (router[path]!=undefined) ? router[path] : handlers.notFound;

      chosenHandler(buffer,(statusCode,response)=>{
        let responseString = JSON.stringify(response);
        res.setHeader('content-type','application/json');
        //write appropirate status code
        res.writeHead(statusCode);
        //send appropirate response
        res.end(responseString);
      });

  });
});


// Define handlers
let handlers = {}

//send back sentence,word and character count if user requested /hello
handlers.hello = (buffer,callback) =>{
  let counts = count(buffer);
  let message = {
    'message': 'Hi there! This is the word, sentence and character count of your text. This is assuming normal english senteces',
  };

  callback(200,Object.assign(message,counts));
}

//send not found message if user requested anything else
handlers.notFound = (buffer,callback)=>{
  callback(404,{
    'error': 'requested url not found',
    'error-code': 404,
  });
};

//define router
let router = {
  'hello': handlers.hello,
};

//start the server
server.listen(3000);

//function assumes that only actual english words are present in input text
//count number of words, sentences and characters in given string
// String => Object
function count (str){
  let words = 0;
  let sentences = 0;
  let characters = 0;

  for (let i=0; i<str.length; i++){
    //increase word count if there is a space or a new line
    if (str[i]==' '|| str[i]=='\n'){
      words++;
      characters++;
    }
    //increase sentence count if there is a fullstop/qmark,interrogation mark
    else if (str[i]=='.' || str[i]== '?' || str[i]=='!'){
      words++;
      sentences++;
      characters++;
    }
    //in all other cases just increase the character count
    else
      characters++;
  }
  //return all counts as an object
  return {
    'words': words,
    'sentences': sentences,
    'characters': characters
  };
}
