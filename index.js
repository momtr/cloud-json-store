const express = require('express');

const app = express();

app.use(express.json());

const api = require('./api');
app.use('/api/v1', api);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));