
const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {

    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`your app is now listening @ port: ${port}`);
})