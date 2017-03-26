const _ = require("lodash");

let utils = {};

/**
 * Send a message to the discord channel.
 * @param  {Message} message The Discord message.
 * @param  {String} content The string that should be sent.
 * @return {Promise}         
 */
utils.sendReply = function (message, content) {
	return message.reply("```" + content + "```");
};

utils.sendMessage = function (channel, content) {
	return channel.sendMessage("```" + content + "```");
};

utils.getChannel = function (message, channelName) {
	let guild = message.guild;
	if (!guild || !guild.available) {return null;}

	let channels = guild.channels;
	return channels.find( channel => {
		return channel.name === channelName;
	});
};

/**
 * Prints all of the commands from a commands list.
 * @param  {Message} message     The Discord message.
 * @param  {Object} commands    A list of commands.
 * @param  {String} commandType The plugin the commands come from.
 * @return {Promise}             
 */
utils.printHelp = function (message, commands, description) {
	let reply = "HTTP\n";
	if (description) {
		reply += description + "\n";
	}
	
	for(let command in commands) {
		if (commands[command].hidden) {continue;}
		let description = commands[command].description;
		let usage = commands[command].usage;
		try {
			reply += "\n" + command + usage + ": " + description;
		} catch (e) {
			console.log("Can't get description for command " + command + ": " + e);
		}
	}

	return utils.sendReply(message, reply);
};

/**
 * Search for a string in the given list.
 * @param  {Array | Object} list   A collection of strings.
 * @param  {String} target The target string to look for. Can be abbreviated.
 * @param  {String | Array} path   The property values of list is an Object.
 * @return {Array}        An array of results sorted by most relevant to least relevant.
 */
utils.search = function (list, target, path) {
	//Attempt to find an exact match first
	if (list.includes(target)) {return [target];}
	let result = _.find(list, [path, target]);
	if (result) {return [result];}

	if(typeof target === "string") target = target.toLowerCase().split(" ");
	else target = target.map(str => { return str.toLowerCase(); });

	result = list;
	//Step 1: Filter the list
	target.forEach(str => {
		result = result.filter( item => {
			if (!item) return false;
			let val = utils.getValue(item, path).toLowerCase();
			return val && val.includes(str);
		});
	});

	//Step 2: Sort it to get the most relevant result back
	target.reverse().forEach( str => {
		result = result.sort( (a, b) => {
			let v1 = utils.getValue(a, path).toLowerCase(),
				v2 = utils.getValue(b, path).toLowerCase();
			return v1.indexOf(str) - v2.indexOf(str);
		});
	});

	return result;
};

utils.getValue = function (obj, path) {
	if (typeof obj != "object") {return obj;}
	return _.get(obj, path);
};

utils.findGuildMember = function (message, target) {
	let members = message.channel.members;
	target = target.replace(/_/g, " ");

	let usernames = [], nicknames = [];
	members.forEach(member => {
		usernames.push(member.user.username);
		nicknames.push(member.nickname);
	});

	//Find by username first
	let result = utils.search(usernames, target);
	if(result.length > 0) {
		return members.find(member => {
			return member.user.username === result[0];
		});
	}

	//Find by nickname if we didn't get by name first
	result = utils.search(nicknames, target);
	if(result.length > 0) {
		return members.find("nickname", result[0]);
	}

	return null;
};

module.exports = utils;