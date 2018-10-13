/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   graphData.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/10/09 10:51:41 by anonymous         #+#    #+#             */
/*   Updated: 2018/10/12 19:22:16 by anonymous        ###   ########.fr       */
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

function button_click(){	
	$.post( "/graph", { date1: $("#date1" ).val(), date2: $("#date2" ).val()})
		.done(function(result) {
			console.log( result );	
			var labels = [];
			var labels_ph = [];
			var data_u = [];
			var data_c = [];
			var data_p = [];


			for (var i = result.labels.length - 1; i >= 0; i--) {
				labels.push(new Date(result.labels[i]).toLocaleString());

				data_u.push({
					t: new Date(result.labels[i]),
					y: result.umidade[i]
				});

				data_c.push({
					t: new Date(result.labels[i]),
					y: result.chuva[i]
				});	

				data_p.push({
					t: new Date(result.labels[i]),
					y: result.pH[i]
				});		
			}	

			var ctx = document.getElementById('chart').getContext('2d');

			var config = {		
				type: 'line',

				// The data for our dataset
				
				data:{	
					labels: labels,				
					datasets: [{
						label: 'umidade',				
						borderColor: 'rgb(135, 0, 1)',
						data: data_u
					},
					{
						label: 'pH',				
						borderColor: 'rgb(41, 131, 0)',
						data: data_p
					},
					{
						label: 'chuva',				
						borderColor: 'rgb(5, 0, 101)',
						data: data_c						
					}]
				},
				options: {			
					responsive: true,
					//animation: {
						//duration: 0, // general animation time
					//},
					//responsiveAnimationDuration: 0, // animation duration after a resize				
					scales: {				
						xAxes: [{
							ticks: {
								distribution: 'linear',
								beginAtZero: true
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					},	   
				}		
			};
			var chart = new Chart(ctx, config);	   
	});
}
//https://www.chartjs.org/docs/latest/axes/cartesian/time.html