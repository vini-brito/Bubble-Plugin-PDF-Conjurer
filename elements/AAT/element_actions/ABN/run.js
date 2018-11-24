function(instance, properties, context) {
  
// this returns an array holding the list of whatever bubble holds. Texts, number, Thing. Things are sent as objects.
let getList = (columnXBasicReference, startPosition, finishPosition) => {
  let returnedList = columnXBasicReference.get(startPosition, finishPosition);
   return returnedList;
	}	

// these functions serve to look into the 1st element of an array to judge if it's a list of things or not. Call them with isListOfThings(appMakerEnteredList) and passing a list (array) as argument.
let grabArrayWithFirstElement = (columnXBasicReference) => {
	return getList(columnXBasicReference, 0, 1);
}

let checkIsListOfThings = (columnXBasicReference) => { 
	if ( typeof grabArrayWithFirstElement(columnXBasicReference)[0] === "object" && grabArrayWithFirstElement(columnXBasicReference)[0] !== null ) {
      
			  return true;
  }	else  { 
	return false;
  }
	
}

// This extracts a field value from every thing in a list of things and stores them into an array of texts and/or number , 

let extractValueFromThingInlist = (element, fieldPositionXColumn) => {
			let fieldPosition = fieldPositionXColumn - 1; // since JS is zero indexed, we need to adapt the number 			
			let listOfProperties = element.listProperties(); // captures the name of each property the Thing has into an array of texts	
			let chosenPropertyName = listOfProperties[fieldPosition]; // a string that is the name of the property chosen		
  			let grabbedValue = element.get(chosenPropertyName); // grabs the value of the field (text, number, boolean, date, etc)
	    
			let turnGrabbedValueIntoText = (grabbed) => {              
            	    if (typeof grabbed !== "string" && typeof grabbed !== "number") {
        		return grabbed.toString()
                  	       }
            	  	else {
					 return grabbed
               	  }                             
				}
				
			let grabbedValueFormattedAsText = turnGrabbedValueIntoText(grabbedValue); 
			return grabbedValueFormattedAsText;
}  	

 
// listOfExtractedValues will become an array of texts or numbers extracted from each Thing
	
// this sees if it is a list of thing or of text/numbers and if it is a list of thing will extract a field's value from every thing in that list of thing and return as a new array 
// else, returns list of texts or numbers into a new array
let listOfWhatWillDeclare = (columnXBasicReference, fieldPositionXColumn, acquiredListXColumn) => {
	if (checkIsListOfThings(columnXBasicReference) === true) {
	return acquiredListXColumn.map(function(element) { return extractValueFromThingInlist(element, fieldPositionXColumn); });
	} else {
	return acquiredListXColumn;
	}
}

let listLoader = (columnBasicReference, columnLengthFunction, fieldPositionColumn) => {
	// grab the column array
	let acquiredListColumn = getList(columnBasicReference, 0, columnLengthFunction); 	
	// extract its value's if needed (in case it's a list of things)
	return listOfWhatWillDeclare(columnBasicReference, fieldPositionColumn, acquiredListColumn);
}

// now on to load the data by getting columns sent by the app maker
let listOfExtractedValuesFirstColumn = listLoader(properties.first_column, properties.first_column.length(), properties.field_position_first_column);

// these are inside an "if" because trying anything other than this will cause problems due to not always the app maker will send properties.second_column for example, by not using that column  
if (properties.use_second_column) {
   // var keyword because of scope, let keyword apparently won't be available out of here.
    var listOfExtractedValuesSecondColumn = listLoader(properties.second_column, properties.second_column.length(), properties.field_position_second_column); 
}  
  
if (properties.use_third_column) {
    var listOfExtractedValuesThirdColumn = listLoader(properties.third_column, properties.third_column.length(), properties.field_position_third_column);
}
  
if (properties.use_fourth_column) {
    var listOfExtractedValuesFourthColumn = listLoader(properties.fourth_column, properties.fourth_column.length(), properties.field_position_fourth_column);
}  
  
if (properties.use_fifth_column) {
    var listOfExtractedValuesFifthColumn = listLoader(properties.fifth_column, properties.fifth_column.length(), properties.field_position_fifth_column);
}
  
if (properties.use_sixth_column) {
    var listOfExtractedValuesSixthColumn = listLoader(properties.sixth_column, properties.sixth_column.length(), properties.field_position_sixth_column);
}
 
if (properties.use_seventh_column) {
    var listOfExtractedValuesSeventhColumn = listLoader(properties.seventh_column, properties.seventh_column.length(), properties.field_position_seventh_column);
}

if (properties.use_eighth_column) {
    var listOfExtractedValuesEighthColumn = listLoader(properties.eighth_column, properties.eighth_column.length(), properties.field_position_eighth_column);
}  
  
if (properties.use_ninth_column) {
    var listOfExtractedValuesNinthColumn = listLoader(properties.ninth_column, properties.ninth_column.length(), properties.field_position_ninth_column);
}   
  
if (properties.use_tenth_column) {
    var listOfExtractedValuesTenthColumn = listLoader(properties.tenth_column, properties.tenth_column.length(), properties.field_position_tenth_column);
}   
  
if (properties.use_eleventh_column) {
    var listOfExtractedValuesEleventhColumn = listLoader(properties.eleventh_column, properties.eleventh_column.length(), properties.field_position_eleventh_column);
}   
  
if (properties.use_twelfth_column) {
    var listOfExtractedValuesTwelfthColumn = listLoader(properties.twelfth_column, properties.twelfth_column.length(), properties.field_position_twelfth_column);
}   
  
if (properties.use_thirteenth_column) {
    var listOfExtractedValuesThirteenthColumn = listLoader(properties.thirteenth_column, properties.thirteenth_column.length(), properties.field_position_thirteenth_column);
}   
  
if (properties.use_fourteenth_column) {
    var listOfExtractedValuesFourteenthColumn = listLoader(properties.fourteenth_column, properties.fourteenth_column.length(), properties.field_position_fourteenth_column);
}   
  
if (properties.use_fifteenth_column) {
    var listOfExtractedValuesFifteenthColumn = listLoader(properties.fifteenth_column, properties.fifteenth_column.length(), properties.field_position_fifteenth_column);
}   
  
if (properties.use_sixteenth_column) {
    var listOfExtractedValuesSixteenthColumn = listLoader(properties.sixteenth_column, properties.sixteenth_column.length(), properties.field_position_sixteenth_column);
}   
  
if (properties.use_seventeenth_column) {
    var listOfExtractedValuesSeventeenthColumn = listLoader(properties.seventeenth_column, properties.seventeenth_column.length(), properties.field_position_seventeenth_column);
} 
  
if (properties.use_eighteenth_column) {
    var listOfExtractedValuesEighteenthColumn = listLoader(properties.eighteenth_column, properties.eighteenth_column.length(), properties.field_position_eighteenth_column);
}   
  
if (properties.use_nineteenth_column) {
    var listOfExtractedValuesNineteenthColumn = listLoader(properties.nineteenth_column, properties.nineteenth_column.length(), properties.field_position_nineteenth_column);
}   
  
if (properties.use_twentieth_column) {
    var listOfExtractedValuesTwentiethColumn = listLoader(properties.twentieth_column, properties.twentieth_column.length(), properties.field_position_twentieth_column);
}   
    
// auxiliary functions for the transposition incoming!
  
// transform "undefined" array elements created by the transposition function into null elements so pdfmake works fine with them (undefined causes crashes) 
let createBlanks = (element) => {
			let checkAndSwap = (nestedElement) => {
      	if (nestedElement === undefined) {
      		return null;
      	} else {
        	return nestedElement
        }
      }
			return element.map(checkAndSwap) ;
}  
  
let returnLength = (element) => {
		return element.length;
}

let biggerComparer = (accumulator, currentValue) => {
		let biggerNumber;
    if (accumulator > currentValue) {
    		biggerNumber = accumulator; 
    } else {
    		biggerNumber = currentValue;
    }
    return biggerNumber;
}

let isThisTheBiggestLength = (element, index, array) => {
			if (element === biggestLength) {
        return true
      } else {
     	    return false
      }
}

// composeInMe is an array of objects and we push a new object into it, each object is an element created in the pdf
  

// here we bring it into existence if it doesn't exists yet
  
if (instance.data.composeInMe === undefined) {
												instance.data.composeInMe = []; 
											}
  
// here we capture whatever the user (app maker) has inputed into the workflow actions into an objects
if (properties.tableStyle === undefined) {
												properties.tableStyle = ""; 
											}  
let definedStyleForTable = properties.tableStyle.replace(/\W/g, ''); // small regex to remove any undesirable characters from style name inputed by app maker

let tableCustomMarginsDefinitionLogic = () =>  {
  if (properties.table_custom_margins === true) { return [properties.table_left_margin, properties.table_top_margin, properties.table_right_margin, properties.table_bottom_margin];   
  }		else { return null; } // function to allow to set custom margins or ignore it and use default ones
 }  

// the body property is an array that will hold other arrays that will be turned into rows. 
let tableBody = [];
let tableBodyTransposed = [];  
	
	
  
// now we push the acquired array(s) inside the "body:" main array to create a row with each array (to later be transposed into a column)  
tableBody.push(listOfExtractedValuesFirstColumn); 
	
if (properties.use_second_column) {	
	tableBody.push(listOfExtractedValuesSecondColumn); 
}

if (properties.use_third_column) {	
	tableBody.push(listOfExtractedValuesThirdColumn); 
}  
  
if (properties.use_fourth_column) {	
	tableBody.push(listOfExtractedValuesFourthColumn); 
}  
  
if (properties.use_fifth_column) {	
	tableBody.push(listOfExtractedValuesFifthColumn); 
}  
  
if (properties.use_sixth_column) {	
	tableBody.push(listOfExtractedValuesSixthColumn); 
}  
  
if (properties.use_seventh_column) {	
	tableBody.push(listOfExtractedValuesSeventhColumn); 
}  
  
if (properties.use_eighth_column) {	
	tableBody.push(listOfExtractedValuesEighthColumn); 
}  
  
if (properties.use_ninth_column) {	
	tableBody.push(listOfExtractedValuesNinthColumn); 
}  
  
if (properties.use_tenth_column) {	
	tableBody.push(listOfExtractedValuesTenthColumn); 
}  
  
if (properties.use_eleventh_column) {	
	tableBody.push(listOfExtractedValuesEleventhColumn); 
}  
  
if (properties.use_twelfth_column) {	
	tableBody.push(listOfExtractedValuesTwelfthColumn); 
}  
  
if (properties.use_thirteenth_column) {	
	tableBody.push(listOfExtractedValuesThirteenthColumn); 
}  
  
if (properties.use_fourteenth_column) {	
	tableBody.push(listOfExtractedValuesFourteenthColumn); 
}  
  
if (properties.use_fifteenth_column) {	
	tableBody.push(listOfExtractedValuesFifteenthColumn); 
}  
  
if (properties.use_sixteenth_column) {	
	tableBody.push(listOfExtractedValuesSixteenthColumn); 
}  
  
if (properties.use_seventeenth_column) {	
	tableBody.push(listOfExtractedValuesSeventeenthColumn); 
}  
  
if (properties.use_eighteenth_column) {	
	tableBody.push(listOfExtractedValuesEighteenthColumn); 
}  
  
if (properties.use_nineteenth_column) {	
	tableBody.push(listOfExtractedValuesNineteenthColumn); 
}  
  
if (properties.use_twentieth_column) {	
	tableBody.push(listOfExtractedValuesTwentiethColumn); 
}  
  
// here we fill in blank elements to the table so it becomes a square matrix and doesn't crashes (pdfmake only likes square matrices!)
  
let storedListLengths = tableBody.map(returnLength);  
  
let biggestLength = storedListLengths.reduce(biggerComparer);  
  
let indexOfLongerArray = storedListLengths.findIndex(isThisTheBiggestLength); 

// a transpose function  
let transpose = (a) => {

  // Calculate the width and height of the Array
  var w = a.length || 0;
  var h = a[indexOfLongerArray] instanceof Array ? a[indexOfLongerArray].length : 0;

  // In case it is a zero matrix, no transpose routine needed.
	  if(h === 0 || w === 0) { return []; }

  /**
   * @var {Number} i Counter
   * @var {Number} j Counter
   * @var {Array} t Transposed data is stored in this array.
   */
  var i, j, t = [];

  // Loop through every item in the outer array (height)
  for(i=0; i<h; i++) {

    // Insert a new row (array)
    t[i] = [];

    // Loop through every item per item in outer array (width)
    for(j=0; j<w; j++) {

      // Save transposed data.
      t[i][j] = a[j][i];
    }
  }

  return t;
}
  
  
// here we transpose the table to fit pdfmake's table structure of array  
tableBodyTransposed = transpose(tableBody);

  
tableBody = tableBodyTransposed.map(createBlanks);
 
  
  
 
// now let's put the headers so they become the first row. This is after the transposition, because we want it to not be transposed so it stays a row and doesn't becomes a column   
var useHeaderRow = 0; // in case a header row isn't used, this won't make the first row be repeated on other pages that the table may extend to.
  
if (properties.table_uses_header_row) {
    if (properties.header_style === undefined) {
												properties.header_style = ""; 
											}  
	var useHeaderRow = 1; // this will make the first row be repeated in the other pages the table also extends to.
	
	var arrayOfHeaders = []; 

	var definedStyleForHeaderText = properties.header_style.replace(/\W/g, ''); // small regex to remove any undesirable characters from style name inputed by app maker

    let firstColumnHeaderAsObj = {text: `${properties.first_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
    arrayOfHeaders.push(firstColumnHeaderAsObj);  
  
	if (properties.use_second_column) {
    let secondColumnHeaderAsObj = {text: `${properties.second_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(secondColumnHeaderAsObj);
	}

	if (properties.use_third_column) {
  	let thirdColumnHeaderAsObj = {text: `${properties.third_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(thirdColumnHeaderAsObj);
	}  
  
	if (properties.use_fourth_column) {
  	let fourthColumnHeaderAsObj = {text: `${properties.fourth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(fourthColumnHeaderAsObj);
	}  
  
	if (properties.use_fifth_column) {
  	let fifthColumnHeaderAsObj = {text: `${properties.fifth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(fifthColumnHeaderAsObj);
	}  
  
	if (properties.use_sixth_column) {
  	let sixthColumnHeaderAsObj = {text: `${properties.sixth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(sixthColumnHeaderAsObj);
	}  
  
	if (properties.use_seventh_column) {
  	let seventhColumnHeaderAsObj = {text: `${properties.seventh_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(seventhColumnHeaderAsObj);
	}  
  
	if (properties.use_eighth_column) {
  	let eighthColumnHeaderAsObj = {text: `${properties.eighth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(eighthColumnHeaderAsObj);
	}  
  
	if (properties.use_ninth_column) {
  	let ninthColumnHeaderAsObj = {text: `${properties.ninth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(ninthColumnHeaderAsObj);
	} 
  
	if (properties.use_tenth_column) {
  	let tenthColumnHeaderAsObj = {text: `${properties.tenth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(tenthColumnHeaderAsObj);
	}  
  
	if (properties.use_eleventh_column) {
	let eleventhColumnHeaderAsObj = {text: `${properties.eleventh_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(eleventhColumnHeaderAsObj);
	} 
  
	if (properties.use_twelfth_column) {
  	let twelfthColumnHeaderAsObj = {text: `${properties.twelfth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(twelfthColumnHeaderAsObj);
	}  
  
	if (properties.use_thirteenth_column) {
  	let thirteenthColumnHeaderAsObj = {text: `${properties.thirteenth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(thirteenthColumnHeaderAsObj);
	}  
  
	if (properties.use_fourteenth_column) {
  	let fourteenthColumnHeaderAsObj = {text: `${properties.fourteenth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(fourteenthColumnHeaderAsObj);
	}  
  
	if (properties.use_fifteenth_column) {
  	let fifteenthColumnHeaderAsObj = {text: `${properties.fifteenth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(fifteenthColumnHeaderAsObj);
	}  
  
	if (properties.use_sixteenth_column) {
  	let sixteenthColumnHeaderAsObj = {text: `${properties.sixteenth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(sixteenthColumnHeaderAsObj);
	}  
  
	if (properties.use_seventeenth_column) {
  	let seventeenthColumnHeaderAsObj = {text: `${properties.seventeenth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(seventeenthColumnHeaderAsObj);
	}  
  
	if (properties.use_eighteenth_column) {
  	let eighteenthColumnHeaderAsObj = {text: `${properties.eighteenth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(eighteenthColumnHeaderAsObj);
	}  
  
	if (properties.use_nineteenth_column) {
 	let nineteenthColumnHeaderAsObj = {text: `${properties.nineteenth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(nineteenthColumnHeaderAsObj);	
	}  
  
	if (properties.use_twentieth_column) {
  	let twentiethColumnHeaderAsObj = {text: `${properties.twentieth_column_header}`, style: `${definedStyleForHeaderText.toLowerCase()}`  };  
  	arrayOfHeaders.push(twentiethColumnHeaderAsObj);
	}  


	tableBody.unshift(arrayOfHeaders);  
}

// now to set the widths of every used column	
let arrayOfWidths = [];
	
if (properties.table_column_width === "Fit available space") {
	var columnsWidth = "*";
}	else {
	var columnsWidth = "auto";
}	
	
arrayOfWidths.push(columnsWidth);  
  
if (properties.use_second_column) { 
	arrayOfWidths.push(columnsWidth); 
}

if (properties.use_third_column) {
	arrayOfWidths.push(columnsWidth); 
}  
  
if (properties.use_fourth_column) {
	arrayOfWidths.push(columnsWidth); 
}  
  
if (properties.use_fifth_column) {
	arrayOfWidths.push(columnsWidth); 
}  
  
if (properties.use_sixth_column) {
	arrayOfWidths.push(columnsWidth); 
}  
  
if (properties.use_seventh_column) {
	arrayOfWidths.push(columnsWidth); 
}  
  
if (properties.use_eighth_column) {
	arrayOfWidths.push(columnsWidth); 
}  
  
if (properties.use_ninth_column) {
	arrayOfWidths.push(columnsWidth); 
} 
  
if (properties.use_tenth_column) {
	arrayOfWidths.push(columnsWidth); 
}  
  
if (properties.use_eleventh_column) {
	arrayOfWidths.push(columnsWidth); 
} 
  
if (properties.use_twelfth_column) {
	arrayOfWidths.push(columnsWidth);  
}  
  
if (properties.use_thirteenth_column) {
	arrayOfWidths.push(columnsWidth); 
}  
  
if (properties.use_fourteenth_column) {
	arrayOfWidths.push(columnsWidth);  
}  
  
if (properties.use_fifteenth_column) {
	arrayOfWidths.push(columnsWidth); 
}  
  
if (properties.use_sixteenth_column) {
	arrayOfWidths.push(columnsWidth); 
}  
  
if (properties.use_seventeenth_column) {
	arrayOfWidths.push(columnsWidth); 
}  
  
if (properties.use_eighteenth_column) {
	arrayOfWidths.push(columnsWidth); 
}  
  
if (properties.use_nineteenth_column) {
	arrayOfWidths.push(columnsWidth); 
}  
  
if (properties.use_twentieth_column) {
	arrayOfWidths.push(columnsWidth); 
}  

// here to grab the layout chosen by the app maker and set it up on this table
	
let selectLayout = (chosenLayout) => {
	if (chosenLayout === "No Borders") {		
		return "noBorders";
	}
	else if (chosenLayout === "Header Line Only") {
		return "headerLineOnly";
	} 
	else if (chosenLayout === "Light Horizontal Lines") {
		return "lightHorizontalLines";
	}
	else if (chosenLayout === "Strong Outer Border") {
		return {
				hLineWidth: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 2 : 1;
				},
				vLineWidth: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 2 : 1;
				},
				hLineColor: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
				},
				vLineColor: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
				}
			}
	}
	else if (chosenLayout === "Zebra") {
		return {
				fillColor: function (i, node) {
					return (i % 2 === 0) ? '#CCCCCC' : null;
					} 
				}
	}
	else { 
		return "no layout specified"
	}

}

let layoutHolder = selectLayout(properties.table_layout);
	
let tableObjectHolder =	{
						table: {
								headerRows: useHeaderRow,
								widths: arrayOfWidths,
                                body: tableBody,	
                             	},
						style: `${definedStyleForTable.toLowerCase()}`, 									
						margin: tableCustomMarginsDefinitionLogic() ,
						layout: layoutHolder,												
						pageBreak: properties.page_break.toLowerCase(),
						};   
     
 // here, in case this is being inputted into a multi column, will add the width of this element's column then push it into the specified column.
	
if (properties.into_multi_column === true) {
	
		if (properties.this_column_width === "Fit available space") {
		tableObjectHolder.width = "*";
	}	else {
		tableObjectHolder.width = "auto";
	}	
	
	// pushing into the multi column
	instance.data.multiColumnObjectHolder[`${properties.multi_column_name}`].columns.push(tableObjectHolder);
	
} else if (properties.into_footer === true) {

	// here we push it into the footer
	instance.data.footerObjectsHolder.columns.push(tableObjectHolder);
	
} else if (properties.into_header === true) {

	// here we push it into the header
	instance.data.headerObjectsHolder.columns.push(tableObjectHolder);
	
} else {
	// here we push the object into the main document body 
	
	instance.data.composeInMe.push(tableObjectHolder);
} 

	
	
	
	
	

}
























