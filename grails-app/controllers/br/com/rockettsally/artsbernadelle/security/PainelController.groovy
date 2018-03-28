package br.com.rockettsally.artsbernadelle.security

import org.springframework.dao.DataIntegrityViolationException

class PainelController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "home");
    }
	
	def home(){
		
	}
}
