const http = require('http')
const moment = require('moment')

const server = http.createServer((req, res) => {
  // Route for /
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.writeHead(200, {'Ya': 'Trick'}) // We can send whatever header we want
    res.end()
  }
  // Route for /time
  else if (req.url === '/time') {
    const dateTime = moment().format('MMMM Do YYYY, h:mm:ss a')

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.write(JSON.stringify({time: dateTime}))
    res.end()
  }
  // Route for /greet
  else if (req.url === '/greet') {
    if (req.method === 'POST') {
      req.on('data', async (data) => {
        const body = JSON.parse(data.toString())

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({ message: `Hello ${body.name}`}))
        res.end()
      })
    }
  }
  else {
    res.writeHead(404, {'Content-Type': 'application/json'})
    res.write(JSON.stringify({404: `Page not found`}))
    res.end()
  }
}).listen(3000, () => {
  console.log('Server running on port 3000')
})