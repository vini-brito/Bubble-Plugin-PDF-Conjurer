function(instance, properties, context) {

// composeInMe is an array of objects and we push a new object into it, each object is an element created in the pdf
  

// here we bring it into existence if it doesn't exists yet
  
if (instance.data.composeInMe === undefined) {
												instance.data.composeInMe = []; 
											}
	
// same as above	
if (instance.data.multiColumnObjectHolder === undefined) {
												instance.data.multiColumnObjectHolder = []; 
											}	
  
// here we capture whatever the user (app maker) has inputed into the workflow actions into an object

instance.data.multiColumnObjectHolder[`${properties.multiColumnName}`] =   	{
									pageBreak: properties.page_break.toLowerCase(),
									columns:[],
								}; 
  
// we don't push this object inside composeInMe now because first we have to push some element objects (texts tables images etc) into the columns array

   
							
  
 



}