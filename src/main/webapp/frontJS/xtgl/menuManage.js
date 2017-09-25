function isArray(o){
	return Object.prototype.toString.call(o)=='[object Array]';
}
/**数组根据数组对象中的某个属性值进行排序的方法 
 * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
 * @param attr 排序的属性 如number属性
 * @param rev true表示升序排列，false降序排序
 * */
function sortBy(attr,rev){
    //第二个参数没有传递 默认升序排列
    if(rev ==  undefined){
        rev = 1;
    }else{
        rev = (rev) ? 1 : -1;
    }
    
    return function(a,b){
        a = a[attr];
        b = b[attr];
        if(a < b){
            return rev * -1;
        }
        if(a > b){
            return rev * 1;
        }
        return 0;
    }
}

$(function(){
	/*定义json数据*/
    var _data = [
        {
       	 id:'',name:'根目录（/）',num:0,children:[
               
       	 ]
        }

    ];
	/* obtain data */
	$.ajax({
		url:'../../menu/getMenuInfo.svc',
		type:'POST',
		data:JSON.stringify({}),
		success:function(data){
			if(data.succ){
				var _a = data.result;
				if(isArray(_a)){
					for(var i=0;i<_a.length;i++){
						if(_a[i].id == -1){
							console.log(_a[i])
							_data[0].id = _a[i].id;
							_data[0].num = _a[i].num;
						}
						if(_a[i].id.length == 2 && _a[i].id != -1){
							_data[0].children.push(_a[i]);
						}
					}
					
					//获取所有的一级菜单
					var toDo = [];
					for (var i = 0; i < _data[0].children.length; i++) {
						toDo.push(_data[0].children[i]);
					}
					toDo.sort(sortBy('sortIndex'));
					//获取当前菜单下的所有子菜单
					function render(rows,pId){
						var _list = [];
						for(var i=0;i<rows.length;i++){
							if(rows[i].parentCode == pId){
								rows[i].children = render(rows,rows[i].id);
								_list.push(rows[i]);
							}
						}
						_list.sort(sortBy('sortIndex'));
						return _list;
					}
					//获取一级菜单下的所有子菜单
					for(var i = 0;i<toDo.length;i++){
						toDo[i].children = render(_a,toDo[i].id);
					}
					
					_data[0].children.sort(sortBy('sortIndex'));
					/*初始化*/
				     $.fn.zTree.init($("#tree"), {
				         check:{
				             enable: false,
				             chkStyle: "checkbox"
				         },
				         callback: {
				             onClick:function(event, treeId, treeNode){
				            	 $('#add-err').text('').fadeOut(300);
				            	 if(treeNode.id.length >= 6){
				            		 $('#add-err').text('仅限添加到第三级菜单，谢谢~').fadeIn(300);
				            		 return false;
				            	 }
				            	 var _menuLevel = ['一','二','三','四','五','六','七','八','九','十'];
				            	 
				            	 
			            		 var _menuCode = treeNode.num + 1;
			                	 $('#sortIndex').val(_menuCode);
			                	 if(_menuCode < 10){
			                		 _menuCode = '0'+ _menuCode;
			                	 }
		                		 $('#parentCode').val(treeNode.id);
			                	 if(treeNode.id == -1){
			                		 $('#menuCode').val(_menuCode);
			                		 $('#menuLevel').attr('data-level',1).val(_menuLevel[0]+'级菜单');
			                	 }else{
			                		 $('#menuCode').val(treeNode.id+_menuCode);
			                		 $('#menuLevel').attr('data-level',parseInt(treeNode.id.length)/2+1).val(_menuLevel[parseInt(treeNode.id.length)/2]+'级菜单');
			                	 }
			            	 
				             }
				         }
				     }, _data);
				     var treeObj = $.fn.zTree.getZTreeObj("tree");
				     treeObj.expandAll(true);
				}
			}else{
				$('#search-err').text(data.message).fadeIn(300);
			}
		},
		error:function(){
			$('#search-err').text('菜单查询失败，请重新尝试，或联系技术人员处理！谢谢~').fadeIn(300);
		}
	});
     
     
 });


function openPop(){
    
    $('#dialog-cover').show();
    $('#dialogMakeTrue').show();
    $('#dialogMakeTrue').css({
        'top':($(window).height()-$('#dialogMakeTrue').height())/2,
        'left':($(window).width()-$('#dialogMakeTrue').width())/2
    });

}
$(function(){
	
	//取消按钮点击处理
	$('#cancel-btn').on('click',function(){
		window.location.reload();
	});
	//保存按钮点击处理
	$('#save-btn').on('click',function(){
		if($.trim($('#chName').val()) == '' || $.trim($('#chName').val()) == null){
			$('#add-err').text('菜单名称不能为空').fadeIn(300);
			return false;
		}
		if(!(/^[\u4E00-\u9FFF\u3400-\u4DFF]+$/.test($.trim($('#chName').val())))){
			$('#add-err').text('菜单名称格式不正确（只能输入中文）').fadeIn(300);
			return false;
		}
		
		$.ajax({
			url:'../../menu/saveOrUpdate.svc',
			type:'POST',
			data:JSON.stringify({
				menu:{
					id:'',
					chName:$.trim($('#chName').val()),
					parentCode:$('#parentCode').val(),
					menuCode:$('#menuCode').val(),
					menuLevel:$('#menuLevel').attr('data-level'),
					sortIndex:$('#sortIndex').val(),
					menuUrl:$('#menuUrl').val()
				}
			}),
			success:function(data){
				if(data.succ){
					//打开系统提示框
					openPop();
				}else{
					$('#add-err').text(data.message).fadeIn(300);
				}
			},
			error:function(){
				$('#add-err').text('菜单保存失败，请重新尝试，或联系技术人员处理！谢谢~').fadeIn(300);
			}
		});
	});
	
	//错误提示信息初始化
	$('.err-tip').text('').fadeOut(300);
	$('.add-container').on('click',function(){
		$('#add-err').text('').fadeOut(300);
	});
	
});


