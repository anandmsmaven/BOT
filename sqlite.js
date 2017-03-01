var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.sqlite');
db.serialize(function() {
 //db.run("Drop TABLE user");
 //db.run("CREATE TABLE current_location (id INT, latitude double,longitude double, time datetime)");
 //db.run("INSERT INTO current_location VALUES (1,12.951426666667, 77.596878333333, '2007-01-01 10:00:00')");
 db.run("UPDATE users SET username='jf' WHERE id=2");
  
 // db.run("INSERT INTO users VALUES (2,'bhavanichat')");
  });

db.close();