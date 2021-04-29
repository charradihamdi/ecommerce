const express = require('express')
const env = require('dotenv');
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
//rootes
const userRoutes = require('./src/rootes/user')

//envirement variable or you can say constants
env.config();
app.use(bodyparser.json());
//mongodb connection
//mongodb+srv://root:<password>@cluster0.rfqp4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.rfqp4.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("connected");
});
app.use('/api', userRoutes);





app.listen(process.env.PORT, () => {
    console.log(`server is runing on port ${process.env.PORT}`)
});