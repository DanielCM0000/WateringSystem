#include <hcf4051be.h>

hcf4051be::hcf4051be(byte A, byte B, byte C, byte AnalogInput):_a(A),_b(B),_c(C),_AnalogInput(AnalogInput){
	pinMode(A, OUTPUT);//A
	pinMode(B, OUTPUT);//B
	pinMode(C, OUTPUT);//C
}

int hcf4051be::read(byte pinread){
	setPins(pinread);
	return analogRead(_AnalogInput);
}

void hcf4051be::setPins(byte pinread){		
	digitalWrite(_a, bitRead(pinread, 0));		
	digitalWrite(_b, bitRead(pinread, 1));			
	digitalWrite(_c, bitRead(pinread, 2));

}	