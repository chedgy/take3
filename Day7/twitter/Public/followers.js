
//  if (GetCookie()===  "" ){
//   //no user so send to sign on page
//   window.location="signon.html";
// }

//-----------------------------------------------------------------------------

//SetCookie ("abu");
var sendUser="abu";

  ajaxHandler("/followedtweets/" + sendUser  , function (resp) {



  		var tweetDiv =document.getElementById('tweets');
		  var dataStr="";
           for (var x in resp){
                dataStr+='<div id="newtweet"><p class="firstln">' + resp[x].follower+ '<p class="thirdln">' + resp[x].date + '</p>' ;
                dataStr += '</p>' + resp[x].msg  + '</div>';
                
            }
            tweetDiv.innerHTML=dataStr;

 });

  //------------------------------------------------------------

 //    ajaxHandler("/user/" + sendUser  , function (resp) {



 //      var tweetDiv =document.getElementById('emptySpace');
 //      var dataStr="";
 //      console.log("resp.name");
 //          dataStr+="<a href='personal.html'>" + resp.name +"</a>";
 //           // for (var x in resp){
 //           //      dataStr+='<div id="newtweet"><p class="firstln">' + resp[x].follower+ '<p class="thirdln">' + resp[x].date + '</p>' ;
 //           //      dataStr += '</p>' + resp[x].msg  + '</div>';
                
 //           //  }
 //            tweetDiv.innerHTML=dataStr;

 // });

//-----------------------------------------------------------------s
  
  var user=document.getElementById('userName');
  user.innerHTML=sendUser + " Followers";//GetCookie(); 
