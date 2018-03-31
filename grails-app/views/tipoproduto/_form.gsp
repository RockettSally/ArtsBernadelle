<!-- Modal Structure -->
<g:form id="formTipoProduto" action="salvar" controller="tipoProduto" class="formTipoProduto">
	<fieldset>
		<div class="row title-row">
			<div class="col s12">
				<h5>${subActionLabel ? subActionLabel + ' ' : ''}${productTypeName ?: 'Tipo de Produto'}</h5>
			</div>
		</div>
		<div class="input-field col s12 l6">
			<g:hiddenField name="id" value="${tipoProdutoInstance?.id}"/>
			<i class="material-icons prefix">label_outline</i>
			<g:textField name="nome" id="nome" type="text" required class="nome" value="${tipoProdutoInstance?.nome}"/>
			<label for="nome">Nome do Produto <b>*</b></label>
		</div>
		<div class="row">
			<div class="col s12">
				<g:actionSubmit id="salvarTipoProduto" class="green waves-effect waves-light btn" value="Salvar"/>
				<a href="javascrip:void(0)" id="cancelarCadastroTipoProduto" class="grey lighten-1 waves-effect waves-light btn">Cancelar</a>
			</div>
		</div>
	</fieldset>
</g:form>
<br/>
<br/>