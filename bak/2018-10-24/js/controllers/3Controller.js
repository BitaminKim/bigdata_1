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
			contract_data:{cy: "0",ly: "0",my: "0",ml: "0",qty: "0",volume: "0",amount: "0"},
			//折线图数据
			chartLine1Data: {columns: ['axisX', 'axisY'],rows: []},
			//折线图数据
			chartLine2Data: {columns: ['axisX', 'axisY'],rows: []},
			//饼图数据
			chartPieData: {columns: ['name', 'percent'],rows: []}
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
			vm.Contract();
			vm.interval({//定时任务
				Contract: {//每分钟刷新接口
					exec: vm.Contract,
					time: 1*1000*60
				}
			})
		},
		Contract: function(){
			var vm = this;
			indexModule.Contract({}, function(res) {
				var contract_data = {}
				$.each(res,function(key,value){
					if(typeof value == 'string'){
						contract_data[key] = String(parseInt(value));
					}
				})
				vm.contract_data = contract_data;
				console.log(vm.contract_data)
			});
		}
	},
	watch: {
	    contract_data: function (val) {//渲染数字动画效果
	    	var vm = this;
	    	console.log(vm.$refs)
			$.each(val,function(key,value){
				console.log(key +":"+value+"-"+vm.$refs[key])
		      	$.each(vm.$refs[String(key)],function(index,item){
		      		var num = String(value).charAt(index);
		      		var y = -parseInt(num) * 58;
		      		$(item).animate({ backgroundPosition: '(0 ' + String(y) + 'px)' }, 'slow', 'swing', function() {});
		    	});
		   });
		    
	    }
	}
});