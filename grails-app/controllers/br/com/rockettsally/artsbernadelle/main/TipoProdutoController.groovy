package br.com.rockettsally.artsbernadelle.main

import org.springframework.http.HttpStatus;

import grails.converters.JSON;

class TipoProdutoController {
	
	String subActionLabel;
	String productTypeName;
	
    def index() { 
		[title:"Tipo de Produtos", produtoLabel:"Tipo de Produto"]
	}
	
	def buscarTipoProdutos(){
		try {
			List<TipoProduto> tipoProdutoList = TipoProduto.findAll();
			render(template:"../tipoProduto/tabela",model:[tipoProdutoList:tipoProdutoList]);
		} catch (Exception e) {
			log.error("Ocorreu um erro no método 'buscarTipoProdutos' do controller 'tipoProduto' " , e.printStackTrace());
			render(status:HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	def cadastrar(){
		subActionLabel = "Adicionar";
		productTypeName = "Tipo de Produto";
		render(template:"../tipoProduto/form",model:[tipoProdutoInstance:new TipoProduto(), subActionLabel:subActionLabel, productTypeName:productTypeName]);
	}
	
	def editar(Long id){
		TipoProduto tipoProdutoInstance = TipoProduto.get(id) ?: new TipoProduto();
		subActionLabel = "Editar";
		productTypeName = "Tipo de Produto - ${tipoProdutoInstance?.nome}";
		render(template:"../tipoProduto/form",model:[tipoProdutoInstance:tipoProdutoInstance, subActionLabel:subActionLabel, productTypeName:productTypeName]);
	}
	
	def salvar(Long id){
		def result = [];
		String msg;
		try {
			
			TipoProduto tipoProdutoInstance = TipoProduto.findById(id);
			TipoProduto tipoProdutoExistente = TipoProduto.findByNome(params['nome']);
			
			if(tipoProdutoInstance != tipoProdutoExistente){
				msg = "Ja existe um Tipo de Produto com este nome cadastrado.";
				result = [status:Boolean.FALSE, msg: msg];
				render result as JSON;
				return;
			}
			
			if(tipoProdutoInstance){
				tipoProdutoInstance.properties = params;
				msg = "Tipo Produto Editado com Sucesso!";
			} else {
				tipoProdutoInstance = new TipoProduto(params);
				msg = "Tipo Produto Cadastrado com Sucesso!";
			}
			
			tipoProdutoInstance.save(flush:true,failOnError:true);
			result = [status:Boolean.TRUE, msg: msg, tipoProdutoInstance:tipoProdutoInstance];
			render result as JSON;
			
		} catch (Exception e) {
			log.error("Ocorreu um erro no método 'salvar' do controller 'Produto' " , e.printStackTrace());
			render(status:HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	def deletar(Long id){
		def result = [];
		try {
			TipoProduto tipoProdutoInstance = TipoProduto.get(id);
			if(!tipoProdutoInstance){
				render(status:HttpStatus.BAD_REQUEST);
				log.error("Não há produto selecionado para deletar, tente novamente!");
				return
			}
			
			if(tipoProdutoInstance?.produtos?.size() == 0){
				tipoProdutoInstance?.delete(flush:true,failOnError:true);
				result = [status:Boolean.TRUE, msg: 'Cadastro Removido com Sucesso'];
			} else {
				result = [status:Boolean.FALSE, msg: 'Existem Produtos com este Tipo de Produto.'];
			}
			
			render result as JSON;
			
		} catch (Exception e) {
			log.error("Ocorreu um erro no método 'deletar' do controller 'Produto' " , e.printStackTrace());
			render(status:HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	def atualizarSelect(Long id){
		def result = [];
		try {
			TipoProduto tipoProdutoInstance = TipoProduto.get(id);
			List<TipoProduto> listTipoProduto = TipoProduto.findAll();
			
			result = [status:Boolean.TRUE, listTipoProduto: listTipoProduto, tipoProdutoInstance:tipoProdutoInstance];
			render result as JSON;
			
			} catch (Exception e) {
			log.error("Ocorreu um erro no método 'salvar' do controller 'Produto' " , e.printStackTrace());
			render(status:HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
