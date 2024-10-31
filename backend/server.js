const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { parseResume } = require('./api/upload-resume');
const generateCVRouter = require('./api/generate-cv');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS
app.use(cors());

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only PDF files are allowed!'));
  }
});

// Add this before your routes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use(express.json());
console.log('JSON middleware enabled');

// Handle resume upload
app.post('/api/upload-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await parseResume(req.file.buffer);
    res.json(result);
  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({ error: 'Failed to process resume' });
  }
});

app.use('/api/generate-cv', generateCVRouter);
console.log('generateCV router mounted at /api/generate-cv');

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Available routes:');
  console.log('- POST /api/upload-resume');
  console.log('- POST /api/generate-cv');
});