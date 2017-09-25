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
		$('.other select').empty().append('<option disabled="disabled" selected="selected" value="">其他流量值</option>');

		parent.disPay();
		$('.sel-c li:not(.dis-sel)').unbind('click').removeClass('sel');
		$('.sel-c li').addClass('dis-sel');

		$('.input-meal').removeClass('ok').addClass('no');
		$('.sel-meal div').removeClass('sel');
	},
	//复用“立即充值”按钮函数
	ablePay:function(){
		$('.sel-c li:not(.dis-sel)').on('click',function(){
			$(this).addClass('sel').siblings().removeClass('sel');
			var _meal = $(this).text();

			//parent.disEye();
			parent.disPay();
			
			if($('.sel-c li.sel').hasClass('other')){

				parent.disPay();
				//$('.input-meal').removeClass('ok').addClass('no');
				$('.sel-meal div').removeClass('sel');

				/*$('.other select').on('change',function(){
					console.log('ttt');
					var a =$(this).children('option:selected').text();//这就是selected的值
					if(a == '其他面值'){
						$('.input-meal').removeClass('ok').addClass('no');
						return false;
					}else{

						var htmlTmp = '';
						$.each(obj.getMealInfo(a,objFromBack),function(index,obj){
							htmlTmp += '<div class="btn non-btn" data-price="'+ obj.sale_price +'" data-id="'+obj.gs_code+'">'+obj.use_range__name__+'&nbsp;&nbsp;'+obj.effect_type__name__+'&nbsp;&nbsp;'+obj.effect_period__name__ +'</div>';
						});
						$('.sel-meal').empty().append(htmlTmp);

						$('.input-meal').removeClass('no').addClass('ok');

					}
				});*/
				
			}else{

				var htmlTmp1 = '';
				$.each(obj.getMealInfo(_meal,objFromBack),function(index,obj){
					htmlTmp1 += '<div class="btn non-btn" data-price="'+ obj.sale_price +'" data-id="'+obj.gs_code+'">'+ obj.use_range__name__+'&nbsp;&nbsp;'+obj.effect_type__name__+'&nbsp;&nbsp;'+obj.effect_period__name__  +'</div>';
				});
				$('.sel-meal').empty().append(htmlTmp1);

				$('.input-meal').removeClass('no').addClass('ok');
			}
			$('.sel-meal').on('click','div',function(){

				$(this).addClass('sel').siblings().removeClass('sel');

				parent.ablePay($(this).attr('data-price') + '元');
		
			});
		});
		
		
		$('.other').on('click',function(){
			var _t = $('.other select').children('option:selected').text();
			if(_t == '其他流量值'){
				$('.other').removeClass('sel');
				$('.input-meal').removeClass('ok').addClass('no');
				return false;
			}else{
				$('.other').addClass('sel');
				
				
				var htmlTmp = '';
				$.each(obj.getMealInfo(_t,objFromBack),function(index,obj){
					htmlTmp += '<div class="btn non-btn" data-price="'+ obj.sale_price +'" data-id="'+obj.gs_code+'">'+obj.use_range__name__+'&nbsp;&nbsp;'+obj.effect_type__name__+'&nbsp;&nbsp;'+obj.effect_period__name__ +'</div>';
				});
				
				$('.sel-meal').empty().append(htmlTmp);

				$('.input-meal').removeClass('no').addClass('ok');
			}
		});
		$('.other select').on('change',function(){
			var a =$(this).children('option:selected').text();//这就是selected的值
			if(a == '其他流量值'){
				$('.input-meal').removeClass('ok').addClass('no');
				$('.other').removeClass('sel');
				return false;
			}else{
				
				$(this).parent().addClass('sel');
				
				
				var htmlTmp = '';
				$.each(obj.getMealInfo(a,objFromBack),function(index,obj){
					htmlTmp += '<div class="btn non-btn" data-price="'+ obj.sale_price +'" data-id="'+obj.gs_code+'">'+obj.use_range__name__+'&nbsp;&nbsp;'+obj.effect_type__name__+'&nbsp;&nbsp;'+obj.effect_period__name__ +'</div>';
				});
				
				$('.sel-meal').empty().append(htmlTmp);

				$('.input-meal').removeClass('no').addClass('ok');

			}
		});
	},
	getMealInfo:function(mealName,allData){
		var tmp = [];
		$.each(allData,function(index,obj){
			if(obj.flow_value.toLowerCase() == mealName.toLowerCase()){
				tmp.push(obj);
			}
		});

		return tmp;
	},

}



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
	obj['liuliangNum'] = $.trim($('#phoneNum').val());
	obj['liuliangCompany'] = $('#phoneAddr').attr('data-orderOperator');
	obj['liuliangAddr'] = $('#phoneAddr').attr('data-orderAddr');
	if($('.sel-c li.sel').hasClass('other')){
		var a = $(".other select option:selected").text();
		if(a == '其他流量值'){
			alert('请选择流量值');
			return false;
		}else{
			obj['liuliangPay'] = a;
		}
	}else{
		obj['liuliangPay'] = $('.sel-c li.sel').text();
	}
	obj['liuliangInfo'] = $('.sel-meal div.sel').text();

	return obj;
}
function getSubmitInfo(){
	var obj = {};
	obj['gsCode'] = $('.sel-meal div.sel').attr('data-id');
	obj['price'] = $('.sel-meal div.sel').attr('data-price');
	obj['chargeNumber'] = phoneNum;
	
	return obj;
}
/* -----------------------------------父级调用内容-end---------------------------------- */


/*-------------------以下内容为涉及后台相关js-------------------*/
//数组去重
Array.prototype.unique = function()
{
    var n = [this[0]]; //结果数组
    for(var i = 1; i < this.length; i++) //从第二项开始遍历
    {
        //如果当前数组的第i项在当前数组中第一次出现的位置不是i，
        //那么表示第i项是重复的，忽略掉。否则存入结果数组
        if (this.indexOf(this[i]) == i) n.push(this[i]);
    }
    return n;
}
//流量面额排序
function flowBySort(paramArray){
	var mArray = [];
	var gArray = [];

	$.each(paramArray,function(key,value){
		if(value.charAt(value.length-1).toLowerCase() == 'm'){
			mArray.push(value);
		}
		if(value.charAt(value.length-1).toLowerCase() == 'g'){
			gArray.push(value);
		}
	});
	mArray.sort(function(a,b){
		return a.substr(0,a.length-1)-b.substr(0,b.length-1)
	});
	gArray.sort(function(a,b){
		return a.substr(0,a.length-1)-b.substr(0,b.length-1)
	});

	return mArray.concat(gArray);
}

var objFromBack ; //后段返回的关于面值方面数据
var phoneNum;	//用户填写的手机号码
var operatorCd	//运营商code
var cityCode;	//归属地code
var phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;	//手机格式正则
//获取产品信息
function getProductInfo(cityCode,operatorCd){
	var ajaxOneOne = new relaxAJAX({
        url:'../../charge/getGsInfo.svc',
        data:{
        	region_code:cityCode,
        	operator:operatorCd,
        	catgCode:'30200'
        },
        timeout:10000,
        success:function(data){
        	
        	if(data.succ){
        		
        		$('.priceErr').fadeOut(200);

            	objFromBack = data.result;

            	var otherMeal = [];
            	for(var i = 0;i<data.result.length;i++){
            		$('.sel-c li[data-meal="'+data.result[i].flow_value.toLowerCase()+'"]').removeClass('dis-sel');
            		if(data.result[i].flow_value.toLowerCase() != '1g' && data.result[i].flow_value.toLowerCase() != '500m' && data.result[i].flow_value.toLowerCase() != '300m' && data.result[i].flow_value.toLowerCase() != '150m' ){
            			otherMeal.push(data.result[i].flow_value.toUpperCase());
            		}
            	}
            	otherMeal = flowBySort(otherMeal.unique());

            	var htmlTmp = '<option disabled="disabled" selected="selected" value="">其他流量值</option>';
            	$.each(otherMeal,function(index,obj){
            		htmlTmp += '<option value="">'+ obj +'</option>';
            	});
            	$('.other select').empty().append(htmlTmp);
            	$('.sel-c li.other').removeClass('dis-sel');

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
					obj.showSearchPart('search',null);	//这里不涉及查询余额，故注销
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
            
            url:'liuliangPrice.php',
            data:{

            },
            success:function(data){

                $('.priceErr').fadeOut(200);

            	objFromBack = data;

            	var otherMeal = [];
            	for(var i = 0;i<data.length;i++){
            		$('.sel-c li[data-meal="'+data[i].liuliang+'"]').removeClass('dis-sel');
            		if(data[i].liuliang != '1G' && data[i].liuliang != '500M' && data[i].liuliang != '300M' && data[i].liuliang != '150M' ){
            			otherMeal.push(data[i].liuliang);
            		}
            	}
            	otherMeal = otherMeal.unique();

            	var htmlTmp = '<option disabled="disabled" selected="selected" value="">其他面值</option>';
            	$.each(otherMeal,function(index,obj){
            		htmlTmp += '<option value="1">'+ obj +'</option>';
            	});
            	$('.other select').empty().append(htmlTmp);
            	$('.sel-c li.other').removeClass('dis-sel');

                obj.ablePay();

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
        reAjaxOneOne.send();*/
		
		//获取产品信息
		getProductInfo(cityCode,operatorCd);
		
	});

	//查询用户名及余额
	/* modify by relax 2017/4/13 应对有时候查询余额AJAX延时比较大的情况 放在事件中做实例化显然不能让类文件中的禁止多次点击重复提交AJAX请求的功能生效 */
	var ajaxTwo=new relaxAJAX();
	ajaxTwo.url='../../interface/querychargeNumInfo.svc';
	var T=$('#phoneNum');
	var thisObj=$('#searchInfo');
	ajaxTwo.before=function(){
		thisObj.addClass("loading");
	};
	ajaxTwo.success=function(data){
		thisObj.removeClass("loading");
		if(data.succ){
    		obj.showSearchPart('result',{
    			//userName:data.result.name,
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
	ajaxTwo.error=function(code,message){
		thisObj.removeClass("loading");
		parent.shortTimeTip(message);
		//查询用户名及余额失败后重置
		obj.showSearchPart('search',null);
	};
	$('#searchInfo').on('click',function(){
		ajaxTwo.data={
			regionCode:cityCode,
	     	operator:operatorCd,
	     	catgCode:'30100',
	     	chargeNumber:phoneNum
		};
		ajaxTwo.send();
		/*
		var ajaxTwo = new relaxAJAX({
			 url:'../../interface/querychargeNumInfo.svc',
             data:{
             	regionCode:cityCode,
             	operator:operatorCd,
             	catgCode:'30200',
             	chargeNumber:phoneNum
             },
            success:function(data){
            	
            	if(data.succ){
            		obj.showSearchPart('result',{
            			//userName:data.result.name,
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
            	
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){	//textStatus: "timeout", "error", "abort", and "parsererror"
                switch(textStatus){
                	case 'timeout':
                		parent.shortTimeTip('客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                		break;
                	case 'parsererror':
                		parent.shortTimeTip('客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                		break;
                	case 'abort':
                		parent.shortTimeTip('数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                		break;
                	default:
                		parent.shortTimeTip('ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                		break;
                }
                //查询用户名及余额失败后重置
				obj.showSearchPart('search',null);
            }

        });
        */
	});
});