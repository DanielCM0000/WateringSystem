/*
* @Author: Daniel
* @Date:   2018-06-27 17:07:27
* @Last Modified 2018-06-29
* @Last Modified time: 2018-06-29 14:07:32
*/
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
output_PontoDeMurcha.innerHTML =  "Ponto de murcha: " + Range_PontoDeMurcha.value;
output_CapacidadeDeCampo.innerHTML =  "Capacidade de Campo: " + Range_CapacidadeDeCampo.value; 



Range_MaxpH.oninput = function() {
    output_MaxpH.innerHTML = "pH máximo: " + this.value;
}
Range_MinpH.oninput = function() {
    output_MinpH.innerHTML = "pH minimo: " +this.value;
} 

Range_PontoDeMurcha.oninput = function() {
    output_PontoDeMurcha.innerHTML = "Ponto de murcha: " +this.value;
} 

Range_CapacidadeDeCampo.oninput = function() {
    output_CapacidadeDeCampo.innerHTML = "Capacidade de Campo: " +this.value;
} 

function send() {

	var dt = {
        MaxpH             : Range_MaxpH.value,
        MinpH             : Range_MinpH.value,
        PontoDeMurcha     : Range_PontoDeMurcha.value,
        CapacidadeDeCampo : Range_CapacidadeDeCampo.value
    }

	alert(dt.MaxpH);
	
	$.post("/page2/update",dt,function(data, status){
        alert(data + status);
    });

}