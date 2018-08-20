/*_____________________________________________________________________________________ 
	____          _             __  _                _____            __
   /  _/_________(_)___ _____ _/ /_(_)___  ____     / ___/__  _______/ /____  ____ ___
   / // ___/ ___/ / __ `/ __ `/ __/ / __ \/ __ \    \__ \/ / / / ___/ __/ _ \/ __ `__ \
 _/ // /  / /  / / /_/ / /_/ / /_/ / /_/ / / / /   ___/ / /_/ (__  ) /_/  __/ / / / / /
/___/_/  /_/  /_/\__, /\__,_/\__/_/\____/_/ /_/   /____/\__, /____/\__/\___/_/ /_/ /_/
                /____/                                 /____/
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Author: Daniel
Date:   2018-06-21 01:05:31
Last Modified 2018-06-30
Last Modified time: 2018-06-30 18:51:48
_____________________________________________________________________________________*/


//OS PARAMENTROS PARA TOMADA DAS DECISÕES ESTÃO SENDO UPGRADED AQUI
//PÓREM ISSO NÃO É PRA ACONTECER
//ENTÃO É NECESSÁRIO MUDAR ISSO 


//COMO O MÓDULO 1 IRÁ SE COMPORTAR QUANDO HOUVER ERRO NA COMUNICAÇÃO?
//OU QUANDO TUDO OCORRER BEM?

module.exports = function(app){
	var decision = app.middleware.decision;
	var modelModulo1 = app.model.modulo1;

	var controllerModulo1 = {
		action:function(req,res){
			console.log(req.body);		
			var newData = new modelModulo1();
			newData.pH = req.body.pH;
			newData.umidade = req.body.umidade;
			newData.chuva = req.body.chuva;			
			newData.id_modulo = req.body.id_modulo;			
			newData.date = new Date();			
			newData.save(function (error) {
				if (error) {
					res.send('error');
					console.log(error);
				} else {					
					res.send('ok');					
					console.log(new Date());							
					decision.takeDecision(req.body.pH, req.body.umidade, req.body.chuva );			
				}
			});				
		}
	}

	return controllerModulo1;
}