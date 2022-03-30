/* eslint-disable no-console */
const express = require('express');

const path = require('path');

const app = express();
const PORT = 3000;

app.get('*', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../client/index.html')));
app.listen(PORT, () => console.log(`Server is listening to you at port ${PORT}`));
