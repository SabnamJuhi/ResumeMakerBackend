const mongoose = require('mongoose');


// const Connection = async () => {


    // const URL = "mongodb+srv://Juhi:JuhiSabnam@cluster0.imjza4i.mongodb.net/sample";
    // const URL = 'mongodb+srv://Juhi:JuhiSabnam@cluster0.imjza4i.mongodb.net/sample?retryWrites=true&w=majority';
    // // mongoose.connect=""
    // // mongoose.connect="mongodb+srv://Juhi:<password>@cluster0.imjza4i.mongodb.net/?retryWrites=true&w=majority"
    // // const db = mongoose.connection;
    
        
    // //     db.once('open', () =>{
    // //         console.log('Connected to MongoDB');
    // //     })


    // try {
    //     await mongoose.connect(URL);
    //     console.log(mongoose.connection.host);
    // } catch (error) {
    //     console.log(error);
    // }
        
   
    // }
const Connection = () =>{
    // const DB = 'mongodb+srv://Juhi:JuhiSabnam@cluster0.imjza4i.mongodb.net/sample?retryWrites=true&w=majority';
    const DB = 'mongodb+srv://sjuhisarkars:Juhi%401234@cluster0.rr9tr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Adjust timeout if necessary
}).then(()=>{
    console.log(`Connection Successful`);
}).catch((err) => console.log(`no connection ${err}`))
}
 


module.exports = Connection;