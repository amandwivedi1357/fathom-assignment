import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin:'*'
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;