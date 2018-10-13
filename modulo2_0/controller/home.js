/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   home.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 09:19:00 by anonymous         #+#    #+#             */
/*   Updated: 2018/10/11 15:37:07 by anonymous        ###   ########.fr       */
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

	var controllerhome = {
		redirect:function (req, res) {
			res.redirect("/home");
		},

		index:function (req, res){			
			modelModulo3.findOne( function(error, data) {							
				if(error){
					console.log(error);
				}else{				
					if(data){	
						index_action(data.ip);																	
					}else{						
						console.log("no module 3 saved");
						index_action();
					}					
				}
			});	

			function index_action(Module3_IP) {
				if(Module3_IP == undefined){
					console.log("NÃO HÁ NENHUM MÓDULO 3 CONFIGURADO NO SISTEMA");
					res.render('pages/home', {state: 3});
				}else{
					request('http://'+ Module3_IP +'/status',function (error, response, body) {	
						if(error)console.log(error);//APENAS PRA MOSTRAR ALGUM ERRO QUE OCORRA					
						console.log(body);
						if(body == undefined){						
							console.log("O MÓDULO 3 NÃO ESTÁ CONECTADO A REDE");
							res.render('pages/home', {state: 2});
						}else{
							var tr = JSON.parse(body);						
							res.render('pages/home', {state: tr.status});
						}								
					});	
				}
			}							
		},

		turn:function (req, res){			
			
			modelModulo3.findOne( function(error, data) {							
				if(error){
					console.log(error);
				}else{				
					if(data){		
						turn_action(data.ip);																	
					}else{						
						console.log("no module 3 saved");
						turn_action();
					}					
				}
			});	

			function turn_action(Module3_IP) {
				var action;
				if(req.params.turn == 'on')
					action = '/up';
				else
					action = '/down';			
							
				
				if(Module3_IP == undefined){
					console.log("não há nenhum módulo 3 configurado");
					res.send({state: 3});
				}else{
					request('http://'+ Module3_IP +action,function (error, response, body) {	
						if(error)console.log(error);//APENAS PRA MOSTRAR ALGUM ERRO QUE OCORRA
						console.log(body);
						if(body == undefined){
							console.log("não conseguiu se conectar com o módulo 3");
							res.send({state: 2});
						}else{
							var tr = JSON.parse(body);	
							res.send({state: tr.status});											
						}							
					});	
				}	
			}						
		},		

		chartData:function (req,res) {
			modelModulo3.findOne(function (error,data) {		
				if(error){
					console.log(error);
					res.status(500).send(error);
				}else{
					console.log(data);
					if(data != null || data != undefined){
						console.log(data.date);
						select_and_send_data(data.date);
					}else{
						console.log("Nenhum dado recebido ainda!");
						select_and_send_data(new Date(1999));
					}
				}
			});	

			function select_and_send_data(_date) {					
				var date = new Date(_date);				
				var ph_array = [];
				var umidade_array = [];
				var chuva_array = [];
				var time_array = [];
				var ph_time = [];

				modelModulo1.find(function (error,data) {
					if(error){
						console.log(error);
						res.status(500).send(error);
					}else{	
						if(data != null || data != undefined){	
							console.log(data);				
							for (var i = data.length - 1; i != 0; i--) {						
								if(date.getTime() <= data[i].date.getTime()){								
									umidade_array.push(data[i].umidade); 
									chuva_array.push(data[i].chuva);	
									time_array.push(data[i].date);

									if(data[i].pH < 13){
										ph_array.push(data[i].pH);
										ph_time.push(data[i].date);
									}														 
								}														
							}								
						}else{
							console.log("nenhum dados vindo dos sensores!");							
						}
						var JSONChart ={
							labels: time_array,
							ph_labels: ph_time,
							pH: ph_array,
							umidade: umidade_array,
							chuva: chuva_array
						}		
						res.send(JSONChart);																			
					}
				});							
			}					
		}
	}	

	return controllerhome;
} 

//modelModulo1.find().where('date').gt(new date() - new date()).lt(new date()){}
//http://mongoosejs.com/docs/queries.html