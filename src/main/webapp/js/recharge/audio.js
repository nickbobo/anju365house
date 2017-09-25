var userAgent = navigator.userAgent, 
rMsie = /(msie\s|trident.*rv:)([\w.]+)/, 
rFirefox = /(firefox)\/([\w.]+)/, 
rOpera = /(opera).+version\/([\w.]+)/, 
rChrome = /(chrome)\/([\w.]+)/, 
rSafari = /version\/([\w.]+).*(safari)/;
var browser;
var version;
var ua = userAgent.toLowerCase();
function uaMatch(ua) {
	var match = rMsie.exec(ua);
	if (match != null) {
		return { browser : "IE", version : match[2] || "0" };
	}	
	var match = rFirefox.exec(ua);
	if (match != null) {
		return { browser : match[1] || "", version : match[2] || "0" };
	}	
	var match = rOpera.exec(ua);
	if (match != null) {
		return { browser : match[1] || "", version : match[2] || "0" };
	}	
	var match = rChrome.exec(ua);
	if (match != null) {
		return { browser : match[1] || "", version : match[2] || "0" };
	}	
	var match = rSafari.exec(ua);
	if (match != null) {
		return { browser : match[2] || "", version : match[1] || "0" };
	}
	if (match != null) {
		return { browser : "", version : "0" };
	}
}
var browserMatch = uaMatch(userAgent.toLowerCase());
if (browserMatch.browser) {
	browser = browserMatch.browser;
	version = browserMatch.version;
}
if(browser == 'IE' && version < 8){
	document.write('您的浏览器版本过低，为 IE: ' + version + ' ,请升级您的浏览器！（我们仅支持ie8及以上浏览器，谢谢～）' + '<a href="http://www.firefox.com.cn/" target="_blank">http://www.firefox.com.cn/</a>');
}

if(browser == 'IE'){
document.write(
	'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voice0" width="0" height="0">'+
	'<param name="URL" value="voice/0.wav">'+
	'<param name="autoStart" value="0">'+
	'</object>'+
	'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voice1" width="0" height="0">'+
	'<param name="URL" value="voice/1.wav">'+
	'<param name="autoStart" value="0">'+
	'</object>'+
	'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voice2" width="0" height="0">'+
	'<param name="URL" value="voice/2.wav">'+
	'<param name="autoStart" value="0">'+
	'</object>'+
	'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voice3" width="0" height="0">'+
	'<param name="URL" value="voice/3.wav">'+
	'<param name="autoStart" value="0">'+
	'</object>'+
	'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voice4" width="0" height="0">'+
	'<param name="URL" value="voice/4.wav">'+
	'<param name="autoStart" value="0">'+
	'</object>'+
	'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voice5" width="0" height="0">'+
	'<param name="URL" value="voice/5.wav">'+
	'<param name="autoStart" value="0">'+
	'</object>'+
	'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voice6" width="0" height="0">'+
	'<param name="URL" value="voice/6.wav">'+
	'<param name="autoStart" value="0">'+
	'</object>'+
	'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voice7" width="0" height="0">'+
	'<param name="URL" value="voice/7.wav">'+
	'<param name="autoStart" value="0">'+
	'</object>'+
	'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voice8" width="0" height="0">'+
	'<param name="URL" value="voice/8.wav">'+
	'<param name="autoStart" value="0">'+
	'</object>'+
	'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voice9" width="0" height="0">'+
	'<param name="URL" value="voice/9.wav">'+
	'<param name="autoStart" value="0">'+
	'</object>'+
	'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voice10" width="0" height="0">'+
	'<param name="URL" value="voice/10.wav">'+
	'<param name="autoStart" value="0">'+
	'</object>'+
	'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voice100" width="0" height="0">'+
	'<param name="URL" value="voice/100.wav">'+
	'<param name="autoStart" value="0">'+
	'</object>'+
	'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voiceYuan" width="0" height="0">'+
	'<param name="URL" value="voice/yuan.wav">'+
	'<param name="autoStart" value="0">'+
	'</object>'+
	'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voiceBack" width="0" height="0">'+
	'<param name="URL" value="voice/jump.wav">'+
	'<param name="autoStart" value="0">'+
	'</object>'+'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" id="voice" width="0" height="0">'+
	'<param name="URL" value="">'+
	'<param name="rate" value="1">'+
	'<param name="balance" value="0">'+
	'<param name="currentPosition" value="0">'+
	'<param name="defaultFrame" value>'+
	'<param name="playCount" value="1">'+
	'<param name="autoStart" value="0">'+
	'<param name="currentMarker" value="0">'+
	'<param name="invokeURLs" value="-1">'+
	'<param name="baseURL" value="">'+
	'<param name="volume" value="100">'+
	'<param name="mute" value="0">'+
	'<param name="uiMode" value="full">'+
	'<param name="stretchToFit" value="0">'+
	'<param name="windowlessVideo" value="0">'+
	'<param name="enabled" value="-1">'+
	'<param name="enableContextMenu" value="-1">'+
	'<param name="fullScreen" value="0">'+
	'<param name="SAMIStyle" value>'+
	'<param name="SAMILang" value>'+
	'<param name="SAMIFilename" value>'+
	'<param name="captioningID" value>'+
	'<param name="enableErrorDialogs" value="0">'+
	'<param name="_cx" value="6482">'+
	'<param name="_cy" value="6350">'+
	'</object>');
}else{ 
	document.write('<audio id="voice0" src="voice/0.wav" preload="auto"></audio>'+
		'<audio id="voice1" src="voice/1.wav" preload="auto"></audio>'+
		'<audio id="voice2" src="voice/2.wav" preload="auto"></audio>'+
		'<audio id="voice3" src="voice/3.wav" preload="auto"></audio>'+
		'<audio id="voice4" src="voice/4.wav" preload="auto"></audio>'+
		'<audio id="voice5" src="voice/5.wav" preload="auto"></audio>'+
		'<audio id="voice6" src="voice/6.wav" preload="auto"></audio>'+
		'<audio id="voice7" src="voice/7.wav" preload="auto"></audio>'+
		'<audio id="voice8" src="voice/8.wav" preload="auto"></audio>'+
		'<audio id="voice9" src="voice/9.wav" preload="auto"></audio>'+
		'<audio id="voice10" src="voice/10.wav" preload="auto"></audio>'+
		'<audio id="voice100" src="voice/100.wav" preload="auto"></audio>'+
		'<audio id="voiceYuan" src="voice/yuan.wav" preload="auto"></audio>'+
		'<audio id="voiceBack" src="voice/jump.wav" preload="auto"></audio>'+
		'<audio id="voice" src=""></audio>');
}

//开启/关闭声音
function sound(ele){
	T = $(ele);
	if(T.hasClass('audio-close')){
		T.removeClass('audio-close').addClass('audio-open');
		$('#sounds').val(1);
		setVoiceStorage(1);
	}else{
		T.removeClass('audio-open').addClass('audio-close');
		$('#sounds').val(2);
		setVoiceStorage(2);
	}
}

$(function(){
	//加载声音开启关闭的初始化状态
	var dom=$(".audioBtn").eq(0);
	var turn=getVoiceStorage();
	if (turn==1){
		dom.removeClass("audio-close").addClass("audio-open");
	}else{
		dom.removeClass("audio-open").addClass("audio-close");
	}
	$('#sounds').val(turn);
	setVoiceStorage(turn);
});

//选择面额发音封装函数 -- (需求不需要，保留，以后用到改写)
function runSound(nums){
	if($('#sounds').val()==1){
		//需要发十位和百位的声音
		var place;
		if(id.length == 2){
			place = 10;
		}else if(id.length == 3){
			place = 100;
		}
		if(browser == 'IE'){
			document.getElementById("voice").URL = './download/voice/' + nums + '.wav';
			document.getElementById("voice").controls.play();
			setTimeout(function(){
				document.getElementById("voice").URL = './download/voice/' + place + '.wav';
				document.getElementById("voice").controls.play();
			},300);
		}else{
			//Reserved non IE
			document.getElementById("voice").src = './download/voice/' + nums + '.wav';
			document.getElementById("voice").play();
			setTimeout(function(){
				document.getElementById("voice").src = './download/voice/' + place + '.wav';
				document.getElementById("voice").play();
			},300);
		}
	}
}

//modify by relax 2017/5/9 增加了对播放按钮状态的全局保存
function getVoiceStorage(){
	var temp=localStorage.getItem("voice");
	if (temp+""=="null"){
		temp=$("#sounds").val();
	}
	return temp;
}

function setVoiceStorage(valueStr){
	localStorage.setItem("voice",valueStr);
}
