/*
* @Author: Daniel
* @Date:   2018-06-23 13:47:26
* @Last Modified 2018-06-26
* @Last Modified time: 2018-06-26 11:36:21
*/

$.ajax({url: "/page1/data/umidadeChart", success: function(result){

	var ctx = document.getElementById('umidadeChart').getContext('2d');
	var chart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'line',

		// The data for our dataset
		data: {
			labels: result.labels,
			datasets: [{
				label: "umidade",
				backgroundColor: 'rgb(41, 131, 0)',
				borderColor: 'rgb(0, 0, 0)',
				data: result.data
			}]
		},

		// Configuration options go here
		//DANIEL: CONFIGURATION TO DISPLAY DATE
		//https://www.chartjs.org/docs/latest/axes/cartesian/time.html
		options: {
	        scales: {
	            xAxes: [{
	                type: 'time',
	                distribution: 'linear'
	            }]
	        }
	    }
	});

}});