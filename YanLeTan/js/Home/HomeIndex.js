	mui.init();
	var username=document.getElementsByClassName("username");//名字
	var userimgval=document.getElementsByClassName("userimgval");//用户头像
	var userpersonnal=document.getElementsByClassName("userpersonnal");//擅长疾病
      	mui.plusReady(function(){
      		var _token=localStorage.getItem("user_token");//获取token
      		var person=localStorage.getItem("person_ol");//获取本地信息
      		person=JSON.parse(person);
      		var posname=document.getElementsByClassName("posname");//职称
      		var userlevel=document.getElementsByClassName("userlevel")[0];//等级
      		var userlevelval=document.getElementsByClassName("userlevelval")[0];//等级分数
      		var userhospital=document.getElementsByClassName("userhospital");//医院名称
      		var yueval=document.getElementsByClassName("yueval")[0];//余额
      		var personNumval=document.getElementsByClassName("personNumval")[0];//服务人数
      		var zanval=document.getElementsByClassName("zanval")[0];//好评数
      		var work_price=document.getElementsByClassName("work_price")[0];//质询费
      		var Order_total=document.getElementsByClassName("Order_total")[0];//获取订单总数
      		var dateOrder=document.getElementsByClassName("dateOrder")[0];//订单列表
      		var shareWfriend=document.getElementById("shareWfriend");//分享到微信盆友
      		var shareXL=document.getElementById("shareXL");//分享到微博
      		var shareWQ=document.getElementById("shareWQ");//分享到微信圈
      		var shareQQ=document.getElementById("shareQQ");//分享到qq
      		var spanul="";
      		var span="";
      		loader();
      		//页面出现
      		var self = plus.webview.currentWebview();
		    self.addEventListener('show',function(){
		    	loader();
      		});
      		function loader(){
				//获得订单数
      		mui.ajax(_config+"/doctor/getOrderNumByDoctor/"+person.user_id,{
      			data:{
      				docId:person.user_id,
      				token:_token
      			},
      			type:"GET",
      			success:function(json){
      				plus.nativeUI.closeWaiting();
      				Order_total.innerHTML=json.result;
      			},beforeSend:function(){
      				plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      					if(XMLHttpRequest.status==0){
      						mui.toast("网络错误，请重试！");
      					}
      				}
      		})
      		//获得订单列表
      		mui.ajax(_config+"/doctor/getOrderByTime",{
      			data:{
      				docId:person.user_id
      			},
      			type:"GET",     			
      			success:function(json){
      				plus.nativeUI.closeWaiting();
      				var order_ul="<p>当天咨询信息</p>";
					if(json.result[0]==null){
						order_ul+='<li><p>----沒有咨询信息----</p></li>';
					}else{
      				for(var i=0;i<json.result.length;i++){
      					var new_data=new Date(json.result[i].EMERGENCYTIME);     					
      					 order_ul+='<ul class="orderPerson">';
						 order_ul+='<li><p>就诊姓名:<span class="personName value">'+json.result[i].PATIENTNAME+'</span></p></li>';
						 order_ul+='<li><p>手机号码:<span class="personPhone value">'+json.result[i].PATIENTMOBILE+'</span></p></li>';
						 order_ul+='<li><p>就诊时间:<span class="personTime value">'+changeTime(new_data)+'</span></p></li>';
						if(json.result[i].ATTENDACE_STATE==0){json.result[i].ATTENDACE_STATE="待咨询";}else{json.result[i].ATTENDACE_STATE="已咨询";}
						 order_ul+='<li><p>目前状态:<span class="personStatus value">'+json.result[i].ATTENDACE_STATE+'</span></p></li></ul>';
      				}
      				}
      				dateOrder.innerHTML=order_ul;
      			},beforeSend:function(){
      				plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      				
      						mui.toast("网络错误，请重试！");
      				}
      		})
      		//更新数据
      		mui.ajax(_config+"/doctor/getDoctorByDocId",{
      			data:{
      				docId:person.user_id,
      				token:_token
      			},
      			type:"GET",
      			success:function(json){
      				console.log(JSON.stringify(json));
      					var UserImg=null;
						if(json.status==200){
							person.user_id=json.result.doctor.id;//用户id
							person.user_introdution=json.result.doctor.introdution;//简介
							person.user_realName=json.result.doctor.realName;//真实姓名
							person.user_img=json.result.doctor.headImg;//头像
							person.user_mobile=json.result.doctor.mobile;//手机号码
							UserImg=json.result.doctor.headImg;
							person.user_consulteFee=json.result.doctor.consulteFee;//费用
							person.user_cretficate=json.result.doctor.cretficate;//证书
							person.user_posName=json.result.doctor.posName;//职称
							if(json.result.doctor.department!=null){
								person.user_department_depName=json.result.doctor.department.depName;//科室名称
								person._depId=json.result.doctor.department.id;//科室id
							}
							if(json.result.doctor.hospital!=null){
								person._hopId=json.result.doctor.hospital.id;//医院id
								person.user_hospital_name=json.result.doctor.hospital.hosName;//医院名称
								person.user_hospital_address=json.result.doctor.hospital.address//医院地址
							}
							if(json.result.doctor.disease!=null){
								var disease_disName=[]
								for(var d=0;d<json.result.doctor.disease.length;d++){
									disease_disName.push(json.result.doctor.disease[d].disName);//擅长疾病
								}
								person.user_disease_name=disease_disName;
							}
							if(json.result.doctor.cretficate){
								person.user_cretficate=json.result.doctor.cretficate;
							}
							person.user_evaluateLevel=json.result.doctor.evaluateLevel;//等级
							person.user_counselNum=json.result.doctor.counselNum;//咨询次数
							person.user_praiseNum=json.result.doctor.praiseNum//好评数
							person.user_balance=json.result.doctor.balance;//余额
							person.user_address_province=json.result.doctor.province;//省
							person.user_address_city=json.result.doctor.city;//市
							person.user_address_area=json.result.doctor.area;//区
							for(var x=0;x<username.length;x++){
					if(person.user_realName){
					username[x].innerHTML=person.user_realName+"<span class='posname'>"+person.user_posName+"</span>";//真实姓名
					}else{
						username[x].innerHTML="请设置<span class='posname'>请设置</span>";//真实姓名
					}
				}
				for(var x=0;x<userimgval.length;x++){
						userimgval[x].src=_config+UserImg;//头像
				}
				for(var x=0;x<userhospital.length;x++){
					if(person.user_hospital_name){
						userhospital[x].innerHTML=person.user_hospital_name;//医院名称
					}else{
						userhospital[x].innerHTML="请在个人资料设置";
					}
				}
				for(var i=0;i<person.user_disease_name.length;i++){
	      			span="<span>"+person.user_disease_name[i]+"</span>";
	      			spanul+=span;
	     	}
//				console.log(spanul)
				userpersonnal[0].innerHTML="擅长疾病:"+spanul;//擅长疾病
				userpersonnal[1].innerHTML="擅长疾病:"+spanul;//擅长疾病
				if(person.user_consulteFee==null){
					work_price.innerHTML="0";
				}else{
					work_price.innerHTML=person.user_consulteFee;//费用
				}
				
				if(person.user_evaluateLevel==null){
					userlevelval.innerHTML=0;//等级
				}else{
					userlevelval.innerHTML=person.user_evaluateLevel;
					for (var p=0;p<Math.floor(person.user_evaluateLevel);p++) {
						userlevel.children[p].src="../../img/iconfont-shoucang-(3)@2x.png";
					}
				}
				personNumval.innerHTML=person.user_counselNum;//咨询次数	
				if(person.user_balance==null){
					yueval.innerHTML="0";//余额
					
				}else{
					
					yueval.innerHTML=person.user_balance;//余额
				}
				zanval.innerHTML=person.user_praiseNum;//好评数	
							person=JSON.stringify(person);
							console.log(person);
							localStorage.setItem("person_ol",person);
	      				}else{
	      				mui.toast("网络不好，请稍后重试！");
	      		}
	      				plus.nativeUI.closeWaiting();
	      			},beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      					if(XMLHttpRequest.status==0){
      						mui.toast("网络错误，请重试！");
      					}
      				}
      			});	
			}
      		document.getElementsByClassName("mui-content")[0].addEventListener('tap',function(event){
      			var ev = ev || window.event;
    			var target = ev.target || ev.srcElement;
    			switch(target.title){
      			case 'share':mui("#popoverimg").popover("toggle");break;//分享名片
      			case 'balanceIndex':openwebview('./balance/balanceIndex','balanceIndex');break;
      			case 'myWorkTimeIndex':openwebview('./myWorkTime/myWorkTimeIndex','myWorkTimeIndex');break;
      			case 'myOrderIndex':openwebview('./myOrder/myOrderIndex','myOrderIndex');break;
      			}//页面跳转委托
      			event.preventDefault();//阻止默认事件
      		},false)
      		function openwebview(href,idv){
      			mui.openWindow({
      				url:href+".html",
      				id:idv,
      				show: {
						duration: 300,
						aniShow: "pop-in"
					},
					waiting: {
						autoShow: false
					}
      			})
      		}
      		//分享朋友,新浪微博,朋友圈,QQ
      		document.getElementsByClassName("sharebtn")[0].addEventListener("tap",function(event){
      			var ev = event || window.event;
				var target = event.target || event.srcElement;
				if(target.title){
	  			updateSerivces(target.title);//页面跳转委托
      		}
      		})
      	})
      	function changeTime(time){
			var data_todayMonth=parseInt(time.getMonth())+1;
      		var data_todayDate=time.getDate();
      		var data_week=time.getDay();
      		var data_hour=time.getHours();
      		var data_min=time.getMinutes();
      		var weekday=["周日","周一","周二","周三","周四","周五","周六"];
      		var data_pmam="";
      		//设置日期格式
      		if(data_todayMonth<10){
      			data_todayMonth="0"+data_todayMonth;
      		}//月
      		if(data_todayDate<10){
      			data_todayDate="0"+data_todayDate;
      		}//日
      		if(data_hour<12){
      			data_pmam="上午";
      		}else{
      			data_pmam="下午";
      		}//am:pm
      		if(data_hour<10){
      			data_hour="0"+data_hour;
      		}//时
      		if(data_min<10){
      			data_min="0"+data_min;
      		}//分
      		data_week=weekday[data_week];
      		var data_result=time.getFullYear()+"-"+data_todayMonth+"-"+data_todayDate+" "+"("+data_week+")"+" "+data_pmam+data_hour+":"+data_min;//时间
      		return data_result;
      		
		}
      	//分享
      	var shares=null,shareBts=[];    	
			/**
		   * 发送分享消息
		   * @param {JSON} msg
		   * @param {plus.share.ShareService} s
		   */
		function shareMessage(msg,s){
			console.log(JSON.stringify(msg));
			plus.nativeUI.showWaiting("努力加载中。。。");
			setTimeout(function(){
				plus.nativeUI.closeWaiting();
			},2000);
			s.send( msg, function(){
				plus.nativeUI.closeWaiting();
				mui.toast( "分享到\""+s.description+"\"成功！ " );
			}, function(e){
				plus.nativeUI.closeWaiting();
				mui.toast( "分享到\""+s.description+"\"失败" );
			} );
		}
		/**
		 * 更新分享服务
		 */
		function updateSerivces(shareTar){
			plus.share.getServices( function(s){
				shares={};
				for(var i in s){
					var t=s[i];
					shares[t.id]=t;
				}
		      	shareBts.push({title:'微信朋友圈',s:shares['weixin'],x:'WXSceneTimeline'});
		      	shareBts.push({title:'微信好友',s:shares['weixin'],x:'WXSceneSession'});
		      	shareBts.push({title:'新浪微博',s:shares['sinaweibo']});
		      	shareBts.push({title:'QQ',s:shares["qq"]});
				shareAction(shareBts[shareTar],true);
			}, function(e){
				console.log( "获取分享服务列表失败："+e.message );
			} );
		}
		function shareAction(sb,bh) {
			if(!sb||!sb.s){
				console.log( "无效的分享服务！" );
				return;
			}
			var msg={content:'我正在用养乐堂医生端，有什么问题可以向我咨询！',extra:{scene:sb.x}};
			if(bh){
				msg.href="https://www.pgyer.com/VVRi";
				msg.title="我是"+username[1].childNodes[0].nodeValue+"医生";
				msg.thumbs=["../../img/yishen@3x.png"];
				msg.pictures=[_config+person.user_img];
			}
			// 发送分享
			if ( sb.s.authenticated ) {
				console.log( "---已授权---" );
				shareMessage(msg,sb.s);
			} else {
				console.log( "---未授权---" );
				sb.s.authorize( function(){
						shareMessage(msg,sb.s);
					},function(e){
					plus.nativeUI.toast( "认证授权失败："+e.message );
				});
			}
		}