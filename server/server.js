import express from 'express';
import cors from 'cors';

const app = express();
import { router as plans } from './routes/plans.js';

app.use(express.json());
app.use(cors());

app.use('/plan' , plans);

app.use('/', (req, res) => {
    res.send('Hejka tu lenka!');
});


app.listen(5000, () => {
    console.log('Server started on port 5000');
});