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
//获得url中的get参数
//name 需要获得参数的名称
function GetQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r!=null)return decodeURIComponent(r[2]); 
  return null;
}
//获取用户code
var _roleCode = GetQueryString('roleCode');

$(function(){
	
	/*定义json数据*/
	//所有的菜单数据
	var _allData = [];
    var _data = [
        {
       	 id:'',name:'根目录（/）',children:[
               
       	 ]
        }

    ];
	/* obtain data */
	$.ajax({
		url:'../../authority/getUnSetMenuInfo.svc ',
		type:'POST',
		data:JSON.stringify({
			roleCode:_roleCode
		}),
		success:function(data){
			if(data.succ){
				
				var _a = data.result;
				if(isArray(_a)){
					
					if(_a.length != 0){
						
						_allData = _a;
						
						for(var i=0;i<_a.length;i++){
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
									
									
									if(rows[i].children.length != 0 || (rows[i].menuUrl !='' && rows[i].menuUrl !=null)){/*url*/
										_list.push(rows[i]);
									}/*url*/
									
									
								}
							}
							_list.sort(sortBy('sortIndex'));
							return _list;
						}
						//获取一级菜单下的所有子菜单
						for(var i = 0;i<toDo.length;i++){
							toDo[i].children = render(_a,toDo[i].id);
						}
						
						
						var _tmpRoot = [];/*url*/
						for(var i=0;i<_data[0].children.length;i++){/*url*/
							if(_data[0].children[i].children.length != 0 || (_data[0].children[i].menuUrl !='' && _data[0].children[i].menuUrl !=null)){/*url*/
								_tmpRoot.push(_data[0].children[i]);/*url*/
							}/*url*/
						}/*url*/
						_data[0].children = _tmpRoot;/*url*/
						
						
						_data[0].children.sort(sortBy('sortIndex'));
						/*初始化*/
					     $.fn.zTree.init($("#tree"), {
					         check:{
					             enable: true,
					             chkStyle: "checkbox"
					         },
					         callback: {
					             onCheck:function(event, treeId, treeNode){
					            	
					             }
					         }
					     }, _data);
					     var treeObj = $.fn.zTree.getZTreeObj("tree");
					     treeObj.expandAll(true);
					}else{
						$('#search-err').text('暂无可供配置的菜单').fadeIn(300);
					}
					
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
		 var treeObj=$.fn.zTree.getZTreeObj("tree");
		 if(treeObj){
			 var nodes=treeObj.getCheckedNodes(true);
		 }
         
         var _allMenu = [];
         if(isArray(nodes)){
        	 if(nodes.length != 0){
            	 for(var i=0;i<nodes.length;i++){
                	 if(nodes[i].children.length == 0){
                		 if(nodes[i].id){
                    		 _allMenu.push(nodes[i].id);
                		 }
                	 }
                 }
             }
         }
         
         if(_allMenu.length == 0){
        	 $('#add-err').text('尚未勾选菜单，请勾选您需要配置的菜单~').fadeIn(300);
        	 return false;
         }
         
         //保存菜单配置
         $.ajax({
 			url:'../../authority/addRoleMenu.svc',
 			type:'POST',
 			data:JSON.stringify({
 				roleCode:_roleCode,
 				menuCode:_allMenu.join(',')
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
 				$('#add-err').text('菜单配置保存失败，请重新尝试，或联系技术人员处理！谢谢~').fadeIn(300);
 			}
 		});
	});
	
	//错误提示信息初始化
	$('.err-tip').text('').fadeOut(300);
	$('.add-container , .ztree-container').on('click',function(){
		$('#add-err').text('').fadeOut(300);
	});
	
});


