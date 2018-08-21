/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   page1.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 09:19:00 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/21 01:36:29 by anonymous        ###   ########.fr       */
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
var request = require('request');

module.exports = function (app) {	
	var modelModulo1 = app.model.modulo1;	
	var get_Module3_IP = app.middleware.IPmodulo3;	
	var modelModulo3 =  app.model.modulo3;

	var data;

	var controllerPage1 = {
		index:async function (req, res){
			var Module3_IP = await get_Module3_IP();
			if(Module3_IP == undefined){
				console.log("NÃO HÁ NENHUM MÓDULO 3 CONFIGURADO NO SISTEMA");//NÃO HÁ NENHUM MÓDULO 3 CONFIGURADO NO SISTEMA
				res.render('pages/page1', {state: false});
			}else{
				request('http://'+ Module3_IP +'/status',function (error, response, body) {	
					console.log("here");						
					console.log(body);
					if(body != undefined){//FAZER A PÁGINA INICIAL AVISE SE O MÓDULO 3 ESTÁ CONECTADO OU NÃO
						var tr = JSON.parse(body);
						res.render('pages/page1', {state: tr.status});
					}else{
						console.log("O MÓDULO 3 NÃO ESTÁ CONECTADO A REDE");//O MÓDULO 3 NÃO ESTÁ CONECTADO A REDE
						res.render('pages/page1', {state: false});
					}								
				});	
			}				
		},

		turn:async function (req, res){
			var action;
			if(req.params.turn == 'on')
				action = '/up';
			else
				action = '/down';			
						
			var Module3_IP = await get_Module3_IP();		
			request('http://'+ Module3_IP +action,function (error, response, body) {	
				if(!body)
					console.log("não conseguiu se conectar com o módulo 3");
				else						
					console.log(body);
				if(body != undefined){//FAZER A PÁGINA INICIAL AVISE SE O MÓDULO 3 ESTÁ CONECTADO OU NÃO
					var tr = JSON.parse(body);
					res.render('pages/page1', {state: tr.status});
				}				
			});	
		},		

		chartData:async function (req,res) {
			var date = await get_the_date_last_time_module3_was_on();
			if(date != undefined){
				console.log(date);
				set_DataInterval(date);
			}

			function set_DataInterval(_date){
				var date = new Date(_date);
				var ph_array = [];
				var umidade_array = [];
				var chuva_array = [];
				var time_array = [];
				modelModulo1.find(function (error,data) {
					if(error){
						console.log(error);
					}else{
						for (var i = data.length - 1; i >= 0; i--) {						
							if(date.getTime() <= data[i].date.getTime()){
								ph_array.push(data[i].pH);
								umidade_array.push(data[i].umidade); 
								chuva_array.push(data[i].chuva);	
								time_array.push(data[i].date);								 
							}														
						}	
						var JSONphChart ={
							labels: time_array,
							pH: ph_array,
							umidade: umidade_array,
							chuva: chuva_array
						}
						
						res.send(JSONphChart);										
					}
				});	
			}	
		}

	}

	async function get_the_date_last_time_module3_was_on(){
		var _date;
		await modelModulo1.findOne(async function (error,data) {		
			if(error){
				console.log(error);
			}else{
				if(data)
					_date = data.date
			}
		});	
		return _date;
	}

	return controllerPage1;
} 




//modelModulo1.find().where('date').gt(new date() - new date()).lt(new date()){}
//http://mongoosejs.com/docs/queries.html

/*
,

		umidadeChart:function (req,res) {
			modelModulo3.find(function(error,data) {
				if (error) {
					console.log(error);
				}else{
					if(data == undefined || !data){
						return;
					}else{
						set_umidade_DataInterval(data[0].date);
					}															
				}
			});	


			function set_umidade_DataInterval(date){
				var umidade_array = [];
				var time_array = [];
				modelModulo1.find(function (error,data) {
					if(error){
						console.log(error);
					}else{
						for (var i = data.length - 1; i >= 0; i--) {
							if(date.getTime() <= data[i].date.getTime()){
								umidade_array.push(data[i].umidade);	
								time_array.push(data[i].date);
							}											
						}	
						var JSONphChart ={
							labels: time_array,
							data: umidade_array
						}
						res.send(JSONphChart);					
					}
				});		
			}				
		},

		chuvaChart:function (req,res) {		
			modelModulo3.find(function(error,data) {
				if (error) {
					console.log(error);
				}else{
					if(data == undefined || !data){
						return;
					}else{
						set_chuva_DataInterval(data[0].date);
					}															
				}
			});	
						

			function set_chuva_DataInterval(date){
				var chuva_array = [];
				var time_array = [];			
				modelModulo1.find(function (error,data) {
					if(error){
						console.log(error);
					}else{
						for (var i = data.length - 1; i >= 0; i--) {
							if(date.getTime() <= data[i].date.getTime()){
								chuva_array.push(data[i].chuva);	
								time_array.push(data[i].date);
							}												
						}	
						var JSONphChart ={
							labels: time_array,
							data: chuva_array
						}
						res.send(JSONphChart);					
					}
				});	
			}
		}
*/