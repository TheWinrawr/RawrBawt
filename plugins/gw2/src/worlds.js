/*global rootDir*/
const rp = require("request-promise");
const utils = require(rootDir + "/scripts/utils.js");

module.exports = function(api) {
	api.getWorlds = function () {
		return rp("https://api.guildwars2.com/v2/worlds?ids=all");
	};

	api.getWorldId = function (name) {
		api.getWorlds().then(worlds => {
			let result = utils.search(worlds, name, "name");
			if (result.length > 0) {return result[0].id;}
			return null;
		}).catch(err => {
			return err;
		});
	};
};