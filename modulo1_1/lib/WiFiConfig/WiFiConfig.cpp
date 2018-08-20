#include <WiFiConfig.h>
#include <ArduinoJson.h>
#include <EEPROM.h>

bool WiFiConfig::confignewdata = false;
byte WiFiConfig::addr;
byte WiFiConfig::_interrupPin;

//START CONSTRUCTOR_________________________________________________

WiFiConfig::WiFiConfig(byte interrupPin, byte memoryAddr,String ip,String gw,String sn){	
	WiFiConfig::addr = memoryAddr;
	WiFiConfig::_interrupPin = interrupPin;

	if(checkInterruption(interrupPin, memoryAddr)){
		Serial.println("reset detection");
		wifiManager.resetSettings(); 	
	} 

	if(ip != ""){
		IPAddress _ip,_gw,_sn;
		_ip.fromString(ip);
		_gw.fromString(gw);
		_sn.fromString(sn);	

		WiFi.config(_ip, _gw, _sn);
	}	
	//NÃO SEI PORQUE A FUNÇÃO DA BIBLIOTECA WIFIMANAGER NÃO FUNCIONOU!!! TIVE QUE USAR A FUNÇÃO PADRÃO MSM
	//wifiManager.setSTAStaticIPConfig(IPAddress(192,168,1,110),IPAddress (192,168,1,1),IPAddress (255,255,255,0));

	wifiManager.setSaveConfigCallback(wifi_callback);
}
//END CONSTRUCTOR____________________________________________________

WiFiConfig::~WiFiConfig(){
	Serial.println("~WiFiConfig");	
	detachInterrupt(WiFiConfig::_interrupPin);
	Serial.println("wiFi reset off");
}

void WiFiConfig::start( String style, String js, String html, String favicon, String icon){ 	
	
	split(style,';');	
	if(splited[0] != "")for(byte i = 0; i <= splited_length; i++ )wifiManager.setPersonalizedDataStyle(splited[i]);//css
		
	split(js,';');
	if(splited[0] != "")for(byte i = 0; i <= splited_length; i++ )wifiManager.setPersonalizedDataScript(splited[i]);//js
	
	if(favicon != "")wifiManager.setPersonalizedDataFavicon(favicon);//favicon
	if(icon != "")wifiManager.setPersonalizedDataIcon(icon);//icon
	if(html != "")wifiManager.setPersonalizedHTML(html);//html
	
	wifiManager.autoConnect();    
}

void WiFiConfig::start(String params[][4]){
	byte size_params = sizeof(params)/sizeof(params[0]);
	for(byte i = 0; i < size_params; i++ )myvector.push_back(WiFiManagerParameter(params[i][0].c_str(),params[i][1].c_str(),params[i][2].c_str(),params[i][3].toInt()));
	addCustomHtmlItens();

	wifiManager.autoConnect();
}

bool WiFiConfig::checkInterruption(byte interrupPin, byte memoryAddr){
	EEPROM.begin(512);
	pinMode(interrupPin,INPUT_PULLUP);	
	attachInterrupt(digitalPinToInterrupt(interrupPin),reset_callback,FALLING); 

	if(EEPROM.read(memoryAddr) == 1){				    
		EEPROM.write(memoryAddr, 0);	
		EEPROM.end();	
		return true;
	}  
	EEPROM.end();
	return false;
}	

void WiFiConfig::addCustomHtmlItens(){
	for( auto &x : myvector )wifiManager.addParameter(&x);
}

String  WiFiConfig::getData(void){
	if(confignewdata){
		return wifiManager.getParamAsJSON();
	}else{
		return "";
	}    
}

String  WiFiConfig::_getData(void){
	if(confignewdata){
		DynamicJsonBuffer jsonBuffer;
		JsonObject& json = jsonBuffer.createObject();    
		char name[40],value[40];
		for( auto &V : myvector ){
		  strcpy(name, V.getID());
		  strcpy(value, V.getValue());
		  json[name] = value;
		}
		json.printTo(data); 
		return data;     
	}else{
		return "";
	}    
}
  

//CALLBACKS
void WiFiConfig::reset_callback(){
	delay(500);
	if(!digitalRead(WiFiConfig::_interrupPin)){
		Serial.println("reset_callback");
		EEPROM.begin(512);
		EEPROM.write(WiFiConfig::addr, 1);
		EEPROM.end();
		delay(10);
		ESP.reset();
	}	
}

void WiFiConfig::wifi_callback(void){
	Serial.println("wifi_callback");  
	WiFiConfig::confignewdata = true;
}


//HELPERS
void WiFiConfig::split(String stg,char charSplit){   
	String dataAux = ""; 
	int aux = 0,index = 0,i = 0;
	while(1){            
	  index = stg.indexOf(charSplit, aux + 1);
	  dataAux = stg.substring(aux==0?aux=0:aux+1,index);  
	  aux = index;
	  splited[i] = dataAux;
	  splited_length = (i++);    
	  if (index >= stg.length()) break;           
	}
}