const http = require('http')
const moment = require('moment')

const server = http.createServer((request, response) => {
  if (request.url === '/time') {
    const dateTime = moment().format("MMM Do YY")

    response.writeHead(200, {'Content-Type': 'application/json'})
    response.write(JSON.stringify({time: dateTime}))
    response.end()
  }

  if (request.url === '/greet') {
    if (request.method === 'POST') {
      request.on('data', async (data) => {
        const body = JSON.parse(data.toString())

        response.writeHead(200, {'Content-Type': 'application/json'})
        response.write(JSON.stringify({ message: `Hello ${body.name}`}))
        response.end()
      })
    }
  }
}).listen(3000, () => {
  console.log('Server running on port 3000')
})