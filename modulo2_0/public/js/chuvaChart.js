/*
* @Author: Daniel
* @Date:   2018-06-23 13:47:26
* @Last Modified 2018-06-26
* @Last Modified time: 2018-06-26 13:16:42
*/
$.ajax({url: "/page1/data/chuvaChart", success: function(result){

	var ctx = document.getElementById('chuvaChart').getContext('2d');
	var chart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'line',

		// The data for our dataset
		data: {
			labels: result.labels,
			datasets: [{
				label: "chuva",
				backgroundColor: 'rgb(5, 0, 101)',
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