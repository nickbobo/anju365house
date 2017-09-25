//操作函数集合对象
var obj = {
	//禁用“立即充值”按钮函数
	disPay:function(){
		parent.disPay();
	},
	//复用“立即充值”按钮函数
	ablePay:function(){
		parent.ablePay();
	},
}

//实现输入框只能输入数字
function ValidateNumber(e, pnumber) {
  if (!/^\d+$/.test(pnumber)) {
      $(e).val(/^\d+/.exec($(e).val()));
  }
  return false;
}

//判断是否满足充值条件
var condFlag = false;
//眼睛价格获取
var ajaxFlag = true;
var unit ;	//q币单价
var gsCode;	//商品code
//获取销售价
getPrice();
function getPrice(){

	var sealPrice = new relaxAJAX({
	    url:'../../charge/getGsInfo.svc',
	    data:{
	    	catgCode:'30300',
	    	par_value:'1'
	    },
        success:function(data){
        	if(data.succ){
        		ajaxFlag = false;
            	//parent.openAndValue(data + '元');
        		unit = parseFloat(data.result[0].sale_price).toFixed(2);
        		
        		gsCode = data.result[0].gs_code;
	        	
	        	condFlag = true;
	        	
        	}else{
        		ajaxFlag = true;
                parent.eyeNonValue();
                
                if(data.message){
                	parent.shortTimeTip(data.message);
                }else{
                	parent.shortTimeTip('系统出现异常');
                }
	       		
	       		condFlag = false;
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){	//textStatus: "timeout", "error", "abort", and "parsererror"
           ajaxFlag = true;
	       condFlag = false;
           parent.eyeNonValue();
            switch(textStatus){
            	case 'timeout':
            		parent.shortTimeTip('[销售价格获取]客户端请求超时！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
            		break;
            	case 'parsererror':
            		parent.shortTimeTip('[销售价格获取]客户端数据传输错误！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
            		break;
            	case 'abort':
            		parent.shortTimeTip('[销售价格获取]数据请求终止！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
            		break;
            	default:
            		parent.shortTimeTip('[销售价格获取]ajax请求失败！status:'+XMLHttpRequest.status+',readyState:'+XMLHttpRequest.readyState);
            		break;
            }
        }
    });
    sealPrice.send();
}
//计算花费
function getSealPrice(){
	var buyNum;
	
	if($('.sel-c li.sel').hasClass('other')){
		buyNum = $.trim($("#inputNum").val());
	}else{
		buyNum = $('.sel-c li.sel').attr('data-price');
	}
	
	return parseFloat(unit*buyNum).toFixed(2);
}


/* 效果js */
var sounds = document.getElementById('sounds');
$(function(){
	//避免号码在某些浏览器下缓存，主动清除该号码 modify by relax 2017/5/9
	setTimeout(function(){
		$('#qqNum').val("");
	},50);
	
	//号码输入框删除发音
	$('#qqNum').on('keydown paste',function(e){
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
			$('.inputStatus').addClass('err');
			$('#phoneErr').text('qq输入框不能为空');
			$('.sel-c li:not(.dis-sel)').unbind('click').removeClass('sel');

			$('.sel-c li').addClass('dis-sel');
			obj.disPay();
			$('#self-meal').fadeOut(200);
		}else{
			$('.inputStatus').removeClass('err');
			
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
					parent.singleAblePay();

					//眼睛操作
					parent.ableEye();
					ajaxFlag = true;
				});
			}
			
		}
	});

	var _input = new inputClear('inputClear',function(){
		$('.inputStatus').addClass('err');
		$('#phoneErr').text('qq输入框不能为空');
		$('.sel-c li:not(.dis-sel)').unbind('click').removeClass('sel');

		$('.sel-c li').addClass('dis-sel');
		obj.disPay();
		$('#self-meal').fadeOut(200);
	});

});

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
            parent.hideEye();
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
            parent.hideEye();
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
    _this.keydown(function(event){
        var key = event.keyCode;
        if(!(key >= 48 && key <= 57 || key >= 96 && key <= 105 || key == 8)){
        	return false;
        }else{
        	return true;
        }
    });
}
//input blur
function blurCheck(ele){
    var _this = $(ele);
    var currentValue = parseInt($.trim(_this.val()));
    if(currentValue == 0 || isNaN(currentValue) || currentValue == null || currentValue == ''){
        _this.val(1);
        parent.hideEye();
        ajaxFlag = true;
        return;
    }else{
    	/*if(currentValue > 1000){
    		_this.val(1000);
            parent.hideEye();
            ajaxFlag = true;
    		return;
    	}*/
        parent.hideEye();
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


/* -----------------------------------父级调用内容-begin-------------------------------- */
function getOrderInfo(){

	var obj = {};

	obj['qbiNum'] = $.trim($('#qqNum').val());
	if($('.sel-c li.sel').hasClass('other')){
		var a = $.trim($("#inputNum").val());
		obj['qbiPay'] = a + ' Q币';
	}else{
		obj['qbiPay'] = $('.sel-c li.sel').text();
	}

	return obj;
}
function getSubmitInfo(){
	var obj = {};
	var _num,_numPrice;
	
	if($('.sel-c li.sel').hasClass('other')){
		_num = $.trim($("#inputNum").val());
		_numPrice = $("#inputNum").val();
	}else{
		_num = $('.sel-c li.sel').attr('data-price');
		_numPrice = $('.sel-c li.sel').attr('data-price');
	}
	
	obj['gsCode'] = gsCode;
	obj['price'] = _numPrice;
	obj['chargeNumber'] = $.trim($('#qqNum').val());
	obj['num'] = _num;
	
	return obj;
}
/* -----------------------------------父级调用内容-end---------------------------------- */

