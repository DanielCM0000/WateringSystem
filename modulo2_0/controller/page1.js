/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   page1.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 09:19:00 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/15 02:20:27 by anonymous        ###   ########.fr       */
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
	var lastTimeON = app.model.lastTimeON;	
	var get_Module3_IP = app.middleware.IPmodulo3;	

	var data;

	var controllerPage1 = {
		index:async function (req, res) {

			request('http://'+ await get_Module3_IP() +'/status',function (error, response, body) {							
				console.log(body);
				var tr = JSON.parse(body);
				res.render('pages/page1', {state: tr.status});
			});		
		},

		turn:async function (req, res) {
			var action;
			if(req.params.turn == 'on')
				action = '/up';
			else
				action = '/down';			
						
			var ip = await get_Module3_IP();		
			request('http://'+ ip +action,function (error, response, body) {	
				if(!body)
					console.log("não conseguiu se conectar com o módulo 3");
				else						
					console.log(body);
				var tr = JSON.parse(body);
				res.render('pages/page1', {state: tr.status});
			});	
		},

		phChart:function (req,res) {	
			lastTimeON.find(function(error,data) {
				if (error) {
					console.log(error);
				}else{
					console.log(data[0].date);
					set_pH_DataInterval(data[0].date);										
				}
			});			

			function set_pH_DataInterval(date){
				var ph_array = [];
				var time_array = [];
				modelModulo1.find(function (error,data) {
					if(error){
						console.log(error);
					}else{
						for (var i = data.length - 1; i >= 0; i--) {						
							if(date.getTime() <= data[i].date.getTime()){
								ph_array.push(data[i].pH);	
								time_array.push(data[i].date);
							}														
						}	
						var JSONphChart ={
							labels: time_array,
							data: ph_array
						}
						res.send(JSONphChart);										
					}
				});	
			}					
		},

		umidadeChart:function (req,res) {
			lastTimeON.find(function(error,data) {
				if (error) {
					console.log(error);
				}else{
					set_umidade_DataInterval(data[0].date);										
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
			lastTimeON.find(function(error,data) {
				if (error) {
					console.log(error);
				}else{
					set_chuva_DataInterval(data[0].date);										
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
			//modelModulo1.find().where('date').gt(new date() - new date()).lt(new date()){}
			//http://mongoosejs.com/docs/queries.html

		}
	}

	return controllerPage1;
} 

async function function_name(argument) {
	var __data;
	await modelModulo1.find(async function (error,_data) {
		if(error){
			console.log(error);
		}else{
			__data = _data;										
		}
	});	
	return __data;
}