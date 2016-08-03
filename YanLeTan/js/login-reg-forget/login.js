	mui.init();
      	mui.plusReady(function(){
			var _person=localStorage.getItem("person_ol");//
			var _token=localStorage.getItem("user_token");
			person=JSON.parse(_person);
      		var Account=document.getElementById("Account");
      		var mui_input=document.getElementsByTagName("input");
      		var Password=document.getElementById("Password");
      		var self = plus.webview.currentWebview();
      		var firsttime=null;
      		//退出应用
      		mui.back=function(){
      			if(firsttime==null){
      				firsttime=new Date().getTime();
      				mui.toast("再按一次退出应用")
      				setTimeout(function(){
      					firsttime=null;
      				},1000)
      			}else{
      				if(new Date().getTime()-firsttime<1000)plus.runtime.quit();
      			}
      		};
      		//获取手机号码
      		if(self.accont!=undefined){Account.value= self.accont;};
      		
      		setTimeout(function(){
      			if(_token){
      				mui.ajax(_config+"/doctor/getDoctorByDocId",{
      			data:{
      				docId:person.user_id,
      				token:_token
      			},
      			type:"GET",
      			success:function(json){
      				plus.nativeUI.closeWaiting();
						if(json.status==200){
							mui.openWindow({
								url:"app/index.html",
								id:"index",
								show: {
									duration: 300,
									aniShow: "pop-in"
								}
							})
	      			}else{
	      					plus.nativeUI.toast(json.message);
	      			}
	      				},beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      					plus.nativeUI.toast("请登陆！");
      				}
      		})}else{
      				plus.nativeUI.toast("请登陆");
      				return false;
      			}
      		},5)
      		//登陆
  		mui(".login_btn").on("tap",".mui-btn",function(){
  			document.activeElement.blur();//防止登陆框不收回
			var num=0;
			for(var i=0;i<mui_input.length;i++){
				if(mui_input[i].value==""){
					mui.toast("请"+mui_input[i].placeholder);
					return false;
				}else{
					num++
				}
			}
			if(num=="2"){
				mui.ajax(_config+"/doctor/loginByMobile", {
					data: {
						mobile:Account.value,									
						password:Password.value
					},
					type: "POST",
					success: function(data) {
						plus.nativeUI.closeWaiting();
						if(data.status==200){						
							var person=new Object();
							localStorage.setItem("user_token",data.result.token);//token校验
							person.user_id=data.result.user.id;//用户id
							person.user_introdution=data.result.user.introdution;//简介
							person.user_realName=data.result.user.realName;//真实姓名
							person.user_img=data.result.user.headImg;//头像
							person.user_consulteFee=data.result.user.consulteFee;//费用
							person.user_cretficate=data.result.user.cretficate;//证书
							person.user_posName=data.result.user.posName;//职称
							if(data.result.user.department!=null){
								person.user_department_depName=data.result.user.department.depName;//科室名称
							}
							if(data.result.user.hospital!=null){
								person.user_hospital_name=data.result.user.hospital.hosName;//医院名称
								person.user_hospital_address=data.result.user.hospital.address//医院地址
							}
							if(data.result.user.disease!=null){
								var disease_disName=[];
								var _disIdarr=[];
								for(var d=0;d<data.result.user.disease.length;d++){
									disease_disName.push(data.result.user.disease[d].disName);//擅长疾病
									_disIdarr.push(data.result.user.disease[d].id)
								}
								person._disId=_disIdarr;
								person.user_disease_name=disease_disName;

							}
							person.user_evaluateLevel=data.result.user.evaluateLevel;//等级
							person.user_counselNum=data.result.user.counselNum;//咨询次数
							person.user_praiseNum=data.result.user.praiseNum//好评数
							person.user_balance=data.result.user.balance;//余额
							person.user_address_province=data.result.user.province;//省
							person.user_address_city=data.result.user.city;//市
							person.user_address_area=data.result.user.area;//区
							person.PushMessagetoken=true;
//							person.user_isPush=data.result.user.isPush;
//							person.user_clientId=data.result.user.clientId;
//							console.log(person.user_isPush)
//							console.log(plus.push.getClientInfo().clientid)
//							if(person.user_clientId!=plus.push.getClientInfo().clientid){
//								alert('1')
//								mui.ajax(_config+'/doctor/updateClientId',{
//									data:{
//										docId:person.user_id,
//										clientId:plus.push.getClientInfo().clientid
//									},
//									type:"GET",
//									timeout: 10000,
//									success: function(a) {	
//										mui.toast(json.message);
//										console.log(JSON.stringify(a));
//									},error:function(){
//										mui.toast('网络错误');
//										
//									}
//								})
//							}
							person=JSON.stringify(person);
							localStorage.setItem('person_ol',person);
							
							mui.openWindow({
												url:"app/index.html",
												id:"index",
												show: {
														duration: 300,
														aniShow: "pop-in"
													}
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
      				}
					});
					}
      			});
      		//跳转注册
      		mui(".mui-bar").on("tap","#reg",function(){
      			mui.openWindow({
      				url:"reg.html",
      				id:"reg",
					show: {
							duration: 300,
							aniShow: "pop-in"
						}
      			})
      		});
      		
      		//跳转忘记密码
      		mui(".forget").on("tap","#forget",function(){
      			mui.openWindow({
      				url:"forget.html",
      				id:"forget",
					show: {
							duration: 300,
							ani: "pop-in"
					},
      				extras:{accont:Account.value}
      			})
      		});
      	});