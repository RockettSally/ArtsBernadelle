jQuery(document).ready(function(){
	
	console.log('Hello produto.js');
	buscarProdutos();
	
	jQuery(document).on('click','#cadastrarProduto',function(){
		cadastrarProduto();
	});
	
	jQuery(document).on('submit','.formProduto',function(event){
		event.preventDefault();
		event.stopPropagation();
		salvarProduto(jQuery(this));
		return false;
	});
	
});

function buscarProdutos(){
	showLoading('Carregando Produtos...');
	jQuery.ajax({
		url: "buscarProdutos",
		method: "GET",
		dataType: "html",
		success: function(data){
			jQuery('#tabelaProdutos').html(data);
			jQuery('#tabelaProdutos').show(500);
			criarDataTables();
		},
		error: function(request, status, error, data) {
			dialogError('Oops','Ocorreu um erro interno de Servidor');
		},
		complete: function(){
			hideLoading();
			return;
		}
	});
}

function cadastrarProduto(){
	showLoading('Carregando Formulário...');
	jQuery.ajax({
		url: "cadastrar",
		method: "GET",
		dataType: "html",
		success: function(data){
			jQuery('#divFormProduto').html(data);
			jQuery('#divFormProduto').show(500);
			jQuery('#tabelaProdutos').hide(500);
		},
		error: function(request, status, error, data) {
			dialogError('Oops','Ocorreu um erro interno de Servidor');
		},
		complete: function(){
			Materialize.updateTextFields();
			hideLoading();
			updateMasks();
			return;
		}
	});
}

function salvarProduto($theForm){
	showLoading('Salvando Produto...');
	jQuery.ajax({
		url: "salvar",
		method: "POST",
		dataType: "JSON",
		data: $theForm.serialize(),
		success: function(data){
			jQuery('#divFormProduto').hide(500);
			successToast(data.msg);
			buscarProdutos();
		},
		error: function(request, status, error, data) {
			dialogError('Oops','Ocorreu um erro interno de Servidor');
			hideLoading();
		},
		complete: function(){
			return;
		}
	});
}