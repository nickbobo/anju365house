//utf8 手机版整体界面响应框架类
//最后整理 2016/11/11 by relax 
//------- v1.3.0  ---------------------
//=============================================
//=   2016/11/11
//=
//=============================================
function relaxMobile(defaultPage, config){
	//把当前body的高度设置成窗口高度 不用百分比 用设备固定高度，避免移动端百分比时候高度会被弹出键盘压缩
	setTimeout(function(){
		$("body").height($(window).height());
	},300);
    
	//获得page对象中的t或者b自定义属性
	function TBstate(obj,type){
		var nowAttr = obj.attr(type);
		if (nowAttr === undefined){
			return null;
		}else if(nowAttr === ""){
			return "";
		}else{
			return nowAttr;
		}
	}
	
	var CL = this;
  
	this.top = "";           //顶部对象
	this.bottom = "";        //底部对象
	this.content = "";       //页面内容框对象
	this.signal = {
		pageChange: false,   //记录当前是否页面正在切换
		allShow:    true     //记录顶部状态与底部状态的展现情况，true为展现，false为不展现
	};
	this.pc = true;
	this.defaultPage = CL._getURLhash();
	if (this.defaultPage == "") this.defaultPage = defaultPage? defaultPage:"";
	this.app = GetQueryString("app")? 1:0; //如果url  1为app

	//判定是移动端还是PC端
	if ("checkClientEQ" in window){
		if (checkClientEQ()!="pc") this.pc=false;
	}else{
		if (!!("ontouchend" in document)) this.pc = false;
	}
	//定义部件对象
	var part = {
		top: "",
		bottom: "",
		content: ""
	};
	//读取配置参数
	if (config){
		for (var x in part){
			if (x!= "top" && x!="bottom" & x!="page") continue;
			if ((x in config) && typeof(config[x]) == "object"){
				part[x] = config[x];
			}
		}
	}
	//设置部件对象的默认值
	for (var x in part){
		if (!part[x]){
			switch(x){
				case "top":
					part[x] = document.querySelector("header");
					break;
				case "bottom":
					part[x] = document.querySelector("nav");
					break;
				case "content":
					part[x] = document.querySelector(".content");
			}
			if (!part[x]){
				part[x] = "";
			}
		}
	}
	//头部对象
	this.top = {
		mine:    part.top? $(part.top):"",   //头部DOM的js对象
		H:       0,                          //头部外框的外高度
		isShow:  true,                       //标记当前页的部件显示状态，用于同主动扩展隐藏做区别
		list:    {},                         //记录头部子元素集合对象，索引值是每个DOM的name字符
		listNow: ""                          //记录当前展现的DOM对象的name，没有任何展现的时候为空字符串
	};
	//底部对象
	this.bottom = {
		mine:    part.bottom? $(part.bottom):"",    //底部DOM的JQ对象            
		H:       0,                                 //注意，底部部件在某些情况下不存在
		isShow:  part.bottom? true:false,           //标记当前页的底部显示状态
		list:    {},                                //记录底部的J子元素集合对象，索引值是每个DOM的name字符
		listNow: ""                                 //记录当前展现的DOM对象的name
	};
	
	this.content = {
		mine:    part.content? $(part.content):"",  //内容框JQ DOM对象
		list:    {},
/*
		list属性是page页面的集合对象，索引值是每个page DOM的name字符 值结构如下
			dom    对应page的DOM对象
			first  true/false 标记当前page是否第一次加载
			t      对应的头部DOM的name值
			b      对应的底部DOM的name值
			Load   每次加载的事件，默认为空字符
			Unload 页面卸载加载的事件，默认为空字符
			base   表示该页的展现是以哪个页面展现作为基础，如果base设置的这个页面没有展现，则会跳转到这个页面显示
			show   表示该页是否展现
			iframe 表示该页是用iframe加载，这里存放的是加载的url地址
*/
		listNow: ""                                //当前展现的page页面的name
	};
	
	//头部信息或者内容信息不存在则没有意义 可以允许不存在底部信息 
	if (part.top=="" || part.content=="") return;
	
	//初始化内容页
	(function(){
		var tempArray = CL.content.mine.children(".pages");
		var allLen = tempArray.length;
		var nowObj;
		for (var i=0; i<allLen; i++){
			//注意 对象赋值的过程是个传址的过程，所以目前使用直接赋值而非中间变量赋值
			nowObj = $(tempArray[i]);
			nowObj.css("display","none");
			var names = nowObj.attr("names");
			var iframe = nowObj.attr("source");
			CL.content.list[names] = {
				dom:       nowObj,
				first:     true,
				t:         TBstate(nowObj,"t"),
				b:         TBstate(nowObj,"b"),
				Load:      "",
				base:      nowObj.attr("base"),
				show:      false,
				iframe:    iframe? iframe:""
			}
		}
	})();
  
	//初始化页头
	(function(){
		var returnObj = {};
		var tempArray = CL.top.mine.children("*");
		var allLen = tempArray.length;
		for (var i=0; i<allLen; i++){
			$(tempArray[i]).css("display","none");
			var names = $(tempArray[i]).attr("names");
			returnObj[names] = $(tempArray[i]);
		}
		CL.top.list = returnObj;
		CL.top.H = CL.top.mine.outerHeight();
	})();
  
	//初始化页脚
	(function(){
		if (CL.bottom.mine == ""){
			CL.bottom.isShow = false;
			CL.content.mine.css("paddingBottom","0px");
			return;
		}
		var returnObj = {};
		var tempArray = CL.bottom.mine.children("*");
		var allLen = tempArray.length;
		for (var i=0; i<allLen; i++){
			$(tempArray[i]).css("display","none");
			var names = $(tempArray[i]).attr("names");
			returnObj[names] = $(tempArray[i]);
		}
		CL.bottom.list = returnObj;
		CL.bottom.H = CL.bottom.mine.outerHeight();
	})();
}

//初始化类
relaxMobile.prototype.init = function(){
	var CL = this;
	//头部信息或者内容信息不存在则没有意义 可以允许不存在底部信息 
	if (this.top.mine=="" || this.content.mine=="") return;
  
	//location.hash改变事件绑定
	window.onhashchange = function(e){
		e = e ? e : event;
		//用于判定之前页面是否有Unload事件绑定，如果有则进而判断该事件返回值是否是true，是则跳转，否则回退
		var nowHash = CL._getURLhash();
		var pageHash = CL.content.listNow;
		if (CL.content.listNow){
			if (typeof(CL.content.list[pageHash].Unload)=="function"){
				var result = CL.content.list[pageHash].Unload();
				if (result === false){
					location.hash = pageHash;
					return false;
				}
			}
		}
		if (pageHash != nowHash){
			//按url中的hash值展现页面
			CL.pageShow("");
		}
	}
	
	//如果CL.def有默认值，则显示默认页面
	if (CL.defaultPage !== "" && (CL.defaultPage in CL.content.list)){
		CL.pageShow(CL.defaultPage);
	}else{
		CL.defaultPage = "";
		CL.pageShow("");
	}
	
	//绑定当前html文件中所有跳转按钮事件
	$("[href]").click(function(e){
		var nowHash = $(this).attr("href");
		if (nowHash.substr(0,1) == "#"){
			nowHash = nowHash.replace("#","");
			CL.pageShow(nowHash, "click");
			e = e ? e : event;
			js_protectEvent(e);
		}else{
			return true;
		}
	});
}

//显示页面
//参数 page 需要显示页面的name字符串 如果是空字符，则按当前url中的hash值进行展现
//参数 type 一般click交互操作需要生成历史纪录的，则请传递type为click，否则页面切换用replace不会生成历史记录
relaxMobile.prototype.pageShow = function(page, type){
	var CL = this;
	if (CL.signal.pageChange) return;  //如页面正在切换，则不做处理
	page = page + "";
	var showName = "";
	if (page !== "" && !(page in CL.content.list)) return;  //没有对应的显示页面
	if (page === ""){
		//按当前的hash值显示页面，如果hash也为空，则显示默认顺序第一个页面
		var hash = CL._getURLhash();
		if (hash == ""){
			if (CL.defaultPage == ""){
				for (var x in CL.content.list){
					CL.defaultPage = x;
					break;
				}
				if (CL.defaultPage == "") return;
				showName = CL.defaultPage;
			}else{
				showName = CL.defaultPage;
			}
		}else{
			if (!(hash in CL.content.list)) return;
			showName = hash;
		}
	}else{
		showName = page;
	}

	if (location.hash != "#" + showName){
		if (type == "click"){
			var url = location.href.replace(/\#.*/ig,"") + "#" + showName;
			location.href = url;
		}else{
			//这里使用location.replace 防止使用location.hash生成新的浏览历史纪录
			var url = location.href.replace(/\#.*/ig,"") + "#" + showName;
			location.replace(url);
		}
		return;
	}
	
	//判定当前页面的是否有先决页面，没有则继续，有则判定先决页面是否展现
	var basePage = CL._isBaseHide(showName);
	if (basePage !== false){
		var url = location.href.replace(/\#.*/ig,"") + "#" + basePage;
		location.replace(url);
		return;
	}
  
	//如果当前页已经展现，则不做操作
	if (CL.content.listNow == showName) return;
	
	//默认页面跳转的时候，展现头部底部内容框
	var showObj = CL.content.list[showName];
	CL.TBShow({
		top: showObj.t,
		bottom: showObj.b
	});
	
	
	//加载需要iframe调用的页面
	if (showObj.iframe && showObj.first){
		var tempIframe = document.createElement("iframe");
		tempIframe.src = showObj.iframe;
		tempIframe.frameborder = "0";
		tempIframe.topmargin="0";
		tempIframe.leftmargin="0";
		tempIframe.marginwidth="0";
		tempIframe.marginheight="0";
		showObj.dom.append(tempIframe);
	}
	
	//modify by relax 2016/12/22
	//增加切换document.title的功能
	CL.setTitle(CL.top.list[showObj.t].find("h2").text());
	
	//无任何页面加载的情况 直接展现
	if (CL.content.listNow == ""){
		showObj.dom.css({"display":"block","opacity":1});
		showObj.dom[0].scrollTop = 0;  //把滚动条回滚到顶部
		CL.content.listNow = showName;

		//调用firstLoad和Load事件
		if (typeof(showObj.Load) == "function") showObj.Load("first");
		showObj.first = false;
		showObj.show = true;
	}else{
		//有页面加载的情况，动画展现
		CL.signal.pageChange = true;
		//隐藏上一个页面
		var lastPage = CL.content.list[CL.content.listNow].dom;
		lastPage.css({"display":"none"});
		
		//页面交换使用淡入淡出效果 其他效果需要重新编写该
		showObj.dom.css({"display":"block","opacity":0});
		showObj.dom[0].scrollTop = 0;
		
		showObj.dom.animate({"opacity":1},400,function(){
			CL.signal.pageChange = false;
			CL.content.listNow = showName;
		});
		
		if (showObj.first){
			showObj.first = false;
			if (typeof(showObj.Load) == "function") showObj.Load("first");
		}else{
			if (typeof(showObj.Load) == "function") showObj.Load();
		}
		showObj.show = true;
	}
}

//获得当前的hash值
relaxMobile.prototype._getURLhash = function(){
	var hash = location.hash;
	if (hash){
		hash = hash.replace("#","");
		if (hash){
			return hash;
		}else{
			return "";
		}
	}else{
		return "";
	}
}

//获得所需页面的先决页面是否展现，是则返回false，否则返回对应页面的name字符传
//pageStr 需要检测的页面name字符串
//countNum 记录递归的深度
relaxMobile.prototype._isBaseHide = function(pageStr, countNum){
	//防止无限递归 比如级联页面的base可能会无意中设置成一种循环
	if (isNaN(countNum - 0)){
		countNum = 1;
	}else{
		countNum++;
	}
	if (countNum > 10) return false;
	
	var CL = this;
	
	if ((pageStr in CL.content.list) && CL.content.list[pageStr].base && (CL.content.list[pageStr].base in CL.content.list)){
		//检查base页面当前显示状态 是否已经显示过
		if (CL.content.list[CL.content.list[pageStr].base].show == true){
			if (countNum == 1){
				return false;
			}else{
				return CL.content.list[pageStr].base;
			}
		}else{
			return CL._isBaseHide(CL.content.list[pageStr].base, countNum);
		}
	}else{
		if (countNum == 1){
			return false;
		}else{
			return pageStr;
		}
	}
}

//显示隐藏header/footer
relaxMobile.prototype.TBShow = function(config){
	var CL = this;
	for (var x in config){
		var doObj = "";
		switch(x){
			case "top":
				doObj = CL.top;
				break;
			case "bottom":
				doObj = CL.bottom;
				break;
		}
		if (doObj.mine == "") continue;
		
		var nameStr = config[x];
		//空字符 当前不做更改 ,null值当前不展现， 0 展现当前页面的顶部和底部，其他，展现对应的names项
		if (nameStr!==null && nameStr!==0 && (nameStr === "" || !(nameStr in doObj.list))){
			//modify by relax 2016/12/22
			//如果此时的对应的nameStr没有在对应的头部或者底部存在，则把对应的部分隐藏
			if (!(nameStr in doObj.list)){
				doObj.mine.css("display","none");
				if (x == "top"){
					CL.content.mine.css("paddingTop",0);
				}else{
					CL.content.mine.css("paddingBottom",0);
				}
			}
			continue;
		}

		//如果是APP嵌入打开的页面，则不显示标题栏和底部导航栏
		if (CL.app==1 && nameStr!==null){
			if (nameStr===0){
				nameStr=CL.content.listNow;
			}
			if (doObj.list[nameStr].attr("fixed")=="fixed"){
				doObj.mine.css("display","block");
				//当前版本中，nav的内部元素的display为table，原先为block，请留意这方面的差别，可能需要更改对应的样式表文件
				doObj.list[nameStr].css("display","table");
				doObj.listNow=nameStr;
				doObj.isShow=true;
				if (x == "top"){
					CL.content.mine.css("paddingTop",doObj.H);
				}else{
					CL.content.mine.css("paddingBottom",doObj.H);
				}
				continue;
			}else{
				doObj.mine.css("display","none");
				doObj.isShow = false;
				if (x == "top"){
					CL.content.mine.css("paddingTop",0);
				}else{
					CL.content.mine.css("paddingBottom",0);
				}
				continue;
			}
		}
		
		if (nameStr == null){
			doObj.mine.css("display","none");
			doObj.isShow = false;
			if (doObj.listNow != "") doObj.list[doObj.listNow].css("display","none");
			doObj.listNow = "";
			if (x == "top"){
				CL.content.mine.css("paddingTop",0);
			}else{
				CL.content.mine.css("paddingBottom",0);
			}
		}else if(nameStr==0){
			if (CL.content.listNow == "") return;
			var names = CL.content.listNow;
			var tempObj = CL.content.list[names];
			CL.TBShow({top:tempObj.t,bottom:tempObj.b});
			return;
		}else{
			if (doObj.mine.css("display") == "none"){
				doObj.mine.css("display","block");
				doObj.isShow = true;
			}
			if (doObj.listNow != "") doObj.list[doObj.listNow].css("display","none");
			doObj.list[nameStr].css("display","table");
			doObj.listNow = nameStr;
			if (x == "top"){
				CL.content.mine.css("paddingTop",doObj.H);
			}else{
				CL.content.mine.css("paddingBottom",doObj.H);
			}
		}
	}
}

//页面切换事件绑定
relaxMobile.prototype.eventPageChange = function(eventArray){
	var CL = this;
	for (var i=0; i<eventArray.length; i++){
		$(eventArray[i]).click(function(){
			var href = $(this).attr("href");
			if (href.substr(0,1) == "#"){
				var name = href.replace("#","").Trim();
				CL.pageShow(name);
			}
		});
	}
}

//设置页面的title
//modify by relax 2016/12/22
relaxMobile.prototype.setTitle = function(title){
	if (title){
		if (typeof(title)=="string"){
			document.title = title;
		}
	}
}



//utf8 PC端及移动端的对话框

/* 
========================================================================================
=   对话框类                                                                           =
=   config={                                                                           =
=      open: 对话框打开执行的方法(dialogID,type),                                      =
=      close: 对话框关闭执行的方法(dialogID,type,buttonType),                          =
=      animate: 动画间隔时间 单位毫秒                                                ===
=   }                                                                             ======
======================================================================================== 
modify by relax 2016/8/？  对于关闭事件，如果绑定事件后，协调了事件触发逻辑，原先不管什么情况都触发，现在为点击对话框按钮才触发，js调用则一般不触发，除非强制书写
modify by relax 2016/9/10 增加了非强制提示 一般用于并不严重错误的提示信息，不用交互关闭，会自动关闭
modify by relax 2016/9/23 对于关闭对话框中，判定是否当前对话框的条件进行注销，否则对应打开多个对话框且当前需要关闭对话框在打开操作的前列，导致nowShow没有匹配到，会无法关闭
modify by relax 2016/10/26 去除了html中单一的mask遮罩层，目前修改为每个对话框一个遮罩层，这样如果打开多个对话框的情况下，不至于导致操作穿插混乱
*/
function relaxDialog(config){
	var list={};    //记录对话框对象
/*
list结构
	dom 当前的对话框对象
	type 对话框类型 dialog/menu/page/mini
	show 对话框当前是否展现 true/false
	title 对话框的title dom
	content 对话框的 content dom
	buttonbar 对话框的 按钮部分 dom
*/
	var nowShow="";       //记录当前打开的对话框id
	var eventOpen="";
	var eventClose="";
	var animateTime=350;  //动画执行时间，单位是毫秒
  
	if (config && typeof(config)=="object" && config.open && typeof(config.open)=="function"){
		eventOpen = config.open;
	}
	if (config && typeof(config)=="object" && config.close && typeof(config.close)=="function"){
		eventClose = config.close;
	}
	if (config &&  typeof(config)=="object" && typeof(config.animate)=="number" && config.animate>=0){
		animateTime = config.animate;
	}
  
	var searchClass = [".extDialog",".extMenu",".extPage",".miniDialog"];  //弹出框，移入式菜单，移入式页面，自隐对话框
	for (var i=0; i<searchClass.length; i++){
		(function(index){
			var tempArray = $(searchClass[index]);
			for (var i=0; i<tempArray.length; i++){
				if (tempArray[i].id){
					list[tempArray[i].id]={
						dom: $(tempArray[i]),
						type: searchClass[index].replace(".","").replace("ext","").toLowerCase(),
						show: false,
						title: $(tempArray[i]).children(".dialog-title").eq(0),
						content: $(tempArray[i]).children(".dialog-content").eq(0),
						buttonbar: $(tempArray[i]).children(".dialog-buttonBar").eq(0),
						domMask: (function(){
							$(tempArray[i]).before('<div class="mask"></div>');
							return $(tempArray[i]).prev();
						})()   //新增的对象遮罩层
					}
				}
			}
		})(i);
	}
	
	/*协调样式中的动画执行时间*/
	$(".extPage").css("transitionDuration",animateTime+"ms");
	$(".extMenu").css("transitionDuration",animateTime+"ms");
  
	//绑定弹出框中窗口的按钮一般事件
	for (var x in list){
		(function(JQobj){
			//取消按钮事件
			JQobj.find(".bnt-cancel").on("click",function(e){
				dialogClose(JQobj[0].id, "cancel",null,true);
				js_protectEvent(e);
			});
			//确定按钮事件
			var tempArray = JQobj.find(".bnt-sure");
			for (var i=0; i<tempArray.length; i++){
				var nowHref = $(tempArray[i]).attr("href");
				if (!nowHref){
					$(tempArray[i]).on("click",function(e){
						dialogClose(JQobj[0].id, "sure",null,true);
						js_protectEvent(e);
					});
				}else{
					$(tempArray[i]).unbind();
					$(tempArray[i]).on("click",function(e){
						dialogClose(JQobj[0].id, "sure", nowHref,true);
						js_protectEvent(e);
					});
				}
			}
			//关闭按钮事件
			JQobj.find(".bnt-close").on("click",function(e){
				dialogClose(JQobj[0].id, "close",null,true);
				js_protectEvent(e);
			});
		})(list[x].dom);
	}
  
//打开对话框
//config 用于对话框展现时候的内容设置
/*
{
	title:标题文本 会填写到dialog-title内容下的h4标签内
	close:true/false 是否在顶部显示后退按钮，仅用于menu和page对话框
	content:内容文本或者内容框html 将会把内容回填到dialog-content内容框的mui-content-padded中 暂有待商榷
	bntsure:true/false 是否显示确定按钮
	bntcancel:true/false 是否显示取消按钮
	bntclose:true/false 是否显示关闭按钮
}
*/
	function dialogShow(idStr,config){
		if (!(idStr in list)) return;
		
		//如果有对话框打开，当前对打开的对话框不做处理 modify by relax 2016/9/10 可能存在多个对话框同时显示的情况
		//if (nowShow != "") return this;
		var tempObj = list[idStr];
		//如果当前已经打开，则不处理
		if (tempObj.show == true) return;
      
		//协调细节
		if (config && typeof(config)=="object"){
			//对话框标题重置
			if (config.title){
				tempObj.title.find("h4").eq(0).text(config.title);
			}
			//对话框内容重置
			if (config.content){
				//ACTION @@@ 注意 新版的不再使用mui-content-padded作为内容框的边距空白
				tempObj.content.children(".mui-content-padded").html(config.content);
			}
			//对于menu和page对话框顶部后退按钮的显示不显示控制
			if (tempObj.type=="menu" || tempObj.type=="page"){
				if ("close" in config){
					if (config.close){
						tempObj.title.eq(0).find(".bnt-close").css("display","block");
					}else{
						tempObj.title.eq(0).find(".bnt-close").css("display","none");
					}
				}
			}
			
			//操作按钮协调
			var itemArray = ["bnt-sure","bnt-cancel","bnt-close"];
			tempObj.buttonbar.children("*").css("display","inline-block");
			for (var j=0; j<itemArray.length; j++){
				var obj = tempObj.buttonbar.find("."+itemArray[j]).eq(0);
				if (obj.length==1){
					var loopStr = itemArray[j].replace("-","");
					if (loopStr in config){
						if (config[loopStr]){
							//判断当前是用inline-block展现还是block展现
							var flagShow = "block";
							if (obj.hasClass("bntBlock")){
								flagShow = "block";
							}else if(obj.hasClass("bntInline")){
								flagShow = "inline-block";
							}
							obj.css("display",flagShow);
						}else{
							obj.css("display","none");
						}
					}
				}
			}
		}
		
		//协调不同对话框及其屏蔽层的展现
		switch(tempObj.type){
			case "dialog":
				centerDialog(tempObj.dom);
				tempObj.dom.show();
				if (animateTime == 0){
					tempObj.domMask.css({opacity:0.5}).show();
				}else{
					tempObj.domMask.show().animate({opacity:0.5},animateTime);
				}
				break;
			case "menu":
				fitheight(tempObj.dom);
				tempObj.dom.removeClass("hide").addClass("show");
				tempObj.domMask.show().animate({opacity:0.5},animateTime);
				break;
			case "page":
				fitheight(tempObj.dom);
				tempObj.dom.removeClass("hide").addClass("show");
				break;
			case "minidialog":
				//目前隐藏时间暂未处理成可设定参数，如果需要修改请修改以下常数
				tempObj.dom.css({display:"block",opacity:1});
				setTimeout(function(){
					tempObj.dom.animate({opacity:0},500,function(){
						tempObj.dom.css("display","none");
						tempObj.show = false;
						nowShow="";
					});
				},2000);
				break;
		}
      
		tempObj.show = true;
		nowShow = idStr;
		if (eventOpen){
			if (animateTime==0){
				eventOpen(idStr, tempObj.type);
			}else{
				setTimeout(function(){
					eventOpen(idStr, tempObj.type);
				},animateTime);
			}
		}
	}
  
	//关闭对话框
	function dialogClose(idStr,buttonType,goUrl,isEvent){
		if (!(idStr in list)) return;
		
		//如果当前打开的对话框不是需要关闭的对话框，则不做处理
		//modify by relax 如果有多个对话框打开，这里会有问题，目前先注销
		//if (nowShow != idStr) return;

		var tempObj = list[idStr];

		//查看是否绑定关闭事件，如果绑定先执行，且执行返回如果是false则不关闭
		if (eventClose && isEvent){
			var result = eventClose(idStr, tempObj.type, buttonType);
			if (!result) return;
		}
		
		//如果当前未打开，则不处理
		if (tempObj.show == false) return;
		switch(tempObj.type){
			case "dialog":
				tempObj.dom.hide();
				tempObj.domMask.css("opacity",0).hide();
				break;
			case "menu":
				tempObj.dom.removeClass("show").addClass("hide");
				tempObj.domMask.css("opacity",0).hide();
				break;
			case "page":
				tempObj.dom.removeClass("show").addClass("hide");
			break;
		}
		
		tempObj.show = false;
		nowShow = "";
		if (goUrl) location.href=goUrl;
	}
  
	//居中对象
	function centerDialog(JQobj){
		var H = JQobj.height();
		var W = JQobj.width();
		var body = $("body");
		var bh = body.height();
		var bw = body.width();
		var goLeft=parseInt((bw-W)/2);
		var goTop=parseInt((bh-H)/2);
		if (goTop<0){
			var partT = JQobj.children(".dialog-title").eq(0).height();
			var partB = JQobj.children(".dialog-buttonBar").eq(0).height();
			var allT = $("body").height();
			JQobj.children(".dialog-content").height(allT - partT -partB);
			goTop=0;
		}
		JQobj.css({left:goLeft,top:goTop});
	}
  
	//协调对话框内容展现的高度
	function fitheight(JQobj){
		//协调内容展现部分的高度
		var tempArray=JQobj.children("*");
		var allHeight=0;
		for (var i=0; i<tempArray.length; i++){
			if ($(tempArray[i]).hasClass("dialog-content")) continue;
			allHeight+=$(tempArray[i]).outerHeight();
		}
		//var partT = JQobj.children(".dialog-title").eq(0).outerHeight();
		//var partB = JQobj.children(".dialog-buttonBar").eq(0).outerHeight();
		var allT = JQobj.height();
		//JQobj.children(".dialog-content").height(allT - partT -partB);
		JQobj.children(".dialog-content").height(allT-allHeight);
	}
  
	return {
		open: dialogShow,
		close: dialogClose,
		setCloseCallback:function(callback){
			eventClose = callback;
		}
	}
}