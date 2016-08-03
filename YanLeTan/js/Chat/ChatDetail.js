mui.init();
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	var titlename=document.getElementsByClassName('mui-title')[0];
	titlename.innerHTML=self.title
	self.addEventListener('show',function(){
		console.log(self.orderid);
		mui.ajax(_config+'/doctor/getOrderById',{
			data:{
				orderId:self.orderid
			},
			type:"GET",
  			success:function(json){
  				plus.nativeUI.closeWaiting();
  				var time=new Data(json.result,ceateTime);
  				console.log(JSON.stringify(json))
  				document.getElementsByClassName('chatdetialtime')[0].innerHTML=changeTime(time.getFullYear(),parseInt(time.getMonth()+1),time.getDay(),time.getHours(),time.getMinutes(),time.getSeconds());
  				document.getElementsByClassName('chatdetialname')[0].innerHTML=json.result.patientName
  				document.getElementsByClassName('chatserver')[0].innerHTML=json.result.service;
  			},beforeSend:function(){
					plus.nativeUI.showWaiting("努力加载中。。。");
				},error:function(XMLHttpRequest){
  					plus.nativeUI.closeWaiting();
  					mui.toast("网络错误，请重试！");
  				}
		})
		
	})
	function changeTime(y,m,d,h,mi,s){
			    		
      		//设置日期格式
      		if(m<10){
      			m="0"+m;
      		}
      		if(d<10){
      			d="0"+d;
      		}
      		
      		if(h<10){
      			h="0"+h;
      		}
      		if(mi<10){
      			mi='0'+mi;
      		}
      		if(s<10){
      			s='0'+s;
      		}
      		var data_result=y+"-"+m+"-"+d+'  '+h+':'+mi+':'+s;//时间
      		return data_result;
		}
	
})
