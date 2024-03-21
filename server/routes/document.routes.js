const express = require("express");
const router = express.Router();

const multer = require('multer');
const Tesseract = require('tesseract.js');

// Set up Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const languages = ['eng', 'ben'];



router.post('/', upload.single('nidImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Use Tesseract.js for OCR
  Tesseract.recognize(
    req.file.buffer,
    languages.join('+'),
    { 
      logger: info => console.log(info),  // Optional logger for debugging
      tessedit_ocr_engine_mode: 2, // Use LSTM OCR engine
    }
  ).then(({ data: { text } }) => {
    try {
      // Process the extracted text and validate NID
      // const dob = text.match(/\b\d{2} [A-Za-z]{3} \d{4}\b/);
      const id = text.match(/\b\d{10}\b/)[0];
      const textId = "ID NO: " + id;
      // const textDob = "Date of Birth: " + dob;
      // const finalText = textDob + "\n" + textId;

    return res.status(200).send(textId);

    } catch (error) {
      return res.status(401).send("This is not a valid nid card");
    }
  });
});




module.exports = router;