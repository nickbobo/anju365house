// JavaScript Document utf-8
// 基于jquery框架的relax ajax类
// author: relaxWang
// time: 2014-7-14
//[修改] 2014-7-14 考虑jsonp跨域调用的情况下的响应 
//[修改] 2015-11-5 初始化参数传递的时候使用setObject，该参数接受对象值，对象元素的名称与属性名称对应，从而避免new之后在一个一个属性赋值
//[优化] 2016-01-28 按需求增加供before方法调用的函数（类），用于展现AJAX加载时的提示，考虑背景屏蔽层的展现不展现，考虑是否可以强制取消当前通信的ajax等，实际并不属于AJAX类的一部分，而一般供AJAX类调用，联系紧密则安排在这里
// 使用方法 
// 	step1 申明一个relaxAJAX对象  exp:  var obj = new relaxAJAX()
//  step2 准备各种参数 必要的是 url exp:  obj.url = "test.php"
//  step3 可以为其相关的事件定义函数 比如调用成功后的回调函数 或者失败的回调函数 等 需要注意的是参数协调 例如 obj.success = function(data){....} 其data就是为了接收调用成功后获得的返回数据（如果有返回的话） obj.error = function(status, errMsg)  status为错误类型 errMsg错误提示
//  step4 最后使用send方法来发起ajax请求 exp: obj.send();
//  step5 可用方法abort来取消正在进行中的ajax请求 当前版本的jquery abort最后会在error事件中触发 且触发的status为abort
function relaxAJAX(setObject){
	this.dataType = "json";
	this.type = "POST";
	this.url ="";
	this.data = "";
	this.timeout = 10 * 1000;
	this.before = "";
	this.success = "";
	this.error = "";
	this.complete = "";
	//------ 以下一般不做设置，仅做读取 --------------------------
	this.message = "没有AJAX申请";
	this.flag = 0;    //flag编号按HTTP协议首部状态编号来释义
	this.ajax = "";
	
	if (setObject){
		for(var x in this){
			if (setObject[x]){
				this[x] = setObject[x];
			}
		}
	}
}

//发送ajax请求
relaxAJAX.prototype.send = function(){
	var CL = this;
	var urlString = arguments[0];
	if (urlString){
		CL.url = urlString;
	}
	if (CL.url == ""){
		CL.flag = 400;
		CL.message = "提交的访问路径为空";
		return false;
	}
	//判断是否在发送中
	if (CL.flag == 100){
		return false;
	}
	
	//判断是否是跨域
	var jsonpCallbackName = "";
	if (CL.dataType == "jsonp"){
		jsonpCallbackName = "relaxJsonpReturn";
	}else{
		jsonpCallbackName = "";
	}
	CL.ajax = $.ajax({
		   dataType: CL.dataType,
		   type: CL.type,
		   url: CL.url,
		   data: CL.data,
		   jsonCallback: jsonpCallbackName,
		   timeout: CL.timeout,
		   success: function(data){
			   CL.flag = 200;
			   CL.message = "ok";
			   if (typeof(CL.success) == "function"){
				   CL.success(data);
			   }
		   },
		   beforeSend: function(){
			   CL.flag = 100;
			   CL.message = "requesting...";
			   if (typeof(CL.before) == "function"){
				   CL.before();
			   }
		   },
		   complete: function(XHR, status){
			   if (typeof(CL.complete) == "function"){
				   CL.complete();
			   }
		   },
		   error: function(XHR, status, errorThrown){
			   if (status == "abort"){
				   CL.flag = 401;
				   CL.message = "abort";
			   }else{
				   CL.flag = 500;
				   CL.message = "error";
			   }
			   if (typeof(CL.error) == "function"){
				   CL.error(status, errorThrown);
			   }
		   }
	});
}

//取消ajax请求方法 如果已经取消再调用此方法则不会有任何效果
relaxAJAX.prototype.abort = function(){
	var CL = this;
	if (typeof(CL.ajax) == "string"){
		return false;
	}
	CL.ajax.abort();
	CL.ajax = "";
}

function relaxJsonpReturn(data){
	//这里仅保留函数，而不推荐直接写代码，因为跨域JSONP成功调用后依然会执行success函数
}

//AJAX加载之前的提示信息显示
//参数说明
//-Obj.text 加载框提示信息 [可选]默认为loading...
//Obj.back true/false 是否启用背景屏蔽层 [可选] 默认为加载屏蔽层
//Obj.ajax relaxAJAX类对象 [可选] 默认为空 为空则不显示取消按钮，不为空则显示取消按钮
//-Obj.parent [可选] 默认是body对象
//show 用于控制类初始化的时候是否打开加载框，不传递则不打开，除非使用show方法，否则立刻打开
function relaxAjaxDialog(Obj,show){
	this.backObject = "";    //背景屏蔽层对象
	this.backParent = "";    //对话框显示的容器对象
	this.frameObject = "";   //内容显示外框
	this.showObject = "";    //内容显示框
	this.buttonCancel = "";  //取消按钮
	
	this.text = "loading...";
	if (Obj && Obj.text){
		this.text = Obj.text;
	}
	this.back = true;
	if (Obj && (Obj.back == true || Obj.back == false)){
		this.back = Obj.back;
	}
	
	this.ajax = "";
	if (Obj && Obj.ajax){
		this.ajax = Obj.ajax;
	}
	
	var backClassName = "relaxAJAXBackView";
	var frameObjectClass = "relaxAJAXFrame";
	var showObjectClass = "relaxAJAXShow";
	
	if (Obj && Obj.parent){
		this.backParent = Obj.parent;
	}else{
		this.backParent = $("body");
	}
	
	//初始化参照对象的样式
	var tagName = this.backParent[0].tagName.toLowerCase();
	var positionStr = "absolute";
	if (tagName == "body"){
		positionStr = "fixed";
	}else{
		var positionStr2 = this.backParent.css("position").toLowerCase();
		if (positionStr2 != "absolute" && positionStr2 != "relative"){
			this.backParent.css("position","relative");
		}
	}
	
	//准备背景层
	var tempArray1 = this.backParent.children("."+backClassName);
	if (tempArray1.length > 0){
		this.backObject = $(tempArray1[0]);
	}else{
		var htmlStr = '<div class="'+ backClassName +'"></div>';
		this.backParent.append(htmlStr);
		this.backObject = this.backParent.children("."+backClassName).eq(0);
		this.backObject.css({
			position: positionStr,
			zIndex:   10000,
			top:      "0px",
			bottom:   "0px",
			left:     "0px",
			right:    "0px",
			backgroundColor: "#FFFFFF",
			opacity:  0.7,
			display:  "none"
		});
	}
	//准备内容外框
	var tempArray2 = this.backParent.children("."+frameObjectClass);
	if (tempArray2.length > 0){
		this.frameObject = $(tempArray2[0]);
	}else{
		var htmlStr = '<div class="'+ frameObjectClass +'"></div>';
		this.backParent.append(htmlStr);
		this.frameObject = this.backParent.children("."+frameObjectClass).eq(0);
		this.frameObject.css({
			position: positionStr,
			zIndex:   10001,
			top:      "0px",
			bottom:   "0px",
			left:     "0px",
			right:    "0px",
			display:  "none"
		});
	}
	//准备内容框
	var tempArray3 = this.frameObject.children("."+showObjectClass);
	if (tempArray3.length > 0){
		this.showObject = tempArray3[0];
		this.buttonCancel = this.showObject.find(".dButton").eq(0);
	}else{
		var htmlStr = '<div class="'+ showObjectClass +'"><div class="dText t2"><div class="inside"><div class="loadStyle1"></div><span>'+ this.text +'</span></div></div><div class="dButtonBar"><div class="dButton button1">取消</div></div></div>';
		this.frameObject.append(htmlStr);
		this.showObject = this.frameObject.children("."+showObjectClass).eq(0);
		this.showObject.css({
			width:    "50%",
			maxWidth: "600px",
			minWidth: "300px",
			margin:   "0px auto",
			background:"linear-gradient(#ffffff, #eeeeee)",
			backgroundColor: "#ffffff",
			borderRadius:"5px",
			boxShadow:"0px 0px 10px #000000"
		});
		var tempDom1 = this.showObject.children(".dText").eq(0);
		tempDom1.css({
			padding:  "10px",
			textAlign:"center"
		});
		tempDom1 = tempDom1.children(".inside").eq(0);
		tempDom1.css({
			display:  "inline-block",
			position: "relative",
			paddingLeft:this.showObject.find(".inside > div").eq(0).width() + 5
		});
		tempDom1 = this.showObject.children(".dButtonBar").eq(0);
		tempDom1.css({
			padding:  "0px 10px 10px 10px",
			textAlign:"center",
			display:  "none"
		});
	}
	this.buttonCancel = this.showObject.find(".dButton").eq(0);
	this.buttonCancel.css({
		width:    "50%",
		minWidth: "160px",
		height:   "35px",
		lineHeight:"35px",
		margin:   "0px auto"
	});
	if (show){
		if (Obj){
			this.show(Obj);
		}else{
			this.show();
		}
	}
}
//显示加载框
//obj 除了parent不做响应外，其他参数设置同类实例化时候一样，且设置之后会赋值给类实例的属性
relaxAjaxDialog.prototype.show = function(Obj){
	var CL = this;
	if (Obj){
		if (Obj.back == true || Obj.back == false){
			CL.back = Obj.back;
		}
		if (Obj.ajax){
			CL.ajax = Obj.ajax;
		}
		if (Obj.text){
			CL.text = Obj.text;
		}
	}
	if (CL.back){
		CL.backObject.css("display","block");
	}else{
		CL.backObject.css("display","none");
	}
	if (CL.ajax){
		CL.buttonCancel.parent().css("display","block");
		//绑定事件
		CL.buttonCancel[0].onclick = function(){
			CL.ajax.abort();
			CL.hide();
		}
	}else{
		CL.buttonCancel.parent().css("display","none");
		//取消绑定
		CL.buttonCancel[0].onclick = function(){}
	}
	if (Obj && Obj.text){
		CL.text = Obj.text;
	}
	CL.showObject.find(".inside > span").eq(0).text(CL.text);
	CL.frameObject.css("display","block");
	CL.setMiddle();
}

//隐藏AJAX加载之前的提示框
//Obj.parent [可选] 默认是body对象
relaxAjaxDialog.prototype.hide = function(){
	var CL = this;
	if (CL.back){
		CL.backObject.css("display","none");
	}
	CL.frameObject.css("display","none");
}
//垂直居中，一般不直接调用
relaxAjaxDialog.prototype.setMiddle = function(){
	var CL = this;
	var allHeight = CL.frameObject.height();
	var nowHeight = CL.showObject.height();
	var heightDis = parseInt((allHeight - nowHeight)/2);
	if (heightDis < 0) heightDis = 0;
	CL.showObject.css("marginTop",heightDis + "px");
}