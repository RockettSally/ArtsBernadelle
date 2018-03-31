<html>
	<head>
		<meta name="layout" content="main"/>
		<title>${title} - Arts Bernadelle</title>
	</head>
	<body>
		<g:set var="isFornecedoresScreen" value="true"/>
		<div class="row">
			<div class="col s12">
				<h1>${title}</h1>
			</div>
		</div>
		<div class="divider"></div>
		<br/>
		<div class="row">
			<div class="col s12 right-align">
				<a href="javascript:void(0)" id="cadastrarFornecedor" class="blue waves-effect waves-light btn"><i class="material-icons left">add_circle_outline</i>Adicionar ${fornecedorLabel}</a>
			</div>
		</div>
		<!-- Form Aqui -->
		<div id="divFormFornecedor" class="display-none">
			
		</div>
		<div class="row">
			<!-- Tabela Aqui -->
			<div id="tabelaFornecedor" class="col s12 display-none">
			
			</div>
		</div>
		<g:javascript src="project/fornecedor.js"/>	
	</body>
</html>