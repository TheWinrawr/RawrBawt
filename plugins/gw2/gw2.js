var GW2 = require("./GW2.class.js");
var fs = require("fs");
var worlds = [];
var items = [];

var error = function(Tools, message, command) {
	return function(status, text, data, event) {
		console.log(status,text,data,event);
		if(Tools) Tools.sendMessage(message, "Sorry, command " + command + " failed! Error: " + text);
	};
};

var updateWorlds = function() {

	//Function for returning a promise that gets all of the world IDs
	var getWorldIds = new Promise(
		function(resolve, reject) {
			GW2().getWorlds(function(data,event) {
				resolve(data);
			},function(status,text,data,event) {
				console.log(status,text,data,event);
				console.log("oh noes");
				reject(data);
			}); // object
		}
	);

	//Function for writing the object that stores all of the world info into a json file
	var writeWorlds = function(worldIds) {
		GW2(worldIds).getWorldsByID(worldIds,"en",function(data,event) {
			worlds = JSON.parse(JSON.stringify(data));
			console.log(worlds);
			fs.writeFile(__dirname + "/worlds.json", JSON.stringify(data), function(err) {
				if(err) return console.log(err);
			})
		},function(status,text,data,event) {
			console.log(status,text,data,event);
		}); // object
	}

	//Read the worlds.json file. If it doesn't exist, write one.
	fs.readFile(__dirname + "/worlds.json", "utf8", function (err, data) {
	    if (err) { //write file if it's not found
	    	getWorldIds.then(writeWorlds);
	    }
	    else worlds = JSON.parse(data)
	});
}

var updateItems = function() {

	//Function for returning a promise that gets all of the world IDs
	var getItemIds = new Promise(
		function(resolve, reject) {
			GW2().getItems(function(data,event) {
				resolve(data);
			},function(status,text,data,event) {
				console.log(status,text,data,event);
				reject(data);
			}); // object
		}
	);

	//Function for writing the object that stores all of the world info into a json file
	var writeItems = function(itemIds) {
		console.log(itemIds.length)
		return;
		itemIds = itemIds.slice(0, 200);
		GW2(itemIds).getItemsByID(itemIds,"en",function(data,event) {
			items = JSON.parse(JSON.stringify(data));
			fs.writeFile(__dirname + "/items.json", JSON.stringify(data), function(err) {
				if(err) return console.log(err);
			})
		},function(status,text,data,event) {
			console.log(status,text,data,event);
		}); // object
	}

	//Read the worlds.json file. If it doesn't exist, write one.
	fs.readFile(__dirname + "/items.json", "utf8", function (err, data) {
	    if (err) { //write file if it's not found
	    	getItemIds.then(writeItems);
	    }
	    else items = JSON.parse(data)
	});
}

//updateItems();
updateWorlds();

exports.commands = {
	"gw2": {
		usage: "[command]",
		description: "Use this command for gw2 related functions. Type in \"!help gw2\" or \"!gw2\" for more info.",
		process: function(Tools, bot, message, args) {
			if (args.length == 0) {
				Tools.printHelp(message, gw2Commands, "gw2");
			} else {
				Tools.runCommand(bot, message, gw2Commands, args);
			}
		}
	}
}

var gw2Commands = {
	"help": {
		usage: "",
		description: "Get a list of gw2 commands with descriptions.",
		process: function(Tools, bot, message, args) {
			Tools.printHelp(message, gw2Commands, "gw2");
		}
	},

	"gems2gold": {
		usage: "<num_gems>",
		description: "Convert gems to gold.",
		process: function(Tools, bot, message, args) {
			var numGems = parseInt(args[0]);
			if(isNaN(numGems)) {
				Tools.sendMessage(message, "Please input an integer!");
				return;
			}

			var success = function(data, event) {
				var coins = GW2().toCoins(data.quantity); //convert from int to g,s,c
				Tools.sendMessage(message, numGems + " gems => " + coins.gold + "g " + coins.silver + "s " + coins.copper + "c");
			}

			GW2(Tools, message, numGems).getExchange("gems", numGems, success, error(Tools, message, "gems2gold"));
		}
	},

	"gold2gems": {
		usage: "<num_gold>",
		description: "Convert gold to gems.",
		process: function(Tools, bot, message, args) {
			var numGold = parseInt(args[0]);
			if(isNaN(numGold)) {
				Tools.sendMessage(message, "Please input an integer!");
				return;
			}
			//One gold is 10,000 copper
			var numCoins = numGold * 10000;

			var success = function(data, event) {
				Tools.sendMessage(message, numGold + " gold => " + data.quantity + " gems");
			}

			GW2(Tools, message, numGold).getExchange("coins", numCoins, success, error(Tools, message, "gold2gems"));

		}
	},

	"kdr": {
		usage: "[server_name]",
		description: "Where the real important info is at.",
		process: function(Tools, bot, message, args) {
			var worldName = args.length > 0 ? args : "maguuma"
			console.log(worldName);

			var world = Tools.searchFor(worlds, worldName, "name")[0];
			if(!world) {
				Tools.sendMessage(message, "Sorry, I didn't find anything!");
				return;
			}

			var success = function(data, event) {
				var redWorld = worlds[data.worlds.red].name;
				var blueWorld = worlds[data.worlds.blue].name;
				var greenWorld = worlds[data.worlds.green].name;

				var redBL = data.maps.filter(function(map) {return map.type === "RedHome"})[0];
				var blueBL = data.maps.filter(function(map) {return map.type === "BlueHome"})[0];
				var greenBL = data.maps.filter(function(map) {return map.type === "GreenHome"})[0];
				var ebg = data.maps.filter(function(map) {return map.type === "Center"})[0];

				var result = "Diff\nOVERALL\n"; //Round to two digits
				result += redWorld + ": " + (Math.round(data.kills.red / data.deaths.red * 100)/100) + "\n";
				result += blueWorld + ": " + (Math.round(data.kills.blue / data.deaths.blue * 100)/100) + "\n";
				result += greenWorld + ": " + (Math.round(data.kills.green / data.deaths.green * 100)/100) + "\n";

				result += "\nETERNAL BATTLEGROUNDS\n";
				result += redWorld + ": " + (Math.round(ebg.kills.red / ebg.deaths.red * 100)/100) + "\n";
				result += blueWorld + ": " + (Math.round(ebg.kills.blue / ebg.deaths.blue * 100)/100) + "\n";
				result += greenWorld + ": " + (Math.round(ebg.kills.green / ebg.deaths.green * 100)/100) + "\n";

				result += "\n--  " + redWorld.toUpperCase() + " BORDERLANDS  --\n";
				result += redWorld + ": " + (Math.round(redBL.kills.red / redBL.deaths.red * 100)/100) + "\n";
				result += blueWorld + ": " + (Math.round(redBL.kills.blue / redBL.deaths.blue * 100)/100) + "\n";
				result += greenWorld + ": " + (Math.round(redBL.kills.green / redBL.deaths.green * 100)/100) + "\n";

				result += "\n*** " + blueWorld.toUpperCase() + " BORDERLANDS ***\n";
				result += redWorld + ": " + (Math.round(blueBL.kills.red / blueBL.deaths.red * 100)/100) + "\n";
				result += blueWorld + ": " + (Math.round(blueBL.kills.blue / blueBL.deaths.blue * 100)/100) + "\n";
				result += greenWorld + ": " + (Math.round(blueBL.kills.green / blueBL.deaths.green * 100)/100) + "\n";

				result += "\n++  " + greenWorld.toUpperCase() + " BORDERLANDS  ++\n";
				result += redWorld + ": " + (Math.round(greenBL.kills.red / greenBL.deaths.red * 100)/100) + "\n";
				result += blueWorld + ": " + (Math.round(greenBL.kills.blue / greenBL.deaths.blue * 100)/100) + "\n";
				result += greenWorld + ": " + (Math.round(greenBL.kills.green / greenBL.deaths.green * 100)/100) + "\n";

				Tools.sendMessage(message, result);
				
			}

			GW2(Tools, message, worlds).getWvWMatch(world.id, success, error(Tools, message, "kdr"));

		}
	},

	"score": {
		usage: "[server_name]",
		description: "Get score info of the match the specified world is in. Server name can be abbreviated (e.g. \"t co\" = \"tarnished coast\".",
		process: function(Tools, bot, message, args) {
			var worldName = args.join(" ") || "maguuma"

			var world = Tools.searchFor(worlds, worldName, "name")[0];
			if(!world) {
				Tools.sendMessage(message, "Sorry, I didn't find anything!");
				return;
			}

			var success = function(data, event) {
				var redWorld = worlds[data.worlds.red].name;
				var blueWorld = worlds[data.worlds.blue].name;
				var greenWorld = worlds[data.worlds.green].name;

				var redBL = data.maps.filter(function(map) {return map.type === "RedHome"})[0];
				var blueBL = data.maps.filter(function(map) {return map.type === "BlueHome"})[0];
				var greenBL = data.maps.filter(function(map) {return map.type === "GreenHome"})[0];
				var ebg = data.maps.filter(function(map) {return map.type === "Center"})[0];

				var result = "Diff\nOVERALL\n"; //Round to two digits
				result += redWorld + ": " + data.scores.red + "\n";
				result += blueWorld + ": " + data.scores.blue + "\n";
				result += greenWorld + ": " + data.scores.green + "\n";

				result += "\nETERNAL BATTLEGROUNDS\n";
				result += redWorld + ": " + ebg.scores.red + "\n";
				result += blueWorld + ": " + ebg.scores.blue + "\n";
				result += greenWorld + ": " + ebg.scores.green + "\n";

				result += "\n--  " + redWorld.toUpperCase() + " BORDERLANDS  --\n";
				result += redWorld + ": " + redBL.scores.red + "\n";
				result += blueWorld + ": " + redBL.scores.blue + "\n";
				result += greenWorld + ": " + redBL.scores.green + "\n";

				result += "\n*** " + blueWorld.toUpperCase() + " BORDERLANDS ***\n";
				result += redWorld + ": " + blueBL.scores.red + "\n";
				result += blueWorld + ": " + blueBL.scores.blue + "\n";
				result += greenWorld + ": " + blueBL.scores.green + "\n";

				result += "\n++  " + greenWorld.toUpperCase() + " BORDERLANDS  ++\n";
				result += redWorld + ": " + greenBL.scores.red + "\n";
				result += blueWorld + ": " + greenBL.scores.blue + "\n";
				result += greenWorld + ": " + greenBL.scores.green + "\n";

				Tools.sendMessage(message, result);
				
			}

			GW2(Tools, message, worlds).getWvWMatch(world.id, success, error(Tools, message, "score"));

		}
	}
}