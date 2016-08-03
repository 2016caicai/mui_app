mui.init();
      	mui.plusReady(function(){
      		var person=localStorage.getItem('person_ol');
      		person=JSON.parse(person);
      		mui(".mui-content").on("tap","#outlogin",function(){
      			var btnArray=['是','否'];
      			mui.confirm("您确定退出？","",btnArray,function(e){
      				if(e.index==0){
      					localStorage.removeItem("user_token");//去除token
      					localStorage.removeItem("person_ol");//去除个人
						if(plus.webview.getWebviewById('MineInfo'))plus.webview.getWebviewById('MineInfo').close();
						if(plus.webview.getWebviewById('index'))plus.webview.getWebviewById('index').close();	
						mui.openWindow({
      							url:"../../login.html",
      							id:"login",
      							show: {
										duration: 300,
										aniShow: "pop-in"
									}
      							});
      				}
      			
      		});
      	});
      	var self = plus.webview.currentWebview();
		    self.addEventListener('show',function(){
		    	var person=localStorage.getItem('person_ol');
      			person=JSON.parse(person);
      			console.log(person.user_isPush)
      			if(person.user_isPush){
      				if(person.user_isPush==1){
      					document.getElementById('Pushmessage').classList.add('mui-active');
      				}else{
      					document.getElementById('Pushmessage').classList.remove('mui-active');
      				}
      			}
      			//createLocalPushMsg();
		    })
      	//重写回退键,防止返回出现白屏
      		mui.back=function(){
      			
				setTimeout(function(){
					mui.openWindow({
					url:"../../app/index.html",
					id:"index",
					show: {
						duration: 300,
						aniShow: "pop-in"
					},
					waiting: {
						autoShow: false
					}
					})
				},5)
      		}
      	//重设密码
      	mui(".mui-table-view-cell").on("tap","#Password-Reset",function(){
      		mui.openWindow({
      			url:'MineReset.html',
      			id:'MineReset',
      			show: {
										duration: 300,
										aniShow: "pop-in"
									}
      		})
      	})
      	//消息推送开关
      	document.getElementById('Pushmessage').addEventListener('tap',function(){
      		
      		this.classList.contains('mui-active') ? openswith() : closeswith();
      	})
		
		function openswith(){
			mui.toast('开启消息推送');
			var person=localStorage.getItem('person_ol');
			person=JSON.parse(person);
			person.user_isPush=1;
			person=JSON.stringify(person);
			localStorage.setItem('person_ol',person)
//			mui.ajax(_config+'/doctor/updateDoctor',{
//				data:{
//					docId:person.user_id,
//					isPush:"1"           
//				},
//				type:"POST",
//				timeout: 10000,
//				success: function(a) {	
//					mui.toast(json.message);
//					console.log(JSON.stringify(a));
//				},error:function(){
//					mui.toast('网络错误');
//				}
      			
				
//			})
			/*mui.ajax(_config+'/doctor/updateClientId',{
				data:{
					docId:person.user_id,
					clientId:plus.push.getClientInfo().clientid
				},
				type:"POST",
				timeout: 10000,
				success: function(a) {	
					mui.toast(json.message);
					console.log(JSON.stringify(a));
				},error:function(){
					mui.toast('网络错误');
					closeswith();
				}
      			
				
			})*/
		};
		function closeswith(){
			mui.toast('关闭	消息推送');
			var person=localStorage.getItem('person_ol');
			person=JSON.parse(person);
			person.user_isPush=0;
			person=JSON.stringify(person);
			localStorage.setItem('person_ol',person)
//		    mui.ajax(_config+'/doctor/updateDoctor',{
//				data:{
//					docId:person.user_id,
//					isPush:"0"           
//				},
//				type:"POST",
//				timeout: 10000,
//				success: function(a) {	
//					mui.toast(json.message);
//					console.log(JSON.stringify(a));
//				},error:function(){
//					mui.toast('网络错误');
//					
//				}
      			
				
//			})
		};
//		console.log(plus.push.getClientInfo().clientid);
		
//		plus.push.addEventListener("click", function(msg) {
//                  alert("进入Click事件");
//                  alert(msg);
//                  var vData = JSON.stringify(msg);
//                  alert(vData);
//                  var vInfo = plus.push.getClientInfo();
//                  alert(vInfo);
//                  var vInfoData = JSON.stringify(vInfo);
//                  alert(vInfoData);
//                  // 判断是从本地创建还是离线推送的消息
//                  switch (msg.payload) {
//                      case "LocalMSG":
//                          outSet("点击本地创建消息启动：");
//                          break;
//                      default:
//                          outSet("点击离线推送消息启动：");
//                          break;
//                  }
//                  // 提示点击的内容
//                  plus.ui.alert(msg.content);
//                  console.log(msg.content);
//              }, false);
//              // 监听在线消息事件  推送通知的
//              plus.push.addEventListener("receive", function(msg) {
//                  alert("进入receive事件");
//                  alert(msg);
//                  var vData = JSON.stringify(msg);
//                  alert(vData);
//                  var vInfo = plus.push.getClientInfo();
//                  alert(vInfo);
//                  var vInfoData = JSON.stringify(vInfo);
//                  alert(vInfoData);
//                  if (msg.aps) { // Apple APNS message
//                      alert("接收到在线APNS消息：");
//                  } else {
//                      alert("接收到在线透传消息：");
//                  }
//              }, false);
//    	});