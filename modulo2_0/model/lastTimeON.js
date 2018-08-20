 /*
* @Author: Daniel
* @Date:   2018-08-08 16:32:45
* @Last Modified by:   Daniel
* @Last Modified time: 2018-08-08 18:20:48
*/
var mongoose = require('mongoose');


var lastTimeONSchema = mongoose.Schema({
	date:{type: Date, default: new Date(1999, 11, 24, 10, 33, 30, 0)}
});

var model = mongoose.model('lastTimeONSchema', lastTimeONSchema);

model.find(function(err,data){	
	if(!data.length){                                      
		create();		 
	}
});	

function create(){
	console.log("create"); 
	var user = new  model();	
	user.save();	
} 

module.exports = function (){
	return model;
}