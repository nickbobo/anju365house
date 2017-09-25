//utf8
//层级分类的选择表现及处理 【暂不支持多选】
//exp
/*
==== 需要的包含库 =====
1. jquery.js
2. relax_function.js
3. relax_ajax.js

==== 参考css ====
.levelSelection{ width:500px;}
.levelSelection .template{ display:none;}
.levelSelectionTitle{ padding:5px; padding-bottom:0px; overflow:hidden; border-bottom:1px solid #cccccc; position:relative;}
.levelSelectionTitle > *{ float:left; overflow:hidden;}
.levelSelectionTitle > *:first-child{ padding-right:20px; line-height:36px;}
.levelSelectionTitle .levelSelectionErr{ float:none; position:absolute; right:0px; top:15%; background-color:#ff0000; height:30px; line-height:30px; color:#ffffff; padding:0px 5px; border-radius:5px 0px 0px 5px; display:none;}
.levelSelectionItem{ float:left; position:relative; margin-right:10px; margin-bottom:5px; background-color:#ffffff; border:1px solid #aaaaaa; height:36px; padding:0px 10px 0px 10px; line-height:36px; border-radius:6px; cursor:pointer;}
.levelSelectionItem:hover{ background-color:#f6f6f6; border-color:#999999;}
.levelSelectionItem.more{ background-color:#666666; border-color:#666666; color:#ffffff;}
.levelSelectionItem.more:hover{ background-color:#eeeeee; border-color:#999999; color:#666666;}
.levelSelectionItem.doEdit{ background-color:#ff0000; color:#ffffff; border-color:#ff0000;}
.levelSelectionItem.doEdit:hover{ background-color:#cc0000; border-color:#cc0000;}
.levelSelectionTitle .levelSelectionItem.doEdit{ padding-right:10px; font-size:14px; cursor:pointer;}
.levelSelectionItem > strong{ font-weight:600;}
.levelSelectionItem.sel{ border-color:red; color:red;}
.levelSelectionItem.sel:hover{ background-color:#ffffff;}
.levelSelectionTitle .levelSelectionItem{ padding:0px 20px 0px 10px; cursor:default;}
.levelSelection .close{ position:absolute; right:5px; top:0px; cursor:pointer; color:red;}
.levelSelection .close:hover{ font-weight:600;}
.levelSelectionSearch{ background-color:#f0f0f0; padding:5px; overflow:hidden;}
.levelSelectionSearch > *{ float:left;}
.levelSelectionSearch > *:first-child{ padding-right:10px; padding-left:10px; line-height:36px;}
.levelSelectionSearch .inputStyle{ margin-right:5px;}
.levelSelectionList{ padding:5px; overflow:hidden;}
.levelSelectionList .nodata{ display:block; text-align:center; padding:10px 0px; font-size:14px; color:#ff0000;}

==== 参考html ====
<div class="levelSelection" id="mytest" value='[{"id":1,"name":"江苏","parent":0},{"id":6,"name":"苏州","parent":1}]'>
	<div class="levelSelectionTitle">
		<span class="t2 c2">选择地区</span>
		<div class="levelSelectionNow">
			<span class="levelSelectionItem template t2 c1"><span>{#name#}</span><span class="close" level="{#level#}">&times;</span></span>
		</div>
		<span class="levelSelectionItem doEdit" id="doEdit">修改</span>
		<div class="levelSelectionErr t1">这里是错误信息提示</div>
	</div>
	
	<div class="levelSelectionSearch">
		<span class="t2 c2">搜索地区</span>
		<div>
			<input type="text" class="levelSelectionRelation inputStyle t2"/><input type="button" value="搜索" class="levelSelectionButton buttonStyle t2"/>
		</div>
	</div>
		
	<div class="levelSelectionList">
		<span class="levelSelectionItem template t2 c1" value="{#id#}" parent="{#parent#}">{#name#}</span>
	</div>
</div>
说明 
1. id为实例化时候需要传递的参数
2. value 初始化当前选择时候需要传递的数据对象JSON字符串，结构必须按照上面的结构书写，一般用于资料修改页面中，必须配合自己定义的修改按钮调用 exp.setEdit(true); 方法并传递参数true即可，需要注意的是，这种情况下必须把初始级别的类型先加载完毕，调用时候，程序会按Max设定与当前值所在的层级自动调用末级分类数据
3. class="levelSelectionSearch"为搜索功能，不存在则默认不启用搜索功能
4. 关键class 父levelSelection  *错误提示框levelSelectionErr 可选单元levelSelectionItem 选中值显示框levelSelectionNow  可选项的外框levelSelectionList *查询提交外框levelSelectionSearch *配合查询的输入框levelSelectionRelation *配合查询的查询按钮levelSelectionButton 【带*的不是必须项】
5. 另外class=template 属于模板项，在书写的时候注意替换字符的书写，替换项在CSS中定义为不可见，避免初始加载未加载该类的时候显示出来，实例化的时候会自动被删除，同样是必须的

==== 参考JS ====
var exp = new levelSelection(
	id:"mytest",      //对应外框的id字符串
	url:"test.asp",   //需要跟服务端通信的url地址 不填写则默认不使用ajax，用于应对一次性把所有项加载完毕的情况
	max:3,            //允许类的最大层次级别，从1开始计算
	pagesize:5,       //使用更多按钮的情况下，每一页显示的最大数量
	more:true,        //是否启用更多按钮
	flagOK:200,       //用于应对服务端的返回数据标志值中的正确值，因为通用化考虑服务端返回JSON结构中，有包含本次返回是否正确的标志，但每个实例不一定一致，提供该接口可以自定义
	fld:{             //对应服务端的各项数据索引名称，如果是id,name,sub,page则无需传递该参数
		id:"ids",         //类别id的索引名称
		name:"names",     //类别name的索引名称
		sub:"subs",       //类别子类对象的索引名称
		page:"pages"      //类别分页的索引名称
	},
	evt:{                 //外部事件接口
		change:function(op){...},   //值改变时候调用的函数，op[close/click] close表示当前选中值的删除按钮点击所触发 click表示当前可选项的点击所触发
		err:function(str){...}      //错误时触发的函数，参数str包含错误提示信息
	}
});
exp.init("set");          //用于有初始值的加载，一般用在修改编辑页面
//或者
exp.init("init");         //用于页面初始就有服务端按需求结构加载的html
}

==== 传递给服务端参数说明 ========
type [get/search] get表示直接按id获得对应的分类数据  search表示当前是查询操作，需要通过key和id来获得分类数据
id 数值 >=0 表示当前客户端需要获得的分类数据是从属于哪个父类 这个id就是指示的父类别的id编号
level 应对某些服务器特殊情况，表示当前获取数据的层级，根类传递的level=1 其他类则递增，主要协调某些情况下分类表不是1张表实现的情况
page 【可选】 当没有启用更多按钮的时候【分页功能】是不会传递该参数，否则传递的是获取分页数据的页码
pagesize 【可选】 当没有启用更多按钮的时候不会传递该参数，否则传递的是获取分页数据的每页显示数量

==== 服务端返回数据格式说明 =======
{
	"flag":200,	   //返回状况的标志，默认200是成功标志，按后端的具体反馈前端实例化的时候可以通过flagOK设定
	"msg":"",	   //提示信息，只有当flag是错误的时候会调用
	"data":[       //具体的数据从这里开始【注意，是数组形式的回传，如果有错误，可以是空字符或者空数组
		{"id":0,"page":1,"sub":[     
		//当前查询的父类的基本信息，【注意，这里的id,name,sub,page 4个
		//索引名称可以通过前端实例化类的时候，设置fld对象来进行自定义】 
		//page项在启用更多按钮的时候需要包含在返回数据里，否则无需包含
			{"id":1,"name":"江苏"},  
			//父类的子类别资料，包含子类的id编号和name名称，如果是更多层次的遍历，
			//这里可以有该类的sub项，sub项包含的是该类别的子项，如果启用分页也可以有page项
			{"id":2,"name":"上海"},
			{"id":3,"name":"北京"},
			{"id":4,"name":"浙江"}
		]}
	]
}

==== 交互的常用方法 =================
class.init() 上面已经说明过
class.setEdit(true/false) 一般用于资料修改，传递true打开设置操作，传递false隐藏设置操作
class.getValue(op)   获得当前选中的对象数组，数组单元的结构是
[{
	id:对应选择类别的id编号
	name:类别的名称
	parent:类别的父类别id
}]
*/
function levelSelection(setting){
	this.list = {};          //整体层级关系的数据
	this.slist = [];         //当前选择的树目录数据
	this.ajax = "";          //AJAX交互类，如果url为空字符，则该类也会为空字符，不会实例化
	this.Url = "";           //跟服务端交互的url地址
	this.Max = "";           //默认的最大层级深度为2，从1开始计算
	this.More = false;       //标记是否启用更多按钮
	this.FlagOK = 200;       //标记AJAX成功的值
	this.Pagesize = 10;      //分页的每页显示数量
	
	this.frame = "";         //外框架JQ_DOM
	this.domValue = "";      //显示选中值的JQ_DOM
	this.domItem = "";       //显示可选列表的JQ_DOM
	this.domRelation = "";   //搜索值的输入框JQ_DOM
	this.domMore = "";       //更多按钮
	this.domButton = "";     //搜索按钮的JQ_DOM
	this.domErr = "";        //出错显示的DOM
	this.domSearch = "";     //搜索外框
	
	this.templateValue = "";  //显示值的模板
	this.templateItem = "";   //可选值的模板
	
	this.DEBUG = 1;          //出错调试开关
	this.Err = "";           //出错后调用的外部函数
	this.Change = "";        //值变更的情况下调用的外部函数
	
	this.Field = {           //自定义的AJAX_JSON返回数据的索引名称
		id:   "id",
		name: "name",
		sub:  "sub",
		page: "page"
	};
	
	this.op = "";            //用于记录当前获取数据的操作类型，普通点击click/更多按钮more/还是查询search
	this.level = 0;          //用于标记当前显示的类层级，用于快速定位当前选择项中需要的类信息 从0开始标记 0表示所有类的父类
	this.keyStr = "";        //搜索关键字，为空则表示默认查找，即显示默认内容
	this.clStr = {           //DOM查找的关键字
		err:"levelSelectionErr",
		value:"levelSelectionNow",
		list:"levelSelectionList",
		item:"levelSelectionItem",
		search:"levelSelectionSearch"
	}
	
	var CL = this;
	var tempObj = "";
	
	if (("id" in setting) && setting.id && typeof(setting.id) == "string"){
		tempObj = $("#" + setting.id);
		if (tempObj.length>0){
			CL.frame = tempObj;
		}
	}
	//检查类可执行性
	if (CL.frame == "") return;
	
	if (("url" in setting) && setting.url && typeof(setting.url) == "string"){
		CL.Url = setting.url;
		var ajaxDialog = new relaxAjaxDialog({parent:CL.frame,text:"正在加载数据，请稍等..."});
		CL.ajax = new relaxAJAX({
			url:CL.Url,
			before:function(){
				ajaxDialog.show({});
			},
			success:function(data){
				ajaxDialog.hide();
				CL._ajaxSuccess(data);
			},
			error:function(){
				ajaxDialog.hide();
				CL._ajaxError();
			}
		});
	}
	if (("max" in setting) && (isNaN(setting.max - 0) == false) && (setting.max >= 1)) CL.Max = setting.max;
	if (CL.Max == "") CL.Max = 100;
	if (("flagOK" in setting) && (isNaN(setting.flagOK - 0) == false) && (setting.flagOK >= 0)) CL.FlagOK = setting.flagOK;
	if ("more" in setting) CL.More = !!(setting.more)? true:false;
	if (("pagesize" in setting) && (isNaN(setting.pagesize - 0) == false) && (setting.pagesize -0 > 0)) CL.Pagesize = setting.pagesize;
 
	if ("evt" in setting){
		if (("err" in setting.evt) && typeof(setting.evt.err) == "function"){
			CL.Err = setting.evt.err;
		}
		if (("change" in setting.evt) && typeof(setting.evt.change) == "function"){
			CL.Change = setting.evt.change;
		}
	}
	if (CL.Err == ""){
		CL.domErr = CL.frame.find("."+CL.clStr.err);
		if (CL.domErr.length <= 0){
			CL.domErr = "";
		}else{
			CL.domErr = CL.domErr.eq(0);
		}
	}
	if ("fld" in setting){
		for (var x in CL.Field){
			if ((x in setting.fld) && typeof(setting.fld[x]) == "string") CL.Field[x] = setting.fld[x];
		}
	}
	
	//获得值显示DOM
	CL.domValue = CL.frame.find("."+CL.clStr.value).eq(0);
	//获得值显示模板
	tempObj = CL.domValue.find(".template");
	CL.templateValue = tempObj.removeClass("template").prop("outerHTML");
	tempObj.remove();
	
	//获得选项显示DOM
	CL.domItem = CL.frame.find("."+CL.clStr.list).eq(0);
	//获得选项显示模板
	tempObj = CL.domItem.find(".template");
	CL.templateItem = tempObj.removeClass("template").prop("outerHTML");
	tempObj.remove();
	
	//协调是否使用查询功能
	this.domSearch = CL.frame.find("."+CL.clStr.search);
	this.domSearch = this.domSearch.length>0? this.domSearch.eq(0):"";
	
	//========== 绑定事件 ==================================================================
	//绑定选项的选取相关事件
	CL.domItem.click(function(e){
		var idStr, nameStr, parentStr;
		var tempObj = $(e.target);
		var classStr = tempObj[0].className;
		if (classStr.indexOf(CL.clStr.item)<0){
			tempObj = tempObj.parent();
			classStr = tempObj[0].className;
		}
		if (classStr.indexOf(CL.clStr.item)>=0){
			//=== 更多按钮的点击事件
			if (classStr.indexOf("more")>=0){
				if (CL.More){
					parentStr = tempObj.attr("parent");
					tempObj.remove();
					CL.init("more", "", "", parentStr);
				}
				return;
			}
			
			//=== 常规点击事件
			//当前已选项，不做任何触发
			if (tempObj.hasClass("sel")) return;
			var idStr = tempObj.attr("value");
			var parentStr = tempObj.attr("parent");
			//去除当前选中项的样式
			CL.domItem.find(".sel").removeClass("sel");
			tempObj.addClass("sel");
			CL.init("click", "", idStr, parentStr);
			if (CL.Change != ""){
				CL.Change("close");
			}
		}
	});
	
	//绑定已选择项的关闭按钮点击事件
	this.domValue.click(function(e){
		var tempObj = e.target;
		if (tempObj.className.indexOf("close")>=0){
			var level = $(tempObj).attr("level");
			for (var i=CL.slist.length; i>=level; i--){
				CL.slist.pop();
			}
			CL.op = "del";
			CL.keyStr = "";
			CL.level = i + 1;
			CL._refreshItem();
			CL._refreshValue();
			if (CL.Change != ""){
				CL.Change("click");
			}
		}
	});
	
	//绑定搜索事件
	if (this.domSearch){
		CL.domRelation = this.domSearch.find(".levelSelectionRelation");
		CL.domButton = this.domSearch.find(".levelSelectionButton");
		if (CL.domRelation.length >0){
			CL.domRelation = CL.domRelation.eq(0);
		}else{
			CL.domRelation = "";
		}
		if (CL.domButton.length > 0){
			CL.domButton = CL.domButton.eq(0);
		}else{
			CL.domButton = "";
		}
		if (CL.domButton && CL.domRelation){
			CL.domButton.click(function(){
				var keyStr = CL.domRelation[0].nodeName.toLowerCase() == "input"? CL.domRelation.val() : CL.domRelation.text();
				CL.init("search", keyStr);
			});
		}else{
			CL.domSearch = "";
		}
	}
	//============== 绑定事件结束 ====================================================
}

//init方法目前使用 typeStr进行操作项的区分，不在自动判定数据类型作为操作项的决断
//typeStr
// "init" 表示按照当前的dom内容进行选项和显示的初始化
// "more" 表示更多按钮加载
// "getAJAX" 表示获得AJAX值对象作用于list列表
levelSelection.prototype.init = function(typeStr, Obj, idStr, parentStr){
	var CL = this;
	if (CL.frame === "") return;
	
	//初始化模式
	if (typeStr == "init"){
		CL.op = "init";
		CL.level = 1;
		CL._makeData();
		CL._refreshValue();
		CL._refreshItem();
		return;
	}
	
	if (typeStr == "first"){
		CL.op = "click";
		CL.level = 1;
		CL._getAjaxData(0);
		return;
	}
	
	
	//有初始值的情况
	if (typeStr == "set"){
		CL.op = "init";
		CL.level = 1;
		CL._makeData();
		
		//获得当前设定值
		if (CL.frame.attr("value")){
			var temp = eval('(' + CL.frame.attr("value") + ')');
			if (temp instanceof Array){
				CL.slist = [];
				for (var i=0; i<temp.length; i++){
					if (i+1 > CL.Max) break;
					CL.slist.push(temp[i]);
				}
			}
			//console.log(CL.slist);
			//按初始值加载末级数据
			var forLen = 0;
			if (CL.Max > CL.slist.length+1){
				forLen = CL.slist.length;
			}else{
				forLen = CL.Max;
			}
			for (var i=0; i<forLen-1; i++){
				CL.level++;
			}
			if (CL.ajax == ""){
				CL._refreshValue();
				CL._refreshItem();
				CL.setEdit(false);
			}else{
				CL.op = "set";
				var sendID = "";
				if (CL.level >= CL.Max){
					sendID = CL.slist[CL.level-1]["parent"];
				}else{
					sendID = CL.slist[CL.level-1]["id"];
				}
				if (CL.More){
					CL.ajax.data="type=get&id="+ sendID + "&level="+CL.level+"&page=1&pagesize="+CL.Pagesize;
				}else{
					CL.ajax.data="type=get&id="+ sendID + "&level="+CL.level;
				}
				CL.ajax.send();
			}
		}
		return true;
	}

	//点击更多
	if (typeStr == "more"){
		var tempObj = CL.list[parentStr];
		if (tempObj["load"] == true) return;
		//判定是否启用ajax，没启用则判定分页和显示数量的情况
		CL.op = "more";
		if (CL.ajax == ""){
			//alert("len="+ tempObj.len + " nowpage="+ tempObj["page"]);
			if (tempObj.len > CL.Pagesize * tempObj["page"]){
				tempObj["page"]++;
				CL._refreshItem();
			}else{
				tempObj["load"] = true;
			}
		}else{
			CL._getAjaxData(parentStr);
		}
		return;
	}
	
	//点击普通选项
	if (typeStr == "click"){
		//设置slist的值，需要判定是替换操作还是添加操作
		if (CL.level <= CL.slist.length){
			//替换操作
			CL.slist[CL.level-1]["id"] = idStr;
			CL.slist[CL.level-1]["parent"] = parentStr;
			CL.slist[CL.level-1]["name"] = CL.list[parentStr]["list"][idStr];
		}else{
			//添加操作
			CL.slist.push({
				id: idStr,
				parent: parentStr,
				name: CL.list[parentStr]["list"][idStr]
			})
		}
		
		//判定是否层级超出限制，超出限制则不做操作
		if (CL.level >= CL.Max){
			CL._refreshValue();
			return;
		}else{
			if (CL.ajax == ""){
				if (CL.list[idStr]["len"] == 0){
				}else{
					CL.op = "click";
					CL.keyStr = "";
					CL.level++;
				}
				CL._refreshValue();
				CL._refreshItem();
			}else{
				//如果已经加载过，查看子元素是否为空，为空则仅刷新值显示，否则全部刷新
				if (CL.list[idStr]["load"]){
					if (CL.list[idStr]["len"] == 0){
						CL._refreshValue();
					}else{
						CL.op = "click";
						CL.keyStr = "";
						CL.level++;
						CL._refreshValue();
						CL._refreshItem();
					}
				}else{
					//如果未加载或者未加载完毕，则判定是否有子元素，有则先显示，否则才发送ajax请求
					if (CL.list[idStr]["len"] > 0){
						CL.op = "click";
						CL.level++;
						CL.keyStr = "";
						CL._refreshValue();
						CL._refreshItem();
					}else{
						CL.op = "click";
						CL.level++;
						CL._refreshValue();
						CL._getAjaxData(idStr);
					}
				}
			}
		}
		return;
	}
	
	//搜索事件
	if (typeStr == "search"){
		CL.op = "search";
		CL.keyStr = Obj;
		//判定是否启用ajax，没有启用，所有查找都进行本地查找
		if (CL.ajax == ""){
			CL._refreshItem();
		}else{
			//如果关键字为空 则刷新而不提交
			if (CL.keyStr == ""){
				CL._refreshItem();
			}else{
				if (CL.level > CL.slist.length){
					if (CL.slist.length == 0){
						parentStr =  "0";
					}else{
						parentStr = CL.slist[CL.slist.length-1]["id"];
					}
				}else{
					parentStr = CL.slist[CL.slist.length-1]["parent"];
				}
				//如果当前列表的加载已经完成，则刷新，否则提交ajax请求
				if (CL.list[parentStr]["load"]){
					CL._refreshItem();
				}else{
					CL._getAjaxData(parentStr);
				}
			}
		}
		return;
	}
}


//提交AJAX请求
levelSelection.prototype._getAjaxData = function(idStr){
	var CL = this;
	
	//点击更多按钮的情况
	if (CL.op == "more"){
		var tempObj = CL.list[idStr];
		var page = tempObj["page"];
		page++;
		var sendData = {
				type:"get",
				v_code:idStr,
				level:CL.level,
				page:page,
				pagesize:CL.Pagesize
		};
		
		//CL.ajax.data="type=get&id="+idStr + "&level="+CL.level+"&page="+page+"&pagesize="+CL.Pagesize;
		CL.ajax.data="params="+ json_encode(sendData);
		CL.ajax.send();
		return;
	}
	
	//点击普通选项
	if (CL.op == "click"){
		if (CL.More){
			var page = CL.list[idStr]["page"];
			if (CL.list[idStr]["len"] > 0){
				page++;
			}
			var sendData = {
					type:"get",
					v_code:idStr,
					level:CL.level,
					page:page,
					pagesize:CL.Pagesize
			};
			//CL.ajax.data="type=get&id="+idStr + "&level="+CL.level+"&page="+page+"&pagesize="+CL.Pagesize;
			CL.ajax.data="params="+ json_encode(sendData);
		}else{
			var sendData = {
					type:"get",
					v_code:idStr,
					level:CL.level
			};
			//CL.ajax.data="type=get&id="+idStr + "&level="+CL.level;
			CL.ajax.data="params="+ json_encode(sendData);
		}
		CL.ajax.send();
		return;
	}
	
	//点击搜索按钮
	if (CL.op == "search"){
		var sendData = {
				type:"search",
				v_code:idStr,
				level:CL.level,
				key:CL.keyStr
		};
		//CL.ajax.data="type=search&id="+ idStr + "&level="+CL.level+"&key="+CL.keyStr;
		CL.ajax.data="params="+ json_encode(sendData);
		CL.ajax.send();
		return;
	}
}


//获取数据
levelSelection.prototype._makeData = function(Obj, idStr, level){
	var CL = this;
	var parentStr, nameStr;
	//按当前填入的html进行数据获取
	if (CL.op == "init"){
		//添加根节点
		CL._addNode("0");
		var tempObj;
		var tempArray = CL.domItem.find("."+CL.clStr.item);
		for (var i=0; i<tempArray.length; i++){
			tempObj = $(tempArray[i]);
			idStr = tempObj.attr("value");
			nameStr = tempObj.text();
			parentStr = tempObj.attr("parent");
			CL._addNode(idStr, parentStr, nameStr);
			//判定是否启用分页
			if (!CL.More){
				//没有启用分页，判定当前是否启用ajax，如果没有启用，则设置对应的父的load加载完毕
				if (CL.ajax == ""){
					CL.list[parentStr]["load"] = true;
				}
			}
		}
		return true;
	}
	
	//其他情况
	if (CL.op == "click" || CL.op == "more" || CL.op == "search" || CL.op == "set"){
		var nowID, nowName, nowSub, nowPage, tempObj;
		if (level === undefined) level=0;
		for (var i=0; i<Obj.length; i++){
			tempObj = Obj[i];
			nowID = tempObj[CL.Field.id];
			if (CL.Field.name in tempObj){
				nowName = tempObj[CL.Field.name];
			}else{
				nowName = "";
			}
			//协调set操作的时候，父类别名称不存在CL.list中的情况，name可以问CL.slist要
			if (CL.op == "set" && idStr == undefined && nowName == ""){
				nowName = CL.slist[0]["name"];
			}
			if (CL.Field.sub in tempObj){
				nowSub = tempObj[CL.Field.sub];
				if (!("length" in nowSub) || nowSub.length<=0){
					nowSub = "";
				}else{
					if (!(CL.Field.id in nowSub[0])) nowSub="";
				}
			}else{
				nowSub = "";
			}
			if (CL.More && CL.Field.page in tempObj){
				nowPage = tempObj[CL.Field.page];
			}else{
				nowPage = "";
			}
			if (idStr === undefined){
				//如果此时由于分页的情况，顶级类别中没有改父类别节点信息，则parentStr默认为0
				if (!(nowID in CL.list)){
					parentStr = "0";
				}else{
					parentStr = CL.list[nowID]["parent"];
				}
			}else{
				parentStr = idStr;
			}
			//第一层递归，判定他下面是否有子类别，没有则设置其加载标志为true
			if (idStr === undefined){
				if (nowSub=="" || nowSub === undefined || !("length" in nowSub) || nowSub.length<=0){
					CL._addNode(nowID, parentStr, nowName, nowPage, 0);
				}else{
					CL._addNode(nowID, parentStr, nowName, nowPage, nowSub.length);
				}
			}else{
				if (nowSub=="" || nowSub === undefined || !("length" in nowSub)){
					CL._addNode(nowID, parentStr, nowName, nowPage);
				}else{
					CL._addNode(nowID, parentStr, nowName, nowPage, nowSub.length);
				}
			}
			//判定当前遍历层级是否大于限定
			if (nowSub=="" || nowSub === undefined || !("length" in nowSub) || nowSub.length<=0){
			}else{
				if (level+CL.level <= CL.Max){
					CL._makeData(nowSub, nowID, level+1);
				}
			}
		}
		//暂不考虑多选的情况--导致顶层递归的for循环大于1次，应对多选，显示和整体结构必须再优化
		//more操作不用考虑此
		if (idStr === undefined && CL.op == "click"){
			if (nowSub=="" || nowSub === undefined || !("length" in nowSub) || nowSub.length<=0){
				CL.level--;
				return false;
			}else{
				CL.keyStr="";
			}
		}
		return true;
	}
}








//添加数据节点
levelSelection.prototype._addNode = function(idStr, parentStr, nameStr, page, sublen){
	var CL = this;
	var tempObj;
	//添加节点需要做3件事情 
	//1.把该节点添加到他父节点索引中，并调整父节点的len
	//2.把该节点添加到this.list中 成为一个独立的父节点
	//3.判定是否有分页，有就调整分页信息
	//console.log(idStr,parentStr,nameStr,page,sublen);
	if (idStr == "0"){
		parentStr="", nameStr="";
	}
	//step1
	if (parentStr !== "" && (parentStr in CL.list)){
		tempObj = CL.list[parentStr];
		if (!(idStr in tempObj["list"])){
			tempObj["list"][idStr] = nameStr;
			tempObj["len"]++;
		}else{
			//如果存在，检查当前传递的name是否为空，不为空则修改对应的name值
			if (nameStr != "") tempObj["list"][idStr] = nameStr;
		}
	}
	//step2
	if (!(idStr in CL.list)){
		CL.list[idStr] = {
			parent: parentStr,
			load: false,
			len: 0,
			page: 1,
			list:{}
		};
	}
	//step3
	if (CL.More){
		if (page === undefined || page == ""){
		}else{
			CL.list[idStr]["page"] = page;
		}
	}
	//如果不是在查询操作下，每次分页服务端返回节点数据数量小于分页数，则表示当前页已经加载完毕，查询操作例外
	if (CL.op != "search"){
		if (sublen !== undefined && sublen < CL.Pagesize){
			CL.list[idStr]["load"] = true;
		}
	}
}










//显示数据
levelSelection.prototype._refreshItem = function(){
	var CL = this;
	var idStr="", nameStr="", parentStr="";
	var count=0, allcount=0;
	var htmlStr="", tempStr="", tempObj="";
	
	//获得需要显示项的父类别
	if (CL.slist.length == 0){
		parentStr = "0";
		idStr = "";
	}else{
		if (CL.level > CL.slist.length){
			parentStr = CL.slist[CL.slist.length-1]["id"];
			idStr = "";
		}else{
			parentStr = CL.slist[CL.level-1]["parent"];
			idStr = CL.slist[CL.level-1]["id"];
		}
	}
	tempObj = CL.list[parentStr];
	
	//如果未启用分页，循环页上限参照值为极大值
	if (CL.More == false){
		allcount = 10000;
	}else{
		if (CL.op == "search"){
			//如果是查询且ajax未空，循环页上限参照值为极大值
			if (CL.ajax == ""){
				allcount = 10000;
			}else{
				//查询，ajax不未空，但查询关键字为空，按当前量计算allcount值并设置page
				if (CL.keyStr == ""){
					tempObj["page"] = Math.ceil(tempObj["len"]/CL.Pagesize);
				}
				allcount = tempObj["len"];
			}
		}else{
			allcount = CL.Pagesize * CL.list[parentStr]["page"];
		}
	}
	
	for (var x in tempObj["list"]){
		count++;
		if (count > allcount) break;
		tempStr = CL.templateItem;
		var tempName = tempObj["list"][x];
		if (CL.keyStr != ""){
			if (tempName.indexOf(CL.keyStr)>=0){
				tempName = tempName.replace(CL.keyStr,"<strong>"+CL.keyStr+"</strong>");
				tempStr = tempStr.replace("{#id#}",x).replace("{#parent#}",parentStr).replace("{#name#}",tempName);
				if (idStr != "" && idStr == x){
					tempStr = tempStr.replace(CL.clStr.item, CL.clStr.item+" sel");
				}
			}else{
				tempStr = "";
			}
		}else{
			tempStr = tempStr.replace("{#id#}",x).replace("{#parent#}",parentStr).replace("{#name#}",tempName);
			if (idStr != "" && idStr == x){
				tempStr = tempStr.replace(CL.clStr.item, CL.clStr.item+" sel");
			}
		}
		htmlStr += tempStr;
	}
	
	if (CL.op == "search"){
		if (htmlStr == ""){
			htmlStr = '<span class="nodata">没有找到相关数据</span>';
		}
		//如果ajax标志不为空，且查询字符为空，则目前采取的是非贪婪算法，即服务端仅把查找到的结果返回，而不会一并返回所在父类下的所有数据，采用这种方法，必须保证原始分页信息不变，不能像非ajax的情况那样
		if (CL.ajax == ""){
			CL.list[parentStr]["load"] = true;
			CL.list[parentStr]["page"] = 100;
		}
	}
	
	if (CL.More){
		if (CL.list[parentStr]["load"] == false){
			//查询关键字为空，但没有加载成功标记，则显示更多按钮
			if (CL.keyStr == ""){
				//如果当前没有启用ajax,且总数量已经小于登录页面可显示数量，则不再显示更多按钮
				if (CL.ajax == "" && CL.list[parentStr].len <= CL.list[parentStr]["page"] * CL.Pagesize){	
				}else{
					var moreHtml = CL.templateItem;
					moreHtml = moreHtml.replace("{#name#}","更多...").replace("{#parent#}",parentStr).replace(CL.clStr.item,CL.clStr.item+" more");
					htmlStr += moreHtml;
				}
			}
		}
	}
	CL.domItem.html(htmlStr);
}
//显示值
levelSelection.prototype._refreshValue = function(){
	var CL = this;
	var htmlStr = "";
	var tempStr = "";
	for (var i=0; i<CL.slist.length; i++){
		var idStr = CL.slist[i]["id"];
		var parentID = CL.slist[i]["parent"];
		var tempObj = CL.list[parentID]["list"];
		tempStr = CL.templateValue;
		//tempStr = tempStr.replace("{#name#}", tempObj[idStr]);
		tempStr = tempStr.replace("{#name#}", CL.slist[i]["name"]);
		tempStr = tempStr.replace("{#level#}", i+1);
		htmlStr += tempStr;
	}
	//应对搜索框
	if (CL.domSearch && CL.keyStr == ""){
		CL.domRelation.val(CL.keyStr);
	}
	CL.domValue.html(htmlStr);
}



//AJAX成功
levelSelection.prototype._ajaxSuccess = function(data){
	//按当前应用，临时调整外框标识数据的索引名
	var CL = this;
	if (data.rspCode != CL.FlagOK){
		CL._ajaxError(data.rspCode, data.rspDesc);
		return;
	}
	
	if ("length" in data.rspData){
		if (data.rspData.length <0){
			alert(data.rspData.length);
			if (CL.keyStr != "") CL.op = "serach";
			if (CL.op == "click") CL.level--;
			CL._ajaxError("411", "获得的值是一个空数组");
			return;
		}else{
			//点击更多加载ajax成功调用
			if (CL.op == "more"){
				CL._makeData(data.rspData);
				CL._refreshItem();
				return;
			}
			//点击可选项加载ajax成功调用
			if (CL.op == "click"){
				if (CL._makeData(data.rspData)){
					CL._refreshValue();
					CL._refreshItem();
				}else{
				};
				return;
			}
			if (CL.op == "search"){
				CL._makeData(data.rspData);
				CL._refreshItem();
				return;
			}
			if (CL.op == "set"){
				CL._makeData(data.rspData);
				CL._refreshValue();
				CL._refreshItem();
				CL.setEdit(false);
				return;
			}
		}
	}else{
		if (CL.keyStr != "") CL.op = "serach";
		if (CL.op == "click") CL.level--;
		CL._ajaxError("411", "获得的值并不是一个数组对象");
		return;
	}
}
//AJAX调用失败
levelSelection.prototype._ajaxError = function(status, msg){
	var CL = this;
	if (CL.Err){
		CL.Err(status+" "+msg);
	}else if(CL.domErr != ""){
		CL.domErr.html(status+" "+msg).show(500);
		setTimeout(function(){
			CL.domErr.hide(500);
		},3000);
	}else if(CL.DEBUG){
		alert(status + " " + msg);
	}
}

//设定初始可见不可见
levelSelection.prototype.setEdit = function(flag){
	var CL = this;
	if (flag){
		CL.domItem.css("display","block");
		CL.domValue.find(".close").css("visibility","visible");
		if (CL.domSearch){
			CL.domSearch.css("display","block");
		}
	}else{
		CL.domItem.css("display","none");
		CL.domValue.find(".close").css("visibility","hidden");
		if (CL.domSearch){
			CL.domSearch.css("display","none");
		}
	}
}

//获得当前值
//返回 当前的类中selectObj数组中的某个元素或者这些元素的数组组合，或者空字符，跟参数传递和实际数值相关
//参数 level
//    -未定义，获得selectObj的数组，这个数组中的元素是传址对象，如果当前未选中任何项，则返回空字符
//    -first   获得selectObj数组中的第一个元素，如果当前未选中任何项，则返回空字符
//    -last    获得selectObj数组中的最后一个元素，如果当前未选中任何项，则返回空字符
//    -具体数字 获得selectObj数组中指定位置的一个元素，如果指定位置不存在则返回空字符
levelSelection.prototype.getValue = function(level){
	var CL = this;
	switch(level){
		case undefined:
			if (CL.slist.length <= 0) return "";
			return CL.slist;
		case "first":
			if (CL.slist.length == 0) return "";
			return CL.slist[0];
		case "last":
			if (CL.slist.length == 0) return "";
			return CL.slist[CL.slist.length-1];
		default:
			if (isNaN(level-0)) return "";
			level = level - 0;
			if (level<0 || level > CL.slist.length-1) return "";
			return CL.slist[level];
			
	}
}