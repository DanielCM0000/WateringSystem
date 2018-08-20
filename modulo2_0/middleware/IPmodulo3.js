/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   IPmodulo3.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/13 16:05:55 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/15 03:05:24 by anonymous        ###   ########.fr       */
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

module.exports = function (app){
	var modelModulo3 =  app.model.modulo3;
	return async function(){
		var _ip;
		await modelModulo3.findOne(async function(error, data) {							
			if(error){
				console.log(error);
			}else{				
				if(data){								
					_ip = data.ip;																		
				}else{						
					console.log("no module 3 saved");
				}					
			}
		});	
		return _ip;		

	}
}