#include <Arduino.h>
#include <FS.h>
#include <RWfile.h>

int RWfile::count = 0;  

RWfile::~RWfile(){
  Serial.print("~FS_File");
  Serial.print("SPIFFS.end()");
  SPIFFS.end();
}

RWfile::RWfile(){
  RWfile::count++;
  SPIFFS.begin();
  Serial.print("FS_File: ");
  Serial.println(count);
}

bool RWfile::writeFile(String text,String fileName){ 
  if(SPIFFS.exists(fileName)){
    File myFile = SPIFFS.open(fileName, "w+");  
    if (myFile){      
      for(unsigned int i = 0 ; i < text.length() ;i++)myFile.write(text[i]);                
      myFile.close(); 
      return true;//SUCESSO
    }else {      
      Serial.println("COULDN'T WRITE TO THE FILE: " + fileName); 
      return false;//NÃO CONSEGUIU ESCREVER NA PASTA
    }  
  }else{
    Serial.println("THIS FILE DOESN'T EXIST: " + fileName);
    return false;// ESSA PASTA NÃO EXISTE
  }   
}

String RWfile::readFile(String fileName){
  if(SPIFFS.exists(fileName)){   
    File myFile = SPIFFS.open(fileName, "r+");     
    if (myFile) {
      String stg = "";      
      while(myFile.available()>0)stg+=char(myFile.read());            
      myFile.close();     
      return stg;
    }else { 
      Serial.println("COULDN'T READ THE FILE: " + fileName);
      return "COULDN'T READ THE FILE";
    } 
  }else{
    Serial.println("THIS FILE DOESN'T EXIST: " + fileName);
    return "THIS FILE DOESN'T EXIST";
  }   
}
