/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   range.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 09:20:48 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/28 00:39:57 by anonymous        ###   ########.fr       */
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

var Range_MaxpH = document.getElementById("Range_MaxpH");
var Range_MinpH = document.getElementById("Range_MinpH");
var Range_PontoDeMurcha = document.getElementById("Range_PontoDeMurcha");
var Range_CapacidadeDeCampo = document.getElementById("Range_CapacidadeDeCampo");

var output_MaxpH = document.getElementById("output_MaxpH");
var output_MinpH = document.getElementById("output_MinpH");
var output_PontoDeMurcha = document.getElementById("output_PontoDeMurcha");
var output_CapacidadeDeCampo = document.getElementById("output_CapacidadeDeCampo");

output_MaxpH.innerHTML =  "pH máximo: " + Range_MaxpH.value; 
output_MinpH.innerHTML =  "pH minimo: " + Range_MinpH.value; 
output_PontoDeMurcha.innerHTML =  "Ponto de murcha: " + Range_PontoDeMurcha.value + "%";
output_CapacidadeDeCampo.innerHTML =  "Capacidade de Campo: " + Range_CapacidadeDeCampo.value + "%"; 

Range_MaxpH.oninput = function() {
    output_MaxpH.innerHTML = "pH máximo: " + this.value;
}

Range_MinpH.oninput = function() {
    output_MinpH.innerHTML = "pH minimo: " +this.value;
} 

Range_PontoDeMurcha.oninput = function() {
    output_PontoDeMurcha.innerHTML = "Ponto de murcha: " +this.value+ "%";
} 

Range_CapacidadeDeCampo.oninput = function() {
    output_CapacidadeDeCampo.innerHTML = "Capacidade de Campo: " +this.value+ "%";
} 

function send(){    
    var val_max = Range_MaxpH.value;
    var val_min = Range_MinpH.value; 
   
    if(Number(val_max) < Number(val_min)){
        alert('O pH máximo não pode ser menor que o pH mínimo');       
        return;
    } 

    var dt = {
        pH_max              : Range_MaxpH.value,
        pH_min              : Range_MinpH.value,
        ponto_de_murcha     : Range_PontoDeMurcha.value,
        capacidade_de_campo : Range_CapacidadeDeCampo.value
    }

	$.post("/configuracao/update",dt,function(data, status){              
        if(status == "success"){
            var page2_alert = $('#page2_alert');
            page2_alert.html("<div class='alert alert-primary' role='alert'><center><h3>Dados enviados com sucesso!</h3></center></div>");
            setTimeout(function(){page2_alert.empty();}, 2000);
        }        
    });
}