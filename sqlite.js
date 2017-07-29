 /**
     * Purpose: 1. Sqlite database configuration
     *          2. Inserting sample data into the users table
     *
     */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.sqlite');
db.serialize(function() {

   /**
     *   Inserting sample data into users and current_location tables
     */
       //db.run("INSERT INTO current_location VALUES (2,12.950806,77.597738, '2007-01-01 10:00:00')");
       //db.run("INSERT INTO users VALUES (8,'harsha5692')");
  });

db.close();
