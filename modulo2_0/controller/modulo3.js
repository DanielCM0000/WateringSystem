/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   modulo3.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 09:19:00 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/20 18:50:31 by anonymous        ###   ########.fr       */
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
	O MÓDULO3 VAI PODER REESCREVER SEUS DADOS NO BANCO DE DADOS	
	res.status(500).send(error);//DB ERROR
*/


module.exports = function(app){
	var modelModulo3 = app.model.modulo3;	
	var controllerModulo3 = {
		action:function(req,res){
			console.log(req.body);			
			modelModulo3.findOne(function(error, data){//PARA GARANTIR QUE SÓ HAJA APENAS UM MÓDULO 3
				if(error){
					console.log(error);					
				}else{
					if(data){//SE JÁ EXISTIR ALGUM DADO SALVO ELE SERÁ REESCRITO
						console.log("Já existe um módulo 3 salvo. Seus dados serão reescritos");
						data.id_module = req.body.id_module;
						data.ip = req.body.ip;
						data.save();
					}else{
						console.log("Salvando dados do módulo 3");
						var M = new modelModulo3();
						M.id_module = req.body.id_module;
						M.ip = req.body.ip;
						M.save();						
					}
				}
			});	
			res.send(200);					
		}
	}
	
	return controllerModulo3;
}