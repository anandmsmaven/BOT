'use strict';
let util = require('util');
let http = require('http');
let Bot = require('@kikinteractive/kik');
// Configure the bot API endpoint, details for your bot
let bot = new Bot({
username: 'ananbh',
apiKey: 'e44c35d3-dc25-44f9-993b-f3038537f7c6',
//baseUrl: 'https://245b5b5a.ngrok.io'
baseUrl: 'https://ananbh.herokuapp.com/'
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
			    var image =	"https://maps.googleapis.com/maps/api/staticmap?size=512x512&maptype=roadmap\&markers=size:mid%50Ccolor:red%7C"+row['latitude']+","+row['longitude']+"&key=AIzaSyBfJkwgvA3XKkS5Y5dHl4gF6e5GjW56HoA";
				message.reply("The current location is" +" "+ (image));	
		        });
			}
			else if(message.body == "Send anand image" || message.body == "Send Anand image")
			{
                var fs = require('fs');
                var gm = require('google-static-map').set('AIzaSyBfJkwgvA3XKkS5Y5dHl4gF6e5GjW56HoA');
                var stream = gm().address(row['latitude']+', '+row['longitude']).staticMap().done();
                stream.pipe(fs.createWriteStream('map.png'));

				bot.send(Bot.Message.picture('https://ananbh.herokuapp.com/map.png')
					.setAttributionName('Current Location')
					.setAttributionIcon('http://s.imgur.com/images/favicon-96x96.png'),
					message.from);
			}
			else if(message.body == "Do you know anand" || message.body == "Do u know anand" || message.body == "Do u know Anand")
			{
                message.reply("Are you joking? He's sooooooo famous. I know him and he is the creator of this bot");
			}
			else if(message.body == "Do you know bhavani" || message.body == "Do u know bhavani" || message.body == "Do u know Bhavani")
			{
                message.reply("I know her!!");
			}
			else if(message.body == "Bhavani Here" || message.body == "bhavani here" || message.body == "Bhavani here"|| message.body=="bhavani Here")
			{
                message.reply("hi bhavai");
			}
			else
			{
                message.reply("Sorry! I am not able to guess what your looking for.");
			}
				
		}
	});
});
});
// Set up your server and start listening
let server = http
.createServer(bot.incoming())
.listen(process.env.PORT || 8080);
