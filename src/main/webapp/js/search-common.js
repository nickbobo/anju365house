//初期加载 加载业务类型
var relationTemplate = "";
var a = 0;
$(function() {
    //获取查询条件下拉框的显示模板
    var tempObj = $(".erp_tab .templateStr").eq(0);
    if (tempObj.length > 0) {
        var tempStr = tempObj.prop("outerHTML");
        if (tempStr) {
            relationTemplate = tempStr;
            relationTemplate = relationTemplate.replace(" class=\"templateStr\"", "");
        }
        tempObj.remove();
    }
    $('#catg_code').combobox({
        valueField: 'key',
        textField: 'value',
        enitable: true,
        onSelect: function() {
            $(".erp_tab li").eq(0).nextAll("li:not([static])").remove();
            getPropertyValue();
            if (1 == a) {
            	//searchPrdGrant();
               $("#dg").datagrid("service").query();
            }

        },
        onLoadSuccess: function(data) {
            if (data.length > 0) {
                $(this).combobox('select', data[0].key);
                a = 1;
            } else {
                $(this).combobox('select', []);
            }
        }

    });

    var service = $.svc.getSVC("/searchTerm/getBizType");
    service.call(function(response, status) {
        if (response.isSucc()) {
            if (response.getResult().length == '0') {
                $('#catg_code').combobox("loadData", []);
            } else {
                $('#catg_code').combobox("loadData", response.getResult());
            }
        } else {
            $.messager.alert("提示信息", response.message, "error");
        }
    });
});

//根据业务类型加载属性及属性值
function getPropertyValue() {
    var catg_code = $('#catg_code').combobox("getValue");
    var service = $.svc.getSVC("/searchTerm/getPropertyValue");
    service.setParam("catg_code", catg_code);
    service.call(function(response, status) {
        if (response.isSucc()) {
            var rows = response.getResult();
            var str = "";
            for (i = 0; i < rows.PropertyType.length; i++) {
                var tempHtml = relationTemplate;
                	tempHtml = tempHtml.replace("{#name#}", rows.PropertyType[i].elem_name);
                	 tempHtml = tempHtml.replace("{#id#}", rows.PropertyType[i].elem_code);
                	 tempHtml = tempHtml.replace("{#names#}", rows.PropertyType[i].elem_code);
                str += tempHtml;	 
            }
            $('.erp_tab li').eq(0).after(str);

            for (i = 0; i < rows.PropertyType.length; i++) {
                if (rows.PropertyType[i].is_tree == '0') {
                    $('#' + rows.PropertyType[i].elem_code + "").combobox({
                        valueField: 'key',
                        textField: 'value',
                        enitable: true,
                        onLoadSuccess: function(data) {
                            if (data.length > 0) {
                                $(this).combobox('select', data[0].key);
                            } else {
                                $(this).combobox('select', []);
                            }
                        }

                    });
                    rows[rows.PropertyType[i].elem_code].unshift({
                        "key": "",
                        "value": "全部"
                    });
                    $('#' + rows.PropertyType[i].elem_code + "").combobox('loadData', rows[rows.PropertyType[i].elem_code]);
                } else {
                	  rows[rows.PropertyType[i].elem_code].unshift({
                          "key": "",
                          "value": "全部",
                          "pkey":""
                      });
                	var result =  rows[rows.PropertyType[i].elem_code];
					var select = regionSelect(result, {jqObj:$("input[id='"+rows.PropertyType[i].elem_code+"']"),width:"100px",id:rows.PropertyType[i].elem_code });
					}

            }
        } else {
            $.messager.alert("提示信息", response.message, "error");
        }
    });

}

function converttree(rows) {

    function exists(rows, pkey) {
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].key == pkey) return true;
        }
        return false;
    }

    var nodes = [];
    // 得到顶层节点  
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (!exists(rows, row.pkey)) {
            nodes.push({
                id: row.key,
                text: row.value,
                state: "open",
                iconCls: "",
                animate: true
            });
        }
    }

    var toDo = [];
    for (var i = 0; i < nodes.length; i++) {
        toDo.push(nodes[i]);
    }
    for (j = 0; j < rows.length; j++) {
        var node = toDo.shift(); // 父节点   
        // 得到子节点   
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (row.pkey == node.id) {
                var child = {
                    id: row.key,
                    text: row.value
                };
                if (node.children) {
                    node.children.push(child);
                } else {
                    node.children = [child];
                }
                toDo.push(child);
            }
        }
    }
    return nodes;
}
//页面查询时调用    用来传查询条件的值
function getSearchValue() {
    var input_id = $(".erp_list_input");
    var map = {};
    for (i = 0; i < input_id.length; i++) {
        map[$(input_id[i]).find("input").attr("id")] = $('#' + input_id.eq(i).find("input").attr("id")).textbox("getValue");
    }
    return map;

}

function regionSelect(data, option){
	var defaultOption = {width:"25px",panelHeight:"200px", jqObj:{}};
	var option = $.extend({}, defaultOption, option);
	var bindFunc = function(){tb.close();console.log()}//绑定事件
	var dataGroup = {};//分组数据
	var attrs = {};//属性值
	$(option.jqObj).each(function() {
	  $.each(this.attributes, function() {
		if(this.specified) {
			attrs[this.name] = this.value;
		}
	  });
	});	
	var jqObj = option.jqObj.parent();
	option.jqObj.remove();//移除Obj
	
	//设置jq
	var root = {
		init:function(){
			jqObj.click(function(){return false;})	
		}

	}
	root.init();
	

	//地区分组
	for(var i=0; i<data.length; i++){
		var obj = data[i];
		var arr = (obj.pkey in dataGroup)?dataGroup[obj.pkey]:[];
		arr.push(obj);
		
		dataGroup[obj.pkey] = arr;
	}
	
	
	
	var tb = new regionTextBox({
		attrs:attrs,
		className:"tb", 
		parent:jqObj, 
		options:{
			width:option["width"], 
			icons:[{
				iconCls:"combo-arrow",
				iconAlign:"right",
				handler:function(){
					if(tb.isOpen)
						tb.close();
					else
						tb.open();
				}
			}],
			open:function(){
				$(document).one("click", bindFunc);//添加点击屏蔽

				var selectObject = tb.getSelect();//获取选中
				var path = selectObject["path"];//选中路径数组
				var targetKey = selectObject["key"];//选中值
				var createdPanels = panels.createdPanels;//已创建的面板
				
				for(var i=0;i <path.length; i++){
					var panelIndex = i;
					var groupKey = path[i];
					
					var  panel = panels.createdPanels[panelIndex];
					panel.show();
					panel.loadData(dataGroup[groupKey]);//加载数据
					panel.clearDetailRow();//清除高亮行
					
					if(i+1 < path.length){
						var selectKey = path[i+1];
						panel.detailRow(selectKey);//设置高亮行
					}
				}
				
				var lastPanel = panels.createdPanels[path.length-1];
				lastPanel.select(targetKey, true);//设置选中
			},
			close:function(){
				$(document).unbind("click", bindFunc);//移除点击屏蔽
				panels.hide();//关闭所有面板
			}
		}
	});

	var panels = {
		options:{},//传入数据
		createdPanels:{},//已创建面板
		/*options 
			dataGroup,jqObj*/
		init:function(options){
			this.options = options;
		},
		/**
		groupKey 面板组键值
		level    面板层级
		title    面板标题
		*/
		createPanel:function(groupKey, level, title){
			var options = this.options
			var dataGroup = options.dataGroup;
			var jqObj = options.jqObj;
			var width = options.width;
			var height = options.height;
			
			var createdPanels = this.createdPanels;

			
			var list = new regionList({
				offsetJq:jqObj,
				tbJq:tb.getJq(),
				level:level,
				className:"region-list", 
				parent:$("body"), 
				options:{
					textFormatter:function(value, row, index){
						var key = row["key"];
						var value = row["value"]
						var haveDetail = key.length>0 && key in dataGroup;//key不是空字符串，且不在分组键值里,则显示详细
						
						return '<div>' + value + (haveDetail?'<span class="detail" style="position:absolute;right:0">详细</span>':'') + '</div>'
					},
					onBeforeSelect:function(index, row){
						if(list.isJsSelect)
							list.isJsSelect = false;//js代码触发的选择
						else return false;
					},
					width:width,
					height:height
				}
			});	
			list.setGroupKey(groupKey);//设置组号
			if(title)list.setTitle(title);//设置标题
			list.loadData(dataGroup[groupKey]);	//加载数据
			
			list.getPanel().click(function(event){
				var target = $(event.target);
				var index = parseInt(target.parents(".datagrid-row").attr("datagrid-row-index"));//行值
				
				if(!isNaN(index)){
					//点击数据行区域
					var listData = list.getData();//所有数据行
					var row = listData[index];//数据行
					
					if(target.hasClass("detail")){
						var targetChildGroupKey = row["key"];//子列表键值
						var targetChildLevel = level + 1;//子列表层级
						var childList = panels.createdPanels[targetChildLevel];//获取子列表
						if(!childList){childList = panels.createPanel(targetChildGroupKey, targetChildLevel, row["value"]);}//创建子列表
						
						var curChildGroupKey = childList.getGroupKey();//子列表当前键值
						if(childList.visiable && targetChildGroupKey == curChildGroupKey){
							//同一面板数据
							panels.hide(level + 1);//level + 1层后的隐藏
							
							list.clearDetailRow();//清除详细选中
						}else if(childList.visiable && targetChildGroupKey != curChildGroupKey){
							//不同面板数据
							childList.setGroupKey(targetChildGroupKey);
							childList.setTitle(row["value"]);
							childList.loadData(dataGroup[targetChildGroupKey]);	//重新加载
							
							panels.hide(level + 2);//level + 2层之后的隐藏
							
							list.detailRow(targetChildGroupKey);//设置详细选中
						}else if(!childList.visiable && targetChildGroupKey == curChildGroupKey){
							childList.show();
							childList.clearDetailRow();//消除子级详细状态
							list.detailRow(targetChildGroupKey);//设置详细选中
							
						}else if(!childList.visiable && targetChildGroupKey != curChildGroupKey){
							childList.show();
							childList.setGroupKey(targetChildGroupKey);//子级重新加载数据
							childList.setTitle(row["value"]);
							childList.loadData(dataGroup[targetChildGroupKey]);

							list.detailRow(targetChildGroupKey);//设置详细	
						}
						
						//设置选中
						var selectObj = tb.getSelect();
						var pathArray = selectObj["path"];
						if(pathArray[pathArray.length - 1] == targetChildGroupKey)childList.select(selectObj["key"], true)//选中
					}else{//选中项
						var path = panels.getPath(level);
						tb.setSelect({key:row["key"], value:row["value"],  path:path})//记录路径和选中值
						tb.close();//点击事件中控制关闭
						
					}
				}
				
				return false;
			});
			
			this.createdPanels[level] = list;//保存生成面板
			list.hide();//隐藏面板
			return list;
		},
		//隐藏level(包含level)及以后的面板
		hide:function(level){
			var createdPanels = this.createdPanels;
			level = level || 0;
			for(var key in this.createdPanels){
				var panel = createdPanels[key]
				if(key >= level)panel.hide();
			}
		},
		//获取路径,level之前包括level的面板选择路径
		getPath:function(level){
			var createdPanels = this.createdPanels;
			var levelArray = [];
			for(var key in createdPanels){
				if(key <= level){
					var panel = createdPanels[key];
					levelArray.push(panel.getGroupKey());//获取面板的组键值，并保存
				}
				
			}
			return levelArray;
		}
	}
	
	//初始化多面板参数
	panels.init({jqObj:jqObj, dataGroup:dataGroup, width:parseInt(option["width"]), height:parseInt(option["panelHeight"])});
	//创建第一个面板
	panels.createPanel("", 0);
	
	//默认选中第一个
	var row = dataGroup[""][0];
	tb.setSelect({key:row["key"], value:row["value"], path:[""]})

	return{
		getKey:function(){
			return tb.getSelect()["key"];
		},
		getText:function(){
			return tb.getSelect()["value"];
		}
	}
}

function regionList(options){
	//createList创建列表页对象
	var createList = function(className, parent, options){
		var defaultOptions = {checkbox:false,lines:true,valueField:"key",textField:"value",height:200};
		var jq = $('<div class="' + className + '"></div>');
		
		options = $.extend({}, defaultOptions, options)
		parent.append(jq);
		
		jq.datalist(options);
	
		return jq;
	}
	
	$.extend(true, this, options);
	this.jq = createList(options["className"], options["parent"], options["options"]);
	this.isJsSelect = false;
	//面板是否可见
	this.visiable = true;
	//详细展开选中色
	this.detailSelectColor = "#ff0000";
	
}
regionList.prototype = {
	constructor:regionList,
	//位置重定位
	resetLocation:function(object){
		var tbJq = this.tbJq;
		var tbWidth = tbJq.textbox("options").width;
		var tbHeight = tbJq.siblings(".textbox").outerHeight();
		var level = this.level;
		var offsetJq = this.offsetJq;
		var offset = offsetJq.offset();
		var rightOffset = ($(window).width() - (offset.left + offsetJq.outerWidth()));
		var leftOffset = offset.left;
		var layout = rightOffset > leftOffset?"right":"left";	
		
		var dataList = this.getPanel();
		dataList.css({position:"absolute",top:0,left:0,"z-index":10000001});			
		switch(layout){
			case "left":
				dataList.offset({left:offset.left - tbWidth * level, top:offset.top + tbHeight});
				break;
			case "right":
				dataList.offset({left:offset.left + tbWidth * level, top:offset.top + tbHeight});
				break;
		}		
	},
	//获取Jq
	getJq:function(){
		return this.jq;
	},
	//获取面板
	getPanel:function(){
		return $(this.jq.parents(".panel").get(0));
	},
	//隐藏
	hide:function(){
		this.getPanel().hide();
		this.visiable = false;
	},
	//显示
	show:function(){
		this.resetLocation();
		this.getPanel().show();
		this.visiable = true;
	},
	//设置组键值
	setGroupKey:function(key){
		this.groupKey = key;
	},
	//获取组键值
	getGroupKey:function(){
		return this.groupKey;
	},
	//加载数据
	loadData:function(data){
		this.jq.datalist("loadData", data);
	},
	//获取所有数据
	getData:function(){
		return this.jq.datalist("getData")["rows"];
	},
	//设置标题
	setTitle:function(title){
		this.jq.datalist({title:title});	
	},
	//按键值选中某项
	select:function(key, closable){
		var targetIndex = this.getIndexbyKey(key);
		if(targetIndex >= 0){
			this.isJsSelect = closable || false;
			this.jq.datalist("selectRow", targetIndex);
		}	
	},
	//如果未找到返回-1
	getIndexbyKey:function(key){
		var data = this.getData();
		var targetIndex = -1;
		$(data).each(function(index, obj){if(obj["key"] == key)targetIndex = index;})
		
		return targetIndex;
	},
	//滚动到键值指定行
	scrollTo:function(key){
		var index = this.getIndexbyKey(key);
		this.jq.datalist("scrollTo", index);
	},
	//高亮键值指定的行
	detailRow:function(key){
		this.clearDetailRow();
		var index = this.getIndexbyKey(key);
		this.getPanel().find("tr[datagrid-row-index="+index+"]").css("color", this.detailSelectColor);
		this.getPanel().find("tr[datagrid-row-index="+index+"]").addClass("detail-select");
	},
	//取消高亮
	clearDetailRow:function(){
		this.getPanel().find(".detail-select").css("color", "#000");
		this.getPanel().find(".detail-select").removeClass("detail-select");
	}
}		

function regionTextBox(options){
	var create = function(attrs, parent, options){
		var jq = $("<input />");
		for(var key in attrs){jq.attr(key, attrs[key])}
		parent.append(jq);
		var defaultOptions = {}
		var options = $.extend({}, defaultOptions, options);

		//文本框
		jq.textbox(options);				
		return jq;
	}
	this.options = options.options;
	this.jq = create(options["attrs"], options["parent"], options["options"]);
	this.groupKey = null;
	this.isOpen = false;
	
}		
regionTextBox.prototype = {
	constructor:regionTextBox,
	getJq:function(){return this.jq;},
	//设置选中键,值,面板路径
	setSelect:function(obj){
		this.jq.textbox("setValue", obj["key"]);
		this.jq.textbox("setText", obj["value"]);
		this.path = obj.path;
	},
	//获取选中键,值,面板路径
	getSelect:function(){
		return {key:this.jq.textbox("getValue"), value:this.jq.textbox("getText"), path:this.path}
	},
	open:function(){
		this.isOpen = true;
		this.options.open()
	},
	close:function(){
		this.isOpen = false;
		this.options.close()
	}
}