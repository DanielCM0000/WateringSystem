/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   turn.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/21 15:34:42 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/23 15:11:58 by anonymous        ###   ########.fr       */
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

function turn_off(){	
	$.get("/home/off",function(data, status){ 
		updateStatus(data);
	});
}

function turn_on(){	
	$.get("/home/on",function(data, status){              
       	updateStatus(data);
	});
}

function updateStatus(data) {
 	var state = data.state; 
    var status = $("#status");
    if(state == 0 ){    	
    	status.empty();
        status.html("<div class='alert alert-primary' role='alert'>Sistema de irrigação desligado!</div>"); 
    }

    if(state == 1 ){
    	status.empty();
        status.html("<div class='alert alert-success' role='alert'>Sistema de irrigação ligado!</div>");
    }

    if(state == 2 ){
    	status.empty();
        status.html("<div class='alert alert-danger' role='alert'>O módulo 3 não está conectado a rede!</div>");
    }

    if(state == 3 ){
    	status.empty();	        
        status.html("<div class='alert alert-danger' role='alert'>Nenhum módulo 3 foi configurado ainda!</div>");
    }     
}