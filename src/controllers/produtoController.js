// importa o model produto do models/index.js
const { produto } = require('../models');

class produtoController {

    // GET /produtos — lista todos os produtos
    async index(req, res) {
        const produtos = await produto.findAll(); // SELECT * FROM produtos
        return res.status(200).json(produtos);
    }

    // POST /produtos — cadastra um novo produto
    async store(req, res) {
        // desestrutura os dados do corpo da requisição
        const { nome, preco, quantidade } = req.body;

        // INSERT INTO produtos (nome, preco, quantidade) VALUES (...)
        const produtoCreated = await produto.create({
            nome,
            preco,
            quantidade
        });

        return res.status(200).json(produtoCreated); // retorna o produto criado
    }

    // PUT /produtos/:id — atualiza um produto pelo ID
    async update(req, res) {
        const { id } = req.params;               // pega o id da URL
        const { nome, preco, quantidade } = req.body; // pega os novos dados

        // UPDATE produtos SET nome=?, preco=?, quantidade=? WHERE id=?
        await produto.update(
            { nome, preco, quantidade }, // o que atualizar
            { where: { id: id } }        // qual registro
        );

        return res.status(200).json({ mensagem: "Produto atualizado com sucesso" });
    }

    // DELETE /produtos/:id — remove um produto pelo ID
    async destroy(req, res) {
        const { id } = req.params; // pega o id da URL

        // DELETE FROM produtos WHERE id=?
        await produto.destroy({
            where: { id: id }
        });

        // json() aceita apenas um argumento — objeto com a mensagem
        return res.status(200).json({ mensagem: "Produto deletado com sucesso" });
    }
}

// exporta uma instância da classe para usar nas rotas
module.exports = new produtoController();