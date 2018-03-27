jQuery(document).ready(function(){
	
	console.log('Hello produto.js');
	buscarProdutos();
	
	jQuery(document).on('click','#cadastrarProduto',function(){
		cadastrarProduto();
	});
	
	jQuery(document).on('click','#editarProduto',function(){
		idProduto = jQuery(this).attr('data-produto');
		editarProduto(idProduto);
	});
	
	jQuery(document).on('submit','.formProduto',function(event){
		event.preventDefault();
		event.stopPropagation();
		if(jQuery('#valorVenda').val() < 0){
			successToast('O valor não pode ser negativo!');
			return false;
		}
		salvarProduto(jQuery(this));
		return false;
	});
	
	jQuery(document).on('click','#cancelarCadastroProduto',function(){
		cancelarCadastro();
	});
	
	jQuery(document).on('click','#deletarProduto',function(){
		idProduto = jQuery(this).attr('data-produto');
		swal({
			title: "Deletar Cadastro",
			text: 'Você tem certeza que deseja remover este cadastro?',
			type: "warning",
			showCancelButton: true,
			confirmButtonText: "Deletar",
			cancelButtonText: "Cancelar",
			focusConfirm: false,
		}).then(function (){
			deletarProduto(idProduto);
		}, function (dismiss) {
			if (dismiss === 'cancel') {
				return
			}
		});
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
			updateFilters();
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
			if(data.status){
				jQuery('#divFormProduto').hide(500);
				successToast(data.msg);
				buscarProdutos();
			} else {
				warningToast(data.msg);
				hideLoading();
			}
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

function editarProduto(idProduto){
	showLoading('Carregando Produto...');
	jQuery.ajax({
		url: "editar",
		method: "GET",
		dataType: "html",
		data: {
			id:idProduto
		},
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
			updateMasks();
			hideLoading();
			return;
		}
	});
}

function deletarProduto(idProduto){
	showLoading('Removendo Cadastro...');
	jQuery.ajax({
		url: "deletar",
		method: "POST",
		dataType: "JSON",
		data: {
			id:idProduto
		},
		success: function(data){
			if(data.status){
				successToast(data.msg);
				buscarProdutos();	
			} else {
				dialogError('Oops', data.msg);
			}
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

function cancelarCadastro(){
	jQuery('#divFormProduto').hide(500);
	buscarProdutos();
}