var http = require("http");
var fs = require("fs");
var url = require('url'); // Added by 2017-7-11
var qs = require("querystring");
var mongodb = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
require("events").EventEmitter.prototype._maxListeners = 100;

var mongodbServer = new mongodb.Server("localhost", 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db("dataB", mongodbServer);
var usersssssss="";
var isTriedLogin = false, isLoginSuccessful = false; var canRegis = true;
var favouritess="";
var bookingg="";
var isTriedGet = false, isGetSuccessful = false;



// Server Start
var server = http.createServer(function(request, response) {
    if (request.method == "POST") {

			console.log("post call");
		// Switch msg into a JSON object
        var formData = "", msg = "", obj = "";
        return request.on("data", function(data) {
			formData += data;
					
					
			}).on('end', function(chunk) {
					var user;
				user = qs.parse(formData);
				msg = JSON.stringify(user);
				console.log("305cde="+msg);
					
					obj = JSON.parse(msg);
				  console.log("aa="+obj['act']);	
					///////////////////////////////////////////////////////////////

					
					
					
			//	if (request.url == "/login.html") {
					//	 console.log("login page comes");
						

						
						
						
	   if(obj['act']=="signup"){
				//if (obj.signup != null) {

					console.log("SIGNUP");
					// Send obj data to dataB
			 
					db.open(function() {
						
						db.collection("user", function(err, collection) {
							
							collection.insert({

								username: obj.ac,
								password: obj.pw
							}, function(err, data) {
								
								if (data) {
									console.log("Successfully Insert");
									 //response.end(200, {'success': "apple"});
									 response.end('{"success" : "Updated Successfully", "status" : 200}');
								} else {
									console.log("Failed to Insert");
								}
							});
							db.close();
						});
					});

	}else if(obj['act']=="add_favourite"){
				//if (obj.signup != null) {

					console.log("ADD FAVOURITE");
					// Send obj data to dataB
			 
					db.open(function() {
						
						db.collection("favlist0", function(err, collection) {
							
							collection.insert({

								favouritename: obj.url,
								
								username: obj.username,
							
							}, function(err, data) {
								
								if (data) {
									
									console.log(err);
									console.log("Successfully Insert");
									 //response.end(200, {'success': "apple"});
									 //response.end('{"success" : "Updated Successfully", "status" : 200}');
				

			// Court Method Close						
									
								} else {
									console.log("Failed to Insert");
								}
							});
										// Court Method Start
				db.collection('favlist0').count(function (err, count) {
          if (err) throw err;
            
           console.log('Total Rows: ' + count);
        });
							db.close();
						});
					});
		
		
	}else if(obj['act']=="get_favourite"){
		
		
		console.log("getgetget");
		db.open(function() {
		db.collection("favlist0", function (err, collection) {
							collection.find().toArray(function(err, items) {
								if(err) throw err;
								// Check whether there is data in the dataB
								console.log(items.length);
								
								//change database array data to json format
								//var tempo = JSON.parse(items);

								//change json object to string
								var jsonResult = JSON.stringify(items);
								
								//console.log(jsonResult);
								response.writeHead(200, {
				 					 "Content-Type": "application/json; charset=utf-8",
								  "Content-Length": Buffer.byteLength(jsonResult)
									});
								response.end(jsonResult);
								
								
								if (items != "") {
									// Check whether the user account exists
									for (var i=0; i<items.length; i++) {
										
									//	if (username == items[i].ac && password == items[i].pw) {
										console.log("favlist0="+items[i].favouritename);
									//	console.log("pass="+items[i].password);
										console.log("favlist01="+obj.url);
									//	console.log("pass1="+obj.pw);
										if (items[i].favouritename ==obj.url)  {
											favouritess= items[i].favouritename;
										
											console.log("favlist0="+items[i].username);
										//console.log("pass="+items[i].password);
											console.log("USER FOUND CONFIGURATION");
												//response.end('{"success" : "Updated Successfully", "status" : 200}');
											isGetSuccessful = true;

										}else{
												//response.end('{"success" : "Updated Successfully", "status" : 200}');
										}
										
										
									}
								}
							});
			db.close();
		});
});
	}else if(obj['act']=="remove_favourite"){
	//	var db = new mongodb.Db("dataB", mongodbServer);
		
		console.log("removeyeah");
		db.open(function() {
db.collection("favlist0", function (err, collection) {
			
			var myquery = {favouritename: obj.url , username: obj.username};
  db.collection("favlist0").deleteOne(myquery, function(err, removeobj) {
    if (err) throw err;
    console.log("1 document deleted");
		
											// Court Method Start
				db.collection('favlist0').count(function (err, count) {
          if (err) throw err;
            
           console.log('Total Rows: ' + count);
        });
		
    db.close();
  });
});		
			//	collection.update({ favouriteame: ''},{$set: {'favouritename':''}},{multi:true}, {w:1},
      //      function(err, result){
      //      if(err) throw err;    
      //      console.log('Document Updated Successfully');
      //      });

       // collection.remove({id:2}, {w:1}, function(err, result) {
        
       //     if(err) throw err;    
        
       //     console.log('Document Removed Successfully');
       // });
			
	
});
	}else if(obj['act']=="add_evaluation"){
				//if (obj.signup != null) {

					console.log("ADD EVALUATION");
					// Send obj data to dataB
			 
					db.open(function() {
						
						db.collection("evalist0", function(err, collection) {
							
							collection.insert({

								evaluationresult: obj.score,
								
								username: obj.username,
							
							}, function(err, data) {
								
								if (data) {
									
									console.log(err);
									console.log("Successfully Insert");
									 //response.end(200, {'success': "apple"});
									 //response.end('{"success" : "Updated Successfully", "status" : 200}');
				

			// Court Method Close						
									
								} else {
									console.log("Failed to Insert");
								}
							});
										// Court Method Start
				db.collection('evalist0').count(function (err, count) {
          if (err) throw err;
            
           console.log('Total Rows: ' + count);
        });
							db.close();
						});
					});
		
		
	}else if(obj['act']=="add_booking"){
				//if (obj.signup != null) {

					console.log("ADD BOOKING");
					// Send obj data to dataB
			 
					db.open(function() {
						
						db.collection("booklist0", function(err, collection) {
							
							collection.insert({

								bookingstart: obj.bookstart,
								bookingend: obj.bookend,
								
								username: obj.username,
							
							}, function(err, data) {
								
								if (data) {
									
									console.log(err);
									console.log("Successfully Insert");
									 //response.end(200, {'success': "apple"});
									 //response.end('{"success" : "Updated Successfully", "status" : 200}');
				

			// Court Method Close						
									
								} else {
									console.log("Failed to Insert");
								}
							});
										// Court Method Start
				db.collection('booklist0').count(function (err, count) {
          if (err) throw err;
            
           console.log('Total Rows: ' + count);
        });
							db.close();
						});
					});
		
		
	}else if(obj['act']=="get_booking"){
		
		
		console.log("getbookinfo");
		db.open(function() {
		db.collection("booklist0", function (err, collection) {
							collection.find().toArray(function(err, items) {
								if(err) throw err;
								// Check whether there is data in the dataB
								console.log(items.length);
								
								//change database array data to json format
								//var tempo = JSON.parse(items);

								//change json object to string
								var jsonResult = JSON.stringify(items);
								
								//console.log(jsonResult);
								response.writeHead(200, {
				 					 "Content-Type": "application/json; charset=utf-8",
								  "Content-Length": Buffer.byteLength(jsonResult)
									});
								response.end(jsonResult);
								
								
								if (items != "") {
									// Check whether the user account exists
									for (var i=0; i<items.length; i++) {
										
									//	if (username == items[i].ac && password == items[i].pw) {
										console.log("booklist0="+items[i].bookingstart);
										//console.log("hi");
										//console.log("booklist0 end time="+items[i].bookingend); //new
										//console.log("booklist0="+items[i].username); //new
										//console.log("booklist0 user="+items[i].username);
									//	console.log("pass="+items[i].password);
									// 	console.log("booklist01="+obj.bookstart); //7-29
									//	console.log("pass1="+obj.pw);
								/*		if (items[i].bookingstart ==obj.bookstart)  {
											bookingg= items[i].bookingstart;
										
											console.log("booklist0="+items[i].username);
										//console.log("pass="+items[i].password);
											console.log("USER FOUND CONFIGURATION");
												//response.end('{"success" : "Updated Successfully", "status" : 200}');
											isGetSuccessful = true;

										}else{
												//response.end('{"success" : "Updated Successfully", "status" : 200}');
										}
									*/	
										
									}
								}
							});
			db.close();
		});
});
	}else if(obj['act']=="login"){
				//if (obj.signup != null) {
//	response.end('{"success" : "Updated Successfully", "status" : 200}');
					console.log("LOGIN");
					// Send obj data to dataB
				//	db.open(function() {
						
				//		db.collection("user", function(err, collection) {
							
							//collection.find({

						//		username: obj.ac,
					//			password: obj.pw
					//		}, function(err, data) {
								
							//	if (data) {
									console.log("Successfullyfound");
	
		
		
		
									
									var username = obj.ac;
					        var password = obj.pw;
									
		console.log("input login="+obj.ac);
		console.log("input pass="+obj.pw);
									
		//MongoClient.connect("mongodb://localhost:27017/dataB", function (err, db) {
		db.open(function(){
						db.collection("user", function (err, collection) {
							collection.find().toArray(function(err, items) {
								if(err) throw err;
								// Check whether there is data in the dataB
								console.log(items.length);
								if (items != "") {
									// Check whether the user account exists
									for (var i=0; i<items.length; i++) {
										
									//	if (username == items[i].ac && password == items[i].pw) {
										console.log("user="+items[i].username);
										console.log("pass="+items[i].password);
										console.log("user1="+obj.ac);
										console.log("pass1="+obj.pw);
										if (items[i].username ==obj.ac && items[i].password == obj.pw) {
											usersssssss= items[i].username;
										
											console.log("user="+items[i].username);
										console.log("pass="+items[i].password);
											console.log("USER FOUND CONFIGURATION");
												//response.end('{"success" : "Updated Successfully", "status" : 200}');
											isLoginSuccessful = true;
										}else{
												//response.end('{"success" : "Updated Successfully", "status" : 200}');
										}
										
										
									}
									
								
								/*	  fs.readFile('./json.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
											console.log("end here");
                });*/
									
									if(isLoginSuccessful == false){
										  console.log("Fail to login");
											response.end('LOGIN FAIL');
									}else{
										 console.log("LOGIN OK");
											response.end(obj.ac);
									}
								}
							});
							db.close();
						});	
				});
							//	} else {
								//	console.log("Failed to Insert");
							//	}
						//	});
						//});
				//	});

	}
					//}//if request.url = login.html
        
  })	
    }else if(request.url == "/search2"){
			fs.readFile('./search.html', function(error, content) {
				console.log("search page");
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
			});
		}
	else {
			
		// Get
		fs.readFile("./" + request.url, function (err, data) {
			var dotoffset = request.url.lastIndexOf(".");
			var mimetype = dotoffset == -1
				? "text/plain"
				: {
					".html": "text/html",
					".ico" : "photo/x-icon",
					".jpg" : "photo/jpeg",
					".png" : "photo/png",
					".gif" : "photo/gif",
					".css" : "text/css",
					".js"  : "text/javascript"
				}[request.url.substr(dotoffset)];
			if (!err) {
				response.setHeader("Content-Type", mimetype);
				response.end(data);
				console.log(request.url, mimetype);
			} else {
				response.writeHead(302, {"Location": "./index.html"});
				response.end();
			}
		});
    }
});

server.listen(5001);

console.log("Server running at http://127.0.0.1:5001/");

