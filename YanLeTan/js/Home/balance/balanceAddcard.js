mui.init(
	{
	beforeback: function(){
		//获得列表界面的webview
		var list = plus.webview.getWebviewById('balanceRawal');
		//触发列表界面的自定义事件（refresh）,从而进行数据刷新
		mui.fire(list,'refresh');
		//返回true，继续页面关闭逻辑
		return true;
	}
}
);
mui.plusReady(function(){
	 window.addEventListener('refreshcard',function(){
		    	refreshcard();
      	});
	var doctorId='';
	var self = plus.webview.currentWebview();
		    self.addEventListener('show',function(){
		    		refreshcard();
      		});
      	function refreshcard(){
      		var person=localStorage.getItem("person_ol");//获取本地信息
      				person=JSON.parse(person);
      				doctorId=person.user_id;
      		mui.ajax(_config+'/doctor/getBankCardByDoctorId/'+person.user_id,{
		  			type:"GET",
		  			success:function(json){
		  				plus.nativeUI.closeWaiting();
		  				mui.toast(json.message);
		  				var result=json.result;
		  				console.log(JSON.stringify(json.result))
		  				var licard='';
		  				if(json.result!=''){
		  				for(var i=0;i<result.length;i++){
		  					licard+="<li class='addcart-li active"+result[i].setting+"' id='"+result[i].id+"' ><p>尾数"+result[i].cardNo.substr(-4)+"("+result[i].type+")</p></li>"
		  					if(result[i].setting==1){person.user_defalutCard=result[i];person = JSON.stringify(person);localStorage.setItem("person_ol", person);}
		  				}
		  				document.getElementsByClassName('addcart-ul')[0].innerHTML=licard;}else{
		  					document.getElementsByClassName('addcart-ul')[0].innerHTML='--请绑定银行卡--';
		  				}
		  			},beforeSend:function(){
		  				plus.nativeUI.showWaiting("努力加载中。。。");
						},error:function(XMLHttpRequest){
		  					plus.nativeUI.closeWaiting(); 				
		  						mui.toast("网络错误，请重试！");
		  				}
				})
      	}
	
	//添加银行卡
	mui(".mui-bar-nav").on('tap','.go-addcard',function(){
		mui.openWindow({
			url:'balanceCardbind.html',
			id:'balanceCardbind',
			show: {
				duration: 300,
				aniShow: "pop-in"
			}
		})
	})
	var li=document.getElementsByClassName('addcart-li');
	//选择卡
	mui('.addcart-ul').on('tap','.addcart-li',function(){
		for(var i=0;i<li.length;i++){
			li[i].index=i;
			li[i].className='addcart-li';
		}
		li[this.index].className='addcart-li active1';
		mui.ajax(_config+'/doctor/updateBankCard',{
			data:{
				bankCardId:li[this.index].id,
				docId:doctorId
			},
  			type:"GET",
  			success:function(json){
  				plus.nativeUI.closeWaiting();
  				console.log(JSON.stringify(json))
  				var person=localStorage.getItem("person_ol");//获取本地信息
      				person=JSON.parse(person);
  				person.user_defalutCard=json.result;
  				person = JSON.stringify(person);
  				localStorage.setItem("person_ol", person);
  				mui.toast(json.message);
  			},beforeSend:function(){
  				plus.nativeUI.showWaiting("努力加载中。。。");
				},error:function(XMLHttpRequest){
  					plus.nativeUI.closeWaiting(); 				
  						mui.toast("网络错误，请重试！");
  				}
		})
	})
})