jQuery(document).ready(function(){
	
	console.log('Hello tipoProduto.js');
	buscarTipoProdutos();
	
	jQuery(document).on('click','#cadastrarTipoProduto',function(){
		cadastrarTipoProduto();
	});
	
	jQuery(document).on('submit','.formTipoProduto',function(event){
		event.preventDefault();
		event.stopPropagation();
		salvarTipoProduto(jQuery(this));
		return false;
	});
	
	jQuery(document).on('click','#editarTipoProduto',function(){
		idTipoProduto = jQuery(this).attr('data-tipo-produto');
		editarProduto(idTipoProduto);
	});
	
	jQuery(document).on('click','#cancelarCadastroTipoProduto',function(){
		cancelarCadastro();
	});
	
	jQuery(document).on('click','#deletarTipoProduto',function(){
		idTipoProduto = jQuery(this).attr('data-tipo-produto');
		swal({
			title: "Deletar Cadastro",
			text: 'Você tem certeza que deseja remover este cadastro?',
			type: "warning",
			showCancelButton: true,
			confirmButtonText: "Deletar",
			cancelButtonText: "Cancelar",
			focusConfirm: false,
		}).then(function (){
			deletarTipoProduto(idTipoProduto);
		}, function (dismiss) {
			if (dismiss === 'cancel') {
				return
			}
		});
	});
	
});

function buscarTipoProdutos(){
	showLoading('Carregando Tipos de Produto...');
	jQuery.ajax({
		url: "buscarTipoProdutos",
		method: "GET",
		dataType: "html",
		success: function(data){
			jQuery('#tabelaTipoProdutos').html(data);
			jQuery('#tabelaTipoProdutos').show(500);
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

function cadastrarTipoProduto(){
	showLoading('Carregando Formulário...');
	jQuery.ajax({
		url: "cadastrar",
		method: "GET",
		dataType: "html",
		success: function(data){
			jQuery('#divFormTipoProduto').html(data);
			jQuery('#divFormTipoProduto').show(500);
			jQuery('#tabelaTipoProdutos').hide(500);
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

function salvarTipoProduto($theForm){
	showLoading('Salvando Tipo de Produto...');
	jQuery.ajax({
		url: "salvar",
		method: "POST",
		dataType: "JSON",
		data: $theForm.serialize(),
		success: function(data){
			if(data.status){
				jQuery('#divFormTipoProduto').hide(500);
				successToast(data.msg);
				buscarTipoProdutos();
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

function editarProduto(idTipoProduto){
	showLoading('Carregando Tipo de Produto...');
	jQuery.ajax({
		url: "editar",
		method: "GET",
		dataType: "html",
		data: {
			id:idTipoProduto
		},
		success: function(data){
			jQuery('#divFormTipoProduto').html(data);
			jQuery('#divFormTipoProduto').show(500);
			jQuery('#tabelaTipoProdutos').hide(500);
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
	resetForm('.formTipoProduto');
	jQuery('#divFormTipoProduto').hide(500);
	buscarTipoProdutos();
}

function deletarTipoProduto(idProduto){
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
				buscarTipoProdutos();	
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