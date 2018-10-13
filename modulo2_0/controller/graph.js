/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   graph.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/10/03 16:34:30 by anonymous         #+#    #+#             */
/*   Updated: 2018/10/12 19:33:21 by anonymous        ###   ########.fr       */
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
	var modelModulo1 = app.model.modulo1;	

	var controllergraph = {
		index:function (req, res) {
			res.render('pages/graph');				
		},		

		data:function (req, res){		
			console.log(req.body);
									
			var date_f = new Date(req.body.date2);
			var date_i = new Date(req.body.date1);	
	
			var ph_array = [];
			var umidade_array = [];
			var chuva_array = [];
			var time_array = [];

			modelModulo1.find(function (error,data) {
				if(error){
					console.log(error);
					res.status(500).send(error);
				}else{
					if(data != null || data != undefined){						
						for (var i = data.length - 1; i != 0; i--) {						
							if(date_i.getTime() <= data[i].date.getTime() && data[i].date.getTime() <= date_f.getTime()){	
								time_array.push(data[i].date);
								umidade_array.push(data[i].umidade); 
								chuva_array.push(data[i].chuva);	
								if(data[i].pH > 13){
									ph_array.push(null);
								}else{
									ph_array.push(data[i].pH);
								}													 
							}														
						}	
					}else{
						console.log("nenhum dados vindo dos sensores!");
					}				
					var JSONChart = {
						labels: time_array,
						pH: ph_array,
						umidade: umidade_array,
						chuva: chuva_array					
					}		
					res.send(JSONChart);																			
				}
			});
			
		}
	}	
	return controllergraph;
}