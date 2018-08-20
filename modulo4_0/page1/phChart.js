/*
* @Author: Daniel
* @Date:   2018-06-23 13:47:26
* @Last Modified 2018-06-23
* @Last Modified time: 2018-06-23 14:31:43
*/
var ctx = document.getElementById('phChart').getContext('2d');
var chart = new Chart(ctx, {
	// The type of chart we want to create
	type: 'line',

	// The data for our dataset
	data: {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: "My First dataset",
			backgroundColor: 'rgb(255, 224, 0)',
			borderColor: 'rgb(255, 224, 0)',
			data: [0, 10, 5, 2, 20, 30, 45],
		}]
	},

	// Configuration options go here
	options: {}
});