mui.init();
      	mui.plusReady(function(){
      		var data=new Date();
      		var week=data.getDay();
      		var j=0;//week
      		var k=0;//data
      		var dateWeek=document.getElementsByClassName("dateWeek");
      		var dateLi=document.getElementsByClassName("dateLi");//排班列表
      		var dateStatus=document.getElementsByClassName("dateStatus");//排班状态
      		var weekday=["日","一","二","三","四","五","六"];
      		var dateData=document.getElementsByClassName("dateData");
      		var person=localStorage.getItem("person_ol");
      		var dateTimeUl=document.getElementsByClassName("dateTimeUl")[0]; 
      		var softAddressMessage=document.getElementsByClassName("softAddressMessage")[0];
      		person=JSON.parse(person);
      		for(var i=0;i<dateLi.length;i++){
      			var newweek=week;//设置周
      			if(week+i>6){					
      				newweek=0;
      				dateWeek[i].innerHTML=weekday[newweek+j];
      				j++;
      			}else{    				
      				dateWeek[i].innerHTML=weekday[week+i];
      			}
      			if(data.getDate()+i>DayNumOfMonth(data.getFullYear(),parseInt(data.getMonth())+1)){
      				k++;//设置日
      				dateData[i].innerHTML=k;    				
      			}else{
      				dateData[i].innerHTML=data.getDate()+i;
      			}	
      		}
      		var self = plus.webview.currentWebview();
		    self.addEventListener('show',function(){
		    mui.ajax(_config+"/doctor/getSchedulStateByDocId",{
		    	data:{
		    		docId:person.user_id
		    	},
		    	type:"GET",
		    	success:function(json){
		    		if(json.status==200){
		    			console.log(JSON.stringify(json))
						var state=new Array(); 
							for(var i=0;i<json.result.length;i++){
								 state[i]=2;//预约满
								if(json.result[i].beginTimeandState){
									for(var j=0;j<json.result[i].beginTimeandState.length;j++){
										if(json.result[i].beginTimeandState[j].state==1){
											 state[i]=1;//已排班
											break;
										}
									}
								}else{
									state[i]=0;//未排班
								}
							}
						for(var c=0;c<state.length;c++){
							if(state[c]==2){
								dateStatus[c].innerHTML="预约满";
							}else if(state[c]==1){
								dateStatus[c].innerHTML="已排班";
							}else{
								dateStatus[c].innerHTML="未排班";
							}
							
						}
						}
		    		},beforeSend:function(){
					plus.nativeUI.showWaiting("努力加载中。。。");
				},error:function(XMLHttpRequest){
  					plus.nativeUI.closeWaiting();
  					if(XMLHttpRequest.status==0){
  						mui.toast("网络错误，请重试！");
  					}
  				}
		   		 })
		        //获取当前日期的排班
      		mui.ajax(_config+"/doctor/getSchedulByTime",{
      			data:{
      				docId:person.user_id,
      				calendarDate:changeTime(data.getFullYear(),parseInt(data.getMonth())+1,data.getDate())
      			},
      			type:"GET",
      			success:function(json){
      				console.log(JSON.stringify(json))
      				plus.nativeUI.closeWaiting();
      				if(json.status==200){
      				var dataTimeLi="";//时间段
      				if(json.result[0]){
      					for(var f=0;f<json.result[0].beginTime.length;f++){
      						if(json.result[0].stateList[f]==0){
      							dataTimeLi+='<li class="dateTimeLi active"><a class="mui-btn">'+json.result[0].beginTime[f]+'</a></li>';
      						}else{
      							dataTimeLi+='<li class="dateTimeLi"><a class="mui-btn">'+json.result[0].beginTime[f]+'</a></li>';
      						}
      						
      					}
      				dateTimeUl.innerHTML=dataTimeLi;
      				}else{
      					dateTimeUl.innerHTML="----今天没有排班！---";
      				}
      				if(json.result[0]){
      				softAddressMessage.innerHTML=json.result[0].place;
      				}else{
      					softAddressMessage.innerHTML="未设置医院地址";
      				}
      				}
      				
      			},beforeSend:function(){
					plus.nativeUI.showWaiting("努力加载中。。。");
				},error:function(XMLHttpRequest){
  					plus.nativeUI.closeWaiting();
  					if(XMLHttpRequest.status==0){
  						mui.toast("网络错误，请重试！");
  					}
  				}
      		})
		    });
      		
      		 for (var i = 0; i < dateData.length; i++) {
			        dateData[i].indexs = i;
			    }//给dateData对象添加一个index属性
      		//选择data
      		mui(".dateLi").on("tap",".dateData",function(){
      			var self=this.indexs;
      			for(var n=0;n<dateData.length;n++){
      				dateData[n].classList.remove("dataBorder");
      			}
      			this.classList.toggle("dataBorder");
      			var data_Date=data.getDate();//日期
      			var data_Mouth=parseInt(data.getMonth())+1;//月
      			var k=0;//日期
      			if(data_Date+self>DayNumOfMonth(data.getFullYear(),parseInt(data.getMonth())+1)){
      				k++;
      				data_Date=k;
      				data_Mouth++;
      			}else{
      				data_Date=data_Date+self;
      			}
      			//获取点击日期的排班
      		mui.ajax(_config+"/doctor/getSchedulByTime",{
      			data:{
      				docId:person.user_id,
      				calendarDate:changeTime(data.getFullYear(),data_Mouth,data_Date)
      			},
      			type:"GET",
      			success:function(json){
      				console.log(JSON.stringify(json))
      				plus.nativeUI.closeWaiting();
      				if(json.status==200){
      				var dataTimeLi="";//时间段
      				if(json.result[0]!=null){
      					for(var f=0;f<json.result[0].beginTime.length;f++){
      						if(json.result[0].stateList[f]==0){
      							dataTimeLi+='<li class="dateTimeLi active"><a class="mui-btn">'+json.result[0].beginTime[f]+'</a></li>';
      						}else{
      							dataTimeLi+='<li class="dateTimeLi"><a class="mui-btn">'+json.result[0].beginTime[f]+'</a></li>';
      						}
      					}
      				dateTimeUl.innerHTML=dataTimeLi;
      				if(json.result[0].place){
      				softAddressMessage.innerHTML=json.result[0].place;
      				}else{
      					softAddressMessage.innerHTML="未设置医院地址";
      				}
      				}else{
      					dateTimeUl.innerHTML="----今天没有排班！---";
      					softAddressMessage.innerHTML="未设置医院地址";
      				}}else{
      					mui.toast(json.message);
      				}
      			},beforeSend:function(){
					plus.nativeUI.showWaiting("努力加载中。。。");
				},error:function(XMLHttpRequest){
  					plus.nativeUI.closeWaiting();
  					if(XMLHttpRequest.status==0){
  						mui.toast("网络错误，请重试！");
  					}
  				}
      		})
      		})
      		//增加排班
      		mui(".mui-content").on("tap","#Add",function(){
      			mui.openWindow({
      				url:"./myWorkTimeAdd.html",
      				id:"myWorkTimeAdd",
      				show: {
						duration: 300,
						aniShow: "pop-in"
					}
      				})
      		})
      	});     	
      	function DayNumOfMonth(Year,Month)
			{
			    var d = new Date(Year,Month,0);
			    return d.getDate();
			}
		function changeTime(y,m,d){
			var data_todayMonth=m;
      		var data_todayDate=d;
      		//设置日期格式
      		if(data_todayMonth<10){
      			data_todayMonth="0"+data_todayMonth;
      		}
      		if(data_todayDate<10){
      			data_todayDate="0"+data_todayDate;
      		}
      		var data_result=y+"-"+data_todayMonth+"-"+data_todayDate;//时间
      		return data_result;
		}