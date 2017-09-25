//utf-8
//手机号码输入格式化类
//===================== add by relax 2015/12/24 手机号码输入类 v1.0 ====================================
//格式化手机号码
//再次优化时会纳入发声功能及规范化游标定位
// modify by relax 2016/3/8 把事件触发传递参数CL.obj 更改为 CL，使用CL的场景下可以使用CL.obj定位到具体的DOM对象，会更加通用,但似乎类的方法调用可以直接使用this指向类，以后在测试是否通用，通用的话则可以去除自身类引用的返回
// 2016/5/25 把数字键盘的触发键值进行了协调
// 2016/6/20 增加粘贴操作的事件触发
// 2016/6/20 右键粘贴事件
// 2017/1/18 协调了surface WIN10 外接键盘 按键会连续触发3次的BUG修复，并正对IE8对此修复做了协调
// 2017/1/19 增加了模板参数，可以按模板制定的空格方式来输入数字值

function relax_telNumber(configP){
	this.id = "";
	this.obj = "";
	this.value = "";    //存放当前输入的实际的手机号码的字符串，可能是未完成的输入字符
	this.pos = 0;
	this.maxlen = 11;   //该参数目前不接受配置设定，会按照设定的模板进行自动计算，空格不在计算在内
	this.keyp = 0;      //标识当前是按钮按下的触发，还是粘贴的触发，=1 普通按钮, =-1 输入法按钮, =2 退格按钮, =0未按下, =3其他按钮
	this.keycode = 0;   //标志当前按钮按下的键值
	this.keyArray = new Array();
	this.oldText = "";  //目前用于记录上一次的输入框数据，用于协调输入法输入时候获取当前的输入字符
	this.ie8 = false;
	this.temp = 0;      //用于防止IE8多次触发onpropertychange进入无限递归，由于js更改input的值也会触发onpropertychange
	this.phFlag = false; //标记是否支持输入框的placeHolder属性
	this.phStr = "";     //标记placeholder字符 仅用于不支持placeholder的浏览器情况
	this.template = configP.template || "xxx xxxx xxxx";
	this.splitPos = this.getAllIndexes(this.template, " ");
	
	this.maxlen=this.template.length-this.splitPos.length;
	
	//事件相关
	this.e_press = "";  //有效输入事件
	this.e_blur = "";   //焦点丢失事件
	this.e_focus = "";  //焦点获得事件
	this.e_change = ""; //*文本改变事件
	
	if ("id" in configP){
		this.id = configP.id;
	}
	if (("e_press" in configP) && typeof(configP.e_press)=="function"){
		this.e_press = configP.e_press;
	}else{
		this.e_press = function(){};
	}
	if (("e_blur" in configP) && typeof(configP.e_blur)=="function"){
		this.e_blur = configP.e_blur;
	}else{
		this.e_blur = function(){};
	}
	if (("e_focus" in configP) && typeof(configP.e_focus)=="function"){
		this.e_focus = configP.e_focus;
	}else{
		this.e_focus = function(){};
	}
	this.init();
}

relax_telNumber.prototype.getAllIndexes = function(arr, val){
	var indexes = [], i = -1;
	while ((i = arr.indexOf(val, i+1)) != -1){
		indexes.push(i - indexes.length);
	}
	return indexes;
}

relax_telNumber.prototype.init = function(){
	var CL = this;
	CL.obj = $("#"+CL.id);
	if (CL.obj.length <=0) return false;
	
	CL.clearArray();
	
	//为协调输入法输入和粘贴等输入框操作所做协调
	if ("oninput" in CL.obj[0]){
		CL.ie8 = false;
		
		CL.obj.keypress(function(e){
			CL.inputEvent();
		});
	
		CL.obj[0].oninput = function(){
			CL.inputEvent();
		};
	}else{
		CL.ie8 = true;
		//发现win2003中 IE8 keypress引起的onpropertychange似乎并不是每次都能触发，而是2次按钮触发一次
		CL.obj.keydown(function(e){
			setTimeout(function(){
				CL.inputEvent();
			},100);
		});
	
		CL.obj[0].onpropertychange = function(){
			 CL.inputEvent();
		}
	}
	
	//协调IE9的退格按键的oninput事件不触发的情况 并记录各种按钮按下的按键类型
	CL.obj.keydown(function(e){
		var codeValue = e.keyCode;
		if (codeValue == 0){
			codeValue = e.which;
		}
		
		CL.keycode = codeValue;
		if ((codeValue>=48 && codeValue<=57) || (codeValue>=96 && codeValue<=105)){
			CL.keyp = 1;
			if (CL.keycode >= 96){
				CL.keycode = CL.keycode - 48;
			}
		}else if(codeValue == 8){
			CL.keyp = 2;
			if (CL.ie8 == false){
				setTimeout(function(){
					CL.inputEvent();
				},100);
			}
		}else if(codeValue == 229 || codeValue == 0){
			//firefox下输入法开启 所有按钮输入都会变成0 Chrome下则同IE下一致是229
			CL.keyp = -1;
		}else{
			CL.keyp = 3;
		}
		
		return true;
	});
	
	//标记placeholder的支持性
	if ('placeholder' in document.createElement('input')){
		CL.phFlag = true;
	}else{
		CL.phFlag = false;
		var tempStr = CL.obj.attr("placeholder");
		if (tempStr){
			CL.phStr = CL.obj.attr("placeholder");
		}else{
			CL.phStr = "";
		}
	}
	
	//绑定焦点获得事件
	if (typeof(CL.e_focus) == "function"){
		CL.obj.focus(function(){
			CL.e_focus(CL);
		});
	}
	
	//绑定焦点丢失事件
	if (typeof(CL.e_blur) == "function"){
		CL.obj.blur(function(){
			CL.e_blur(CL);
		});
	}
	
	if (CL.phFlag == false){
		if (CL.phStr != ""){
			if (CL.obj.val() == ""){
				CL.obj.val(CL.phStr);
			}
			CL.obj.focus(function(){
				var nowValue = CL.obj.val();
				if (nowValue == CL.phStr){
					CL.obj.val("");
				}
			});
			
			CL.obj.blur(function(e){
				var nowValue = CL.obj.val();
				if (nowValue == ""){
					CL.obj.val(CL.phStr);
					e = e ? e : event;
					e.preventDefault();
				}
			});
		}
	}
}

//显示当前手机号码字符
relax_telNumber.prototype.show = function(){
	var CL = this;
	var showText = CL.keyArray.join("").replace(/(^\s*)|(\s*$)/g,"");
	CL.obj.val(showText);
	CL.oldText = showText;
	CL.value = showText.replace(/\s/g,"");
	//还原某些属性的初始值
	CL.keyp = 0;
	CL.keycode = 0;
	//定位光标
	//这里不用延迟定位的话 在移动端的firefox和UC里面会导致光标位置在末位之前，很奇怪
	setTimeout(function(){
		//CL.setCursorPos(CL.maxlen);
		CL.setCursorPos(CL.template.length);
	},50);
}

//清除当前数组
relax_telNumber.prototype.clearArray = function(){
	var CL = this;
	for (var i=0; i<CL.maxlen; i++){
		CL.keyArray[i] = "";
	}
	CL.keyArray[3] = " ";
	CL.keyArray[8] = " ";
	CL.pos = 0;
}
//输入框光标控制
relax_telNumber.prototype.setCursorPos = function(posNum){
	var CL = this;
	var cursurPosition = -1;
	var obj = CL.obj[0];
	if (obj.selectionStart != undefined){
		//非IE浏览器
		//ACTION relax 2015/12/31 在苹果手机的safari浏览器中，如果不加selectionEnd，会导致再次输入时候的光标定位的问题
		obj.selectionStart = posNum;
		obj.selectionEnd = posNum;
	}else{
		//IE
		var range = obj.createTextRange();
		range.move("character", posNum);
		range.select();
	}
}
//输入框值改变应对
relax_telNumber.prototype.inputEvent = function(){
	var CL = this;
	var nowText = CL.obj.val();
	if (nowText == CL.oldText) return false;
	if (CL.phFlag == false && CL.phStr != ""){
		if (nowText == CL.phStr) return false;
	}
	//if (CL.temp == 1) return false;
	//modify by relax 2017/1/18
	var compareTime=js_getUnixTime();
	if (compareTime-CL.temp<20){
		//需要把默认已经更改的输入值回退
		if (!CL.ie8) CL.show();
		CL.temp = compareTime;
		return false;
	}
	CL.temp = js_getUnixTime();  //modify by relax 2017/1/18 在win10的平板系统中发现中文输入法会连续触发，这里用间隔毫秒范围值进行协调，在某个范围内则不触发下面的代码
	//去掉非数字字符
	nowText = nowText.replace(/[^\d]*/g,"");
	//去掉两端空格
	nowText = nowText.replace(/(^\s*)|(\s*$)/g,"");
	
	CL.clearArray();
	/*
	//切割并放入数组
	var tempArray = nowText.split("");
	var nowLength = tempArray.length;
	if (nowLength > 3){
		tempArray.splice(3,0," ");
	}
	if (nowLength > 7){
		tempArray.splice(8,0," ");
	}
	var loopNum = tempArray.length > CL.maxlen ? CL.maxlen : tempArray.length;
	for (var i=0; i<loopNum; i++){
		CL.keyArray[i] = tempArray[i];
	}
	
	if (loopNum == 0){
		CL.pos = 0;
	}else{
		CL.pos = loopNum - 1;
	}
	*/
	//切割并放入数组
	var tempArray = nowText.substr(0, CL.maxlen).split("");
	
	for(var i=0; i < CL.splitPos.length; i++){
		var pos = CL.splitPos[i] + i;
		tempArray.splice(pos,0," ");
	}
	CL.keyArray = tempArray;
	
	if (CL.keyArray.length == 0){
		CL.pos = 0;
	}else{
		CL.pos = CL.keyArray.length - 1;
	}
	
	//记录当前的按键类型及键值
	var nowKeyp = CL.keyp;
	var nowKeycode = CL.keycode;
	
	var oldStr = CL.oldText;
	
	CL.show();
	if (nowKeyp == 0){
		//应对右键粘贴的情况
		if (oldStr!=CL.obj.val()){
			var nowText = CL.obj.val();
			var inputChar = nowText.replace(oldStr,"");
			if (inputChar != ""){
				CL.e_press(CL, inputChar);
			}
		}
	}else{
		//正常按钮
		if (nowKeyp == 1){
			if (typeof(CL.e_press) == "function"){
				var inputChar =  String.fromCharCode(nowKeycode);
				CL.e_press(CL, inputChar);
			}
		}else if(nowKeyp == 2){
			if (typeof(CL.e_press) == "function"){
				CL.e_press(CL, "back");
			}
		}else if(nowKeyp == -1){
			if (typeof(CL.e_press) == "function"){
				var nowText = CL.obj.val();
				var inputChar = nowText.replace(oldStr,"");
				//特殊输入不触发绑定的press事件，比如在输入法状态下输入中文
				if (inputChar != ""){
					CL.e_press(CL, inputChar);
				}
			}
		}else{
			//应对其他输入情况，用先前的文本和当前输入完成后的文本来判定是否做了有效输入，是则触发事件
			if (oldStr!=CL.obj.val()){
				var nowText = CL.obj.val();
				var inputChar = nowText.replace(oldStr,"");
				if (inputChar != ""){
					CL.e_press(CL, inputChar);
				}
			}
		}
	}
	
	//CL.temp = 0;
	//modify by relax 2017/1/18
}

//设置当前输入框的值，并协调输入框显示
relax_telNumber.prototype.setValue = function(valueStr){
	var CL = this;
	//ie8下设置input框的值会自动触发onpropertychange事件
	if (CL.ie8 == true){
		CL.obj.val(valueStr);
	}else{
		CL.obj.val(valueStr);
		//手动触发oninput事件
		CL.inputEvent();
	}
}