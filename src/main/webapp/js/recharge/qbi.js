var timerTip;
var JF;
function countDown(){
	timerTip = setInterval(function(){
        var tmpTime = parseInt($('.okSubPicTip span').text());
        if(tmpTime > 1){
            $('.okSubPicTip span').text(tmpTime-1);
        }else{
            clearInterval(timerTip);
            
            //alert('恭喜你，充值成功～～');
            
            //location.reload();
            parent.location.reload();
        }
        
    },1000);
}


//操作函数集合对象
var obj = {
		
	//提交密码请求相关的提示封装函数
	showPartPwd:function(status,params){
		$('#phonePwdInput').removeClass('err').removeClass('subErr');
    	$('.submitToBack').addClass('dis-btn').attr('data-status','cancel');
		switch(status){
			case 'err':
				$('#pwdErr').text('').text(params);
				$('#phonePwdInput').addClass('err');
				break;
			case 'subErr':
				$('#pwdErr').text('').text(params);
				$('#phonePwdInput').addClass('subErr');
				$('.submitToBack').attr('data-status','cancel');
				break;
			default:
				$('.submitToBack').removeClass('dis-btn').attr('data-status','ok');
				break;
		}
	},
	//弹出框弹出位置动态调整函数
	fixPOP:function(){
		var H = $(window).height();
		var _h = $('.popinner').height();

		if(H>_h){
			if(_h <=0){
				$('.popinner').css('marginTop',0);
			}else{
				$('.popinner').css('marginTop',(H-_h)/2);
			}
		}
	},
	//弹出框调用函数
	openPOP:function(){

		$('.backView').fadeIn(200,function(){
			$('.pop').fadeIn(200);
			obj.fixPOP();
		});

	},
	closePOP:function(){

		$('.pop').fadeOut(200,function(){
			$('.backView').fadeOut(200);
		});

	},
	//禁用“立即充值”按钮函数
	disPay:function(){
		$('.okbtn').addClass('dis-btn').attr('data-status','cancel');
		$('.sel-c li').addClass('dis-sel');

		//眼睛初始化
		$('.eye-c').removeClass('eye-open').addClass('eye-close');
		$('.eye-c .eye-cover').show();
		
		
		$('#lookPrice').fadeOut(200);
	},
	//复用“立即充值”按钮函数
	ablePay:function(){
		$('.okbtn').removeClass('dis-btn').attr('data-status','ok');
		
		$('#lookPrice').fadeIn(200);
	},

}

/* --------------------------------数量加减相关函数-begin-------------------------------- */
//减按钮点击事件 添加class一个“minus”
function minusBtn(ele){
    var _this = $(ele);
    var _val = _this.parent().children('.inputValue');
    var currentValue = parseInt($.trim(_val.val()));
    if(!isNaN(currentValue)){
        if(currentValue > 1){
            currentValue -= 1;
            _val.val(currentValue);
            $('.eye-c').removeClass('eye-open').addClass('eye-close');
            ajaxFlag = true;
        }else{
            return;
        }
    }else{
        alert('只能填写填写数字');
    }
}
//加按钮事件 添加class一个“plus”
function plusBtn(ele){
    var _this = $(ele);
    var _val = _this.parent().children('.inputValue');
    var currentValue = parseInt($.trim(_val.val()));
    if(!isNaN(currentValue)){
        currentValue += 1;
        if(currentValue <= 1000){
        	_val.val(currentValue);
        	$('.eye-c').removeClass('eye-open').addClass('eye-close');
        	ajaxFlag = true;
        }else{
        	return;
        }
    }else{
        alert('只能填写填写数字');
    }
}
//input focus
function focusCheck(ele){
    var _this = $(ele);
    _this.val('');
}
//input blur
function blurCheck(ele){
    var _this = $(ele);
    var currentValue = parseInt($.trim(_this.val()));
    if(currentValue == 0 || isNaN(currentValue) || currentValue == null || currentValue == ''){
        _this.val(1);
        $('.eye-c').removeClass('eye-open').addClass('eye-close');
        ajaxFlag = true;
        return;
    }else{
    	/*if(currentValue > 1000){
    		_this.val(1000);
    		$('.eye-c').removeClass('eye-open').addClass('eye-close');
    		ajaxFlag = true;
    		return;
    	}*/
		$('.eye-c').removeClass('eye-open').addClass('eye-close');
		ajaxFlag = true;
    	if(currentValue > 1000){
    		_this.val(1000);
    		return;
    	}else{
    		_this.val(currentValue);
    	}
    }
}
/* --------------------------------数量加减相关函数-end-------------------------------- */
//判断是否满足充值条件
var condFlag = false;
//眼睛价格获取
var ajaxFlag = true;
var gll_gs_code = '';
var unit ;	//q币单价
//获取销售价
getPrice();
function getPrice(){
	var initGetPrice = new relaxAJAX({
	    url:'../../charge/getGsInfo.svc',
	    data:{
	    	catgCode:'30300',
	    	par_value:'1'
	    },
	    before:function(){
	        $('.getSealPrice').fadeOut(200);
	    },
	    success:function(data){
	       	
	       	if(data.succ){
	       		ajaxFlag = false;
	        	$('.getSealPrice').fadeOut(200);
	        	unit = parseFloat(data.result[0].sale_price).toFixed(2);
	        	
	        	gll_gs_code = data.result[0].gs_code;//存储商品id
	        	$('.submitToBack').attr('data-gscode',data.result[0].gs_code);
	        	
	        	condFlag = true;
	        	
	       	}else{
	       		ajaxFlag = true;
	       		$('#discountPrice').text('暂无');
	       		
	       		if(data.message){
	       			$('.getSealPrice').text(data.message).fadeIn(200);
	       		}else{
	       			$('.getSealPrice').text('系统出现异常').fadeIn(200);
	       		}
	       		
	       		condFlag = false;
	       	}
	       	
	    },
	    error:function(XMLHttpRequest, textStatus, errorThrown){	//textStatus: "timeout", "error", "abort", and "parsererror"
	       ajaxFlag = true;
	       condFlag = false;
	       $('#discountPrice').text('暂无');
	        switch(textStatus){
	        	case 'timeout':
	        		$('.getSealPrice').text('[销售价格获取]客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
	        		break;
	        	case 'parsererror':
	        		$('.getSealPrice').text('[销售价格获取]客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
	        		break;
	        	case 'abort':
	        		$('.getSealPrice').text('[销售价格获取]数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
	        		break;
	        	default:
	        		$('.getSealPrice').text('[销售价格获取]ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
	        		break;
	        }

	    }

	});
	initGetPrice.send();
}

function getSealPrice(BN){
	var sealPrice = new relaxAJAX({
        url:'../../charge/getGsInfo.svc',
        data:{
        	catgCode:'30300',
        	par_value:'1'
        },
        before:function(){
            $('.getSealPrice').fadeOut(200);
        },
        success:function(data){
           	
           	if(data.succ){
           		ajaxFlag = false;
            	$('.getSealPrice').fadeOut(200);
            	$('#discountPrice').text(parseFloat(data.result.sale_price)*parseInt(BN).toFixed(2) + '元');
               	$('.eye-c').removeClass('eye-close').addClass('eye-open');
           	}else{
           		/*$('.sel-c li:not(.dis-sel)').unbind('click').removeClass('sel');
    			obj.disPay();
    			$('#self-meal').fadeOut(200);*/
           		
           		ajaxFlag = true;
           		$('#discountPrice').text('暂无');
           		
           		if(data.message){
           			$('.getSealPrice').text(data.message).fadeIn(200);
           		}else{
           			$('.getSealPrice').text('系统出现异常').fadeIn(200);
           		}
           		
           	}
           	
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){	//textStatus: "timeout", "error", "abort", and "parsererror"
           ajaxFlag = true;
           $('#discountPrice').text('暂无');
            switch(textStatus){
            	case 'timeout':
            		$('.getSealPrice').text('[销售价格获取]客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
            		break;
            	case 'parsererror':
            		$('.getSealPrice').text('[销售价格获取]客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
            		break;
            	case 'abort':
            		$('.getSealPrice').text('[销售价格获取]数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
            		break;
            	default:
            		$('.getSealPrice').text('[销售价格获取]ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
            		break;
            }

        }

    });
    sealPrice.send();
}



function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}
/* 效果js */
var sounds = document.getElementById('sounds');
$(function(){
	$("#inputNum").keydown(function(event){
        var key = event.keyCode;
        console.log(key);
        if(!(key >= 48 && key <= 57 || key >= 96 && key <= 105 || key == 8 || key==229 || key==0)){
        	return false;
        }else{
        	return true;
        }
    });
	
	//避免号码在某些浏览器下缓存，主动清除该号码 modify by relax 2017/5/9
	setTimeout(function(){
		$('#qqNum').val("");
	},50);
	
	if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
	    $('[placeholder]').focus(function() {
	        var input = $(this);
	        if (input.val() == input.attr('placeholder')) {
	            input.val('');
	            input.removeClass('placeholder');
	        }
	    }).blur(function() {
	        var input = $(this);
	        if (input.val() == '' || input.val() == input.attr('placeholder')) {
	            input.addClass('placeholder');
	            input.val(input.attr('placeholder'));
	        }
	    }).blur();
	};
	
	
	
	
	//QQ号码处理事件
	//qq输入操作
	$('.sel-c li:not(.dis-sel)').unbind('click').removeClass('sel');
	var telNum = new relax_telNumber({

		id:'qqNum',
		template:"xxxxxxxxxxxxxxx",
		e_press:function(classObj,keyStr){
			var T = classObj.obj;
			var _qqNum = classObj.value;
			if(!isNaN(keyStr)){
				if(sounds.value == 1){
					if(browser == 'IE'){
						if(keyStr.indexOf(keyStr) > 0){
							document.getElementById("voice").URL = 'voice/' + keyStr + '.wav';
							document.getElementById("voice").controls.play();
						}else{
							document.getElementById("voice" + keyStr).controls.play();
						}
					}else{
						//Reserved non IE
						if(keyStr.indexOf(keyStr) > 0){
							document.getElementById("voice").src = 'voice/' + keyStr + '.wav';
							document.getElementById("voice").play();
						}else{
							document.getElementById("voice" + keyStr).play();
						}
					}
				}
			}else{
				if(sounds.value == 1){
					if(browser == 'IE'){
						document.getElementById("voiceBack").controls.play();
					}else{
						//Reserved non IE
						document.getElementById("voiceBack").play();
					}
				}
			}
			
			
			if(_qqNum == null || _qqNum == ''){
				$('#phoneNumInput').addClass('err');
				$('#phoneErr').text('qq输入框不能为空');
				$('.sel-c li:not(.dis-sel)').unbind('click').removeClass('sel');
				obj.disPay();
				$('#self-meal').fadeOut(200);
			}else{
				
				$('#phoneNumInput').removeClass('err');
				
				if(condFlag){
					
					$('.sel-c li').removeClass('dis-sel');
					//选择面值
					$('.sel-c li:not(.dis-sel)').on('click',function(){
						$(this).addClass('sel').siblings().removeClass('sel');
						if($(this).hasClass('other')){
							$('#self-meal').fadeIn(200);
						}else{
							$('#self-meal').fadeOut(200);

							
						}
						obj.ablePay();

						//眼睛操作
						$('.eye-c .eye-cover').hide();
						$('.eye-c').removeClass('eye-open').addClass('eye-close');
						ajaxFlag = true;
						//$('#discountPrice').text($(this).attr('data-discount') + '元');

					});
				}
				
			}
			
			
		}

	});

	//号码输入框删除发音
	/*$('#qqNum').on('keydown paste',function(e){
		
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
		}else{
			return false;
		}
	});

	
	//qq输入操作
	$('.sel-c li:not(.dis-sel)').unbind('click').removeClass('sel');
	$('#qqNum').on('keyup',function(){
		var T = $(this);
		var _v = $.trim(T.val());
		if(_v == null || _v == ''){
			$('#phoneNumInput').addClass('err');
			$('#phoneErr').text('qq输入框不能为空');
			$('.sel-c li:not(.dis-sel)').unbind('click').removeClass('sel');
			obj.disPay();
			$('#self-meal').fadeOut(200);
		}else{
			
			$('#phoneNumInput').removeClass('err');
			
			if(condFlag){
				
				$('.sel-c li').removeClass('dis-sel');
				//选择面值
				$('.sel-c li:not(.dis-sel)').on('click',function(){
					$(this).addClass('sel').siblings().removeClass('sel');
					if($(this).hasClass('other')){
						$('#self-meal').fadeIn(200);
					}else{
						$('#self-meal').fadeOut(200);

						
					}
					obj.ablePay();

					//眼睛操作
					$('.eye-c .eye-cover').hide();
					$('.eye-c').removeClass('eye-open').addClass('eye-close');
					ajaxFlag = true;
					//$('#discountPrice').text($(this).attr('data-discount') + '元');

				});
			}
			
		}
	});*/
		

	//眼睛切换效果
	$('.eye-c i').on('click',function(){
		if($(this).hasClass('i-close')){
			var buyNum ;

			//$('.getSealPrice').fadeOut(200);

			if($('.sel-c li.sel').hasClass('other')){
				buyNum = $.trim($("#inputNum").val());
			}else{
				buyNum = $('.sel-c li.sel').attr('data-price');
			}

			if(ajaxFlag){
				//getSealPrice(buyNum);
				$('#discountPrice').text(parseFloat(unit*buyNum).toFixed(2) + '元');
               	$('.eye-c').removeClass('eye-close').addClass('eye-open');
			}


			$(this).parent().removeClass('eye-close').addClass('eye-open');
		}else{
			$(this).parent().removeClass('eye-open').addClass('eye-close');
		}
	});

	

	//弹出框位置动态调整
	var timer; //定时器
	obj.fixPOP();
	$(window).on('resize',function(){
		clearTimeout(timer);
		timer = setTimeout(function(){
			obj.fixPOP();
		},200);
	});

	//弹出框取消关闭按钮点击事件
	$('.cancelBtn').on('click',function(){
		obj.closePOP();
	});

});



/*-------------------以下内容为涉及后台相关js-------------------*/
/* 数据交互js */ 
$(function(){


	//积分添加操作
	//========================================================
	//modify by relax 实例化积分业务对象
	JF=jfBusiness();
	//========================================
	$('.jf label').on('click',function(){
		var qbiPrice;
		if($('.sel-c li.sel').hasClass('other')){
			qbiPrice = $.trim($("#inputNum").val());
		}else{
			qbiPrice = $('.sel-c li.sel').attr('data-price');
		}
		JF.send("jfFrame",{
			gsCode:gll_gs_code,
			price:qbiPrice
		});
	});
	//“立即充值”按钮点击事件
	$('.okbtn').on('click',function(){
		//============== modify by relax ====================
		//这里做本地效果，所以临时省略了以下判定
		//修改时，请注意使用以下流程
		//1.按原来的流程把输入和选择数据回填到确认框对应DOM中
		//2.初始化密码输入框及提交，取消按钮
		//3.初始化积分余额及积分输入框
		//4.获得当前经销商选择的产品id编号，以及当前订单的总金额
		//5.发起AJAX请求服务端获取积分相关数据，传递产品id及订单总金额，获得积分余额，最小可用积分，最大可用积分，积分增长步长
		//6.1 AJAX成功，回填数据和设置状态
		//6.2 AJAX失败，提示重试或者直接禁止使用积分
		
		var qbiPrice;
		if($('.sel-c li.sel').hasClass('other')){
			qbiPrice = $.trim($("#inputNum").val());
		}else{
			qbiPrice = $('.sel-c li.sel').attr('data-price');
		}
		JF.send("jfFrame",{
			gsCode:gll_gs_code,
			price:qbiPrice
		});
		//===================================================
		
		
		if($(this).attr('data-status') == 'ok'){
			//初始化订单确认数据
			$('#orderQQ').text($.trim($('#qqNum').val()));
			if($('.sel-c li.sel').hasClass('other')){
				var a = $.trim($("#inputNum").val());
				$('#orderPay').text(a + ' Q币');
			}else{
				$('#orderPay').text($('.sel-c li.sel').text());
			}
			
			
			
			//初始化
			obj.showPartPwd(null,null);
			$('#pwd').val('');
			$('.submitToBack').addClass('dis-btn').attr('data-status','cancel');
			
			
			
			

			obj.openPOP();
		}else{
			return false;
		}
	});

	$('#pwd').on('keyup',function(){
		var pwd = $.trim($(this).val());
		if(pwd == null || pwd == ''){
			obj.showPartPwd('err','支付密码不能为空');
			return false;
		}else{
            obj.showPartPwd(null,null);
		}
	});

	//“确认并提交”按钮点击事件
	$('.submitToBack').on('click',function(){
		//密码前端校验
		if(!$(this).hasClass('dis-btn')){
			var pwd = $.trim($('#pwd').val());
			if(pwd.length < 6){
				obj.showPartPwd('err','支付密码长度过短');
				return false;
			}else{
				obj.showPartPwd(null,null);
			}
		}


		if($(this).attr('data-status') == 'ok' && !$(this).hasClass('dis-btn')){
			var T = $(this);
			var gs_code = $(this).attr('data-gscode');
			var qq_num = $.trim($('#qqNum').val());
			var _payPassword = $.trim($('#pwd').val());
			var _num;
			if($('.sel-c li.sel').hasClass('other')){
				_num = $.trim($("#inputNum").val());
			}else{
				_num = $('.sel-c li.sel').attr('data-price');
			}

			var ajaxThree = new relaxAJAX({
                url:'../../charge/recharge.svc',
                data:{
                	payPassword:_payPassword,
                	gsCode:gs_code,
                	catgCode:'30300',
					chargeNumber:qq_num,
					num:_num,
					payPoints:JF.data.JF
                },
                before:function(){
                    $('#popbtn').removeClass('success').addClass('loading');
                },
                success:function(data){
                	
                	if(data.succ){
                		$('#popbtn').removeClass('loading').addClass('success');
                		countDown();
                	}else{
                		$('#popbtn').removeClass('success').removeClass('loading');
                		
                		if(data.message){
                			obj.showPartPwd('subErr',data.message);
                		}else{
                			obj.showPartPwd('subErr','系统出现异常');
                		}
                		
                	}
                   	
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){	//textStatus: "timeout", "error", "abort", and "parsererror"
                    $('#popbtn').removeClass('success').removeClass('loading');
                    switch(textStatus){
                    	case 'timeout':
                    		obj.showPartPwd('subErr','客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                    		break;
                    	case 'parsererror':
                    		obj.showPartPwd('subErr','客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                    		break;
                    	case 'abort':
                    		obj.showPartPwd('subErr','数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                    		break;
                    	default:
                    		obj.showPartPwd('subErr','ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                    		break;
                    }
                }

            });
            ajaxThree.send();
		}else{
			return false;
		}
	});

});