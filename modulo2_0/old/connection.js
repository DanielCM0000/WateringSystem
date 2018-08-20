 /*	_             __  _ __
   (_)___  __  __/ /_(_) /
  / / __ \/ / / / __/ / /  __________________________________________________________________
 / / / / / /_/ / /_/ / /  /_____/_____/_____/_____/_____/_____/_____/_____/_____/_____/_____/
/_/_/ /_/\__,_/\__/_/_/
*/
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   connection.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 09:19:00 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/13 01:06:28 by anonymous        ###   ########.fr       */
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

var request = require('request');



module.exports = function (app) {
	var modelModulo3 = app.model.modulo3;
	var functions = {
		connect: function (action){			
			modelModulo3.findOne(function(error,data){		
				if (error) {
					console.log(error);
					return false;
				}else {					
					if(data){
						console.log('connecting to ip:' + data.ip);
						request('http://'+data.ip + action, function (error, response, body) {
							if(error){
								console.log(error);
								return false;
							}else{
								console.log(action);	
								if(action == '/up'){
									data.state = true;
									data.save();
								}

								if(action == '/down'){
									data.state = false;
									data.save();
								}			
								return true;
							}
						});
					}else{
						console.log('There is no data!');
						return false;
					}						
				}
			});	
		}	
	}
	return functions;
}

*/