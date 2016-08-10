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
var app=express();
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var userid;
var db;

var filename = 'scratch.db';
var dbexists = false;
try {
    fs.accessSync(filename);
    dbexists = true;
} catch (ex) {
    dbexists = false;
}



if (!dbexists) {
	var db = new sqlite3.Database('scratch.db');

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

        // db.each("SELECT * FROM TWEET", function(err, row) {
        //     console.log(row.USERID + ": " + row.TWEET);
        // });
        db.close()
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
	            		reject(err);
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


// getFollowersJSON(userid).then(
// 	(val)=>{
// 		console.log("FOLLOWERS:"+val);
// 	},
// 	(err)=>{

//     if (err) {
//     	console.log(err)
//     }

//     //console.log(jsonString);
// });


//------------------------------------------------------------------------




//insertTweetSql = "INSERT INTO TWEET (USERID, TWEET, DATE)
function getUserTweetsJSON(userId) {
    	return new Promise((resolve,reject)=>{
	    var query = "SELECT USERID,TWEET, DATE FROM TWEET "
	         + "  WHERE USERID = '" + userId + "' ORDER BY DATE";
	    var userTweets = [];
	   
	    //var data[];
	    db.serialize(function() {
	    	
	        db.each(
	            query, 
	            function(err, row) {
	            	if (err){
	            		reject (err);
	            		console.log ("json error");
	            	}else{  
	            		userTweets.push({"userid":  row.USERID,  "msg" :  row.TWEET , "date": row.DATE});
	            	
	                	
	                }
	            },
	            function (err, nRows) {
	            	if (err){
	            		reject(err);
	            		console.log (err);
	            		console.log ("reject error");

	            	}else{
	                	//callBack(err, JSON.stringify(followers));
	                	resolve(JSON.stringify(userTweets));
	                	console.log ("make json string");
	            	}
	           }
	        );
	    });
	});
}
//----------------------------------------------------------------
// getUserTweetsJSON(userid).then(
// 	(val)=>{
// 		console.log("USER TWEETS =" + val);
// 	},
// 	(err)=>{

//     if (err) {
//     	console.log(err)
//     }

//     //console.log(jsonString);
// });

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
	            		reject(err);
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
// getUserJSON(userid).then(
// 	(val)=>{
// 		console.log("USER="+val);
// 	},
// 	(err)=>{

//     if (err) {
//     	console.log(err)
//     }

//     //console.log(jsonString);
// });
//----------------------------------------------------



function getFollowerTweetsJSON(userId) {

	   	return new Promise((resolve,reject)=>{
	    var query = "SELECT FOLLOWERID, TWEET,DATE FROM TWEET INNER JOIN FOLLOWER WHERE TWEET.USERID=FOLLOWER.USERID "
	         + "  AND FOLLOWER.USERID = '" + userId + "' ORDER BY DATE";
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
	            		reject(err);
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
// getFollowerTweetsJSON(userid).then(
// 	(val)=>{
// 		console.log("FOLLOWER TWEETS =" +val);
// 	},
// 	(err)=>{

//     if (err) {
//     	console.log(err)
//     }

//     //console.log(jsonString);
// });

//     // TODO
// }

//


//---------------------------------------------------------------------



app.get('/tweets/:id',function(req,res){
	db = new sqlite3.Database('scratch.db');

	var userid=req.params.id;//('id');//String(req.params);//("id");)
	// userid=userid.substring (1,userid.length);
	// userid=userid.substring(userid.indexOf(":")).trim;

	getUserTweetsJSON(userid).then ((val)=> {
		console.log (val);
		res.send (val);
		db.close();
	}).catch((err)=>{
		res.send("");
		console.log ("Unable to get user tweets");
		db.close();
	});

    


 	//res.send ('personal(.html');
 });
//---------------------------------------------------------
app.get('/followedtweets/:id',function(req,res){
	db = new sqlite3.Database('scratch.db');

	var userid=req.params.id;//('id');//String(req.params);//("id");)
	// userid=userid.substring (1,userid.length);
	// userid=userid.substring(userid.indexOf(":")).trim;

	getFollowerTweetsJSON(userid).then ((val)=> {
		console.log (val);
		res.send (val);
		db.close();
	}).catch((err)=>{
		res.send("");
		console.log ("Unable to get follower tweets");
		db.close();
	});

    


 	//res.send ('personal(.html');
 });

//-------------------------------------------
app.get('/user/:id',function(req,res){
	console.log("in user");
	db = new sqlite3.Database('scratch.db');
	console.log ("db open");
	var userid=req.params.id;//('id');//String(req.params);//("id");)
	// userid=userid.substring (1,userid.length);
	// userid=userid.substring(userid.indexOf(":")).trim;

	getUserJSON(userid).then ((val)=> {
		console.log (val);
		res.send (val);
		console.log ("close db");
		db.close();
	}).catch((err)=>{
		res.send("");
		console.log ("Unable to get user json");
		db.close();
	});

    


 	res.send ('personal(.html');
 });
//------------------------------------

 app.use(express.static('Public'));

 app.listen(8080, function(){
 	console.log ("load user tweet pg");
 });

 //db.close();