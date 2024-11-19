// const fs = require('fs');
const PDFDocument = require('pdfkit');
const mongoose = require('mongoose');
const app = require('express')();
const blobStream = require('blob-stream');
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit...";
const doc = new PDFDocument();
const stream = doc.pipe(blobStream());

mongoose.connect('mongodb+srv://Juhi:JuhiSabnam@cluster0.imjza4i.mongodb.net/pdf_Document?retryWrites=true&w=majority');
const db = mongoose.connection;

db.once('open', () =>{
    console.log('Connected to MongoDB');
})


const mySchema = new mongoose.Schema({
    pdfContent: Buffer,
});

const myModel = mongoose.model('YourModel', mySchema);



const pdfBuffer = [];

doc.fontSize(25).text('Here is some vector graphics...', 100, 80);

// some vector graphics
doc
  .save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

doc.circle(280, 200, 50).fill('#6600FF');

// an SVG path
doc
  .scale(0.6)
  .translate(470, 130)
  .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  .fill('red', 'even-odd')
  .restore();

// and some justified text wrapped into columns
doc
  .text('And here is some wrapped text...', 100, 300)
  .font('Times-Roman', 13)
  .moveDown()
  .text(lorem, {
    width: 412,
    align: 'justify',
    indent: 30,
    columns: 2,
    height: 300,
    ellipsis: true
  });

// end and display the document in the iframe to the right



doc.on('data', (chunk) => {
    pdfBuffer.push(chunk);
  });

  doc.on('end', () => {
    const pdfData = Buffer.concat(pdfBuffer);
    const pdfDocument = new myModel({ pdfContent: pdfData });
  
    pdfDocument.save()
      .then(() => {
        console.log('PDF saved to the database.');
      })
      .catch((err) => {
        console.error(err);
      });
  });

  doc.end();

  // Serve PDF from MongoDB

app.get('/getPDF', (req, res) => {
    myModel.findOne({})
      .then((document) => {
        if (!document) {
          return res.status(404).send('PDF not found');
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="sample.pdf"');
        res.send(document.pdfContent);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error fetching PDF');
      });
  });

  

const PORT = 4001;
app.listen(
    PORT,
    () => console.log(`server is running on ${PORT}`)
);