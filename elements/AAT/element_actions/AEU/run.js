function(instance, properties, context) {

// composeInMe is an array of objects and we push a new object into it, each object is an element created in the pdf 	
	
// here we push the multi column object 	
  
instance.data.composeInMe.push(instance.data.multiColumnObjectHolder[`${properties.multiColumnName}`]);	

}