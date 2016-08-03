mui.init();
      	person=localStorage.getItem("person_ol");
      	person=JSON.parse(person);
      	mui.plusReady(function(){
      		if(person.user_balance!=null){
      			document.getElementsByClassName("headerL_val")[0].innerHTML=person.user_balance;
      		}else{
      			document.getElementsByClassName("headerL_val")[0].innerHTML="0";
      		}
      		
	      	mui(".mui-pull-right").on("tap","img",function(){
	      		mui.openWindow({
	      			url:"balanceDetail.html",
	      			id:"balanceDetail",
	      			show: {
						duration: 300,
						aniShow: "pop-in"
					}
	      		});
	      	});
	      	mui(".yue_header").on("tap",".headerR",function(){
	      		mui.openWindow({
	      			url:"balanceRawal.html",
	      			id:"balanceRawal",
	      			show: {
						duration: 300,
						aniShow: "pop-in"
					}
	      		});
	      	});
      	})