import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('About Page')
})

app.post('/data', (req, res) => {
  res.send('Data received')
})  
app.post("/create", (req, res) => {
  res.send("Create endpoint hit");
});

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000)