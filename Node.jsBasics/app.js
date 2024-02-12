// const readline = require('readline');

// // const rl = readline.createInterface({
// //     input : process.stdin,
// //     output : process.stdout
// // })

// // rl.question("please enter your name: ", (name)=>{
// //     console.log("You entered :" + name);
// //     rl.close();
// // })

// // rl.on('close', () =>{
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
const http = require('http');

const server = http.createServer((req,res)=>{
    console.log("a new request has been received");
    console.log(req);
});

server.listen(8000, '127.0.0.1', () => {
    console.log('the server has started')
});

