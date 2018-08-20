#ifndef smoother_h
#define smoother_h 

#include <Arduino.h>

#define numberOfElements(x)  (sizeof(x) / sizeof((x)[0]))

class smoother{
	public:
		smoother(int sz_highest, int sz_lowest);
		~smoother();

		float smooth(float elem [], int sz);

	private:
		int _sz_highest;
		int _sz_lowest;
};

#endif

