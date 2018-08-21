/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   chartData.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/21 00:35:42 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/21 01:35:57 by anonymous        ###   ########.fr       */
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
$.ajax({url: "/page1/data/chartData", success: function(result){	
	create_chart('chuvaChart', 'chuva', 'rgb(5, 0, 101)', result.labels, result.chuva);
	create_chart('umidadeChart', 'umidade', 'rgb(135, 0, 1)', result.labels, result.umidade);
	create_chart('phChart', 'pH','rgb(41, 131, 0)' ,result.labels, result.pH);	
}});

function create_chart(_chart_id , _label , _backgroundColor,  _labels, _data) {
	var ctx = document.getElementById(_chart_id).getContext('2d');
	var chart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'line',

		// The data for our dataset
		data: {
			labels: _labels,
			datasets: [{
				label: _label,
				backgroundColor: _backgroundColor,
				borderColor: 'rgb(0, 0, 0)',
				data: _data
			}]
		},		
		options: {
	        scales: {
	            xAxes: [{
	                type: 'time',
	                distribution: 'linear'
	            }]
	        }
	    }
	});
}
//https://www.chartjs.org/docs/latest/axes/cartesian/time.html