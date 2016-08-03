mui.init();
      	mui.ready(function(){
      		var username=document.getElementsByClassName("username")[0];//用户名
      		var user_img=document.getElementsByClassName("user_img")[0];//图片
      		var userhospital=document.getElementsByClassName("userhospital")[0];//医院
      		var userpersonnal=document.getElementsByClassName("userpersonnal")[0];//疾病
      		var content_li=document.getElementsByClassName("content_li")[0];//简介
      		var person=localStorage.getItem("person_ol");
      		person=JSON.parse(person);     		
      		var spanul="";
      		var span="";
      		if(person!=null)
      		if(person.user_img=="defailt_userHead.png"){
      			user_img.src="../../img/iconfont-ren-@2x.png";
      		}else{
      			user_img.src=_config+person.user_img;
      		}
      		if(person.user_realName){
      			username.innerHTML=person.user_realName+'<span class="userposname">'+person.user_posName+'</span>';
      		}else{
      			username.innerHTML='请设置<span class="userposname">请设置</span>';
      		}
    		if(person.user_hospital_name){
    			userhospital.innerHTML=person.user_hospital_name;
    		}else{
    			userhospital.innerHTML="请在个人中心设置";
    		}
      		
      		for(var i=0;i<person.user_disease_name.length;i++){
      			span="<span>"+person.user_disease_name[i]+"</span>";
      			spanul+=span;
      		}
      		userpersonnal.innerHTML="擅长疾病:"+spanul;
      		content_li.innerHTML=person.user_introdution;
      		content_li.innerHTML=content_li.innerHTML.replace(/\s/gi,'');
      	});