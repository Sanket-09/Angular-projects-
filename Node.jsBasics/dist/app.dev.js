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

var http = require('http');

var readline = require('readline'); //require('readline') returns an object


var url = require('url'); //returns an urk object


var replaceHtml = require('./modules/replaceHTML');

var html = fs.readFileSync('./Template/index.html', 'utf-8');
var products = JSON.parse(fs.readFileSync('./Data/product.json', 'utf-8'));
var productListHTML = fs.readFileSync('./Template/productList.html', 'utf-8');
var productDetailHTML = fs.readFileSync('./Template/product-details.html', 'utf-8');
var server = http.createServer(function (req, res) {
  var _url$parse = url.parse(req.url, true),
      query = _url$parse.query,
      path = _url$parse.pathname; // let path = req.url;


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
      var productHTMLArray = products.map(function (prod) {
        return replaceHtml(productListHTML, prod);
      });
      res.writeHead(200);
      res.end(html.replace('{{%CONTENT%}}', productHTMLArray));
    } else {
      var prod = products[query.id];
      var productDetailResponseHTML = replaceHtml(productDetailHTML, prod);
      res.end(html.replace('{{%CONTENT%}}', productDetailResponseHTML));
    }
  } else {
    res.writeHead(404);
    res.end(html.replace('{{%CONTENT%}}', 'You are in Default page'));
  }
});
server.listen(8000, '127.0.0.1', function () {
  console.log('The server has been started');
});