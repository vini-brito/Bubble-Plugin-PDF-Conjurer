function(instance, properties, context) {
  
// finally generates the PDF

	
// this is in case no async operation was requested, for now only the insertion of images is async	
	
if (instance.data.imagesAreLoadedPromise === undefined) {
	
	pdfMake.createPdf(instance.data.docDefinition).download(properties.file_name); // this generates the pdf file
	
} else {
	
// I wrapped this around a promise so this only runs when the async image loading and writing its dataURL into library finishes
// otherwise no image would show up. This cant be sync because sync code runs first across workflow steps! 
// Thus only loading async stuff (images) after the pdf was generated
	
instance.data.imagesAreLoadedPromise.then(function(result) {
 	pdfMake.createPdf(instance.data.docDefinition).download(properties.file_name); // this generates the pdf file	
}, function(err) {
	if (err === undefined || err === null) {
		err = "an image wasnt loaded, this also happens because none was asked to, in this case just ignore this";
	}
 console.log(err); // I don't really reject the promise until the end, but I'll leave this here in case its needed in the future
});
	
}
	


}