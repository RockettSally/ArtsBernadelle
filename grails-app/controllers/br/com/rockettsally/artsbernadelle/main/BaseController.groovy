package br.com.rockettsally.artsbernadelle.main

class BaseController {
	
	static transactional = true
	
	def beforeInterceptor = [action:this.&interceptar]
	
	def interceptar() {
		log.debug(".")
		log.debug("CONTROLLER:ACTION -> $params.controller:$params.action")
		log.debug("PARAMS -> $params")
	}
}
