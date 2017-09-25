var app = angular.module("verificationApp", []);
app.controller("veryInfoCtrl", function($scope){

	$scope.tools = {
		//获得url中的get参数
		//name 需要获得参数的名称
		GetQueryString:function(name){
		  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		  var r = window.location.search.substr(1).match(reg);
		  if (r!=null)return decodeURIComponent(r[2]); 
		  return null;
		},
        getRandomNum:function(Min,Max){    //随机数生成
            var Range = Max - Min;   
            var Rand = Math.random();   
            return(Min + Math.round(Rand * Range)); 
        },
        jschars:['0','1','2','3','4','5','6','7','8','9'],
        createRandom:function(n) {
            var res = "";
            for(var i = 0; i < n ; i ++) {
                var id = Math.ceil(Math.random()*9);
                res += $scope.tools.jschars[id];
            }
            return res;
        },
	};

	$scope.state = {
		isShowSave:true,	//保存按钮显示隐藏
		errTip:'',			//错误提示信息
	};
	
	$scope.pattern = {
		mobile:/^1(3|4|5|7|8)\d{9}$/,				//手机号码校验
		name:/^[\·\u4E00-\u9FFF\u3400-\u4DFF]+$/,	//仅仅允许输入中文和英文半角“·”
		identity:/^[a-zA-Z0-9]+$/,					//允许“英文、数字”
		num:/^[0-9]+$/,								//允许“数字”
	};

	//初始化数据字典
	$scope.dictionary = {
			
		applicantNatureData:applicantNatureData,	//申请人性质
		idTypeData:idTypeData,						//证件类型
		nationData:nationData,						//民族
		housingUseData:housingUseData,				//规划用途
		housingNatureData:housingNatureData,		//房屋性质
		houseCseeionData:houseCseeionData,			//房屋转让方式
		buildingStructureData:buildingStructureData,//房屋结构
		
		searchCond:searchCond						//检索条件选择
		
	};

	
	$scope.dataModel = {
		//申请人信息集合
		applicantList:{
			applicantName:'',	//申请人姓名
			applicantNature:101,//申请人性质
			idType:101,			//证件类型
			idNumber:'',		//证件号码
			nation:0,			//民族
			mobile:'',			//联系电话
			address:'',			//地址
			maritalStatus:false,	//是否婚配
			mateName:'',		//配偶姓名
			mateIdtype:101,		//配偶证件类型
			mateIdnumber:''		//配偶证件号码
		},
		//权利人信息集合
		litigantList:[
		    {
		    	ownerName:'',	//权利人姓名
		    	idType:101,		//证件类型
		    	idNumber:''		//身份证
		    }
		],
		//房屋信息集合
		houseInfoList:{
			ownershipNumber:'',	//不动产权证号
			houseNumber:'',		//房产证号
			registerDate:'',	//登记时机
			totalNumber:'',		//总层数
			seatLayer:'',		//所在层
			buildingArea:'',	//建筑面积
			jacketArea:'',		//套内面积
			apportionedArea:'',	//分摊面积
			housingUse:101,		//规划用途
			housingNature:101,	//房屋性质
			landCode:'',		//地号
			houseCseeion:101,	//房屋转让方式
			landUsera:'',		//土地使用年限
			budingDate:'',		//修建年代
			landWay:101,			//土地使用权取得方式
			buildingStructure:101,	//房屋结构
			houseAddress:'',	//房屋坐落
			houseMemo:'',		//房屋备注信息
			transType:1,		//交易类型  1委托交易、0自行交易
			isOn:1,				//是否挂牌  1是、0否
			proStatus:0,		//验证是否通过  0未验证、1验证通过、2未通过
			proCode:'',			//房源验证码
			houseFrom:''		//房屋信息来源
		},
		houseImages:[]

	};

	$scope.dataModelVerify = {
		type:0,					//检索条件选择
		number:'',				//房产证号或不动产证号
		name:'',				//人名
		sequestrationStauts:'',	//查封状态
		freezeFlag:'', 			//冻结状态
		mortgageStatus:'',		//抵押状态
		previewStatus:'',		//预告状态
		signStatus:'',			//签约状态
		
		proStatus:'',			//验证状态
	}

	//操作事件处理
	$scope.ui = {
		//生成房源验证码
		createCode:function(){
			var date = new Date();
			this.year = date.getFullYear();
			this._month = date.getMonth() + 1;
			this.month = this._month < 10 ? "0" + this._month : this._month;
			this._date = date.getDate();
			this.date = this._date < 10 ? "0" + this._date : this._date;
			this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
			this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
			this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
			this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			//var currentTime = "现在是:" + this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second + " " + this.day;
			$scope.dataModel.houseInfoList.proCode = this.year+this.month+this.date+this.hour+this.minute+this.second+$scope.tools.createRandom(6);
		},
		changeSearch:function(){
			if($scope.dataModelVerify.type == 0){
				$scope.dataModelVerify.number = $scope.dataModel.houseInfoList.ownershipNumber;
			}
			if($scope.dataModelVerify.type == 1){
				$scope.dataModelVerify.number = $scope.dataModel.houseInfoList.houseNumber;
			}
		},
		searchClick:function(){
			if(!$.trim($scope.dataModelVerify.number)){
				$scope.state.errTip = '搜索条件不动产权证号和房产证号不能同时为空！';
				return false;
			}
			
			//提交后台
			$.ajax({
				url:'../../houseVerifi/getHouNoticeReu.svc',
				type:'POST',
				data:JSON.stringify({
					houseNum:$scope.dataModelVerify.number,
					ownerName:$scope.dataModelVerify.name,
					type:$scope.dataModelVerify.type
				}),
				success:function(data){
					if(data.succ){
						$scope.$apply(function(){
							if(data.result){
								$scope.dataModelVerify.sequestrationStauts = data.result.sequestrationStauts;	//查封状态
								$scope.dataModelVerify.freezeFlag = data.result.sequestrationStauts; 			//冻结状态
								$scope.dataModelVerify.mortgageStatus = data.result.sequestrationStauts;		//抵押状态
								$scope.dataModelVerify.previewStatus = data.result.sequestrationStauts;			//预告状态
								$scope.dataModelVerify.signStatus = data.result.sequestrationStauts;			//签约状态
								$scope.dataModelVerify.proStatus = data.result.sequestrationStauts;				//验证状态
								
								$scope.dataModel.houseInfoList.proStatus = data.result.proStatus;	
							}
						});
						console.log($scope.dataModel.houseInfoList.proStatus)
					}else{
						$scope.state.errTip = data.message;
					}
				},
				error:function(){
					$scope.state.errTip = '房源验证查询失败，请重新尝试，或联系技术人员处理！谢谢~';
				}
			});
		},
		//刷新
		refresh:function(){
			window.location.reload();
		},
		//增加权利人
		addUser:function(){
			$scope.dataModel.litigantList.push({
				ownerName:'',	//权利人姓名
		    	idType:101,		//证件类型
		    	idNumber:''		//身份证
			});
		},
		//初始化错误提示信息
		initErr:function(){
			//从初始化错误提示
			$scope.state.errTip = '';
		},
		//保存
		save:function(){
			
			//提交后台
			$.ajax({
				url:'../../houseVerifi/updateProStatus.svc',
				type:'POST',
				data:JSON.stringify({
					houseInfo:{
						proStatus:$scope.dataModel.houseInfoList.proStatus,
						proCode:$scope.dataModel.houseInfoList.proCode,
						houseNumber:$scope.dataModelVerify.number,
						type:$scope.dataModelVerify.type
					}

				}),
				success:function(data){
					if(data.succ){
						window.location.href="houseAllList.html";
					}else{
						$scope.state.errTip = data.message;
					}
				},
				error:function(){
					$scope.state.errTip = '数据保存失败，请重新尝试，或联系技术人员处理！谢谢~';
				}
			});

		}
	};
	
	
	var _houseNum = $scope.tools.GetQueryString('houseNum');
	if(_houseNum){
		//隐藏保存按钮
		$scope.state.isShowSave = false;
		//提交后台
		$.ajax({
			url:'../../houseVerifi/getHouseInfo.svc',
			type:'POST',
			data:JSON.stringify({
				id:_houseNum
			}),
			success:function(data){
				if(data.succ){
					
					$scope.$apply(function(){
						$scope.dataModel = data.result;
						
						//初始化搜索number
						$scope.dataModelVerify.number = $scope.dataModel.houseInfoList.ownershipNumber;
					});
					
				}else{
					$scope.state.errTip = data.message;
				}
			},
			error:function(){
				$scope.state.errTip = '房源验证详情查询失败，请重新尝试，或联系技术人员处理！谢谢~';
			}
		});

	}else{
		//显示保存按钮
		$scope.state.isShowSave = true;
	}


});

$(function(){
	$('#img-container').on('click',function(){
		createWeChat($('#img-container img').attr('src'));
	});
});