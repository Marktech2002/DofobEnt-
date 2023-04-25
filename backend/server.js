const express = require('express');
const colors = require('colors');
const app = express();
require('dotenv').config();
const { errorHandler } = require('./middlewares/errorMiddleware')
const port = process.env.PORT || 3000;
const connectDb = require('./config/db')

connectDb()
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// The routes
app.use('/dofob/products', require('./routes/productRoute'));
app.use('/dofob/user', require('./routes/userRoute'));
app.use('/dofob/orders', require('./routes/orderRoute'));
app.use('/dofob/payment', require('./routes/paymentRoute'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})