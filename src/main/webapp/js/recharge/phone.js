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

	//手机号码输入提示封装函数
	showPart:function(status,params){
		$('#phoneNumInput').removeClass('err').removeClass('ok').removeClass('loading');
		switch(status){
			case 'err':
				$('.priceErr').fadeOut(200);

				$('#phoneErr').text('').text(params);
				$('#phoneNumInput').addClass(status);
				obj.disPay();
				break;
			case 'ok':
				$('#phoneAddr').html('').html(params.phoneAddr +'&nbsp;[' + params.phoneCompany + ']').attr('data-orderOperator',params.phoneCompany).attr('data-orderAddr',params.phoneAddr).attr('data-orderCode',params.phoneCode);
				$('#phoneNumInput').addClass(status);
				//obj.ablePay();
				break;
			case 'loading':
				$('#phoneNumInput').addClass(status);
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
		$('#phoneNumInput').removeClass('search').removeClass('result');
		switch(status){
			case 'search':
				$('#phoneNumInput').addClass(status);
				break;
			case 'result':
				/*$('#userName').text('').text(params.userName);
				$('#userMoney').text('').text(params.userMoney + '元');*/
				$('#yue').text('').text(params.yue);
				$('#phoneNumInput').addClass(status);
				break;

		}
	},
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
		$('.sel-c li:not(.dis-sel)').unbind('click').removeClass('sel');
		$('.sel-c li').addClass('dis-sel');

		//眼睛初始化
		$('.eye-c').removeClass('eye-open').addClass('eye-close');
		$('.eye-c .eye-cover').show();
		
		
		$('#lookPrice').fadeOut(200);
	},
	//复用“立即充值”按钮函数
	ablePay:function(){
		$('.sel-c li:not(.dis-sel)').on('click',function(){
			$(this).addClass('sel').siblings().removeClass('sel');
			$('.okbtn').removeClass('dis-btn').attr('data-status','ok');

			//眼睛操作
			$('.eye-c .eye-cover').hide();
			$('#discountPrice').text($(this).attr('data-discount') + '元');
			
			$('#lookPrice').fadeIn(200);
		});
	},

}

//弹出框实例化
var dialog=dialogShow();


/* 效果js */
var sounds = document.getElementById('sounds');
$(function(){
	//避免号码在某些浏览器下缓存，主动清除该号码 modify by relax 2017/5/9
	setTimeout(function(){
		$('#phoneNum').val("");
	},50);
	
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

	//眼睛切换效果
	$('.eye-c i').on('click',function(){
		if($(this).hasClass('i-close')){
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
    ajaxOneOne.send();
}
/* 数据交互js */ 
$(function(){

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
		                    obj.showPart('loading',null);
		                },
		                success:function(data){
		                	
		                	if(data.succ){
		                		obj.showPart('ok',{
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
		                			obj.showPart('err',data.message);
		                		}else{
		                			obj.showPart('err','系统出现异常');
		                		}
		                	}
		                    
		                },
		                error:function(XMLHttpRequest, textStatus, errorThrown){	//textStatus: "timeout", "error", "abort", and "parsererror"
		                    
		                	obj.showSearchPart(null,null);
		                    switch(textStatus){
		                    	case 'timeout':
		                    		obj.showPart('err','客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
		                    		break;
		                    	case 'parsererror':
		                    		obj.showPart('err','客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
		                    		break;
		                    	case 'abort':
		                    		obj.showPart('err','数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
		                    		break;
		                    	default:
		                    		obj.showPart('err','ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
		                    		break;
		                    }
		                }

		            });
		            ajaxOne.send();
		            
				}else{
					obj.showPart('err','号码格式不正确');
					obj.showSearchPart(null,null);
				}
			}else{
				obj.showPart(null,null);
				obj.showSearchPart(null,null);
			}
		}

	});

	//获取面额失败点击重试按钮事件
	$('#reGetPrice').on('click',function(){
		/*var reAjaxOneOne = new relaxAJAX({
            url:'phonePrice.php',
            data:{
            	ttt:'ddd'
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
        reAjaxOneOne.send();*/
		
		//重新获取产品信息
		getProductInfo(cityCode,operatorCd);
	});

	//查询用户名及余额
	/* modify by relax 2017/4/12 应对有时候查询余额AJAX延时比较大的情况 放在事件中做实例化显然不能让类文件中的禁止多次点击重复提交AJAX请求的功能生效*/
	var ajaxTwo=new relaxAJAX();
	ajaxTwo.url='../../interface/querychargeNumInfo.svc';
	$('#searchInfo').on('click',function(){
		var T=$('#phoneNum');
		var thisObj=$(this);
		ajaxTwo.data={
			regionCode:cityCode,
         	operator:operatorCd,
         	catgCode:'30100',
         	chargeNumber:phoneNum
        };
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
        			dialog.open("fullDialog",data.message,"error","","auto");
        		}else{
        			dialog.open("fullDialog",'查询用户名及余额失败，请点击重试！系统出现异常',"error","","auto");
        		}
        		
        		//alert('查询用户名及余额失败！'+data.message);
        		//查询用户名及余额失败后重置
				obj.showSearchPart('search',null);
        	}
        };
        //ajaxTwo.error=function(XMLHttpRequest, textStatus, errorThrown){	//textStatus: "timeout", "error", "abort", and "parsererror"
        ajaxTwo.error=function(code, message){
        	thisObj.removeClass("loading");
        	dialog.open("fullDialog",message,"error","","auto");
	        //查询用户名及余额失败后重置
			obj.showSearchPart('search',null);
        };
        ajaxTwo.send();
		
		/*
		var ajaxTwo = new relaxAJAX({
			 url:'../../interface/querychargeNumInfo.svc',
             data:{
             	regionCode:cityCode,
             	operator:operatorCd,
             	catgCode:'30100',
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
            			dialog.open("fullDialog",data.message,"error","","auto");
            		}else{
            			dialog.open("fullDialog",'查询用户名及余额失败，请点击重试！系统出现异常',"error","","auto");
            		}
            		
            		//alert('查询用户名及余额失败！'+data.message);
            		//查询用户名及余额失败后重置
    				obj.showSearchPart('search',null);
            	}
				
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){	//textStatus: "timeout", "error", "abort", and "parsererror"
                switch(textStatus){
                	case 'timeout':
                		dialog.open("fullDialog",'客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState,"error","","auto");
                		//alert('客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                		break;
                	case 'parsererror':
                		dialog.open("fullDialog",'客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState,"error","","auto");
                		//alert('客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                		break;
                	case 'abort':
                		dialog.open("fullDialog",'数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState,"error","","auto");
                		//alert('数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                		break;
                	default:
                		dialog.open("fullDialog",'ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState,"error","","auto");
                		//alert('ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                		break;
                }
                //查询用户名及余额失败后重置
				obj.showSearchPart('search',null);
            }

        });
        */
	});

	
	
	//积分添加操作
	//========================================================
	//modify by relax 实例化积分业务对象
	JF=jfBusiness();
	//========================================
	$('.jf label').on('click',function(){
		JF.send("jfFrame",{
			gsCode:$('.sel-c li.sel').attr('data-id'),
			price:$('.sel-c li.sel').attr('data-discount')
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
		JF.send("jfFrame",{
			gsCode:$('.sel-c li.sel').attr('data-id'),
			price:$('.sel-c li.sel').attr('data-discount')
		});
		//===================================================
		
		
		if($(this).attr('data-status') == 'ok'){
			//初始化订单确认数据
			$('#orderPhone').text($.trim($('#phoneNum').val()));
			$('#orderOperator').text($('#phoneAddr').attr('data-orderOperator'));
			$('#orderAddr').text($('#phoneAddr').attr('data-orderAddr'));
			$('#orderPay').text($('.sel-c li.sel').text());
			
			
			
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
			var _gsCode = $('.sel-c li.sel').attr('data-id');
			var _payPassword = $.trim($('#pwd').val());

			var ajaxThree = new relaxAJAX({
                url:'../../charge/recharge.svc',
                data:{
                	payPassword:_payPassword,
                	gsCode:_gsCode,
                	catgCode:'30100',
					chargeNumber:phoneNum,
					num:1,
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