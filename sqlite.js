var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.sqlite');
db.serialize(function() {
 //db.run("Drop TABLE current_location");
 //db.run("CREATE TABLE current_location (id INT, latitude double,longitude double, time datetime)");
 //db.run("INSERT INTO current_location VALUES (2,12.950806,77.597738, '2007-01-01 10:00:00')");
// db.run("DELETE from users WHERE id=2");

  //db.run("INSERT INTO users VALUES (8,'harsha5692')");
  });

db.close();
