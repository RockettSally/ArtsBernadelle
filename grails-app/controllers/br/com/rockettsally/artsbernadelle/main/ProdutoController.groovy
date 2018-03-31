package br.com.rockettsally.artsbernadelle.main

import grails.converters.JSON;

import org.springframework.http.HttpStatus;

class ProdutoController extends BaseController{
	
	String actionLabel;
	String productName;
	
    def index() {
		[title:"Produtos", produtoLabel:"Produto"]
	}
	
	def buscarProdutos(){
		try {
			List<Produto> produtoList = Produto.findAll();
			render(template:"../produto/tabela",model:[produtoList:produtoList]);
		} catch (Exception e) {
			log.error("Ocorreu um erro no método 'buscarProdutos' do controller 'Produto' " , e.printStackTrace());
			render(status:HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	def cadastrar(){
		List<TipoProduto> listTipoProduto = TipoProduto.findAll();
		List<Fornecedor> listFornecedor = Fornecedor.findAll();
		actionLabel = "Adicionar";
		productName = "Produto";
		render(template:"../produto/form",model:[produtoInstance:new Produto(), actionLabel:actionLabel, productName:productName, listTipoProduto:listTipoProduto, listFornecedor:listFornecedor]);
	}
	
	def editar(Long id){
		Produto produtoInstance = Produto.findById(id);
		List<TipoProduto> listTipoProduto = TipoProduto.findAll();
		List<Fornecedor> listFornecedor = Fornecedor.findAll();
		actionLabel = "Editar Cadastro -";
		productName = "(${produtoInstance?.codigo}) ${produtoInstance?.nome}";
		render(template:"../produto/form",model:[produtoInstance: produtoInstance, actionLabel:actionLabel, productName:productName, listTipoProduto:listTipoProduto, listFornecedor:listFornecedor]);
	}
	
	def salvar(Long id){
		def result = [];
		String msg;
		try {
			Produto produtoInstance = Produto.findById(id);
			Produto produtoExistente = Produto.findByCodigo(params['codigo']);
			
			if(produtoExistente && produtoInstance != produtoExistente){
				msg = "Ja existe um Produto com este código.";
				result = [status:Boolean.FALSE, msg: msg];
				render result as JSON;
				return;
			}
			
			if(produtoInstance){
				produtoInstance.properties = params;
				msg = "Produto Editado com Sucesso!";
			} else {
				produtoInstance = new Produto(params);
				msg = "Produto Cadastrado com Sucesso!";
			}
			produtoInstance.save(flush:true,failOnError:true);
			result = [status:Boolean.TRUE, msg: msg];
			render result as JSON;
			
		} catch (Exception e) {
			log.error("Ocorreu um erro no método 'salvar' do controller 'Produto' " , e.printStackTrace());
			render(status:HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	def deletar(Long id){
		def result = [];
		try {
			Produto produtoInstance = Produto.get(id);
			if(!produtoInstance){
				render(status:HttpStatus.BAD_REQUEST);
				log.error("Não há produto selecionado para deletar, tente novamente!");
				return
			}

			produtoInstance?.delete(flush:true,failOnError:true);
			result = [status:Boolean.TRUE, msg: 'Cadastro Removido com Sucesso'];
			
			render result as JSON;
			
		} catch (Exception e) {
			log.error("Ocorreu um erro no método 'deletar' do controller 'Produto' " , e.printStackTrace());
			render(status:HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
