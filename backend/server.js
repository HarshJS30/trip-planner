const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const planRouter = require('./routes/route');  

const app = express();
const port = process.env.PORT||5000;

const mongoURI = 'mongodb+srv://admin:harsh9451cluster0.abh2p.mongodb.net/trip_planner';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


app.use(cors()); 
app.use(express.json());  

app.use('/plans', planRouter);  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
