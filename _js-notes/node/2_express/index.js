console.clear();

import express from 'express';

const app = express();
const PORT = 666;

app.use(express.json);

app.get('/', (req, res) => {
    res.status(200);
    res.send('<h1>Hola desde Express</h1>');
    console.log('::Method::', req.method);
    console.log('::URL::', req.url);
    console.log('::HEADERS::', req.headers);
});
app.get('/:id', (req, res) => {
    // res.status(200);
    res.send(req.params.id);
    console.log(req.params);
});

app.listen(PORT, (error) => {
    if (!error) console.log(`Server running on port: http://localhost:${PORT}`);
    else console.log("Error occured, server can't start", error);
});
