/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   page1.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 09:20:48 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/23 15:20:27 by anonymous        ###   ########.fr       */
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
	var controllerhome = app.controller.home;

	app.route('/').get(controllerhome.redirect);

	app.route('/home').get(controllerhome.index);
	

	app.route('/home/:turn').get(controllerhome.turn);

	app.route('/home/data/chartData').get(controllerhome.chartData);
}