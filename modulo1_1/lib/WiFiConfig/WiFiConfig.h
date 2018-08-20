#ifndef WiFiConfig_h
#define WiFiConfig_h

#include <WiFiManager.h>
#include <vector>       // std::vector
#include <Arduino.h>

class WiFiConfig{
	public:  
		~WiFiConfig();
			
		WiFiConfig():WiFiConfig(D6,0){};
		WiFiConfig(byte interrupPin, byte memoryAddr):WiFiConfig(interrupPin,memoryAddr,"","",""){};
		WiFiConfig(byte interrupPin, byte memoryAddr,String ip,String gw,String sn);

		void start(String style, String js, String html, String favicon, String icon);
		void start(String params[][4]);

		String getData(void);
		String  _getData(void);
	
	private:  	
		static byte addr;
		static bool confignewdata;

		static byte _interrupPin;

		String data;
		WiFiManager wifiManager;    
		std::vector<WiFiManagerParameter> myvector;

		void addCustomHtmlItens();  
		bool checkInterruption( byte interrupPin, byte memoryAddr);  

		//CALLBACKS
		static void reset_callback();
		static void wifi_callback();

		//HELPERS
		void split(String stg,char charSplit);
		String splited[10];
		int splited_length;
};

#endif