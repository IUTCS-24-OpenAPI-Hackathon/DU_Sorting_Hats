var express = require('express')
var app = express()

app.use(express.static('src'))

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(4100, () => console.log('Server running on port 4100'))