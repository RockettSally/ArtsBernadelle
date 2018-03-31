<g:set var="index" value="${0}"></g:set>
<table class="datatable bordered highlight">
	<thead>
		<tr>
			<th style="width:85px !important;">
				Nº
			</th>
			<th style="width:60% !important;">
				Nome
			</th>
			<th>
				Produtos deste Fornecedor
			</th>
			<th class="noSort" style="width:50px !important;">
			</th>
		</tr>
	</thead>
	<tbody>
	<g:each in="${fornecedorList}" var="fornecedorInstance">
		<tr>
			<td>
				${++index}
			</td>
			<td>
				<b>${fornecedorInstance?.nome}</b>
			</td>
			<td>
				${fornecedorInstance?.produtos?.size()}
			</td>
			<td>
				<a href="javascript:void(0)" id="editarFornecedor" class="blue-text" title="Editar Cadastro - ${fornecedorInstance?.nome}" data-fornecedor="${fornecedorInstance?.id}"><i class="material-icons small">edit</i></a>
				<a href="javascript:void(0)" id="deletarFornecedor" class="red-text" title="Remover Cadastro - ${fornecedorInstance?.nome}" data-fornecedor="${fornecedorInstance?.id}"><i class="material-icons small">delete</i></a>
			</td>
		</tr>
	</g:each>
	</tbody>
</table>