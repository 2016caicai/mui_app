mui.init();
var person = localStorage.getItem("person_ol");

mui.plusReady(function() {
		var userimg = document.getElementById("userimg");
		var MineNameval = document.getElementById("MineNameval");
		var MineWorkval = document.getElementById("MineWorkval");
		var _province = null;
		var _city = null;
		var _hopId = null;
		var span_li = "";
		person = JSON.parse(person);
		if (person._depId != null) {
			var _depId = person._depId; //科室id
		}
		var span_right = document.getElementsByClassName("span_right");
		//提交按钮
		mui(".mui-content").on("tap", ".login_btn", function() {
			document.activeElement.blur();
			var num = 0;
			for (var i = 0; i < span_right.length; i++) {
				if (span_right[i].innerHTML.substring(0, 3) == "请设置") {
					mui.toast("请设置全部信息！");
				} else {
					num++
				}
			}
			if (num == 5) {
				var person = localStorage.getItem("person_ol");
				person = JSON.parse(person);
				//提交认证

				mui.ajax(_config + "/doctor/submitCertification", {
					data: {
						id: parseInt(person.user_id),
						headImg: person.user_img,
						realName: MineNameval.value,
						province: _province,
						city: _city,
						area: _areaId,
						hopId: _hopId,
						posName: MineWorkval.innerHTML,
						depId: _depId,
						diseaseId: "[" + span_li + "]"
					},
					type: "POST",
					success: function(json) {
						plus.nativeUI.closeWaiting();
						if (json.status == 200) {
							setTimeout(function(){
								mui.openWindow({
								url: "login.html",
								id: "login"
								})	
								}
							,50)
							
						} else {
							mui.toast(json.message);
						}
					},
					beforeSend: function() {
						plus.nativeUI.showWaiting("努力加载中。。。");
					},
					error: function(XMLHttpRequest) {
						plus.nativeUI.closeWaiting();
							mui.toast("网络错误，请重试！");
					}
				})

			}
		});
		//照片来源按钮
		document.getElementById("MinePhoto").addEventListener("tap", function() {
			mui("#popover").popover("toggle");
		});

		var province = new mui.PopPicker(); //省
		var city = new mui.PopPicker(); //市
		var qu = new mui.PopPicker(); //区
		//获得省

		mui.ajax(_config + "/area/getAllProvinces", {
			type: "GET",
			success: function(a) {
				console.log(a);
				console.log(JSON.stringify(a));
				plus.nativeUI.closeWaiting();
				province.setData(a.result);
			},
			beforeSend: function() {
				plus.nativeUI.showWaiting("努力加载中。。。");
			},
			error: function(XMLHttpRequest) {
				plus.nativeUI.closeWaiting();
				if (XMLHttpRequest.status == 0) {
					mui.toast("网络错误，请重试！");
				}
			}
		})
		var change_address = document.getElementById("MinenAddress");
		var change_hospital = document.getElementById("MineHospitalval");
		var change_MineWorkAddressval = document.getElementById("MineWorkAddressval");
		var showCityPickerButton = document.getElementById('MinenAddressval');
		var cityResult3 = document.getElementById('cityResult3');
		var _areaId = null;
		//省市区按钮
		change_address.addEventListener('tap', function(event) {
			province.show(function(items) {
				showCityPickerButton.innerHTML = items[0].text + "-";
				_province = items[0].provinceId;
				person._province = items[0].provinceId;
				mui.ajax(_config + "/area/getCitiesByCondition", {
						data: {
							provinceId: items[0].provinceId
						},
						type: "GET",
						timeout: 10000,
						success: function(b) {
							plus.nativeUI.closeWaiting();
							if (b.result == "") {
								mui.toast("此省下没有所属市");
							} else {
							var len = b.result.length;
							for (var i = 0; i < len; i++) {
								b.result[i].text = b.result[i].city
							}
							city.setData(b.result);
							city.show(function(items) {
								showCityPickerButton.innerHTML += items[0].city + "-";
								_city = items[0].cityID;
								person._city = items[0].cityID;
								mui.ajax(_config + "/area/getAreasByCondition", {
									data: {
										cityId: items[0].cityID
									},
									type: "GET",
									dataType: "json",
									timeout: 10000,
									success: function(c) {
										plus.nativeUI.closeWaiting();
										if (c.result == "") {
											mui.toast("此市下没有所属区域");
										} else {
										var len = c.result.length;
										for (var i = 0; i < len; i++) {
											c.result[i].text = c.result[i].area;
										}
										qu.setData(c.result);
										qu.show(function(items) {
											showCityPickerButton.innerHTML += items[0].area;
											_area = items[0].area;
											if(_areaId!=items[0].areaId){
												_areaId = items[0].areaId;
												change_hospital.innerHTML="请设置";
											}
											
											person._areaId = items[0].areaId;
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
					}

				)
			});
		}, false);
		//所在医院按钮
		mui(".mui-table-view-cell").on("tap", "#MineHospital", function() {
			var reg = new RegExp("-", "g");
			if (showCityPickerButton.innerHTML == "请设置"||showCityPickerButton.innerHTML.match(reg).length!=2) {
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

						if (json.result.resultList == "") {
							mui.toast("此区域下没有所属医院")
						} else {
							for (var i = 0; i < len; i++) {
								json.result.resultList[i].text = json.result.resultList[i].hosName;
							}
							hospital.setData(json.result.resultList);
							hospital.show(function(items) {
								change_hospital.innerText = items[0].hosName;
								person._hopId = items[0].id;
								if(_hopId!=items[0].id){
									_hopId = items[0].id;
									change_MineWorkAddressval.innerHTML="请设置";
									
								}
								
							});
						}
					},beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
							},error:function(XMLHttpRequest){
		      					plus.nativeUI.closeWaiting();
		      						plus.nativeUI.toast("网络错误，请重试！");
		      				}
				});
			}
		});
		//所在医院科室按钮
		mui(".mui-table-view-cell").on("tap", "#MineWorkAddress", function() {
			if (change_hospital.innerHTML == "请设置") {
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
						if(json.result.resultList==""){
                    		mui.toast("此医院下没有所属科室")
                    	}else{
						var len = json.result.resultList.length;
						for (var i = 0; i < len; i++) {
							json.result.resultList[i].text = json.result.resultList[i].depName;
						}
						WorkAddress.setData(json.result.resultList);
						WorkAddress.show(function(items) {
							/*userResult.innerText = JSON.stringify(items[0]);*/
							/*userResult.innerText = JSON.stringify(items[0],switchUpper);*/
							change_MineWorkAddressval.innerHTML = items[0].text;
							person._depId = items[0].id;
							if(_depId!=items[0].id){
									_depId = items[0].id;
									MineWorkval.innerHTML="请设置";
									span_li="";
									MinePersonalval.innerHTML = "请设置";
								}
							
						});
					}},beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
							},error:function(XMLHttpRequest){
		      					plus.nativeUI.closeWaiting();
		      						plus.nativeUI.toast("网络错误，请重试！");
		      				}
				});
			}
		});
		//获得科室下职务
		mui(".mui-table-view-cell").on("tap", "#MineWork", function() {
			if (MineWorkAddressval.innerHTML == "请设置") {
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
						if(json.result.resultList==""){
                    		mui.toast("此科室下没有所属职务")
                    	}else{
						var len = json.result.resultList.length;
						for (var i = 0; i < len; i++) {
							json.result.resultList[i].text = json.result.resultList[i].posName;
						}
						MineWorker.setData(json.result.resultList);
						MineWorker.show(function(items) {
							/*userResult.innerText = JSON.stringify(items[0]);*/
							/*userResult.innerText = JSON.stringify(items[0],switchUpper);*/
							MineWorkval.innerHTML = items[0].text;
							person._posId = items[0].id;
						});
					}},beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
							},error:function(XMLHttpRequest){
		      					plus.nativeUI.closeWaiting();
		      						plus.nativeUI.toast("网络错误，请重试！");
		      				}
				});
			}
		});
		//获得科室下疾病
		mui(".mui-table-view-cell").on("tap", "#MinePersonal", function() {
			if (MineWorkAddressval.innerHTML == "请设置") {
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
						if(json.result.resultList==""){
                    		mui.toast("此科室下没有疾病分类")
                    	}else{
						var len = json.result.resultList.length;
						for (var i = 0; i < len; i++) {
							json.result.resultList[i].text = json.result.resultList[i].disName;
						}
						MinePersonaler.setData(json.result.resultList);
						MinePersonaler.show(function(items) {
							
							if (MinePersonalval.innerHTML != "请设置") {
								if(span_li.indexOf(items[0].id)=="-1"){
                    				MinePersonalval.innerHTML += "," + items[0].text;
									span_li+= "," + items[0].id;
                    			}else{
                    				plus.nativeUI.toast("此疾病已选择");
                    			}
							} else {
								MinePersonalval.innerHTML = items[0].text;
								span_li =items[0].id.toString();
								
								
							}
							console.log(span_li)
							person._disId = span_li;
						});
					}},beforeSend:function(){
						plus.nativeUI.showWaiting("努力加载中。。。");
							},error:function(XMLHttpRequest){
		      					plus.nativeUI.closeWaiting();
		      					if(XMLHttpRequest.status==0){
		      						plus.nativeUI.toast("网络错误，请重试！");
		      				}
		      			}
				});
			}
		});
	})
	//上传图片
function imgupgrade(img) {		
		dataURL=img[0].substring(23);
        mui.ajax(_config+"/base/imageUploadByBase64",{
        	data: {
    		fileName:"image.png",
			fileContent:dataURL //base64数据    
			},
			type: "POST",
			timeout: 10000,
        	success:function(json){
        		plus.nativeUI.closeWaiting();
        		if (json.status == 200) {
				mui.toast("上传成功");
				person.user_img = json.result;
				person = JSON.stringify(person);
				localStorage.setItem("person_ol", person);
				console.log(_config + json.result);
        		}else{
        			plus.nativeUI.toast("很抱歉，请重试")
        		}
        	},beforeSend:function(){
			plus.nativeUI.showWaiting("努力上传中。。。");
				},error:function(XMLHttpRequest){
  					plus.nativeUI.closeWaiting();
  					if(XMLHttpRequest.status==0){
  						plus.nativeUI.toast("网络错误，请重试");
  					}
  				}
        })
}