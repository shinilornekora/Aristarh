import express, { Request, Response } from 'express';

const PORT = 3005;
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});