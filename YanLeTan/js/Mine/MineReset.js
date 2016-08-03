
mui.init();
var person = localStorage.getItem("person_ol");
person = JSON.parse(person);
mui.plusReady(function(){
	var oldPW=document.getElementById("oldPassword");//旧密码
	var newPW=document.getElementById("newPassword");//新密码
	mui(".mui-content").on("tap",".reset_btn",function(){
		mui.ajax(_config+"/doctor/modifyDoctorPassword",{
			data:{
				docId:person.user_id,
				oldPassword:oldPW.value,
				newPassword:newPW.value
			},
			type:'POST',
			success: function(json) {
				plus.nativeUI.closeWaiting();
				mui.toast(json.message);
				if(json.status==200)
					{
					localStorage.removeItem("user_token");//去除token
      					localStorage.removeItem("person_ol");//去除个人
						if(plus.webview.getWebviewById('MineInfo'))plus.webview.getWebviewById('MineInfo').close();
							
						mui.openWindow({
      							url:"../../login.html",
      							id:"login",
      							show: {
										duration: 300,
										aniShow: "pop-in"
									}
      							});
      						}
			},
			beforeSend: function() {
				plus.nativeUI.showWaiting("努力加载中。。。");
			},
			error: function(XMLHttpRequest) {
				plus.nativeUI.closeWaiting();
					mui.toast("网络错误，请重试！");
			}
		})
	})
})