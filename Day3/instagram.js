var user;
var filter="";

var div=document.createElement('div');
document.body.appendChild(div);

//---------------------------------------------------------------

var submit = document.getElementById('submit'); // button 
submit.onclick=function(evt){		//on click event for button
	//get selected value
	

		ClearImages();
		GetPics(user);
	
};

//------------------------------------------------------

var sel=document.getElementById("users"); //down selection
sel.onchange=function(evt){			//on click event for selection
	user=sel.value;
	
	
};

//-------------------------------------------

var txtFilter=document.getElementById("filter");
txtFilter.onkeyup=function (evt){
	 filter=txtFilter.value;
console.log (filter);


		

};


//-----------------------------------------


function GetPics(){ //using json retrieve pics and put in div tag

	var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var pics = JSON.parse(xhttp.responseText);


           div=document.createElement('div');
           div.id="allPics";
           div.style.border="solid";
       filter="c";
            
            	alert(filter);
               for (var x in pics){

               		 if (pics[x].includes(filter)){
               		alert("filter")
               		// }
               			

               			var img=document.createElement ("img");
             	 		img.title=pics[x].description;
            			img.src=" http://localhost:8080/images/" + pics[x].url;
            			div.appendChild(img);
            	
            }
            
          
          	document.body.appendChild(div);
    
        }
    };
    
    
    xhttp.open("GET", 'http://localhost:8080/' + user, true);
    xhttp.send();
}

//-------------------------------------------------

function ClearImages(){
//remove div to clear out prior selection
	document.body.removeChild(div);

}
