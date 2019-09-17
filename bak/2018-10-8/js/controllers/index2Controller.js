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
		
	    return {
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
		            { '日期': '1/1', '访问用户': 100 },
		            { '日期': '1/2', '访问用户': 200 },
		            { '日期': '1/3', '访问用户': 300 },
		            { '日期': '1/4', '访问用户': 400 },
		            { '日期': '1/5', '访问用户': 500 },
		            { '日期': '1/6', '访问用户': 600 },
		            { '日期': '1/7', '访问用户': 700 },
		            { '日期': '1/8', '访问用户': 800 },
		            { '日期': '1/9', '访问用户': 900 },
		            { '日期': '1/10', '访问用户': 1000 },
		            { '日期': '1/11', '访问用户': 1100 },
		            { '日期': '1/12', '访问用户': 1200 },
		            { '日期': '1/13', '访问用户': 1300 },
		            { '日期': '1/14', '访问用户': 1400 },
		            { '日期': '1/15', '访问用户': 1500 },
		            { '日期': '1/16', '访问用户': 1600 },
		            { '日期': '1/17', '访问用户': 1700 },
		            { '日期': '1/18', '访问用户': 1800 },
		            { '日期': '1/19', '访问用户': 1900 },
		            { '日期': '1/20', '访问用户': 2000 },
		            { '日期': '1/21', '访问用户': 2100 },
		            { '日期': '1/22', '访问用户': 2200 },
		            { '日期': '1/23', '访问用户': 2300 },
		            { '日期': '1/24', '访问用户': 2400 },
		            { '日期': '1/25', '访问用户': 2500 }
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
			this.AccVolum();
			this.AnalysisInout();
//			this.Vehicle();
			this.interval({//定时任务
				AccVolum: {//每分钟刷新接口
					exec: this.AccVolum,
					time: 600*1000
				},
			})
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
		},
		lineResultFormat:function(res){
			var result = {};
			var temp = {};
			res = typeof(res) == "Array" ? res : new Array(res);
			$.each(res,function(key,value){
				
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