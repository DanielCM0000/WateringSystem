/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   irrigationcontroller.js                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 09:19:00 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/15 00:54:19 by anonymous        ###   ########.fr       */
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
	ESSE PROGRAMA TOMA AS DECIÕES AUTOMAMATICAMENTE PRA LIGAR OU DELIGAR O SISTEMA DE 
	IRRIGAÇÃO BASEADO NOS DADOS DE PH MÁX E MIN, CAPACIDADE DE CAMPO E PONTO DE MUCHAR
	ESSES DADOS ESTÃO SALVOS NO BANCO DE DADOS E SÃO AUTUALIZADOS PELO USUÁRIO NA 
	INTERFACE PRA CONFIGURAÇÃO DESSES PARAMETROS.

	ESSE MÓDULO OFERECE DUAS FUNÇÕES QUE PODEM SER ACESSADAS POR OUTRAS PARTES DO PROGRAMA:
	upDataParams QUE ATUALIZA OS DADOS PRA FAZER A COMPARAÇÃO COM O VALORES 
	ATUAIS DOS SENSORES.
	takeDecision QUE TOMA UMA DECISÃO BASEADA NOS DADOS ATUAIS DOS SENSORES E NOS VALORES
	PADRÃO ADICIONADOS PELOS USUÁRIOS E QUE SEMPRE SÃO ATUALIZADAS PELAS FUNÇÃO upDataParams.

	DENTRO DESSE MÓDULO TBM HÁ DUAS FUNÇÕES AUXILIARES QUE AJUDAM A SALVAR OS DADOS NO 
	BANCO DE DADOS: upDate_TheDate E upDate_Module3Status(status). A PRIMEIRA ATUALIZA 
	HORA QUE OS DADOS DO MODULO CHEGOU E A SEGUNDA ATUALIZA O STATUS (LIGADO/DELIGADO)
	DO MÓDULO 3.

*/
var request = require('request');

module.exports = function (app) {
	
	var modelModulo3 =  app.model.modulo3;
	var lastTimeON = app.model.lastTimeON;
	var decisionparameters = app.model.decisionparameters;
	
	//PARAMENTROS QUE SÃO COMPARADOS COM OS DADOS DOS SENSORES
	var ponto_de_murcha, capacidade_de_campo, pH_max, pH_min;	

	async function update_TheDate(date){
		await lastTimeON.findOne(function (error,data) {
			if(error) {
				console.log(error)
			}else{
				data.date = date;
				data.save();
			}
		});
	}	

	
	async function get_Module3_IP(){
		var _ip;
		await modelModulo3.findOne(function(error, data) {							
			if(error){
				console.log(error);
			}else{				
				if(data){								
					ip = data.ip;																		
				}else{						
					console.log("no module 3 saved");
				}					
			}
		});	
		return ip;	
	}		
	

	var functions = {		
		updateParameters: function () {
			console.log('updateParameters');
			decisionparameters.find(function (error,data) {
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

		decideBasedOn: async function(chuva,pH,umidade,date){					
			var IPdomodulo3 = await get_Module3_IP();	
			console.log(IPdomodulo3);		
			if((pH > pH_max) || (pH < pH_min)){// AVISAR O USÁRIO QUE O PH ESTÁ FORA DA FAIXA
				if(pH > pH_max){
					console.log("pH: " + pH);
					console.log("pH_max: " + pH_max);
					console.log("o pH é superior ao valor de pH máximo");
				}
				if(pH < pH_min){
					console.log("pH: " + pH);
					console.log("pH_min: " + pH_min);
					console.log("o pH é inferior ao valor de pH mínino");
				}

				request('http://'+ IPdomodulo3 +'/down',function (error, response, body) {
					console.log(body);						
				});	

			}else{
				if((chuva) == 1 || umidade>capacidade_de_campo){//sensor de chuva ON/OFF
					if((chuva) == 1){
						console.log("chuva:" + chuva);
						console.log("ESTÁ CHOVENDO");
					}
					if(umidade>capacidade_de_campo){
						console.log("umidade: " + umidade);
						console.log("capacidade_de_campo:" + capacidade_de_campo);
						console.log("A UMIDADE ATINGIU A capacidade_de_campo");	
					}
	
					request('http://'+ IPdomodulo3 +'/down',function (error, response, body) {
						console.log(body);						
					});				
				
				}

				if(umidade<ponto_de_murcha){
					if(umidade>capacidade_de_campo){
						console.log("umidade: " + umidade);
						console.log("ponto_de_murcha:" + ponto_de_murcha);
						console.log("A UMIDADE ATINGIU o ponto_de_murcha");	
					}	
					
					request('http://'+ IPdomodulo3 +'/up',function (error, response, body) {							
						console.log(body);
						var tr = JSON.parse(body);
						if(tr.status == 1 && tr.previous_status ==0){									
							update_TheDate(date);	
						}
					});							
				}
			}								
		}
	}			

	functions.updateParameters();

	return functions;
}