/*global rootDir*/
const 
	utils = require(rootDir + "/scripts/utils.js"),
	ytdl = require("ytdl-core"),
	rp = require("request-promise"),
	_ = require("lodash"),
	config = require("config");

const ytKey = config.get("youtube.key");

let queue = [];
let userLimit = 2;
let skipVoters = [];
let currentSong = null;
let voiceChannel = null;
let dispatcher = null;

let musicChannelName = "music";

let commands = {
	"music": {
		usage: "",
		description: "Run one of the music commands. Type !music or !music help for more details.",
		run: (message, args) => {
			if (args.length === 1) {
				return musicCommands.help.run(message, args);
			}

			let command = musicCommands[args[1]];
			if(!command) {
				return utils.sendReply(message, "Sorry, I don't know that command!");
			} else {
				try {
					return command.run(message, args.slice(1));
				} catch(e) {
					console.log(e);
					return utils.sendReply(message, "Sorry, command failed!");
				}
			}
		}
	}
};

let musicCommands = {
	"help": {
		usage: "",
		description: "Get a list of music commands",
		run: (message, args) => {
			let description = "List of music commands. Make sure you prefix these commands with !music";
			return utils.printHelp(message, musicCommands, description);
		}
	},

	"play": {
		usage: "",
		description: "Plays a song, or places it in a queue if there's one already playing. " +
					"This accepts a youtube URL or a search query.",
		run: (message, args) => {
			if (args.length === 1) {
				return utils.sendReply(message, "Please specify a song!");
			}

			//Voice channel check
			let voiceChannel = getVoiceChannel(message);
			if (!voiceChannel) {
				return utils.sendReply(message, "You must be in a voice channel to request a song!");
			}

			//User limit check
			let numRequestsQueued = _.filter(queue, {requesterId: message.author.id}).length;
			if (numRequestsQueued >= userLimit) {
				return utils.sendReply(message, "You can only have up to two songs queued at a time!");
			}

			//Add the request
			let query = args.slice(1);
			findSong(query).then(info => {
				if (!info) return utils.sendReply(message, "Sorry, there was an error getting this song.");

				addToQueue(message, info);
				return utils.sendReply(message, "Added " + info.title + " to queue!");
			}).catch( err => {
				console.log(err);
				return utils.sendReply(message, "Sorry, I can't find the specified song!");
			});


		}
	},

	"skip": {
		usage: "",
		description: "Vote to skip on a song. If there is a majority vote, the song is skipped. " +
					"Additionally, if the song has been playing for at least five minutes, one vote will skip the song. " +
					"If the requester votes, the song is automatically skipped.",
		run: (message, args) => {
			if (!voiceChannel || !dispatcher || !currentSong) {
				return utils.sendReply(message, "The bot is not playing a song!");
			}

			//If the skip voter is the requester, skip the song immediately.
			if (currentSong.requesterId === message.author.id) {
				dispatcher.end();
				return utils.sendReply(message, "Skipping...");
			}

			//If the song has been playing for at least five minutes, skip the song.
			let time = Math.floor(dispatcher.time / 1000);
			let minutes = Math.floor(time / 60);
			if (minutes >= 1) {
				dispatcher.end();
				return utils.sendReply(message, "Skipping...");
			}

			//Check if the user already voted
			if (skipVoters.includes(message.author.id)) {
				return utils.sendReply(message, "You already voted!");
			}

			//Add to skips and compare it to the number of required votes to pass
			let numMembers = Object.keys(voiceChannel.members).length - 1;
			skipVoters.push(message.author.id);
			let numSkips = skipVoters.length;

			if (numSkips > numMembers - numSkips) {
				utils.sendReply(message, "Skipping...");
				dispatcher.end();
			} else {
				let numVotesRequired = Math.floor(numMembers / 2) + 1;
				return utils.sendReply(message, "Vote recorded! Need " + numSkips + "/" + numVotesRequired + " more votes to skip!");
			}
		}
	},

	"list": {
		usage: "",
		//format: SONG_TITLE (requested by REQUESTER)
		description: "Lists the songs currently in queue",
		run: (message, args) => {
			if (queue.length === 0) {
				return utils.sendReply(message, "The queue is empty!");
			}
			let reply = "";
			queue.forEach( request => {
				reply += "\n" + request.title + " (requested by " + request.requesterName + ")";
			});
			reply = reply.substr(1); //get rid of the first newling
			return utils.sendReply(message, reply);
		}
	},

	"current": {
		usage: "",
		description: "Get information about the current song playing.",
		run: (message, args) => {
			if (!currentSong) {
				return utils.sendReply(message, "There is no song currently playing!");
			}
			let time = Math.floor(dispatcher.time / 1000);
			let minutes = Math.floor(time / 60);
			let seconds = time - minutes * 60;

			let reply = "";
			reply += "Name: " + currentSong.title + "\n";
			reply += "Requester: " + currentSong.requesterName + "\n";
			reply += "Length: " + currentSong.length + "\n";
			reply += "Playing for: " + minutes + "m " + seconds + "s\n";
			return utils.sendReply(message, reply);
		}
	}
};

function addToQueue(message, songInfo) {
	let songRequest = {
		requesterId: message.author.id,
		requesterName: message.author.username,
		length: songInfo.length,
		message: message,
		title: songInfo.title,
		url: songInfo.url
	};

	queue.push(songRequest);
	playNextSong();
}

/**
 * Plays the next song in the queue. If there are no songs, disconnect the bot from the voice channel.
 * @return {[type]} [description]
 */
function playNextSong() {
	//Check if the queue is empty.
	if (queue.length === 0) {
		if (voiceChannel) voiceChannel.leave();
		return;
	}

	//Check if a song is already playing
	if (dispatcher) {
		return;
	}

	let song = queue.shift();
	voiceChannel = getVoiceChannel(song.message);
	while (!voiceChannel) {
		utils.sendReply(song.message, "You must be in a voice channel for the song to play!");
		song = queue.shift();
	}

	voiceChannel.join().then(connection => {
		let stream = ytdl(song.url, {filter: "audioonly"});
		
		dispatcher = connection.playStream(stream);
		dispatcher.setVolumeLogarithmic(0.5);

		dispatcher.once("start", () => {
			currentSong = song;
			let musicChannel = utils.getChannel(song.message, musicChannelName);
			if (musicChannel) {
				utils.sendMessage(musicChannel, "Now playing: " + song.title + " (requested by " + song.requesterName + ")");
			}
		});

		dispatcher.once("error", err => {
			console.log("Error");
			console.log(err);
			utils.sendReply(song.message, "There was an error playing your song!");
			dispatcher = null;
			playNextSong();
		});

		dispatcher.once("end", reason => {
			console.log(reason);
			dispatcher = null;
			currentSong = null;
			skipVoters = [];
			playNextSong();
		});
		
	});


}

function getVoiceChannel(message) {
	let voiceChannel = message.guild.channels
									.filter( c => c.type === "voice")
									.find(c => c.members.has(message.author.id));
	return voiceChannel;
}

function findSong(query) {
	return ytdl.getInfo(query).catch(() => { //Couldn't find video by url, so try searching on youtube
		let uri = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=" + query + "&key=" + ytKey;

		return rp({uri: uri, json: true}).catch(() => {
			Promise.reject();
		}).then( res => {
			if (res.items.length === 0) {
				return Promise.reject();
			}
			let videoId = res.items[0].id.videoId;
			let url = "https://www.youtube.com/watch?v=" + videoId;

			return ytdl.getInfo(url); //Try getting the video info again
		});
	}).then( info => {
		//Get length of song
		let time = info.length_seconds;
		let minutes = Math.floor(time / 60);
		let seconds = time - minutes * 60;

		//Put it into result
		let result = {};
		result.title = info.title;
		result.url = "https://www.youtube.com/watch?v=" + info.video_id;
		result.length = minutes + "m " + seconds + "s";
		return result;
	}).catch( err => {
		return Promise.reject(err);
	});
}

module.exports = function (addCommands) {
	addCommands(commands);
};