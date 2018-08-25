/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   configuracao.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 09:19:00 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/23 15:29:07 by anonymous        ###   ########.fr       */
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
/*
	
*/

module.exports = function (app) {
	var updateParameters = app.model.decisionparameters;
	var irrigationcontroller = app.middleware.irrigationcontroller;

	var controllerconfiguracao = {
		index:function (req, res) {
			updateParameters.find(function (error, data) {
				if(error){
					console.log(error);
					res.status(500).send(error);// DEALING WITH DB ERROR
				}else{					
					if(data.length > 0){	
						console.log(data);
						res.render('pages/configuracao',{ param: data});												
					}else{
						console.log('CREATE FAKE DATA');
						var fake_data = [{
							ponto_de_murcha : 0, 
							capacidade_de_campo : 0, 
							pH_max : 0, 
							pH_min : 0
						}];
						res.render('pages/configuracao',{param: fake_data});
					}
				}
			});		
			
		},		

		update:function (req, res) {
			updateParameters.findOne(function(error, data){				
				if(error){
					console.log(error);
					res.status(500).send(error);// DEALING WITH DB ERROR
				}else{						
					console.log(data);
					var d;
					if(data){
						d = data;
						console.log("data already exist");
					}else{
						d =  new updateParameters();
						console.log("data doesn't exist");
					}

					d.ponto_de_murcha = req.body.ponto_de_murcha; 
					d.capacidade_de_campo = req.body.capacidade_de_campo; 
					d.pH_max = req.body.pH_max; 
					d.pH_min = req.body.pH_min;
					d.save(function(error){
						if(error){
							console.log(error);
						}else{
							console.log("Saved");
							irrigationcontroller.updateParameters();
							res.send(200);
						}							
					}); 						
				}
			});			
		}
	}
	
	return controllerconfiguracao;
}