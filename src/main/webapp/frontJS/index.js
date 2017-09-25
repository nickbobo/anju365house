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
//刷新iframe页面内容
function refreshIframe(url){
	url = url ? url : 'welcome.html';
	$('#iframe').html('<iframe name="myIframe" src="'+url+'" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes"></iframe>');
}

var app = angular.module("indexApp", []);
app.controller("menuCtrl", function($scope){
	
	$scope.dataModel = {
		allMenu:[],	//所有所属当期那登录用户的菜单集合
		menu:[],	//一级菜单数据
		menuChild:[],	//子级菜单数据
	};
	
	$scope.state = {
		errShow:false,	//菜单错误显示隐藏，默认隐藏
		errMsg:''			//错误信息提示内容
	};

	$scope.ui = {
		logout:function(){
			if (!confirm("即将退出系统,是否继续!")) {
	            return;
	        }
	        // $.ajax({
	        //     type: 'post',
	        //     url: ctx + '/logout.do',
	        //     cache: false,
	        //     dataType: 'json',
	        //     async: false
	        // });
	        window.location.href = '../login/logout.svc';
		},
		firstShow:function(){
			if($scope.dataModel.menu[0]){
				$scope.dataModel.menuChild = $scope.dataModel.menu[0].children;
				$scope.dataModel.menu[0].checked = true;
			}else{
				$scope.dataModel.menuChild = [];
			}
		},
		//一级菜单点击
		menuClick0:function(item){
			//初始化页-指向欢迎页
			refreshIframe('welcome.html');
			
			if(item.children.length == 0){
				refreshIframe(item.menuUrl);
			}
			
			for(var i=0;i<$scope.dataModel.menu.length;i++){
				$scope.dataModel.menu[i].checked = false;
			}
			
			item.checked = item.checked ? false : true;
			
			$scope.dataModel.menuChild = item.children;
			
			for(var i=0;i<$scope.dataModel.menuChild.length;i++){
				$scope.dataModel.menuChild[i].checked = false;
			}
		},
		menuClick1:function(item){
			if(item.children.length == 0){
				refreshIframe(item.menuUrl);
			}
			
			for(var i=0;i<$scope.dataModel.menuChild.length;i++){
				$scope.dataModel.menuChild[i].checked = false;
			}
			item.checked = item.checked ? false : true;
		},
		menuClick2:function(subItem){
			if(subItem.children.length == 0){
				refreshIframe(subItem.menuUrl);
			}
		},
		removeMenu:function(item){
			
			var _tmp = [];
			for(var i=0;i<$scope.dataModel.menu.length;i++){
				if($scope.dataModel.menu[i].id != item.id){
					_tmp.push($scope.dataModel.menu[i])
				}
			}
			$scope.dataModel.menu = _tmp;
			
			if(item.checked){
				$scope.ui.firstShow();
			}
			
			if($scope.dataModel.menu.length == 0){
				$('#menu-err').text('菜单暂无，请刷新页面重置！谢谢~').fadeIn(300);
			}
		}
	};
	
	/* obtain data */
	$.ajax({
		url:'../userService/getUserInfo.svc',
		type:'POST',
		data:JSON.stringify({}),
		success:function(data){
				if(data.succ){
					/* 用户登录信息处理 */
					$('#userName').text(data.result.userName);
					
					var _a = data.result.obj;
					
					for(var i=0;i<_a.length;i++){
						_a[i].checked = false;
					}
					
					if(isArray(_a)){
						if(_a.length != 0){
							
							var _menuData = [];
							for(var i=0;i<_a.length;i++){
								$scope.dataModel.allMenu.push(_a[i]);
								
								if(_a[i].id.length == 2 && _a[i].id != -1){
									_menuData.push(_a[i]);
								}
							}
							//获取当前菜单下的所有子菜单
							function render(rows,pId){
								var _list = [];
								for(var i=0;i<rows.length;i++){
									if(rows[i].parentCode == pId){
										rows[i].children = render(rows,rows[i].id);
										_list.push(rows[i]);
									}
								}
								return _list;
							}
							//获取一级菜单下的所有子菜单
							for(var i = 0;i<_menuData.length;i++){
								_menuData[i].children = render(_a,_menuData[i].id);
							}
							$scope.$apply(function(){
									
								_menuData.sort(sortBy('sortIndex'));
								$scope.dataModel.menu = _menuData;
								$scope.ui.firstShow();
	
							});
						}
					}
					
				}else{
					$('#menu-err').text(data.message).fadeIn(300);
				}
		},
		error:function(){
			$('#menu-err').text('菜单查询失败，请重新尝试，或联系技术人员处理！谢谢~').fadeIn(300);
		}
	});
	

});