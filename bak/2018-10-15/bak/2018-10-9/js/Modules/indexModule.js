var indexModule = (function(mod){
	mod.Vehicle = function(post, callback) {//车辆统计
		sw_post("Chart/Vehicle", post, function(res){
			return callback(res.data);
		});
	}
	return mod;
})(window.indexModule || {});
