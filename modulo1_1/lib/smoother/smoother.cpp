#include <smoother.h>

smoother::smoother(int sz_highest, int sz_lowest):_sz_highest{sz_highest},_sz_lowest{sz_lowest}{
	Serial.println("smoother::smoother");
}

smoother::~smoother(){
	Serial.println("smoother::~smoother");
}


float smoother::smooth(float elem[], int sz){

	for(int i=0 ; i<sz-1 ; i++){//ORDENA OS NUMERO DO MAIOR PARA O MENOR
		for(int j=i+1 ; j<sz; j++) {
	 		if(elem[i]<elem[j]){	 			
	 			float temp = elem[i];
				elem[i] = elem[j];
				elem[j] = temp;
	 		}
	 	}		 		
 	}

 	float total = 0;
	for (int i = _sz_highest; i < (sz - _sz_lowest) ; i++) {
		total += elem[i];
	}

	return total  / (float(sz) - (float(_sz_lowest) + float(_sz_highest)));
}