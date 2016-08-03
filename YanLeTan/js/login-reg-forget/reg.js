mui.init();
      	mui.plusReady(function(){
      		var check=true;
      		var Account=document.getElementById("Account");//用户名
      		var Code=document.getElementById("Code");//验证码
      		var Send=document.getElementById("Send");//发送
      		var Password=document.getElementById("Password");//密码
      		var PasswordOk=document.getElementById("PasswordOk");//密码2
      		var checkbox_img=document.getElementById("checkbox_img");//勾选
      		//checkbox事件
      		mui(".checkbox").on("tap",".checkbox_img",function(){
      			if(check==true){
      				checkbox_img.src="img/iconfont-gouxuan@2x_80.png";
      				check=false;
      			}else{
      				checkbox_img.src="img/iconfont-gouxuan2@2x_80.png";
      				check=true;
      			}
      		});
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
					success: function(json) {
						plus.nativeUI.closeWaiting();
						var data=JSON.parse(json);
						if(data.status==200){
							plus.nativeUI.toast("发送成功");
	      				}else{
	      				plus.nativeUI.toast("网络不好，请稍后重试！");
	      					}
	      				},
      				beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      					if(XMLHttpRequest.status==0){
      						plus.nativeUI.toast("网络错误，请重试！");
      					}
      				}})}else{
	      				plus.nativeUI.toast("请输入正确手机号码");
	      			};
			});
			//注册
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
						if(check==false){
							mui.ajax(_config+"/doctor/addDoctorByMobile", {
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
										mui.toast("注册成功");
										var person=new Object();
										person.user_id=data.result.id;//用户id
										person=JSON.stringify(person);
										console.log(person);
										localStorage.setItem("person_ol",person);
										mui.openWindow({
											url:"InfoRequest.html",
											id:"InfoRequest",
											extras:{accont:Account.value}
										})
				      				}else if(data.status==400){
				      					plus.nativeUI.toast(data.message);
				      				}else{
				      				plus.nativeUI.toast(data.message);
				      				}
				      				},
		      				beforeSend:function(){
								plus.nativeUI.showWaiting("努力加载中。。。");
							},error:function(XMLHttpRequest){
		      					plus.nativeUI.closeWaiting();
		      					plus.nativeUI.toast("网络错误，请重试！");
		      				}})
								}else{
									plus.nativeUI.toast("请勾选同意服务协议");
								}
							}else{
						plus.nativeUI.toast("两次输入的密码不一样，请重新输入！")
						}
					}
			});
			//已有账户
			mui(".mui-bar").on("tap","#login",function(){
				mui.back();
			})
      	});