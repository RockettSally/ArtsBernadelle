<g:set var="index" value="${0}"></g:set>
<table id="tableProdutosList" class="datatable bordered highlight">
	<thead>
		<tr>
			<th style="width:85px !important;">
				Nº
			</th>
			<th style="width:60% !important;">
				Nome
			</th>
			<th>
				Produtos com este Tipo
			</th>
			<th class="noSort" style="width:50px !important;">
			</th>
		</tr>
	</thead>
	<tbody>
	<g:each in="${tipoProdutoList}" var="tipoProdutoInstance">
		<tr>
			<td>
				${++index}
			</td>
			<td>
				<b>${tipoProdutoInstance?.nome}</b>
			</td>
			<td>
				${tipoProdutoInstance?.produtos?.size()}
			</td>
			<td>
				<a href="javascript:void(0)" id="editarTipoProduto" class="blue-text" title="Editar Cadastro - ${tipoProdutoInstance?.nome}" data-tipo-produto="${tipoProdutoInstance?.id}"><i class="material-icons small">edit</i></a>
				<a href="javascript:void(0)" id="deletarTipoProduto" class="red-text" title="Remover Cadastro - ${tipoProdutoInstance?.nome}" data-tipo-produto="${tipoProdutoInstance?.id}"><i class="material-icons small">delete</i></a>
			</td>
		</tr>
	</g:each>
	</tbody>
</table>