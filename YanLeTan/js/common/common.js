/** 定义服务器接口的公共地址  **/
var _config = "http://192.168.0.78:8080/mccms-web";
var $config = function() {
	var a = "http://192.168.0.78:8080/mccms-web";//"http://192.168.0.65:8180/mccms-web";//http://192.168.0.78:8080/mccms-web//http://ylt.messcat.com
	return a
};

/** 定义uid和sessionKey的初始值 **/
/*window.localStorage.setItem("uid","0");
window.localStorage.setItem("sessionKey","");*/

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
	
})(window);
