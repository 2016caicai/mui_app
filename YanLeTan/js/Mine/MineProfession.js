mui.init();
      var person=localStorage.getItem("person_ol");
      console.log(person)
      person=JSON.parse(person);
      person.user_cretficate=person.user_cretficate;
      	mui.plusReady(function(){
      		if(person.user_cretficate==null){
      			document.getElementById("userimg").src ="../../img/juxin-34-@3x_96.png";
      		}else{
      			document.getElementById("userimg").src =_config+person.user_cretficate;
      		}
      		mui(".header").on("tap",".mui-btn-block",function(){
      			mui("#popover").popover("toggle");
      			
      		})
      		//提交证书
      		mui(".mui-content").on("tap","#send",function(){
      			var person=localStorage.getItem("person_ol");
      			person=JSON.parse(person);
      			console.log(person.user_cretficate)
      			mui.ajax(_config+"/doctor/updateDoctor",{
      				data:{
      					id:person.user_id,
      					cretficate:person.user_cretficate
      				},
      				type:"POST",
      				success:function(json){
      					plus.nativeUI.closeWaiting();
      					console.log(JSON.stringify(json))
      					if(json.status=="200"){
      						mui.toast("提交成功");
      						mui.openWindow({
      							url:"app/index.html",
      							id:"index",
					      				show: {
											duration: 300,
											aniShow: "pop-in"
										}
      						});
      					}else{
      						mui.toast("请重试")
      					}
      				},beforeSend:function(){
								plus.nativeUI.showWaiting("努力加载中。。。");
							},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      						mui.toast("网络错误，请重试！");
      				}
      			})
      		})
      	});
      	function imgupgrade(img) {		
		dataURL=img[0].substring(23);
        mui.ajax(_config+"/base/imageUploadByBase64",{
        	data: {
    		fileName:"image.png",
			fileContent:dataURL //base64数据    
			},
			type: "POST",
			timeout: 10000,
        	success:function(json){
        		plus.nativeUI.closeWaiting();
        		if (json.status == 200) {
				mui.toast(json.message)
				person.user_cretficate=json.result;
				person=JSON.stringify(person);
				localStorage.setItem('person_ol',person);
        		}else{
        			plus.nativeUI.toast("很抱歉，请重试")
        		}
        	},beforeSend:function(){
			plus.nativeUI.showWaiting("努力上传中。。。");
				},error:function(XMLHttpRequest){
  					plus.nativeUI.closeWaiting();
  					if(XMLHttpRequest.status==0){
  						plus.nativeUI.toast("网络错误，请重试");
  					}
  				}
        })
}
      