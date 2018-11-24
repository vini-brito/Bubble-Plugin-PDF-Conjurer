function(instance, properties, context) {

// here we kick off the header column. It works the more or less like the multi column wrapper, with some added complexity.
// the difference is that we must use a function as the header object (functions are objects!) to return a dynamic header
// and also within that function return the whole "object holder" that has a function that runs when the pdf file is generated
// like the multi columns, we push elements inside the columns array, here it is instance.data.headerObjectsHolder.columns
// use that	"address" to send elements to the header.
// apologize for the bad explanation, I'm pulling an all night right now, it's 2:00 A.M and I'm here since yesterday morning with a few breaks only xD
// it's day now, still can't come up with better explanation. Well.	
	
	
// to avoid "is undefined" errors because choosing this is optional for the app maker. It is only needed if the app maker chooses to use page counter 
if (properties.page_number_alignment === undefined) {
												properties.page_number_alignment = ""; 
											}	
	
	
	
	
// this function is meant to not numerate the header on some pages (of course on app maker's request).	
const whatCounterToShowOnThisPage = (currentPage) => {
	
	if (properties.use_exclude_pages) {
		
						let arrayOfExcludedNumbers = properties.exclude_pages.match(/\d+/g).map(Number); // extracts the numbers from the string inputted by the app maker
								
						// By activating "start count on second page"
						// The document page currentPage 2 becomes shown as page number 1  
						// The document page currentPage 4 becomes shown as page number 3 
						// Then, the app maker will want tell us to hide "pages number 2 and 4", but if he also requested to start counting on second page...
						// It means he actually wants to hide the counter on the document pages 3 and 5. Because these are where his pages 2 and 4 will be.
						// Hence the adjustment function below.		
		
						let adjustedArrayOfExcludedNumbersOrNot;
		
						if (properties.start_count_on_second_page === true) {
							
							adjustedArrayOfExcludedNumbersOrNot = arrayOfExcludedNumbers.map( function(value) { 
    							return value + 1; 
							} );
							
							
							
						} else {
							
							adjustedArrayOfExcludedNumbersOrNot = arrayOfExcludedNumbers; // this is in case the app maker didn't requested to start counting pages only on second page
							
						}
						
						if (!adjustedArrayOfExcludedNumbersOrNot.includes(currentPage) && properties.start_count_on_second_page === true) {
								
							return {
									text: startCountingOnSecondPage(currentPage) , 
									alignment: properties.page_number_alignment, 
									margin: [properties.left_margin, properties.top_margin, properties.right_margin, properties.bottom_margin],	
									}	
							
							} else if (!adjustedArrayOfExcludedNumbersOrNot.includes(currentPage) && properties.start_count_on_second_page === false) {
							
							return {
									text: startCountingOnSecondPage(currentPage) , 
									alignment: properties.page_number_alignment, 
									margin: [properties.left_margin, properties.top_margin, properties.right_margin, properties.bottom_margin],	
									}	
								
							} else {
								
							return {
									text: "" , // if current page is in the black list defined by app maker, page counter will be an empty string and not appear
									alignment: properties.page_number_alignment, 
									margin: [properties.left_margin, properties.top_margin, properties.right_margin, properties.bottom_margin],	
									} 
							}
		
	} else {
			return 	{
					text: startCountingOnSecondPage(currentPage), 
					alignment: properties.page_number_alignment, 
					margin: [properties.left_margin, properties.top_margin, properties.right_margin, properties.bottom_margin],	
					}
	}
	
	
	
}	
	
// this trick will make the second page show the number 1 and hide the number 0 from the first page.
const startCountingOnSecondPage = (currentPage) => { 

		if (properties.start_count_on_second_page === true && currentPage > 1) {
			return currentPage - 1;  // transforms number 2 into 1 and, 3 into 2 and on	
		} else if (properties.start_count_on_second_page === true && currentPage === 1) {
			return ""; // hide the real number 1 by sending an empty string instead of it 
		} else if (properties.start_count_on_second_page === false) {
			return currentPage; // if the app maker did not requested to start counting only on the second page, return the real page number. First page will show 1, second shows 2 etc
		}
}		

	
// holds objects inserted by the next element actions in the Bubble workflow
instance.data.headerObjectsHolder = {									
									columns: [] 
								}
	
// holds objects inserted by the page number counter function
instance.data.finalHeaderObjectsHolder = {
									columns: []
								}

// this inserts "whatCounterToShowOnThisPage" into "columns" so it ultimately becomes the right number to be shown		
instance.data.docDefinition.header = function(currentPage) {
	
	debugger;
	instance.data.finalHeaderObjectsHolder.columns = []; // wipes clean the header array from the previous run
	
	// first we concatenate the element holding array into the final array (or don't, in some cases specified below) 
	
	if (properties.use_exclude_elements_pages) {
		
						let arrayOfExcludedNumbers = properties.exclude_elements_pages.match(/\d+/g).map(Number); // extracts the numbers from the string inputted by the app maker
								
						// By activating "start count on second page"
						// The document page currentPage 2 becomes shown as page number 1  
						// The document page currentPage 4 becomes shown as page number 3 
						// Then, the app maker will want tell us to hide "header on pages number 2 and 4", but if he also requested to start counting on second page...
						// It means he actually wants to hide the header on the document pages 3 and 5. Because these are where his pages 2 and 4 will be.
						// Hence the adjustment function below.		
		
						let adjustedArrayOfExcludedNumbersOrNot;
		
						if (properties.start_count_on_second_page === true) {
							
							adjustedArrayOfExcludedNumbersOrNot = arrayOfExcludedNumbers.map( function(value) { 
    							return value + 1; 
							} );
							
							
							
						} else {
							
							adjustedArrayOfExcludedNumbersOrNot = arrayOfExcludedNumbers; // this is in case the app maker didn't requested to start counting pages only on second page
							
						}
							
						if (!adjustedArrayOfExcludedNumbersOrNot.includes(currentPage)) {
							
							 instance.data.finalHeaderObjectsHolder.columns = [].concat(instance.data.headerObjectsHolder.columns);	// concatenate the elements array with the header array 
								
							} else {
								
							instance.data.finalHeaderObjectsHolder.columns = []; // in case this page is in the app maker's black list, it won't concatenate the header elements
								
							}
		
	} else {
			instance.data.finalHeaderObjectsHolder.columns = [].concat(instance.data.headerObjectsHolder.columns);;
	}	
	
	
	// then we work out the counter (page number) logic and insert it at the final array
	
	if (properties.show_page_number === true) { // don't return anything related to page number case it's not true
	
	    if (properties.page_number_alignment === "right") {					 	
		
	        	instance.data.finalHeaderObjectsHolder.columns.push(whatCounterToShowOnThisPage(currentPage)); // used push to position the page counter as right as possible
			
        
	    	} else if (properties.page_number_alignment === "left") {
        
			
	         	instance.data.finalHeaderObjectsHolder.columns.unshift(whatCounterToShowOnThisPage(currentPage)); // used unshift to position the page counter as left as possible
         
			
 	   	} else {
        			
	        	let byHalf = instance.data.finalHeaderObjectsHolder.columns.length / 2; // this trick to put it into the middle works better with even number of elements
				
	        	instance.data.finalHeaderObjectsHolder.columns.splice(byHalf, 0, whatCounterToShowOnThisPage(currentPage)); // used splice to position the page counter as "middle" as possible
			
			
			}   
			
			
      	}
		
	
      
	
		
		
    return instance.data.finalHeaderObjectsHolder;
	
    }



/* return {
		text: `${currentPage}`, 
		alignment: properties.page_number_alignment, 
		margin: [properties.left_margin, properties.top_margin, properties.right_margin, properties.bottom_margin]
} 

this is a sample of what must ultimately be returned to show the counter */

		






	


   
							
  
 



}