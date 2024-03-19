const http = require('http') //required to create a server
const server = http.createServer()
const fs = require('fs')

server.listen(8000, '127.0.0.1', () => {
  console.log('The Streams server has been started at port 8000')
})

//problem with this solution is node will have to load the entire file in the memory
// server.on('request', (req, res) => {
//   fs.readFile('./assetTextFiles/large-file.txt', (err, val) => {
//     if (err) {
//       res.end('Some error occured')
//       return
//     }

//     res.end(val)
//   })
// })

// //here we will use a readable and writable stream
// server.on('request', (req, res) => {
//   let readableStream = fs.createReadStream(
//     './assetTextFiles/large-file.txt',
//     'utf8'
//   )
//   readableStream.on('data', (dataChunk) => {
//     //here response is already a stream
//     res.write(dataChunk)
//   })

//   readableStream.on('end', () => {
//     res.end('No more data left to read')
//   })

//   readableStream.on('error', (error) => {
//     res.end(error.message)
//   })
// })

//third solution using the pipe method
server.on('request', (req, res) => {
  let rs = fs.createReadStream('./assetTextFiles/large-file.txt', 'utf-8')
  rs.pipe(res) //res is a writable stream
})
