package br.com.rockettsally.artsbernadelle.main

class TipoProduto {
	
	String nome;

	static hasMany = [produtos:Produto];
	
    static constraints = {
		nome(nullable:true, unique:true);
    }
}
