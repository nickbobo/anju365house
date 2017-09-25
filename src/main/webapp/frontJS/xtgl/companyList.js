//判断是否是数组
function isArray(o){
	return Object.prototype.toString.call(o)=='[object Array]';
}

//关闭弹框
function closeRightManage(){
	$('.dialog').hide();
	$('#dialog-cover').hide();
	$('.dialog').css({
	    'top':0,
	    'left':0
	});
	window.location.reload();
}
//打开角色删除
function openDelPop(param,isDel){
	if(isDel==1){
		openPop("该公司已经设置为无效，请勿重复操作！");
		$("#userTip").css("color",'red');
		return ;
	}
	$('#tip-info').removeClass('err').text('该操作会将当前公司设置为无效，请谨慎操作！谢谢~');
	$('#dialog-cover').show();
    $('#dialogDel').attr('data-orgCode',param).attr('data-isDel',isDel).show();
    $('#dialogDel').css({
        'top':($(window).height()-$('#dialogDel').height())/4,
        'left':($(window).width()-$('#dialogDel').width())/2
    });
}
//删除角色
function delMenu(){
	if($('#dialogDel').attr('data-isDel')==0){
		$.ajax({
			url:'../../companyInfo/deleteCompany.svc',
			type:'POST',
			data:JSON.stringify({
				orgCode:$('#dialogDel').attr('data-orgCode')
			}),
			success:function(data){
				if(data.succ){
					openPop("公司删除成功！");
					/*window.location.reload();*/
					
				}else{
					$('#tip-info').addClass('err').text(data.message);
				}
			},
			error:function(data){
				$('#tip-info').addClass('err').text(data.message);
			}
		});
	}else{
		$('#tip-info').addClass('err').text('该公司为无效角色，请勿重复操作，点击取消返回页面！');
	}
	
	
	
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
//定义渲染页面对的方法
function ajaxDom(pageNum,pageSize,obj){
	var _html = '';
	var isDel=["有效","无效"];
	for(var i=0;i<obj.length;i++){
		_html += '<tr>\
			<td>'+(pageSize*(pageNum-1)+i+1)+'</td>\
			<td>'+obj[i].name+'</td>\
			<td>'+obj[i].pLPerson+'</td>\
			<td>'+obj[i].telephone+'</td>\
			<td>'+isDel[obj[i].isDel]+'</td>\
			<td>'+(obj[i].createDate ? obj[i].createDate : "--")+'</td>\
			<td><a href="javascript:toPageModify(\''+obj[i].orgCode+'\',\''+obj[i].isDel+'\')" class="underline-a set-a">修改</a><a href="javascript:openDelPop(\''+obj[i].orgCode+'\',\''+obj[i].isDel+'\')" class="underline-a set-a">删除</a><a href="javascript:toPageSee(\''+obj[i].orgCode+'\')" class="underline-a set-a">查看</a></td>\
		</tr>';
	}
	$('table tbody').html(_html);
}


//加载列表数据
//加载列表数据函数
function loadData(pageNum,pageSize,shortName,isDel){
	/* obtain data */
	$.ajax({
		url:'../../companyInfo/getCompanyInfoPage.svc',
		type:'POST',
		data:JSON.stringify({
			pageNum:pageNum,
			pageSize:pageSize,
			company:{
				shortName:shortName,
				isDel:isDel
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
			            		url:'../../companyInfo/getCompanyInfoPage.svc',
			            		type:'POST',
			            		data:JSON.stringify({
			            			pageNum:pageNum,
			            			pageSize:pageSize,
			            			company:{
			            				shortName:shortName,
			            				isDel:isDel
			            			}
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
			            			$('table tbody').html('<tr><td class="err-td" colspan="9">公司查询失败，请重新尝试，或联系技术人员处理！谢谢~</td></tr>');
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
			$('table tbody').html('<tr><td class="err-td" colspan="9">公司查询失败，请重新尝试，或联系技术人员处理！谢谢~</td></tr>');
    	}
	});
}


//定义初始化参数
var pageNum = 1;
var pageSize =10;
var flag = true;
var shortName = '';
var isDel='';

//初始化加载页面
$(function(){
	//页面加载
	loadData(pageNum,pageSize,shortName,isDel);
	$('#searchBtn').on('click',function(){
		pageNum = 1;
		flag = true,
		shortName = $.trim($('#name').val());
		isDel = JS_getCheckValue('status',document);
		loadData(pageNum,pageSize,shortName,isDel);
	});
	
});

//toPage方法定义 页面跳转
function toPage(_orgCode){
    window.location.href = 'company.html?orgCode='+_orgCode;
}

//查看功能
function toPageSee(_orgCode){
    window.location.href = 'company.html?ck=ck&orgCode='+_orgCode;
}

//删除功能
function toPageModify(_orgCode,_isDel){
	if(_isDel==1){
		openPop('该角色已经无效，不可修改！');
		$("#userTip").css("color",'red');
		return ;
	}
    window.location.href = 'company.html?orgCode='+_orgCode;
}



















