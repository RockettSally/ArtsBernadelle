package br.com.rockettsally.artsbernadelle.main

class Produto {
	
	String nome
	String codigo
	BigDecimal valorVenda
	
    static constraints = {
		nome(nullable:true);
		codigo(nullable:true,unique:true);
		valorVenda(nullable:true);
    }
}
