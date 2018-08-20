//http://tok.hakynda.com/article/detail/144/cd4051be-cmos-analog-multiplexers-demultiplexers-with-logic-level-conversion--analog-input-
#ifndef hcf4051be_h
#define hcf4051be_h

#include <Arduino.h>

class hcf4051be{
	public:
		hcf4051be(byte a, byte b, byte c, byte AnalogInput);		
		int read(byte pinread);

	private:
		byte _a;
		byte _b;
		byte _c;
		byte _AnalogInput;
		void setPins(byte pinread);			
};

#endif

/*_________________
I |	C |	B |	A |	R
0 	0 	0 	0 	0
0 	0 	0 	1 	1
0 	0 	1 	0 	2
0 	0 	1 	1 	3
0 	1 	0 	0 	4
0 	1 	0 	1 	5
0 	1 	1 	0 	6
0 	1 	1 	1 	7
R = RESULTADO
I = Inhibit
_________________*/
