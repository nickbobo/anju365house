function isArray(o){
	return Object.prototype.toString.call(o)=='[object Array]';
}
//html页面dom填充渲染
function ajaxDom(pageNum,pageSize,obj){
	var _html = '';
	for(var i=0;i<obj.length;i++){
		_html += '<tr>\
			<td>'+(pageSize*(pageNum-1)+i+1)+'</td>\
			<td>'+obj[i].id+'</td>\
			<td>'+obj[i].name+'</td>\
			<td style="max-width:300px;overflow:auto;">'+(obj[i].menuUrl ? obj[i].menuUrl : "--")+'</td>\
			<td>'+(obj[i].createDate ? obj[i].createDate : "--")+'</td>\
			<td><a href="javascript:openModifyPop(\''+obj[i].id+'\',\''+obj[i].name+'\',\''+obj[i].menuUrl+'\')" class="underline-a set-a">修改</a><a href="javascript:openDelPop(\''+obj[i].id+'\')" class="underline-a modify-a">删除</a></td>\
		</tr>';
	}
	$('table tbody').html(_html);
}
//加载列表数据函数
function loadData(pageNum,pageSize,menuCode,chName){
	/* obtain data */
	$.ajax({
		url:'../../menu/getMenuInfoPage.svc',
		type:'POST',
		data:JSON.stringify({
			pageNum:pageNum,
			pageSize:pageSize,
			menu:{
				menuCode:menuCode,
				chName:chName
			}
		}),
		success:function(data){
			if(data.succ){
				var _a = data.result.rows;
				var _total = data.result.total;
				
				if(isArray(_a)){
					if(_a.length != 0){
						ajaxDom(pageNum,pageSize,_a);
					}else{
						$('table tbody').html('<tr><td class="err-td" colspan="5">暂无数据</td></tr>');
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
			            		url:'../../menu/getMenuInfoPage.svc',
			            		type:'POST',
			            		data:JSON.stringify({
			            			pageNum:pageNum,
			            			pageSize:pageSize,
			            			menu:{
			            				menuCode:menuCode,
			            				chName:chName
			            			}
			            		}),
			            		success:function(data){
			            			if(data.succ){
			            				var _a = data.result.rows;
			            				
			            				if(isArray(_a)){
			            					if(_a.length != 0){
				            					ajaxDom(pageNum,pageSize,_a);
			            					}else{
			            						$('table tbody').html('<tr><td class="err-td" colspan="5">暂无数据</td></tr>');
			            					}
			            				}
			            			}else{
			            				$('table tbody').html('<tr><td class="err-td" colspan="5">'+data.message+'</td></tr>');
			            			}
			            		},
			            		error:function(){
			            			$('table tbody').html('<tr><td class="err-td" colspan="5">菜单查询失败，请重新尝试，或联系技术人员处理！谢谢~</td></tr>');
			            		}
			                });
			            }
			        });
					flag = false;
				}
				
			}else{
				$('table tbody').html('<tr><td class="err-td" colspan="5">'+data.message+'</td></tr>');
			}
		},
		error:function(){
			$('table tbody').html('<tr><td class="err-td" colspan="5">菜单查询失败，请重新尝试，或联系技术人员处理！谢谢~</td></tr>');
    	}
	});
}

var pageNum = 1;
var pageSize = 10;
var flag = true;
var menuCode = '';
var chName = '';

$(function(){
	//页面加载
	loadData(pageNum,pageSize,menuCode,chName);
	
	$('#searchBtn').on('click',function(){
		pageNum = 1;
		flag = true,
		menuCode = $('#menuCode').val();
		chName = $('#chName').val();
		loadData(pageNum,pageSize,menuCode,chName);
	});
	
});


//删除菜单
function delMenu(){
	$.ajax({
		url:'../../menu/delMenuInfo.svc',
		type:'POST',
		data:JSON.stringify({
			menuCode:$('#dialogDel').attr('data-menu-code')
		}),
		success:function(data){
			if(data.succ){
				window.location.reload();
			}else{
				$('#tip-info').addClass('err').text('系统错误：菜单删除失败，请重试或联系技术人员处理！谢谢~');
			}
		},
		error:function(){
			$('#tip-info').addClass('err').text('菜单删除失败，请重新尝试，或联系技术人员处理！谢谢~');
		}
	});
}
//关闭弹出框
function closePop(){
    $('.dialog').hide();
    $('#dialog-cover').hide();
    $('.dialog').css({
        'top':0,
        'left':0
    });
}
//打开菜单删除
function openDelPop(param){
	$('#tip-info').removeClass('err').text('菜单删除会将当前菜单下所有子菜单删除掉，请谨慎删除！谢谢~');
	
	$('#dialog-cover').show();
    $('#dialogDel').attr('data-menu-code',param).show();
    $('#dialogDel').css({
        'top':($(window).height()-$('#dialogDel').height())/2,
        'left':($(window).width()-$('#dialogDel').width())/2
    });
}


//修改菜单
function modifyMenu(){
	if($.trim($('#chNameInput').val()) == '' || $.trim($('#chNameInput').val()) == null){
		$('#add-err').text('菜单名称不能为空').fadeIn(300);
		return false;
	}
	if(!(/^[\u4E00-\u9FFF\u3400-\u4DFF]+$/.test($.trim($('#chNameInput').val())))){
		$('#add-err').text('菜单名称格式不正确（只能输入中文）').fadeIn(300);
		return false;
	}
	$.ajax({
		url:'../../menu/updateMenuInfo.svc',
		type:'POST',
		data:JSON.stringify({
			menu:{
				menuCode:$('#dialogModify').attr('data-menu-code'),
				chName:$.trim($('#chNameInput').val()),
				menuUrl:$.trim($('#menuUrlInput').val())
			}
		}),
		success:function(data){
			if(data.succ){
				window.location.reload();
			}else{
				$('#add-err').text('系统错误：菜单修改失败，请重试或联系技术人员处理！谢谢~').fadeIn(300);
			}
		},
		error:function(){
			$('#add-err').text('菜单修改失败，请重新尝试，或联系技术人员处理！谢谢~').fadeIn(300);
		}
	});
}
//打开菜单修改
function openModifyPop(menuCode,chName,menuUrl){
	$('#add-err').text('').hide();
	
	$('#dialog-cover').show();
	
    $('#dialogModify').attr('data-menu-code',menuCode).show();
    $('#chNameInput').val(chName);
    $('#menuUrlInput').val(menuUrl);
    
    $('#dialogModify').css({
        'top':($(window).height()-$('#dialogModify').height())/2,
        'left':($(window).width()-$('#dialogModify').width())/2
    });
}
$(function(){
	$('input').on('click',function(){
		$('.err-tip').text('').hide();
	});
});


