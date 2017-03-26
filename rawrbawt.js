
/*global __dirname*/
const 
	Discord = require("discord.js"),
	path = require("path"),
	utils = require("./scripts/utils.js"),
	config = require("config");

const bot = new Discord.Client();
const token = config.get("discord.token");

let commands = {
	"help": {
		usage: "",
		description: "Get a list of commands with descriptions",
		run: (message, args) => {
			return utils.printHelp(message, commands);
		}
	}
};

global.rootDir = path.resolve(__dirname);

function addCommands(newCommands) {
	for (let newCommand in newCommands) {
		if (commands[newCommand]) {
			throw new Error("Command " + newCommand + " already exists!");
		}
		commands[newCommand] = newCommands[newCommand];
	}
}

bot.on("ready", () => {
	console.log("Initializing plugins...");
	initPlugins();
	console.log("RawrBawt is up!");
});

bot.on("message", message => {
	if(!message.content.startsWith("!")) return;

	let args = message.content.split(" ");
	args[0] = args[0].substring(1);

	let command = commands[args[0]];
	if (!command) {
		return utils.sendReply(message, "Sorry, I don't know that command!");
	} else {
		try {
			return command.run(message, args);
		} catch(e) {
			console.log(e);
			return utils.sendReply(message, "Sorry, command failed!");
		}
		
	}
});

function initPlugins () {
	let plugin_dir = "./plugins/";
	let plugins = config.has("plugins.enabled") ? config.get("plugins.enabled") : [];
	plugins.forEach(plugin => {
		require(plugin_dir + plugin)(addCommands);
	});
}

bot.login(token);