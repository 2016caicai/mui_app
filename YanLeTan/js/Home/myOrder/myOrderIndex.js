//mui.init({
//pullRefresh : {
//  container:"#item1mobile",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
//  down : {
//    height:50,//可选,默认50.触发下拉刷新拖动距离,
//    auto: true,//可选,默认false.自动下拉刷新一次
//    contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
//    contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
//    contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
//    callback :pullfunction //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
//  }
//}
//});
mui.init();
		var person=localStorage.getItem("person_ol");
      	person=JSON.parse(person);
      	mui.plusReady(function(){
      		var orderCheckall=document.getElementsByClassName("orderUl");//scroll
      		console.log(orderCheckall.length);
      		var mui_control_content=document.getElementsByClassName("mui-control-content");//tab
      		var self = plus.webview.currentWebview();
		    self.addEventListener('show',function(){
		    	mui.ajax(_config+"/doctor/getOrderByState",{
      			data:{
      				docId:person.user_id,
      				state:0
      			},
      			type:"GET",
      			success:function(json){
      				plus.nativeUI.closeWaiting();
      				var data="";
      				console.log(JSON.stringify(json))
      				if(json.result.resultList==""){orderCheckall[0].innerHTML="---没有订单信息---"}else{
      				for(var i=0;i<json.result.resultList.length;i++){
      					var time=new Date(json.result.resultList[i].ceateTime);
      					var statu="";
      					if(json.result.resultList[i].attendaceState==0&&json.result.resultList[i].payState==1){
      						statu="待咨询";
      					}else if(json.result.resultList[i].attendaceState==1&&json.result.resultList[i].payState==1){
      						statu="咨询完毕";
      					}else if(json.result.resultList[i].refundState!=2){
      						statu="取消";
      					}
      					data+='<li class="mui-table-view-cell orderLi" ><a class="personmessage" id="'+json.result.resultList[i].id+'">';			
						data+='<img src="'+_config+json.result.resultList[i].pictures+'"  />';
						data+='<p><span class="">'+json.result.resultList[i].patientName+'</span><span class="usertime">'+changeTime(time)+'</span></p>';
						data+='<p class="userservice">服务：<span>'+json.result.resultList[i].service+'</span></p>';
						data+='<p class="userstatus">'+statu+'</p></li>';
      				}
      				orderCheckall[0].innerHTML='<ul class="mui-table-view ">'+data+'</ul>';
      				fontColor();
      				onbind();
      			}},beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      					mui.toast("网络错误，请重试！");
      				}
      			})
		    });
      		document.getElementById('slider').addEventListener('slide', function(e) {
      			mui.ajax(_config+"/doctor/getOrderByState",{
      			data:{
      				docId:person.user_id,
      				state:e.detail.slideNumber
      			},
      			type:"GET",
      			success:function(json){
      				plus.nativeUI.closeWaiting();
      				var data="";
      				console.log(JSON.stringify(json))
      				if(json.result.resultList==""){orderCheckall[e.detail.slideNumber].innerHTML="---没有订单信息---"}else{
      				for(var i=0;i<json.result.resultList.length;i++){
      					var time=new Date(json.result.resultList[i].ceateTime);
      					var statu="";
      					if(json.result.resultList[i].attendaceState==0&&json.result.resultList[i].payState==1){
      						statu="待咨询";
      					}else if(json.result.resultList[i].attendaceState==1&&json.result.resultList[i].payState==1){
      						statu="咨询完毕";
      					}else if(json.result.resultList[i].refundState!=2){
      						statu="取消";
      					}
      					data+='<li class="mui-table-view-cell orderLi" ><a class="personmessage" id="'+json.result.resultList[i].id+'">';			
						data+='<img src="'+_config+json.result.resultList[i].pictures+'"  />';
						data+='<p><span class="">'+json.result.resultList[i].patientName+'</span><span class="usertime">'+changeTime(time)+'</span></p>';
						data+='<p class="userservice">服务：<span>'+json.result.resultList[i].service+'</span></p>';
						data+='<p class="userstatus">'+statu+'</p></li>';
      				}
      				orderCheckall[e.detail.slideNumber].innerHTML='<ul class="mui-table-view ">'+data+'</ul>';
      				fontColor();
      				onbind();
      			}},beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      					mui.toast("网络错误，请重试！");
      				}
      			})
      		})
      		});
      		function onbind(){
      		mui(".mui-table-view-cell").on("tap",".personmessage",function(){
		      		mui.openWindow({
		      			url:"myOrderDetail.html",
		      			id:"myOrderDetail",
			      		extras:{
					        orderId:this.id
					    },
	      				show: {
							duration: 300,
							aniShow: "pop-in"
						}
		      		})
			})
      	}
      	function fontColor(){
      		var userstatus=document.getElementsByClassName("userstatus");
      		for(var i=0;i<userstatus.length;i++){
      			if(userstatus[i].innerHTML=="咨询完毕"){
      				userstatus[i].style.color="#2AC845";
      			}else if(userstatus[i].innerHTML=="取消"){
      				userstatus[i].style.color="darkgray";
      			}else{
      				userstatus[i].style.color="red";
      			}
      		}
      	};
      	function changeTime(time){
			var data_todayMonth=parseInt(time.getMonth())+1;
      		var data_todayDate=time.getDate();
      		var data_week=time.getDay();
      		var data_hour=time.getHours();
      		var data_min=time.getMinutes();
      		var weekday=["周日","周一","周二","周三","周四","周五","周六"];
      		var data_pmam="";
      		//设置日期格式
      		if(data_todayMonth<10){
      			data_todayMonth="0"+data_todayMonth;
      		}//月
      		if(data_todayDate<10){
      			data_todayDate="0"+data_todayDate;
      		}//日
      		if(data_hour<12){
      			data_pmam="上午";
      		}else{
      			data_pmam="下午";
      		}//am:pm
      		if(data_hour<10){
      			data_hour="0"+data_hour;
      		}//时
      		if(data_min<10){
      			data_min="0"+data_min;
      		}//分
      		data_week=weekday[data_week];
      		var data_result=time.getFullYear()+"-"+data_todayMonth+"-"+data_todayDate+" "+"("+data_week+")"+" "+data_pmam+data_hour+":"+data_min;//时间
      		return data_result;
		}
      	(function(b) {
			var a = 0;	  //如果a值大于0则表示当前环境支持沉浸式状态栏。 
			
			/* "Html5Plus/1.0 (Immersed/30)",其中Immersed/后的30表示状态栏的高度，单位为逻辑像素值。可以使用正则表达式进行获取 */
			var c = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
			if (c && c.length >= 3) {		// 当前环境为沉浸式状态栏模式
				a = parseFloat(c[2])		// 获取状态栏的高度
			}
			b.immersed = a;
			if (!a) {
				return
			}
			
			/*
		 	*获取状态栏高度后，可以使用js动态修改DOM元素的css属性来设置样式，如设置界面头区域的顶部内边距为状态栏的高度（避免系统状态栏与界面头重叠）
		 	*/
		 	var c=document.querySelector(".mui-content");// .style.marginTop=parseInt(a)+45+"px";
		 	c.style.marginTop=parseInt(a)+45+"px";
			var d = document.getElementsByTagName("header")[0];
			var e = document.getElementById("stylesheet");  //在header中修改状态栏和header的样式，（高度，颜色）
			d && (d.style.height = (a + 44) + "px", d.style.paddingTop = a + "px", d.style.background = "#CAB075", d.style.color = "#fff");
			e && (e.innerText = ".mui-bar-nav ~ .mui-content{padding-top: " + (44 + a) + "px;}.error-text{top: " + (44 + a) + "px;}.menu-top{padding-top: " + (44 + a) + "px;}");
		 	var f=document.querySelector(".mui-slider.mui-fullscreen");
		 	f.style.marginTop=45-parseInt(a)+"px";
		})(window); 	

			(function($) {
				//阻尼系数
				var deceleration = mui.os.ios?0.003:0.0009;
				$('.mui-scroll-wrapper').scroll({
					bounce: false,
					indicators: true,//是否显示滚动条
					deceleration:deceleration
				});
				
			})(mui);