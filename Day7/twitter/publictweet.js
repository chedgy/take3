function getPulicTweet() {

	ajaxHandler("rest/tweets/User/All", function (tweets) {

	var publictweet = document.getElementById("publictweet");
		var htmlStr = "";
		for(var i = tweets.length -1; i >= 0; i--) {
			htmlStr += "<div class='tweetItem'>";
			htmlStr += "<div class='floatDiv'><a href='personal.html'><img src='avater/" + tweets[i]["fromUserId"] + ".jpg' width='50'></a></div>";
			htmlStr += "<div class='floatDiv'><div><a href='personal.html'><span class='tweetUserID'>" + tweets[i]["fromUserId"] + "</span></a><span class='tweetDate'>" + tweets[i]["date"] + "</span></div>";
			htmlStr += "<div class='tweetMsg'>" + tweets[i]["msg"] + "</div>";
			htmlStr += "<div><img src='images/tweet_" + tweets[i]["seq"] + ".jpg' width='500'></div></div>";
			htmlStr += "</div>";
		}
		publictweet.innerHTML = htmlStr;
		
	});
}