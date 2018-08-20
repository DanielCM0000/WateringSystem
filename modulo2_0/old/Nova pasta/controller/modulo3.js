/*_____________________________________________________________________________________ 
	____          _             __  _                _____            __
   /  _/_________(_)___ _____ _/ /_(_)___  ____     / ___/__  _______/ /____  ____ ___
   / // ___/ ___/ / __ `/ __ `/ __/ / __ \/ __ \    \__ \/ / / / ___/ __/ _ \/ __ `__ \
 _/ // /  / /  / / /_/ / /_/ / /_/ / /_/ / / / /   ___/ / /_/ (__  ) /_/  __/ / / / / /
/___/_/  /_/  /_/\__, /\__,_/\__/_/\____/_/ /_/   /____/\__, /____/\__/\___/_/ /_/ /_/
                /____/                                 /____/
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Author: Daniel
Date:   2018-06-21 01:05:31
Last Modified 2018-06-30
Last Modified time: 2018-06-30 18:51:48
_____________________________________________________________________________________*/

//DEPOIS MUDAR ISSO 
//O MÓDULO3 VAI PODER REESCREVER SEUS DADOS NO BANCO DE DADOS 
//SÓ NÃO PODE HAVER DOIS MÓDULOS3 
//O MÓDULO3 VAI FICAR PRESO A SUA ID

module.exports = function(app){
	var modelModulo3 = app.model.modulo3;	
	var controllerModulo3 = {
		action:function(req,res){
			//PARA GARANTIR QUE SÓ HAJA UM MÓDULO3
			modelModulo3.findOne(function(error, data) {
				if(error){
					console.log(error);
					res.status(500).send(error);//DB ERROR
				}else{
					if(data){
						data.id_module = req.body.id_module;
						data.ip = req.body.ip;
						data.state = req.body.state;
						data.save();
					}else{
						var M = new modelModulo3();
						M.id_module = req.body.id_module;
						M.ip = req.body.ip;
						M.state = req.body.state;
						M.save();
						console.log(req.body);
					}
				}
			});						
		}
	}
	
	return controllerModulo3;
}