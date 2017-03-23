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
let numSkips = 0;
let currentSong = null;
let voiceChannel = null;
let dispatcher = null;

let commands = {
	"play": {
		usage: "",
		description: "Plays a song, or places it in a queue if there's one already playing",
		run: (message, args) => {
			if (args.length === 1) {
				return utils.sendMessage(message, "Please specify a song!");
			}

			//Voice channel check
			let voiceChannel = getVoiceChannel(message);
			if (!voiceChannel) {
				return utils.sendMessage(message, "You must be in a voice channel to request a song!");
			}

			//User limit check
			let numRequestsQueued = _.filter(queue, {id: message.author.id}).length;
			if (numRequestsQueued >= userLimit) {
				return utils.sendMessage(message, "You can only have up to two songs queued at a time!");
			}

			//Add the request
			let query = args.slice(1);
			findSong(query).catch(err => {
				console.log(err);
				return utils.sendMessage(message, "Sorry, I can't find the specified song!");
			}).then(info => {
				if (!info) return utils.sendMessage(message, "Sorry, there was an error getting this song.");

				addToQueue(message, info);
				return utils.sendMessage(message, "Added " + info.title + " to queue!");
			});


		}
	},

	"queue": {
		usage: "",
		//format: SONG_TITLE (requested by REQUESTER)
		description: "Lists the songs currently in queue",
		run: (message, args) => {
			if (queue.length === 0) {
				return utils.sendMessage(message, "The queue is empty!");
			}
			let reply = "";
			queue.forEach( request => {
				reply += "\n" + request.title + " (requested by " + request.name + ")";
			});
			reply = reply.substr(1); //get rid of the first newling
			return utils.sendMessage(message, reply);
		}
	},

	"current": {
		usage: "",
		description: "Get information about the current song playing.",
		run: (message, args) => {
			if (!currentSong) {
				return utils.sendMessage(message, "There is no song currently playing!");
			}
			let time = Math.floor(dispatcher.time / 1000);
			let minutes = Math.floor(time / 60);
			let seconds = time - minutes * 60;

			let reply = "";
			reply += "Name: " + currentSong.title + "\n";
			reply += "Requester: " + currentSong.name + "\n";
			reply += "Length: " + currentSong.length + "\n";
			reply += "Playing for: " + minutes + "m " + seconds + "s\n";
			return utils.sendMessage(message, reply);
		}
	}
};

function addToQueue(message, songInfo) {
	let songRequest = {
		id: message.author.id,
		name: message.author.name,
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
	currentSong = null;
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
	if (!voiceChannel) {
		return utils.sendMessage(song.message, "You must be in a voice channel for the song to play!");
	}

	voiceChannel.join().then(connection => {
		let stream = ytdl(song.url, {filter: "audioonly"});
		//stream.setEncoding("hex");
		
		stream.on("data", (chunk) => {
			console.log(chunk.length);
		});

		stream.on("end", () => {
			console.log("Finished downloading");
		});
		
		dispatcher = connection.playStream(stream);
		dispatcher.setVolumeLogarithmic(0.5);

		dispatcher.once("start", () => {
			currentSong = song;
			utils.sendMessage(song.message, "Now playing: " + song.title + " (requested by " + song.name + ")");
		});

		dispatcher.once("error", err => {
			console.log("Error");
			console.log(err);
			utils.sendMessage(song.message, "There was an error playing your song!");
			dispatcher = null;
			playNextSong();
		});

		dispatcher.once("end", reason => {
			console.log(reason);
			dispatcher = null;
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
		let uri = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + query + "&key=" + ytKey;

		return rp({uri: uri, json: true}).catch(() => {
			Promise.reject();
		}).then( res => {
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