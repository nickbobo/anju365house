//操作函数集合对象
var obj = {
	//查询用户名及余额相关封装函数
	showSearchPart:function(status,params){
		$('.inputStatus').removeClass('search').removeClass('result');
		switch(status){
			case 'search':
				$('.inputStatus').addClass(status);
				break;
			case 'result':
				$('#userName').text('').text(params.userName);
				$('#userMoney').text('').text(params.userMoney + '元');
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
	ablePay:function(price){
		$('.sel-c li:not(.dis-sel)').on('click',function(){

			$(this).addClass('sel').siblings().removeClass('sel');
			parent.ablePay($(this).attr('data-discount') + '元');
			
		});

	},

}

//实现输入框只能输入数字
function ValidateNumber(e, pnumber) {

  if (!/^\d+$/.test(pnumber)) {
      $(e).val(/^\d+/.exec($(e).val()));
  }
  return false;
}


//获取套餐信息函数封装
function getMealInfo(oilNum){
	var getMeal = new relaxAJAX({
	    url:'../../charge/getGsInfo.svc',
	    data:{
	    	catgCode:'30400',
	    	card_type:'1'
	    },
        success:function(data){
        	
        	if(data.succ){
        		$('.priceErr').fadeOut(200);

            	$('.sel-c li').addClass('dis-sel');
            	for(var i = 0;i<data.result.length;i++){
            		$('.sel-c li[data-price="'+data.result[i].par_value+'"]').attr('data-id',data.result[i].gs_code).attr('data-discount',data.result[i].sale_price).removeClass('dis-sel');
            	}
    			//选择面值
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
            		//obj.showPart('priceErr','客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
            		break;
            	case 'parsererror':
            		$('.priceErr span').text('客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).parent().fadeIn(200);
            		//obj.showPart('priceErr','客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
            		break;
            	case 'abort':
            		$('.priceErr span').text('数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).parent().fadeIn(200);
            		//obj.showPart('priceErr','数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
            		break;
            	default:
            		$('.priceErr span').text('ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).parent().fadeIn(200);
            		//obj.showPart('priceErr','ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
            		break;
            }
        }

    });
    getMeal.send();
}


/* 效果js */
var sounds = document.getElementById('sounds');
$(function(){
	//避免号码在某些浏览器下缓存，主动清除该号码 modify by relax 2017/5/9
	setTimeout(function(){
		$('#oilNum').val("");
	},50);
	
	//号码输入框删除发音
	$('#oilNum').on('keydown paste',function(e){
		
		var key = e.keyCode;
		if(!(key >= 48 && key <= 57 || key >= 96 && key <= 105 || key == 8)){
			
			return false;
		}

	}).on('keyup paste',function(e){
		var key = e.keyCode;
		if(key >= 48 && key <= 57 || key >= 96 && key <= 105){
			if(sounds.value == 1){
				var _a = $.trim($(this).val());
				var num = parseInt(_a.charAt(_a.length - 1));
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
		}else if(key == 8){
			if(sounds.value == 1){
				if(browser == 'IE'){
					document.getElementById("voiceBack").controls.play();
				}else{
					//Reserved non IE
					document.getElementById("voiceBack").play();
				}
			}
			
			
			obj.showSearchPart(null,null);
			
			
			
		}else{
			return false;
		}
	});

	//qq输入操作
	var regOil = /^(100011\d{13})/;
	$('.sel-c li:not(.dis-sel)').unbind('click').removeClass('sel');
	$('#oilNum').on('keyup',function(){
		var T = $(this);
		var _v = $.trim(T.val());
		if(_v == null || _v == ''){
			$('.inputStatus').addClass('err');
			$('#phoneErr').text('加油卡输入框不能为空');
			obj.disPay();
		}else{
			$('.inputStatus').removeClass('err');
			//选择面值
			/*$('.sel-c li:not(.dis-sel)').on('click',function(){
				$(this).addClass('sel').siblings().removeClass('sel');
				obj.ablePay();
			});*/
		}
	}).on('blur',function(){
		var T = $(this);
		var _v = $.trim(T.val());
		if(!regOil.test(_v)){
			$('.inputStatus').addClass('err');
			$('#phoneErr').text('加油卡卡号格式不正确');
			obj.disPay();
			
			
			
			
			obj.showSearchPart(null,null);
			
			
			
		}else{
			$('.inputStatus').removeClass('err');
			
			
			
			
			obj.showSearchPart('search',null);
			
			
			
			
			//选择面值
			/*$('.sel-c li:not(.dis-sel)').on('click',function(){
				$(this).addClass('sel').siblings().removeClass('sel');
				obj.ablePay();
			});*/
			getMealInfo(_v);
		}
	});

	//获取面额失败点击重试按钮事件
	$('#reGetPrice').on('click',function(){
		getMealInfo($.trim($('#oilNum').val()));
	});//查询用户名及余额
	$('#searchInfo').on('click',function(){
		
		var ajaxTwo = new relaxAJAX({
			url:'../../interface/querychargeNumInfo.svc',
            data:{
            	cardType:'1',
            	catgCode:'30400',
            	chargeNumber:$.trim($('#oilNum').val())
            },
            success:function(data){
            	
            	if(data.succ){
            		obj.showSearchPart('result',{
            			userName:data.result.name,
            			userMoney:data.result.balance
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
        ajaxTwo.send();
	});

	var _input = new inputClear('inputClear',function(){
		$('.inputStatus').addClass('err');
		$('#phoneErr').text('加油卡输入框不能为空');
		obj.disPay();
		
		
		
		
		obj.showSearchPart(null,null);
		
	});

});


/* -----------------------------------父级调用内容-begin-------------------------------- */
function getOrderInfo(){

	var obj = {};

	obj['oilNum'] = $.trim($('#oilNum').val());
	obj['oilPay'] = $('.sel-c li.sel').text();

	return obj;
}
function getSubmitInfo(){
	var obj = {};

	obj['chargeNumber'] = $.trim($('#oilNum').val());
	obj['gsCode'] = $('.sel-c li.sel').attr('data-id');
	obj['price'] = $('.sel-c li.sel').attr('data-discount');

	return obj;
}
/* -----------------------------------父级调用内容-end---------------------------------- */

