mui.init();
      	
      	mui.plusReady(function(){
			var self = plus.webview.currentWebview();
			var orderIdval = self.orderId;
			mui.ajax(_config+"/doctor/getOrderById",{
				data:{
					orderId:orderIdval
				},
				type:'GET',
				success:function(json){
					plus.nativeUI.closeWaiting();
					console.log(JSON.stringify(json))
					var statu="";
      					if(json.result.attendaceState==0&&json.result.payState==1){
      						statu="待咨询";
      					}else if(json.result.attendaceState==1&&json.result.payState==1){
      						statu="咨询完毕";
      					}else if(json.result.refundState!=2){
      						statu="取消";
      					};
      				var time=new Date(json.result.ceateTime);
					var data='<li><p class="userImg">头像 <img src="'+_config+json.result.pictures+'" alt="" /></p></li>';
						data+='<li><p class="userName">用户姓名<span class="right">'+json.result.patientName+'</span></p></li>';
						data+='<li><p class="userPhone" >手机号码<span class="right">'+json.result.patientMobile+'</span></p></li>';
						data+='<li><p class="userSoft" >服务内容<span class="right">'+json.result.service+'</span></p></li>';
						data+='<li><p class="softPrice" >服务价格<span class="right">￥<span class="value">'+json.result.price+'</span></span></p></li>';
						data+='<li><p class="softTime" >预约时间<span class="right">'+changeTime(time)+'</span></p></li>';
						data+='<li><p class="softAddress" >服务地点<span class="right">'+json.result.address+'</span></p></li>';
						data+='<li><p class="personDetial" >病情描述<span class="right">'+json.result.description+'</span></p></li>';
						data+='<li><p class="personStatus" >咨询状态<span class="right statuSpan">'+statu+'</span></p></li>';
					
					document.getElementsByClassName("box")[0].innerHTML=data;
					fontColor();
				},beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      					mui.toast(XMLHttpRequest.status);
      					if(XMLHttpRequest.status==0){
      						mui.toast("网络错误，请重试！");
      					}
      				}
			})
      	})
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
      	function fontColor(){
      		var userstatus=document.getElementsByClassName("statuSpan")[0];
      			if(userstatus.innerHTML=="咨询完毕"){
      				userstatus.style.color="#2AC845";
      			}else if(userstatus.innerHTML=="取消"){
      				userstatus.style.color="darkgray";
      			}
      	};