var vm = new Vue({
	el: '#app',
	data () {
		this.chartPieSettings = {
			dimension:'日期',//维度
			metrics:'访问用户'//指标
	    }
		this.chartMapSettings = {
			position: 'china',
			dimension: '位置',
        	metrics: ['位置', '税收', '人口', '面积'],
	        // selectData: true,
	        selectedMode: 'multiple'
	    }
		this.chartMapEvents = {
	        click: (v) => {
	          this.cityName = v.name
	        }
	    }
	    return {
	    	dateTime:null,
			Member_num: null,
			car_sum:null,
			zaitu_sum:null,
			qty_num:null,
			volume_num:null,
			cityName:'',
	    	chartPieData: {
	    		columns: ['日期', '访问用户'],
		        rows: [
		            { '日期': '1/1', '访问用户': 1393 },
		            { '日期': '1/2', '访问用户': 3530 },
		            { '日期': '1/3', '访问用户': 2923 },
		            { '日期': '1/4', '访问用户': 1723 },
		            { '日期': '1/5', '访问用户': 3792 },
		            { '日期': '1/6', '访问用户': 3792 },
		            { '日期': '1/7', '访问用户': 3792 },
		            { '日期': '1/8', '访问用户': 3792 },
		            { '日期': '1/9', '访问用户': 3792 },
		            { '日期': '1/10', '访问用户': 3792 },
		            { '日期': '1/11', '访问用户': 3792 },
		            { '日期': '1/12', '访问用户': 3792 },
		            { '日期': '1/13', '访问用户': 3792 },
		            { '日期': '1/14', '访问用户': 3792 },
		            { '日期': '1/15', '访问用户': 3792 },
		            { '日期': '1/16', '访问用户': 3792 },
		            { '日期': '1/17', '访问用户': 3792 },
		            { '日期': '1/18', '访问用户': 3792 },
		            { '日期': '1/19', '访问用户': 3792 },
		            { '日期': '1/20', '访问用户': 3792 },
		            { '日期': '1/21', '访问用户': 3792 },
		            { '日期': '1/22', '访问用户': 3792 },
		            { '日期': '1/23', '访问用户': 3792 },
		            { '日期': '1/24', '访问用户': 3792 },
		            { '日期': '1/25', '访问用户': 4593 }
		        ]
		    },
		    chartMapData: {
	          columns: ['位置', '税收', '人口', '面积'],
	          rows: [
	          	{ '位置': '吉林', '税收': 123, '人口': 123, '面积': 92134 },
	            { '位置': '北京', '税收': 1223, '人口': 2123, '面积': 29234 },
	            { '位置': '上海', '税收': 2123, '人口': 1243, '面积': 94234 },
	            { '位置': '浙江', '税收': 4123, '人口': 5123, '面积': 29234 }
	          ]
	        }
	    }
	},
	created: function() {
		var vm = this;
		vm.initData();
	},
	methods: {
		afterPieConfig (options) {
			var legend = options.legend;//维度指标调整
			var series = options.series;//圆饼调整
			
			legend.type = 'scroll';
			legend.textStyle = {color:'#FFF'}//方块按钮文字颜色
			if(typeof(series) == "Array"){
				series.forEach(function (value) {  
					value.name = '用户数据';
					value.radius = '100%';//大小
					value.center = ['50%', '50%'];//位置
				});
			}else{
				series.name = '用户数据';
				series.radius = '100%';//大小
				series.center = ['50%', '50%'];//位置
			}
			
			options.legend = legend;
			options.series = series;
			return options;
		},
		afterMapConfig:function(options){
			var legend = options.legend;//维度指标调整
			
			legend.type = 'scroll';
			legend.textStyle = {color:'#FFF'}//方块按钮文字颜色
			
			options.legend = legend;
			return options;
		},
		interval: function(options) {
			$.each(options, function(key, value) {
				setInterval(value.exec, value.time);
			});
		},
		initData: function() {
			this.memberNum();
			this.carsum();
			this.zaitusum();
			this.qtyNum();
			this.volumeNum();
			this.initcharts();
			this.interval({//定时任务
				refreshDateTime: {//每秒刷新时间
					exec: this.refreshDateTime,
					time: 1000
				},
				memberNum: {//每分钟刷新接口
					exec: this.memberNum,
					time: 60000
				},
				carsum: {//每分钟刷新接口
					exec: this.carsum,
					time: 1000
				},
				zaitusum: {//每分钟刷新接口
					exec: this.zaitusum,
					time: 2000
				},
				qtyNum: {//每分钟刷新接口
					exec: this.qtyNum,
					time: 1000
				},
				volumeNum: {//每分钟刷新接口
					exec: this.volumeNum,
					time: 1000
				},
			})
		},
		refreshDateTime:function(){
			this.dateTime = Date.now();
		},
		memberNum: function() {
			var vm = this;
			indexModule.Member_num({}, function(res) {
				vm.Member_num = res;
			});
		},
		carsum: function(){
			var vm = this;
			indexModule.car_sum({}, function(res) {
				vm.car_sum = res;
			});
		},
		zaitusum: function(){
			var vm = this;
			indexModule.zaitu_sum({}, function(res) {
				vm.zaitu_sum = res;
			});
		},
		qtyNum: function(){
			var vm = this;
			indexModule.qty_num({}, function(res) {
				vm.qty_num = res;
			});
		},
		volumeNum: function(){
			var vm = this;
			indexModule.volume_num({}, function(res) {
				vm.volume_num = res;
			});
		},
		initcharts: function(){
//			console.log(chart1)
//			chart1();
		}
	},
	filters: {
		userInfoProportion: function(value, all_count) {
			var vm = this;
			if(!value) return '';
			value = parseInt(value);
			return((value / all_count) * 100).toFixed(2);
		}
	},
	computed: {
		now: function() {
			return Date.now();
		}
	}
});