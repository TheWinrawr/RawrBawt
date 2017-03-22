const 
	rp = require("request-promise"),
	fs = require("fs"),
	utils = require("../../scripts/utils.js")
;

function request(uri) {
	return rp({uri: uri, json: true});
}

let commands = {
	"gw2": {
		usage: "",
		description: "run a gw2 command",
		run: (message, args) => {
			if (args.length === 1) {
				//Print help here and return
			}

			let command = gw2Commands[args[1]];
			if(!command) {
				return utils.sendMessage(message, "Sorry, I don't know that command!");
			} else {
				try {
					return command.run(message, args.slice(1));
				} catch(e) {
					console.log(e);
					return utils.sendMessage(message, "Sorry, command failed!");
				}
			}
		}
	}
};

let gw2Commands = {
	"help": {
		usage: "",
		description: "Get a list of gw2 commands with descriptions.",
		run: (message, args) => {
			utils.printHelp(message, gw2Commands, "gw2");
		}
	},

	"gems2gold": {
		usage: "<num_gems>",
		description: "Convert gems to gold.",
		run: (message, args) => {
			let numGems = args[0];

			request("https://api.guildwars2.com/v2/commerce/exchange/gems?quantity=" + numGems)
				.then(res => {
					return utils.sendMessage(message, numGems + " gems => " + res.quantity);
				}).catch(err => {
					return utils.sendMessage(message, "oh nooooes");
				});
		}
	},

	"gold2gems": {
		usage: "<num_gold>",
		description: "Convert gold to gems.",
		run: (message, args) => {
			let numGold = args[0] * 10000;

			request("https://api.guildwars2.com/v2/commerce/exchange/coins?quantity=" + numGold)
				.then(res => {
					return utils.sendMessage(message, numGold + " gems => " + res.quantity);
				}).catch(err => {
					return utils.sendMessage(message, "oh nooooes");
				});
		}
	},

	"kdr": {
		usage: "[server_name]",
		description: "Where the real important info is at.",
		run: (message, args) => {
			let worldName = args.length > 0 ? args : "maguuma";

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
		run: (message, args) => {
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

module.exports = function (addCommands) {
	addCommands(commands);
};