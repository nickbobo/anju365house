function toPage(_num){
    window.location.href = 'verification.html?houseNum='+_num;
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
    		<td>'+(obj[i].ownershipNumber ? obj[i].ownershipNumber : "--")+'</td>\
    		<td>'+(obj[i].houseNumber ? obj[i].houseNumber : "--")+'</td>\
    		<td>'+(obj[i].proDate ? obj[i].proDate : "--")+'</td>\
    		<td>'+obj[i].applicantNature+'</td>\
    		<td>'+obj[i].ownerName+'</td>\
    		<td>'+obj[i].applicantName+'</td>\
    		<td>'+obj[i].mobile+'</td>\
    		<td>'+dealType[obj[i].transType]+'</td>\
    		<td>'+isHang[obj[i].isOn]+'</td>';
		
			if(obj[i].proStatus == 0){
				_html += '<td class="noHandle">'+houseCheckStatus[obj[i].proStatus]+'</td>';
			}
			if(obj[i].proStatus == 1){
				_html += '<td class="pass">'+houseCheckStatus[obj[i].proStatus]+'</td>';
			}
			if(obj[i].proStatus == 2){
				_html += '<td class="unPass">'+houseCheckStatus[obj[i].proStatus]+'</td>';
			}
    		
    		_html += '<td><a href="javascript:toPage(\''+obj[i].id+'\')" class="underline-a set-a">查看详情</a></td>\
    	</tr>';
	}
	$('table tbody').html(_html);
}
//加载列表数据函数
function loadData(houseNum,startTime,endTime,isPass,type,pageNum,pageSize){
	/* obtain data */
	$.ajax({
		url:'../../houseVerifi/getHouseInfoPage.svc',
		type:'POST',
		data:JSON.stringify({
			houseNum:houseNum,	//产权证号
			startTime:startTime,	//开始日期
			endTime:endTime,		//结束日期
			isPass:isPass,		//是否通过验证  1是、0否
			type:type,			//1房源公示信息列表、0房源列表
			pageNum:pageNum,
			pageSize:pageSize
		}),
		success:function(data){
			if(data.succ){
				var _total = data.result.total;
				if(isArray(data.result.houseInfo)){
					if(data.result.houseInfo.length != 0){
						var _houseInfo = data.result.houseInfo;
						var _house = [];
						for(var i=0;i<_houseInfo.length;i++){
							var _obj = {
								ownershipNumber:_houseInfo[i].ownershipNumber,
								houseNumber:_houseInfo[i].houseNumber,
								proDate:_houseInfo[i].proDate,
								applicantNature:_houseInfo[i].applicantNature,
								ownerName:_houseInfo[i].ownerName,
								applicantName:_houseInfo[i].applicantName,
								mobile:_houseInfo[i].mobile,
								transType:_houseInfo[i].transType,
								isOn:_houseInfo[i].isOn,
								proStatus:_houseInfo[i].proStatus,
								id:_houseInfo[i].id
							}
							_house.push(_obj);
						}
						
						ajaxDom(pageNum,pageSize,_house);
					}else{
						$('table tbody').html('<tr><td class="err-td" colspan="12">暂无数据</td></tr>');
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
			            		url:'../../houseVerifi/getHouseInfoPage.svc',
			            		type:'POST',
			            		data:JSON.stringify({
			            			houseNum:houseNum,	//产权证号
			            			startTime:startTime,	//开始日期
			            			endTime:endTime,		//结束日期
			            			isPass:isPass,		//是否通过验证  1是、0否
			            			type:type,			//1房源公示信息列表、0房源列表
			            			pageNum:pageNum,
			            			pageSize:pageSize
			            		}),
			            		success:function(data){
			            			if(data.succ){
			            				if(isArray(data.result.houseInfo)){
			            					if(data.result.houseInfo.length != 0){
			            						var _houseInfo = data.result.houseInfo;
			            						var _house = [];
			            						for(var i=0;i<_houseInfo.length;i++){
			            							var _obj = {
		            									ownershipNumber:_houseInfo[i].ownershipNumber,
		            									houseNumber:_houseInfo[i].houseNumber,
		            									proDate:_houseInfo[i].proDate,
		            									applicantNature:_houseInfo[i].applicantNature,
		            									ownerName:_houseInfo[i].ownerName,
		            									applicantName:_houseInfo[i].applicantName,
		            									mobile:_houseInfo[i].mobile,
		            									transType:_houseInfo[i].transType,
		            									isOn:_houseInfo[i].isOn,
		            									proStatus:_houseInfo[i].proStatus,
		            									id:_houseInfo[i].id
			            							}
			            							_house.push(_obj);
			            						}
			            						
			            						ajaxDom(pageNum,pageSize,_house);
			            					}else{
			            						$('table tbody').html('<tr><td class="err-td" colspan="12">暂无数据</td></tr>');
			            					}
			            				}
			            				
			            			}else{
			            				$('table tbody').html('<tr><td class="err-td" colspan="12">'+data.message+'</td></tr>');
			            			}
			            		},
			            		error:function(){
			            			$('table tbody').html('<tr><td class="err-td" colspan="12">房源验证数据查询失败，请重新尝试，或联系技术人员处理！谢谢~</td></tr>');
			            		}
			                });
			            }
			        });
					flag = false;
				}
				
			}else{
				$('table tbody').html('<tr><td class="err-td" colspan="12">'+data.message+'</td></tr>');
			}
		},
		error:function(){
			$('table tbody').html('<tr><td class="err-td" colspan="12">房源验证数据查询失败，请重新尝试，或联系技术人员处理！谢谢~</td></tr>');
    	}
	});
}

var pageNum = 1;
var pageSize = 10;
var flag = true;
var houseNum = '';
var startTime = '';
var endTime = '';
var isPass = '';
var type = 0;

$(function(){
	//页面加载
	loadData(houseNum,startTime,endTime,isPass,type,pageNum,pageSize);
	
	$('#searchBtn').on('click',function(){
		pageNum = 1;
		flag = true,
		
		houseNum = $.trim($('#houseNumInput').val());
		startTime = $('#startTime').val();
		endTime = $('#endTime').val();
		isPass = JS_getCheckValue('pass',document);
		
		loadData(houseNum,startTime,endTime,isPass,type,pageNum,pageSize);
	});
	
});