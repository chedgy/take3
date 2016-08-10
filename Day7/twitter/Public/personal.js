
//  if (GetCookie()===  "" ){
//   //no user so send to sign on page
//   window.location="signon.html";
// }

//-----------------------------------------------------------------------------

//SetCookie ("abu");
var sendUser="abu";

  ajaxHandler("/tweets/" + sendUser  , function (resp) {



  		var tweetDiv =document.getElementById('tweets');
		  var dataStr="";
           for (var x in resp){
                dataStr+='<div id="newtweet"><p class="firstln">' + resp[x].userid + '<p class="thirdln">' + resp[x].date + '</p>' ;
                dataStr += '</p>' + resp[x].msg  + '</div>';
                
            }
            tweetDiv.innerHTML=dataStr;

 });

//-----------------------------------------------------------------s
  
  var user=document.getElementById('userName');
  user.innerHTML=sendUser;//GetCookie(); 
