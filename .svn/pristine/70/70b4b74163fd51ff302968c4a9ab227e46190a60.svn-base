var vm = new Vue({
	el: '#app',
	data () {
		this.lineExtend = {
	        series: {
	          label: {
	            normal: {
	              show: true
	            }
	          }
	        }
	    }
		this.chartLineSettings = {
			stack: { '用户': ['访问用户', '下单用户'] },
//      	area: true,//堆叠色
//      	axisSite: { right: ['下单率'] },
//	        yAxisType: ['KMB', 'percent'],
//	        yAxisName: ['数值', '比率']
//			dimension:'日期',//维度
//			metrics:'访问用户'//指标
		}
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
	    	cityName:'',
			acc_volum:null,
			chartLine1Data: {//进库分析折线数据
	    		columns: ['日期', '访问用户', '下单用户', '下单率'],
		        rows: [
		            { '日期': '', '访问用户': 0, '下单用户': 0, '下单率': 0 },
		            { '日期': '1/1', '访问用户': 100, '下单用户': 1400, '下单率': 0.32 },
		            { '日期': '1/2', '访问用户': 200, '下单用户': 1500, '下单率': 0.26 }
	        	]
			},
			chartLine2Data: {//出库分析折线数据
	    		columns: ['日期', '访问用户', '下单用户', '下单率'],
		        rows: [
		            { '日期': '', '访问用户': 0, '下单用户': 0, '下单率': 0 },
		            { '日期': '1/1', '访问用户': 100, '下单用户': 1400, '下单率': 0.32 },
		            { '日期': '1/2', '访问用户': 200, '下单用户': 1500, '下单率': 0.26 }
	        	]
			},
			chartPie1Data: {
	    		columns: ['日期', '访问用户'],
		        rows: []
			},
			chartPie2Data: {
	    		columns: ['日期', '访问用户'],
		        rows: []
			},
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
		afterLineConfig (options) {
			console.log(options)
			var legend = options.legend;//维度指标调整
			var series = options.series;//对象调整  折线图
			var xAxis = options.xAxis;//圆饼调整
			var yAxis = options.yAxis;//圆饼调整
			
			legend.type = 'scroll';
			legend.textStyle = {color:'#FFF'};//方块按钮文字颜色
			xAxis.forEach(function (value) {  
				value.axisLine = { lineStyle:{color:'#FFF'}};
			}); 
			yAxis.forEach(function (value) {  
				value.axisLine = { lineStyle:{color:'#FFF'}};
			});
			
			options.legend = legend;
			return options;
		},
		afterPieConfig (options) {
			var legend = options.legend;//维度指标调整
			var series = options.series;//对象调整  圆饼
			
			legend.type = 'scroll';
			legend.textStyle = {color:'#FFF'}//方块按钮文字颜色

			series.forEach(function (value) {  
				value.name = '用户数据';
				value.radius = '70%';//大小
				value.center = ['50%', '60%'];//位置
			});
			
			options.legend = legend;
			options.series = series;
			return options;
		},
		interval: function(options) {
			$.each(options, function(key, value) {
				setInterval(value.exec, value.time);
			});
		},
		initData: function() {
			this.memberNum();
			this.AccVolum();
			this.AnalysisInout();
//			this.Vehicle();
			this.interval({//定时任务
				refreshDateTime: {//每秒刷新时间
					exec: this.refreshDateTime,
					time: 1000
				},
				memberNum: {//每分钟刷新接口
					exec: this.memberNum,
					time: 60000
				},
				AccVolum: {//每分钟刷新接口
					exec: this.AccVolum,
					time: 600*1000
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
		AccVolum: function(){
			var vm = this;
			index2Module.AccVolum({}, function(res) {
				$.each(res,function(key,value){
					res[key] = String(parseInt(value));
				})
				vm.acc_volum = res;
			});
		},
		AnalysisInout: function(){
			var vm = this;
			index2Module.AnalysisInout({}, function(res) {
				console.log(res)
			});
		},
		Vehicle: function(){
			var vm = this;
			index2Module.Vehicle({}, function(res) {
				console.log(res)
			});
		}
	},
	filters:{
		animateNumbak: function(value,e){//暂时作废
			console.log(value)
			console.log(e)
			obj.animate({
				backgroundPosition: '(0 ' + String(-parseInt(value) * 58) + 'px)'
			}, 'slow', 'swing', function() {});
		},
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
	},
	watch: {
	    acc_volum: function (val) {
	    	var vm = this;
		    $.each(val,function(key,value){
		      	$.each(vm.$refs[String(key)],function(index,item){//渲染数字动画效果
		      		var num = String(value).charAt(index);
		      		var y = -parseInt(num) * 58;
		      		$(item).animate({
						backgroundPosition: '(0 ' + String(y) + 'px)'
					}, 'slow', 'swing', function() {});
		    	});
		    });
	    }
	}
});