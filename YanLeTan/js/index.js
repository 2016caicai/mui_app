mui.plusReady(function(){
      		var HomePage=document.getElementById("HomePage");
      		var ChatPage=document.getElementById("ChatPage");
      		var MinePage=document.getElementById("MinePage");
      		var mui_tab_item=document.getElementsByClassName("mui-tab-item");
      		var firsttime=null;
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
      		HomePage.addEventListener("tap",function(){
      			HomePage.children[0].children[0].src="../img/home@2x.png";
				ChatPage.children[0].children[0].src="../img/iconfont-xiaoxi@2x.png";
				MinePage.children[0].children[0].src="../img/iconfont-gengduo-(1)@2x.png";
      			
      		})
      		ChatPage.addEventListener("tap",function(){
				HomePage.children[0].children[0].src="../img/iconfont-meiriyicai@3x.png";
				ChatPage.children[0].children[0].src="../img/tuoyuan9-2@2x.png";
				MinePage.children[0].children[0].src="../img/iconfont-gengduo-(1)@2x.png";
      		})
      		MinePage.addEventListener("tap",function(){
				
				HomePage.children[0].children[0].src="../img/iconfont-meiriyicai@3x.png";
				ChatPage.children[0].children[0].src="../img/iconfont-xiaoxi@2x.png";
				MinePage.children[0].children[0].src="../img/juxin-36-@2x.png";
      		})
      		
      	
      	mui.init();
      	//子页面切换
      	(function(){
      		var subpages = ['Home/HomeIndex.html','Chat/ChatIndex.html',  'Mine/MineIndex.html'];
			var subpage_style = {
				top:"0px",
				bottom: '50px'
			};
			
			var aniShow = {};
			
			 //创建子页面，首个选项卡页面显示，其它均隐藏；
			mui.plusReady(function() {
				var self = plus.webview.currentWebview();
				for (var i = 0; i < 3; i++) {
					var temp = {};
					var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
					if (i > 0) {
						sub.hide();
					}else{
						temp[subpages[i]] = "true";
						mui.extend(aniShow,temp);
					}
					self.append(sub);
				}
			});
			 //当前激活选项
			 console.log(subpages[0])
			var activeTab = subpages[0];
			 //选项卡点击事件
			mui('.mui-bar-tab').on('tap', 'a', function(e) {

				var targetTab = this.getAttribute('href');
				if (targetTab == activeTab) {
					return;
				}
				//显示目标选项卡
				//若为iOS平台或非首次显示，则直接显示
				if(mui.os.ios||aniShow[targetTab]){
					plus.webview.show(targetTab);
				}else{
					//否则，使用fade-in动画，且保存变量
					var temp = {};
					temp[targetTab] = "true";
					mui.extend(aniShow,temp);
					plus.webview.show(targetTab,"fade-in",300);
				}
				//隐藏当前;
				plus.webview.hide(activeTab);
				//更改当前活跃的选项卡
				activeTab = targetTab;
			});
			 //自定义事件，模拟点击“首页选项卡”
			document.addEventListener('gohome', function() {
				var defaultTab = document.getElementsByClassName("defaultTab");
				//模拟首页点击
				mui.trigger(defaultTab, 'tap');
				//切换选项卡高亮
				var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
				if (defaultTab !== current) {
					current.classList.remove('mui-active');
					defaultTab.classList.add('mui-active');
				}
			});
      	})();
      	})