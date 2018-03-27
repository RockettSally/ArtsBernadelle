package br.com.rockettsally.artsbernadelle.main

class Produto {
	
	String nome
	String codigo
	BigDecimal valorVenda
	BigDecimal valorCusto
	TipoProduto tipoProduto
	
    static constraints = {
		nome(nullable:true);
		codigo(nullable:true,unique:true);
		valorVenda(nullable:true);
		valorCusto(nullable:true);
		tipoProduto(nullable:true);
    }
}
