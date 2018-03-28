package br.com.rockettsally.artsbernadelle.main

import org.springframework.http.HttpStatus;

import grails.converters.JSON;

class TipoProdutoController {

    def index() { }
	
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
			result = [status:Boolean.TRUE, msg: msg];
			render result as JSON;
			
		} catch (Exception e) {
			log.error("Ocorreu um erro no método 'salvar' do controller 'Produto' " , e.printStackTrace());
			render(status:HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	def atualizarSelect(){
		def result = [];
		try {
			List<TipoProduto> listTipoProduto = TipoProduto.findAll();
			
			result = [status:Boolean.TRUE, listTipoProduto: listTipoProduto];
			render result as JSON;
			
			} catch (Exception e) {
			log.error("Ocorreu um erro no método 'salvar' do controller 'Produto' " , e.printStackTrace());
			render(status:HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
