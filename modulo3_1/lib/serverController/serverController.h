#ifndef serverController_h
#define serverController_h 

#include <Arduino.h>
#include <ESP8266WebServer.h>
#include <memory>

class serverController{
	public:
		serverController(byte pinIR, byte pinLED);
		~serverController();

		void handle(void);
		
	private:
		byte _pinLED;
		byte _pin;		

		byte previous_status;

		std::unique_ptr<ESP8266WebServer>server;
		
		//CALLBACKS			
		void turnON(void);
		void turnOFF(void);	
		void getStatus(void);	
};
#endif