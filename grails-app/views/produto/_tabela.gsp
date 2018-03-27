<%@page import="br.com.rockettsally.artsbernadelle.main.ParseService"%>

<g:set var="index" value="${0}"></g:set>
<table id="tableProdutosList" class="datatable bordered highlight">
	<thead>
		<tr>
			<th style="width:85px !important;">
				Cod.
			</th>
			<th>
				Nome
			</th>
			<th>
				Valor de Venda
			</th>
			<th class="noSort" style="width:50px !important;">
			</th>
		</tr>
	</thead>
	<tbody>
	<g:each in="${produtoList}" var="produtoInstance">
		<tr>
			<td>
				${produtoInstance?.codigo}
			</td>
			<td>
				${produtoInstance?.nome}
			</td>
			<td>
				${produtoInstance?.valorVenda ? 'R$ ' + new ParseService().numberToString(produtoInstance?.valorVenda) : '-'}
			</td>
			<td>
				<a href="javascript:void(0)" id="editarProduto" class="blue-text" title="Editar Cadastro - ${produtoInstance?.nome}" data-produto="${produtoInstance?.id}"><i class="material-icons small">edit</i></a>
				<a href="javascript:void(0)" id="deletarProduto" class="red-text" title="Remover Cadastro - ${produtoInstance?.nome}" data-produto="${produtoInstance?.id}"><i class="material-icons small">delete</i></a>
			</td>
		</tr>
	</g:each>
	</tbody>
</table>