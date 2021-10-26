require('dotenv').config()
const http = require('http')
const path = require('path')
const express = require('express')
const socketIo = require('socket.io')
const Twitter = require('twitter-lite')
const { RateLimiterMemory } = require('rate-limiter-flexible');

const PORT = process.env.PORT || 8001
const app = express()

const server = http.createServer(app)
const io = socketIo(server)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'client', 'index.html'))
})

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

function streamTweets(socket, filters) {
  const rateLimiter = new RateLimiterMemory(
    {
      points: 4,
      duration: 1,
    });

  return filters.map((filter) => {
    const stream = client.stream('statuses/filter', {track: filter})
      .on("start", response => console.log("start"))
      .on('data', async (tweet) => {  
        try {
          await rateLimiter.consume(socket.handshake.address, 2)
          socket.emit(`tweet`, {tweet, filter})
          console.log(filter, tweet.text);
        } catch (rejRes) {
          // TODO: emit loading signal
          console.log('retry in ', rejRes)
          // console.log('retry in ', rejRes.msBeforeNext)
        }
      })
      .on("ping", () => console.log("ping"))
      .on("error", error => console.log("error", error))
      .on("end", response => console.log("end"))
    
    return stream
  })
}

io.on('connection', async (socket) => {
  console.log('client connected')

  let streams;

  socket.on('tweet-request', ({ filters }) => {
      streams = streamTweets(socket, filters)
  });

  socket.on('stop', () => {
    console.log('stop stream')
    try{
      streams.forEach(stream => {
        process.nextTick(() => stream.destroy())
      })
    }
    catch(err) {
      console.log('destroy err', err)
    }
  })
})


server.listen(PORT, () => console.log(`Listening on port ${PORT}`, client))
