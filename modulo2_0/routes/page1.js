/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   page1.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 09:20:48 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/21 01:03:24 by anonymous        ###   ########.fr       */
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


module.exports = function (app) {
	var controllerPage1 = app.controller.page1;

	app.route('/page1').get(controllerPage1.index);
	

	app.route('/page1/:turn').get(controllerPage1.turn);
	
	app.route('/page1/data/phChart').get(controllerPage1.phChart);
	app.route('/page1/data/umidadeChart').get(controllerPage1.umidadeChart);
	app.route('/page1/data/chuvaChart').get(controllerPage1.chuvaChart);

	app.route('/page1/data/chartData').get(controllerPage1.chartData);
}