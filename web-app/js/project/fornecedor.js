jQuery(document).ready(function(){
	
	console.log('Hello fornecedor.js');
	buscarFornecedores();
	
	jQuery(document).on('click','#cadastrarFornecedor',function(){
		cadastrarFornecedor();
	});
	
	jQuery(document).on('submit','.formFornecedor',function(event){
		event.preventDefault();
		event.stopPropagation();
		salvarFornecedor(jQuery(this));
		return false;
	});
	
	jQuery(document).on('click','#editarFornecedor',function(){
		idFornecedor = jQuery(this).attr('data-fornecedor');
		editarFornecedor(idFornecedor);
	});
	
	jQuery(document).on('click','#cancelarCadastroFornecedor',function(){
		cancelarCadastro();
	});
	
	jQuery(document).on('click','#deletarFornecedor',function(){
		idFornecedor = jQuery(this).attr('data-fornecedor');
		swal({
			title: "Deletar Cadastro",
			text: 'Você tem certeza que deseja remover este cadastro?',
			type: "warning",
			showCancelButton: true,
			confirmButtonText: "Deletar",
			cancelButtonText: "Cancelar",
			focusConfirm: false,
		}).then(function (){
			deletarFornecedor(idFornecedor);
		}, function (dismiss) {
			if (dismiss === 'cancel') {
				return
			}
		});
	});
	
});

function buscarFornecedores(){
	showLoading('Carregando Fornecedores...');
	jQuery.ajax({
		url: "buscarFornecedores",
		method: "GET",
		dataType: "html",
		success: function(data){
			jQuery('#tabelaFornecedor').html(data);
			jQuery('#tabelaFornecedor').show(500);
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

function cadastrarFornecedor(){
	showLoading('Carregando Formulário...');
	jQuery.ajax({
		url: "cadastrar",
		method: "GET",
		dataType: "html",
		success: function(data){
			jQuery('#divFormFornecedor').html(data);
			jQuery('#divFormFornecedor').show(500);
			jQuery('#tabelaFornecedor').hide(500);
		},
		error: function(request, status, error, data) {
			dialogError('Oops','Ocorreu um erro interno de Servidor');
		},
		complete: function(){
			Materialize.updateTextFields();
			hideLoading();
			return;
		}
	});
}

function salvarFornecedor($theForm){
	showLoading('Salvando Tipo de Produto...');
	jQuery.ajax({
		url: "salvar",
		method: "POST",
		dataType: "JSON",
		data: $theForm.serialize(),
		success: function(data){
			if(data.status){
				jQuery('#divFormFornecedor').hide(500);
				successToast(data.msg);
				buscarFornecedores();
			} else {
				focusInput('#nome');
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

function editarFornecedor(idFornecedor){
	showLoading('Carregando Fornecedor...');
	jQuery.ajax({
		url: "editar",
		method: "GET",
		dataType: "html",
		data: {
			id:idFornecedor
		},
		success: function(data){
			jQuery('#divFormFornecedor').html(data);
			jQuery('#divFormFornecedor').show(500);
			jQuery('#tabelaFornecedor').hide(500);
		},
		error: function(request, status, error, data) {
			dialogError('Oops','Ocorreu um erro interno de Servidor');
		},
		complete: function(){
			Materialize.updateTextFields();
			hideLoading();
			return;
		}
	});
}

function cancelarCadastro(){
	resetForm('.formFornecedor');
	jQuery('#divFormFornecedor').hide(500);
	buscarFornecedores();
}

function deletarFornecedor(idFornecedor){
	showLoading('Removendo Cadastro...');
	jQuery.ajax({
		url: "deletar",
		method: "POST",
		dataType: "JSON",
		data: {
			id:idFornecedor
		},
		success: function(data){
			if(data.status){
				successToast(data.msg);
				buscarFornecedores();	
			} else {
				dialogError('Não foi possivel Remover', data.msg);
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