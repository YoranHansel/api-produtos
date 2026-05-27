const { produto } = require('../models');

class produtoController {

  
    async index(req, res) {
        
    try{

        const produtos = await produto.findAll(); 
        return res.status(200).json(produtos);
    
    }catch (error){
        return res.status(500).json({
            erro: "Erro ao listar produtos"
        });
    }
}
    async store(req, res) {
      
    try{
        const { nome, preco, quantidade } = req.body;

        const produtoCreated = await produto.create({
            nome,
            preco,
            quantidade
        });

        if(!nome || preco == null || quantidade == null){
        return res.status(404).json({
            erro: "Nome, preço e quantidade são obrigatórios"
        })
       }

       if(preco < 0){
        
         return res.status(400).json({
            erro: "Preço não pode ser negativo"
         });
       }

       if(quantidade < 0){

        return res.status(400).json({
            erro: "Quantidade não pode ser negativa"
        });
       }

       if (isNaN(preco)) { 
                return res.status(400).json({ 
                    erro: "Preço deve ser um número" 
                }); 
            } 
 
            if (isNaN(quantidade)) { 
                return res.status(400).json({ 
                    erro: "Quantidade deve ser um número" 
                }); 
            } 
 
            if (Number(preco) < 0) { 
                return res.status(400).json({ 
                    erro: "Preço não pode ser negativo" 
                }); 
            } 
 
            if (Number(quantidade) < 0) { 
                return res.status(400).json({ 
                    erro: "Quantidade não pode ser negativa" 
                }); 
            }

        return res.status(200).json(produtoCreated); 
    
    }catch (error) {
        return res.status(500).json({
            erro: "Erro ao cadastrar produto"
        });
    }
}

    async update(req, res) {
        
    try{
        
        const { id } = req.params;              
        const { nome, preco, quantidade } = req.body; 

       const produtoExiste = await produto.findByPk(id);

       if(!produtoExiste){

         return res.status(404).json({
            erro: "Produto não encontrado"
         })
       }

       if(!nome || preco == null || quantidade == null){
        return res.status(404).json({
            erro: "Nome, preço e quantidade são obrigatórios"
        })
       }

       if(preco < 0){
        
         return res.status(400).json({
            erro: "Preço não pode ser negativo"
         });
       }

       if(quantidade < 0){

        return res.status(400).json({
            erro: "Quantidade não pode ser negativa"
        });
       }

       if (isNaN(preco)) { 
                return res.status(400).json({ 
                    erro: "Preço deve ser um número" 
                }); 
            } 

            if (isNaN(quantidade)) { 
                return res.status(400).json({ 
                    erro: "Quantidade deve ser um número" 
                }); 
            } 

            if (Number(preco) < 0) { 
                return res.status(400).json({ 
                    erro: "Preço não pode ser negativo" 
                }); 
            } 
 
            if (Number(quantidade) < 0) { 
                return res.status(400).json({ 
                    erro: "Quantidade não pode ser negativa" 
                }); 
            }

        await produto.update(
            { nome, preco, quantidade }, 
            { where: { id: id } }        
        );

        return res.status(200).json({ mensagem: "Produto atualizado com sucesso" });
    
    }catch (error) {
        return res.status(500).json({
            erro: "Erro ao atualizar produto"
        });
    }
}
    async destroy(req, res) {
        
    try{
        
        const { id } = req.params; 

        await produto.destroy({
            where: { id: id }
        });

        return res.status(200).json({ mensagem: "Produto deletado com sucesso" });
    
    }catch (error){
       return res.status(500).json({
         erro: "Erro ao excluir produto"
       })
    }
  }
}
module.exports = new produtoController();