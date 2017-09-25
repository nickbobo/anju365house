//本页面对话框类
function dialogShow(){
	var dialogList=(function(){
		var tempArray=$(".rexInnerDialog");
		var returnObj={};
		for(var i=0; i<tempArray.length; i++){
			returnObj[tempArray[i].id]=$(tempArray[i]);
			//绑定按钮事件
			(function(index){
				$(tempArray[index]).find(".myButton").click(function(){
					if ($(this).attr("action")=="retry"){
						closeDialog(tempArray[index].id,"event");
					}else{
						closeDialog(tempArray[index].id);
					}
				});
			})(i);
		}
		return returnObj;
	})();
	//对话框关闭事件，目前仅用于error样式打开的对话框
	var domEvent={};
	
	//打开对话框
	//idStr 对话框对应的id编号
	//text 对话框需要显示的文本内容
	//classType 对话框的类型 目前仅支持loading/warning/error
	//buttonShow 显示交互按钮的字符串 用逗号分隔
	//openType 预留 用于实现自隐藏对话框
	//retryFunction  一般是relaxAJAX实例， 用于实现在对话框重试按钮的时候调用指定方法
	function openDialog(idStr, text, classType, buttonShow, openType, retryFunction){
		if (!(idStr in dialogList)) return;
		var dom=dialogList[idStr];
		dom.children(".text").eq(0).text(text);
		var classStr=dom[0].className.replace(/(\s\w+)?$/," "+classType);
		dom[0].className=classStr;
		
		//显示按钮
		if (buttonShow){
			var tempArray=buttonShow.split(",");
			for (var i=0; i<tempArray.length; i++){
				buttonObj=dom.find("[action='"+tempArray[i]+"']").eq(0);
				buttonObj.css("display","inline-block");
			}
		}
		
		if (openType=="auto"){
			setCenter(dom);
			dom.css({display:"block",opacity:0,top:"auto",bottom:"0px"});
			dom.animate({opacity:1,bottom:"10%"},1000,function(){
				setTimeout(function(){
					dom.css("bottom","auto");
					closeDialog(idStr);
				},2500);
			});
		}else{
			dom.css("display","block");
			dom.prev().css("display","block");
			setCenter(dom);
		}
		
		if (classType=="error"){
			domEvent[idStr]=retryFunction;
		}
	}
	
	//关闭对话框
	function closeDialog(idStr,doEvent){
		if (!(idStr in dialogList)) return;
		var dom=dialogList[idStr];
		dom.css("display","none");
		dom.prev().css("display","none");
		if (doEvent){
			if ((idStr in domEvent) && typeof(domEvent[idStr])=="function"){
				domEvent[idStr]();
				domEvent[idStr]="";
			}	
		}
		//隐藏按钮
		dom.find(".myButton").css("display","none");
	}
	
	//居中对象
	function setCenter(domObj){
		var father=domObj.parent();
		var allWidth=father.width();
		var allHeight=father.height();
		var leftDis=parseInt((allWidth-domObj.width())/2);
		var topDis=parseInt((allHeight-domObj.height())/2);
		domObj.css({left:leftDis,top:topDis});
	}
	
	return {
		open: openDialog,
		close: closeDialog
	}
}