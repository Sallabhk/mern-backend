const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

env.config();
//middleware : when u r making a req from the browser or postman making req and handling request u write some function to manipulate th data is middleware

//mongodb 
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pusno.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
    }).then(() => {
        console.log('DB connected')
    });

//routes
app.use(bodyParser.json());
app.use('/api',userRoutes);
app.use('/api',adminRoutes);


app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})