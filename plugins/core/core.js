/*global rootDir*/
const 
	utils = require(rootDir + "/scripts/utils.js"),
	fs = require("fs")
;

let commands = {
	"hi": {
		usage: "",
		visible: true,
		description: "Can be used to check if the bot is alive. If it doesn't respond, the bot is either offline or broken.",
		run: (message, args) => {
			return utils.sendMessage(message, "Hi, " + message.author.username + "!");
		}
	},

	"help": {
		usage: "",
		visible: true,
		description: "Get a list of commands with descriptions",
		run: (message, args) => {
			return utils.printHelp(message, commands);
		}
	},

	"todo" :{
		usage: "",
		description: "",
		visible: true,
		run: (message, args) => {
			fs.readFile("./todo.txt", "utf8", function (err,data) {
				if (err) {
					return console.log(err);
				}
				return utils.printHelp(message, "\n" + data);
			});
		}
	},

	"change-nickname" :{
		usage: "",
		description: "",
		run: (message, args) => {
			let username = args[1];
			let nickname = args.slice(2).join(" ");

			let member = utils.findGuildMember(message, username);
			if(!member) {
				return utils.sendMessage(message, "Sorry, I couldn't find that person!");
			}

			member.setNickname(nickname).then( () => {
				if (nickname === "") nickname = member.user.username;
				return utils.sendMessage(message, member.user.username + " shall henceforth be known as " + nickname + "!")
			}).catch( err => {
				console.log(err);
				return utils.sendMessage(message, "Sorry, I can't set the nickname of that person!");
			});
		}
	},
};

module.exports = function (addCommands) {
	addCommands(commands);
};