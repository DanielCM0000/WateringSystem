/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   modulo1.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 09:19:00 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/21 21:59:22 by anonymous        ###   ########.fr       */
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
	ESSA PARTE DO PROGRAMA É RESPONSAVEL POR RECEBER OS DADOS DO MÓDULO 1,
	ARMAZERNAR NO BANCO DE DADOS E PASSAR OS DADOS DO PH, CHUVA E UMIDADE PARA O
	PROGRAMA QUE TOMA A DECISÃO DE LIGAR, DESLIGAR OU INTERRONPER O SISTEMA ATRAVÉS
	irrigationcontroller.decideBasedOn(chuva, pH, umidade, date);
*/

module.exports = function(app){
	var irrigationcontroller = app.middleware.irrigationcontroller;
	var modulo1_model = app.model.modulo1;

	var modulo1_controller = {
		action:function(req,res){
			
			console.log(req.body);

			var chuva 	=	req.body.chuva;	
			var pH 		=	req.body.pH;
			var umidade =	req.body.umidade;
			var date 	= 	new Date();
					
			var newData			= new modulo1_model();
			newData.pH 			= pH;
			newData.umidade 	= umidade;
			newData.chuva 		= chuva	
			newData.id_modulo 	= req.body.id_modulo;		
			newData.date 		= date;			
			newData.save(function (error) {
				if (error) {					
					console.log(error);
				} else {							
					console.log("dados salvos");			
				}
			});	
			irrigationcontroller.decideBasedOn(chuva, pH, umidade, date);
			res.send(200);	
			res.end();
		}
	}

	return modulo1_controller;
}