const readline = require('readline');

// const rl = readline.createInterface({
//     input : process.stdin,
//     output : process.stdout
// })

// rl.question("please enter your name: ", (name)=>{
//     console.log("You entered :" + name);
//     rl.close();
// })

// rl.on('close', () =>{
//     console.log("Interface closed");
//     process.exit(404);
// })


const fs = require('fs');

//reading and writing to a file
let textIn = fs.readFileSync('./input.txt', 'utf-8')
console.log(textIn);

let content = `data read from input.txt: ${textIn} \n Date created: ${new Date()}`

fs.writeFileSync('./output.txt', content)