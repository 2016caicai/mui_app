mui.plusReady(function(){
	var headerOne=document.getElementsByClassName('headerOne')[0];
	var year=headerOne.getElementsByClassName('year')[0];
	var Mounth=headerOne.getElementsByClassName('Mounth')[0];
	var SetMounth=document.getElementById('SetMounth');
	var timeul=SetMounth.querySelector('ul');
	var yue_li=document.getElementsByClassName("yue_li");
	var person=localStorage.getItem('person_ol');
	var mouth_in=document.getElementsByClassName('mouth-in')[0];
	var mouth_up=document.getElementsByClassName('mouth-up')[0];
	var yue_ul=document.getElementsByClassName('yue_ul')[0];
		person=JSON.parse(person);
	var data=new Date();
	var self = plus.webview.currentWebview();
	    self.addEventListener('show',function(){
	    	var data=new Date();
	    	year.innerHTML=data.getFullYear();
	    	var mou=data.getMonth()+1;
	    	Mounth.innerHTML=mou;
	    	var timeli='';
	    	getmouth(changeTime(data.getFullYear(),mou));
	    	for(var j=0;j<4;j++){
	    		var i=parseInt(mou-j);
	    		var DAY=changeTime(data.getFullYear(),i)
	    		timeli+="<li class='mui-table-view-cell' title="+DAY+">"+parseInt(i)+"月</li>";
	    	}	    	
	    	timeul.innerHTML=timeli;
	    	mui.ajax(_config+'/doctor/getBillByType',{
	    		data:{
	    			docId:person.user_id
	    		},
	    		type:"GET",
	  			success:function(json){
	  				plus.nativeUI.closeWaiting();
	  				var result=json.result;
	  				console.log(JSON.stringify(json))
	  				if(result){
	  					mouth_in.innerHTML=result.get;
	  					mouth_up.innerHTML=result.income;
	  				}else{
	  					mouth_in.innerHTML=0;
	  					mouth_up.innerHTML=0;
	  				}
	  				
	  			},beforeSend:function(){
	  				plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
	  					plus.nativeUI.closeWaiting(); 				
	  						mui.toast("网络错误，请重试！");
	  				}
	    	})
	    })
	mui(".mui-table-view").on("tap",".mui-table-view-cell",function(){
		Mounth.innerHTML=parseInt(this.innerHTML);
		 getmouth(this.title);
	})
	function getmouth(mouth){
		mui.ajax(_config+'/doctor/getBillByCondition',{
	    		data:{
	    			docId:person.user_id,
	    			month:mouth
	    		},
	    		type:"GET",
	  			success:function(json){
	  				plus.nativeUI.closeWaiting();
	  				var result=json.result;
	  				console.log(JSON.stringify(json))
	  				if(result.resultList!=''){
	  					var lidetail='';
	  					for(var i=0;i<result.resultList.length;i++){
	  						var type='';
	  						if(result.resultList[i].type==0){
	  							type='收入';
	  						}else{
	  							type='提现';
	  						}
	  						lidetail+="<li class='yue_li'><p><span class='type'>"+type+"</span>￥<span class='trademoney'>"+result.resultList[i].tradeMoney+"</span></p></li>";
	  					}
	  					yue_ul.innerHTML=lidetail;
	  				}else{
	  					yue_ul.innerHTML='---本月没有数据---';
	  				}
	  				
	  			},beforeSend:function(){
	  				plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
	  					plus.nativeUI.closeWaiting(); 				
	  						mui.toast("网络错误，请重试！");
	  				}
	    	})};
	function changeTime(y,m){
			var data_todayMonth=m;
      		//设置日期格式
      		if(data_todayMonth<10){
      			data_todayMonth="0"+data_todayMonth;
      		}
      		var data_result=y+"-"+data_todayMonth;//时间
      		return data_result;
		}
	for(var i=0;i<yue_li.length;i++){
		if(yue_li[i].childNodes[0].childNodes[0].innerHTML=="提现"){
			yue_li[i].childNodes[0].childNodes[2].color="blaxk"
		}
	}
})
