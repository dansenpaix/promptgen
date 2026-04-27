const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up storage for uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Mock image generation endpoint
app.post('/api/generate', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  // MOCK: In a real app, you would send this to stability.ai / runway / etc.
  // Instead, we simulate a delay and return the placeholder image
  console.log('Received image, simulating generation...');
  setTimeout(() => {
    res.json({
      success: true,
      // We will copy our placeholder to the public folder of the client,
      // but for now, we can just return a placeholder remote text 
      // or we can handle it directly on the client side since we generated a local file.
      // We'll return a mock url that the client will interpret to load the placeholder.
      imageUrl: '/placeholder.png'
    });
  }, 3000); // 3 second delay to show the drafting animation
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
