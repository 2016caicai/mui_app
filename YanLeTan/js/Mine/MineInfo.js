mui.init();
      	var person=localStorage.getItem("person_ol");//获取本地存储信息 		
	  		person=JSON.parse(person);//对象
      	mui.plusReady(function(){
      		var userimg=document.getElementById("userimg");//图片
      		var MineNameval=document.getElementById("MineNameval");//姓名
      		var MineWorkval=document.getElementById("MineWorkval");//职称
      		var change_address=document.getElementById("MinenAddress");//省市区按钮
			var change_hospital=document.getElementById("MineHospitalval");//医院
			var change_MineWorkAddressval=document.getElementById("MineWorkAddressval");//科室
			var MinePersonalval=document.getElementById("MinePersonalval");//疾病
			var showCityPickerButton = document.getElementById('MinenAddressval');//城市数据
			var cityResult3 = document.getElementById('cityResult3');//城市控件
      		var span_right=document.getElementsByClassName("span_right"); 
			var province = new mui.PopPicker();//省
			var city=new mui.PopPicker();//市
			var qu=new mui.PopPicker();//区
      		var _province=person.user_address_province;
      		var _city=person.user_address_city;
 			var _areaId=person.user_address_area;//区域id
      		var _hopId=person._hopId;//医院id
      		var _depId=person._depId;//科室id
      		var _posId=person._posId;//职称id
      		var _disId=person._disId;//疾病id
      		var span_li=person._disId;
      		var _disName="";
        	//重写回退键,防止返回出现白屏
      		mui.back=function(){
      			
				setTimeout(function(){
					mui.openWindow({
					url:"../../app/index.html",
					id:"index",
					show: {
						duration: 300,
						aniShow: "pop-in"
					},
					waiting: {
						autoShow: false
					}
					})
				},5)
      		}
			//页面出现
      		var self = plus.webview.currentWebview();
		    self.addEventListener('show',function(){
      		//获取原始数据
      		mui.ajax(_config+"/doctor/getDoctorInfo",{
      			data:{
      				docId:person.user_id
      			},
      			type:"GET",
      			success:function(json){
      				plus.nativeUI.closeWaiting();
					userimg.src=_config+person.user_img;//头像
					if(json.result!=null){
					if(json.result[0].realName!=null){
						MineNameval.value=json.result[0].realName;//名字
					}else{
						MineNameval.value="";//名字
					}
      				showCityPickerButton.innerHTML=json.result[0].area;//省市區
      				if(json.result[0].posName!=null){
						MineWorkval.innerHTML=json.result[0].posName;//科室
					}else{
						MineWorkval.innerHTML="请设置";//科室
					}
					if(json.result[0].area!=null){
						showCityPickerButton.innerHTML=json.result[0].area;//省市區
					}else{
						showCityPickerButton.innerHTML="请设置";//省市區
					}
      				
      				if(json.result[0].hosName!=null){
						change_hospital.innerHTML=json.result[0].hosName;//醫院
					}else{
						change_hospital.innerHTML="请设置";//醫院
					}
      				if(json.result[0].depName!=null){
						change_MineWorkAddressval.innerHTML=json.result[0].depName;//職務
					}else{
						change_MineWorkAddressval.innerHTML="请设置";//職務
					}}
      				if(person.user_disease_name[0]!=null){
      				if(person.user_disease_name.length==1){      					
      					MinePersonalval.innerHTML=person.user_disease_name[0];
      				}else{
      					_disName=person.user_disease_name[0]
      					for(var i=1;i<person.user_disease_name.length;i++){
      						_disName+=","+person.user_disease_name[i];
      					}
      					MinePersonalval.innerHTML=_disName;//疾病
      				}}else{
      					MinePersonalval.innerHTML="请设置";//疾病
      				}
      				
      			},beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      					mui.toast("网络错误，请重试！");
      				}
      		})
      		//获得省
      		mui.ajax(_config+"/area/getAllProvinces",{
      			type:"GET",
				timeout: 10000,
				dataType:"json",
				success: function(a) {				
					province.setData(a.result);
				}
      		})	
		    })
      		//提交按钮
      		mui(".mui-content").on("tap",".login_btn",function(){
      			document.activeElement.blur();
      			var btnArray = ['否', '是'];
      			var spanR=0;
      			for(var i=0;i<span_right.length;i++){
      				if(span_right[i].innerHTML=="请设置"){
      					break;
      				}else{
      					spanR++;
      				}
      			}
      			if(spanR==5){
				mui.confirm('确认提交修改？', '温馨提示', btnArray, function(e) {
					if (e.index == 1) {
  				var person=localStorage.getItem("person_ol");
  				person=JSON.parse(person);
					//提交认证
  					mui.ajax(_config+"/doctor/submitCertification",{
  						data:{
  							id:person.user_id,
							headImg:person.user_img,
							realName:MineNameval.value,
							province:_province,
							city:_city,
							area:_areaId,
							hopId:_hopId,
							posName:MineWorkval.innerHTML,
							depId:_depId,
							diseaseId:"["+_disId+"]"
  						},
  						type:"POST",
  						timeout: 10000,
  						success:function(json){
  							console.log(JSON.stringify(json));
			  				_person=JSON.stringify(person);
			  				console.log(_person);
			  				localStorage.setItem("person_ol",_person);
  							plus.nativeUI.closeWaiting();
  							if(json.status==200){
  								var wobj = plus.webview.getWebviewById("index");
  								wobj.close();
								//wobj.reload(true);
								setTimeout(function(){
									mui.openWindow({
  									url:"../../app/index.html",
  									id:"index",
									show: {
										duration: 300,
										aniShow: "pop-in"
									},
									waiting: {
										autoShow: false
									}
  									})
								},500)
  								
	  						}else{
	      						plus.nativeUI.toast("请设置全部数据");
	      					}
  						},beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      					plus.nativeUI.toast("个人信息未完善，修改失败");
      				}
				})
			} else {
				mui.toast("取消提交");
			}
		})
  		}else{
		plus.nativeUI.toast("个人信息未完善，修改失败");}
	})
      		//照片来源按钮
      		document.getElementById("MinePhoto").addEventListener("tap",function(){
      			mui("#popover").popover("toggle");
      		});
			//省市区按钮
			change_address.addEventListener('tap', function(event) {
				province.show(function(items) {
					showCityPickerButton.innerHTML=items[0] .text+"-";
					_province=items[0] .provinceId;
					person.user_address_province=items[0] .provinceId;
						mui.ajax(_config+"/area/getCitiesByCondition",{
							data:{provinceId:items[0].provinceId},
							type:"GET",
							timeout: 10000,
							success: function(b) {
								plus.nativeUI.closeWaiting();
								if(b.result==""){
									plus.nativeUI.toast("此省下没有所属市")
								}else{
								var len=b.result.length;				
								for(var i=0;i<len;i++){
									b.result[i].text=b.result[i].city
								}
								city.setData(b.result);
								city.show(function(items) {
									showCityPickerButton.innerHTML+=items[0] .city+"-";
									_city=items[0] .cityID;
									person.user_address_city=items[0] .cityID;
									mui.ajax(_config+"/area/getAreasByCondition",{
										data:{cityId:items[0].cityID},
										type:"GET",
										dataType:"json",
										timeout: 10000,
										success: function(c) {
											plus.nativeUI.closeWaiting();
											if(c.result==""){
												plus.nativeUI.toast("此市下没有所属区域")
											}else{
											var len=c.result.length;				
											for(var i=0;i<len;i++){
												c.result[i].text=c.result[i].area;
											}
											qu.setData(c.result);
											qu.show(function(items) {
												showCityPickerButton.innerHTML+=items[0] .area;
												_area=items[0] .area;
												if(_areaId!=items[0] .areaId){
													_areaId=items[0] .areaId;
													change_hospital.innerHTML="请设置";
													_hopId=="";//医院
													_depId=="";//科室
													change_MineWorkAddressval.innerHTML="请设置";
													MineWorkval.innerHTML="请设置";
													_disId="";//疾病
													MinePersonalval.innerHTML="请设置";
												}
												person.user_address_area=items[0] .areaId;	
											})
										}},beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
							},error:function(XMLHttpRequest){
		      					plus.nativeUI.closeWaiting();
		      					plus.nativeUI.toast("网络错误，请重试！");
		      				}
						})
					})
				}},beforeSend:function(){
				plus.nativeUI.showWaiting("努力加载中。。。");
					},error:function(XMLHttpRequest){
      					plus.nativeUI.closeWaiting();
      						plus.nativeUI.toast("网络错误，请重试！");
      				}
				})
			});			
		}, false);
			//医院,科室，职务，疾病
			document.getElementsByClassName("ul_li")[0].addEventListener('tap',function(event){
	  			var ev = event || window.event;
				var target = event.target || event.srcElement;
	  			switch(target.title){
	  				//医院
	  				case 'MineHospital':(function(){
							  					var reg = new RegExp("-", "g");
						if(_areaId == null || showCityPickerButton.innerHTML.match(reg).length != 2) {
							mui.toast("请先选择省-市-区");
						} else {
							var hospital = new mui.PopPicker();
							mui.ajax(_config + "/doctor/getHospitByArea", {
								data: {
									areaId: _areaId
								},
								type: "GET",
								success: function(json) {
									plus.nativeUI.closeWaiting();
									var len = json.result.resultList.length;
									if(json.result.resultList == "") {
										mui.toast("此区域下没有所属医院")
									} else {
										for(var i = 0; i < len; i++) {
											json.result.resultList[i].text = json.result.resultList[i].hosName;
										}
										hospital.setData(json.result.resultList);
										hospital.show(function(items) {
											change_hospital.innerText = items[0].hosName;
											if(_hopId != items[0].id) {
												_hopId = items[0].id;
												_depId == ""; //科室
												change_MineWorkAddressval.innerHTML = "请设置";
												MineWorkval.innerHTML = "请设置";
												_disId = ""; //疾病
												MinePersonalval.innerHTML = "请设置";
											}
											person._hopId = items[0].id;
						
										});
									}
								},
								beforeSend: function() {
									plus.nativeUI.showWaiting("努力加载中。。。");
								},
								error: function(XMLHttpRequest) {
									plus.nativeUI.closeWaiting();
									plus.nativeUI.toast("网络错误，请重试！");
								}
							});
						};
					})();
	  				break;
	  				//科室
	  				case 'MineWorkAddress':(function() {
	  					console.log("医院" +_hopId);
						if(change_hospital.innerHTML == "请设置") {
							mui.toast("请先选择所在医院");
						} else {
							var WorkAddress = new mui.PopPicker();
							mui.ajax(_config + "/doctor/getDepartmentByHosId", {
								data: {
									hosId: _hopId
								},
								type: "GET",
								success: function(json) {
									plus.nativeUI.closeWaiting();
									if(json.result.resultList == "") {
										mui.toast("此医院下没有所属科室")
									} else {
										var len = json.result.resultList.length;
										for(var i = 0; i < len; i++) {
											json.result.resultList[i].text = json.result.resultList[i].depName;
										}
										WorkAddress.setData(json.result.resultList);
										WorkAddress.show(function(items) {
											/*userResult.innerText = JSON.stringify(items[0]);*/
											/*userResult.innerText = JSON.stringify(items[0],switchUpper);*/
											change_MineWorkAddressval.innerHTML = items[0].text;
											person._depId = items[0].id;
											if(_depId != items[0].id) {
												_depId = items[0].id;
												MineWorkval.innerHTML = "请设置";
												_disId = "";
												MinePersonalval.innerHTML = "请设置";
											}
										});
									}
								},
								beforeSend: function() {
									plus.nativeUI.showWaiting("努力加载中。。。");
								},
								error: function(XMLHttpRequest) {
									plus.nativeUI.closeWaiting();
									plus.nativeUI.toast("网络错误，请重试！");
								}
							});
						}
					})();
	  				break;
	  				//职务
	  				case 'MineWork':(function(){
	  					console.log("科室"+ _depId);
						if(MineWorkAddressval.innerHTML == "请设置") {
						mui.toast("请先选择所在科室");
					} else {
						var MineWorker = new mui.PopPicker();
						mui.ajax(_config + "/doctor/getPositionByDepId", {
							data: {
								depId: _depId
							},
							type: "GET",
							success: function(json) {
								plus.nativeUI.closeWaiting();
								if(json.result.resultList == "") {
									mui.toast("此科室下没有所属职务")
								} else {
									var len = json.result.resultList.length;
									for(var i = 0; i < len; i++) {
										json.result.resultList[i].text = json.result.resultList[i].posName;
									}
									MineWorker.setData(json.result.resultList);
									MineWorker.show(function(items) {
										/*userResult.innerText = JSON.stringify(items[0]);*/
										/*userResult.innerText = JSON.stringify(items[0],switchUpper);*/
										MineWorkval.innerHTML = items[0].text;
										person._posId = items[0].id;
									});
								}
							},
							beforeSend: function() {
								plus.nativeUI.showWaiting("努力加载中。。。");
							},
							error: function(XMLHttpRequest) {
								plus.nativeUI.closeWaiting();
								plus.nativeUI.toast("网络错误，请重试！");
							}
						});
					}
					})();
	  				break;
	  				//疾病
	  				case 'MinePersonal':(function(){
	  					console.log("科室"+ _depId);
						if(MineWorkAddressval.innerHTML == "请设置") {
							mui.toast("请先选择所在科室");
						} else {
							var MinePersonaler = new mui.PopPicker();
							mui.ajax(_config + "/doctor/getDiseaseByDepId", {
								data: {
									depId: _depId
								},
								type: "GET",
								success: function(json) {
									plus.nativeUI.closeWaiting();
									if(json.result.resultList == "") {
										mui.toast("此科室下没有疾病分类");
									} else {
										var len = json.result.resultList.length;
										for(var i = 0; i < len; i++) {
											json.result.resultList[i].text = json.result.resultList[i].disName;
										}
										MinePersonaler.setData(json.result.resultList);
										MinePersonaler.show(function(items) {
											console.log(_disId);
											if(_disId != "") {
												if(span_li.indexOf(items[0].id) == "-1") {
													MinePersonalval.innerHTML += "," + items[0].text;
													span_li += "," + items[0].id;
												} else {
													plus.nativeUI.toast("此疾病已选择");
												}
											} else {
												MinePersonalval.innerHTML = items[0].text;
												span_li = items[0].id.toString();
											}
											_disId = span_li;
										});
									}
								},
								beforeSend: function() {
									plus.nativeUI.showWaiting("努力加载中。。。");
								},
								error: function(XMLHttpRequest) {
									plus.nativeUI.closeWaiting();
									plus.nativeUI.toast("网络错误，请重试！");
								}
							});
						}
	  				})();
	  				break;
	  				}
	  			})
     	})
      	//上传图片
	function imgupgrade(img) {
		dataURL=img[0].substring(23);
		console.log(dataURL);
        mui.ajax(_config+"/base/imageUploadByBase64",{
        	data: {
    		fileName:"image.png",
			fileContent:dataURL //base64数据    
			},
			type: "POST",
			timeout: 10000,
        	success:function(json){
        		if(json.status==200){
        		plus.nativeUI.toast("上传成功");
        		plus.nativeUI.closeWaiting();
        		person.user_img = json.result;
				person = JSON.stringify(person);
				localStorage.setItem("person_ol", person);
        		}else{
        			plus.nativeUI.toast("请重试");
        		}
        	},beforeSend:function(){
			plus.nativeUI.showWaiting("努力上传中。。。");
				},error:function(XMLHttpRequest){
  					plus.nativeUI.closeWaiting();
  					plus.nativeUI.toast(XMLHttpRequest.status);
  					if(XMLHttpRequest.status==0){
  						plus.nativeUI.toast("网络错误，请重试");
  					}
  				}
	        })
		}