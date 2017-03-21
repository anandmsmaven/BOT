'use strict';
let util = require('util');
var express = require("express"),
app = express();
app.use(express.static(__dirname + '/www'));
let Bot = require('@kikinteractive/kik');
// Configure the bot API endpoint, details for your bot
let bot = new Bot({
username: 'ananbh',
apiKey: 'e44c35d3-dc25-44f9-993b-f3038537f7c6',
//baseUrl: 'https://ce4d9b3c.ngrok.io/message'
baseUrl: 'https://ananbh.herokuapp.com/message'
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
			if(message.body == 'send url')
			{
				db.get("SELECT latitude,longitude FROM current_location", function(err, row) {
			    var image =	"https://maps.googleapis.com/maps/api/staticmap?size=512x512&maptype=roadmap\&markers=size:mid%50Ccolor:red%7C"+row['latitude']+","+row['longitude']+"&key=AIzaSyBfJkwgvA3XKkS5Y5dHl4gF6e5GjW56HoA";
				message.reply("The current location is" +" "+ (image));	
		        });
			}
			else if(message.body == "wru" || message.body == "Wru"|| message.body == "Where are you")
			{
                var fs = require('fs');
                var gm = require('google-static-map').set('AIzaSyBfJkwgvA3XKkS5Y5dHl4gF6e5GjW56HoA');
                var stream = gm().address(row['latitude']+', '+row['longitude']).staticMap().done();
                stream.pipe(fs.createWriteStream(__dirname+'/www/image/map.png'));

				bot.send(Bot.Message.picture('http://ananbh.herokuapp.com/image/map.png')
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
app.get('/', function(req, res){
	res.send('Hello. This is a demo Kik chatbot. Visit @hello.bot in Kik.');
});


/**
 * @param message {query param}
 */
app.get('/message', function(req, res){
	console.log(req.query);
	processTextMessage(req.query.message, function(err, response){
		res.send(response);
	});
});

app.use(bot.incoming());

app.listen(process.env.PORT || 8080, function(){
	console.log('Server started on port ' + (process.env.PORT || 8080));
});
