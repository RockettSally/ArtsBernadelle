package br.com.rockettsally.artsbernadelle.main

class TipoProduto {
	
	String nome;

    static constraints = {
		nome(nullable:true, unique:true);
    }
}
