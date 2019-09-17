var index2Module = (function(mod){
	mod.AccVolum = function(post, callback) {
//		return callback({
//			yrk:Date.now().toString().substr(5,11),
//			yck:Date.now().toString().substr(8,11),
//			drk:Date.now().toString().substr(7,11),
//			dck:Date.now().toString().substr(6,10),
//			dzk:Date.now().toString().substr(9,11)
//		});
		sw_get("/Chart/AccVolum", post, function(res){
			return callback(res.data);
		});
	}
	mod.Member_num = function(post, callback) {
		sw_post("/Map/Member_num", post, function(res){
			return callback(res.data);
		});
	}
	mod.AnalysisInout = function(post, callback) {//出入库分析(折线图表)
		sw_post("Chart/AnalysisInout", post, function(res){
			return callback(res.data);
		});
	}
	mod.Vehicle = function(post, callback) {//车辆统计
		sw_post("Chart/Vehicle", post, function(res){
			return callback(res.data);
		});
	}
	
	return mod;
})(window.index2Module || {});
