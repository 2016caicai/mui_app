mui.init();

mui.plusReady(function(){
	var person=localStorage.getItem("person_ol");
	console.log(person)
	person=JSON.parse(person);
	//分享
	document.getElementsByClassName("orderUl")[0].addEventListener('tap',function(event){
      			var ev = event || window.event;
    			var target = event.target || event.srcElement;
      			//openwebview(target.title)//页面跳转委托
      			switch(target.title){
      				case "weichat":updateSerivces(1);break;//分享 微信朋友
      				case "weichatspace":updateSerivces(0);break;//分享 微信朋友圈
      				case "weibo":updateSerivces(2);break;//分享 微博
      				case "qqspace":updateSerivces(3);break;//分享 qq空间
      				case "qq":updateSerivces(3);break;//分享 qq
      				default:copyToClip();break;//分享 链接
      			}
      			event.preventDefault();//阻止默认事件
      		},false)
	//复制链接
function copyToClip(){
	if(plus.android.runtimeMainActivity){
		//安卓
  	var Context = plus.android.importClass("android.content.Context");
    var main = plus.android.runtimeMainActivity();
    var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
    plus.android.invoke(clip,"setText","https://www.pgyer.com/VVRi");
	}else if(plus.ios){
		//获取剪切板
		var UIPasteboard  = plus.ios.importClass("UIPasteboard");
		var generalPasteboard = UIPasteboard.generalPasteboard();
		// 设置/获取文本内容:
		generalPasteboard.setValueforPasteboardType("https://www.pgyer.com/VVRi", "public.utf8-plain-text");
		var value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text");   
	}
	plus.nativeUI.toast("已复制到剪贴板");
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
	if(document.getElementsByClassName('mui-title')[0].innerHTML=='邀请患者'){
		var msg={content:'我正在用养乐堂医生端，有什么问题可以使用养乐堂用户端向我咨询！',extra:{scene:sb.x}};
		if(bh){
			msg.href="https://www.pgyer.com/RJos";
			msg.title="我是"+person.user_realName+"医生";
			msg.thumbs=["../../img/yishen@3x.png"];
			msg.pictures=[_config+person.user_img];
		}
	}else{
		var msg={content:'我正在用养乐堂医生端，有什么问题可以向我咨询！',extra:{scene:sb.x}};
		if(bh){
			msg.href="https://www.pgyer.com/VVRi";
			msg.title="我是"+person.user_realName+"医生";
			msg.thumbs=["../../img/yishen@3x.png"];
			msg.pictures=[_config+person.user_img];
		}
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
})

(function(b) {
			var a = 0;	  //如果a值大于0则表示当前环境支持沉浸式状态栏。 
			
			/* "Html5Plus/1.0 (Immersed/30)",其中Immersed/后的30表示状态栏的高度，单位为逻辑像素值。可以使用正则表达式进行获取 */
			var c = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
			if (c && c.length >= 3) {		// 当前环境为沉浸式状态栏模式
				a = parseFloat(c[2])		// 获取状态栏的高度
			}
			b.immersed = a;
			if (!a) {
				return
			}
			
			/*
		 	*获取状态栏高度后，可以使用js动态修改DOM元素的css属性来设置样式，如设置界面头区域的顶部内边距为状态栏的高度（避免系统状态栏与界面头重叠）
		 	*/
		 	var c=document.querySelector(".mui-content");// .style.marginTop=parseInt(a)+45+"px";
		 	c.style.marginTop=parseInt(a)+45+"px";
			var d = document.getElementsByTagName("header")[0];
			var e = document.getElementById("stylesheet");  //在header中修改状态栏和header的样式，（高度，颜色）
			d && (d.style.height = (a + 44) + "px", d.style.paddingTop = a + "px", d.style.background = "#CAB075", d.style.color = "#fff");
			e && (e.innerText = ".mui-bar-nav ~ .mui-content{padding-top: " + (44 + a) + "px;}.error-text{top: " + (44 + a) + "px;}.menu-top{padding-top: " + (44 + a) + "px;}");
		 	var f=document.querySelector(".mui-slider.mui-fullscreen");
		 	f.style.marginTop=45-parseInt(a)+"px";
		})(window); 