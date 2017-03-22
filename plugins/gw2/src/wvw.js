/*global rootDir*/
const rp = require("request-promise");
const utils = require(rootDir + "/scripts/utils.js");

module.exports = function(api) {
	api.getStats = function (worldId) {
		return rp("https://api.guildwars2.com/v2/wvw/matches/stats?world=" + worldId);
	};

	api.getScores = function (worldId) {
		return rp("https://api.guildwars2.com/v2/wvw/matches/scores?world=" + worldId);
	};
};