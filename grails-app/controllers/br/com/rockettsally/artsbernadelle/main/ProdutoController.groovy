package br.com.rockettsally.artsbernadelle.main

import grails.converters.JSON;

import org.springframework.http.HttpStatus;

class ProdutoController {
	
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
		actionLabel = "Adicionar";
		productName = "Produto";
		render(template:"../produto/form",model:[produtoInstance:new Produto(), actionLabel:actionLabel, productName:productName]);
	}
	
	def editar(Long id){	
		Produto produtoInstance = Produto.findById(id);
		actionLabel = "Editar Cadastro -";
		productName = "(${produtoInstance?.codigo}) ${produtoInstance?.nome}";
		render(template:"../produto/form",model:[produtoInstance: produtoInstance, actionLabel:actionLabel, clientName:productName]);
	}
	
	def salvar(Long id){
		def result = [];
		String msg;
		try {
			Produto produtoInstance = Produto.findById(id);
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
	
}
