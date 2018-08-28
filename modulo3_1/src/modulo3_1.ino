/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   decision.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 09:19:00 by anonymous         #+#    #+#             */
/*   Updated: 2018/08/28 11:32:45 by anonymous        ###   ########.fr       */
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

#include <RWfile.h>
#include <WiFiConfig.h>
#include <ArduinoJson.h>
#include <ESP8266HTTPClient.h>
#include <serverController.h>
#include <Ticker.h>

bool flag = false;
Ticker myTicker;
WiFiConfig configWiFi;//BY DEFAULT: D6 - RESET, 0X00 - EEPROM

void setup(){
	Serial.begin(9600);  
	myTicker.attach(3*60,doSomething);
	pinMode(D3,OUTPUT);
    pinMode(LED_BUILTIN,OUTPUT);

	RWfile RW_F;
	
	String html = "/Custom_WF/html/Param.html", favicon = "/Custom_WF/img/L.png", icon = "/Custom_WF/img/L.png", js = "/Custom_WF/js/script.js",css = "/Custom_WF/css/style.css";
	configWiFi.start(css,js,html,favicon,icon); 
	flag = true;
	String newData = configWiFi.getData();	
	if(newData.length() != 0){			
		RW_F.writeFile(newData, "/DB/config.json");//SE HOUVER ALGUM DADO NOVO, ELE SERÁ SALVO NA MEMÓRIA FLASH	
	}	

	String _ip;
	String config = RW_F.readFile("/DB/config.json");
	if(config != COULD_NOT_READ && config != NOT_EXIST){			
		DynamicJsonBuffer jsonBuffer;
	    JsonObject& json = jsonBuffer.parseObject(config); 				
		_ip = json["_ip"].as<String>();	
		json.prettyPrintTo(Serial);								 
	}

	String data;
	{//LEITURA DO DADOS NA ENTRADA ANALOGICA E FORMATAÇÃO EM JSON
		DynamicJsonBuffer jsonBuffer;
	    JsonObject& json = jsonBuffer.createObject();
		json["id"] =  String(ESP.getChipId());
		json["ip"]  = WiFi.localIP().toString();			
		json.printTo(data);
	}	
	//FIM______________________________________________

	HTTPClient http;    //Declare object of class HTTPClient
	http.begin("http://"+_ip+":3000/module3data");  
    http.addHeader("Content-Type", "application/json");  
 	http.POST(data); 
 	http.end(); 
	//FIM______________________________________________
}

void loop() {
	serverController server(D3,LED_BUILTIN);
	while(true){
	    server.handle();
	}
}

void doSomething(void){
	if(!flag && WiFi.status() != WL_CONNECTED){
		ESP.restart();
	}
}