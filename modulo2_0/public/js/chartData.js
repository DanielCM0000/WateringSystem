/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   chartData.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/21 00:35:42 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/27 14:16:35 by anonymous        ###   ########.fr       */
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

chart();

function chart() {
	$.ajax({url: "/home/data/chartData", success: function(result){		
		var labels = [];
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
		create_chart('phChart', 'pH','rgb(41, 131, 0)' , labels, data_p);
		create_chart('umidadeChart', 'umidade', 'rgb(135, 0, 1)', labels, data_u);	
		create_chart('chuvaChart', 'chuva', 'rgb(5, 0, 101)', labels, data_c);
	}});
}

setInterval(chart,30000);



function create_chart(_chart_id , _label , _backgroundColor,  _labels, _data){
	var ctx = document.getElementById(_chart_id).getContext('2d');

	var config = {
		// The type of chart we want to create
		type: 'line',

		// The data for our dataset
		data: {
			labels: _labels,
			datasets: [{
				label: _label,				
				borderColor: _backgroundColor,
				data: _data
			}]
		},
		options: {			
			//responsive: true,
			animation: {
		        duration: 0, // general animation time
		    },
			responsiveAnimationDuration: 0, // animation duration after a resize		   
		}
	};
	var chart = new Chart(ctx, config);
}
//https://www.chartjs.org/docs/latest/axes/cartesian/time.html