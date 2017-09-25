//--------------------------- 通用JS函数 coding UTF-8------------------------------------
//v1.1 modify by relax 2016/11/4
//relax 公共函数库 v2.0 
//清除字符串左右空格函数  jquery
//增加compareObject函数 2016/10/31
//增加checkClientEQ函数 2016/11/3
String.prototype.Trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
//数组的indexOf方法协调
if (!("indexOf" in Array.prototype)){
	Array.prototype.indexOf = function(e){
		for(var i=0,j; j=this[i]; i++){
			if(j==e){return i;}
		}
		return -1;
	}
}

//检查字符串是否满足正则表达式
function JS_ChkReg(text, Regstr){
	var ExpStr = new RegExp; 
	var splitStr = new RegExp;     //用于记录切割字符
	var doSign =  "";                    //用于记录当期所采用的比较方法 逻辑与 and 逻辑或or
	var result;                              //记录返回结果
	var tempResult;                     //临时结果
	//检查是否存在逻辑判定符 不存在则直接检测即可
	ExpStr = /^.*\s\+\s.*$/; 
	//如果存在中文匹配，替换中文为对应的中文字符范围表示
	Regstr = Regstr.replace(/中文/g,"\u4e00-\u9fa5");
	if (ExpStr.test(Regstr) == false){
		ExpStr = /^.*\s\*\s.*$/;
		if (ExpStr.test(Regstr)==false){
			eval("ExpStr=/" + Regstr + "/gi;");
			return ExpStr.test(text);
		}else{
			splitStr=/\s\*\s/;
			doSign="and";
		}
	}else{
		splitStr = /\s\+\s/;
		doSign="or";
	}
	var RegArray;
	RegArray=Regstr.split(splitStr);
	for (var i=0;i<RegArray.length;i++){
		eval("ExpStr=/" + RegArray[i] + "/gi;");
		tempResult = ExpStr.test(text);
		if (doSign=="and"){
			if (tempResult==false){
				result = false;
				break;
			}else{
				result = true;
			}
		}else{
			if (tempResult==true){
				result = true;
				break;
			}else{
				result = false;
			}
		}
	}
	return result;
}

//返回检测字符串中按正则匹配的字符数组
function JS_getRegArray(text, regStr){
	var nowType = typeof(regStr);
	if (nowType.toUpperCase()=="STRING"){
		eval("regStr=/" + regStr + "/gi;");
	}
	var tempArray = Array();
	tempArray=text.match(regStr);
	if (tempArray){
		return tempArray;
	}else{
		return Array();
	}
}


//解码json 使得字符串的json转换成js中的对象
function json_decode(jsonStr){
	if (typeof(jsonStr) != "string"){
		return jsonStr;  //不是字符的情况不做解码操作，返回原始对象
	}else{
		jsonStr = decodeURIComponent(jsonStr);
		return eval('(' + jsonStr + ')');
	}
}

//编码json 使得json对象变成字符串形式
function json_encode(json){
	if (typeof(json) != "object"){
		if (typeof(json) == "string"){
			return encodeURIComponent(json);
		}else{
			return json;
		}
	}else{
		if (json===null) return null;
	}
	var returnStr = "";
	for (var x in json){
		returnStr +=",";
		if (typeof(json[x]) != "object"){
			returnStr += "\"" + encodeURIComponent(x) + "\":";
			if (typeof(json[x]) == "number"){
				returnStr += json_encode(json[x]);
			}else{
				returnStr += "\"" + json_encode(json[x]) + "\"";
			}
		}else{
			//判定是否是数组
			if (json[x] && (json[x].length != undefined)){
				returnStr += "\"" + encodeURIComponent(x) + "\":[";
				var arrayStr = "";
				for (var ii=0; ii<json[x].length; ii++){
					arrayStr += "," + json_encode(json[x][ii]);
				}
				if (arrayStr != "") arrayStr = arrayStr.substr(1);
				returnStr += arrayStr + "]";
			}else{
				returnStr += "\"" + encodeURIComponent(x) + "\":";
				returnStr += json_encode(json[x]);
			}
		}
	}
	//去掉末位的,符号
	if (returnStr.length > 1){
		returnStr = returnStr.substr(1);
	}
	returnStr = "{" + returnStr + "}";
	return returnStr;
}

//选择复选框组 选择全部记录/取消全部记录
function JS_setCheckValue(nameStr, valueStr, fatherObj){
	if (!fatherObj || typeof(fatherObj)!= "object"){
		var Checkers = document.getElementsByTagName("input");
	}else{
		var Checkers = fatherObj.getElementsByTagName("input");
	}
	if (!Checkers) return false;
	
	var tempArray = [];
	for (var i=0; i<Checkers.length; i++){
		if ((Checkers[i].type == "checkbox" || Checkers[i].type == "radio") && Checkers[i].name == nameStr){
			tempArray.push(Checkers[i]);
		}
	}
	if (tempArray.length <= 0) return false;
	var nowType = "checkbox";
	if (tempArray[0].type == "radio"){
		nowType = "radio"
	}
	
	valueStr = valueStr + "";
	if (valueStr == "true" || valueStr == "false"){
		if (nowType == "radio"){
			var setValue = valueStr == "true" ? true : false;
			if (setValue == true){
				tempArray[0].checked = true;
			}else{
				for (var i=0; i<tempArray.length; i++){
					tempArray[i].checked = false;
				}
			}
		}else{
			for (var i=0; i<tempArray.length; i++){
				var setValue = valueStr == "true" ? true : false;
				tempArray[i].checked = setValue;
			}
		}
	}else{
		var compareStr = "," + valueStr + ",";
		if (nowType == "radio"){
			var valueArray = compareStr.split(",");
			compareStr = "," + valueArray[1] + ",";
		}
		for (var i=0; i<tempArray.length; i++){
			var nowValue = "," + tempArray[i].value + ",";
			if (compareStr.indexOf(nowValue) >= 0){
				tempArray[i].checked = true;
			}else{
				tempArray[i].checked = false;
			}
		}
	}
	return true;
}

//获得选择框(复选框/单选框)选中单元的值
//参数 nameStr 求值元素的name属性
//参数 fatherObj 需要在哪个DOM元素下执行 如果没有传递则使用document
function JS_getCheckValue(nameStr, fatherObj){
	var Checkers
	if (!fatherObj || typeof(fatherObj)!= "object"){
		Checkers = document.getElementsByTagName("input");
	}else{
		Checkers = fatherObj.getElementsByTagName("input");
	}
	if (!Checkers) return false;
	var valueStr="";
	for (var i=0;i<Checkers.length;i++){
		if (Checkers[i].name==nameStr && Checkers[i].checked==true){
			valueStr += "," + Checkers[i].value;
		}
	}
	if (valueStr){
		valueStr=valueStr.substr(1);
	}
	return valueStr;
}

//选中单选框/复选框
//namestr 设置元素的name属性
//valueList 需要选中的项的值，多个值用,逗号分隔
function JS_setCheck(nameStr,valueList){
	var Checkers=document.getElementsByTagName("input");
	if (!Checkers) return false;
	var valueStr="";
	var tempArray=valueList.split(",");
	for (var i=0;i<Checkers.length;i++){
		if (Checkers[i].name==nameStr){
			//获得该元素的value
			valueStr=Checkers[i].value;
			s=0;
			for (var j=0;j<tempArray.length;j++){
				if (valueStr+""==tempArray[j]+""){
					s=1;
					break;
				}
			}
			if (s==1){
				Checkers[i].checked=true;
			}else{
				Checkers[i].checked=false;
			}
		}
	}
}


//关闭当前窗口
function JS_WINCLOSE(){
	window.top.opener = '';
	window.top.close();
}

//判定parentNode元素中是否包含childNode元素
//返回true 表示包含 flase表示不包含 空表示parentNode和childNode是同一个DOM元素
function JS_contains(parentNode, childNode){
	//modify by relax 2016/11/4 由于在使用selection和range的情况下会涉及到字符串的问题，所以这里做协调
	if (childNode && childNode.toString().toLowerCase()=="[object text]"){
		childNode=childNode["parentNode"];
	}
	if (parentNode === childNode) return "";
	if (parentNode.contains){
		return  parentNode.contains(childNode);
    }else{
		return !!(parentNode.compareDocumentPosition(childNode) & 16);
	}
}

//按事件来判定是否事件触发元素在需要元素内部  用于mouserover和mouseout
//如果在元素内部则返回false 不在则返回true
function JS_checkHover(e,target){
    if (e.type=="mouseover"){
        return !JS_contains(target,e.relatedTarget || e.fromElement) && !((e.relatedTarget || e.fromElement)===target);
    } else {
        return !JS_contains(target,e.relatedTarget || e.toElement) && !((e.relatedTarget || e.toElement)===target);
    }
}

//获得子对象到父辈对象的左上角距离
function JQ_getOffset(subObj, parentObj){
	var obj = subObj;
	var offLeft=0;
	var offTop=0;
	var eachobj = new Array();
	var MAX = 100;
	while(obj && obj!=parentObj && MAX>0){
		eachobj.push(obj);
		obj = $(obj).parent()[0];
		MAX--;
	}
	offLeft = 0;
	offTop = 0;
	if (eachobj.length > 0){
		offLeft += eachobj[0].offsetLeft;
		offTop += eachobj[0].offsetTop;
		for (var i=1; i<eachobj.length; i++){
			offLeft += eachobj[i].offsetLeft + eachobj[i].scrollLeft;
			offTop +=  eachobj[i].offsetTop + eachobj[i].scrollTop;
		}
		offLeft -= parentObj.scrollLeft;
		offTop -= parentObj.scrollTop;
	}
	return {"offsetLeft":offLeft,"offsetTop":offTop};
}

//保存或者修改cookie
//ckName cookie的索引名
//ckValue cookie的键值
//limitTime cookie的生命时间，单位为秒， 不填写则使用当前周期内的cookie，即页面关闭后cookie也会丢失
function js_setCookie(ckName,ckValue, limitTime){
	if (ckValue==""){
	}else{
		ckValue = encodeURIComponent(ckValue);
	}
	var expTime = new Date();
	var timeStr = "";
	if (parseInt(limitTime) > 0){
		limitTime = parseInt(limitTime);
		expTime.setTime(expTime.getTime() + limitTime * 1000);
		timeStr = "expires=" + expTime.toGMTString() + ";";
	}else{
		timeStr = "";
	}
	document.cookie = ckName +"="+ ckValue + ";" + timeStr + " path=/";
}

//读取指定的cookie值
function js_getCookie(ckName){
	var tempStr=document.cookie;
	var tempArray=JS_getRegArray(tempStr,"(^|\\s|;)"+ckName+"=[^;$\\s]*(;|$|\\s)");
	if (!tempArray || tempArray.length<=0){
		return undefined;
	}else{
		if (tempArray.length>1){
			return false;
		}else{
			var txt=tempArray[0].Trim();
			txt = txt.replace(/\;/ig,"");
			var splitStr=txt.split("=");
			if (splitStr.length!=2){
				return false;
			}else{
				return decodeURIComponent(splitStr[1].Trim());
			}
		}
	}
}

//删除指定的cookie 
function js_delCookie(ckName){
	var expTime = new Date(); 
	expTime.setTime(expTime.getTime() - 10000); 
	if (ckName==""){
		//删除全部cookie
		var nowCookie = document.cookie.Trim();
		if (nowCookie == ""){
			return false;
		}else{
			var tempArray = nowCookie.split(";");
			for (var i=0; i<tempArray.length; i++){
				var tempArray2 = tempArray[i].split("=");
				if (tempArray2.length != 2){
					continue;
				}else{
					document.cookie = tempArray2[0] +"=; expires=" + expTime.toGMTString() +"; path=/"; 
				}
			}
			return true;
		}
	}else{
		document.cookie = ckName +"=; expires=" + expTime.toGMTString() +"; path=/"; 
		return true;
	}
}


//获得对象属性的数量
function JS_AttrLen(thisObject){
	var lenCount = 0;
	for (var x in thisObject){
		lenCount++;
	}
	return lenCount;
}


//获得某个时间对应的unix时间戳
function js_getUnixTime(thisDatetime, areaNumber){
	//正则验证thisTime 不通过返回0 否则继续 
	//目前没有做大月小月的判定，也没有做闰年2月的判定，实际会返回常规的数值，比如9-31会返回实际对应是10-1日的数值 后期在完善
	if (typeof(thisDatetime) == "string" && thisDatetime !="" && JS_ChkReg(thisDatetime, "^\\d{4}[\\/\\-](0?[1-9]|1[0-2])[\\/\\-](0?[1-9]|[1-2][0-9]|3[0-1])(\\s(0?[0-9]|1[0-9]|2[0-3])(\\:[0-5]?[0-9]){2})?$") == false){
		return 0;
	}
	if (thisDatetime === undefined || thisDatetime == ""){
		var tempArray = [];
		var objDatetime = new Date();
	}else{
		var tempArray = thisDatetime.split(" ");
		var objDatetime = new Date(thisDatetime);
	}
	if (isNaN(objDatetime)){
		var tempArray2 = tempArray[0].split("-");
		if (tempArray2.length == 1){
			tempArray2 = tempArray[0].split("/");
		}
		//这里默认第一位年份，第二位月份，第三位日期
		//注意月份的-1特性
		if (tempArray.length > 1){
			var tempArray3 = tempArray[1].split(":");
			objDatetime = new Date(parseInt(tempArray2[0]),parseInt(tempArray2[1])-1,parseInt(tempArray2[2]),parseInt(tempArray3[0]),parseInt(tempArray3[1]),parseInt(tempArray3[2]));
		}else{
			objDatetime = new Date(parseInt(tempArray[0]),parseInt(tempArray[1])-1,parseInt(tempArray[2]));
		}
		if (isNaN(objDatetime)){
			return 0;
		}
	}
	var zeroUnixTime = objDatetime.getTime() + objDatetime.getTimezoneOffset()*60*1000; //获得0时区的标准时间
	var timeAreaCode = objDatetime.getTimezoneOffset()/60;
	if (areaNumber){
		areaNumber = parseInt(areaNumber) - 0;
		if (isNaN(areaNumber) == false){
			if (areaNumber >= -12 && areaNumber <= 12){
				timeAreaCode = areaNumber;
			}
		}
	}
    var resultValue = zeroUnixTime - timeAreaCode*60*60*1000;
    return resultValue;
}

//获得某个unix时间戳对应的实际日期时间字符串
function js_getStringTime(thisDatetimeValue, areaNumber, splitStr, fullFormat){
	if (!(thisDatetimeValue) || parseInt(thisDatetimeValue) > 0){
		var tempDate = new Date();
		//时区处理 还原成0区时间
		if (thisDatetimeValue === undefined || thisDatetimeValue == ""){
			thisDatetimeValue = tempDate.getTime() + tempDate.getTimezoneOffset()*60*1000;
		}else{
			thisDatetimeValue = (thisDatetimeValue-0) + tempDate.getTimezoneOffset()*60*1000;
		}
		var timeAreaCode = tempDate.getTimezoneOffset()/60;
		if (areaNumber){
			areaNumber = parseInt(areaNumber) - 0;
			if (isNaN(areaNumber) == false){
				if (areaNumber >= -12 && areaNumber <= 12){
					timeAreaCode = areaNumber;
				}
			}
		}
		//按设置时区进行调整
		thisDatetimeValue = thisDatetimeValue - timeAreaCode*60*60*1000;
		tempDate.setTime(thisDatetimeValue);

		if (!splitStr){
			splitStr = "/";
		}else{
			splitStr = "-";
		}
		if (!fullFormat){
			fullFormat = false;
		}else{
			fullFormat = true;
		}
		var temp = {
			year:  tempDate.getFullYear(),
			month: tempDate.getMonth()+1,
			day:   tempDate.getDate(),
			hour:  tempDate.getHours(),
			minute:tempDate.getMinutes(),
			second:tempDate.getSeconds()
		};
		if (fullFormat){
			for (var x in temp){
				if (temp[x] < 10){
					temp[x] = "0" + temp[x];
				}
			}
		}
		var dateStr = temp.year + splitStr + temp.month + splitStr + temp.day;
		var timeStr = temp.hour + ":" + temp.minute + ":" + temp.second;
		return dateStr + " " + timeStr;
	}else{
		return "";
	}
}

//按要求格式化日期时间的字符串，返回对应的字符串
//dateObj 需要格式化的日期时间字符串或者Date对象
//typeStr 需要返回的类型，date还是time 默认是返回包含日期和时间的字符串
//splitStr 日期中的间隔字符串
//fullFormat true/false 是否是完整格式
function js_formatDateTime(dateObj,typeStr,splitStr,fullFormat){
	if (dateObj instanceof Date){
	}else{
		if (dateObj == "" || dateObj === undefined){
			dateObj = new Date();
		}else{
			if (typeof(dateObj) == "object" && ("y" in dateObj)){
				dateObj = new Date(dateObj.y+"/"+dateObj.m+"/"+dateObj.d+" "+dateObj.h+":"+dateObj.n+":"+dateObj.s);
			}else{
				return "";
			}
		}
	}
	var t = {
		y:  dateObj.getFullYear(),
		m:  dateObj.getMonth()+1,
		d:  dateObj.getDate(),
		h:  dateObj.getHours(),
		n:  dateObj.getMinutes(),
		s:  dateObj.getSeconds()
	};
	if (fullFormat){
		for (var x in t){
			if (x == "y" || x == "h") continue;
			t[x] = t[x]>=10? t[x]:"0"+t[x];
		}
	}
	var tempStr = t.y + "/" + t.m + "/" + t.d + " " + t.h + ":" + t.n + ":" + t.s;
	if (splitStr !== undefined && splitStr != ""){
		tempStr = tempStr.replace(/\//g, splitStr);
	}
	if (typeStr === undefined || typeStr == "" || (typeStr != "year" && typeStr != "time")){
		return tempStr;
	}else{
		if (typeStr == "year") return tempStr.split(" ")[0];
		return tempStr.split(" ")[1];
	}
}

//获得某一日期时间的范围内的上限或者下限
//说明 例如 2015-6-7 12:43:33 按日的上限日期时间为 2015-6-30 23:59:59 一般用在日期查询范围
//dateObj 日期时间对象
//typeStr 参考对象M,D,H,N,S
//opstr front/back front表示下限 back表示上限
//返回 经过计算过的date对象
function limitDate(dateObj,typeStr,opstr){
	var t = {
		y:  dateObj.getFullYear(),
		m:  dateObj.getMonth()+1,
		d:  dateObj.getDate(),
		h:  dateObj.getHours(),
		n:  dateObj.getMinutes(),
		s:  dateObj.getSeconds()
	};
	switch(typeStr){
		case "M":
			if (opstr == "front"){
				t.m = 1;
				t.d = 1;
				t.h = 0;
				t.n = 0;
				t.s = 0;
			}else{
				t.m = 12;
				t.d = 31;
				t.h = 23;
				t.n = 59;
				t.s = 59;
			}
			break;
		case "D":
			if (opstr == "front"){
				t.d = 1;
				t.h = 0;
				t.n = 0;
				t.s = 0;
			}else{
				if (t.m == 2){
					if (js_LearYear(t.y) == true){
						t.d = 29;
					}else{
						t.d = 28;
					}
				}else{
					if ((",1,3,5,7,8,10,12,").indexOf(","+t.m+",") >=0){
						t.d = 31;
					}else{
						t.d = 30;
					}
				}
				t.h = 23;
				t.n = 59;
				t.s = 59;
			}
			break;
		case "H":
			if (opstr == "front"){
				t.h = 0;
				t.n = 0;
				t.s = 0;
			}else{
				t.h = 23;
				t.n = 59;
				t.s = 59;
			}
			break;
		case "N":
			if (opstr == "front"){
				t.n = 0;
				t.s = 0;
			}else{
				t.n = 59;
				t.s = 59;
			}
			break;
		case "S":
			if (opstr == "front"){
				t.s = 0;
			}else{
				t.s = 59;
			}
			break;
	}
	dateObj = new Date(t.y+"/"+t.m+"/"+t.d+" "+t.h+":"+t.n+":"+t.s);
	return dateObj;
}

//日期时间的偏移处理函数 按所需要的位进行偏移计算
//说明 例如 2016-4-5 23:44:11 按小时单位 偏移量为-4 返回的日期时间对象应该是 2016-4-5 19:44:11 
//返回偏移后的日期时间对象
function getDatetimeDiff(dateObj,typeStr,distance){
	if (dateObj instanceof Date){
	}else{
		if (dateObj == "" || dateObj === undefined){
			dateObj = new Date();
		}else{
			if ("y" in dateObj){
				dateObj = new Date(dateObj.y+"/"+dateObj.m+"/"+dateObj.d+" "+dateObj.h+":"+dateObj.n+":"+dateObj.s);
			}else{
				dateObj = new Date(dateObj);
			}
		}
	}
	var t = {
		y:  dateObj.getFullYear(),
		m:  dateObj.getMonth()+1,
		d:  dateObj.getDate(),
		h:  dateObj.getHours(),
		n:  dateObj.getMinutes(),
		s:  dateObj.getSeconds()
	};
	var unixTime = js_getUnixTime(js_formatDateTime(dateObj));
	var disValue = 1000;
	switch(typeStr){
		case "Y":
			t.y = t.y + distance;
			dateObj = new Date(t.y+"/"+t.m+"/"+t.d+" "+t.h+":"+t.n+":"+t.s);
			break;
		case "M":
			var temp = getExcursion(12,1,t.m,distance);
			if (temp){
				t.y = t.y + temp.hex;
				t.m = temp.base;
			}
			dateObj = new Date(t.y+"/"+t.m+"/"+t.d+" "+t.h+":"+t.n+":"+t.s);
			break;
		case "D":
			unixTime += distance * 24 * 60 * 60 * 1000;
			dateObj = new Date(js_getStringTime(unixTime));
			break;
		case "H":
			unixTime += distance * 60 * 60 * 1000;
			dateObj = new Date(js_getStringTime(unixTime));
			break;
		case "N":
			unixTime += distance * 60 * 1000;
			dateObj = new Date(js_getStringTime(unixTime));
			break;
		case "S":
			unixTime += distance * 1000;
			dateObj = new Date(js_getStringTime(unixTime));
			break;
	}
	return dateObj;
}

/*
	用于协调textarea获取的值写入普通DOM中的情况
	type为处理text文本的类型：
		inputTextarea 为插入textarea的类型
		inputDom 为插入dom的类型
		默认不传递该参数 使用的是inputDom方法处理
		
	text为需要处理的文本
	
	@@@ 没有对空格和TAB等特殊按键进行协调，以后需要的情况下在扩展 
*/
function textHandle(text,type){
	if (type===undefined) type="inputDom";
	switch(type){
		case 'inputTextarea':
			return text;
		break;
		case 'inputDom':
			return text.replace(/(\r\n|\n)/g,"<br/>");
		break;
	}
}

//========= 数值偏移函数 ========================================
//按所传递的进制计算需要数值的一定距离后的数值对象，包含了原单位计算后的值和其进度位需要调整的值，这里用于应对时间和月份的移动
//== 参数说明 ======
// maxV 进制数中最大数值 10进制数据这里填写9 因为单位最大值是9 月份这里填写12 小时这里填写23 分钟这里填写59
// minV 进制数种最小数值 10进制数据这里填写0 月份这里填写1 小时这里填写0 分钟这里填写0
// nowV 当前的值 
// distance 偏移量 正数表示往正方向移动 或者说往日期时间的未来移动 负数则相反
//== 返回值 ========
//返回值是对象，包含两个元素 base表示当前经过移动后的单位值，hex表示其上一位的进制数据的偏移值
//== exp ===========
//getExcursion(9,0,5,10) //把数值5往正方向偏移10个单位，所以返回数据是{base:5,hex:1} 按10进制的数据解释 hex*10+base = 15 
//getExcursion(12,1,4,-10) //把4月份往历史移动10个月份，所以返回数据是{base:6,hex:-1} 按日期的解释就是 年份偏移值-1，月份为6 所以当前如果是2016年的话，经过-10个月的偏移 应该是2016-1年6月，即2015年6月份

function getExcursion(maxV,minV,nowV,distance){
	if (distance == 0){
		return {base:nowV,hex:0};
	}
	var tempValue = nowV + distance;
	var nowCount = 0;
	var loopCount = 0;
	var maxLoop = 100;
	if (tempValue > maxV){
		while(tempValue > maxV && loopCount<maxLoop){
			nowCount++;
			tempValue -= maxV - minV + 1;
			loopCount++;
		}
	}else if (tempValue < minV){
		var nowCount = 0;
		while(tempValue < minV && loopCount<maxLoop){
			nowCount--;
			tempValue += maxV - minV + 1;
			loopCount++;
		}
	}
	if (loopCount >= maxLoop){
		return false;
	}else{
		return {base:tempValue,hex:nowCount};
	}
}

//判断闰年
function js_LearYear(year){
	if (!(year - 0)) return false;
	if (year % 4 != 0) return false;
	if (year % 400 == 0) return true;
	if (year % 100 == 0) return false;
	return true;
}

//遍历对象的元素，并返回组合后的字符串
function js_getAllProperty(Obj, html){
	var splitStr = "\n\r";
	if (html) splitStr = "<br/>";
	var returnStr = "";
	for (var x in Obj){
    try{
      returnStr += x + " = " + Obj[x] + splitStr;
    }catch(e){
      
    }
		returnStr += x + " = " + Obj[x] + splitStr;
	}
	return returnStr;
}

//禁止事件传递
function js_protectEvent(eventObj){
	//禁止冒泡
	if (eventObj && eventObj.stopPropagation){
		eventObj.stopPropagation(); 
	}else{
		window.event.cancelBubble = true;
		return false;
	}
	//禁止默认事件
	if (eventObj && eventObj.preventDefault){
		eventObj.preventDefault();
	}else{
		window.event.returnValue = false; 
		return false;
	}
}

//获得url中的get参数
//name 需要获得参数的名称
function GetQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}


//比较对象是否相等
function compareObject(x, y){
	// If both x and y are null or undefined and exactly the same 
	if (x===y){
		return true;
	}
	
	// If they are not strictly equal, they both need to be Objects 
	if (!(x instanceof Object) || !(y instanceof Object)){
		return false;
	}
	
	//They must have the exact same prototype chain,the closest we can do is
	//test the constructor. 
	if (x.constructor!==y.constructor){
		return false;
	}

	for (var p in x){
		//Inherited properties were tested using x.constructor === y.constructor
		if (x.hasOwnProperty(p)){
			// Allows comparing x[ p ] and y[ p ] when set to undefined 
			if (!y.hasOwnProperty(p)){
				return false;
			}
			// If they have the same strict value or identity then they are equal 
			if (x[p]===y[p]){
				continue;
			}
			
			// Numbers, Strings, Functions, Booleans must be strictly equal 
			if (typeof(x[p])!=="object"){ 
				return false;
			}
			
			var cmpTemp=compareObject(x[p], y[p]);
			if (cmpTemp==false) return false;
			// Objects and Arrays must be tested recursively 
			//if (!Object.equals(x[p], y[p])){
				//return false;
			//}
		}
	}
	
	for (p in y){
		// allows x[ p ] to be set to undefined
		if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)){
			return false;
		}
	}
	return true; 
};


//返回当前客户端是PC端还是移动端
//pc端返回 字符串 pd 否则返回mobile
function checkClientEQ(){
	var type="pc";
	if ("ontouchstart" in window){
		var userAgentInfo=navigator.userAgent; 
		var Agents=new Array( "iphone", "android", "symbianos", "windows phone", "ipad", "ipod"); 
		for (var v=0; v<Agents.length; v++){
			if (userAgentInfo.toLowerCase().indexOf(Agents[v])!=-1){
				type=Agents[v];
				break;
			}
		}
		if (type=="windows phone"){
			return "mobile";
		}else{
			if (type!="pc"){
				if (navigator.platform.toLowerCase()=="win32"){
					return "pc";
				}else{
					return "mobile";
				}
			}else{
				return "pc";
			}
		}
	}else{
		return "pc";
	}
}