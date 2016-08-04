function sum(){
	var paramLen=arguments.length;
	var tempSum=0;

	
	for (var x=0;x<paramLen;x++){
		tempSum+=arguments[x];
		
	}

	return tempSum;
}

//alert(sum (1,2,3,4,5,6));
