"use strict";

// const readline = require('readline');
// // const rl = readline.createInterface({  //create interfact is a method on object readline
// //     input : process.stdin,
// //     output : process.stdout
// // })
// // rl.question("please enter your name: ", (name)=>{
// //     console.log("You entered :" + name);
// //     rl.close();
// // })
// // rl.on('close', () =>{     //listens to an event, here that event is close
// //     console.log("Interface closed");
// //     process.exit(404);
// // })
// const fs = require('fs');
// // //reading and writing to a file
// // let textIn = fs.readFileSync('./input.txt', 'utf-8')
// // console.log(textIn);
// // let content = `data read from input.txt: ${textIn} \n Date created: ${new Date()}`
// // fs.writeFileSync('./output.txt', content);
// // console.log()
// //reading and writing file asynchronously
// fs.readFile('./start.txt', 'utf-8' , (error, data) => {
//     console.log(data);
//     fs.readFile(`./${data}.txt`, 'utf-8' , (error1, data1)=>{
//         console.log(data1);
//     })
// });
// console.log('Reading file')
// const readLine = require('readLine');
// const fs = require('fs');
// const http = require('http');
// const server = http.createServer((req,res)=>{
//     console.log("a new request has been received");
//     console.log(req);
// });
// server.listen(8000, '127.0.0.1', () => {
//     console.log('the server has started')
// });
// ************************HTTP REQUEST AND RESPONSE****************
var fs = require('fs');

var http = require('http'); //required to create a server


var readline = require('readline'); //require('readline') returns an object


var url = require('url'); //returns an url object


var events = require('events');

var replaceHtml = require('./modules/replaceHTML');

var user = require('./modules/user');

var html = fs.readFileSync('./Template/index.html', 'utf-8'); //this is how you insert html in backend

var products = JSON.parse(fs.readFileSync('./Data/product.json', 'utf-8')); // converting json object to js object

var productListHTML = fs.readFileSync('./Template/productList.html', 'utf-8');
var productDetailHTML = fs.readFileSync('./Template/product-details.html', 'utf-8');
var server = http.createServer();
server.on('request', function (req, res) {
  var _url$parse = url.parse(req.url, true),
      query = _url$parse.query,
      path = _url$parse.pathname; //initialising extraction of query parameters
  // let path = req.url;


  if (path === '/' || path.toLocaleLowerCase() === '/home') {
    res.writeHead(200);
    res.end(html.replace('{{%CONTENT%}}', 'You are in home page'));
  } else if (path.toLocaleLowerCase() === '/about') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'my-header': 'Hello world'
    });
    res.end(html.replace('{{%CONTENT%}}', 'You are in About Page'));
  } else if (path.toLocaleLowerCase() === '/contact') {
    res.writeHead(200);
    res.end(html.replace('{{%CONTENT%}}', 'You are in Contact Page'));
  } else if (path.toLocaleLowerCase() === '/products') {
    if (!query.id) {
      //used when the url doesnt has any query then it will show all product page
      var productHTMLArray = products.map(function (prod) {
        return replaceHtml(productListHTML, prod); //converted into js object
      });
      res.writeHead(200); //send response as 200 OK

      res.end(html.replace('{{%CONTENT%}}', productHTMLArray));
    } else {
      var prod = products[query.id]; //if there is a query in the url having id then

      var productDetailResponseHTML = replaceHtml(productDetailHTML, prod);
      res.end(html.replace('{{%CONTENT%}}', productDetailResponseHTML));
    }
  } else {
    res.writeHead(404);
    res.end(html.replace('{{%CONTENT%}}', 'You are in Default page'));
  }
});
server.listen(8000, '127.0.0.1', function () {
  console.log('The server has been started at port 8000');
});
var myEmitter = new user(); //here myEmitter is storing an instance of eventEmitter class

myEmitter.on('User Created', function (id, name) {
  console.log("A new user with id ".concat(id, " and name ").concat(name, " is created!!!!!!"));
});
myEmitter.on('User Created', function (id, name) {
  console.log("A new user2 with id ".concat(id, " and name ").concat(name, " is added in the database!!!"));
});
myEmitter.emit('User Created', 270, 'Sanket');