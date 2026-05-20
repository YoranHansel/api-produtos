const express = require("express");
const app = express();

// permite ler o corpo das requisições como JSON
app.use(express.json());

// importa as rotas — variável se chama 'routes'
const routes = require('./routes/produtoRoutes');

// registra as rotas — usa 'routes', o mesmo nome do require
app.use('/', routes);

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`)
});

module.exports = app;