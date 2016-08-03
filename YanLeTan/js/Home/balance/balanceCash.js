mui.init();
var defultcard=document.getElementsByClassName('cardMsseage')[0];//卡号
var cash=document.getElementById('Cash');//金额
var username=document.getElementsByClassName('username')[0];//名字
var userphone=document.getElementsByClassName('userphone')[0];//手机号码
var cardTime=document.getElementsByClassName('cardTime')[0];//时间
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
    self.addEventListener('show',function(){
        defultcard.innerHTML=self.card;
        cash.value=self.cash;
        username.innerHTML=self.name;
        userphone.innerHTML=self.mobile;
        var T=new Date();
        cardTime.innerHTML=changeTime(T.getFullYear(),parseInt(T.getMonth()+1),T.getDate(),T.getHours(),T.getMinutes());
    });
    document.getElementById('OK').addEventListener('tap',function(){
    	mui.back();
    })
    function changeTime(y,m,d,h,mi){
			    		
      		//设置日期格式
      		if(m<10){
      			m="0"+m;
      		}
      		if(d<10){
      			d="0"+d;
      		}
      		h=h+2
      		if(h<10){
      			h="0"+h;
      		}
      		if(mi<10){
      			mi='0'+mi;
      		}
      		var data_result='预计'+y+"-"+m+"-"+d+'  '+h+':'+mi+"到账";//时间
      		return data_result;
		}
})
