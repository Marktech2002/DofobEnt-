 const mongoose = require('mongoose');
 
 // connect to db
 const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL ,  {useNewUrlParser: true});
        console.log(` Connected to MONGODB : ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1) ;
    } ;
 };

 module.exports = connectDb;