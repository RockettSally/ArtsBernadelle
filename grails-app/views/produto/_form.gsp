<g:form action="salvarCadastroExistente" controller="produto" class="formProduto">
	<fieldset>
	<div class="row title-row">
		<div class="col s12"><h5>${actionLabel} ${productName}</h5></div>
	</div>
	<div class="row">
		<g:hiddenField name="id" value="${produtoInstance?.id}"/>
        <div class="input-field col s12 l2">
	        <i class="material-icons prefix">code</i>
	        <g:textField name="codigo" id="codigo" type="text" required class="codigo" value="${produtoInstance?.codigo}"/>
	        <label for="codigo">Código do Produto <b>*</b></label>
        </div>
        <div class="input-field col s12 l6">
        	<i class="material-icons prefix">label_outline</i>
	        <g:textField name="nome" id="nome" type="text" required class="nome" value="${produtoInstance?.nome}"/>
	        <label for="nome">Nome do Produto <b>*</b></label>
        </div>
		<div class="input-field col s12 l4">
        	<i class="fas fa-list-ul small prefix"></i>
	        <g:select name="tipoProduto" id="tipoProduto" class="tipoProduto" from="" optionKey="id" optionValue="nome" noSelection="${['null':'Selecione...']}" value="${produtoInstance?.tipoProduto}"/>
	        <label for="tipoProduto">Tipo de Produto</label>
        </div>
	</div>
	<div class="row">
	    <div class="input-field col s12 l2">
        	<i class="fas fa-dollar-sign small prefix"></i>
	        <g:textField name="valorVenda" id="valorVenda" type="text" class="valorVenda" value="${produtoInstance?.valorVenda}"/>
	        <label for="valorVenda">Valor de Venda</label>
        </div>
	    <div class="input-field col s12 l2">
        	<i class="fas fa-money-bill-alt small prefix"></i>
	        <g:textField name="valorCusto" id="valorCusto" type="text" class="valorCusto" value="${produtoInstance?.valorCusto}"/>
	        <label for="valorCusto">Custo</label>
        </div>
	</div>
	<div class="row">
		<div class="col s12">
			<g:actionSubmit id="salvarCadastro" class="green waves-effect waves-light btn" value="Salvar"/>
			<a href="javascrip:void(0)" id="cancelarCadastroProduto" class="grey lighten-1 waves-effect waves-light btn">Cancelar</a>
		</div>
	</div>
	</fieldset>
</g:form>