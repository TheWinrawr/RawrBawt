/**
 * GW2 class
 * Last change: 2017-01-14
 * Requires: FW_Ajax
 * Disabled by ArenaNet:
 * - https://wiki.guildwars2.com/wiki/API:1/event_names (Disabled)
 * - https://wiki.guildwars2.com/wiki/API:1/events (No longer in use)
 * - https://wiki.guildwars2.com/wiki/API:2/floors (Merged into v2/continents)
 * Multiple API versions:
 * - getBuild
 * - getColors
 * - getContinents
 * - getFiles
 * - getHomeWorldMatchID
 * - getItem
 * - getMap
 * - getMaps
 * - getRecipe
 * - getSkin
 * - getSkins
 **/

var FW_GW2$ImageData = { // Just some default icons
	'gem':   'data:image/png;base64,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',
	'gold':  'data:image/png;base64,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',
	'silver':'data:image/png;base64,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',
	'copper':'data:image/png;base64,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',
};
var FW_GW2 = function(Tools, message, args, debug) {

	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	
	// Auto instantiate
	if (this.__proto__.constructor !== FW_GW2) return new FW_GW2(debug);
	
	// Set debug
	var _debug = typeof debug != 'boolean' ? false : debug;
	//_debug = true;
	
	/**
	 * Get XMLHTTP handler
	 */
	var _getHandler = function() {
		if (typeof XMLHttpRequest !== 'undefined') return new XMLHttpRequest();
		var versions = [
			'MSXML2.XMLHTTP.5.0',
			'MSXML2.XMLHTTP.4.0',
			'MSXML2.XMLHTTP.3.0',
			'MSXML2.XMLHTTP.2.0',
			'Microsoft.XMLHTTP'
		];
		var xhr;
		for(var i = 0; i < versions.length; i++) {
			try {
				xhr = new ActiveXObject(versions[i]);
				break;
			} catch (e) {}
		}
		return xhr;
	};
	
	// Handler
	var _handler = _getHandler();
	
	/**
	 * GET JSON Request
	 */
	var _getJSON = function(url,doSuccess,doError) {
		return _run(function(event) {
			return JSON.parse(event.target.responseText);
		},doSuccess,doError,true,'GET',url,null,null);
	};

	
	/**
	 * Error event
	 */
	var _onError = function(doError) {
		if (typeof doError != 'function') doError = function(status,text,data,event) {
			if (_debug) console.log('FW_GW2','_onError',status,text,data,event);
		};
		return doError;
	};
	
	/**
	 * Process event
	 */
	var _onProcess = function(doProcess) {
		if (typeof doProcess != 'function') doProcess = function(event) {
			if (that.debug) console.log('FW_GW2','_onProcess',event);
			return event.target.responseText;
		};
		return doProcess;
	};
	
	/**
	 * Success event
	 */
	var _onSuccess = function(doSuccess) {
		if (typeof doSuccess != 'function') doSuccess = function(data,event) {
			if (_debug) console.log('FW_GW2','_onSuccess',data,event);
		};
		return doSuccess;
	};
	
	/**
	 * Run
	 */
	var _run = function(doProcess,doSuccess,doError,async,method,url,data,headers) {
		if (typeof async == 'undefined') async = true;
		if (typeof method == 'undefined') method = 'GET';
		if (typeof url != 'string') return false;
		if (typeof data == 'undefined') data = null;
		if (typeof headers == 'undefined') headers = {};
		if (_debug) console.log('FW_GW2','_run',[method,url,async,headers,data,_onProcess(doProcess),_onSuccess(doSuccess),_onError(doError)]);
		if (typeof _handler.onreadystatechange != 'function') {
			_handler.onreadystatechange = function(event) {
				if (typeof event == 'undefined') {
					event = {};
					event.target = _handler;
				}
				if (_handler.status > 0 && _handler.status >= 400) {
					_onError(doError)(_handler.status,_handler.statusText,data,event);
					return;
				} else if (_handler.readyState == 4) {
					var data = _onProcess(doProcess)(event);
					if (_handler.status == 200 || _handler.status == 206) _onSuccess(doSuccess)(data,event);
					else _onError(doError)(_handler.status,_handler.statusText,data,event);
					return;
				}
			};
		}
		console.log(url);
		_handler.open(method,url,async);
		for (var key in headers) _handler.setRequestHeader(key,headers[key]);
		_handler.send(data);
		return this;
	};
	
	// Inner this
	var that = this;
	
	
	/**
	 * @description Calculate the percentual score for one server color
	 * @param {number} red - Red color count
	 * @param {number} green - Green color count
	 * @param {number} blue - Blue color count
	 * @param {number} value - Value to calculate percentage
	 * @returns {number} Percentage of value
	 */
	this.calcScorePercentage = function(red,green,blue,value) {
		if (typeof red != 'number') return 0;
		if (typeof green != 'number') return 0;
		if (typeof blue != 'number') return 0;
		if (typeof value != 'number') return 0;
		var total = red + green + blue;
		if (value < 1 || total < 1) return 0;
		var result = (100 * value) / total;
		return Math.round(result * 10) / 10;
	};
	
	/**
	 * @description Get anything in a generic approach (no v1 endpoints and v2 continents endpoints yet)
	 * @param {object} parameters - Object with parameters
	 * @param {string} parameters.apiKey - API-Key for authenticated endpoints
	 * @param {string} parameters.endpoint - Access endpoint
	 * @param {number|string} parameters.id - ID number or string for bulk-expanded endpoints
	 * @param {number|string|array} parameters.ids - List of id numbers or strings for bulk-expanded endpoints
	 * @param {number|string} parameters.input - Input ID for "/v2/recipes/search" endpoint
	 * @param {string} parameters.lang - Language keyword (en|de|es|fr) for localized endpoints
	 * @param {number|string} parameters.output - Output ID for "/v2/recipes/search" endpoint
	 * @param {number|string} parameters.page - Page number for bulk-expanded endpoints
	 * @param {number|string} parameters.pageSize - Page size number for bulk-expanded endpoints
	 * @param {number|string} parameters.quantity - Value quantity for "/v2/commerce/exchange" endpoints
	 * @param {number|string} parameters.world - World ID for "/v2/wvw/matches" endpoint
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.get = function(parameters,doSuccess,doError) {
		
		// Prepare parameters
		var p = {
			'apiKey':(parameters.apiKey ? parameters.apiKey : null), // Querystring
			'endpoint':(parameters.endpoint ? parameters.endpoint : null), // URL
			'id':(parameters.id ? parameters.id : null), // Querystring
			'ids':(parameters.ids ? that.stringifyArray(parameters.ids) : null), // Querystring
			'input':(parameters.input ? parameters.input : null), // Querystring
			'lang':(parameters.lang ? parameters.lang : null), // Querystring
			'output':(parameters.output ? parameters.output : null), // Querystring
			'page':(parseInt(parameters.page) >= 0 ? parseInt(parameters.page) : -1), // Querystring
			'pageSize':(parseInt(parameters.pageSize) > 0 ? parseInt(parameters.pageSize) : 0), // Querystring
			'quantity':(parameters.quantity ? parameters.quantity : null), // Querystring
			'world':(parameters.world ? parameters.world  :null), // Querystring
		};
		
		// Variables
		var e = false; // Error status
		var q = ''; // Querystring
		var u = 'https://api.guildwars2.com'; // URL
		
		// Select endpoint
		switch (p.endpoint) {
			
			// Invalid endpoint
			case null:
				e = true;
				doError(400,'Invalid endpoint',p.endpoint);
			break;
			
			// V1 endpoints
			case '/v1/build.json':
			case '/v1/colors.json':
			case '/v1/continents.json':
			case '/v1/events.json':
			case '/v1/event_details.json':
			case '/v1/event_names.json':
			case '/v1/files.json':
			case '/v1/guild_details.json':
			case '/v1/items.json':
			case '/v1/item_details.json':
			case '/v1/maps.json':
			case '/v1/map_floor.json':
			case '/v1/map_names.json':
			case '/v1/recipes.json':
			case '/v1/recipe_details.json':
			case '/v1/skins.json':
			case '/v1/skin_details.json':
			case '/v1/world_names.json':
			case '/v1/wvw/matches.json':
			case '/v1/wvw/match_details.json':
			case '/v1/wvw/objective_names.json':
				e = true;
				doError(400,'Classic v1 endpoint not yet supported',p.endpoint);
			break;
			
			// Simple endpoint(s)
			case '/v2/achievements/daily':
			case '/v2/achievements/daily/tomorrow':
			case '/v2/build':
			case '/v2/commerce/exchange':
				
				// Add endpoint to URL
				u += p.endpoint;
			break;
			
			// Bulk-expanded endpoint(s)
			case '/v2/achievements':
			case '/v2/achievements/categories':
			case '/v2/achievements/groups':
			case '/v2/backstory':
			case '/v2/backstory/answers':
			case '/v2/backstory/questions':
			case '/v2/colors':
			case '/v2/commerce/listings':
			case '/v2/commerce/prices':
			case '/v2/currencies':
			case '/v2/emblem':
			case '/v2/emblem/backgrounds':
			case '/v2/emblem/foregrounds':
			case '/v2/files':
			case '/v2/finishers':
			case '/v2/guild/permissions':
			case '/v2/guild/upgrades':
			case '/v2/items':
			case '/v2/itemstats':
			case '/v2/legends':
			case '/v2/maps':
			case '/v2/materials':
			case '/v2/minis':
			case '/v2/outfits':
			case '/v2/pets':
			case '/v2/professions':
			case '/v2/pvp/amulets':
			case '/v2/pvp/seasons':
			case '/v2/quaggans':
			case '/v2/recipes':
			case '/v2/specializations':
			case '/v2/skills':
			case '/v2/skins':
			case '/v2/stories':
			case '/v2/stories/seasons':	
			case '/v2/titles':
			case '/v2/traits':
			case '/v2/worlds':
			case '/v2/wvw/objectives':
				
				// Add endpoint to URL
				u += p.endpoint;
				
				// Add language to querystring
				if (p.lang) q += '&lang='+p.lang;
				
				// Add ID to querystring
				if (p.id) q += '&id='+p.id;
				
				// Or add IDs to querystring
				else if (p.ids) q += '&ids='+p.ids;
				
				// Or add page to querystring
				else if (p.page >= 0) {
					q += '&page='+p.page;
					
					// Add page size to querystring
					if (p.pageSize > 0) q += '&page_size='+p.pageSize;
				}
				
				// Add querystring to URL
				if (q.length > 0) u += '?'+q.substring(1);
			break;
			
			// Authenticated endpoint(s)
			case '/v2/account':
			case '/v2/account/achievements':
			case '/v2/account/bank':
			case '/v2/account/dyes':
			case '/v2/account/finishers':
			case '/v2/account/inventory':
			case '/v2/account/materials':
			case '/v2/account/minis':
			case '/v2/account/outfits':
			case '/v2/account/skins':
			case '/v2/account/titles':
			case '/v2/account/wallet':
			case '/v2/characters':
			case '/v2/characters/:id/backstory':
			case '/v2/characters/:id/recipes':
			case '/v2/commerce/transactions':
			case '/v2/commerce/transactions/current':
			case '/v2/commerce/transactions/current/buys':
			case '/v2/commerce/transactions/current/sells':
			case '/v2/commerce/transactions/history':
			case '/v2/commerce/transactions/history/buys':
			case '/v2/commerce/transactions/history/sells':
			case '/v2/guild/:id/log':
			case '/v2/guild/:id/members':
			case '/v2/guild/:id/ranks':
			case '/v2/guild/:id/stash':
			case '/v2/guild/:id/teams':
			case '/v2/guild/:id/treasury':
			case '/v2/guild/:id/upgrades':
			case '/v2/pvp/standings':
			case '/v2/pvp/stats':
			case '/v2/pvp/games':
			case '/v2/tokeninfo':
				
				// Add endpoint to URL
				u += p.endpoint;
				
				// Add API-Key to querystring
				if (p.apiKey && p.apiKey.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{20}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/)) q += '&access_token='+p.apiKey;
				
				// Invalid
				else {
					e = true;
					doError(400,'Invalid API-Key',p.apiKey);
					break;
				}
				
				// Add language to querystring
				if (p.lang) q += '&lang='+p.lang;
				
				// Add ID to endpoint
				if (p.id && u.indexOf('/:id') != -1) u = u.replace('/:id','/'+p.id);
				
				// Add ID to querystring
				else if (p.id) q += '&id='+p.id;
				
				// Or add IDs to querystring
				else if (p.ids) q += '&ids='+p.ids;
				
				// Or add page to querystring
				else if (p.page >= 0) {
					q += '&page='+p.page;
					
					// Add page size to querystring
					if (p.pageSize > 0) q += '&page_size='+p.pageSize;
				}
				
				// Add querystring to URL
				if (q.length > 0) u += '?'+q.substring(1);
			break;
			
			// Recipe search endpoint
			case '/v2/recipes/search':
				
				// Add endpoint to URL
				u += p.endpoint;
				
				// Add Input to querystring
				if (p.input) q += '&input='+p.input;
				
				// Or add Output to querystring
				else if (p.output) q += '&output='+p.output;
				
				// Invalid
				else {
					e = true;
					doError(400,'Invalid input or output ID',[p.input,p.output]);
					break;
				}
				
				// Add querystring to URL
				if (q.length > 0) u += '?'+q.substring(1);
			break;
			
			// Exchange endpoint(s)
			case '/v2/commerce/exchange/coins':
			case '/v2/commerce/exchange/gems':
				
				// Add endpoint to URL
				u += p.endpoint;
				
				// Add Input to querystring
				if (p.quantity) q += '&quantity='+p.quantity;
				
				// Invalid
				else {
					e = true;
					doError(400,'Invalid quantity',p.quantity);
					break;
				}
				
				// Add querystring to URL
				if (q.length > 0) u += '?'+q.substring(1);
			break;
			
			// WvW matches endpoint
			case '/v2/wvw/matches':
			case '/v2/wvw/matches/overview':
			case '/v2/wvw/matches/scores':
			case '/v2/wvw/matches/stats':
				
				// Add endpoint to URL
				u += p.endpoint;
				
				// Add ID to querystring
				if (p.id) q += '&id='+p.id;
				
				// Or add IDs to querystring
				else if (p.ids) q += '&ids='+p.ids;
				
				// Or add world to querystring
				else if (p.world) q += '&world='+p.world;
				
				// Or add page to querystring
				else if (p.page >= 0) {
					q += '&page='+p.page;
					
					// Add page size to querystring
					if (p.pageSize > 0) q += '&page_size='+p.pageSize;
				}
				
				// Add querystring to URL
				if (q.length > 0) u += '?'+q.substring(1);
			break;
			
			// Unknown endpoint
			default:
				e = true;
				doError(400,'Unknown endpoint',p.endpoint);
			break;
		}
		
		// Run
		if (!e) _getJSON(u,doSuccess,doError);
		
		// Done
		return this;
	};
	
	
	/**
	 * @description Get account object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/account/account.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccount = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/account'},doSuccess,doError);
	};
	
	/**
	 * @description Get account achievements object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/achievements}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/account/achievements.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountAchievements = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/account/achievements'},doSuccess,doError);
	};
	
	/**
	 * @description Get bank map from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/bank}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/account/bank.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountBank = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/account/bank'},doSuccess,doError);
	};
	
	/**
	 * @description Get finishers from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/finishers}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/account/finishers.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountFinishers = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/account/finishers'},doSuccess,doError);
	};
	
	/**
	 * @description Get dyes from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/dyes}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/account/inventory.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountInventory = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/account/inventory'},doSuccess,doError);
	};
	
	/**
	 * @description Get shared inventory slots from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/inventory}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/account/dyes.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountDyes = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/account/dyes'},doSuccess,doError);
	};
	
	/**
	 * @description Get materials map from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/materials}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/account/materials.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountMaterials = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/account/materials'},doSuccess,doError);
	};

	/**
	 * @description Get account minis object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/minis}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/account/minis.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountMinis = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/account/minis'},doSuccess,doError);
	};
	
	/**
	 * @description Get account outfits object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/outfits}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/account/outfits.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountOutfits = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/account/outfits'},doSuccess,doError);
	};
	
	/**
	 * @description Get skins from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/skins}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/account/skins.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountSkins = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/account/skins'},doSuccess,doError);
	};
	
	/**
	 * @description Get titles from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/titles}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/account/titles.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountTitles = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/account/titles'},doSuccess,doError);
	};

	/**
	 * @description Get wallet from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/wallet}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/account/wallet.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountWallet = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/account/wallet'},doSuccess,doError);
	};
	
	/**
	 * @description Get achievement by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements}
	 * @see {@link https://github.com/arenanet/api-cdi/tree/master/v2/achievements/index.js}
	 * @param {number} id - Achievement ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAchievement = function(id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/achievements','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all achievement ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements}
	 * @see {@link https://github.com/arenanet/api-cdi/tree/master/v2/achievements/index.js}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAchievements = function(lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/achievements','lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of achievement objects by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements}
	 * @see {@link https://github.com/arenanet/api-cdi/tree/master/v2/achievements/index.js}
	 * @param {object|string} ids - List of achievement ID's
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAchievementsByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/achievements','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get achievement category by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements/categories}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/achievements/categories.js}
	 * @param {number} id - Achievement category ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAchievementsCategory = function(id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/achievements/categories','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all achievement category ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements/categories}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/achievements/categories.js}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAchievementsCategories = function(lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/achievements/categories','lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of achievement category objects by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements/categories}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/achievements/categories.js}
	 * @param {object|string} ids - List of achievement category ID's
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAchievementsCategoriesByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/achievements/categories','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all daily achievement ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements/daily}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/achievements/daily.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAchievementsDaily = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/achievements/daily'},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all daily achievement ID's for tomorrow
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements/daily/tomorrow}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/achievements/daily.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAchievementsDailyTomorrow = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/achievements/daily/tomorrow'},doSuccess,doError);
	};
	
	/**
	 * @description Get achievement group by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements/groups}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/achievements/groups.js}
	 * @param {number} id - Achievement group ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAchievementsGroup = function(id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/achievements/groups','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all achievement group ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements/groups}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/achievements/groups.js}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAchievementsGroups = function(lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/achievements/groups','lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of achievement group objects by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements/groups}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/achievements/groups.js}
	 * @param {object|string} ids - List of achievement group ID's
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAchievementsGroupsByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/achievements/groups','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get all worlds as map (Combination of getWorlds and getWorldsByID)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAllWorlds = function(lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/worlds','ids':'all','lang':lang},function(data) {
			var optimized = {};
			for (var key in data) optimized[data[key]['id']] = data[key];
			doSuccess(optimized);
		},doError);
	}
	
	/**
	 * @description Get backstory answer/question by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/backstory}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/backstory}
	 * @param {string} what - What? (answers|questions)
	 * @param {number} id - Backstory answer/question ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getBackstory = function(what,id,lang,doSuccess,doError) {
		if (typeof what != 'string') {
			return that.get({'endpoint':'/v2/backstory'},doSuccess,doError);
		} else {
			return that.get({'endpoint':'/v2/backstory/'+what,'id':id,'lang':lang},doSuccess,doError);
		}
	};
	
	/**
	 * @description Get list of backstory answer/question ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/backstory}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/backstory}
	 * @param {string} what - What? (answers|questions)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getBackstories = function(what,doSuccess,doError) {
		if (typeof what != 'string') {
			return that.get({'endpoint':'/v2/backstory'},doSuccess,doError);
		} else {
			return that.get({'endpoint':'/v2/backstory/'+what},doSuccess,doError);
		}
	};
	
	/**
	 * @description Get backstory answer/question object by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/backstory}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/backstory}
	 * @param {string} what - What? (answers|questions)
	 * @param {object|string} ids - List of backstory (answer/question) ID's
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getBackstoriesByID = function(what,ids,lang,doSuccess,doError) {
		if (typeof what != 'string') {
			return that.get({'endpoint':'/v2/backstory'},doSuccess,doError);
		} else {
			return that.get({'endpoint':'/v2/backstory/'+what,'ids':ids,'lang':lang},doSuccess,doError);
		}
	};
	
	/**
	 * @description Get game build ID number
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/build}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/build}
	 * @see {@link http://jsfiddle.net/cisco211/dhfa57pj}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getBuild = function(doSuccess,doError,version) {
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1:
				_getJSON('https://api.guildwars2.com/v1/build.json',function(data) {
					doSuccess(data['build_id']);
				},doError);
			break;
			case 2:
				return that.get({'endpoint':'/v2/build'},function(data) {
					doSuccess(data['id']);
				},doError);
			break;
		}
		return this;
	};
	
	/**
	 * @description Get character object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/characters}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/characters/characters.js}
	 * @param {string} apiKey - API-Key
	 * @param {string} character - Character name (UTF-8)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCharacter = function(apiKey,character,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/characters','id':character},doSuccess,doError);
	};
	
	/**
	 * @description Get list of character names
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/characters}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/characters/characters.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCharacters = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/characters'},doSuccess,doError);
	};
	
	/**
	 * @description Get character object(s) from names(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/characters}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/characters/characters.js}
	 * @param {string} apiKey - API-Key
	 * @param {object|string} characters - Character name(s)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCharactersByName = function(apiKey,characters,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/characters','ids':characters},doSuccess,doError);
	};
	
	/**
	 * @description Get characters by page
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/characters}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/characters/characters.js}
	 * @param {string} apiKey - API-Key
	 * @param {number} page - Page number
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCharactersByPage = function(apiKey,page,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/characters','page':page},doSuccess,doError);
	};
	
	/**
	 * @description Get character backstory object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/characters/backstory}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/characters/backstory.js}
	 * @param {string} apiKey - API-Key
	 * @param {string} character - Character name (UTF-8)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCharacterBackstory = function(apiKey,character,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/characters/:id/backstory','id':character},doSuccess,doError);
	};
	
	/**
	 * @description Get character recipes object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/characters/recipes}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/characters/recipes.js}
	 * @param {string} apiKey - API-Key
	 * @param {string} character - Character name (UTF-8)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCharacterRecipes = function(apiKey,character,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/characters/:id/recipes','id':character},doSuccess,doError);
	};
	
	/**
	 * @description Get color object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/colors}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/colors.js}
	 * @param {number} id - Color ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getColor = function(id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/colors','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of color ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/colors}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/colors}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/colors.js}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getColors = function(lang,doSuccess,doError,version) {
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1:
				_getJSON('https://api.guildwars2.com/v1/colors.json?lang='+lang,function(data) {
					doSuccess(data['colors']);
				},doError);
			break;
			case 2:
				return that.get({'endpoint':'/v2/colors','lang':lang},doSuccess,doError);
			break;
		}
		return this;
	};
	
	/**
	 * @description Get color object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/colors}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/colors}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/colors.js}
	 * @param {object|number} colors - Color ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getColorsByID = function(colors,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/colors','ids':colors,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get continent object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {number} cid - Continent ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinent = function(cid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get continent floor by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/floors/floor.js}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentFloor = function(cid,fid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of continent floor ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/floors/floor.js}
	 * @param {number} cid - Continent ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentFloors = function(cid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get continent map by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/floors/map.js}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {number} mid - Map ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentMap = function(cid,fid,rid,mid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof mid != 'number') mid = 26;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps/'+mid+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of continent map ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/floors/map.js}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentMaps = function(cid,fid,rid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get continent points of interest object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/floors/pois.js}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {number} mid - Map ID
	 * @param {number} pid - POI ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentPOI = function(cid,fid,rid,mid,pid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof mid != 'number') mid = 26;
		if (typeof pid != 'number') pid = 554;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps/'+mid+'/pois/'+pid+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of continent points of interest ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/floors/pois.js}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {number} mid - Map ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentPOIs = function(cid,fid,rid,mid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof mid != 'number') mid = 26;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps/'+mid+'/pois?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get continent region object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/floors/region.js}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentRegion = function(cid,fid,rid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of continent region ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/floors/region.js}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentRegions = function(cid,fid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get all continents or list of all continent ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/continents}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinents = function(lang,doSuccess,doError,version) {
		if (typeof lang != 'string') lang = 'en';
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1:
				_getJSON('https://api.guildwars2.com/v1/continents.json?lang='+lang,function(data) {
					doSuccess(data['continents']);
				},doError);
			break;
			case 2:
				_getJSON('https://api.guildwars2.com/v2/continents?ids=all&lang='+lang,doSuccess,doError);
			break;
		}
		return this;
	};
	
	/**
	 * @description Get continent sector object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/floors/sectors.js}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {number} mid - Map ID
	 * @param {number} sid - Sector ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentSector = function(cid,fid,rid,mid,sid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof mid != 'number') mid = 26;
		if (typeof sid != 'number') sid = 513;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps/'+mid+'/sectors/'+sid+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of continent sector ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/floors/sectors.js}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {number} mid - Map ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentSectors = function(cid,fid,rid,mid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof mid != 'number') mid = 26;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps/'+mid+'/sectors?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get continent task object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/floors/tasks.js}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {number} mid - Map ID
	 * @param {number} tid - Task ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentTask = function(cid,fid,rid,mid,tid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof mid != 'number') mid = 26;
		if (typeof tid != 'number') tid = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps/'+mid+'/tasks/'+tid+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of continent task ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/floors/tasks.js}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {number} mid - Map ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentTasks = function(cid,fid,rid,mid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof mid != 'number') mid = 26;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps/'+mid+'/tasks?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of currencies ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/currencies}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/currencies.js}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCurrencies = function (lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/currencies','lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get currency object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/currencies}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/currencies.js}
	 * @param {object|string} ids - Array of currency ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCurrenciesByID = function (ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/currencies','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get currency object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/currencies}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/currencies.js}
	 * @param {number} id - Currency ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCurrency = function (id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/currencies','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get emblem by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/emblem}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/emblems/emblems.js}
	 * @param {string} what - What keyword (foregrounds|backgrounds)
	 * @param {number} id - emblem ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getEmblem = function(what,id,doSuccess,doError) {
		return that.get({'endpoint':'/v2/emblem/'+what,'id':id},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all emblem ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/emblem}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/emblems/emblems.js}
	 * @param {string} what - What keyword (foregrounds|backgrounds)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getEmblems = function(what,doSuccess,doError) {
		return that.get({'endpoint':'/v2/emblem/'+what},doSuccess,doError);
	};
	
	/**
	 * @description Get list of emblem objects by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/emblem}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/emblems/emblems.js}
	 * @param {string} what - What keyword (foregrounds|backgrounds)
	 * @param {object|string} ids - List of emblem ID's
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getEmblemsByID = function(what,ids,doSuccess,doError) {
		return that.get({'endpoint':'/v2/emblem/'+what,'ids':ids},doSuccess,doError);
	};
	
	/**
	 * @description Get event object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/event_details}
	 * @param {number} id - Event ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getEvent = function(id,lang,doSuccess,doError) {
		if (typeof id != 'string') return this;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v1/event_details.json?event_id='+id+'&lang='+lang,function(data) {
			doSuccess(data['events'][id]);
		},doError);
		return this;
	};
	
	/**
	 * @description Get all events as map
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/event_details}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getEvents = function(lang,doSuccess,doError) {
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v1/event_details.json?lang='+lang,function(data) {
			doSuccess(data['events']);
		},doError);
		return this;
	};
	
	/**
	 * @description Get exchange rate object for gold or gems
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/commerce/exchange}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/commerce/exchange.js}
	 * @param {string} what - "What" exchange rate to show? (coins|gems)
	 * @param {number} quantity - The quantity of "what"
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getExchange = function(what,quantity,doSuccess,doError) {
		if (typeof what != 'string') {
			return that.get({'endpoint':'/v2/commerce/exchange'},doSuccess,doError);
		} else {
			if (typeof quantity != 'number') quantity = 100;
			return that.get({'endpoint':'/v2/commerce/exchange/'+what,'quantity':quantity},doSuccess,doError);
		}
	};
	
	/**
	 * @description Get all files map
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/files}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/files}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getFiles = function(doSuccess,doError,version) {
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1: _getJSON('https://api.guildwars2.com/v1/files.json',doSuccess,doError); break;
			case 2: return that.get({'endpoint':'/v2/files','ids':'all'},doSuccess,doError); break;
		}
		return this;
	};
	
	/**
	 * @description Get files map from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/files}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/files}
	 * @param {object|string} files - File ID(s)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getFilesByID = function(files,doSuccess,doError) {
		return that.get({'endpoint':'/v2/files','ids':files},doSuccess,doError);
	};
	
	/**
	 * @description Get finisher by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/finishers}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/finishers.js}
	 * @param {number} id - Finisher ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getFinisher = function(id,lang,doSuccess,doError,version) {
		return that.get({'endpoint':'/v2/finishers','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of finisher ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/finishers}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/finishers.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getFinishers = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/finishers'},doSuccess,doError);
	};
	
	/**
	 * @description Get finisher object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/finishers}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/finishers.js}
	 * @param {object|number} ids - Finisher object ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getFinishersByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/finishers','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get guild details object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/guild_details}
	 * @param {string} id - Guild ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildDetailsByID = function(id,doSuccess,doError) {
		if (typeof id != 'string') return this;
		_getJSON('https://api.guildwars2.com/v1/guild_details.json?guild_id='+id,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get guild details object by name
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/guild_details}
	 * @param {string} name - Guild name (UTF-8)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildDetailsByName = function(name,doSuccess,doError) {
		if (typeof name != 'string') return this;
		_getJSON('https://api.guildwars2.com/v1/guild_details.json?guild_name='+name,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get guild emblem URL
	 * @param {string} name - Guild name (UTF-8)
	 * @returns {string} Guild emblem URL
	 */
	this.getGuildEmblemURL = function(name) {
		if (typeof name != 'string') return '';
		var fname = encodeURI(name.toLowerCase()).replace(/%20/g,'-');
		return 'http://guilds.gw2w2w.com/guilds/'+fname+'/256.svg';
	}
	
	/**
	 * @description Get guild log list from guild leader
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/guild/:id/log}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/guild/log.js}
	 * @param {number} id - Guild ID
	 * @param {string} apiKey - Guild leader API-Key.
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildLog = function(id,apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/guild/:id/log','id':id},doSuccess,doError);
	};
	
	/**
	 * @description Get guild members list from guild leader
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/guild/:id/members}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/guild/members.js}
	 * @param {number} id - Guild ID
	 * @param {string} apiKey - Guild leader API-Key.
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildMembers = function(id,apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/guild/:id/members','id':id},doSuccess,doError);
	};
	
	/**
	 * @description Get guild permission by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/guild/permissions}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/guild/permissions.js}
	 * @param {number} id - Guild permission ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildPermission = function(id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/guild/permissions','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all guild permission ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/guild/permissions}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/guild/permissions.js}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildPermissions = function(lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/guild/permissions','lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of guild permission objects by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/guild/permissions}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/guild/permissions.js}
	 * @param {object|string} ids - List of guild permission ID's
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildPermissionsByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/guild/permissions','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get guild rank list from guild leader
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/guild/:id/ranks}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/guild/ranks.js}
	 * @param {number} id - Guild ID
	 * @param {string} apiKey - Guild leader API-Key.
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildRanks = function(id,apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/guild/:id/ranks','id':id},doSuccess,doError);
	};
	
	/**
	 * @description Get guild stash list from guild leader
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/guild/:id/stash}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/guild/stash.js}
	 * @param {number} id - Guild ID
	 * @param {string} apiKey - Guild leader API-Key.
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildStash = function(id,apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/guild/:id/stash','id':id},doSuccess,doError);
	};
	
	/**
	 * @description Get guild teams list from guild leader
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/guild/:id/teams}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/guild/teams.js}
	 * @param {number} id - Guild ID
	 * @param {string} apiKey - Guild leader API-Key.
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildTeams = function(id,apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/guild/:id/teams','id':id},doSuccess,doError);
	};
	
	/**
	 * @description Get guild treasury list from guild leader
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/guild/:id/treasury}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/guild/treasury.js}
	 * @param {number} id - Guild ID
	 * @param {string} apiKey - Guild leader API-Key.
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildTreasury = function(id,apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/guild/:id/treasury','id':id},doSuccess,doError);
	};
	
	/**
	 * @description Get guild upgrade by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/guild/upgrades}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/guild/upgrades.js}
	 * @param {number} id - Guild upgrade ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildUpgrade = function(id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/guild/upgrades','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all guild upgrade ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/guild/upgrades}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/guild/upgrades.js}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildUpgrades = function(lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/guild/upgrades','lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of guild upgrade objects by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/guild/upgrades}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/guild/upgrades.js}
	 * @param {object|string} ids - List of guild upgrade ID's
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildUpgradesByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/guild/upgrades','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all completed guild upgrade ID's
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/guild/upgrades.js}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {number} id - Guild ID
	 * @param {string} apiKey - Guild leader API-Key.
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildUpgradesCompleted = function(id,apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/guild/:id/upgrades','id':id},doSuccess,doError);
	};
	
	/**
	 * @description Get world match ID from world ID and matches map
	 * @param {number} id - World ID
	 * @param {object} matches - Matches object
	 * @param {number} version - API version (1|2)
	 * @returns {string} Match ID
	 */
	this.getHomeWorldMatchID = function(id,matches,version) {
		if (typeof version != 'number') version = 1;
		var matchID = false;
		switch (version) {
			case 1:
				for (var key in matches) {
					if (matches[key]['red_world_id'] == id || matches[key]['green_world_id'] == id || matches[key]['blue_world_id'] == id) {
						matchID = key;
						break;
					}
				}
			break;
			case 2:
				for (var key in matches) {
					if (matches[key].worlds.red == id || matches[key].worlds.green == id || matches[key].worlds.blue == id) {
						matchID = matches[key].id;
						break;
					}
				}
			break;
		}
		return matchID;
	};
	
	/**
	 * @description Get world name from world ID and worlds map
	 * @param {number} id - World ID
	 * @param {object} worlds - Worlds object
	 * @returns {string|boolean} World name or false
	 */
	this.getHomeWorldName = function(id,worlds) {
		if (typeof id == 'undefined') return false;
		if (typeof worlds == 'undefined') return false;
		if (typeof worlds[id]['name'] != 'undefined') return worlds[id]['name'];
		else return false;
	};
	
	/**
	 * @description Get item object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/item_details}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/items}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/items.js}
	 * @param {number} id - Item ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getItem = function(id,lang,doSuccess,doError,version) {
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1: _getJSON('https://api.guildwars2.com/v1/item_details.json?item_id='+id+'&lang='+lang,doSuccess,doError); break;
			case 2: return that.get({'endpoint':'/v2/items','id':id,'lang':lang},doSuccess,doError); break;
		}
		return this;
	};
	
	/**
	 * @description Get list of all item ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/items}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getItems = function(doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v1/items.json',function(data) {
			doSuccess(data['items']);
		},doError);
		return this;
	};
	
	/**
	 * @description Get item object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/items}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/items.js}
	 * @param {object|number} items - Item ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getItemsByID = function(items,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/items','ids':items,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get itemstat object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/itemstats}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/itemstats.js}
	 * @param {number} id - Itemstat ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getItemstat = function(id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/itemstats','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all itemstat ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/itemstats}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/itemstats.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getItemstats = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/itemstats'},doSuccess,doError);
	};
	
	/**
	 * @description Get itemstat object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/itemstats}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/itemstats.js}
	 * @param {object|number} ids - Itemstat ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getItemstatsByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/itemstats','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get legend by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/legends}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/legends.js}
	 * @param {number} id - Legend ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getLegend = function(id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/legends','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all legend ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/legends}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/legends.js}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getLegends = function(lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/legends','lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of legend objects by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/legends}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/legends.js}
	 * @param {object|string} ids - List of legend ID's
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getLegendsByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/legends','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get map object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/maps}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/maps}
	 * @param {number} id - Item ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMap = function(id,lang,doSuccess,doError,version) {
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1:
				_getJSON('https://api.guildwars2.com/v1/maps.json?map_id='+id+'&lang='+lang,function(data) {
					doSuccess(data['maps'][id+'']);
				},doError);
			break;
			case 2:
				return that.get({'endpoint':'/v2/maps','id':id,'lang':lang},doSuccess,doError);
			break;
		}
		return this;
	};
	
	/**
	 * @description Get all maps or list of all map ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/maps}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/maps}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMaps = function(lang,doSuccess,doError,version) {
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1:
				_getJSON('https://api.guildwars2.com/v1/maps.json?lang='+lang,function(data) {
					doSuccess(data['maps']);
				},doError);
			break;
			case 2:
				return that.get({'endpoint':'/v2/maps','lang':lang},doSuccess,doError);
			break;
		}
		return this;
	};
	
	/**
	 * @description Get map object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/maps}
	 * @param {object|number} maps - Map ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMapsByID = function(maps,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/maps','ids':maps,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get map floor object by continent ID and floor ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/map_floor}
	 * @param {number} id - Map ID
	 * @param {number} floor - Floor ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMapFloor = function(id,floor,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v1/map_floor.json?continent_id='+id+'&floor='+floor+'&lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get object of all map names
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/map_names}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMapNames = function(lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v1/map_names.json?lang='+lang,function(data) {
			var optimized = {};
			for (var i = 0; i < data.length; i++) optimized[data[i]['id']] = data[i]['name'];
			doSuccess(optimized);
		},doError);
		return this;
	};
	
	/**
	 * @description Get match object (Directly extracts match object from matches object)
	 * @param {number} id - Match ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMatch = function(id,doSuccess,doError) {
		this.getMatches(function(data) {
			if (typeof data[id] == 'undefined') doError(404,'ID not found!',{'id':'id','data':data});
			else doSuccess(data[id]);
		},doError);
		return this;
	};
	
	/**
	 * @description Get map of all matches
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/wvw/matches}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMatches = function(doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v1/wvw/matches.json',function(data) {
			var optimized = {};
			var matches = data['wvw_matches'];
			for (var i = 0; i < matches.length; i++) optimized[matches[i]['wvw_match_id']] = matches[i];
			doSuccess(optimized);
		},doError);
		return this;
	};
	
	/**
	 * @description Get match details object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/wvw/match_details}
	 * @param {number} id - Match ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMatchDetails = function(id,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v1/wvw/match_details.json?match_id='+id,doSuccess,doError);
		return this;
		
	};
	
	/**
	 * @description Get material object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/materials}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/materials.js}
	 * @param {number} id - Material ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMaterial = function(id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/materials','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all material ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/materials}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/materials.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMaterials = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/materials'},doSuccess,doError);
	};
	
	/**
	 * @description Get material object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/materials}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/materials.js}
	 * @param {object|number} materials - Material ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMaterialsByID = function(materials,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/materials','ids':materials,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get mini by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/minis}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/minis.js}
	 * @param {number} id - Mini ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMini = function(id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/minis','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all mini ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/minis}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/minis.js}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMinis = function(lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/minis','lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of mini objects by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/minis}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/minis.js}
	 * @param {object|string} ids - List of mini ID's
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMinisByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/minis','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get map of all objective names
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/wvw/objective_names}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getObjectiveNames = function(lang,doSuccess,doError) {
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v1/wvw/objective_names.json?lang='+lang,function(data) {
			var optimized = {};
			for (var i = 0; i < data.length; i++) optimized[data[i]['id']] = data[i]['name'];
			doSuccess(optimized);
		},doError);
		return this;
	};
	
	/**
	 * @description Get outfit by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/outfits}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/outfits.js}
	 * @param {number} id - Outfit ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getOutfit = function(id,lang,doSuccess,doError,version) {
		return that.get({'endpoint':'/v2/outfits','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of outfit ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/outfits}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/outfits.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getOutfits = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/outfits'},doSuccess,doError);
	};
	
	/**
	 * @description Get outfit object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/outfits}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/outfits.js}
	 * @param {object|number} ids - Outfit object ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getOutfitsByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/outfits','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get ranger pet by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pets}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/pets.js}
	 * @param {number} id - Pet ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPet = function(id,lang,doSuccess,doError,version) {
		return that.get({'endpoint':'/v2/pets','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of ranger pet ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pets}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/pets.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPets = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/pets'},doSuccess,doError);
	};
	
	/**
	 * @description Get ranger pet object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pets}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/pets.js}
	 * @param {object|number} ids - Pet object ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPetsByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/pets','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get profession by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/professions}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/professions.js}
	 * @param {number} id - Profession ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getProfession = function(id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/professions','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all profession ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/professions}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/professions.js}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getProfessions = function(lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/professions','lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of profession objects by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/professions}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/professions.js}
	 * @param {object|string} ids - List of profession ID's
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getProfessionsByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/professions','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get PVP amulet by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/amulets}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/pvp/amulets.js}
	 * @param {number} id - PVP amulet ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpAmulet = function(id,lang,doSuccess,doError,version) {
		return that.get({'endpoint':'/v2/pvp/amulets','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get PVP amulets from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/amulets}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/pvp/amulets.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpAmulets = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/pvp/amulets'},doSuccess,doError);
	};
	
	/**
	 * @description Get pvp amulet object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/amulets}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/pvp/amulets.js}
	 * @param {object|number} ids - Amulet object ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpAmuletsByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/pvp/amulets','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get PVP game by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/games}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/pvp/games.js}
	 * @param {number} id - PVP game ID
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpGame = function(id,apiKey,doSuccess,doError,version) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/pvp/games','id':id},doSuccess,doError);
	};
	
	/**
	 * @description Get PVP games from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/games}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/pvp/games.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpGames = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/pvp/games'},doSuccess,doError);
	};
	
	/**
	 * @description Get pvp game object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/games}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/pvp/games.js}
	 * @param {object|number} games - Game object ID(s)
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpGamesByID = function(games,apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/pvp/games','ids':games},doSuccess,doError);
	};
	
	/**
	 * @description Get PVP season by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/seasons}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/pvp/seasons.js}
	 * @param {number} id - PVP season ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpSeason = function(id,lang,doSuccess,doError,version) {
		return that.get({'endpoint':'/v2/pvp/seasons','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of PVP season ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/seasons}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/pvp/seasons.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpSeasons = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/pvp/seasons'},doSuccess,doError);
	};
	
	/**
	 * @description Get pvp season object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/seasons}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/pvp/seasons.js}
	 * @param {object|number} ids - Season object ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpSeasonsByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/pvp/seasons','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get PVP standings from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/standings}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/pvp/standings.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpStandings = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/pvp/standings'},doSuccess,doError);
	};
	
	/**
	 * @description Get PVP stats from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/stats}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/pvp/stats.js}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpStats = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/pvp/stats'},doSuccess,doError);
	};
	
	/**
	 * @description Get Quaggan object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/quaggans}
	 * @param {number} id - Quaggan ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getQuaggan = function(id,doSuccess,doError) {
		return that.get({'endpoint':'/v2/quaggans','id':id},doSuccess,doError);
	};
	
	/**
	 * @description Get map of all Quaggan image ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/quaggans}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getQuaggans = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/quaggans'},doSuccess,doError);
	};
	
	/**
	 * @description Get quaggan resource object(s) by ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/quaggans}
	 * @param {object|string} quaggans - Quaggan ID(s)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getQuaggansByID = function(quaggans,doSuccess,doError) {
		return that.get({'endpoint':'/v2/quaggans','ids':quaggans},doSuccess,doError);
	};
	
	/**
	 * @description Get recipe object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/recipe_details}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/recipes}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/recipes.js}
	 * @param {number} id - Recipe ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getRecipe = function(id,lang,doSuccess,doError,version) {
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1: _getJSON('https://api.guildwars2.com/v1/recipe_details.json?recipe_id='+id+'&lang='+lang,doSuccess,doError); break;
			case 2: return that.get({'endpoint':'/v2/recipes','id':id,'lang':lang},doSuccess,doError); break;
		}
		return this;
	};
	
	/**
	 * @description Get list of recipe ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/recipes}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/recipes.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getRecipes = function(doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v1/recipes.json',function(data) {
			doSuccess(data['recipes']);
		},doError);
		return this;
	};
	
	/**
	 * @description Get recipe object(s) by ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/recipes}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/recipes.js}
	 * @param {object|number} recipes - Recipe ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getRecipesByID = function(recipes,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/recipes','ids':recipes,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get recipe search result object based on method and ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/recipes/search}
	 * @param {string} method - Search method (input|output)
	 * @param {number} id - Item ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getRecipeSearch = function(method,id,lang,doSuccess,doError) {
		switch (method) {
			case 'input': return that.get({'endpoint':'/v2/recipes/search','input':id,'lang':lang},doSuccess,doError); break;
			case 'output': return that.get({'endpoint':'/v2/recipes/search','output':id,'lang':lang},doSuccess,doError); break;
		}
		return this;
	};
	
	/**
	 * @description Get render URL
	 * @param {string} signature - File signature
	 * @param {number} id - File ID
	 * @param {string} format - File format
	 * @returns {string} Render URL
	 */
	this.getRenderURL = function(signature,id,format) {
		if (typeof signature != 'string') return '';
		if (typeof id != 'number') return '';
		if (typeof format != 'string') return '';
		return 'https://render.guildwars2.com/file/'+signature+'/'+id+'.'+format;
	};
	
	/**
	 * @description Get skill by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/skills}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/skills/skills.js}
	 * @param {number} id - Skill ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSkill = function(id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/skills','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all skill ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/skills}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/skills/skills.js}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSkills = function(lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/skills','lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of skill objects by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/skills}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/skills/skills.js}
	 * @param {object|string} ids - List of skill ID's
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSkillsByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/skills','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get skin object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/skin_details}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/skins}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/skins.js}
	 * @param {number} id - Skin ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSkin = function(id,lang,doSuccess,doError,version) {
		switch (version) {
			case 1: _getJSON('https://api.guildwars2.com/v1/skin_details.json?skin_id='+id+'&lang='+lang,doSuccess,doError); break;
			case 2: return that.get({'endpoint':'/v2/skins','id':id,'lang':lang},doSuccess,doError); break;
		}
		return this;
	};
	
	/**
	 * @description Get list of all skin ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/skins}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/skins}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/skins.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSkins = function(doSuccess,doError,version) {
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1:
				_getJSON('https://api.guildwars2.com/v1/skins.json',function(data) {
					doSuccess(data['skins']);
				},doError);
			break;
			case 2:
				return that.get({'endpoint':'/v2/skins'},doSuccess,doError);
			break;
		}
		return this;
	};
	
	/**
	 * @description Get skin object(s) by ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/skins}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/skins}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/skins.js}
	 * @param {object|number} id - Skin ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSkinsByID = function(skins,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/skins','ids':skins,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get specialization by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/specializations}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/specializations/specializations.js}
	 * @param {number} id - Specialization ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSpecialization = function(id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/specializations','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of specialization ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/specializations}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/specializations/specializations.js}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSpecializations = function(lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/specializations','lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get specialization object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/specializations}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/specializations/specializations.js}
	 * @param {object|string} specializations - Array of specialization ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSpecializationsByID = function(specializations,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/specializations','ids':specializations,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get story by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/stories}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/stories/index.js}
	 * @param {number} id - Story ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getStory = function(id,lang,doSuccess,doError,version) {
		return that.get({'endpoint':'/v2/stories','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of story ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/stories}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/stories/index.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getStories = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/stories'},doSuccess,doError);
	};
	
	/**
	 * @description Get story object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/stories}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/stories/index.js}
	 * @param {object|number} ids - Story object ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getStoriesByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/stories','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get story season by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/stories/seasons}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/stories/seasons.js}
	 * @param {number} id - Season ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getStorySeason = function(id,lang,doSuccess,doError,version) {
		return that.get({'endpoint':'/v2/stories/seasons','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of story season ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/stories/seasons}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/stories/seasons.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getStorySeasons = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/stories/seasons'},doSuccess,doError);
	};
	
	/**
	 * @description Get story season object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/stories/seasons}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/stories/seasons.js}
	 * @param {object|number} ids - Story object ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getStorySeasonsByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/stories/seasons','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get tile URL
	 * @param {number} id - Tile ID
	 * @param {number} floor - Floor ID
	 * @param {number} zoom - Zoom factor
	 * @param {number} x - X coordinate
	 * @param {number} y - Y coordinate
	 * @param {number} alias - Domain alias
	 * @returns {string} Tile URL
	 */
	this.getTileURL = function(id,floor,zoom,x,y,alias) {
		if (typeof id != 'number') return '';
		if (typeof floor != 'number') floor = 1;
		if (typeof zoom != 'number') zoom = 1;
		if (typeof x != 'number') x = 1;
		if (typeof y != 'number') y = 1;
		if (typeof alias != 'number' || parseInt(alias) < 1) alias = '';
		return 'https://tiles'+alias+'.guildwars2.com/'+id+'/'+floor+'/'+zoom+'/'+x+'/'+y+'.jpg';
	};
	
	/**
	 * @description Get title by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/titles}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/titles.js}
	 * @param {number} id - Title ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTitle = function(id,lang,doSuccess,doError,version) {
		return that.get({'endpoint':'/v2/titles','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of title ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/titles}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/titles.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTitles = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/titles'},doSuccess,doError);
	};
	
	/**
	 * @description Get title object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/titles}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/titles.js}
	 * @param {object|number} ids - Title object ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTitlesByID = function(ids,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/titles','ids':ids,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get token info object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/tokeninfo}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/tokeninfo/tokeninfo.js}
	 * @param {string} apiKey - API key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTokeninfo = function(apiKey,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/tokeninfo'},doSuccess,doError);
	};
	
	/**
	 * @description Get trade listing object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/commerce/listings}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/commerce/listings.js}
	 * @param {number} id - Trade listing ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTradeListing = function(id,doSuccess,doError) {
		return that.get({'endpoint':'/v2/commerce/listings','id':id},doSuccess,doError);
	};
	
	/**
	 * @description Get trade listing map by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/commerce/listings}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/commerce/listings.js}
	 * @param {object|number} items - Item ID(s)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTradeListings = function(items,doSuccess,doError) {
		return that.get({'endpoint':'/v2/commerce/listings','ids':items},doSuccess,doError);
	};
	
	/**
	 * @description Get trade price object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/commerce/prices}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/commerce/prices.js}
	 * @param {number} id - Item ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTradePrice = function(id,doSuccess,doError) {
		return that.get({'endpoint':'/v2/commerce/prices','id':id},doSuccess,doError);
	};
	
	/**
	 * @description Get trade prices map by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/commerce/prices}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/commerce/prices.js}
	 * @param {object|number} items - Item ID(s)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTradePrices = function(items,doSuccess,doError) {
		return that.get({'endpoint':'/v2/commerce/prices','ids':items},doSuccess,doError);
	};
	
	/**
	 * @description Get trade transactions map by category and type
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/commerce/transactions}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/commerce/transactions/transactions.js}
	 * @param {string} apiKey - API key
	 * @param {string} category - Transaction category (current|history)
	 * @param {string} type - Transaction type (buy|sell)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTradeTransactions = function(apiKey,category,type,doSuccess,doError) {
		return that.get({'apiKey':apiKey,'endpoint':'/v2/commerce/transactions'+(!category?'':'/'+category)+(!type?'':'/'+type),'page':0,'pageSize':200},doSuccess,doError);
	}
	
	/**
	 * @description Get trait by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/traits}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/traits/traits.md}
	 * @param {number} id - Trait ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTrait = function(id,lang,doSuccess,doError,version) {
		return that.get({'endpoint':'/v2/traits','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of trait ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/traits}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/traits/traits.md}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTraits = function(lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/traits','lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get trait object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/traits}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/traits/traits.md}
	 * @param {object|string} traits - Array of trait ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTraitsByID = function(traits,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/traits','ids':traits,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get world object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/worlds}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/worlds.js}
	 * @param {number} id - World ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWorld = function(id,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/worlds','id':id,'lang':lang},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all world ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/worlds}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/worlds.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWorlds = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/worlds'},doSuccess,doError);
	};
	
	/**
	 * @description Get map of worlds by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/worlds}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/worlds.js}
	 * @param {object} worlds - List of world ID's
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWorldsByID = function(worlds,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/worlds','ids':worlds,'lang':lang},function(data) {
			var optimized = {};
			for (var key in data) optimized[data[key]['id']] = data[key];
			doSuccess(optimized);
		},doError);
	};
	
	/**
	 * @description Get map of worlds by page
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/worlds}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/worlds.js}
	 * @param {number} page - Page number
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWorldsByPage = function(page,lang,doSuccess,doError) {
		return that.get({'endpoint':'/v2/worlds','page':page,'lang':lang},function(data) {
			var optimized = {};
			for (var key in data) optimized[data[key]['id']] = data[key];
			doSuccess(optimized);
		},doError);
	};
	
	/**
	 * @description Get map of world names
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/world_names}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWorldNames = function(lang,doSuccess,doError) {
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v1/world_names.json?lang='+lang,function(data) {
			var optimized = {};
			for (var i = 0; i < data.length; i++) optimized[data[i]['id']] = data[i]['name'];
			doSuccess(optimized);
		},doError);
		return this;
	};
	
	/**
	 * @description Get wvw match object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/wvw/matches}
	 * @see {https://github.com/arenanet/api-cdi/blob/master/v2/wvw/matches.json}
	 * @param {number} id - WvW match ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWvWMatch = function(id,doSuccess,doError) {
		if (typeof id == 'number') return that.get({'endpoint':'/v2/wvw/matches','world':id},doSuccess,doError);
		else if (typeof id == 'string') return that.get({'endpoint':'/v2/wvw/matches','id':id},doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of all wvw match ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/wvw/matches}
	 * @see {https://github.com/arenanet/api-cdi/blob/master/v2/wvw/matches.json}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWvWMatches = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/wvw/matches'},doSuccess,doError);
	};
	
	/**
	 * @description Get wvw match object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/wvw/matches}
	 * @see {https://github.com/arenanet/api-cdi/blob/master/v2/wvw/matches.json}
	 * @param {object|number} ids - WvW match ID(s)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWvWMatchesByID = function(ids,doSuccess,doError) {
		return that.get({'endpoint':'/v2/wvw/matches','ids':ids},doSuccess,doError);
	};
	
	/**
	 * @description Get wvw objectives object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/wvw/objectives}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/wvw/objectives.js}
	 * @param {number} id - WvW objectives ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWvWObjective = function(id,doSuccess,doError) {
		return that.get({'endpoint':'/v2/wvw/objectives','id':id},doSuccess,doError);
	};
	
	/**
	 * @description Get list of all wvw objectives ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/wvw/objectives}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/wvw/objectives.js}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWvWObjectives = function(doSuccess,doError) {
		return that.get({'endpoint':'/v2/wvw/objectives'},doSuccess,doError);
	};
	
	/**
	 * @description Get wvw objectives object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/wvw/objectives}
	 * @see {@link https://github.com/arenanet/api-cdi/blob/master/v2/wvw/objectives.js}
	 * @param {object|number} ids - WvW objectives ID(s)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWvWObjectivesByID = function(ids,doSuccess,doError) {
		return that.get({'endpoint':'/v2/wvw/objectives','ids':ids},doSuccess,doError);
	};
	
	/**
	 * @description Stringify array
	 * @param {object} array - The array
	 * @returns {string} Stringified array
	 */
	this.stringifyArray = function(array) {
		if (typeof array == 'undefined') return '';
		if (typeof array == 'string') return array;
		if (typeof array != 'object') return array;
		var ids = '';
		for (var i = 0; i < array.length; i++) ids += ','+encodeURI(array[i]);
		return ids.substr(1);
	};
	
	/**
	 * @description Convert number to object for gold, silver and copper 
	 * @param {number} n - The number
	 * @returns {object} Object with gold, silver and copper values
	 */
	this.toCoins = function(n) {
		n = n || 0;
		var c = n % 100;
		n = (n - c) / 100;
		var s = n % 100;
		var g = (n - s) / 100;
		return {'copper':c,'silver':s,'gold':g};
	};
	
	/**
	 * @description Convert number to HTML code for gold, silver and copper 
	 * @param {number} n - The number
	 * @param {object} c - Image configuration
	 * @returns {string} HTML code to display coins
	 */
	this.toHTMLCoins = function(n,c) {
		n = n || 0;
		c = c || {};
		c.gold = c.gold || FW_GW2$ImageData.gold;
		c.silver = c.silver || FW_GW2$ImageData.silver;
		c.copper = c.copper || FW_GW2$ImageData.copper;
		var money = this.toCoins(n);
		var output = '<span class="money">';
		if (money['gold'] > 0) output += '<span class="gold">'+money['gold']+'<img width="10" height="10" alt="Gold" src="'+c.gold+'"/></span> ';
		if (money['gold'] > 0 || money['silver'] > 0) output += '<span class="silver">'+money['silver']+'<img width="10" height="10" alt="Silver" src="'+c.silver+'"/></span> ';
		output += '<span class="copper">'+money['copper']+'<img width="10" height="10" alt="Copper" src="'+c.copper+'"/></span>';
		output += '</span>';
		return output;
	};
	
	/**
	 * @description Convert number to HTML code for gems
	 * @param {number} n - The number
	 * @param {object} c - Image configuration
	 * @returns {string} HTML code to display gems
	 */
	this.toHTMLGems = function(n,c) {
		n = n || 0;
		c = c || {};
		c.gem = c.gem || FW_GW2$ImageData.gem;
		return '<span class="gems">'+n+'<img width="12" height="11" alt="Gems" src="'+c.gem+'"/></span>';
	};
	
	/**
	 * @description Convert numbers of gold, silver and copper to one number value
	 * @param {number} g - Amount of gold
	 * @param {number} s - Amount of silver
	 * @param {number} c - Amount of copper
	 * @returns {number} The integer of gold, silver and copper values
	 */
	this.toInteger = function(g,s,c) {
		g = g || 0;
		s = s || 0;
		c = c || 0;
		var n = 0;
		n += c;
		n += (s*100);
		n += (g*10000);
		return n;
	};
};

module.exports = FW_GW2;