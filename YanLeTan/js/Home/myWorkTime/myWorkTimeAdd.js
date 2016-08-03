mui.init();
      	var DateSetting=document.getElementById("DateSetting");//年月日
      	var person=localStorage.getItem("person_ol");//本地信息
      	person=JSON.parse(person);
      	var TimeBox=document.getElementsByClassName("TimeBox");//时间段
      	var setPrice=document.getElementById("setPrice");//价格
      	var selectAddress=document.getElementsByClassName("selectAddress")[0];//地址
      	var timearr=[];//时间段数组
      	mui.plusReady(function(){
      		if(person.user_hospital_address){
      		selectAddress.innerHTML=person.user_hospital_address;
      		}else{
      			selectAddress.innerHTML="未设置医院地址，请到个人中心设置！"
      		}
//    		//添加地址
//    		mui(".WorkTimelI").on("tap","#AddAddress",function(){
//    			mui.openWindow({
//    				url:"./myWorkTimeAddAddress.html",
//    				id:"myWorkTimeAddAddress"
//    			})
//    		});
      		//删除时间段
      		mui(".timeSettingBox").on("tap",".TimeBox",function(){
      			this.remove();
      		});
//    		//删除地址
//    		mui(".mui-slider-right").on("tap",".mui-btn-red",function(){
//    			this.parentNode.parentNode.remove();
//    		});
			
      		//确定添加排班
      		mui(".Surebtn").on("tap","#Sure",function(){
      			for(var i=0;i<TimeBox.length;i++){
      				timearr.push(TimeBox[i].innerHTML);
      			}
      			var timestr=timearr.join(",");//数组转字符串//时间段字符串
      			timearr=[];//还原时间段
      			if(setPrice.value==""||timestr==""){
      			plus.nativeUI.toast("请填入正确信息"); 
      			return false;//判断时间和金额是否填入；
      			}else{
      			mui.ajax(_config+"/doctor/newSchedul",{
      				data:{
      					doctorId:person.user_id,
						calendarDate:DateSetting.innerHTML,
						beginTime:timestr,
						price:setPrice.value,
						place:selectAddress.innerHTML
      				},
      				type:"POST",
      				success:function(json){
      					plus.nativeUI.closeWaiting();
      					mui.toast(json.message);
      					mui.openWindow({
      						url:"./myWorkTimeIndex.html",
      						id:"myWorkTimeIndex",
      						show: {
								duration: 300,
								aniShow: "pop-in"
							}
      					})
      				},beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      					if(XMLHttpRequest.status==400){
      						plus.nativeUI.toast("请填入正确完排班信息");
      					}else{
      						plus.nativeUI.toast("网络连接失败");
      					}
      				}
      			})}
      			
      		})
      	});
      	(function($) {
				$.init();
				var result = DateSetting;
				document.getElementById('DateSetting').addEventListener('tap', function() {
					var optionsJson = this.getAttribute('data-options') || '{}';
					var options = JSON.parse(optionsJson);
					var id = this.getAttribute('id');
					/*
					 * 首次显示时实例化组件
					 * 示例为了简洁，将 options 放在了按钮的 dom 上
					 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
					 */
					var Datepicker = new $.DtPicker(options);
					Datepicker.show(function(rs) {
						/*
						 * rs.value 拼合后的 value
						 * rs.text 拼合后的 text
						 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
						 * rs.m 月，用法同年
						 * rs.d 日，用法同年
						 * rs.h 时，用法同年
						 * rs.i 分（minutes 的第二个字母），用法同年
						 */
						result.innerText = rs.text;
						/* 
						 * 返回 false 可以阻止选择框的关闭
						 * return false;
						 */
					});
				}, false);
			})(mui);
			(function($) {
				$.init();
				var Box=document.getElementsByClassName("timeSettingBox")[0];
				document.getElementById('AddDate').addEventListener('tap', function() {
					var optionsJson = this.getAttribute('data-options') || '{}';
					var options = JSON.parse(optionsJson);
					var id = this.getAttribute('id');
					/*
					 * 首次显示时实例化组件
					 * 示例为了简洁，将 options 放在了按钮的 dom 上
					 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
					 */
					var Timepicker = new $.DtPicker(options);
					Timepicker.show(function(rs) {
						/*
						 * rs.value 拼合后的 value
						 * rs.text 拼合后的 text
						 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
						 * rs.m 月，用法同年
						 * rs.d 日，用法同年
						 * rs.h 时，用法同年
						 * rs.i 分（minutes 的第二个字母），用法同年
						 */
						var n=0;
						for(var j=0;j<TimeBox.length;j++){
							if(rs.text==TimeBox[j].innerHTML){
								mui.toast("此时间段已添加")
									break;
							}else{
								n++
							}
						}
						if(n==TimeBox.length){
						var result = "<span class='TimeBox'>"+rs.text+"</span>";
						Box.innerHTML+=result;}
						/* 
						 * 返回 false 可以阻止选择框的关闭
						 * return false;
						 */
					});
				}, false);
			})(mui);