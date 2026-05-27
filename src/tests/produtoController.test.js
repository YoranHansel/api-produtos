const produtoController = require('../controllers/produtoController'); 
const { produto } = require('../models');

jest.mock('../models', () => ({
    produto: {
        findAll: jest.fn(),
        create: jest.fn(),
        findByPk: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn()
    }
}));

describe('ProdutoController Tests', () => {
    let req, res;

    beforeEach(() => {

        jest.clearAllMocks();

        req = {
            body: {},
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('index', () => {
        it('deve retornar a lista de produtos com status 200', async () => {
            const mockProdutos = [{ id: 1, nome: 'Teclado', preco: 150, quantidade: 10 }];
            produto.findAll.mockResolvedValue(mockProdutos);

            await produtoController.index(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProdutos);
        });

        it('deve retornar status 500 se o Sequelize falhar', async () => {
            produto.findAll.mockRejectedValue(new Error('Erro no banco'));

            await produtoController.index(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ erro: "Erro ao listar produtos" });
        });
    });

    describe('store', () => {
        it('deve criar um produto com sucesso se os dados forem válidos', async () => {
            req.body = { nome: 'Mouse', preco: 50, quantidade: 5 };
            const mockProdutoCriado = { id: 2, ...req.body };
            
            produto.create.mockResolvedValue(mockProdutoCriado);

            await produtoController.store(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProdutoCriado);
        });

        it('deve retornar status 400 se o preço for negativo', async () => {
            req.body = { nome: 'Mouse', preco: -10, quantidade: 5 };

            await produtoController.store(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ erro: "Preço não pode ser negativo" });
        });
    });
});