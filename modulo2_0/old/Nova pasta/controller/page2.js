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

module.exports = function (app) {
	var parametros = app.model.decision;
	var decision = app.middleware.decision;
	var controllerPage2 = {
		index:function (req, res) {
			parametros.find(function (error, data) {
				if(error){
					console.log(error);
					res.status(500).send(error);// DEALING WITH DB ERROR
				}else{					
					if(data.length > 0){	
						console.log(data);
						res.render('pages/page2',{ param: data});												
					}else{
						//CREATE FAKE DATA
						console.log('CREATE FAKE DATA');
						var fake_data = [{
							ponto_de_murcha : 0, 
							capacidade_de_campo : 0, 
							pH_max : 0, 
							pH_min : 0
						}];
						res.render('pages/page2',{param: fake_data});
					}
				}
			});		
			
		},		

		update:function (req, res) {
			parametros.findOne(function(error, data){
				console.log(data);
				if(error){
					console.log(error);
					res.status(500).send(error);// DEALING WITH DB ERROR
				}else{		
					if(data){	
						console.log("data already exist");
						data.ponto_de_murcha = req.body.ponto_de_murcha; 
						data.capacidade_de_campo = req.body.capacidade_de_campo; 
						data.pH_max = req.body.pH_max; 
						data.pH_min = req.body.pH_min;
						data.save(); 
						decision.upDataParams();
					}else{						
						console.log("data doesn't exist");
						var param = new parametros();
						param.ponto_de_murcha = req.body.ponto_de_murcha; 
						param.capacidade_de_campo = req.body.capacidade_de_campo; 
						param.pH_max = req.body.pH_max; 
						param.pH_min = req.body.pH_min;
						param.save(); 
						console.log("Saved");
						decision.upDataParams();
					}
				}
			});			
		}
	}
	
	return controllerPage2;
}