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

var request = require('request');

module.exports = function (app) {
	var modelModulo3 = app.model.modulo3;
	var modelModulo1 = app.model.modulo1;
	var lastTimeON = app.model.lastTimeON;
	var ConectionToMdulo3 = app.middleware.connection;

	var controllerPage1 = {
		index:function (req, res) {
			modelModulo3.findOne(function(error, data) {
				if(error){

				}else{
					if(data){//verificar se a variavel não é nula
						res.render('pages/page1', {state: data.state});
					}else{
						res.render('pages/page1');// ISSO AQUI ESTÁ ERRADO
												  //{state: data.state} ESSAS INFORMAÇÕES 
												  //DEVEM SER ENVIADAS
						//AVISAR QUE NENHUM MODULO 3 FOI CONFIGURADO
						//ISSO PODE SER FEITO NO ARQUIVO JADE DESSA PÁGINA						
					}
					
				}
			});
		},

		turn:function (req, res) {
			var action;
			if(req.params.turn == 'on'){
				action = '/up';
			}else{
				action = '/down';
			}			
			ConectionToMdulo3.connect(action);
			res.redirect('/page1');
								
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

