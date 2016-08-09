// var sqlite3=require('sqlite3').verbose();
// var db = new sqlite2.Database('scratch');

// db.serialize(function(){
// 	var createUserTblSql="CREATE TABLE User "
// 	}
// );




// var express=require('express');
// var app=express();

// app.get('/',function(req,res){
// 	res.send (signon.html);
// });

// app.use(express.static('.'));

// app.listen(8080, function(){
// 	console.log ("load sign on pg")
// });

var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var filename = 'scratch.db';
var dbexists = false;
try {
    fs.accessSync(filename);
    dbexists = true;
} catch (ex) {
    dbexists = false;
}

var db = new sqlite3.Database('scratch.db');


if (!dbexists) {
    db.serialize(function() {
        var createUserTableSql = "CREATE TABLE IF NOT EXISTS USER " +
                       "(USERID         CHAR(25)    PRIMARY KEY     NOT NULL," +
                       " NAME           CHAR(50)                    NOT NULL, " + 
                       " PASSWORD       CHAR(50)                    NOT NULL)"; 

        var createTweetTableSql = "CREATE TABLE IF NOT EXISTS TWEET " +
                    "(USERID        CHAR(25)    NOT NULL," +
                    " TWEET         CHAR(140)   NOT NULL, " + 
                    " DATE          TEXT        NOT NULL)"; 

        var createFollowerTableSql = "CREATE TABLE IF NOT EXISTS FOLLOWER " +
                    "(USERID        CHAR(25)    NOT NULL," +
                    " FOLLOWERID    CHAR(140)   NOT NULL)"; 

        db.run(createUserTableSql);
        db.run(createTweetTableSql);
        db.run(createFollowerTableSql);

        var insertUserSql = "INSERT INTO USER (USERID, NAME, PASSWORD) " +
            "VALUES ('shuvo',   'Shuvo Ahmed',      'shuvopassword')," +
                   "('abu',     'Abu Moinuddin',    'abupassword')," +
                   "('charles', 'Charles Walsek',   'charlespassword')," +
                   "('beiying', 'Beiying Chen',     'beiyingpassword')," +
                   "('swarup',  'Swarup Khatri',    'swarup');"; 
        
        var insertFollowerSql = "INSERT INTO FOLLOWER (USERID, FOLLOWERID) " +
           "VALUES ('shuvo', 'abu')," +
                  "('abu', 'swarup')," +
                  "('abu', 'charles')," +
                  "('beiying', 'shuvo');";
                

        var insertTweetSql = "INSERT INTO TWEET (USERID, TWEET, DATE) " +
             "VALUES ('shuvo',      'Welcome to Tweeter Clone',                     '2016-08-05 12:45:00'), " +
                    "('abu',        'Tweet by Abu',                                 '2016-08-05 12:46:00'), " +
                    "('abu',        'Lets do Node.js',                              '2016-08-08 12:46:00'), " +
                    "('abu',        'Lunch Time!',                                  '2016-08-08 12:30:00'), " +
                    "('abu',        'We are in 2-nd week of boot camp training!',   '2016-08-08 08:30:00'), " +
                    "('shuvo',      'SQLite is easy configuration!',                '2016-08-05 09:30:00'), " +
                    "('shuvo',      'Rio Olympic!',                                 '2016-08-05 09:30:00'), " +
                    "('shuvo',      'Welcome to 2nd week of boot camp...',          '2016-08-08 08:30:00'), " +
                    "('charles',    'SQLite is cool!',                              '2016-08-05 11:30:00'), " +
                    "('charles',    'Not bad for a Mainframe developer...',         '2016-08-08 09:30:00'), " +
                    "('charles',    'Having fun with HTML / CSS!',                  '2016-08-05 11:30:00'), " +
                    "('charles',    'Github!',                                      '2016-08-05 11:30:00'), " +
                    "('beiying',    'Twitter - Cloned!',                            '2016-08-08 13:30:00'), " +
                    "('swarup',     'Tweet, tweet!',                                '2016-08-05 11:30:00'), " +
                    "('shuvo',      'First week of boot camp complete!',            '2016-08-05 16:47:00');"; 
      
        db.run(insertFollowerSql);
        db.run(insertUserSql);
        db.run(insertTweetSql);

        db.each("SELECT * FROM TWEET", function(err, row) {
            console.log(row.USERID + ": " + row.TWEET);
        });
    });
}

 //-------------------------------------------------------
 // function(err, jsonString) {}
function getFollowersJSON(userId) {

	return new Promise((resolve,reject)=>{
	    var query = "SELECT USERID, FOLLOWERID FROM FOLLOWER "
	         + "  WHERE USERID = '" + userId + "'";
	    var followers = [];
	    db.serialize(function() {
	        db.each(
	            query, 
	            function(err, row) {
	            	if (err){
	            		reject (err);
	            	}else{            	
	                	followers.push(row.FOLLOWERID);
	                }
	            },
	            function (err, nRows) {
	            	if (err){
	            		rejext(err);
	            	}else{
	                	//callBack(err, JSON.stringify(followers));
	                	resolve(JSON.stringify(followers));
	            	}
	           }
	        );
	    });
	});
}


//----------------------------------------------------------------


getFollowersJSON('abu').then(
	(val)=>{
		console.log("FOLLOWERS:"+val);
	},
	(err)=>{

    if (err) {
    	console.log(err)
    }

    //console.log(jsonString);
});


//------------------------------------------------------------------------




//insertTweetSql = "INSERT INTO TWEET (USERID, TWEET, DATE)
function getUserTweetsJSON(userId) {
    	return new Promise((resolve,reject)=>{
	    var query = "SELECT USERID,TWEET, DATE FROM TWEET "
	         + "  WHERE USERID = '" + userId + "'";
	    var userTweets = [];
	    //var data[];
	    db.serialize(function() {
	        db.each(
	            query, 
	            function(err, row) {
	            	if (err){
	            		reject (err);
	            	}else{  
	            		userTweets.push({"userid":  row.USERID,  "msg" :  row.TWEET , "date": row.DATE});
	                	
	                }
	            },
	            function (err, nRows) {
	            	if (err){
	            		rejext(err);
	            	}else{
	                	//callBack(err, JSON.stringify(followers));
	                	resolve(JSON.stringify(userTweets));
	            	}
	           }
	        );
	    });
	});
}
//----------------------------------------------------------------
getUserTweetsJSON('abu').then(
	(val)=>{
		console.log("USER TWEETS =" +val);
	},
	(err)=>{

    if (err) {
    	console.log(err)
    }

    //console.log(jsonString);
});

//--------------------------------------------------------------------------------

function getUserJSON(userId) {
	return new Promise((resolve,reject)=>{
	    var query = "SELECT * FROM USER "
	         + "  WHERE USERID = '" + userId + "'";
	    var user = [];
	    //var data[];
	    db.serialize(function() {
	        db.each(
	            query, 
	            function(err, row) {
	            	if (err){
	            		reject (err);
	            	}else{  
	            		user.push({"userid":  row.USERID,  "name" :  row.NAME});
	                	
	                }
	            },
	            function (err, nRows) {
	            	if (err){
	            		rejext(err);
	            	}else{
	                	//callBack(err, JSON.stringify(followers));
	                	resolve(JSON.stringify(user));
	            	}
	           }
	        );
	    });
	});
    // TODO
}
//--------------------------------------------------------------------------
getUserJSON('abu').then(
	(val)=>{
		console.log("USER="+val);
	},
	(err)=>{

    if (err) {
    	console.log(err)
    }

    //console.log(jsonString);
});
//----------------------------------------------------


// INSERT INTO FOLLOWER (USERID, FOLLOWERID) " +
//            "VALUES ('shuvo', 'abu')," +
//                   "('abu', 'swarup')," +
//                   "('abu', 'charles')," +
//                   "('beiying', 'shuvo');";
                

//         var insertTweetSql = "INSERT INTO TWEET (USERID, TWEET, DATE) " 
//SELECT TWEET.USERID, TWEET,DATE FROM TWEET INNER JOIN FOLLOWER WHERE TWEET.USERID=FOLLOWER.USERID



function getFollowerTweetsJSON(userId) {

	   	return new Promise((resolve,reject)=>{
	    var query = "SELECT FOLLOWERID, TWEET,DATE FROM TWEET INNER JOIN FOLLOWER WHERE TWEET.USERID=FOLLOWER.USERID "
	         + "  AND FOLLOWER.USERID = '" + userId + "'";
	    var Tweets = [];
	    //var data[];
	    db.serialize(function() {
	        db.each(
	            query, 
	            function(err, row) {
	            	if (err){
	            		reject (err);
	            	}else{  
	            		Tweets.push({"follower":  row.FOLLOWERID,  "msg" :  row.TWEET , "date": row.DATE});
	                	
	                }
	            },
	            function (err, nRows) {
	            	if (err){
	            		rejext(err);
	            	}else{
	                	//callBack(err, JSON.stringify(followers));
	                	resolve(JSON.stringify(Tweets));
	            	}
	           }
	        );
	    });
	});
}
//----------------------------------------------------------------
getFollowerTweetsJSON('abu').then(
	(val)=>{
		console.log("FOLLOWER TWEETS =" +val);
	},
	(err)=>{

    if (err) {
    	console.log(err)
    }

    //console.log(jsonString);
});

//     // TODO
// }

db.close();

