mui.init();
      	mui.plusReady(function(){
      		var item=document.getElementsByClassName("mui-control-item");
      		mui("#Chat").on("tap",".mui-control-item",function(){
      			for(var i=0;i<item.length;i++){
      				item[i].classList.remove("mui-active");
      			}
      		});
      		var self = plus.webview.currentWebview();
		    self.addEventListener('show',function(){
		    	
		    	var person=localStorage.getItem("person_ol");
		    		person=JSON.parse(person);
		    		//订单消息
		    	mui.ajax(_config+'/doctor/getOrderForDoctor',{
		    		data:{
		    			docId:person.user_id
		    		},
	      			type:"GET",
	      			success:function(json){
	      				plus.nativeUI.closeWaiting();
	      				var lidata='';
	      				if(json.result.length==0){
	      					lidata='<p>--暂时没有消息--</p>';
	      				}
	      				for(var i=0;i<json.result.length;i++){
	      					var payState='';
	      					var time=new Date(json.result[i].ceateTime);
	      					json.result[i].payState==1?payState='付款成功':payState='待付款';
	      					
	      					lidata+='<li class="mui-table-view-cell"><a class="mui-navigate-right ChatA" title="order"  id="'+json.result[i].id+'">'+					
									'<p class="chatName">'+json.result[i].orderName+'<span class="chatNameDetial">'+payState+'</span></p>'+
									'<p class="chatTime">'+changeTime(time.getFullYear(),parseInt(time.getMonth()+1),time.getDay(),time.getHours(),time.getMinutes(),time.getSeconds())+'</span></p></a></li>';
	      					}
	      				document.querySelector('#orderChat .orderUl').innerHTML=lidata;
	      				console.log(JSON.stringify(json))
	      				mui('.mui-table-view-cell').on('tap','.ChatA',function(){
			      			var titlename=this.title.search(/order/)==-1?'系统消息':'订单消息';
			      			var orderid=this.id;
			      			mui.openWindow({
			      				url:'ChatDetail.html',
			      				id:'ChatDetail',
			      				show: {
									duration: 300,
									aniShow: "pop-in"
								},
								extras:{
							        title:titlename,
							        orderid:orderid
							    }
			      			})
			      		})
	      			},beforeSend:function(){
							plus.nativeUI.showWaiting("努力加载中。。。");
						},error:function(XMLHttpRequest){
	      					plus.nativeUI.closeWaiting();
	      					mui.toast("网络错误，请重试！");
	      				}
		    	})
		    	//系统消息
		    	mui.ajax(_config+'/doctor/getAllSysMessageByState',{
		    		data:{
		    			state:'0'
		    		},
	      			type:"GET",
	      			success:function(json){
	      				plus.nativeUI.closeWaiting();
	      				var lidata='';
	      				
	      				console.log(JSON.stringify(json))
	      				
	      			},beforeSend:function(){
							plus.nativeUI.showWaiting("努力加载中。。。");
						},error:function(XMLHttpRequest){
	      					plus.nativeUI.closeWaiting();
	      					mui.toast("网络错误，请重试！");
	      				}
		    	})
		    })
      		
      			
      		
      	});
      	function changeTime(y,m,d,h,mi,s){
			    		
      		//设置日期格式
      		if(m<10){
      			m="0"+m;
      		}
      		if(d<10){
      			d="0"+d;
      		}
      		
      		if(h<10){
      			h="0"+h;
      		}
      		if(mi<10){
      			mi='0'+mi;
      		}
      		if(s<10){
      			s='0'+s;
      		}
      		var data_result=y+"-"+m+"-"+d+'<span class="timeDetial">'+h+':'+mi+':'+s;//时间
      		return data_result;
		}