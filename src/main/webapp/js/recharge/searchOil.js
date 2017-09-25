//分页数据获取函数
var count;	//总数据条数
var pageS = 10;	//每页显示十条数据
var initStatus = 0;	//分页初始化状态
var sDate;	//开始时间
var eDate;	//结束时间
var status;	//订单状态
var chargeNum;	//充值号码

function getData(p_sDate,p_eDate,p_status,p_chargeNum,currentPage,pageSize) {
    var ajaxOne = new relaxAJAX({
	    url:'../../orderHandling/getOrderInfo.svc',
        data:{
        	startDate:p_sDate,
        	endDate:p_eDate,
        	status:p_status,
        	chargeNumber:p_chargeNum,
        	catgCd:'30400',
        	pageNum:currentPage,
        	pageSize:pageSize
        },
        before:function(){
            $('.loadingTip').show();
            $('.errTip').hide();
        },
        success:function(data){
        	
            if(data.succ){
            	
            	$('.loadingTip').hide();
                $('.errTip').hide();	//需要判断后端是否出错
                
                var tmpHtml = '<tr><th>序号</th><th>订单编号</th><th>充值时间</th><th>号码</th><th>充值面值</th><th>状态</th></tr>';
              
            	if(data.result.total != 0){
            		
                    var info = data.result.rows;
                    count = data.result.total;
                    
                    for(var i = 0;i < info.length;i++){
                    	switch(parseInt(info[i].status)){
	                		case 1:
	                			tmpHtml += '<tr><td>'+parseInt(parseInt(currentPage-1)*pageSize+i+1)+'</td><td>'+info[i].orderId+'</td><td>'+info[i].startTime+'</td><td>'+info[i].chargeNumber+'</td><td>'+(info[i].parValue*info[i].num)+'</td><td>充值中</td></tr>';
	                			break;
	                		case 2:
	                			tmpHtml += '<tr><td>'+parseInt(parseInt(currentPage-1)*pageSize+i+1)+'</td><td>'+info[i].orderId+'</td><td>'+info[i].startTime+'</td><td>'+info[i].chargeNumber+'</td><td>'+(info[i].parValue*info[i].num)+'</td><td>成功</td></tr>';
	                			break;
	                		case 3:
	                			tmpHtml += '<tr><td>'+parseInt(parseInt(currentPage-1)*pageSize+i+1)+'</td><td>'+info[i].orderId+'</td><td>'+info[i].startTime+'</td><td>'+info[i].chargeNumber+'</td><td>'+(info[i].parValue*info[i].num)+'</td><td>失败</td></tr>';
	                			break;
	                		case 4:
	                			tmpHtml += '<tr><td>'+parseInt(parseInt(currentPage-1)*pageSize+i+1)+'</td><td>'+info[i].orderId+'</td><td>'+info[i].startTime+'</td><td>'+info[i].chargeNumber+'</td><td>'+(info[i].parValue*info[i].num)+'</td><td>撤单中</td></tr>';
	                			break;
	                		default:
	                			tmpHtml += '<tr><td>'+parseInt(parseInt(currentPage-1)*pageSize+i+1)+'</td><td>'+info[i].orderId+'</td><td>'+info[i].startTime+'</td><td>'+info[i].chargeNumber+'</td><td>'+(info[i].parValue*info[i].num)+'</td><td>无</td></tr>';
	                			break;
	                	}
                    	//tmpHtml += '<tr><td>'+parseInt(parseInt(currentPage-1)*pageSize+i+1)+'</td><td>'+info[i].orderId+'</td><td>'+info[i].startTime+'</td><td>'+info[i].chargeNumber+'</td><td>'+info[i].parValue+' * '+info[i].num+'</td><td>'+info[i].status+'</td></tr>';
                    }
                    $('.tableContainer table').empty().append(tmpHtml);

                    if(initStatus == 0){
                    	//分页
        	            $('#pageToolbar').empty().Paging({
        					pagesize:pageS,
        					count:count,
        					toolbar:true,
        					callback:function(page,size,count){
        						//alert('当前第 ' +page +'页,每页 '+size+'条,总页数：'+count+'页')
        						getData(sDate,eDate,status,chargeNum,page,pageS);
        					}
        				});

        				initStatus = 1;
                    }
            	}else{
            		
            		initStatus = 0;
            		$('.tableContainer table').empty().append('<tr><th>序号</th><th>订单编号</th><th>充值时间</th><th>号码</th><th>充值面值</th><th>状态</th></tr>');
            		$('.errTip').text('暂无数据！').fadeIn(200);
            		
            	}
            	
            }else{
            	$('.loadingTip').hide();
            	$('.tableContainer table').empty().append('<tr><th>序号</th><th>订单编号</th><th>充值时间</th><th>号码</th><th>充值面值</th><th>状态</th></tr>');
            	
            	if(data.message){
            		$('.errTip').text(data.message).fadeIn(200);
            	}else{
            		$('.errTip').text('系统出现异常').fadeIn(200);
            	}
            	
            }

        },
        error:function(XMLHttpRequest, textStatus, errorThrown){	//textStatus: "timeout", "error", "abort", and "parsererror"
            $('.loadingTip').hide();
            $('.tableContainer table').empty().append('<tr><th>序号</th><th>订单编号</th><th>充值时间</th><th>号码</th><th>充值面值</th><th>状态</th></tr>');

            switch(textStatus){
            	case 'timeout':
            		$('.errTip').text('客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
            		break;
            	case 'parsererror':
            		$('.errTip').text('客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
            		break;
            	case 'abort':
            		$('.errTip').text('数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
            		break;
            	default:
            		$('.errTip').text('ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
            		break;
            }
        }

    });
    ajaxOne.send();
}


/** 
* 获取本周、开端日期、停止日期 
*/ 
var now = new Date(); //当前日期 
var nowDayOfWeek = now.getDay(); //今天本周的第几天 
var nowDay = now.getDate(); //当前日 
var nowMonth = now.getMonth(); //当前月 
var nowYear = now.getYear(); //当前年 
nowYear += (nowYear < 2000) ? 1900 : 0; // 
//格局化日期：yyyy-MM-dd 
function formatDate(date) { 
	var myyear = date.getFullYear(); 
	var mymonth = date.getMonth()+1; 
	var myweekday = date.getDate(); 
	
	if(mymonth < 10){ 
	mymonth = "0" + mymonth; 
	} 
	if(myweekday < 10){ 
	myweekday = "0" + myweekday; 
	} 
	return (myyear+"-"+mymonth+"-"+myweekday); 
}
/** 
* 获取今天，昨天
*/ 
function GetFormatDate(AddDayCount) { 
	var dd = new Date();
	dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
	
	return formatDate(dd); 
}
//获得本周的开端日期 
function getWeekStartDate() { 
	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek); 
	return formatDate(weekStartDate); 
} 
//获得本周的停止日期 
function getWeekEndDate() { 
	var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)); 
	return formatDate(weekEndDate); 
} 


//获取用户选择的条件
function selConParam(){
	var today_s = GetFormatDate(0)+" "+"00:00:00";	//今天开始时间
	var today_e = GetFormatDate(0)+" "+"23:59:59";	//今天结束时间
	var preday_s = GetFormatDate(-1)+" "+"00:00:00";	//昨天开始时间
	var preday_e = GetFormatDate(-1)+" "+"23:59:59";	//昨天结束时间
	var week_s = getWeekStartDate()+" "+"00:00:00";	//本周开始时间
	var week_e = getWeekEndDate()+" "+"23:59:59";	//本周结束时间
	
	var _time = $('#time option:selected').val();
	switch(parseInt(_time)){
		case 1:
			sDate = today_s;	//开始时间
			eDate = today_e;	//结束时间
			break;
		case 2:
			sDate = preday_s;	//开始时间
			eDate = preday_e;	//结束时间
			break;
		case 3:
			sDate = week_s;	//开始时间
			eDate = week_e;	//结束时间
			break;
		default:
			sDate = today_s;	//开始时间
			eDate = today_e;	//结束时间
			break;
	}
	
	status = $('#status option:selected').val();
	chargeNum = $.trim($('#num').val());
}
$(function(){
	
	selConParam();
	//加载第一页数据
	getData(sDate,eDate,status,chargeNum,1,pageS);

	/*
	//分页数据
	$('#pageToolbar').empty().Paging({
		pagesize:10,
		count:count,
		toolbar:true,
		callback:function(page,size,count){
			//alert('当前第 ' +page +'页,每页 '+size+'条,总页数：'+count+'页')
			getData(page,10);
		}
	});*/

	//搜索按钮点击事件
	$('#searchBtn').on('click',function(){
		initStatus = 0;
		selConParam();
		getData(sDate,eDate,status,chargeNum,1,pageS);
	});
});