#ifndef RWfile_h
#define RWfile_h

//DEFINE GLOBAL
#define COULD_NOT_READ "COULDN'T READ THE FILE"
#define NOT_EXIST "THIS FILE DOESN'T EXIST"

class RWfile{
  public:
    RWfile();
    ~RWfile();
    bool writeFile(String text,String fileName);
    String readFile(String fileName);    
    
  private:
    static int count;
};
#endif
