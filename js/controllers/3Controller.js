var vm = new Vue({
	el: '#app',
	data () {
		this.lineDataZoom = false ? [{startValue: '09.30'},{type: 'slider',start: 0,end: 20 }] : [];
		this.lineExtend = {series: {label: { normal: { show: true } } } }
		this.chartLineSettings = {labelMap: {'axisY': '方量'}}
		this.chartPieColors = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
		this.chartPieSettings = {
			title:'',dimension:'name',metrics:'percent'//抬头,维度,指标
		}
//		this.dataZoom: [{
//          startValue: '2014-06-01'
//      	}, {
//          type: 'inside'
//      }],
	    return {
			vehicle_data:{onway_truck: "0",onway_volume: "0",truck: "0",y_truck: "0",y_volume: "0"},
			//进库分析饼图数据
			chartLine1Data: {columns: ['axisX', 'axisY'],rows: []},
			//出库分析饼图数据
			chartLine2Data: {columns: ['axisX', 'axisY'],rows: []},
			//进库分析饼图数据
			chartPie1Data: {columns: ['name', 'percent'],rows: []},
			//出库分析饼图数据
			chartPie2Data: {columns: ['name', 'percent'],rows: []}
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
			
			legend.show = false;//隐藏标签lebel
			legend.type = 'scroll';
			legend.textStyle = {color:'#FFF'};//方块按钮文字颜色
			xAxis.forEach(function (value) { value.axisLine = {lineStyle:{color:'#FFF'}}; }); 
			yAxis.forEach(function (value) { value.axisLine = {lineStyle:{color:'#FFF'}}; });
			
			options.legend = legend;
			return options;
		},
		afterPieConfig (options) {
			var legend = options.legend;//维度指标调整
			var series = options.series;//对象调整  圆饼
			
			legend.show = false;
			legend.type = 'scroll';
			legend.textStyle = {color:'#FFF'}//方块按钮文字颜色

			series.forEach(function (value) {  
				value.name = '用户数据';
				value.radius = '75%';//大小
				value.center = ['50%', '55%'];//位置
				value.label = {//饼图图形上的文本标签
                    normal:{
                        show:true,
//                      position:'inner', //标签的位置 inner饼内
                        formatter:'{b}-{d}%',
                        //文字的字体大小
                        textStyle : { fontWeight : 300 , fontSize : 16 }
                    }
				}
				//饼图图形上的鼠标悬浮标签
				value.tooltip = {formatter:'{b}-{d}%'}
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
			var vm = this;
			vm.AnalysisInout();
			vm.PnameInout();
			vm.Vehicle();
			vm.interval({//定时任务
				AnalysisInout: {//每分钟刷新接口 出入库折线图数据
					exec: vm.AnalysisInout,
					time: 60*1000*60
				},
				PnameInout: {//每分钟刷新接口 出入库饼形图数据
					exec: vm.PnameInout,
					time: 60*1000*60
				},
				Vehicle: {//每分钟刷新接口 车辆和在途信息
					exec: vm.Vehicle,
					time: 20*1000
				}
			})
		},
		Vehicle: function(){
			var vm = this;
			indexModule.Vehicle({}, function(res) {
				$.each(res,function(key,value){
					res[key] = String(parseInt(value));
				})
				vm.vehicle_data = res;
			});
		},
		AnalysisInout: function(){
			var vm = this;
			indexModule.AnalysisInout({}, function(res) {
				$.each(res,function(key,value){
					var result = [];
					console.log(value)
					$.each(value['axisX'],function(index,val){
						value['axisX'][index] = vm.$options.filters.formatDate(val,"MM.dd");
					});
					$.each(value,function(index,val){
						result.push({field:index,data:val});
					});
					res[key] = col2row2(result);
				});
				vm.chartLine1Data.rows = res.out;
				vm.chartLine2Data.rows = res.in;
			});
		},
		PnameInout: function(){
			var vm = this;
			indexModule.PnameInout({}, function(res) {
				vm.chartPie1Data.rows = res.out;
				vm.chartPie2Data.rows = res.in;
			});
		},
	},
	watch: {
	    vehicle_data: function (val) {//渲染数字动画效果
	    	var vm = this;
	    	setTimeout(function(){
	    		$.each(val,function(key,value){
			      	$.each(vm.$refs[String(key)],function(index,item){
			      		var num = String(value).charAt(index);
			      		var y = -parseInt(num) * 58;
			      		$(item).animate({ backgroundPosition: '(0 ' + String(y) + 'px)' }, 'slow', 'swing', function() {});
			    	});
			    });
		    },500);
	    }
	}
});