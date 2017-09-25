function toPage(_num){
    window.location.href = 'houseVerifyDetail.html?id='+_num;
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
function isArray(o){
	return Object.prototype.toString.call(o)=='[object Array]';
}
//html页面dom填充渲染
function ajaxDom(pageNum,pageSize,obj){
	
	var _html = '';
	for(var i=0;i<obj.length;i++){
		//操作人类型
		for(var j=0;j<applicantNatureData.length;j++){
			if(applicantNatureData[j].key == obj[i].applicantNature){
				obj[i].applicantNature = applicantNatureData[j].value;
			}
		}
		_html += '<tr>\
    		<td>'+(pageSize*(pageNum-1)+i+1)+'</td>\
    		<td>'+(obj[i].wydz ? obj[i].wydz : "--")+'</td>\
    		<td>'+(obj[i].jzmj ? obj[i].jzmj : "--")+'</td>\
    		<td>'+(obj[i].cq ? changeData(cq,obj[i].cq) : "--")+'</td>\
    		<td>'+(obj[i].nd?obj[i].nd:'--')+'</td>\
    		<td>'+(obj[i].gpyxqqs ? obj[i].gpyxqqs : '--')+'</td>\
    		<td>'+(obj[i].gpyxqzz ? obj[i].gpyxqzz : '--')+'</td>\
        </tr>';
	}
	$('table tbody').html(_html);
	$("tr:even").css("background","#f5f5f5");
}
function changeData(obj,_key){
	for(var i=0;i<obj.length;i++){
		if(obj[i].key==_key){
			return obj[i].value;
		}
	}
}
//加载列表数据函数
function loadData(cq,wydz,gpyxqqs,gpyxqzz,pageNum,pageSize){
	/* obtain data */
	$.ajax({
		url:'../../gpfy/getListPage.svc',
		type:'POST',
		data:JSON.stringify({
			gpfy:{
			cq:cq,
			wydz:wydz,
			gpyxqqs:gpyxqqs,
			gpyxqzz:gpyxqzz
		          },
		    pageNum:pageNum,
		    pageSize:pageSize
		}),
		success:function(data){
			if(data.succ){
				var _total = data.result.total;
				if(isArray(data.result.rows)){
					if(data.result.rows.length != 0){
						var _Gpfy = data.result.rows;
						var _house = [];
						for(var i=0;i<_Gpfy.length;i++){
							var _obj = {
									wydz:_Gpfy[i].wydz,
									jzmj:_Gpfy[i].jzmj,
									cq:_Gpfy[i].cq,
									nd:_Gpfy[i].nd,
									gpyxqqs:_Gpfy[i].gpyxqqs,
									gpyxqzz:_Gpfy[i].gpyxqzz
							}
							_house.push(_obj);
						}
						
						ajaxDom(pageNum,pageSize,_house);
					}else{
						$('table tbody').html('<tr><td class="err-td" colspan="7">暂无数据</td></tr>');
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
			            	$('.currentPage').text(pageNum);
			                $.ajax({
			            		url:'../../gpfy/getListPage.svc',
			            		type:'POST',
			            		data:JSON.stringify({
			            			gpfy:{
			            				cq:cq,
			            				wydz:wydz,
			            				gpyxqqs:gpyxqqs,
			            				gpyxqzz:gpyxqzz
			            			          },
			            			    pageNum:pageNum,
					            	    pageSize:pageSize
			            			}),
			            		success:function(data){
			            			if(data.succ){
			            				if(isArray(data.result.rows)){
			            					if(data.result.rows.length != 0){
			            						var _Gpfy = data.result.rows;
			            						var _house = [];
			            						for(var i=0;i<_Gpfy.length;i++){
			            							var _obj = {
			            									wydz:_Gpfy[i].wydz,
			            									jzmj:_Gpfy[i].jzmj,
			            									cq:_Gpfy[i].cq,
			            									nd:_Gpfy[i].nd,
			            									gpyxqqs:_Gpfy[i].gpyxqqs,
			            									gpyxqzz:_Gpfy[i].gpyxqzz
			            							}
			            							_house.push(_obj);
			            						}
			            						
			            						ajaxDom(pageNum,pageSize,_house);
			            					}else{
			            						$('table tbody').html('<tr><td class="err-td" colspan="7">暂无数据</td></tr>');
			            					}
			            				}
			            				
			            			}else{
			            				$('table tbody').html('<tr><td class="err-td" colspan="7">'+data.message+'</td></tr>');
			            			}
			            		},
			            		error:function(){
			            			$('table tbody').html('<tr><td class="err-td" colspan="7">数据查询失败，请重新尝试，或联系技术人员处理！谢谢~</td></tr>');
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
			$('table tbody').html('<tr><td class="err-td" colspan="7">数据查询失败，请重新尝试，或联系技术人员处理！谢谢~</td></tr>');
    	}
	});
}

var pageNum = 1;
var pageSize = 10;
var flag = true;
var _cq='';
var wydz='';
var gpyxqqs='';
var gpyxqzz='';


$(function(){
	//页面加载
	loadData(_cq,wydz,gpyxqqs,gpyxqzz,pageNum,pageSize);
	
	$('#searchBtn').on('click',function(){
		pageNum = 1;
		pageSize = 10;
		flag = true,
		_cq= $.trim($('#cq').val());
		wydz=$.trim($('#wydz').val());
		gpyxqqs = $('#startTime').val();
		gpyxqzz = $('#endTime').val();
		
		loadData(_cq,wydz,gpyxqqs,gpyxqzz,pageNum,pageSize);
	});
	
});