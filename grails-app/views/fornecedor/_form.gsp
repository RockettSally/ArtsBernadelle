<g:form id="formFornecedor" action="salvar" controller="fornecedor" class="formFornecedor">
	<fieldset>
		<div class="row title-row">
			<div class="col s12">
				<h5>${fornecedorActionLabel ? fornecedorActionLabel + ' ' : ''}${fornecedorName ?: 'Fornecedor'}</h5>
			</div>
		</div>
		<div class="input-field col s12 l6">
			<g:hiddenField name="id" value="${fornecedorInstance?.id}"/>
			<i class="material-icons prefix">label_outline</i>
			<g:textField name="nome" id="nome" type="text" required class="nome" value="${fornecedorInstance?.nome}"/>
			<label for="nome">Nome do Fornecedor <b>*</b></label>
		</div>
		<g:if test="${fornecedorInstance?.produtos?.size() > 0}">
			<div class="row title-row">
				<div class="col s12">
					<h5>Produtos deste Fornecedor</h5>
				</div>
			</div>
			<div class="row">
				<div class="col s12">
					<table class="bordered highlight">
						<thead>
							<tr>
								<th>Nome</th>
							</tr>
						</thead>
						<tbody>
							<g:each in="${fornecedorInstance?.produtos}" var="produtoInstance">
								<tr>
									<td>
										<b>${produtoInstance?.nome}</b>
									</td>
								</tr>
							</g:each>
						</tbody>
					</table>
				</div>
			</div>
		</g:if>
		<div class="row">
			<div class="col s12">
				<g:actionSubmit id="salvarFornecedor" class="green waves-effect waves-light btn" value="Salvar"/>
				<a href="javascrip:void(0)" id="cancelarCadastroFornecedor" class="grey lighten-1 waves-effect waves-light btn">Cancelar</a>
			</div>
		</div>
	</fieldset>
</g:form>
<br/>
<br/>