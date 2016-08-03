mui.init({
	beforeback: function(){
		//获得列表界面的webview
		var list = plus.webview.getWebviewById('balanceAddcard');
		//触发列表界面的自定义事件（refresh）,从而进行数据刷新
		mui.fire(list,'refreshcard');
		//返回true，继续页面关闭逻辑
		return true;
	}});
mui.ready(function(){
	var username=document.getElementsByClassName('username')[0];
	var usercard=document.getElementsByClassName('usercard')[0];
	var usercard2=document.getElementsByClassName('usercard2')[0];
	var bindcard=document.getElementById('bindcard');
	var form={username:false,usercard:false,usercard2:false};
	var reg1=/[\u4E00-\u9FA5]{2,7}/g;
	var reg2=/^\d{16}|\d{19}$/;
	var last;
	var person=localStorage.getItem("person_ol");//获取本地信息
      	person=JSON.parse(person);
	username.onkeyup=function(event){
		var self=this;
		  last = event.timeStamp;
       //利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
       setTimeout(function(){    //设时延迟0.5s执行
            if(last-event.timeStamp==0)
               //如果时间差为0（也就是你停止输入0.5s之内都没有其它的keyup事件发生）则做你想要做的事
              {
                  reg1.test(self.value)?form.username=true:form.username=false;//做你要做的事情
                  if(form.username==false)mui.toast('请输入正确姓名');
                  checki();
               }
        },800);
	}
	usercard.onkeyup=function(event){
		var self=this;
		  last = event.timeStamp;
       //利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
       setTimeout(function(){    //设时延迟0.5s执行
            if(last-event.timeStamp==0)
               //如果时间差为0（也就是你停止输入0.5s之内都没有其它的keyup事件发生）则做你想要做的事
              {
                  reg2.test(self.value)?form.usercard=true:form.usercard=false;//做你要做的事情
                  if(form.usercard==false)mui.toast('请输入正确卡号');
                  checki();
               }
        },800);
	}
	usercard2.onkeyup=function(event){
		  last = event.timeStamp;
       //利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
       setTimeout(function(){    //设时延迟0.5s执行
            if(last-event.timeStamp==0)
               //如果时间差为0（也就是你停止输入0.5s之内都没有其它的keyup事件发生）则做你想要做的事
              {
                  usercard2.value==usercard.value?form.usercard2=true:form.usercard2=false;//做你要做的事情
                  if(form.usercard2==false)mui.toast('两次输入卡号都一样');
                  checki();
               }
        },800);
	}
	function checki(){
		var i=0;
		form.username?i++:i=i;
		form.usercard?i++:i=i;
		form.usercard2?i++:i=i;
		console.log(i);
		i==3?bindcard.disabled=false:bindcard.disabled=true;
	}
	bindcard.addEventListener('tap',function(){
		mui.ajax(_config+'/doctor/addBankCard ',{
			data:{
				docId:person.user_id,
				cardNo:usercard.value,
				name:username.value
			},
  			type:"POST",
  			success:function(json){
  				plus.nativeUI.closeWaiting();
  				console.log(JSON.stringify(json))
  				if(json.status==400){
  					mui.toast(json.result);
  				}
  			},beforeSend:function(){
  				plus.nativeUI.showWaiting("努力加载中。。。");
				},error:function(XMLHttpRequest){
  					plus.nativeUI.closeWaiting(); 				
  						mui.toast("网络错误，请重试！");
  				}
		})
	})
})
