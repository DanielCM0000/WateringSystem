/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   page2.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 09:19:00 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/13 15:18:31 by anonymous        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
/*_____________________________________________________________________________________ 
	____          _             __  _                _____            __
   /  _/_________(_)___ _____ _/ /_(_)___  ____     / ___/__  _______/ /____  ____ ___
   / // ___/ ___/ / __ `/ __ `/ __/ / __ \/ __ \    \__ \/ / / / ___/ __/ _ \/ __ `__ \
 _/ // /  / /  / / /_/ / /_/ / /_/ / /_/ / / / /   ___/ / /_/ (__  ) /_/  __/ / / / / /
/___/_/  /_/  /_/\__, /\__,_/\__/_/\____/_/ /_/   /____/\__, /____/\__/\___/_/ /_/ /_/
                /____/                                 /____/
_____________________________________________________________________________________*/

module.exports = function (app) {
	var updateParameters = app.model.decisionparameters;
	var irrigationcontroller = app.middleware.irrigationcontroller;
	var controllerPage2 = {
		index:function (req, res) {
			updateParameters.find(function (error, data) {
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
			updateParameters.findOne(function(error, data){
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
						irrigationcontroller.updateParameters();
					}else{						
						console.log("data doesn't exist");
						var param = new updateParameters();
						param.ponto_de_murcha = req.body.ponto_de_murcha; 
						param.capacidade_de_campo = req.body.capacidade_de_campo; 
						param.pH_max = req.body.pH_max; 
						param.pH_min = req.body.pH_min;
						param.save(); 
						console.log("Saved");
						irrigationcontroller.updateParameters();
					}
				}
			});			
		}
	}
	
	return controllerPage2;
}