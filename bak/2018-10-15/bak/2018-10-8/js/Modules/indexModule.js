var indexModule = (function(mod){
	mod.car_sum = function(post, callback) {
		return callback({sum:Date.now()});
//		sw_post("/shop/", post, function(data){
//			return callback(data);
//		});
	}
	mod.zaitu_sum = function(post, callback) {
		return callback({sum:Date.now().toString().substr(7,12)});
//		sw_post("/shop/", post, function(data){
//			return callback(data);
//		});
	}
	mod.qty_num = function(post, callback) {
		return callback({sum:Date.now().toString().substr(9,12)});
//		sw_post("/shop/", post, function(data){
//			return callback(data);
//		});
	}
	mod.volume_num = function(post, callback) {
		return callback({sum:Date.now().toString().substr(7,11)});
//		sw_post("/shop/", post, function(data){
//			return callback(data);
//		});
	}
	mod.Member_num = function(post, callback) {
		sw_post("/Map/Member_num", post, function(data){
			return callback(data);
		});
	}
	
	return mod;
})(window.indexModule || {});
