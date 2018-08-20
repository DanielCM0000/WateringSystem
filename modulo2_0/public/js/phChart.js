/*
* @Author: Daniel
* @Date:   2018-06-23 13:47:26
* @Last Modified 2018-06-26
* @Last Modified time: 2018-06-26 13:16:42
*/
var ctx = document.getElementById('phChart').getContext('2d');
$.ajax({url: "/page1/data/phChart", success: function(result){

	var ctx = document.getElementById('phChart').getContext('2d');
	var chart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'line',

		// The data for our dataset
		data: {
			labels: result.labels,
			datasets: [{
				label: "pH",
				backgroundColor: 'rgb(135, 0, 1)',
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