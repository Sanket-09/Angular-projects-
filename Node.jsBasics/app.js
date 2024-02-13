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
// const http = require('http');

// const server = http.createServer((req,res)=>{
//     console.log("a new request has been received");
//     console.log(req);
// });

// server.listen(8000, '127.0.0.1', () => {
//     console.log('the server has started')
// });



// ************************HTTP REQUEST AND RESPONSE****************

const fs = require('fs');
const http = require('http');
const readline = require('readline');


const html = fs.readFileSync('./Template/index.html', 'utf-8');

const server = http.createServer((req,res) => {
    let path = req.url;
    
    if(path === '/' || path.toLocaleLowerCase()==='/home')
    res.end('You are in the homepage');

    else if(path.toLocaleLowerCase()==='/about'){
        res.end('You are in the about page ');
    }

    else if(path.toLocaleLowerCase()==='/contact'){
        res.end('You are in the contact page');
    }

    else
    res.end('You are in the default page')
})

server.listen(8000, '127.0.0.1', ()=>{
    console.log('The server has been started');
})
