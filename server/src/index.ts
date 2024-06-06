import express, { Request, Response } from 'express';
import { PORT } from './constants';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});