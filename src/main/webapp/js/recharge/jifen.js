//======== modify by relax ============
//积分对象
function jfBusiness(){
	//绑定相关的初始化事件 modify by relax 2017/5/9
	//回填积分说明及绑定积分查看事件
	$("#showJFintro .JFcontent").html(jfIntroObj);
	$("#showJFdetails").click(function(){
		$("#showJFintro").show();
	});
	$("#showJFintro .icon-cha").click(function(){
		$("#showJFintro").hide();
	});
	
	var data={
		JFmin:0,
		JFmax:0,
		JFstep:100,
		JFacc:0,
		JF:0,        //当前设置积分
		flag:false,  //标记是否已经同服务端进行通信
		use:false    //是否使用积分
	};
	
	var domObj={};   //记录不同对话框下的dom对象
	var nowID="";    //记录当前的对话框ID编号
	var isShow={};   //modify by relax 2017/4/6 记录当前的积分框是否显示过，显示过则即使现有积分为0也同样显示
	
	//------ ajax---------------
	var ajax=new relaxAJAX({
		url: "../../pointInterfaceService/pointRule.svc",
		//url:"/recharge/views/recharge/jifen.json",
		before: function(){
			setShowStyle("loading");
		},
		success: function(jsonData){
			data.flag=true;
			//判断是否服务端业务错误，
			if (jsonData.success==false){
				setShowStyle("error",jsonData.msg);
				setFrameShow("hide");
			}else{
				/*
				data.JFmin=jsonData.min-0;
				data.JFmax=jsonData.max-0;
				data.JFstep=jsonData.step-0;
				data.JFacc=jsonData.now-0;
				*/
				jsonData = jsonData.result;
				data.JFmin=parseInt(jsonData.minPoint)-0;
				data.JFmax=parseInt(jsonData.maxPoint)-0;
				data.JFstep=parseInt(jsonData.step)-0;
				data.JFacc=parseInt(jsonData.amount)-0;
				setShowStyle("ok");
				if (data.JFmax<=0 || data.JFacc==0){
					if (isShow[nowID]==true){
						setFrameShow("show");
					}else{
						setFrameShow("hide");
					}
				}else{
					setFrameShow("show");
					isShow[nowID]=true;
				}
			}
		},
		error: function(code, errstr){
			data.flag=true;
			setShowStyle("error",errstr);
			setFrameShow("hide");
		}
	});
	
	//设置整体框架的可见不可见
	function setFrameShow(style){
		if (style=="hide"){
			domObj[nowID]["father"].removeClass("show");
		}else{
			domObj[nowID]["father"].addClass("show");
		}
	}
	
	//获取对应对话框下的dom元素
	function getDom(idStr){
		nowID=idStr;
		if (nowID in domObj) return;
		//modify by relax 2017/4/6 协调积分框的可见不可见
		if (!(nowID in isShow)){
			isShow[nowID]=false;
		}
		var father=$("#"+nowID);
		domObj[nowID]={};
		domObj[nowID]["father"]=father;
		domObj[nowID]["showDom"]=father.find(".jf").eq(0);      //积分显示外框
		domObj[nowID]["setDom"]=father.find(".jfset").eq(0);        //积分设置外框
		domObj[nowID]["setButton"]=father.find(".jfEnable").eq(0);  //积分是否使用按钮
		domObj[nowID]["bntMinus"]=father.find(".bntMinus").eq(0);   //积分减少按钮
		domObj[nowID]["bntAdd"]=father.find(".bntAdd").eq(0);       //积分增加按钮
		domObj[nowID]["bntRty"]=father.find(".jfReget").eq(0);      //重新获得积分按钮
		domObj[nowID]["num"]=new relax_telNumber({
			id: nowID+"Num",
			template:"xxxxxxxxxx",
			e_blur:function(CL){
				var nowValue=CL.obj.val();
				setJF(nowValue);
			}
		});             //积分输入框
		domObj[nowID]["jfAccount"]=father.find(".jfAccount").eq(0); //账户积分
		domObj[nowID]["jfUsenow"]=father.find(".jfUsenow").eq(0);   //可使用最大积分
		
		//====事件绑定 =======
		//ajax重试按钮事件
		domObj[nowID]["bntRty"].click(function(){
			ajax.send();
		});
		
		//使用积分按钮事件
		domObj[nowID]["setButton"].click(function(){
			if (domObj[nowID]["showDom"].hasClass("loading") || domObj[nowID]["showDom"].hasClass("error")) return false;
			if (domObj[nowID]["setButton"].attr("data")=="false"){
				domObj[nowID]["setButton"].attr("data","true");
				//setJF(data.JFmin);
				//modify by relax 2017/3/31 把积分的默认使用值设置为可用最大值
				setJF(data.JFmax);
				setSetStyle("");
			}else{
				domObj[nowID]["setButton"].attr("data","false");
				setJF();
				setSetStyle("disabled");
			}
		});
		
		//加按钮绑定
		domObj[nowID]["bntAdd"].click(function(){
			setJF("add");
		});
		
		//减按钮绑定
		domObj[nowID]["bntMinus"].click(function(){
			setJF("minus");
		});
	}
	
	//设置显示部分状态
	//use --ok,loading,error
	function setShowStyle(use,msg){
		switch(use){
			case "ok":
				domObj[nowID]["showDom"].removeClass("loading").removeClass("error");
				domObj[nowID]["jfAccount"].text(data.JFacc);
				domObj[nowID]["jfUsenow"].text(data.JFmax);
				//设置输入框的maxlength
				var lenNum=data.JFmax.toString().length;
				domObj[nowID]["num"].obj.attr("maxlength",lenNum);
				break;
			case "loading":
				domObj[nowID]["showDom"].removeClass("error").addClass("loading");
				setInit();
				break;
			case "error":
				domObj[nowID]["showDom"].removeClass("loading").addClass("error");
				domObj[nowID]["showDom"].find(".errorMsg").text(msg);
				break;
			default:
				return;
		}
	}
	
	//设置设置部分状态
	function setSetStyle(use){
		if (use=="disabled"){
			domObj[nowID]["setDom"].addClass("disabled");
			domObj[nowID]["num"].obj.attr("disabled","disabled");
		}else{
			domObj[nowID]["setDom"].removeClass("disabled");
			domObj[nowID]["num"].obj.removeAttr("disabled");
		}
	}
	
	//初始化数据
	function setInit(){
		data.JFmin=0;
		data.JFmax=0;
		data.JFstep=100;
		data.JFacc=0;
		data.JF=0;
		data.flag=false;   //标记是否已经同服务端进行通信
		data.use=false;
		domObj[nowID]["num"].setValue("0");
		domObj[nowID]["setButton"].attr("data","false");
		setSetStyle("disabled");
		if (!isShow[nowID]) setFrameShow("hide");
	}
	
	//设置当前设置的积分值
	function setJF(nowValue){
		var nowMax=0,nowMin=0;
		if (data.JFacc<data.JFmin){
		}else{
			if (data.JFacc<data.JFmax){
				nowMax=parseInt(data.JFacc/data.JFstep)*data.JFstep;
			}else{
				nowMax=data.JFmax;
			}
			nowMin=data.JFmin;
		}
		switch(nowValue){
			//增加按钮处理
			case "add":
				data.use=true;
				if (domObj[nowID]["setDom"].hasClass("disabled")) return;
				if (data.JF==nowMax) return;
				if (data.JF+data.JFstep>nowMax){
					nowValue=nowMax;
				}else{
					nowValue=data.JF+data.JFstep;
				}
				break;
			//减少按钮处理
			case "minus":
				data.use=true;
				if (domObj[nowID]["setDom"].hasClass("disabled")) return;
				if (data.JF==nowMin) return;
				if (data.JF-data.JFstep<nowMin){
					nowValue=nowMin;
				}else{
					nowValue=data.JF-data.JFstep;
				}
				break;
			default:
				//不使用积分处理 nowValue为undefined
				if (!nowValue){
					data.JF=0;
					data.use=false;
					domObj[nowID]["num"].setValue("0");
					return;
				}
				data.use=true;
				nowValue=nowValue-0;
				if (isNaN(nowValue)){
					nowValue=nowMin;
				}else{
					if (nowValue>nowMax){
						nowValue=nowMax;
					}else{
						if (nowValue<nowMin){
							nowValue=nowMin;
						}else{
							if (nowValue % data.JFstep != 0){
								nowValue=parseInt(nowValue/data.JFstep)*data.JFstep;
							}
						}
					}
				}
		}
		data.JF=nowValue;
		domObj[nowID]["num"].setValue(nowValue);
	}
	
	//发送ajax请求获取积分参数
	function sendAJAX(idStr, data){
		//重置DOM对象
		getDom(idStr);
		
		var sendData="";
		if (("gsCode" in data) && data.gsCode){
			sendData+="gsCode="+data.gsCode;
		}
		if (("price" in data) && data.price){
			if (sendData){
				sendData+="&price="+data.price;
			}else{
				sendData+="price="+data.preice;
			}
		}
		ajax.data=sendData;
		ajax.send();
	}
	
	return {data:data, send:sendAJAX};
}