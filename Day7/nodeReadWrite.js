var fs = require('fs');
var textFileData=""

fs.readFile("someText.txt", (err,data)=> {
	if (err){
			throw err;
	}
	
	var textFileData=""
	var counter=0

	 do{
	 	textFileData=data.toString();
	 	counter++;

	 }while (textFileData==="" || counter===2000)

	//console.log(counter);

	// if (textFileData!==""){
	// 	 fs.writeFile("newFile.txt", textFileData, (err)=>{
	// 		if (err) {
	// 	 		throw err;
	// 	 	}
	// 	 	console.log ("written");
	// 	 });
	// }else{
	// 	console.log ("File not read or written");
	// }
});


function fileWritePromise(path,data){
	return new Promise(function(resolve,reject){
		fs.writeFile(path,(err,data)=>{
			if (err){
				reject (err);
			}else {
				resolve(data);
			}
		});
	});
}

var wp=fileWritePromise("newFile2.txt",textFileData).then(
		(val)=>{
			console.log("newFile2 written");
		},
		(err)=>{
			console.log("could not write newFile2 file");
		}
	);



var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
 
db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT)");
 
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();
 
  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});
 
db.close();
