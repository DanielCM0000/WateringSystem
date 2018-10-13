/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   modulo1.js                                         :+:      :+:    :+:   */
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
/*
	COMO O MÓDULO 1 IRÁ SE COMPORTAR QUANDO HOUVER ERRO NA COMUNICAÇÃO?
	OU QUANDO TUDO OCORRER BEM?

	FAZER VÁRIAS LEITURAS IGNORAR OS VALORES MAIORES E FAZER A MÉDIA DAS
	OUTRAS LEITÚRAS PRA EVITAR ERROS DE LEITURA.
*/

#include <WiFiConfig.h>
#include <RWfile.h>
#include <ArduinoJson.h>
#include <smoother.h>
#include <EEPROM.h>
#include <hcf4051be.h>
#include <ESP8266HTTPClient.h>
#include <Ticker.h>

bool flag = false;
Ticker myTicker;

//#define segundos * (1e6)
#define minutos * (60e6)
#define hora * (3600e6)

#define chuva !digitalRead(D7);
#define umidade map(_hcf4051be.read(2),0,1024,100,0);
#define pH map(_hcf4051be.read(6),0,1023,140,0);

#define numero_de_leituras_dispensadas 5
#define numero_de_leituras 30
#define intervalo_entre_as_leituras  delay(100)

void sendData(String ip);

void setup() {
	pinMode(D7,INPUT);
	Serial.begin(9600);
	myTicker.attach(3*60,doSomething);
	RWfile RW_F;
	WiFiConfig configWiFi;//BY DEFAULT: D6 - RESET, 0X00 - EEPROM

	String html = "/Custom_WF/html/Param.html", favicon = "/Custom_WF/img/L.png", icon = "/Custom_WF/img/L.png", js = "/Custom_WF/js/script.js",css = "/Custom_WF/css/style.css";
	configWiFi.start(css,js,html,favicon,icon);
	flag = true;
	
	String newData = configWiFi.getData();
	if(newData.length() != 0){
		RW_F.writeFile(newData, "/DB/config.json");//SE HOUVER ALGUM DADO NOVO, ELE SERÁ SALVO NA MEMÓRIA FLASH
		EEPROM.begin(512);
		EEPROM.write(1,0);//0X01 - EEPROM
		EEPROM.end();
	}

	String type,time,_ip;
	String config = RW_F.readFile("/DB/config.json");
	if(config != COULD_NOT_READ && config != NOT_EXIST){
		DynamicJsonBuffer jsonBuffer;
	    JsonObject& json = jsonBuffer.parseObject(config);
		type = json["type"].as<String>();
		time = json["time"].as<String>();
		_ip = json["_ip"].as<String>();
		json.prettyPrintTo(Serial);
	}

	unsigned long int sleeptime;

	if(type == "minutos"){
		sleeptime = time.toFloat() minutos;
		sendData(_ip);
	}else{//type == "horas"
		EEPROM.begin(512);
		int varT = EEPROM.read(1);//0X01 - EEPROM
		if(varT == 0){
			sendData(_ip);
		}
		if(++varT <= time.toFloat()){
			EEPROM.write(1, varT);
			sleeptime = 1 hora;
		}else{
			EEPROM.write(1,0);
			sleeptime = (time.toFloat() - time.toInt()) hora;
			if(sleeptime == 0){
				sleeptime == 10;
			}
		}
		EEPROM.end();
	}
	delay(10);
	ESP.deepSleep(sleeptime); // D0 to RST
}

void loop(){}

void sendData(String ip){
	hcf4051be _hcf4051be(D1, D2, D3, A0);//D1 - A, D2 - B, D3 - C
	smoother amortizador(numero_de_leituras_dispensadas,numero_de_leituras_dispensadas);

	float _umidade[numero_de_leituras],  _pH[numero_de_leituras];
    int _chuva = 0;

   	for(int i=0; i<numero_de_leituras; i++){ 
   		_umidade[i] = umidade;   
   		_pH[i] = pH;		
	    _chuva += chuva;
   	    intervalo_entre_as_leituras;
   	}

	String data;
	{//LEITURA DO DADOS NA ENTRADA ANALOGICA E FORMATAÇÃO EM JSON
		DynamicJsonBuffer jsonBuffer;
	    JsonObject& json = jsonBuffer.createObject();

	    json["pH"] = amortizador.smooth(_pH, numero_de_leituras)/10;
		json["umidade"]  = amortizador.smooth(_umidade, numero_de_leituras);
		json["chuva"]  = (_chuva>5)?1:0;
		json["id_modulo"]  = String(ESP.getChipId());
		json.prettyPrintTo(data);
		Serial.println(data);
	}//FIM_______________________________________________________	

	//https://techtutorialsx.com/2016/07/21/esp8266-post-requests/
	//ENVIA AS INFORMAÇÕES DOS SENSORES PRA O MODULO 2
	HTTPClient http;    //Declare object of class HTTPClient
	//http.writeToStream(&Serial);//The HTTPClient class also has a method to simplify debugging of a response to the request.
 	http.begin("http://"+ip+":3000/newdata");      //Specify request destination
    http.addHeader("Content-Type", "application/json");  //Specify content-type header
 	//int httpCode = http.POST(data);   //Send the request
 	http.POST(data);   //Send the request
 	http.end();  //Close connection
 	//String payload = http.getString();
	//FIM______________________________________________
}

void doSomething(void){
	if(!flag){
		ESP.restart();
	}
	myTicker.detach();
}