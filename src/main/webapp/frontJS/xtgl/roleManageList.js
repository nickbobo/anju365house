//判断是否是数组
function isArray(o){
	return Object.prototype.toString.call(o)=='[object Array]';
}
//权限添加跳转
function toPageAddRight(roleCode){
	window.location.href="rightAddManage.html?roleCode="+roleCode;
}
//权限删除跳转
function toPageDelRight(roleCode){
	window.location.href="rightDelManage.html?roleCode="+roleCode;
}


//定义数据渲染函数
function ajaxDom(pageNum,pageSize,obj){
	var _html = '';
	 var isDel=["有效","无效"];
     for(var i=0;i<obj.length;i++){
         _html += "<tr>" +
                 "<td>"+(pageSize*(pageNum-1)+i+1)+"</td>" +
                 "<td>"+obj[i].roleName+"</td>" +
                 "<td>"+obj[i].roleCode+"</td>" +
                 "<td>"+obj[i].createDate+"</td>" +
                 "<td class='isDel'>"+isDel[obj[i].isDel]+"</td>" +
                 "<td><a href='javascript:toPageAddRight(\""+obj[i].roleCode+"\")' class='underline-a set-a'>添加</a><a href='javascript:toPageDelRight(\""+obj[i].roleCode+"\")' class='underline-a modify-a'>删除</a></td>" +
                 "<td><a href='javascript:openModifyPop(\""+obj[i].id+"\",\""+obj[i].roleCode+"\",\""+obj[i].roleName+"\")' class='underline-a set-a'>修改</a><a href='javascript:openDelPop(\""+obj[i].roleCode+"\",\""+obj[i].isDel+"\")' class='underline-a modify-a' >删除</a></td>" +
                 "</tr>";
     }
     $('table tbody').html(_html);
     /*table斑马线设置*/
     $('tr:even').css('background','#f5f5f5');
}
//定义查询和初始化时候发送ajax时候的数据
var _obj = {
        "roleCode":'',
        "roleName":'',
        "pageSize":10,
        "pageNum":1
}
//定义分页所需数据
var pageNum = 1;
var pageSize = 10;
var flag = true;
var roleCode='';
var roleName='';
//加载列表数据函数
function loadData(pageNum,pageSize,roleCode,roleName){
	/* obtain data */
	$.ajax({
		url:'../../role/findRoleInfoPage.svc',
		type:'POST',
		data:JSON.stringify({
			"role":{
				"roleCode":roleCode,
				"roleName":roleName,
				},
				"pageNum":pageNum,
				"pageSize":pageSize
		}),
		success:function(data){
			if(data.succ){
				var _a = data.result.rows;
				var _total = data.result.total;
				if(isArray(_a)){
					if(_a.length != 0){
						ajaxDom(pageNum,pageSize,_a);
					}else{
						$('table tbody').html('<tr><td class="err-td" colspan="7">暂无数据</td></tr>');
					}
				}
				
				$('.totalCount').text(_total); 
                $('.currentPage').text(pageNum)
				$('.totalPage').text(Math.ceil(_total/pageSize));
				if(flag){
					//分页跟新
					$('#pageTool').html('').Paging({
			            pagesize:pageSize,
			            count:_total,
			            callback:function(page,size,count){
			            	pageNum = page;
			            	$('.totalCount').text(_total); 
			                $('.currentPage').text(pageNum)
							$('.totalPage').text(Math.ceil(_total/pageSize));
			                //点击分页的时候重新获取数据渲染
			                $.ajax({
			            		url:'../../role/findRoleInfoPage.svc',
			            		type:'POST',
			            		data:JSON.stringify({
			            			"role":{
			            				"roleCode":roleCode,
			            				"roleName":roleName,
			            				},
			            				"pageNum":pageNum,
			            				"pageSize":pageSize
			            		}),
			            		success:function(data){
			            			if(data.succ){
			            				var _a = data.result.rows;
			            				
			            				if(isArray(_a)){
			            					if(_a.length != 0){
				            					ajaxDom(pageNum,pageSize,_a);
			            					}else{
			            						$('table tbody').html('<tr><td class="err-td" colspan="7">暂无数据</td></tr>');
			            					}
			            				}
			            			}else{
			            				$('table tbody').html('<tr><td class="err-td" colspan="7">'+data.message+'</td></tr>');
			            			}
			            		},
			            		error:function(){
			            			$('table tbody').html('<tr><td class="err-td" colspan="7">角色查询失败，请重新尝试，或联系技术人员处理！谢谢~</td></tr>');
			            		}
			                });
			            }
			        });
					flag = false;
				}
				
			}else{
				$('table tbody').html('<tr><td class="err-td" colspan="7">'+data.message+'</td></tr>');
			}
		},
		error:function(){
			$('table tbody').html('<tr><td class="err-td" colspan="7">角色查询失败，请重新尝试，或联系技术人员处理！谢谢~</td></tr>');
    	}
	});
}

//页面初始化加载
$(function(){
	//页面加载
	loadData(pageNum,pageSize,roleCode,roleName);
	
	$('.big').on('click',function(){
		pageNum = 1;
		flag = true,
		roleCode = $.trim($('.s_roleCode').val());
		roleName = $.trim($('.s_roleName').val());
		loadData(pageNum,pageSize,roleCode,roleName);
	});
	
//初始化错误提示
$(function(){
		$('input').on('click',function(){
			 $('#dialog3 .errtip').text("");
		})
		//新增角色
		$("#addRole").click(function(){
			 $('#dialog-cover').show();
			    $('#dialog3').show();
			    $('#dialog3 .codeInput').val("");
			    $('#dialog3 .nameInput').val("");
			    $('#dialog3').css({
			        'top':($(window).height()-$('#dialog3').height())/4,
			        'left':($(window).width()-$('#dialog3').width())/2
			   })
		})
		//弹出框确定点击
		var  role = {};
		var num=/^[0-9]+$/;
		$("#dialog3").on("click",function(){
			 $('#dialog3 .errtip').text("");
		})
		 $('#selBtn3').on('click',function(){
		        role ={
		        		"role": {
				            "roleCode":$.trim($('#dialog3 .codeInput').val()),
				            "roleName":$.trim($('#dialog3 .nameInput').val()),
				        }
		        }
		        if($.trim($('#dialog3 .nameInput').val())=="" || $.trim($('#dialog3 .nameInput').val())==null ){
		        	 $('#dialog3 .errtip').text("角色名称不能为空！");
			    	 return false ;
			     }
		      
		        if($.trim($('#dialog3 .nameInput').val()).length >=15){
		    		$('.errtip').text('角色名称不能多于十五个字符！');
		    		return false;
		    	}
		        if(!/^[0-9]+$/.test($.trim($('#dialog3 .codeInput').val()))){
			    	console.log("shuzi");
		        	 $('#dialog3 .errtip').text("角色CODE只能是数字！");
		        	 return false;
		        }
			    if($.trim($('#dialog3 .codeInput').val())=="" || $.trim($('#dialog3 .codeInput').val())==null){
			    	 $('#dialog3 .errtip').text("角色CODE不能为空");
			    	 return false;
			     }
			    
			   
		       //发送AJAX
		 		$.ajax({
		 			url:'../../role/saveOrUpdateRole.svc',
		 			type:'POST',
		 			data:JSON.stringify(role),
		 			success:function(data){
		 				if(data.succ){
							openPop("角色添加成功！");
							/*window.location.reload();*/
						}else{
							$('#tip-info').addClass('err').text(data.message);
						}
		 			},
		 			error:function(){
		 				$('#tip-info').addClass('err').text('该角色添加失败，请联系技术人员处理，谢谢！');
		 			}
		 		});
		       
		     });
	
	});
	


//弹出框取消关闭弹框 
	$('#cancel-btn').click(function(){
	    $('.dialog').hide();
	    $('#dialog-cover').hide();
	    $('.dialog').css({
	        'top':0,
	        'left':0
	    });
	})
});

//定义产生随机数函数
function getRandomNum(Min,Max){    //随机数生成
    var Range = Max - Min;   
    var Rand = Math.random();   
    return(Min + Math.round(Rand * Range)); 
}

// 关闭弹框
function closeRightManage(){
	$('.dialog').hide();
	$('#dialog-cover').hide();
	$('.dialog').css({
	    'top':0,
	    'left':0
	});
	window.location.reload();
}


//定义确认框弹出

function openPop(text){

	$('#dialogMakeTrue').find('#userTip').text(text);
  $('#dialog-cover').show();
  $('#dialogMakeTrue').show();
  $('#dialogMakeTrue').css({
      'top':($(window).height()-$('#dialogMakeTrue').height())/4,
      'left':($(window).width()-$('#dialogMakeTrue').width())/2
  });
}   

//删除角色
function delMenu(){
	if($('#dialogDel').attr('data-isDel')==0){
		$.ajax({
			url:'../../role/deleteRole.svc',
			type:'POST',
			data:JSON.stringify({
				roleCode:$('#dialogDel').attr('data-menu-code')
			}),
			success:function(data){
				if(data.succ){
					openPop("角色删除成功！");
					/*window.location.reload();*/
					
				}else{
					$('#tip-info').addClass('err').text(data.message);
				}
			},
			error:function(){
				$('#tip-info').addClass('err').text('该角色不能删除，请点击取消返回页面，谢谢！');
			}
		});
	}else{
		$('#tip-info').addClass('err').text('该角色为无效角色，请勿重复操作，点击取消返回页面！');
	}
	
	
	
}
//打开角色删除
function openDelPop(param,isDel){
	$('#tip-info').removeClass('err').text('该操作会将当前角色设置为无效，请谨慎操作！谢谢~');
	$('#dialog-cover').show();
    $('#dialogDel').attr('data-menu-code',param).attr('data-isDel',isDel).show();
    $('#dialogDel').css({
        'top':($(window).height()-$('#dialogDel').height())/4,
        'left':($(window).width()-$('#dialogDel').width())/2
    });
}

//修改角色
function modifyMenu(){
	 
	if($.trim($('#roleName').val()) == '' || $.trim($('#roleName').val()) == null){
		console.log("err");
		$('.errtip').text('角色名称不能为空');
		return false;
	}
	if($.trim($('#roleName').val()).length >=15){
		$('.errtip').text('角色名称不能多于十五个字符！');
		return false;
	}
	$.ajax({
		url:'../../role/saveOrUpdateRole.svc',
		type:'POST',
		data:JSON.stringify({
				"role":{
					"id":$('#dialogModify').attr('data-menu-Id'),
					"roleCode":$.trim($('#roleCode').val()),
					"roleName":$.trim($('#roleName').val()),
						}
					}
				),
		success:function(data){
			if(data.succ){
				openPop("角色修改成功！");
			}else{
				$('#add-err').text(data.message).fadeIn(300);
			}
		},
		error:function(){
			$('#add-err').text('角色修改失败，请重新尝试，或联系技术人员处理！谢谢~').fadeIn(300);
		}
	});
}

//打开菜单修改
function openModifyPop(roleId,roleCode,roleName){
	
	$('#add-err').text('').hide();
	
	$('#dialog-cover').show();
	
    $('#dialogModify').attr('data-menu-code',roleCode).attr('data-menu-Id',roleId).show();
	$('#roleCode').val(roleCode);
    $('#roleName').val(roleName);
    $('#dialogModify').css({
        'top':($(window).height()-$('#dialogModify').height())/4,
        'left':($(window).width()-$('#dialogModify').width())/2
    });
   
}


