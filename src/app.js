// server.js (or app.js)
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const apiRoutes = require('./routes/apiRoutes');
const mongoose = require('mongoose');
const FAQ = require('./models/faqModel'); // Your FAQ model
const adminRouter = require('./src/admin/adminRouter');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Set up routes
app.use('/api', apiRoutes);

// Route to delete FAQ by ID
app.delete('/faqs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFAQ = await FAQ.findByIdAndDelete(id);

    if (!deletedFAQ) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

mongoose.connect('mongodb://localhost:27017/faqdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
