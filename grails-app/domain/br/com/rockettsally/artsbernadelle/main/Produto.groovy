package br.com.rockettsally.artsbernadelle.main

class Produto {
	
	String nome
	String codigo
	BigDecimal valorVenda
	BigDecimal valorCusto
	TipoProduto tipoProduto
	Fornecedor fornecedor
	
    static constraints = {
		nome(nullable:true);
		codigo(nullable:true,unique:true);
		valorVenda(nullable:true);
		valorCusto(nullable:true);
		tipoProduto(nullable:true);
		fornecedor(nullable:true);
    }
}
