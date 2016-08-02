//
//Get user input for game

do {
	var userTurn = prompt ("Enter your choice of (R)ock, (S)cissor, or (P)aper");
	userTurn=userTurn.toUpperCase(); //to allow lower case and upper case of r, s, p

	if (userTurn!="R" && userTurn !="S" && userTurn!="P") {
		alert ("Invalid user entry try again");
	}
	
}while (userTurn!="R" && userTurn !="S" && userTurn!="P");


//eval users input and convert to #
var userValue;
if (userTurn==="R"){
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
	alert("Computer chose " + computerStringValue + ". Tie game!");

}else if(((userValue===0 || userValue===1)  && ((userValue+1)===computerValue)) || (userValue===2 && computerValue==0)){
	alert ("Computer chose " + computerStringValue + ". You are the winner!");

}else if (((computerValue===0 || computerValue===1) && ((userValue-1)===computerValue)) || (computerValue===2 && userValue==0)){
	alert ("Computer chose " + computerStringValue + ". Sorry, you lose. Computer wins!");
}


