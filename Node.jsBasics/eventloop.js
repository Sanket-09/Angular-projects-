const fs = require('fs')

console.log('Program has started')

// //stored in the first phase of the event loop
// //expired timers get stored in the first phase of the event loop
// setTimeout(() => {
//   console.log('Timer callback executed')
// }, 0)

// //gets called immediately , no time required
// //stored in the third phase of the event loop'
// //this function timer gets over after any other timer in the application so this should had been called before the setTimeout?
// //No, this is a known bug
// setImmediate(() => {
//   console.log('set immediate called')
// })

//this is the second phase , readFile is an IO task and they are performance intensive
//ie. it will take time to perform the task
//stored in the callback queue of the second phase , but by the time the event loop moves to the
//second phase it hasnt completed its execution so loop moves to the third phase

//second phase
fs.readFile('./assetTextFiles/input.txt', () => {
  console.log('File read complete')

  //first phase
  setTimeout(() => {
    console.log('Timer callback executed')
  }, 0)

  //third phase
  setImmediate(() => {
    console.log('set immediate called')
  })

  process.nextTick(() => {
    console.log('Process.nexttick is executed')
  })
})

console.log('Program has finished')

//microtask queue and nextTick queue
//they do not belong to any of the phases
