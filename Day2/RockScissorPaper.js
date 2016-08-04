//
//Get user input for game

function DomPrompt(msg){

           

	var div = document.createElement ("div");
	div.innerHTML = msg;
	document.body.appendChild(div);


}




function DomAlert(msg){
 	var div =document.createElement ("div");
	div.innerHTML=msg;
	div.setAttribute('class','alert_class');
	document.body.appendChild(div);

}

function ConvertValues(entry){
	
	
	 var convertValue;
	//alert(!isNaN(parseFloat(entry)) && isFinite(entry);)
	 if (entry===0 || entry === 1 || entry===2){
	// 	//Convert computer value to string
		
		if (entry===0){
			convertValue="rock";
		}else if (entry===1){
			convertValue="scissor";
		}else if (entry===2){
			convertValue="paper";
		}
	

	}else{
			//eval users input and convert to #
		
		userTurn=entry.toUpperCase();
		
		if (userTurn==="R" ){
			convertValue=0;
		}else if (userTurn==="S"){
			convertValue=1;
		}else if (userTurn==="P"){
			convertValue=2;
		}
		


	 }
	 return convertValue;
}





function ComputeWinner(userValue, computerValue){

	//evaluate winner
	if (userValue===computerValue){
		DomAlert("Computer chose " + computerStringValue + ". Tie game!");

	}else if(((userValue===0 || userValue===1)  && ((userValue+1)===computerValue)) || (userValue===2 && computerValue==0)){
		DomAlert ("Computer chose " + computerStringValue + ". You are the winner!");

	}else if (((computerValue===0 || computerValue===1) && ((userValue-1)===computerValue)) || (computerValue===2 && userValue==0)){
		DomAlert ("Computer chose " + computerStringValue + ". Sorry, you lose. Computer wins!");
	}

}


DomPrompt("Enter your choice of (R)ock, (S)cissor, or (P)aper");
//get text in text box and eval if enter clicked and then get value
var userTurn;
var computerStringValue;

var userInput = document.getElementById('txtPrompt');


 userInput.onkeydown = function (evt) {
	//was the enter key was pressed
	
	if (evt.key==="Enter"){

		userTurn=userInput.value;
		

		//userTurn=userTurn.toUpperCase(); //to allow lower case and upper case of r, s, p

		if (userTurn==="R" || userTurn ==="S" || userTurn==="P" || userTurn==="r" || userTurn === "s" || userTurn==="p") {
			userValue=ConvertValues(userTurn);

			
			// //get computer generated value
			var computerValue=Math.floor(Math.random()*3);

			computerStringValue=ConvertValues(computerValue);

			ComputeWinner (userValue,computerValue);
 			


 		}

	}

}



