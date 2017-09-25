/**
 * 序列化元素的值  主要是把form内容转换成json格式的 key:value形式
 * @param form
 * @returns {String}
 */
function serializeForm(form) {
	var str = '{';
	$.each(form.serializeArray(), function(index) {
		str += '"'+this['name']+'"'+':'+'"'+this['value']+'"'+',';
	});
	if(str.length>1){str = str.substring(0,str.length-1);}
	str += '}';
	return str;
}
/**
 * 把json格式的数据 赋值给form的元素
 * @param $form
 * @param json
 */
function setFormElements($form,json) {
	var jsonObj = json;
	  if (typeof json === 'string') {
	    jsonObj = $.parseJSON(json);
	  }
	  for (var key in jsonObj) {  //遍历json字符串
		  if (typeof jsonObj[key] === 'object'){
			  for (var k in jsonObj[key]) {  //遍历json字符串
				  $("[name='" + key + "." + k + "']", $form).val('');  
				  $("[name='" + key + "." + k + "']", $form).val(jsonObj[key][k]);  
			  }
		  }else{
			  $("[name='" + key + "']", $form).val('');
			  $("[name='" + key + "']", $form).val(jsonObj[key]);  
		  }
	  }
}


//获取Url参数
function getQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null){ 
		return unescape(r[2]);	
	}else{
		return null;
	} 
}

/**
 * 清除form表单中的数据，不包括hidden,disabled的数据
 * @param id
 */
function clearFormElements(id){
	var form	=	$("#" + id).serializeArray();
	var length	=	form.length;
	var ignore	=	['hidden'];
	var i = 0;
	for(i ; i < length ; i++){
		var type = $("#" + id + " input[name=" + form[i]["name"] +"]").attr('type');
		if(ignore.indexOf(type) != "0"){
			$("#" + id + " input[name=" + form[i]["name"] +"]").val('');
		}
	}
}
function quickSetDTscope(Obj,dateObj,CMDstr){
		var opstr = CMDstr.substr(0,1);
		var opstr2 = "";
		switch(opstr){
			case "Y":
				opstr2 = "M";
				break;
			case "M":
				opstr2 = "D";
				break;
			case "D":
				opstr2 = "H";
				break;
			case "H":
				opstr2 = "N";
				break;
			case "N":
				opstr2 = "S";
		}
		var distance = parseInt(CMDstr.replace(opstr,""));
		var nowFDate,nowBDate;
		if (distance == 0){
		}else{
			dateObj = getDatetimeDiff(dateObj, opstr, distance);
		}
		nowFDate = limitDate(dateObj, opstr2, "front");
		nowBDate = limitDate(dateObj, opstr2, "back");
		nowFDateStr = js_formatDateTime(nowFDate,"","-",true);
		nowBDateStr = js_formatDateTime(nowBDate,"","-",true);
		if (typeof(Obj.front.datetimebox) == "function"){
			Obj.front.datetimebox("setValue",nowFDateStr);
			Obj.back.datetimebox("setValue",nowBDateStr);
		}else{
			if (typeof(Obj.front.val) == "function"){
				Obj.front.val(nowFDateStr);
			}else{
				Obj.front.text(nowFDateStr);
			}
			if (typeof(Obj.back.val) == "function"){
				Obj.back.val(nowFDateStr);
			}else{
				Obj.back.text(nowFDateStr);
			}
		}
}
function fmoney(s, n) {   
	   n = n > 0 && n <= 20 ? n : 2;   
	   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
	   var l = s.split(".")[0].split("").reverse(),   
	   r = s.split(".")[1];   
	   t = "";   
	   for(i = 0; i < l.length; i ++ ){   
	      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
	   }   
	   var value =t.split("").reverse().join("") + "." + r;
	   return formatAmount(value);   
	} 
 function formatAmount(val) {
     if (val.toString().indexOf('-') > -1) {
         return '<span style="color:red;">' + val + '</span>';
     } else {
         return '<span style="color:green;">' + val + '</span>';
     }
 }
 ////////////////////////////////////////////////////////
 
function outputmoney(number) {
     number = number.replace(/\,/g, "");
     if(isNaN(number) || number == "")return "";
         number = Math.round(number * 100) / 100;
     if (number < 0)
        return formatAmount('-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0));
     else
        return formatAmount(outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0));
}
//格式化金额
function outputdollars(number) {
    if (number.length <= 3)
        return (number == '' ? '0' : number);
    else {
        var mod = number.length % 3;
        var output = (mod == 0 ? '' : (number.substring(0, mod)));
        for (i = 0; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0))
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
    }
}
function outputcents(amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
}
 
 function checkMinusPrice(price){//正负金额
     return (/^((-?[1-9]\d*)|\d)(\.\d{1,2})?$/).test(price.toString());
 }

 function checkPositivePrice(price){//正金额
     return (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/).test(price.toString());
 }
 
 function textCounter(field, countfield, maxlimit) { 
   	if (field.value.length > maxlimit) 
   		field.value = field.value.substring(0, maxlimit); 
    else 
   		countfield.value = maxlimit - field.value.length; 
 }
 