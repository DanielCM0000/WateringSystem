/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   decision.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/12 20:31:06 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/12 23:47:40 by anonymous        ###   ########.fr       */
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
	var param = app.model.decision;
	var modelModulo3 =  app.model.modulo3;
	var ConectionToMdulo3 = app.middleware.connection;
	var lastTimeON = app.model.lastTimeON;

	var ponto_de_murcha;
	var	capacidade_de_campo;
	var	pH_max;
	var	pH_min;		

	var functions = {
		upDataParams: function () {
			console.log('upDataParams');
			param.find(function (error,data) {
				if(error){
					console.log(error);
				}else{
					if(data.length > 0){
						ponto_de_murcha 	= data[0].ponto_de_murcha;
						capacidade_de_campo = data[0].capacidade_de_campo;
						pH_max 				= data[0].pH_max;
						pH_min 				= data[0].pH_min;
					}					
				}
			});
		},

		takeDecision: function(chuva,pH,umidade){
			console.log("IRRIGAçÃO INTERROMPIDA");	
			console.log("COMEÇOU A CHOVER OU A UMIDADE ATINGIU A capacidade_de_campo");		
			if((chuva) == 1 || umidade>capacidade_de_campo){//sensor de chuva ON/OFF
				if(ConectionToMdulo3.connect('/down')){				
					modelModulo3.findOne(function(error, data) {
						if(error){
							console.log(error);
							res.status(500).send(error);//DB ERROR
						}else{
							if(data){							
								data.state = false;
								data.save(function(error){									
									res.redirect('/page1'); //ACHO QUE ISSO NÃO DEVERIA ESTAR AQUI
								});													
							}else{						
								console.log("no module 3 saved");
							}					
						}
					});	
					
				}
				return;
			}

			if(umidade<ponto_de_murcha){
				console.log("IRRIGAçãO INICIADA");
				console.log('Umidade menor que o ponto_de_murcha');
				if(ConectionToMdulo3.connect('/up')){					
					modelModulo3.findOne(function(error, data) {
						if(error){
							console.log(error);
							res.status(500).send(error);//DB ERROR
						}else{
							if(data){							
								data.state = true;
								data.save(function(error){									
									upDate_TheDate();
									res.redirect('/page1'); //ACHO QUE ISSO NÃO DEVERIA ESTAR AQUI
								});													
							}else{						
								console.log("no module 3 saved");
							}					
						}
					});						
				}	
				return;			
			}

			if((pH > pH_max) || (pH < pH_min)){
				console.log('(pH > pH_max) || (pH < pH_min');
				if(ConectionToMdulo3.connect('/powerDown')){//DESLIGAR A BOMBA					
					modelModulo3.findOne(function(error, data){
						if(error){
							console.log(error);
							res.status(500).send(error);//DB ERROR
						}else{
							if(data){							
								data.state = false;
								data.save(function(error){
									res.redirect('/page1'); //ACHO QUE ISSO NÃO DEVERIA ESTAR AQUI
								});													
							}else{						
								console.log("no module 3 saved");
							}					
						}
					});	
				}
				//DESATIVA O SISTEMA ATÉ QUE SEJA SOLUCIONADO
				// AVISAR O USÁRIO QUE O PH ESTÁ FORA DA FAIXA		
				return;		
			}
		}
	}	

	functions.upDataParams();


	function upDate_TheDate(){
		lastTimeON.findOne(function (error,data) {
			if(error) {

			}else{
				data.date = new Date();
				data.save();
			}
		});
	}		

	return functions;
}
