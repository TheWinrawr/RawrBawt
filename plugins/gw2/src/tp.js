/*global rootDir*/
const rp = require("request-promise");
const fs = require("fs");
const _ = require("lodash");
const utils = require(rootDir + "/scripts/utils.js");

module.exports = function(api) {
	api.updateItems = function () {
		return rp("https://api.guildwars2.com/v2/items").then( res => {
			let ps = [];
			let i = 0;
			while(i < res.length) {
				let ids = res.slice(i, i+200);
				i += 200;
				ps.push(rp("https://api.guildwars2.com/v2/items?ids=" + ids.join(",")));
			}

			return Promise.all(ps).then( items => {
				items = _.flattenDeep(items);
				return new Promise((resolve, reject) => {
					fs.writeFile("../data/items.json", JSON.stringify(items), err => {
						if(err) reject(err);
						resolve(items);
					});
				});
			});
		});
	};

	api.getItems = function () {
		return new Promise( (resolve, reject) => {
			fs.readFile("../data/items.json", "utf8", (err, data) => {
				if (err) {
					api.updateItems.then( items => {
						resolve(items);
					});
				}
				let items = JSON.parse(data);
				resolve(items);
			});
		});
	};

	api.getItemId = function (name) {
		api.getItems().then(items => {
			let result = utils.search(items, name, "name");
			if (result.length > 0) {return result[0].id;}
			return null;
		}).catch(err => {
			return err;
		});
	};
};