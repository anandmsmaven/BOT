'use strict';
let util = require('util');
let http = require('http');
let Bot = require('@kikinteractive/kik');
// Configure the bot API endpoint, details for your bot
let bot = new Bot({
username: 'ananbh',
apiKey: 'e44c35d3-dc25-44f9-993b-f3038537f7c6',
baseUrl: 'https://5e1b9097.ngrok.io'
});
bot.updateBotConfiguration();
bot.onTextMessage((message) => {
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.sqlite');	

db.serialize(function() {
		db.get("SELECT id FROM users WHERE username = '" + message.from + "'", function(err, row) {	
		if (row == undefined) 
        {
			message.reply("Your not authorised to chat with this bot.Contact Anand Rajendran for details");
		}
		else 
        {
			if(message.body == "wru" || message.body == "Wru"|| message.body == "Where are you")
			{
				db.get("SELECT latitude,longitude FROM current_location", function(err, row) {
		
			    //var image =	"https://maps.googleapis.com/maps/api/staticmap?size=512x512&maptype=roadmap\&markers=size:mid%50Ccolor:red%7C"+row['latitude']+","+row['longitude']+"&key=AIzaSyBfJkwgvA3XKkS5Y5dHl4gF6e5GjW56HoA";
	            //console.log(image);
				//message.reply("The current location is" +" "+ (image));	
				var fs = require('fs');
var gm = require('google-static-map').set('AIzaSyBfJkwgvA3XKkS5Y5dHl4gF6e5GjW56HoA');

var stream = gm().address(row['latitude']+', '+row['longitude']).staticMap().done();
stream.pipe(fs.createWriteStream('map.png'));

bot.send(Bot.Message.picture('D:\BOT\map.png')
//http://anandraj.herokuapp.com/images/anand.jpg
    .setAttributionName('Current Location')
    .setAttributionIcon('http://s.imgur.com/images/favicon-96x96.png'),
    message.from);
 
		});
              
			}
			else
			{
            message.reply("puriyale");
			}
				
		}
	});
});
});
// Set up your server and start listening
let server = http
.createServer(bot.incoming())
.listen(process.env.PORT || 8080);