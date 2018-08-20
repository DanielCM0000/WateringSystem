#include <serverController.h>

serverController::serverController(byte pin, byte pinLED):_pinLED(pinLED),_pin(pin){
	pinMode(pin, OUTPUT);
	pinMode(pinLED, OUTPUT);
	previous_status = digitalRead(pin);
	server.reset(new ESP8266WebServer(80));
	server->begin();
	server->on("/up", std::bind(&serverController::turnON,this));
	server->on("/down",std::bind(&serverController::turnOFF,this));	
	server->on("/status",std::bind(&serverController::getStatus,this));		
}

serverController::~serverController(){	
	server.reset();
}

void serverController::handle(void){
	server->handleClient();
	yield();
}

void serverController::turnON(void){
	Serial.println("turnON");
	digitalWrite(_pin,LOW);  
	digitalWrite(_pinLED,LOW);	
	String json = "{\"previous_status\":	"+String(previous_status)+",\"status\":	"+String(!digitalRead(_pin))+"}";
	server->send(200,"text/plain",json);
	previous_status = !digitalRead(_pin);
}

void serverController::turnOFF(void){
	Serial.println("turnOFF");
	digitalWrite(_pin,HIGH); 
	digitalWrite(_pinLED,HIGH); 	
	String json = "{\"previous_status\":	"+String(previous_status)+",\"status\":	"+String(!digitalRead(_pin))+"}";
	server->send(200,"text/plain",json);
	previous_status = !digitalRead(_pin);
}

void serverController::getStatus(void){
	String json = "{\"status\":	"+String(!digitalRead(_pin))+"}";
	server->send(200,"text/plain",json);
}