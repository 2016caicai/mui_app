mui.init();
var defultcard=document.getElementsByClassName('cardMsseage')[0];//卡号
var cash=document.getElementById('Cash');//金额
var username=document.getElementsByClassName('username')[0];//名字
var userphone=document.getElementsByClassName('userphone')[0];//手机号码
mui.plusReady(function(){
	var person=localStorage.getItem("person_ol");//获取本地信息
      	person=JSON.parse(person);
		var self = plus.webview.currentWebview();
		    self.addEventListener('show',function(){
		    	refreshcard()
      });
		    window.addEventListener('refresh',function(){
		    	refreshcard()
      	});
      function refreshcard(){
		    	var person=localStorage.getItem("person_ol");//获取本地信息
      				person=JSON.parse(person);
      			username.innerHTML=person.user_realName;
      			userphone.innerHTML=person.user_mobile;
      			if(person.user_defalutCard){
      				defultcard.innerHTML="<p>绑定的银行卡号：<span >尾数"+person.user_defalutCard.cardNo.substr(-4)+"</span><span>("+person.user_defalutCard.type+")</span></p><p>账户余额：<span>"+person.user_balance+"</span></p>";
      			}else{
      				defultcard.innerHTML="<p class='addcard'>请选择银行卡<span class=' mui-icon mui-icon-arrowright mui-pull-right'></span></p>"
      			}}
	mui(".mui-content").on("tap","#OK",function(){
		if(defultcard.childNodes.length==1){
			mui.toast('请先选择银行卡');
			return false;
		}else if(cash.value==''||cash.value==0){
			mui.toast('请输入提款金额数(不能为0)');
			return false;
		}else{
			mui.ajax(_config+'/doctor/addBill',{
				data:{
					docId:person.user_id,
					bankCardId:person.user_defalutCard.id,
					tradeMoney:parseFloat(cash.value),
					type:'0'
				},
				type:"POST",     			
      			success:function(json){
      				mui.toast(json.message);
      				plus.nativeUI.closeWaiting();
      				if(json.status==200){
      					mui.openWindow({
							url:"balanceCash.html",
							id:"balanceCash",
							show: {
								duration: 300,
								aniShow: "pop-in"
							},
							extras:{
								cash:cash.value,
								card:defultcard.innerHTML,
								name:username.innerHTML,
								mobile:userphone.innerHTML
							}
						})
      				}
      			},beforeSend:function(){
      				plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      						console.log("网络错误，请重试！"+JSON.stringify(XMLHttpRequest));
      				}
			})
			
		}
		
	})
	mui(".mui-content").on("tap",".cardMsseage",function(){
		mui.openWindow({
			url:"balanceAddcard.html",
			id:"balanceAddcard",
			show: {
				duration: 300,
				aniShow: "pop-in"
			}
		})
	})
})