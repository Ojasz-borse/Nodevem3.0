import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
dotenv.config();
const app = express()

app.use(express.json());

await connectDB();

app.get('/', (req, res) => {
  res.send('BOOKSTORE API IS RUNNING')
})

app.use("/api/auth/", authRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
