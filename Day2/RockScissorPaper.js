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



function ComputeWinner(userTurn){


	//eval users input and convert to #
	var userValue;
	userTurn=userTurn.toUpperCase();
	if (userTurn==="R" ){
		userValue=0;
	}else if (userTurn==="S"){
		userValue=1;
	}else if (userTurn==="P"){
		userValue=2;
	}

	//get computer generated value
	var computerValue=Math.floor(Math.random()*3);

	//Convert computer value to string
	var computerStringValue;
	if (computerValue===0){
		computerStringValue="rock";
	}else if (computerValue===1){
		computerStringValue="scissor";
	}else if (computerValue===2){
		computerStringValue="paper";
	}



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

var userInput = document.getElementById('txtPrompt');


 userInput.onkeydown = function (evt) {
	//was the enter key was pressed
	
	if (evt.key==="Enter"){

		userTurn=userInput.value;
		

		//userTurn=userTurn.toUpperCase(); //to allow lower case and upper case of r, s, p

		if (userTurn==="R" || userTurn ==="S" || userTurn==="P" || userTurn==="r" || userTurn === "s" || userTurn==="p") {
 			ComputeWinner (userTurn);
 			


 		}

	}

}





// do {
// 	var userTurn = prompt ("Enter your choice of (R)ock, (S)cissor, or (P)aper");
// 	userTurn=userTurn.toUpperCase(); //to allow lower case and upper case of r, s, p

// 	if (userTurn!="R" && userTurn !="S" && userTurn!="P") {
// 		alert ("Invalid user entry try again");
// 	}
	
// }while (userTurn!="R" && userTurn !="S" && userTurn!="P");


// //eval users input and convert to #
// var userValue;
// if (userTurn==="R"){
// 	userValue=0;
// }else if (userTurn==="S"){
// 	userValue=1;
// }else if (userTurn==="P"){
// 	userValue=2;
// }

// //get computer generated value
// var computerValue=Math.floor(Math.random()*3);

// //Convert computer value to string
// var computerStringValue;
// if (computerValue===0){
// 	computerStringValue="rock";
// }else if (computerValue===1){
// 	computerStringValue="scissor";
// }else if (computerValue===2){
// 	computerStringValue="paper";
// }



// //evaluate winner
// if (userValue===computerValue){
// 	alert("Computer chose " + computerStringValue + ". Tie game!");

// }else if(((userValue===0 || userValue===1)  && ((userValue+1)===computerValue)) || (userValue===2 && computerValue==0)){
// 	alert ("Computer chose " + computerStringValue + ". You are the winner!");

// }else if (((computerValue===0 || computerValue===1) && ((userValue-1)===computerValue)) || (computerValue===2 && userValue==0)){
// 	alert ("Computer chose " + computerStringValue + ". Sorry, you lose. Computer wins!");
// }


