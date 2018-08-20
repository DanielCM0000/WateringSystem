//NCLUDING HTML ELEMENTS: https://www.w3schools.com/howto/howto_html_include.asp
window.onload  = function(){	
	var custom_html = document.getElementById("custom_html");
	if(custom_html){	
		var path = custom_html.getAttribute("path");				     	 
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if (this.readyState == 4) {
	  			if (this.status == 200) {
	  				custom_html.innerHTML = this.responseText;	  				
		  			if (typeof functionToBeCalledAfterCustomHtmlRendering == 'function'){
		  				functionToBeCalledAfterCustomHtmlRendering();
		  			}									
	  			}	
	  			if (this.status == 404)alert("custom html not found.");	  		
			}
		}
		xhttp.open("GET", path, true);
		xhttp.send();		
	}
}