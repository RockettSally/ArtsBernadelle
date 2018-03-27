<g:set var="index" value="${0}"></g:set>
<table id="tableProdutosList" class="datatable bordered highlight">
	<thead>
		<tr>
			<th style="width:100px;">
				Nº
			</th>
			<th>
				Cod.
			</th>
			<th>
				Nome
			</th>
			<th>
				Valor de Venda
			</th>
			<th>
				
			</th>
		</tr>
	</thead>
	<tbody>
	<g:each in="${produtoList}" var="produtoInstance">
		<tr>
			<td style="width:50px !important;">
				${++index}
			</td>
			<td>
				${produtoInstance?.codigo}
			</td>
			<td>
				${produtoInstance?.nome}
			</td>
			<td>
				${produtoInstance?.valorVenda ?: '-'}
			</td>
			<td>
				<a href="javascript:void(0)" id="editarProduto" class="blue-text" title="Editar Cadastro - ${produtoInstance?.nome}" data-produto="${produtoInstance?.id}"><i class="material-icons small">edit</i></a>
				<a href="javascript:void(0)" id="deletarProduto" class="red-text" title="Remover Cadastro - ${produtoInstance?.nome}" data-produto="${produtoInstance?.id}"><i class="material-icons small">delete</i></a>
			</td>
		</tr>
	</g:each>
	</tbody>
</table>