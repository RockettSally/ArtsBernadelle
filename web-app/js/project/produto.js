jQuery(document).ready(function(){
	
	console.log('Hello produto.js');
	buscarProdutos();
	
	var modalTipoProdutoOpen = false;
	var modalFornecedorOpen = false;
	
	jQuery(document).on('click','#cadastrarProduto',function(){
		cadastrarProduto();
	});
	
	jQuery(document).on('click','#editarProduto',function(){
		idProduto = jQuery(this).attr('data-produto');
		editarProduto(idProduto);
	});
	
	jQuery(document).on('click','#abrirModalTipoProduto',function(){
		if(!modalTipoProdutoOpen){
			jQuery('#cadastroTipoProduto').show(500);
			modalTipoProdutoOpen = true;
		} else {
			jQuery('#cadastroTipoProduto').hide(500);
			modalTipoProdutoOpen = false;
		}
	});
	
	jQuery(document).on('click','#abrirModalFornecedor',function(){
		if(!modalFornecedorOpen){
			jQuery('#cadastroFornecedor').show(500);
			modalFornecedorOpen = true;
		} else {
			jQuery('#cadastroFornecedor').hide(500);
			modalFornecedorOpen = false;
		}
	});
	
	jQuery(document).on('submit','.formTipoProduto',function(event){
		event.preventDefault();
		event.stopPropagation();
		salvarTipoProduto(jQuery(this));
		return false;
	});
	
	jQuery(document).on('submit','.formFornecedor',function(event){
		event.preventDefault();
		event.stopPropagation();
		salvarFornecedor(jQuery(this));
		return false;
	});
	
	jQuery(document).on('submit','.formProduto',function(event){
		event.preventDefault();
		event.stopPropagation();
		if(jQuery('#valorVenda').val() < 0){
			focusInput('#valorVenda');
			successToast('O valor não pode ser negativo!');
			return false;
		}
		if(jQuery('#valorCusto').val() < 0){
			focusInput('#valorCusto');
			successToast('O valor não pode ser negativo!');
			return false;
		}
		salvarProduto(jQuery(this));
		return false;
	});
	
	jQuery(document).on('click','#cancelarCadastroProduto',function(){
		cancelarCadastro();
	});
	
	jQuery(document).on('click','#cancelarCadastroTipoProduto',function(){
		cancelarCadastroTipoProduto();
	});
	
	jQuery(document).on('click','#cancelarCadastroFornecedor',function(){
		cancelarCadastroFornecedor();
	});
	
	jQuery(document).on('focusout','#valorVenda',function(){
		jQuery(this).val(currencyParseFloat('#valorVenda'));
		Materialize.updateTextFields();
	});
	
	jQuery(document).on('focusout','#valorCusto',function(){
		jQuery(this).val(currencyParseFloat('#valorCusto'));
		Materialize.updateTextFields();
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
			fixCurrencyInputs();
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
				focusInput('#codigo');
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
			updateFilters();
			updateMasks();
			hideLoading();
			fixCurrencyInputs();
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

function cancelarCadastroTipoProduto(){
	modalTipoProdutoOpen = false;
	jQuery('#cadastroTipoProduto').hide(500);
}

function cancelarCadastroFornecedor(){
	modalFornecedorOpen = false;
	jQuery('#cadastroFornecedor').hide(500);
}

function salvarTipoProduto($theForm){
	showLoading('Salvando Tipo Produto...');
	jQuery.ajax({
		url: "../tipoProduto/salvar",
		method: "POST",
		dataType: "JSON",
		data: $theForm.serialize(),
		success: function(data){
			if(data.status){
				successToast(data.msg);
				resetForm('.formTipoProduto');
				jQuery('#cadastroTipoProduto').hide(500);
				atualizarSelectTipoProduto(data.tipoProdutoInstance.id);
			} else {
				warningToast(data.msg);
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

function atualizarSelectTipoProduto(idProdutoCriado){
	jQuery('.tipoProduto').empty();
	jQuery('.tipoProduto').append(new Option('Selecione', ''));
	jQuery('.tipoProduto').trigger('chosen:updated');
	
	jQuery.ajax({
		url: "../tipoProduto/atualizarSelect",
		type: "GET",
		dataType: "json",
		data: {
			id: idProdutoCriado
		},
		success : function(data) {
			jQuery(data.listTipoProduto).each(function( index, element ) {
				jQuery('.tipoProduto').append(new Option(element.nome, element.id));
			});
			jQuery('.tipoProduto').val(data.tipoProdutoInstance.id);
		},
		error : function(request, status, error, data) {
			dialogError('Oops!', 'Ocorreu um erro interno de Servidor');
		}
	}).done(function() {
		jQuery('.tipoProduto').trigger('chosen:updated');
		console.log("Select Built!");
	});
}


function salvarFornecedor($theForm){
	showLoading('Salvando Fornecedor...');
	jQuery.ajax({
		url: "../fornecedor/salvar",
		method: "POST",
		dataType: "JSON",
		data: $theForm.serialize(),
		success: function(data){
			if(data.status){
				successToast(data.msg);
				resetForm('.formFornecedor');
				jQuery('#cadastroFornecedor').hide(500);
				atualizarSelectFornecedor(data.fornecedorInstance.id);
			} else {
				warningToast(data.msg);
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

function atualizarSelectFornecedor(idFornecedor){
	jQuery('.fornecedor').empty();
	jQuery('.fornecedor').append(new Option('Nenhum', ''));
	jQuery('.fornecedor').trigger('chosen:updated');
	
	jQuery.ajax({
		url: "../fornecedor/atualizarSelect",
		type: "GET",
		dataType: "json",
		data: {
			id: idFornecedor
		},
		success : function(data) {
			jQuery(data.listFornecedor).each(function( index, element ) {
				jQuery('.fornecedor').append(new Option(element.nome, element.id));
			});
			jQuery('.fornecedor').val(data.fornecedorInstance.id);
		},
		error : function(request, status, error, data) {
			dialogError('Oops!', 'Ocorreu um erro interno de Servidor');
		}
	}).done(function() {
		jQuery('.fornecedor').trigger('chosen:updated');
		console.log("Select Built!");
	});
}

function fixCurrencyInputs(){
	jQuery('#valorVenda').val(fixCurrency('#valorVenda'));
	jQuery('#valorCusto').val(fixCurrency('#valorCusto'));
}
