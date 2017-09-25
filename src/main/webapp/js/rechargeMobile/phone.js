//操作函数集合对象
var obj = {

	//手机号码输入提示封装函数
	showPart:function(ele,status,params){
		$('.inputStatus').removeClass('err').removeClass('ok').removeClass('loading');
		switch(status){
			case 'err':
				$('.priceErr').fadeOut(200);

				$('#phoneErr').html('').html(params);
				$('.inputStatus').addClass(status);
				obj.disPay();
				break;
			case 'ok':
				$('#phoneAddr').html('').html(params.phoneAddr +'&nbsp;[' + params.phoneCompany + ']').attr('data-orderOperator',params.phoneCompany).attr('data-orderAddr',params.phoneAddr).attr('data-orderCode',params.phoneCode);
				$('.inputStatus').addClass(status);
				//obj.ablePay();
				break;
			case 'loading':
				$('.inputStatus').addClass(status);
				obj.disPay();
				break;
			default:
				$('.priceErr').fadeOut(200);

				obj.disPay();
				break;

		}
	},
	//查询用户名及余额相关封装函数
	showSearchPart:function(status,params){
		$('.inputStatus').removeClass('search').removeClass('result');
		switch(status){
			case 'search':
				$('.inputStatus').addClass(status);
				break;
			case 'result':
				//$('#userName').text('').text(params.userName);
				//$('#userMoney').text('').text(params.userMoney + '元');
				$('#yue').text('').text(params.yue);
				$('.inputStatus').addClass(status);
				break;

		}
	},
	//禁用“立即充值”按钮函数
	disPay:function(){

		parent.disPay();
		$('.sel-c li:not(.dis-sel)').unbind('click').removeClass('sel');
		$('.sel-c li').addClass('dis-sel');

	},
	//复用“立即充值”按钮函数
	ablePay:function(){

		$('.sel-c li:not(.dis-sel)').on('click',function(){

			$(this).addClass('sel').siblings().removeClass('sel');
			parent.ablePay($(this).attr('data-discount') + '元');
			
		});

	},

};



/* 效果js */
var sounds = document.getElementById('sounds');
$(function(){

	//号码输入框删除发音
	$('#phoneNum').on('keyup',function(e){
		if(sounds.value == 1){
			var key = e.keyCode;
			if(key == 8){
				if(browser == 'IE'){
					document.getElementById("voiceBack").controls.play();
				}else{
					//Reserved non IE
					document.getElementById("voiceBack").play();
				}
			}
		}
	});

});


/* -----------------------------------父级调用内容-begin-------------------------------- */
function getOrderInfo(){
	var obj = {};
	obj['phoneNum'] = $.trim($('#phoneNum').val());
	obj['phoneCompany'] = $('#phoneAddr').attr('data-orderOperator');
	obj['phoneAddr'] = $('#phoneAddr').attr('data-orderAddr');
	obj['phonePay'] = $('.sel-c li.sel').text()

	return obj;
}
function getSubmitInfo(){
	var obj = {};
	obj['gsCode'] = $('.sel-c li.sel').attr('data-id');
	obj['price'] = $('.sel-c li.sel').attr('data-discount');
	obj['chargeNumber'] = phoneNum;
	
	return obj;
}
/* -----------------------------------父级调用内容-end---------------------------------- */


/*-------------------以下内容为涉及后台相关js-------------------*/
var phoneNum;	//用户填写的手机号码
var cityCode;	//归属地code
var operatorCd;	//运营商Code
var phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;	//手机格式正则
//获取产品信息
function getProductInfo(cityCode,operatorCd){
	var ajaxOneOne = new relaxAJAX({
        url:'../../charge/getGsInfo.svc',
        data:{
        	region_code:cityCode,
        	operator:operatorCd,
        	catgCode:'30100'
        },
        success:function(data){
        	
        	if(data.succ){
        		$('.priceErr').fadeOut(200);

            	$('.sel-c li').addClass('dis-sel');
            	for(var i = 0;i<data.result.length;i++){
            		if(data.result[i].par_value != 10 && data.result[i].par_value != 20 && data.result[i].par_value != 30 && data.result[i].par_value != 50 && data.result[i].par_value != 100 && data.result[i].par_value != 200 && data.result[i].par_value != 300 && data.result[i].par_value != 500){
            			continue;
            		}
            		$('.sel-c li[data-price="'+data.result[i].par_value+'"]').attr('data-id',data.result[i].gs_code).attr('data-discount',parseFloat(data.result[i].sale_price).toFixed(2)).removeClass('dis-sel');
            	}
                obj.ablePay();
        	}else{
        		obj.disPay();
        		
        		if(data.message){
        			$('.priceErr span').text(data.message).parent().fadeIn(200);
        		}else{
        			$('.priceErr span').text('系统出现异常').parent().fadeIn(200);
        		}
        		
        	}
            

        },
        error:function(XMLHttpRequest, textStatus, errorThrown){	//textStatus: "timeout", "error", "abort", and "parsererror"
            
			//obj.showSearchPart(null,null);
			obj.disPay();
            switch(textStatus){
            	case 'timeout':
            		$('.priceErr span').text('客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).parent().fadeIn(200);
            		break;
            	case 'parsererror':
            		$('.priceErr span').text('客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).parent().fadeIn(200);
            		break;
            	case 'abort':
            		$('.priceErr span').text('数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).parent().fadeIn(200);
            		break;
            	default:
            		$('.priceErr span').text('ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).parent().fadeIn(200);
            		break;
            }

        }

    });
    ajaxOneOne.send();
}


$(function(){
	//避免号码在某些浏览器下缓存，主动清除该号码 modify by relax 2017/5/9
	setTimeout(function(){
		$('#phoneNum').val("");
	},50);
	
	var _input = new inputClear('inputClear',function(){
		obj.showPart(null,null,null);
		obj.showSearchPart(null,null);
	});

	//手机号码处理事件
	var telNum = new relax_telNumber({

		id:'phoneNum',
		e_press:function(classObj,keyStr){
			var T = classObj.obj;

			if(!isNaN(keyStr)){
				var num = parseInt(keyStr);

				if(sounds.value == 1){
					if(browser == 'IE'){
						if(this.value.indexOf(num) > 0){
							document.getElementById("voice").URL = 'voice/' + num + '.wav';
							document.getElementById("voice").controls.play();
						}else{
							document.getElementById("voice" + num).controls.play();
						}	
					}else{
						//Reserved non IE
						if(this.value.indexOf(num) > 0){
							document.getElementById("voice").src = 'voice/' + num + '.wav';
							document.getElementById("voice").play();
						}else{
							document.getElementById("voice" + num).play();
						}
					}
				}
				
			}

			phoneNum = classObj.value;
			if(phoneNum.length >= 11){
				if(phoneReg.test(phoneNum)){
					obj.showSearchPart('search',null);
					var ajaxOne = new relaxAJAX({
		                url:'../../interface/getPhoneInfo.svc',
		                data:{
		                	chargeNum:phoneNum
		                },
		                before:function(){
		                    obj.showPart(T,'loading',null);
		                },
		                success:function(data){
		                	
		                	if(data.succ){
		                		obj.showPart(T,'ok',{
			                    	phoneCompany:data.result.operator,
			                    	phoneAddr:data.result.attribution,
			                    	phoneCode:data.result.cityCode
			                    });
		                		cityCode = data.result.cityCode;
		                		operatorCd = data.result.operatorCd;
		                		
		                		//获取产品信息
		                		getProductInfo(cityCode,operatorCd);
		                	}else{
		                		obj.showSearchPart(null,null);
		                		
		                		if(data.message){
		                			obj.showPart(T,'err',data.message);
		                		}else{
		                			obj.showPart(T,'err','系统出现异常');
		                		}
		                		
		                	}
		                    
		                },
		                error:function(XMLHttpRequest, textStatus, errorThrown){	//textStatus: "timeout", "error", "abort", and "parsererror"
		                    
							obj.showSearchPart(null,null);
		                    switch(textStatus){
		                    	case 'timeout':
		                    		obj.showPart(T,'err','客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
		                    		break;
		                    	case 'parsererror':
		                    		obj.showPart(T,'err','客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
		                    		break;
		                    	case 'abort':
		                    		obj.showPart(T,'err','数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
		                    		break;
		                    	default:
		                    		obj.showPart(T,'err','ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
		                    		break;
		                    }

		                }

		            });
		            ajaxOne.send();
		            
				}else{
					obj.showPart(T,'err','号码格式不正确');
					obj.showSearchPart(null,null);
				}
			}else{
				obj.showPart(T,null,null);
				obj.showSearchPart(null,null);
			}
		}

	});

	//获取面额失败点击重试按钮事件
	$('#reGetPrice').on('click',function(){
		/*var reAjaxOneOne = new relaxAJAX({
            url:'phonePrice.php',
            data:{

            },
            success:function(data){

                $('.priceErr').fadeOut(200);

            	$('.sel-c li').addClass('dis-sel');
            	for(var i = 0;i<data.length;i++){
            		$('.sel-c li[data-price="'+data[i].price+'"]').attr('data-id',data[i].id).attr('data-discount',data[i].salePrice).removeClass('dis-sel');
            	}
                obj.ablePay();

            },
            error:function(XMLHttpRequest, textStatus, errorThrown){	//textStatus: "timeout", "error", "abort", and "parsererror"
                
				//obj.showSearchPart(null,null);
				obj.disPay();
                switch(textStatus){
                	case 'timeout':
                		$('.priceErr span').text('客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                		break;
                	case 'parsererror':
                		$('.priceErr span').text('客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                		break;
                	case 'abort':
                		$('.priceErr span').text('数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                		break;
                	default:
                		$('.priceErr span').text('ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                		break;
                }

            }

        });
        reAjaxOneOne.send();*/
		
		//重新获取产品信息
		getProductInfo(cityCode,operatorCd);
	});

	//查询用户名及余额
	/* modify by relax 2017/4/13 应对有时候查询余额AJAX延时比较大的情况 放在事件中做实例化显然不能让类文件中的禁止多次点击重复提交AJAX请求的功能生效*/
	var ajaxTwo2=new relaxAJAX();
	ajaxTwo2.url='../../interface/querychargeNumInfo.svc';
	var T=$('#phoneNum');
	var thisObj=$('#searchInfo');
	ajaxTwo2.before=function(){
		thisObj.addClass("loading");
	};
	ajaxTwo2.success=function(data){
		console.log("ajax success ~~~~~~~");
		thisObj.removeClass("loading");
		if(data.succ){
    		obj.showSearchPart('result',{
    			//userName:data.result.realName,
    			//userMoney:data.result.balance
    			yue:data.result.remarks
			});
    	}else{
    		if(data.message){
    			parent.shortTimeTip(data.message);
    		}else{
    			parent.shortTimeTip('查询用户名及余额失败，请点击重试！系统出现异常');
    		}
            //查询用户名及余额失败后重置
			obj.showSearchPart('search',null);
    	}
	};
	ajaxTwo2.error=function(code,message){
		thisObj.removeClass("loading");
		parent.shortTimeTip(message);
		//查询用户名及余额失败后重置
		obj.showSearchPart('search',null);
	}
	$('#searchInfo').click(function(){
		ajaxTwo2.data={
			regionCode:cityCode,
	     	operator:operatorCd,
	     	catgCode:'30100',
	     	chargeNumber:phoneNum
		};
		ajaxTwo2.send();
	});
});