	mui.init();
      	mui.plusReady(function(){
      		document.getElementsByClassName("mui-content")[0].addEventListener('tap',function(event){
      			var ev = ev || window.event;
    			var target = ev.target || ev.srcElement;
    			if(target.title){
      			openwebview(target.title)
      			}//页面跳转委托
      			event.preventDefault();//阻止默认事件
      		},false)
      		function openwebview(href){
      			mui.openWindow({
      				url:href+".html",
      				id:href,
      				show: {
						duration: 300,
						aniShow: "pop-in"
					},
					waiting: {
						autoShow: false
					}
      			})
      		}
      	})