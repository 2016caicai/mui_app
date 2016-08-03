mui.init();
      	mui.plusReady(function(){
      		var check=true;
      		var Account=document.getElementById("Account");
      		var Code=document.getElementById("Code");
      		var Send=document.getElementById("Send");
      		var Password=document.getElementById("Password");
      		var PasswordOk=document.getElementById("PasswordOk");
      		var self = plus.webview.currentWebview();
      		if(self.accont!=undefined)Account.value= self.accont;
      		//发送验证码
      		var phonereg=/^[1][358][0-9]{9}$/;
      		mui(".mui-input-row").on("tap","#Send",function(){
      			var timeout=30;
      			if(phonereg.test(Account.value)){ 
      				showtime();
		      			function showtime(){		
	      				var timego=setTimeout(function(){
	      				timeout--;
	      				Send.disabled = "disabled";
	      				Send.style.background="dimgray"
	      				Send.innerHTML=timeout+"s后获取";
	      				if(timeout>-1){
	      				showtime();	
	      				}else{
	      					Send.style.background="rgb(202,176,117)"
							Send.disabled = "";
		      				Send.innerHTML="重新获取";
	      				}
	      				},1000);		
		      			}
		      		mui.ajax(_config+"/message/getMobileAuthCode/register/"+Account.value, {
					dataType: "JSON",
					type: "GET",
					timeout: 10000,
					success: function(data) {
						var data=JSON.parse(data);
						plus.nativeUI.closeWaiting();
						if(data.status==200){
							mui.toast("发送成功");
	      				}else{
	      				mui.toast("网络不好，请稍后重试！");
	      		}},beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      					mui.toast("网络错误，请重试！");
      				}})}else{
	      				mui.toast("请输入正确手机号码");
	      			};
			});
			//确认
			mui(".login_btn").on("tap",".mui-btn",function(){
				var mui_input=document.getElementsByTagName("input");
				var num=0;
				for(var i=0;i<mui_input.length;i++){
					if(mui_input[i].value==""){
						mui.toast("请"+mui_input[i].placeholder);
						return false;
					}else{
						num++
					}
				}
				if(num=="4"){
					if(Password.value==PasswordOk.value){
							mui.ajax(_config+"/doctor/findBackPassword", {
								data: {
									mobile:Account.value,
									code:parseInt(Code.value),
									password:Password.value,
									business:"register"
								},
								dataType: "JSON",
								type: "POST",
								timeout: 10000,
								success: function(json) {
									var data=JSON.parse(json);
									plus.nativeUI.closeWaiting();
									if(data.status==200){
										mui.toast("修改成功");
										mui.openWindow({
											url:"login.html",
											id:"login",
      										extras:{accont:Account.value}
										})
				      				}else if(data.status==400){
				      					mui.toast(data.message);
				      				}else{
				      				mui.toast(data.message);
				      				}},beforeSend:function(){
									plus.nativeUI.showWaiting("努力加载中。。。");
								},error:function(XMLHttpRequest){
			      					plus.nativeUI.closeWaiting();
			      					mui.toast("网络错误，请重试！");
      				}})
						}else{
						mui.toast("两次输入的密码不一样，请重新输入！")
						}
					}
			});
      	});