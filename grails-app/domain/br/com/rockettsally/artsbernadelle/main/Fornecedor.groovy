package br.com.rockettsally.artsbernadelle.main

class Fornecedor {
	
	String nome;
	
	static hasMany = [produtos:Produto]

    static constraints = {
		nome(nullable:true,unique:true);
    }
}
