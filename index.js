
const express = require('express');
const bodyParser = require('body-parser');
const ConnectionDB = require('./userCollection/config/db');
const router = require('./userCollection/router/userRouter')
const cors = require('cors');
// const path = require('path');
const PDFDocument = require('pdfkit');
const app = express();



app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
ConnectionDB();




// Import the getUserData function


app.use('/api/v1/', router);


// app.use(express.static(path.join(__dirname, './myapp/build')));
// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, './myapp/build/index.html'));
// });

const PORT = 8007;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})