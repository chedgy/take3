function getFollowers() {
	//var followers = [{userID:'ABC'},{userID:'QWE'},{userID:'DFG'},{userID:'zxcvb'},{userID:'r64saa'}];
	
	ajaxHandler("Rest/followers/", function (followers) {

		var followerDiv = document.getElementById("followerlist");
		var htmlStr = "";
		for(var i = 0; i < followers.length; i++) {
			htmlStr += "<div>";
			htmlStr += "<div class='floatDiv'><a href='personal.html'><img src='avater/" + followers[i]["userId"] + ".jpg' width='50'></a></div>";
			htmlStr += "<div class='floatDiv'><a href='personal.html'><span class='tweetUserID'>" + followers[i]["userId"] + "</span>" + "</a></div>";
			htmlStr += "</div>";
		}
		followerDiv.innerHTML = htmlStr;
	});
}