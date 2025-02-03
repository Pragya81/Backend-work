// import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRoutes from './src/routes/apiRoutes.js';
import adminRouter from './src/admin/adminRouter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// API routes
app.use('/api', apiRoutes);

// AdminJS panel
app.use('/admin', adminRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/faqdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
