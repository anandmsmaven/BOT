'use strict';
let util = require('util');
var express = require("express"),
app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static(__dirname + '/www'));
let Bot = require('@kikinteractive/kik');
// Configure the bot API endpoint, details for your bot
var socket_io = null;
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
				var oOut = {
					from: message.username,
					message: message.body
				};
				if (socket_io != null) {

					socket_io.emit("receive message", oOut)
					// when the client emits 'receive message', this listens and executes
					socket_io.on('receive message', function (data) {

						bot.send(Bot.Message.picture("https://maps.googleapis.com/maps/api/staticmap?size=512x512&maptype=roadmap\&markers=size:mid%50Ccolor:red%7C"+data.latitude+","+data.longitude+"&key=AIzaSyBfJkwgvA3XKkS5Y5dHl4gF6e5GjW56HoA")
							.setAttributionName('Current Location')
							.setAttributionIcon('http://s.imgur.com/images/favicon-96x96.png'),
							message.from);


					});
				} else {
					message.reply("no connection to zombie overlords")
				}
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
app.use(express.static('www'));
io.on('connection', function (socket) {
		socket_io = socket;
});

var port = process.env.PORT || parseInt(process.argv.pop()) || 8080;
server.listen(port, function(){
    console.log("Server listening at port %d", port);
});
