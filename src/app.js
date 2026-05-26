const express = require("express");
const app = express();

app.use(express.json());

const routes = require('./routes/produtoRoutes');

app.use('/', routes);

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`)
});

module.exports = app;