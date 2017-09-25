function isArray(o){
	return Object.prototype.toString.call(o)=='[object Array]';
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
//html页面dom填充渲染
function ajaxDom(pageNum,pageSize,obj){
	var _html = '';
	for(var i=0;i<obj.length;i++){
		_html += '<tr>\
			<td><input data-id="'+obj[i].id+'" type="checkbox" /></td>\
			<td>'+(pageSize*(pageNum-1)+i+1)+'</td>\
			<td>'+obj[i].userCode+'</td>\
			<td>'+obj[i].roleCode__name__+'</td>\
			<td>'+obj[i].createDate+'</td>\
			<td>'+obj[i].idNumber+'</td>\
			<td>'+useStatus[obj[i].userStatus]+'</td>\
			<td>'+isHang[obj[i].isLock]+'</td>\
			<td><a href="javascript:modifyUser(\''+obj[i].id+'\')" class="underline-a set-a">修改</a><a href="javascript:lookUser(\''+obj[i].id+'\')" class="underline-a set-a">查看</a></td>\
		</tr>';
	}
	$('table tbody').html(_html);
}
//加载列表数据函数
function loadData(pageNum,pageSize,userCode,idNumber,isLock,userStatus,roleCode,orgCode){
	/* obtain data */
	$.ajax({
		url:'../../userService/getUserInfoPage.svc',
		type:'POST',
		data:JSON.stringify({
			pageNum:pageNum,
			pageSize:pageSize,
			
			userInfo:{
				userCode:userCode,
				idNumber:idNumber,
				isLock:isLock,
				userStatus:userStatus,
				roleCode:roleCode,
				orgCode:orgCode
			},
			dictFields:"roleCode",
			dictCodes:"roleCode"
		}),
		success:function(data){
			if(data.succ){
				var _a = data.result.rows;
				var _total = data.result.total;
				
				if(isArray(_a)){
					if(_a.length != 0){
						ajaxDom(pageNum,pageSize,_a);
					}else{
						$('table tbody').html('<tr><td class="err-td" colspan="9">暂无数据</td></tr>');
					}
				}
				
				$('.totalCount').text(_total); 
                $('.currentPage').text(pageNum)
				$('.totalPage').text(Math.ceil(_total/pageSize));
				if(flag){
					$('#pageTool').html('').Paging({
			            pagesize:pageSize,
			            count:_total,
			            callback:function(page,size,count){
			            	pageNum = page;
			                
			                $.ajax({
			            		url:'../../userService/getUserInfoPage.svc',
			            		type:'POST',
			            		data:JSON.stringify({
			            			pageNum:pageNum,
			            			pageSize:pageSize,
			            			
			            			userInfo:{
			            				userCode:userCode,
				            			idNumber:idNumber,
				            			isLock:isLock,
				            			userStatus:userStatus,
				            			roleCode:roleCode,
				            			orgCode:orgCode
			            			},
			            			dictFields:"roleCode",
			            			dictCodes:"roleCode"
			            		}),
			            		success:function(data){
			            			if(data.succ){
			            				var _a = data.result.rows;
			            				
			            				if(isArray(_a)){
			            					if(_a.length != 0){
				            					ajaxDom(pageNum,pageSize,_a);
			            					}else{
			            						$('table tbody').html('<tr><td class="err-td" colspan="9">暂无数据</td></tr>');
			            					}
			            				}
			            			}else{
			            				$('table tbody').html('<tr><td class="err-td" colspan="9">'+data.message+'</td></tr>');
			            			}
			            		},
			            		error:function(){
			            			$('table tbody').html('<tr><td class="err-td" colspan="9">用户查询失败，请重新尝试，或联系技术人员处理！谢谢~</td></tr>');
			            		}
			                });
			            }
			        });
					flag = false;
				}
				
			}else{
				$('table tbody').html('<tr><td class="err-td" colspan="9">'+data.message+'</td></tr>');
			}
		},
		error:function(){
			$('table tbody').html('<tr><td class="err-td" colspan="9">用户查询失败，请重新尝试，或联系技术人员处理！谢谢~</td></tr>');
    	}
	});
}

var pageNum = 1;
var pageSize = 10;
var flag = true;
var userCode = '';
var idNumber = '';
var isLock = '';
var userStatus = '';
var roleCode = '';
var orgCode = '';

$(function(){
	//页面加载
	loadData(pageNum,pageSize,userCode,idNumber,isLock,userStatus,roleCode,orgCode);
	
	$('#searchBtn').on('click',function(){
		pageNum = 1;
		flag = true,
		userCode = $.trim($('#userCodeInput').val());
		idNumber = $.trim($('#idNumberInput').val());
		isLock = JS_getCheckValue('pass',document);
		userStatus = JS_getCheckValue('status',document);
		roleCode = $("#userCodeSelect option:selected").val();
		orgCode = $("#orgCodeSelect option:selected").val();
		loadData(pageNum,pageSize,userCode,idNumber,isLock,userStatus,roleCode,orgCode);
	});
	
	
	
	//加载用户角色和所属公司字典数据
	$('#errTip').text('').hide();
	//获取用户所属角色字典
	$.ajax({
		url:'../../userService/getRoleInfo.svc',
		type:'POST',
		data:JSON.stringify({}),
		success:function(data){

			if(data.succ){
				
				var auxArr = [];
                auxArr[0] = "<option value='' selected='selected'>--请选择--</option>";
                $.each(data.result, function(k, v){
                	auxArr[k+1] = "<option value='" + v.roleCode + "'>" + v.roleName + "</option>";
                });
                $('#userCodeSelect').html(auxArr.join(''));
                
			}else{
				$('#errTip').text(data.message).fadeIn(300);
			}
		},
		error:function(){
			$('#errTip').text('获取用户所属角色字典数据失败，请重新尝试，或联系技术人员处理！谢谢~').fadeIn(300);
		}
	});
	//获取用户所属公司字典
	$.ajax({
		url:'../../userService/getCompanyInfo.svc',
		type:'POST',
		data:JSON.stringify({}),
		success:function(data){

			if(data.succ){
				
				var auxArr = [];
                auxArr[0] = "<option value='' selected='selected'>--请选择--</option>";
                $.each(data.result, function(k, v){
                	auxArr[k+1] = "<option value='" + v.orgCode + "'>" + v.shortName + "</option>";
                });
                $('#orgCodeSelect').html(auxArr.join(''));
				
			}else{
				$('#errTip').text(data.message).fadeIn(300);
			}
		},
		error:function(){
			$('#errTip').text('获取用户所属公司字典数据失败，请重新尝试，或联系技术人员处理！谢谢~').fadeIn(300);
		}
	});
});


//关闭弹出框
function closePop(){
    $('.dialog').hide();
    $('#dialog-cover').hide();
    $('.dialog').css({
        'top':0,
        'left':0
    });
}
//打开批量操作结果弹出框
function openSystemTip(type,text){
	if(type == 0){
		$('#tip-info').addClass('err').text(text);
		$('#makeA').attr('href','javascript:closePop()');
	}else{
		$('#tip-info').removeClass('err').text(text);
		$('#makeA').attr('href','javascript:window.location.reload()');
	}
	
	$('#dialog-cover').show();
    $('#dialogMakeTrue').show();
    $('#dialogMakeTrue').css({
        'top':($(window).height()-$('#dialogMakeTrue').height())/2,
        'left':($(window).width()-$('#dialogMakeTrue').width())/2
    });
}
//批量处理
function allHandle(type){
	var _idData = [];
	$('table').find('input[type="checkbox"]:checked').each(function(k,v){
		_idData.push($(this).attr('data-id'))
	});
	
	if(_idData.length == 0){
		return false;
	}
	
	$.ajax({
		url:'../../userService/updateUserInfo.svc',
		type:'POST',
		data:JSON.stringify({
			userInfo:{
				id:_idData
			},
			type:type
		}),
		success:function(data){
			if(data.succ){
				openSystemTip(1,'批量设置状态成功！')
			}else{
				openSystemTip(0,data.message);
			}
		},
		error:function(){
			openSystemTip(0,'状态设置失败，请重新尝试，或联系技术人员处理！谢谢~');
		}
	});
}

//修改用户
function modifyUser(userId){
	window.location.href = 'userManage.html?type=0&userId='+userId;
}

//查看用户
function lookUser(userId){
	window.location.href = 'userManage.html?type=1&userId='+userId;
}


