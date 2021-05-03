const express = require('express')
const env = require('dotenv');
const app = express();

const mongoose = require('mongoose');
//rootes
const authRoutes = require('./src/rootes/auth')
const adminRoutes = require('./src/rootes/admin/auth')
const categoryRoutes = require('./src/rootes/cetegory')
    //envirement variable or you can say constants
env.config();
app.use(express.json());
//mongodb connection
//mongodb+srv://root:<password>@cluster0.rfqp4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.rfqp4.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("connected");
});
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);




app.listen(process.env.PORT, () => {
    console.log(`server is runing on port ${process.env.PORT}`)
});