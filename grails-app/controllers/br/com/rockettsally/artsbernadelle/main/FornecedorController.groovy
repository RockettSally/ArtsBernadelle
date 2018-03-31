package br.com.rockettsally.artsbernadelle.main

import org.springframework.http.HttpStatus;

import grails.converters.JSON;

class FornecedorController {

	String fornecedorActionLabel;
	String fornecedorName;
	
    def index() { 
		[title:"Fornecedores", fornecedorLabel:"Fornecedor"]
	}
	
	def buscarFornecedores(){
		try {
			List<Fornecedor> fornecedorList = Fornecedor.findAll();
			render(template:"../fornecedor/tabela",model:[fornecedorList:fornecedorList]);
		} catch (Exception e) {
			log.error("Ocorreu um erro no método 'buscarFornecedores' do controller 'fornecedor' " , e.printStackTrace());
			render(status:HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	def cadastrar(){
		fornecedorActionLabel = "Adicionar";
		fornecedorName = "Fornecedor";
		render(template:"../fornecedor/form",model:[fornecedorInstance:new Fornecedor(), fornecedorActionLabel:fornecedorActionLabel, fornecedorName:fornecedorName]);
	}
	
	def editar(Long id){
		Fornecedor fornecedorInstance = Fornecedor.get(id) ?: new Fornecedor();
		fornecedorActionLabel = "Editar";
		fornecedorName = "Fornecedor - ${fornecedorInstance?.nome}";
		render(template:"../fornecedor/form",model:[fornecedorInstance:fornecedorInstance, fornecedorActionLabel:fornecedorActionLabel, fornecedorName:fornecedorName]);
	}
	
	def salvar(Long id){
		def result = [];
		String msg;
		try {
			
			Fornecedor fornecedorInstance = Fornecedor.findById(id);
			Fornecedor fornecedorExistente = Fornecedor.findByNome(params['nome']);
			
			if(fornecedorInstance != fornecedorExistente){
				msg = "Ja existe um Fornecedor com este nome cadastrado.";
				result = [status:Boolean.FALSE, msg: msg];
				render result as JSON;
				return;
			}
			
			if(fornecedorInstance){
				fornecedorInstance.properties = params;
				msg = "Fornecedor Editado com Sucesso!";
			} else {
				fornecedorInstance = new Fornecedor(params);
				msg = "Fornecedor Cadastrado com Sucesso!";
			}
			
			fornecedorInstance.save(flush:true,failOnError:true);
			result = [status:Boolean.TRUE, msg: msg, fornecedorInstance:fornecedorInstance];
			render result as JSON;
			
		} catch (Exception e) {
			log.error("Ocorreu um erro no método 'salvar' do controller 'Fornecedor' " , e.printStackTrace());
			render(status:HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	def deletar(Long id){
		def result = [];
		try {
			Fornecedor fornecedorInstance = Fornecedor.get(id);
			if(!fornecedorInstance){
				render(status:HttpStatus.BAD_REQUEST);
				log.error("Não há produto selecionado para deletar, tente novamente!");
				return
			}
			
			if(fornecedorInstance?.produtos?.size() == 0){
				fornecedorInstance?.delete(flush:true,failOnError:true);
				result = [status:Boolean.TRUE, msg: 'Cadastro Removido com Sucesso'];
			} else {
				result = [status:Boolean.FALSE, msg: 'Existem Produtos deste Fornecedor.'];
			}
			
			render result as JSON;
			
		} catch (Exception e) {
			log.error("Ocorreu um erro no método 'deletar' do controller 'Fornecedor' " , e.printStackTrace());
			render(status:HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	def atualizarSelect(Long id){
		def result = [];
		try {
			Fornecedor fornecedorInstance = Fornecedor.get(id);
			List<Fornecedor> listFornecedor = Fornecedor.findAll();
			
			result = [status:Boolean.TRUE, listFornecedor: listFornecedor, fornecedorInstance:fornecedorInstance];
			render result as JSON;
			
			} catch (Exception e) {
			log.error("Ocorreu um erro no método 'atualizarSelect' do controller 'Fornecedor' " , e.printStackTrace());
			render(status:HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
