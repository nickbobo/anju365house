var timerTip;
var JF;
function countDown(_ele){
	timerTip = setInterval(function(){
        var tmpTime = parseInt($('#'+_ele).find('.okSubPicTip span').text());
        if(tmpTime > 1){
        	$('#'+_ele).find('.okSubPicTip span').text(tmpTime-1);
        }else{
            clearInterval(timerTip);
            
            //alert('恭喜你，充值成功～～');
            
            location.reload();
        }
        
    },1000);
}


var relaxFrame;
var dialog;

/*
    函数：存储指定名字的数据
    n:存储的数据key值（存储数据的名字）
    d:存储的数据
*/
function setStroageValue(n,d){
    try{
        if(window.localStorage){
            localStorage.removeItem(n);
            //存储关键字
            localStorage.setItem(n,JSON.stringify(d));
        }else{
            console.log('您的浏览器不支持localStorage！');
        }
    }catch(oException){
        if(oException.name == 'QuotaExceededError'){
            console.log('超出本地存储限额！');
            //如果历史信息不重要了，可清空后再设置
            //localStorage.clear();
        }
    }
}
/*
    函数：获取指定名字的本地存储
    n:存储的数据key值（存储数据的名字）
*/
function getStorageValue(n){
    try{
        if(window.localStorage){
            var _data = localStorage.getItem(n);
            if(_data != null){
                return JSON.parse(_data);
            }else{
                return null;
            }
        }else{
            console.log('您的浏览器不支持localStorage！');
        }
    }catch(oException){
        if(oException.name == 'QuotaExceededError'){
            console.log('超出本地存储限额！');
            //如果历史信息不重要了，可清空后再设置
            //localStorage.clear();
        }
    }
}
//眼睛点击“禁止查看”
function disEye(){
    //眼睛初始化
    $('.eye-detail').removeClass('eye-show').addClass('eye-hide');
    $('.eye-detail .eye-cover').show();
}
//眼睛点击“回复查看”
function ableEye(price){
    //眼睛操作
    $('.eye-detail .eye-cover').hide();
    $('.eye-detail').removeClass('eye-show').addClass('eye-hide');
}
function openAndValue(price){
    //眼睛操作
    $('#discountPrice').text(price);
    $('.eye-detail .eye-cover').hide();
    $('.eye-detail').removeClass('eye-hide').addClass('eye-show');
}
function eyeNonValue(){
    //眼睛操作
    $('#discountPrice').text('暂无');
}
function hideEye(){
    $('.eye-detail').removeClass('eye-show').addClass('eye-hide');
}
//禁用“立即充值”按钮函数
function disPay(){
    $('.buyNow').addClass('dis-buyNow').attr('data-status','cancel');

    //眼睛初始化
    disEye();
}
//复用“立即充值”按钮函数
function ablePay(price){
    $('.buyNow').removeClass('dis-buyNow').attr('data-status','ok');

    //眼睛操作
    $('.eye-detail .eye-cover').hide();
    $('#discountPrice').text(price);
}
function singleAblePay(){
    $('.buyNow').removeClass('dis-buyNow').attr('data-status','ok');
}


//临时弹出框提示
function shortTimeTip(_text){
    $('#shortTimeTip').text(_text);
    dialog.open('dialogMini');
}




function initPhoneDialog(){
    var _obj = phoneIframe.window.getOrderInfo();
    $('#phoneNum').text(_obj['phoneNum']);
    $('#phoneCompany').text(_obj['phoneCompany']);
    $('#phoneAddr').text(_obj['phoneAddr']);
    $('#phonePay').text(_obj['phonePay']);

    dialog.open("extMenuPhone");
}
function getPhoneSubmitData(){
	return phoneIframe.window.getSubmitInfo();
}
function initLiuliangDialog(){
    var _obj = liuliangIframe.window.getOrderInfo();
    $('#liuliangNum').text(_obj['liuliangNum']);
    $('#liuliangCompany').text(_obj['liuliangCompany']);
    $('#liuliangAddr').text(_obj['liuliangAddr']);
    $('#liuliangPay').text(_obj['liuliangPay']);
    $('#liuliangInfo').text(_obj['liuliangInfo']);

    dialog.open("extMenuLiuliang");
}
function getLiuliangsSubmitData(){
	return liuliangIframe.window.getSubmitInfo();
}
function initQbiDialog(){
    var _obj = qbiIframe.window.getOrderInfo();
    $('#qbiNum').text(_obj['qbiNum']);
    $('#qbiPay').text(_obj['qbiPay']);

    dialog.open("extMenuQbi");
}
function getQbiSubmitData(){
	return qbiIframe.window.getSubmitInfo();
}
function initOilDialog(){
    var _obj = oilIframe.window.getOrderInfo();
    $('#oilNum').text(_obj['oilNum']);
    $('#oilPay').text(_obj['oilPay']);

    dialog.open("extMenuOil");

}
function getOilSubmitData(){
	return oilIframe.window.getSubmitInfo();
}



$(function(){

    relaxFrame = new relaxMobile("phone");
  
    dialog = relaxDialog({
        open:function(idStr,config){
            //console.log('idStr：'+idStr)
            //console.log('config：'+config)
        },
        close:function(idStr,dialogType,closeButton){
          if(closeButton == 'cancel'){
              return true;
          }

          if(idStr == 'extMenu'){
              return true;
          }
          
          if(idStr == 'condDialog'){
        	  //获取查询条件
        	  selConParam();
        	  //分类查询
	          searchCategory();
        	  return true;
          }
          if (idStr=="helpShow") return true;
          if (idStr=="JFintroDialog") return true;
        }
    });

    relaxFrame.init();
    //积分说明显示 modify by relax 2017/5/9 
    $(".showJFdetails").click(function(){
    	dialog.open("JFintroDialog");
    });
    
    //查询余额及积分 modify by relax 2017/5/10
    var AJAX=new relaxAJAX();
    AJAX.url="../../interface/getAmount.svc";
	AJAX.before=function(){
		$(".userRefresh").addClass("loading");
	};
	AJAX.success=function(data){
		$(".userRefresh").removeClass("loading");
		if (!data.succ){
			$(".userRealname").text("--");
			$(".userAccount").text("--");
			$(".userPoint").text("--");
			dialog.open("mini",{content:data.message});
		}else{
			data=data.result;
			$(".userRealname").text(data.realName);
			$(".userAccount").text(data.amount.toFixed(1));
			$(".userPoint").text(parseInt(data.points));
		}
	};
	AJAX.error=function(code,msg){
		$(".userRefresh").removeClass("loading");
		dialog.open("mini",{content:code+" "+msg});
	};
	AJAX.send();
	//账户余额刷新事件绑定
	$(".userRefresh").click(function(){
		AJAX.send();
	});
    
    //弹出业务帮助弹框 modify by relax 2017/4/11
    $("#showHelp").click(function(){
    	$('#maskOp').hide();
    	$('#menuInfo').hide();
    	dialog.open("helpShow");
    });
    //显示帮助内容
    (function(){
    	var helpDom=$("#helpShow .dialog-content").eq(0);
    	if (helpObj){
    		var template=helpDom.find(".template").prop("outerHTML").replace(/class=\"([^\"\s]+)\s+template\"/,'class="$1"');
    		var temp=helpObj.result.list;
    		var htmlStr="";
    		for (var i=0,len=temp.length; i<len; i++){
    			var showStr=template.replace("{#index#}",i+1);
    			showStr=showStr.replace("{#title#}",temp[i]['title']);
    			showStr=showStr.replace("{#content#}",temp[i]['content']);
    			htmlStr+=showStr;
    		}
    		helpDom.find("ul").html(htmlStr);
    	}else{
    		helpDom.find("ul").html("");
    	}
    })();
    
    //个人中心点击事件
    $('.userCenter').on('click',function(){
        $('#maskOp').fadeIn(200,function(){
            $('.userInfo').fadeIn(200);
        });
    });
    //下拉菜单点击事件
    $('.menuInfoBtn').on('click',function(){
        $('#maskOp').fadeIn(200,function(){
            $('#menuInfo').fadeIn(200);
        });
    });
    //个人中心、下拉菜单弹出框关闭事件
    $('#maskOp').on('click',function(){
        $('.userInfo').fadeOut(200,function(){
            $('#maskOp').fadeOut(200);
        });
        $('#menuInfo').fadeOut(200,function(){
            $('#maskOp').fadeOut(200);
        });
    });

    //刷新页面自动跳转到之前具体操作页
    /*var currentChangeId = getStorageValue('changeId');
    $('.menuBar li').removeClass('sel');
    //底部内容初始化
    disPay();
    switch(currentChangeId){
        case 'liuliang':
            $('.chargeIframeContainer').empty().append('<iframe name="liuliangIframe" src="liuliang.html" allowtransparency="true" title="charge" frameborder="0" height="100%" width="100%" scrolling="no"></iframe>');
            $('.menuBar li[data-id=liuliang]').addClass('sel');
            $('.buyNow').attr('data-identify','liuliang');
            $('#searchBtn').attr('data-identify','liuliang');
            break;
        case 'qbi':
            $('.chargeIframeContainer').empty().append('<iframe name="qbiIframe" src="qbi.html" allowtransparency="true" title="charge" frameborder="0" height="100%" width="100%" scrolling="no"></iframe>');
            $('.menuBar li[data-id=qbi]').addClass('sel');
            $('.buyNow').attr('data-identify','qbi');
            $('#searchBtn').attr('data-identify','qbi');
            break;
        case 'oil':
            $('.chargeIframeContainer').empty().append('<iframe name="oilIframe" src="oil.html" allowtransparency="true" title="charge" frameborder="0" height="100%" width="100%" scrolling="no"></iframe>');
            $('.menuBar li[data-id=oil]').addClass('sel');
            $('.buyNow').attr('data-identify','oil');
            $('#searchBtn').attr('data-identify','oil');
            break;
        default:
            $('.chargeIframeContainer').empty().append('<iframe name="phoneIframe" src="phone.html" allowtransparency="true" title="charge" frameborder="0" height="100%" width="100%" scrolling="no"></iframe>');
            $('.menuBar li[data-id=phone]').addClass('sel');
            $('.buyNow').attr('data-identify','phone');
            $('#searchBtn').attr('data-identify','phone');
            break;
    }
    $('.menuBar').on('click','li',function(){
    	$('#dialogMini').hide();
        //底部内容初始化
        disPay();
        $(this).addClass('sel').siblings().removeClass('sel');

        var _changeId = $(this).attr('data-id');
        switch(_changeId){
            case 'liuliang':
                $('.chargeIframeContainer').empty().append('<iframe name="liuliangIframe" src="liuliang.html" allowtransparency="true" title="charge" frameborder="0" height="100%" width="100%" scrolling="no"></iframe>');
                $('.menuBar li[data-id=liuliang]').addClass('sel');
                $('.buyNow').attr('data-identify','liuliang');
                $('#searchBtn').attr('data-identify','liuliang');
                break;
            case 'qbi':
                $('.chargeIframeContainer').empty().append('<iframe name="qbiIframe" src="qbi.html" allowtransparency="true" title="charge" frameborder="0" height="100%" width="100%" scrolling="no"></iframe>');
                $('.menuBar li[data-id=qbi]').addClass('sel');
                $('.buyNow').attr('data-identify','qbi');
                $('#searchBtn').attr('data-identify','qbi');
                break;
            case 'oil':
                $('.chargeIframeContainer').empty().append('<iframe name="oilIframe" src="oil.html" allowtransparency="true" title="charge" frameborder="0" height="100%" width="100%" scrolling="no"></iframe>');
                $('.menuBar li[data-id=oil]').addClass('sel');
                $('.buyNow').attr('data-identify','oil');
                $('#searchBtn').attr('data-identify','oil');
                break;
            default:
                $('.chargeIframeContainer').empty().append('<iframe name="phoneIframe" src="phone.html" allowtransparency="true" title="charge" frameborder="0" height="100%" width="100%" scrolling="no"></iframe>');
                $('.menuBar li[data-id=phone]').addClass('sel');
                $('.buyNow').attr('data-identify','phone');
                $('#searchBtn').attr('data-identify','phone');
                break;
        }
        setStroageValue('changeId',_changeId);
    });*/
    function refreshUrl(){
    	//积分制空
    	if(JF){
        	JF.data.JF = 0;
    	}
    	$('#dialogMini').hide();
        //底部内容初始化
        disPay();

		var _hash = location.hash;
		switch(_hash){
			case '#liuliang':
                $('#chargeIframeContainer2').empty().append('<iframe name="liuliangIframe" src="liuliang.html" allowtransparency="true" title="charge" frameborder="0" height="100%" width="100%" scrolling="no"></iframe>');
                //$('.menuBar li[data-id=liuliang]').addClass('sel');
                $('.buyNow').attr('data-identify','liuliang');
                $('#searchBtn').attr('data-identify','liuliang');
                break;
			case '#qbi':
                $('#chargeIframeContainer3').empty().append('<iframe name="qbiIframe" src="qbi.html" allowtransparency="true" title="charge" frameborder="0" height="100%" width="100%" scrolling="no"></iframe>');
                //$('.menuBar li[data-id=qbi]').addClass('sel');
                $('.buyNow').attr('data-identify','qbi');
                $('#searchBtn').attr('data-identify','qbi');
                break;
			case '#oil':
                $('#chargeIframeContainer4').empty().append('<iframe name="oilIframe" src="oil.html" allowtransparency="true" title="charge" frameborder="0" height="100%" width="100%" scrolling="no"></iframe>');
                //$('.menuBar li[data-id=oil]').addClass('sel');
                $('.buyNow').attr('data-identify','oil');
                $('#searchBtn').attr('data-identify','oil');
                break;
			default:
                $('#chargeIframeContainer1').empty().append('<iframe name="phoneIframe" src="phone.html" allowtransparency="true" title="charge" frameborder="0" height="100%" width="100%" scrolling="no"></iframe>');
	            //$('.menuBar li[data-id=phone]').addClass('sel');
	            $('.buyNow').attr('data-identify','phone');
	            $('#searchBtn').attr('data-identify','phone');
	            break;
		}
	}
	refreshUrl();
	$(window).on('hashchange',function(){
		refreshUrl();
	});

    
    //眼睛切换效果
    $('.eye-detail i').on('click',function(){
        if($(this).hasClass('hideIcon')){
            
            if($('.buyNow').attr('data-identify') == 'qbi'){
                if(qbiIframe.window.ajaxFlag){
                    //qbiIframe.window.getSealPrice();
                	openAndValue(qbiIframe.window.getSealPrice() + '元');
                }
            }
            $(this).parent().removeClass('eye-hide').addClass('eye-show');
        }else{
            $(this).parent().removeClass('eye-show').addClass('eye-hide');
        }
    });



  //============================
	//modify by relax 
	//积分对象实例化
	JF=jfBusiness();
	//=============================
	$('.jf label').on('click',function(){
		var _identify = $('.buyNow').attr('data-identify');

        //初始化订单确认数据
        switch(_identify){
            case 'phone':
            	var pam = getPhoneSubmitData();
            	JF.send("PhoneFrame",{gsCode:pam['gsCode'],price:pam['price']});
                break;
            case 'liuliang':
            	var pam = getLiuliangsSubmitData();
            	JF.send("LiuliangFrame",{gsCode:pam['gsCode'],price:pam['price']});
                break;
            case 'qbi':
            	var pam = getQbiSubmitData();
            	JF.send("QbiFrame",{gsCode:pam['gsCode'],price:pam['price']});
                break;
            case 'oil':
            	var pam = getOilSubmitData();
            	JF.send("OilFrame",{gsCode:pam['gsCode'],price:pam['price']});
                break;
        }
	});
	
    //“立即充值”按钮点击事件
    $('.buyNow').on('click',function(){
        if($(this).attr('data-status') == 'ok'){
        	
        	
        	
        	//初始化
        	checkPwdPart(null,null,null);
        	$('#pwdPhone').val('');
        	$('#pwdLiuliang').val('');
        	$('#pwdQbi').val('');
        	$('#pwdOil').val('');
        	
        	
        	
            var _identify = $(this).attr('data-identify');

            //初始化订单确认数据
            switch(_identify){
                case 'phone':
                	var pam = getPhoneSubmitData();
                	JF.send("PhoneFrame",{gsCode:pam['gsCode'],price:pam['price']});
                    initPhoneDialog();
                    break;
                case 'liuliang':
                	var pam = getLiuliangsSubmitData();
                	JF.send("LiuliangFrame",{gsCode:pam['gsCode'],price:pam['price']});
                    initLiuliangDialog();
                    break;
                case 'qbi':
                	var pam = getQbiSubmitData();
                	JF.send("QbiFrame",{gsCode:pam['gsCode'],price:pam['price']});
                    initQbiDialog();
                    break;
                case 'oil':
                	var pam = getOilSubmitData();
                	JF.send("OilFrame",{gsCode:pam['gsCode'],price:pam['price']});
                    initOilDialog();
                    break;
            }

        }else{
            return false;
        }
    });

    //密码框输入相关
    var _input = new inputClear('inputClear',function(){
        checkPwdPart('phone',null,null);
        checkPwdPart('liuliang',null,null);
        checkPwdPart('qbi',null,null);
        checkPwdPart('oil',null,null);
    });

});

function checkPwdPart(identify,status,params){
    $('.inputStatus').removeClass('err').removeClass('subErr');
    $('.bnt-sure').addClass('dis-bntInline').attr('data-status','cancel');

    if(identify == 'phone'){
        if(status == 'err'){
            $('#extMenuPhone').find('.inputStatus').addClass('err').find('.errTip span').text(params);
        }else if(status == 'subErr'){
            $('#extMenuPhone').find('.inputStatus').addClass('subErr').find('.errTip span').text(params);
            $('#extMenuPhone').find('.bnt-sure').attr('data-status','cancel');
        }else{
            $('#extMenuPhone').find('.bnt-sure').removeClass('dis-bntInline').attr('data-status','ok');
        }
    }
    if(identify == 'liuliang'){
        if(status == 'err'){
            $('#extMenuLiuliang').find('.inputStatus').addClass('err').find('.errTip span').text(params);
        }else if(status == 'subErr'){
            $('#extMenuLiuliang').find('.inputStatus').addClass('subErr').find('.errTip span').text(params);
            $('#extMenuLiuliang').find('.bnt-sure').attr('data-status','cancel');
        }else{
            $('#extMenuLiuliang').find('.bnt-sure').removeClass('dis-bntInline').attr('data-status','ok');
        }
    }
    if(identify == 'qbi'){
        if(status == 'err'){
            $('#extMenuQbi').find('.inputStatus').addClass('err').find('.errTip span').text(params);
        }else if(status == 'subErr'){
            $('#extMenuQbi').find('.inputStatus').addClass('subErr').find('.errTip span').text(params);
            $('#extMenuQbi').find('.bnt-sure').attr('data-status','cancel');
        }else{
            $('#extMenuQbi').find('.bnt-sure').removeClass('dis-bntInline').attr('data-status','ok');
        }
    }
    if(identify == 'oil'){
        if(status == 'err'){
            $('#extMenuOil').find('.inputStatus').addClass('err').find('.errTip span').text(params);
        }else if(status == 'subErr'){
            $('#extMenuOil').find('.inputStatus').addClass('subErr').find('.errTip span').text(params);
            $('#extMenuOil').find('.bnt-sure').attr('data-status','cancel');
        }else{
            $('#extMenuOil').find('.bnt-sure').removeClass('dis-bntInline').attr('data-status','ok');
        }
    }

}
//各个密码校验
$(function(){
    /*--------------------手机充值相关---------------------*/
    $('#pwdPhone').on('keyup',function(){
        var pwd = $.trim($(this).val());
        if(pwd == null || pwd == ''){
            checkPwdPart('phone','err','支付密码不能为空');

            return false;
        }else{
            checkPwdPart('phone',null,null);
        }
    });

    $('#extMenuPhone .bnt-sure').on('click',function(){
        //密码前端校验
        if(!$(this).hasClass('dis-bntInline')){
            var pwd = $.trim($('#pwdPhone').val());
            if(pwd.length < 6){
                checkPwdPart('phone','err','支付密码长度过短');
                return false;
            }else{
                checkPwdPart('phone',null,null);
            }
        }


        if($(this).attr('data-status') == 'ok' && !$(this).hasClass('dis-bntInline')){
            var T = $(this);
			var paramObj = getPhoneSubmitData();
			var _password = $.trim($('#pwdPhone').val());

            var ajaxOne = new relaxAJAX({
                url:'../../charge/recharge.svc',
                data:{
                	payPassword:_password,
                	gsCode:paramObj['gsCode'],
                	catgCode:'30100',
					chargeNumber:paramObj['chargeNumber'],
					num:1,
					payPoints:JF.data.JF
                },
                before:function(){
                    $('#extMenuPhone .dialog-buttonBar').removeClass('success').addClass('loading');
                },
                success:function(data){
                	
                	if(data.succ){
                		$('#extMenuPhone .dialog-buttonBar').removeClass('loading').addClass('success');
                		countDown('extMenuPhone');
                	}else{
                		$('#extMenuPhone .dialog-buttonBar').removeClass('success').removeClass('loading');
                		
                		if(data.message){
                			checkPwdPart('phone','subErr',data.message);
                		}else{
                			checkPwdPart('phone','subErr','系统出现异常');
                		}
                		
                	}
                    
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){    //textStatus: "timeout", "error", "abort", and "parsererror"
                    $('#extMenuPhone .dialog-buttonBar').removeClass('success').removeClass('loading');
                    switch(textStatus){
                        case 'timeout':
                            checkPwdPart('phone','subErr','客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                        case 'parsererror':
                            checkPwdPart('phone','subErr','客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                        case 'abort':
                            checkPwdPart('phone','subErr','数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                        default:
                            checkPwdPart('phone','subErr','ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                    }
                }

            });
            ajaxOne.send();
        }else{
            return false;
        }
    });

    /*--------------------流量充值相关---------------------*/
    $('#pwdLiuliang').on('keyup',function(){
        var pwd = $.trim($(this).val());
        if(pwd == null || pwd == ''){
            checkPwdPart('liuliang','err','支付密码不能为空');

            return false;
        }else{
            checkPwdPart('liuliang',null,null);
        }
    });

    $('#extMenuLiuliang .bnt-sure').on('click',function(){
        //密码前端校验
        if(!$(this).hasClass('dis-bntInline')){
            var pwd = $.trim($('#pwdLiuliang').val());
            if(pwd.length < 6){
                checkPwdPart('liuliang','err','支付密码长度过短');
                return false;
            }else{
                checkPwdPart('liuliang',null,null);
            }
        }


        if($(this).attr('data-status') == 'ok' && !$(this).hasClass('dis-bntInline')){
            var T = $(this);
            var paramObj = getLiuliangsSubmitData();
			var _password = $.trim($('#pwdLiuliang').val());

            var ajaxOne = new relaxAJAX({
                url:'../../charge/recharge.svc',
                data:{
                	payPassword:_password,
                	gsCode:paramObj['gsCode'],
                	catgCode:'30200',
					chargeNumber:paramObj['chargeNumber'],
					num:1,
					payPoints:JF.data.JF
                },
                before:function(){
                    $('#extMenuLiuliang .dialog-buttonBar').removeClass('success').addClass('loading');
                },
                success:function(data){
                	
                	if(data.succ){
                		$('#extMenuLiuliang .dialog-buttonBar').removeClass('loading').addClass('success');
                		countDown('extMenuLiuliang');
                	}else{
                		$('#extMenuLiuliang .dialog-buttonBar').removeClass('success').removeClass('loading');
                		
                		if(data.message){
                			checkPwdPart('liuliang','subErr',data.message);
                		}else{
                			checkPwdPart('liuliang','subErr','系统出现异常');
                		}
                		
                	}
                    
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){    //textStatus: "timeout", "error", "abort", and "parsererror"
                    $('#extMenuLiuliang .dialog-buttonBar').removeClass('success').removeClass('loading');
                    switch(textStatus){
                        case 'timeout':
                            checkPwdPart('liuliang','subErr','客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                        case 'parsererror':
                            checkPwdPart('liuliang','subErr','客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                        case 'abort':
                            checkPwdPart('liuliang','subErr','数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                        default:
                            checkPwdPart('liuliang','subErr','ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                    }
                }

            });
            ajaxOne.send();
        }else{
            return false;
        }
    });

    /*--------------------Q币充值相关---------------------*/
    $('#pwdQbi').on('keyup',function(){
        var pwd = $.trim($(this).val());
        if(pwd == null || pwd == ''){
            checkPwdPart('qbi','err','支付密码不能为空');

            return false;
        }else{
            checkPwdPart('qbi',null,null);
        }
    });

    $('#extMenuQbi .bnt-sure').on('click',function(){
        //密码前端校验
        if(!$(this).hasClass('dis-bntInline')){
            var pwd = $.trim($('#pwdQbi').val());
            if(pwd.length < 6){
                checkPwdPart('qbi','err','支付密码长度过短');
                return false;
            }else{
                checkPwdPart('qbi',null,null);
            }
        }


        if($(this).attr('data-status') == 'ok' && !$(this).hasClass('dis-bntInline')){
            var T = $(this);
            var paramObj = getQbiSubmitData();
			var _password = $.trim($('#pwdQbi').val());

            var ajaxOne = new relaxAJAX({
                url:'../../charge/recharge.svc',
                data:{
                	payPassword:_password,
                	gsCode:paramObj['gsCode'],
                	catgCode:'30300',
					chargeNumber:paramObj['chargeNumber'],
					num:paramObj['num'],
					payPoints:JF.data.JF
                },
                before:function(){
                    $('#extMenuQbi .dialog-buttonBar').removeClass('success').addClass('loading');
                },
                success:function(data){
                	
                	if(data.succ){
                		$('#extMenuQbi .dialog-buttonBar').removeClass('loading').addClass('success');
                		countDown('extMenuQbi');
                	}else{
                		$('#extMenuQbi .dialog-buttonBar').removeClass('success').removeClass('loading');
                		
                		if(data.message){
                			checkPwdPart('qbi','subErr',data.message);
                		}else{
                			checkPwdPart('qbi','subErr','系统出现异常');
                		}
                		
                	}
                    
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){    //textStatus: "timeout", "error", "abort", and "parsererror"
                    $('#extMenuQbi .dialog-buttonBar').removeClass('success').removeClass('loading');
                    switch(textStatus){
                        case 'timeout':
                            checkPwdPart('qbi','subErr','客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                        case 'parsererror':
                            checkPwdPart('qbi','subErr','客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                        case 'abort':
                            checkPwdPart('qbi','subErr','数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                        default:
                            checkPwdPart('qbi','subErr','ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                    }
                }

            });
            ajaxOne.send();
        }else{
            return false;
        }
    });

    /*--------------------加油卡充值相关---------------------*/
    $('#pwdOil').on('keyup',function(){
        var pwd = $.trim($(this).val());
        if(pwd == null || pwd == ''){
            checkPwdPart('oil','err','支付密码不能为空');

            return false;
        }else{
            checkPwdPart('oil',null,null);
        }
    });

    $('#extMenuOil .bnt-sure').on('click',function(){
        //密码前端校验
        if(!$(this).hasClass('dis-bntInline')){
            var pwd = $.trim($('#pwdOil').val());
            if(pwd.length < 6){
                checkPwdPart('oil','err','支付密码长度过短');
                return false;
            }else{
                checkPwdPart('oil',null,null);
            }
        }


        if($(this).attr('data-status') == 'ok' && !$(this).hasClass('dis-bntInline')){
            var T = $(this);
            var paramObj = getOilSubmitData();
			var _password = $.trim($('#pwdOil').val());
            
            var ajaxOne = new relaxAJAX({
                url:'../../charge/recharge.svc',
                data:{
                	payPassword:_password,
                	gsCode:paramObj['gsCode'],
                	catgCode:'30400',
					chargeNumber:paramObj['chargeNumber'],
					num:1,
					payPoints:JF.data.JF
                },
                before:function(){
                    $('#extMenuOil .dialog-buttonBar').removeClass('success').addClass('loading');
                },
                success:function(data){
                	
                	if(data.succ){
                		$('#extMenuOil .dialog-buttonBar').removeClass('loading').addClass('success');
                		countDown('extMenuOil');
                	}else{
                		$('#extMenuOil .dialog-buttonBar').removeClass('success').removeClass('loading');
                		
                		if(data.message){
                			checkPwdPart('oil','subErr',data.message);
                		}else{
                			checkPwdPart('oil','subErr','系统出现异常');
                		}
                		
                	}
                    
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){    //textStatus: "timeout", "error", "abort", and "parsererror"
                    $('#extMenuOil .dialog-buttonBar').removeClass('success').removeClass('loading');
                    switch(textStatus){
                        case 'timeout':
                            checkPwdPart('oil','subErr','客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                        case 'parsererror':
                            checkPwdPart('oil','subErr','客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                        case 'abort':
                            checkPwdPart('oil','subErr','数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                        default:
                            checkPwdPart('oil','subErr','ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
                            break;
                    }
                }

            });
            ajaxOne.send();
        }else{
            return false;
        }
    });




});





/*--------------------------------查询相关-------------------------------------*/
//查询获取数据
function getPhoneData(p_sDate,p_eDate,p_status,p_chargeNum,pageNum,pageSize){
    var getPhoneData = new relaxAJAX({
	    url:'../../orderHandling/getOrderInfo.svc',
        data:{
        	startDate:p_sDate,
        	endDate:p_eDate,
        	status:p_status,
        	chargeNumber:p_chargeNum,
        	catgCd:'30100',
        	pageNum:pageNum,
        	pageSize:pageSize
        },
        before:function(){
            $('.searchLoading').show();
            $('.searchErr').hide();
            $('.searchOver').hide();
            $('.getMore').hide();
        },
        success:function(data){
        	
        	if(data.succ){
        		
    			$('.searchLoading').hide();
                $('.searchErr').hide();
                
        		if(data.result.total != 0){
        			
                    var tmpHtml = '';
                    var dataInfo = data.result.rows;
                    var count = data.result.total;

                    for(var i=0;i<dataInfo.length;i++){
                    	switch(parseInt(dataInfo[i].status)){
                    		case 1:
                    			tmpHtml += '<li><i class="t4 iconfont icon-busy"></i><div class="t2">'+dataInfo[i].startTime+'<span class="load">充值中</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                    			break;
                    		case 2:
                    			tmpHtml += '<li><i class="t4 iconfont icon-wancheng"></i><div class="t2">'+dataInfo[i].startTime+'<span>成功</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                    			break;
                    		case 3:
                    			tmpHtml += '<li><i class="t4 iconfont icon-shibai"></i><div class="t2">'+dataInfo[i].startTime+'<span class="shibai">失败</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                    			break;
                    		case 4:
                    			tmpHtml += '<li><i class="t4 iconfont icon-busy"></i><div class="t2">'+dataInfo[i].startTime+'<span class="load">撤单中</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                    			break;
                    		default:
                    			tmpHtml += '<li><div class="t2">'+dataInfo[i].startTime+'</div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                    			break;
                    	}
                        
                    }
                    $('.search-c').append(tmpHtml);

                    var allPageNum = Math.ceil(count/pageSizeS);

                    if(pageNumS < allPageNum){
                        pageNumS += 1;
                        $('.getMore').fadeIn(200);
                    }else{
                        $('.getMore').hide();
                        $('.searchOver').show();
                    }
                    
        		}else{
        			$('.getMore').hide();
        			$('.searchOver').show();
        		}
        		
        	}else{
        		$('.searchLoading').hide();
        		
        		if(data.message){
        			$('.searchErr').text(data.message).fadeIn(200);
        		}else{
        			$('.searchErr').text('系统出现异常').fadeIn(200);
        		}
        		
        	}
        	
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){    //textStatus: "timeout", "error", "abort", and "parsererror"
            
            $('.searchLoading').hide();

            switch(textStatus){
                case 'timeout':
                    $('.searchErr').text('客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
                case 'parsererror':
                    $('.searchErr').text('客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
                case 'abort':
                    $('.searchErr').text('数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
                default:
                    $('.searchErr').text('ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
            }
        }

    });
    getPhoneData.send();
}
function getLiuliangData(p_sDate,p_eDate,p_status,p_chargeNum,pageNum,pageSize){
    var getLiuliangData = new relaxAJAX({
	    url:'../../orderHandling/getOrderInfo.svc',
        data:{
        	startDate:p_sDate,
        	endDate:p_eDate,
        	status:p_status,
        	chargeNumber:p_chargeNum,
        	catgCd:'30200',
        	pageNum:pageNum,
        	pageSize:pageSize
        },
        before:function(){
            $('.searchLoading').show();
            $('.searchErr').hide();
            $('.searchOver').hide();
            $('.getMore').hide();
        },
        success:function(data){
        	
        	if(data.succ){
        		
        		$('.searchLoading').hide();
                $('.searchErr').hide();
                
                if(data.result.total != 0){
	        			
        			var tmpHtml = '';
                    var dataInfo = data.result.rows;
                    var count = data.result.total;

                    for(var i=0;i<dataInfo.length;i++){
                        switch(parseInt(dataInfo[i].status)){
                            case 1:
                                tmpHtml += '<li><i class="t4 iconfont icon-busy"></i><div class="t2">'+dataInfo[i].startTime+'<span class="load">充值中</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].elem3)+'</span></div></li>';
                                break;
                            case 2:
                                tmpHtml += '<li><i class="t4 iconfont icon-wancheng"></i><div class="t2">'+dataInfo[i].startTime+'<span>成功</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].elem3)+'</span></div></li>';
                                break;
                            case 3:
                                tmpHtml += '<li><i class="t4 iconfont icon-shibai"></i><div class="t2">'+dataInfo[i].startTime+'<span class="shibai">失败</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].elem3)+'</span></div></li>';
                                break;
                            case 4:
                                tmpHtml += '<li><i class="t4 iconfont icon-busy"></i><div class="t2">'+dataInfo[i].startTime+'<span class="load">撤单中</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].elem3)+'</span></div></li>';
                                break;
                            default:
                                tmpHtml += '<li><div class="t2">'+dataInfo[i].startTime+'</div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].elem3)+'</span></div></li>';
                                break;
                        }
                        
                    }
                    $('.search-c').append(tmpHtml);

                    var allPageNum = Math.ceil(count/pageSizeS);

                    if(pageNumS < allPageNum){
                        pageNumS += 1;
                        $('.getMore').fadeIn(200);
                    }else{
                        $('.getMore').hide();
                        $('.searchOver').show();
                    }
        			
        		}else{
                    $('.getMore').hide();
                    $('.searchOver').show();
        		}
                
        	}else{
        		$('.searchLoading').hide();
        		
        		if(data.message){
        			$('.searchErr').text(data.message).fadeIn(200);
        		}else{
        			$('.searchErr').text('系统出现异常').fadeIn(200);
        		}
                
        	}
            
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){    //textStatus: "timeout", "error", "abort", and "parsererror"
            
            $('.searchLoading').hide();

            switch(textStatus){
                case 'timeout':
                    $('.searchErr').text('客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
                case 'parsererror':
                    $('.searchErr').text('客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
                case 'abort':
                    $('.searchErr').text('数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
                default:
                    $('.searchErr').text('ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
            }
        }

    });
    getLiuliangData.send();
}
function getQbiData(p_sDate,p_eDate,p_status,p_chargeNum,pageNum,pageSize){
    var getQbiData = new relaxAJAX({
	    url:'../../orderHandling/getOrderInfo.svc',
        data:{
        	startDate:p_sDate,
        	endDate:p_eDate,
        	status:p_status,
        	chargeNumber:p_chargeNum,
        	catgCd:'30300',
        	pageNum:pageNum,
        	pageSize:pageSize
        },
        before:function(){
            $('.searchLoading').show();
            $('.searchErr').hide();
            $('.searchOver').hide();
            $('.getMore').hide();
        },
        success:function(data){
        	
        	if(data.succ){
    			
    			$('.searchLoading').hide();
                $('.searchErr').hide();
                
        		if(data.result.total != 0){
                    
                    var tmpHtml = '';
                    var dataInfo = data.result.rows;
                    var count = data.result.total;

                    for(var i=0;i<dataInfo.length;i++){
                        switch(parseInt(dataInfo[i].status)){
                            case 1:
                                tmpHtml += '<li><i class="t4 iconfont icon-busy"></i><div class="t2">'+dataInfo[i].startTime+'<span class="load">充值中</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                                break;
                            case 2:
                                tmpHtml += '<li><i class="t4 iconfont icon-wancheng"></i><div class="t2">'+dataInfo[i].startTime+'<span>成功</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                                break;
                            case 3:
                                tmpHtml += '<li><i class="t4 iconfont icon-shibai"></i><div class="t2">'+dataInfo[i].startTime+'<span class="shibai">失败</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                                break;
                            case 4:
                                tmpHtml += '<li><i class="t4 iconfont icon-busy"></i><div class="t2">'+dataInfo[i].startTime+'<span class="load">撤单中</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                                break;
                            default:
                                tmpHtml += '<li><div class="t2">'+dataInfo[i].startTime+'</div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                                break;
                        }
                        
                    }
                    $('.search-c').append(tmpHtml);

                    var allPageNum = Math.ceil(count/pageSizeS);

                    if(pageNumS < allPageNum){
                        pageNumS += 1;
                        $('.getMore').fadeIn(200);
                    }else{
                        $('.getMore').hide();
                        $('.searchOver').show();
                    }
                    
        		}else{
                    $('.getMore').hide();
                    $('.searchOver').show();
        		}
        		
        	}else{
                $('.searchLoading').hide();
                
                if(data.message){
                	$('.searchErr').text(data.message).fadeIn(200);
                }else{
                	$('.searchErr').text('系统出现异常').fadeIn(200);
                }
                
        	}

        },
        error:function(XMLHttpRequest, textStatus, errorThrown){    //textStatus: "timeout", "error", "abort", and "parsererror"
            
            $('.searchLoading').hide();

            switch(textStatus){
                case 'timeout':
                    $('.searchErr').text('客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
                case 'parsererror':
                    $('.searchErr').text('客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
                case 'abort':
                    $('.searchErr').text('数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
                default:
                    $('.searchErr').text('ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
            }
        }

    });
    getQbiData.send();
}
function getOilData(p_sDate,p_eDate,p_status,p_chargeNum,pageNum,pageSize){
    var getOilData = new relaxAJAX({
	    url:'../../orderHandling/getOrderInfo.svc',
        data:{
        	startDate:p_sDate,
        	endDate:p_eDate,
        	status:p_status,
        	chargeNumber:p_chargeNum,
        	catgCd:'30400',
        	pageNum:pageNum,
        	pageSize:pageSize
        },
        before:function(){
            $('.searchLoading').show();
            $('.searchErr').hide();
            $('.searchOver').hide();
            $('.getMore').hide();
        },
        success:function(data){
        	
        	if(data.succ){
        		
                $('.searchLoading').hide();
                $('.searchErr').hide();
        		
        		if(data.result.total != 0){
        			
        			var tmpHtml = '';
                    var dataInfo = data.result.rows;
                    var count = data.result.total;

                    for(var i=0;i<dataInfo.length;i++){
                        switch(parseInt(dataInfo[i].status)){
                            case 1:
                                tmpHtml += '<li><i class="t4 iconfont icon-busy"></i><div class="t2">'+dataInfo[i].startTime+'<span class="load">充值中</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                                break;
                            case 2:
                                tmpHtml += '<li><i class="t4 iconfont icon-wancheng"></i><div class="t2">'+dataInfo[i].startTime+'<span>成功</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                                break;
                            case 3:
                                tmpHtml += '<li><i class="t4 iconfont icon-shibai"></i><div class="t2">'+dataInfo[i].startTime+'<span class="shibai">失败</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                                break;
                            case 4:
                                tmpHtml += '<li><i class="t4 iconfont icon-busy"></i><div class="t2">'+dataInfo[i].startTime+'<span class="load">撤单中</span></div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                                break;
                            default:
                                tmpHtml += '<li><div class="t2">'+dataInfo[i].startTime+'</div><div class="t3">'+dataInfo[i].chargeNumber+'<span>'+(dataInfo[i].parValue*dataInfo[i].num)+'</span></div></li>';
                                break;
                        }
                        
                    }
                    $('.search-c').append(tmpHtml);

                    var allPageNum = Math.ceil(count/pageSizeS);

                    if(pageNumS < allPageNum){
                        pageNumS += 1;
                        $('.getMore').fadeIn(200);
                    }else{
                        $('.getMore').hide();
                        $('.searchOver').show();
                    }
                    
        		}else{
                    $('.getMore').hide();
                    $('.searchOver').show();
        		}
        		
        	}else{
                $('.searchLoading').hide();
                
                if(data.message){
                	$('.searchErr').text(data.message).fadeIn(200);
                }else{
                	$('.searchErr').text('系统出现异常').fadeIn(200);
                }
                
        	}
            
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){    //textStatus: "timeout", "error", "abort", and "parsererror"
            
            $('.searchLoading').hide();

            switch(textStatus){
                case 'timeout':
                    $('.searchErr').text('客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
                case 'parsererror':
                    $('.searchErr').text('客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
                case 'abort':
                    $('.searchErr').text('数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
                default:
                    $('.searchErr').text('ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState).fadeIn(200);
                    break;
            }
        }

    });
    getOilData.send();
}

/*----------------------------------------日期处理-begin-----------------------------------------*/
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
/*----------------------------------------日期处理-end-----------------------------------------*/



/*----------------------------------------查询条件处理-begin-----------------------------------------*/
//获取用户选择的条件
function selConParam(){
	var today_s = GetFormatDate(0)+" "+"00:00:00";	//今天开始时间
	var today_e = GetFormatDate(0)+" "+"23:59:59";	//今天结束时间
	var preday_s = GetFormatDate(-1)+" "+"00:00:00";	//昨天开始时间
	var preday_e = GetFormatDate(-1)+" "+"23:59:59";	//昨天结束时间
	var week_s = getWeekStartDate()+" "+"00:00:00";	//本周开始时间
	var week_e = getWeekEndDate()+" "+"23:59:59";	//本周结束时间
	
	var _time = $("input:radio[name='time']:checked").val();
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
	
	status = $("input:radio[name='status']:checked").val();
	chargeNum = $.trim($('#num').val());
}
//初始化选择条件
function initConParam(){
	$("input:radio[name='time']:checked").prop('checked',false);
	$("input:radio[name='time']").eq(0).prop("checked",true);
	var today_s = GetFormatDate(0)+" "+"00:00:00";	//今天开始时间
	var today_e = GetFormatDate(0)+" "+"23:59:59";	//今天结束时间
	sDate = today_s;	//开始时间
	eDate = today_e;	//结束时间
	
	$("input:radio[name='status']:checked").prop('checked',false);
	$("input:radio[name='status']").eq(0).prop("checked",true);
	status = 0;
	
	$('#num').val('');
	chargeNum = null;
}
/*----------------------------------------查询条件处理-end-----------------------------------------*/


//查询内容实现
var pageNumS = 1;
var pageSizeS = 10;
var sDate;	//开始时间
var eDate;	//结束时间
var status;	//订单状态
var chargeNum;	//充值号码

function searchCategory(){
	
    //初始化分页数据
    pageNumS = 1;
    
    $('.getMore').show();
    $('.searchLoading').hide();
    $('.searchErr').hide();
    $('.searchOver').hide();
    $('.search-c').empty();

    var _identify = $('#searchBtn').attr('data-identify');
    switch(_identify){
        case 'phone':
            $('#searchTitle').text('话费');
            getPhoneData(sDate,eDate,status,chargeNum,pageNumS,pageSizeS);
            break;
        case 'liuliang':
            $('#searchTitle').text('流量');
            getLiuliangData(sDate,eDate,status,chargeNum,pageNumS,pageSizeS);
            break;
        case 'qbi':
            $('#searchTitle').text('Q币');
            getQbiData(sDate,eDate,status,chargeNum,pageNumS,pageSizeS);
            break;
        case 'oil':
            $('#searchTitle').text('加油卡');
            getOilData(sDate,eDate,status,chargeNum,pageNumS,pageSizeS);
            break;
    }
}
$(function(){
    //查询按钮点击事件
    $('#searchBtn').on('click',function(){
    	
    	//初始化选择条件
    	initConParam();
    	//分类查询
    	searchCategory();
        dialog.open("extMenu");

    });
    //获取更多数据按钮点击事件
    $('.getMore').on('click',function(){
        var _identify = $('#searchBtn').attr('data-identify');

        switch(_identify){
            case 'phone':
                getPhoneData(sDate,eDate,status,chargeNum,pageNumS,pageSizeS);
                break;
            case 'liuliang':
                getLiuliangData(sDate,eDate,status,chargeNum,pageNumS,pageSizeS);
                break;
            case 'qbi':
                getQbiData(sDate,eDate,status,chargeNum,pageNumS,pageSizeS);
                break;
            case 'oil':
                getOilData(sDate,eDate,status,chargeNum,pageNumS,pageSizeS);
                break;
        }
    });
    
    //查询条件显示
    $('#openCond').on('click',function(){
    	dialog.open('condDialog');
    });
});










