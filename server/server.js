import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', (req, res) => {
    res.send('Hejka tu lenka!');
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});