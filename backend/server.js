require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const imageRoute = require('./routes/image')
const PORT = process.env.PORT || 8000
const connDb = require('./db/db')

//Middlewares
const corsOption = {
  credentials: true,
  origin: ['https://image-gallery-project-alpha.vercel.app']
}

app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', imageRoute)

//Mongodb connection
connDb()

app.get("/", async (req, res) => {
  res.send("Hello Success");
});

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});








