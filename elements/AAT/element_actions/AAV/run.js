function(instance, properties, context) {

// composeInMe is an array of objects and we push a new object into it, each object is an element created in the pdf
  

// here we bring it into existence if it doesn't exists yet
  
if (instance.data.composeInMe === undefined) {
												instance.data.composeInMe = []; 
											}
  
// here we capture whatever the user (app maker) has inputed into the workflow actions into an object

if (properties.textStyles === undefined) {
		properties.textStyles = "";
}
let definedStyleForText = properties.textStyles.replace(/\W/g, ''); // small regex to remove any undesirable characters from style name inputed by app maker

let txtCustomMarginsDefinitionLogic = () =>  {
  if (properties.text_custom_margins === true) { return [properties.left_margin, properties.top_margin, properties.right_margin, properties.bottom_margin];   
  }		else { return null; } // function to allow to set custom margins or ignore it and use default ones
 }



let textObjectHolder =   	{
									text: `${properties.inputtedText}`,
									style: `${definedStyleForText.toLowerCase()}`, 									
  									margin: txtCustomMarginsDefinitionLogic() ,
									pageBreak: properties.page_break.toLowerCase(),
								}; 
  
	
// here, in case this is being inputted into a multi column, will add the width of this element's column then push it into the specified column.
	
if (properties.into_multi_column === true) {
	
		if (properties.this_column_width === "Fit available space") {
		textObjectHolder.width = "*";
	}	else {
		textObjectHolder.width = "auto";
	}	
	
	// pushing into the multi column
	instance.data.multiColumnObjectHolder[`${properties.multi_column_name}`].columns.push(textObjectHolder);
	
} else if (properties.into_footer === true) {

	// here we push it into the footer
	instance.data.footerObjectsHolder.columns.push(textObjectHolder);
	
} else if (properties.into_header === true) {

	// here we push it into the header
	instance.data.headerObjectsHolder.columns.push(textObjectHolder);
	
} else {
	// here we push the object into the main document body 
	
	instance.data.composeInMe.push(textObjectHolder);
}
	
	

   
							
  
 



}