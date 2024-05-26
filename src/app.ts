import dotenv from 'dotenv';
import mongoose from 'mongoose';
import  express from 'express';
import userRoutes from './routes/user.routes';
import { Request, Response } from 'express';

dotenv.config();

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI!, {
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req : Request, res: Response) =>{
  res.status(200)
  res.send("Welcome")
})

app.use((err: any, req: any, res: any, next: any) => {
  console.log("middleware called")
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/api/users', userRoutes)

export default app;
