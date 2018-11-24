function(instance, properties, context) {

	
// composeInMe is an array of objects and we push a new object into it, each object is an element created in the pdf
  

// here we bring it into existence if it doesn't exists yet
  
if (instance.data.composeInMe === undefined) {
												instance.data.composeInMe = []; 
											}	
	
	
let fixedImageUrl = `https:${properties.image_link}`; // because bubble doesn't passes the protocol, only the link, so we append the protocol ourselves	
	
let providedImageName = properties.image_name.replace(/\W/g, ''); // small regex to remove any undesirable characters from style name inputed by app maker	
	
instance.data.outsideImageLoadedResolve; // a way to resolve a promise outside its executor body
instance.data.outsideImageLoadedReject; // same as above

// this promise will be resolved when the image finishes being converted into dataURL
// as for now (synchronously), we only insert an object containing the image name into the composeInMe to save its spot
// and then asynchronously we insert the dataURL into docDefinition's library (the images property) 
// only then it will allow the pdf generating final command to fire, because it will be bound to the same promise
// we can't fire the final command without having the images fully loaded and passed in their objects place, so I made the final command async too	
	
instance.data.imagesAreLoadedPromise = new Promise(function(resolve, reject) { 
		instance.data.outsideImageLoadedResolve = resolve; // here we extract the resolving and rejecting functions to be called later on in the code
    	instance.data.outsideImageLoadedReject = reject; 
  
	}); 	
	
// this function grabs an image URL (string) and outputs its dataURL (very long string)
	
function imgURLToDataURL(url, options = {}) {
  return new Promise((resolve, reject) => {
    img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      let canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        dataURL;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL(options.outputFormat, options.quality);
      resolve(dataURL);
      canvas = null;
    };
    img.src = url;
  });
}

	
imgURLToDataURL(fixedImageUrl)
	.then(function(dataURL){	
	instance.data.outsideImageLoadedResolve(dataURL); // resolves the promise that the image was loaded and send it to the other .then functions
  });

// this happens when the image loading promise gets solved.
instance.data.imagesAreLoadedPromise.then(function(result) {
 	instance.data.docDefinition.images[`${providedImageName.toLowerCase()}`] = result; // this is what actually writes the dataURL to the image library		
}, function(err) {
	if (err === undefined || err === null) {
		err = "an image wasnt loaded, this also happens because none was asked to, in this case just ignore this";
	}
 console.log(err); // I don't really reject the promise anywhere for now, but I'll leave this here in case its needed in the future
});
	

	
	// here we capture whatever the user (app maker) has inputed into the workflow actions into an object	
	
if (properties.image_width === undefined) {
		properties.image_width = "";
}

if (properties.image_height === undefined) {
		properties.image_height = "";
}	

let imgCustomMarginsDefinitionLogic = () =>  {
  if (properties.image_custom_margins === true) { return [properties.left_margin, properties.top_margin, properties.right_margin, properties.bottom_margin];   
  }		else { return null; } // function to allow to set custom margins or ignore it and use default ones
 }	
	
let imageObjectHolder = {
					image: providedImageName.toLowerCase(),	// the .toLowerCase() method is to make the app maker inputted name case insensitive. Better experience.	
					pageBreak: properties.page_break.toLowerCase(),
					width: properties.image_width,
					height: properties.image_height,
					margin: imgCustomMarginsDefinitionLogic(),
					};	
	
	
	
	
 // here, in case this is being inputted into a multi column, will add the width of this element's column then push it into the specified column.
	
if (properties.into_multi_column === true) {
	
	// pushing into the multi column
	instance.data.multiColumnObjectHolder[`${properties.multi_column_name}`].columns.push(imageObjectHolder);
	
} else if (properties.into_footer === true) {

	// here we push it into the footer
	instance.data.footerObjectsHolder.columns.push(imageObjectHolder);
	
} else if (properties.into_header === true) {

	// here we push it into the header
	instance.data.headerObjectsHolder.columns.push(imageObjectHolder);
	
} else {
	// here we push the object into the main document body 
	
	instance.data.composeInMe.push(imageObjectHolder);
} 	
	
	
	
	
}	









