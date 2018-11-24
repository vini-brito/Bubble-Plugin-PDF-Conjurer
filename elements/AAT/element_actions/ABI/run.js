function(instance, properties, context) {


var docDefinition = { content: "This is an sample PDF printed with pdfmake (actually you're using PDF Conjurer, a plugin that uses pdfmake's engine)! Also if you read this, it means all is well!" };


pdfMake.createPdf(docDefinition).download();



}