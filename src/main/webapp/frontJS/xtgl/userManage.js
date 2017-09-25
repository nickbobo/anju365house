var app = angular.module("userManageApp", []);
app.controller("userManageCtrl", function($scope){

	$scope.tools = {
		//获得url中的get参数
		//name 需要获得参数的名称
		GetQueryString:function(name){
		  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		  var r = window.location.search.substr(1).match(reg);
		  if (r!=null)return decodeURIComponent(r[2]); 
		  return null;
		},
        getRandomNum:function(Min,Max){    //随机数生成
            var Range = Max - Min;   
            var Rand = Math.random();   
            return(Min + Math.round(Rand * Range)); 
        }
	};

	$scope.state = {
		isShowInit:true,	//默认初始化
		isShowLook:false,	//查看状态默认隐藏
		isShowModify:false,	//修改状态默认隐藏
		errTip:'',			//错误提示信息
	};
	
	$scope.pattern = {
		name:/^[\·\u4E00-\u9FFF\u3400-\u4DFF]+$/,	//仅仅允许输入中文和英文半角“·”
		loginName:/^[a-zA-Z0-9_-]+$/,				//允许“英文、数字、下划线、减号”
		password:/^[a-zA-Z]\w{5,17}$/,				//以字母开头，长度在6-18之间，只能包含字符、数字和下划线
	};

	//初始化数据字典
	$scope.dictionary = {
		roleCodeData:[],
		orgCodeData:[]
	};
	
	//加载用户角色和所属公司字典数据
	//获取用户所属角色字典
	$.ajax({
		url:'../../userService/getRoleInfo.svc',
		type:'POST',
		data:JSON.stringify({}),
		success:function(data){

			$scope.$apply(function(){
				if(data.succ){
					
					$scope.dictionary.roleCodeData = data.result;
					
				}else{
					$scope.state.errTip = data.message;
				}
			});
		},
		error:function(){
			$scope.state.errTip = '获取用户所属角色字典数据失败，请重新尝试，或联系技术人员处理！谢谢~';
		}
	});
	//获取用户所属公司字典
	$.ajax({
		url:'../../userService/getCompanyInfo.svc',
		type:'POST',
		data:JSON.stringify({}),
		success:function(data){

			$scope.$apply(function(){
				if(data.succ){
					
					$scope.dictionary.orgCodeData = data.result;
					
				}else{
					$scope.state.errTip = data.message;
				}
			});
		},
		error:function(){
			$scope.state.errTip = '获取用户所属公司字典数据失败，请重新尝试，或联系技术人员处理！谢谢~';
		}
	});

	$scope.dataModel = {
		
		userCode:'',	//用户登录名
		userName:'',	//用户名称
		password:'',	//用户密码
		roleCode:'',	//用户角色
		orgCode:'',		//用户所属公司
		idNumber:'',	//证件号码
		
		userStatus:'',	//用户状态
		isLock:'',		//是否锁
		userMemo:'',	//备注信息
		
		createName:'',	//创建人
		createDate:'',	//创建时间
		updateName:'',	//修改人
		updateDate:'',	//修改时间

	};


	//操作事件处理
	$scope.ui = {
		//刷新
		refresh:function(){
			window.location.reload();
		},
		//初始化错误提示信息
		initErr:function(){
			//从初始化错误提示
			$scope.state.errTip = '';
		},
		//保存
		save:function(){
			
			if($scope.baseForm.userCode.$error.required){
				$scope.state.errTip = '用户登录名不能为空！';
				return false;
			}
			if($scope.baseForm.userCode.$error.pattern){
				$scope.state.errTip = '用户登录名格式不正确（只能输入英文、数字、下划线、减号）！';
				return false;
			}
			
			if($scope.baseForm.userName.$error.required){
				$scope.state.errTip = '用户名称不能为空！';
				return false;
			}
			if($scope.baseForm.userName.$error.pattern){
				$scope.state.errTip = '用户名称格式不正确（只能输入中文和英文半角“·”）！';
				return false;
			}
			
			if($scope.baseForm.password.$error.required){
				$scope.state.errTip = '密码不能为空！';
				return false;
			}
			if($scope.baseForm.password.$error.pattern){
				$scope.state.errTip = '密码格式不正确（只能输入字母开头，长度在6-18之间，只能包含字符、数字和下划线）！';
				return false;
			}
			
			
			
			if($scope.baseForm.idNumber.$error.required){
				$scope.state.errTip = '证件号码不能为空！';
				return false;
			}
			
			if($scope.baseForm.roleCode.$error.required){
				$scope.state.errTip = '用户角色不能为空！';
				return false;
			}
			
			/*if($scope.baseForm.orgCode.$error.required){
				$scope.state.errTip = '用户所属公司不能为空！';
				return false;
			}*/
			
			
			//提交后台
			$.ajax({
				url:'../../userService/addUserInfo.svc',
				type:'POST',
				data:JSON.stringify({
					userInfo:$scope.dataModel
				}),
				success:function(data){
					$scope.$apply(function(){
						if(data.succ){
							//打开系统提示框
							openPop('添加用户成功！');
						}else{
							$scope.state.errTip = data.message;
						}
					});
				},
				error:function(){
					$scope.state.errTip = '用户数据保存失败，请重新尝试，或联系技术人员处理！谢谢~';
				}
			});

		},
		//修改保存
		saveModify:function(){

			if($scope.baseForm.userCode.$error.required){
				$scope.state.errTip = '用户登录名不能为空！';
				return false;
			}
			if($scope.baseForm.userCode.$error.pattern){
				$scope.state.errTip = '用户登录名格式不正确（只能输入英文、数字、下划线、减号）！';
				return false;
			}
			
			if($scope.baseForm.userName.$error.required){
				$scope.state.errTip = '用户名称不能为空！';
				return false;
			}
			if($scope.baseForm.userName.$error.pattern){
				$scope.state.errTip = '用户名称格式不正确（只能输入中文和英文半角“·”）！';
				return false;
			}
			
			
			
			if($scope.baseForm.idNumber.$error.required){
				$scope.state.errTip = '证件号码不能为空！';
				return false;
			}
			
			if($scope.baseForm.roleCode.$error.required){
				$scope.state.errTip = '用户角色不能为空！';
				return false;
			}
			
			if($scope.baseForm.orgCode.$error.required){
				$scope.state.errTip = '用户所属公司不能为空！';
				return false;
			}
			
			$.ajax({
				url:'../../userService/updateUserInfo.svc',
				type:'POST',
				data:JSON.stringify({
					userInfo:$scope.dataModel,
					type:2
				}),
				success:function(data){
					$scope.$apply(function(){
						if(data.succ){
							//打开系统提示框
							openPop('用户数据修改保存成功！');
						}else{
							$scope.state.errTip = data.message;
						}
					});
				},
				error:function(){
					$scope.state.errTip = '用户数据修改保存失败，请重新尝试，或联系技术人员处理！谢谢~';
				}
			});
		}
	};
	
	
	var _handleType = $scope.tools.GetQueryString('type');
	var _userId = $scope.tools.GetQueryString('userId');
	
	if(_handleType){
		if(_handleType == 0){
			$scope.state.isShowInit = false;
			$scope.state.isShowModify = true;	//修改状态默认隐藏
			
			//提交后台
			$.ajax({
				url:'../../userService/getUserInfoPage.svc',
				type:'POST',
				data:JSON.stringify({
					pageNum:1,
					pageSize:1,
					
					userInfo:{
						id:_userId
					}
				}),
				success:function(data){

					$scope.$apply(function(){
						if(data.succ){
							
							if(data.result.rows.length != 0){
								$scope.dataModel = data.result.rows[0];
							}else{
								$scope.state.errTip = '修改用户信息初始化查询数据失败，请重新尝试，或联系技术人员处理！谢谢~';
							}
							
							
						}else{
							$scope.state.errTip = data.message;
						}
					});
				},
				error:function(){
					$scope.state.errTip = '修改用户信息初始化查询数据失败，请重新尝试，或联系技术人员处理！谢谢~';
				}
			});
		}else if(_handleType == 1){
			$scope.state.isShowInit = false;
			$scope.state.isShowLook = true;		//查看状态默认隐藏
			
			//提交后台
			$.ajax({
				url:'../../userService/getUserInfoPage.svc',
				type:'POST',
				data:JSON.stringify({
					pageNum:1,
					pageSize:1,
					
					userInfo:{
						id:_userId
					},
        			dictFields:"roleCode,orgCode",
        			dictCodes:"roleCode,companyCode"
				}),
				success:function(data){
					$scope.$apply(function(){
						if(data.succ){
							
							if(data.result.rows.length != 0){
								data.result.rows[0].userStatus = useStatus[data.result.rows[0].userStatus];
								data.result.rows[0].isLock = isHang[data.result.rows[0].isLock];
								data.result.rows[0].orgCode = data.result.rows[0].orgCode__name__;
								data.result.rows[0].roleCode = data.result.rows[0].roleCode__name__;
								$scope.dataModel = data.result.rows[0];
							}else{
								$scope.state.errTip = '查看用户详细信息初始化查询数据失败，请重新尝试，或联系技术人员处理！谢谢~';
							}
							
							
						}else{
							$scope.state.errTip = data.message;
						}
					});
				},
				error:function(){
					$scope.state.errTip = '查看用户详细信息初始化查询数据失败，请重新尝试，或联系技术人员处理！谢谢~';
				}
			});
		}else{
			$scope.state.isShowInit = true;
			$scope.state.isShowLook = false;		//查看状态默认隐藏
			$scope.state.isShowModify = false;	//修改状态默认隐藏
		}

	}else{
		$scope.state.isShowInit = true;
		$scope.state.isShowLook = false;		//查看状态默认隐藏
		$scope.state.isShowModify = false;	//修改状态默认隐藏
	}


});


function openPop(text){
	$('#dialogMakeTrue').find('#userTip').text(text);
    
    $('#dialog-cover').show();
    $('#dialogMakeTrue').show();
    $('#dialogMakeTrue').css({
        'top':($(window).height()-$('#dialogMakeTrue').height())/2,
        'left':($(window).width()-$('#dialogMakeTrue').width())/2
    });

}
