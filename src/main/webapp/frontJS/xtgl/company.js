//判断是否是数组
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

//初始化
$(function(){
	/*定义ztree的json数据*/
	console.log(GetQueryString('ck'));
    var _data = [
        {
       	 id:'',name:'根目录（/）',num:0,children:[
               
       	 ]
        }

    ];
    if( GetQueryString('orgCode')!=''&&GetQueryString('orgCode')!=null&&GetQueryString('ck')==null){
    
    	$(".ztree-td").hide();
    	$('.add-container').css('padding-left','300px');
	    	$('.btn-content').css('padding-right','590px')
	    	$('.add-container .tip').css('width','100%');
    	 $.ajax({
    	    	url:'../../companyInfo/getCompanyForCode.svc',
    			type:'POST',
    			data:JSON.stringify({
    				company:{orgCode:GetQueryString('orgCode')}
    			}),
    			success:function(data){
    				if(data.succ){
    					 $("#name").val(data.result[0].name);
    					 $("#telephone").val(data.result[0].telephone);
    					 $("#pAdress").val(data.result[0].pAdress);
    					 $("#pLPerson").val(data.result[0].pLPerson);
    					 $("#shortName").val(data.result[0].shortName?data.result[0].shortName:'----');
    					 $("#pAbstract").val(data.result[0].pAbstract?data.result[0].pAbstract:'----');
    					 $("#parentCode").val(data.result[0].pOrgCode);
    					 $("#companyCode").val(data.result[0].orgCode);
    					 $("#companyLevel").val(data.result[0].orgLevel);
    					 $("#sortIndex").val(data.result[0].sortIndex);
    					 
    					
    				}else{
    					$('#search-err').text(data.message).fadeIn(300);
    				}
    			},
    			error:function(){
    				$('#search-err').text('公司修改失败，请重新尝试，或联系技术人员处理！谢谢~').fadeIn(300);
    			}
    		});
    }else if(GetQueryString('orgCode')!=''&&GetQueryString('orgCode')!=null&&GetQueryString('ck')!=null){
    	$(".btn-content").hide();
    	 $("#name").attr("disabled",'disabled');
		 $("#telephone").attr("disabled",'disabled');
		 $("#pAdress").attr("disabled",'disabled');
		 $("#pLPerson").attr("disabled",'disabled');
		 $("#shortName").attr("disabled",'disabled');
		 $("#pAbstract").attr("disabled",'disabled');
		 $.ajax({
 	    	url:'../../companyInfo/getCompanyForList.svc',
 			type:'POST',
 			data:JSON.stringify({
 				company:{orgCode:GetQueryString('orgCode')}
 			}),
 			success:function(data){
 				if(data.succ){
 					$("#name").val(data.result[0].name);
 					 $("#telephone").val(data.result[0].telephone);
 					 $("#pAdress").val(data.result[0].pAdress);
 					 $("#pLPerson").val(data.result[0].pLPerson);
 					 $("#shortName").val(data.result[0].shortName?data.result[i].shortName:'----');
 					 $("#pAbstract").val(data.result[0].pAbstract?data.result[i].pAbstract:'----');
 					 $("#parentCode").val(data.result[0].pOrgCode);
 					 $("#companyCode").val(data.result[0].id);
 					 $("#companyLevel").val(data.result[0].orgLevel);
 					 $("#sortIndex").val(data.result[0].sortIndex);
 					
 					 if(data.result[0].id.length==8){
 						
 						$(".ztree-td").hide();
 				    	$('.add-container').css('padding-left','300px');
 					    	$('.btn-content').css('padding-right','590px')
 					    	$('.add-container .tip').css('width','100%');
 					
 					 }
					var _a = data.result;
					if(isArray(_a)){
						for(var i=0;i<_a.length;i++){
							if(_a[i].id == -1){
								
								_data[0].id = _a[i].id;
								_data[0].num = _a[i].num;
							}
							if(_a[i].id.length == 4 && _a[i].id != -1){
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
								if(rows[i].pOrgCode == pId){
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
					            	for(var i=0;i<data.result.length;i++){
					            		if(treeNode.id==data.result[i].id){
					            			 $("#name").val(data.result[i].name);
					    					 $("#telephone").val(data.result[i].telephone);
					    					 $("#pAdress").val(data.result[i].pAdress);
					    					 $("#pLPerson").val(data.result[i].pLPerson);
					    					 $("#shortName").val(data.result[i].shortName?data.result[i].shortName:'----');
					    					 $("#pAbstract").val(data.result[i].pAbstract?data.result[i].pAbstract:'----');
					    					 $("#parentCode").val(data.result[i].pOrgCode);
					    					 $("#companyCode").val(data.result[i].id);
					    					 $("#companyLevel").val(data.result[i].orgLevel);
					    					 $("#sortIndex").val(data.result[i].sortIndex);
					            		}
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
 				$('#search-err').text('公司查看失败，请重新尝试，或联系技术人员处理！谢谢~').fadeIn(300);
 			}
 		});
    }else{
    	$(".ztree-td").show();
    	 $.ajax({
    	    	url:'../../companyInfo/getCompanyList.svc',
    			type:'POST',
    			data:JSON.stringify({}),
    			success:function(data){
    				if(data.succ){
    					var _a = data.result;
    					if(isArray(_a)){
    						for(var i=0;i<_a.length;i++){
    							if(_a[i].id == -1){
    								
    								_data[0].id = _a[i].id;
    								_data[0].num = _a[i].num;
    							}
    							if(_a[i].id.length == 4 && _a[i].id != -1){
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
    								if(rows[i].pOrgCode == pId){
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
    					            	 console.log(treeNode)
    					            	 if(treeNode.id.length >= 8){
    					            		 $('#add-err').text('仅限添加到第三级，谢谢~').fadeIn(300);
    					            		 return false;
    					            	 }
    					            	 var _menuLevel = ['一','二','三','四','五','六','七','八','九','十'];
    				            		 var _menuCode = treeNode.num + 1;
    				                	 $('#sortIndex').val(_menuCode);
    				                	 if(_menuCode < 10){
    				                		 _menuCode = '000'+ _menuCode;
    				                	 }else if(_menuCode < 100){
    				                		 _menuCode = '00'+ _menuCode;
    				                	 }else if(_menuCode < 1000){
    				                		 _menuCode = '0'+ _menuCode;
    				                	 }else{
    				                		 _menuCode =  _menuCode;
    				                	 }
    				                	
    			                		 $('#parentCode').val(treeNode.id);
    				                	 if(treeNode.id == -1){
    				                		 $('#companyCode').val(_menuCode);
    				                		 $('#companyLevel').attr('data-level',1).val(_menuLevel[0]+'级');
    				                	 }else{
    				                		 $('#companyCode').val(treeNode.id+_menuCode);
    				                		 $('#companyLevel').attr('data-level',parseInt(treeNode.id.length)/2+1).val(_menuLevel[parseInt(treeNode.id.length)/2]+'级菜单');
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
    				$('#search-err').text('公司添加失败，请重新尝试，或联系技术人员处理！谢谢~').fadeIn(300);
    			}
    		});
    }
})

//打开确认菜单
function openPop(){
    $('#dialog-cover').show();
    $('#dialogMakeTrue').show();
    $('#dialogMakeTrue').css({
        'top':($(window).height()-$('#dialogMakeTrue').height())/2,
        'left':($(window).width()-$('#dialogMakeTrue').width())/2
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
    window.location.reload();
}


$(function(){
	
	//取消按钮点击处理
	$('.cancel-btn').on('click',function(){
		window.location.reload();
	});
	//保存按钮点击处理
	$('#save-btn2').on('click',function(){
		console.log("jjjj");
		if($.trim($('#name').val()) == '' || $.trim($('#name').val()) == null){
			$('.err-tip').text('公司全称不能为空').fadeIn(300);
			return false;
		}
		if(!(/^[\u4E00-\u9FFF\u3400-\u4DFF]+$/.test($.trim($('#name').val())))){
			$('.err-tip').text('公司全称格式不正确（只能输入中文）').fadeIn(300);
			return false;
		}
		
		if($.trim($('#telephone').val()) == '' || $.trim($('#telephone').val()) == null){
			$('.err-tip').text('联系电话不能为空').fadeIn(300);
			return false;
		}
		if(!(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test($.trim($('#telephone').val())))){
			$('.err-tip').text('联系电话格式不正确(座机号码)').fadeIn(300);
			return false;
		}
		
		if($.trim($('#pAdress').val()) == '' || $.trim($('#pAdress').val()) == null){
			$('.err-tip').text('公司地址不能为空！').fadeIn(300);
			return false;
		}
		if(!(/^[a-zA-Z]*[\u4E00-\u9FFF\u3400-\u4DFF]+$/.test($.trim($('#pAdress').val())))){
			$('.err-tip').text('公司地址格式不正确(中文数字和字母不能全为数字或者字母！)').fadeIn(300);
			return false;
		}
		
		if($.trim($('#pLPerson').val()) == '' || $.trim($('#pLPerson').val()) == null){
			$('.err-tip').text('公司法人不能为空！').fadeIn(300);
			return false;
		}
		if(!(/^[\u4E00-\u9FFF\u3400-\u4DFF]+$/.test($.trim($('#pLPerson').val())))){
			$('.err-tip').text('公司法人格式不正确！只能是中文)').fadeIn(300);
			return false;
		}
		
		$.ajax({
			url:'../../companyInfo/addCompany.svc',
			type:'POST',
			data:JSON.stringify({
				company:{
					name:$.trim($('#name').val()),
					telephone:$('#telephone').val(),
					pAdress:$('#pAdress').val(),
					pLPerson:$('#pLPerson').val(),
					shortName:$('#shortName').val(),
					pAbstract:$('#pAbstract').val(),
					pOrgCode:$('#parentCode').val(),
					orgCode:$('#companyCode').val(),
					orgLevel:$('#companyLevel').attr('data-level'),
					sortIndex:$('#sortIndex').val()
				}
			}),
			success:function(data){
				if(data.succ){
					//打开系统提示框
					openPop();
				}else{
					$('.err-tip').text(data.message).fadeIn(300);
				}
			},
			error:function(){
				$('.err-tip').text('公司保存失败，请重新尝试，或联系技术人员处理！谢谢~').fadeIn(300);
			}
		});
	});
	
	//错误提示信息初始化
	$('.err-tip').text('').fadeOut(300);
	$('.add-container').on('click',function(){
		$('.err-tip').text('').fadeOut(300);
	});
	
})

//获得url中的get参数
//name 需要获得参数的名称
function GetQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r!=null)return decodeURIComponent(r[2]); 
  return null;
}


























