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
        //生成二维码
        createQrcode:new QRCode('img-container', {
            width:300,
            height:300,
            render:'table'
        })
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


	//操作事件处理
	$scope.ui = {
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
			
			if($scope.baseForm.applicantName.$error.required){
				$scope.state.errTip = '申请人姓名不能为空！';
				return false;
			}
			if($scope.baseForm.applicantName.$error.pattern){
				$scope.state.errTip = '申请人姓名格式不正确（只能输入中文及英文半角“.”）！';
				return false;
			}
			
			if($scope.baseForm.idNumber.$error.required){
				$scope.state.errTip = '申请人证件号码不能为空！';
				return false;
			}
			if($scope.baseForm.idNumber.$error.pattern){
				$scope.state.errTip = '申请人证件号码格式不正确（只能输入英文、数字）！';
				return false;
			}
			
			if($scope.baseForm.mobile.$error.required){
				$scope.state.errTip = '联系电话不能为空！';
				return false;
			}
			if($scope.baseForm.mobile.$error.pattern){
				$scope.state.errTip = '联系电话格式不正确！';
				return false;
			}
			
			if($scope.dataModel.applicantList.maritalStatus){
				if($scope.baseForm.mateName.$error.required){
					$scope.state.errTip = '配偶姓名不能为空！';
					return false;
				}
				if($scope.baseForm.mateName.$error.pattern){
					$scope.state.errTip = '配偶姓名格式不正确（只能输入中文及英文半角“.”）！';
					return false;
				}
				
				if($scope.baseForm.mateIdnumber.$error.required){
					$scope.state.errTip = '配偶证件号码不能为空！';
					return false;
				}
				if($scope.baseForm.mateIdnumber.$error.pattern){
					$scope.state.errTip = '配偶证件号码格式不正确（只能输入英文、数字）！';
					return false;
				}
			}
			
			if($scope.baseForm.ownerNames.$error.required){
				$scope.state.errTip = '权利人姓名不能为空！';
				return false;
			}
			if($scope.baseForm.ownerNames.$error.pattern){
				$scope.state.errTip = '权利人姓名格式不正确（只能输入中文及英文半角“.”）！';
				return false;
			}
			
			if($scope.baseForm.idNumbers.$error.required){
				$scope.state.errTip = '权利人证件号码不能为空！';
				return false;
			}
			if($scope.baseForm.idNumbers.$error.pattern){
				$scope.state.errTip = '权利人证件号码格式不正确（只能输入英文、数字）！';
				return false;
			}
			
			
			/* 不动产权证号和房产证号不能同时为空 */
			if($.trim($scope.dataModel.houseInfoList.ownershipNumber) == '' || $.trim($scope.dataModel.houseInfoList.ownershipNumber) == null){
				if($.trim($scope.dataModel.houseInfoList.houseNumber) == '' || $.trim($scope.dataModel.houseInfoList.houseNumber) == null){
					$scope.state.errTip = '不动产权证号和房产证号不能同时为空！';
					return false;
				}
			}
			if($.trim($scope.dataModel.houseInfoList.houseNumber) == '' || $.trim($scope.dataModel.houseInfoList.houseNumber) == null){
				if($.trim($scope.dataModel.houseInfoList.ownershipNumber) == '' || $.trim($scope.dataModel.houseInfoList.ownershipNumber) == null){
					$scope.state.errTip = '不动产权证号和房产证号不能同时为空！';
					return false;
				}
			}
			
			
			if($scope.baseForm.totalNumber.$error.required){
				$scope.state.errTip = '总层数不能为空！';
				return false;
			}
			if($scope.baseForm.totalNumber.$error.pattern){
				$scope.state.errTip = '总层数格式不正确（只能输入数字且为整数）！';
				return false;
			}
			
			if($scope.baseForm.seatLayer.$error.required){
				$scope.state.errTip = '所在层不能为空！';
				return false;
			}
			if($scope.baseForm.seatLayer.$error.pattern){
				$scope.state.errTip = '所在层格式不正确（只能输入数字且为整数）！';
				return false;
			}
			
			if($scope.baseForm.buildingArea.$error.required){
				$scope.state.errTip = '建筑面积不能为空！';
				return false;
			}
			if(isNaN($scope.dataModel.houseInfoList.buildingArea)){
				$scope.state.errTip = '建筑面积格式不正确（只能输入数字）！';
				return false;
			}
			
			if($scope.baseForm.jacketArea.$error.required){
				$scope.state.errTip = '套内建筑面积不能为空！';
				return false;
			}
			if(isNaN($scope.dataModel.houseInfoList.jacketArea)){
				$scope.state.errTip = '套内建筑面积格式不正确（只能输入数字）！';
				return false;
			}
			
			if($scope.baseForm.apportionedArea.$error.required){
				$scope.state.errTip = '分摊面积不能为空！';
				return false;
			}
			if(isNaN($scope.dataModel.houseInfoList.apportionedArea)){
				$scope.state.errTip = '分摊面积格式不正确（只能输入数字）！';
				return false;
			}
			
			if($scope.baseForm.houseAddress.$error.required){
				$scope.state.errTip = '房屋坐落不能为空！';
				return false;
			}
			
			
			
			//是否婚配传给后台数据调整
			if($scope.dataModel.applicantList.maritalStatus){
				$scope.dataModel.applicantList.maritalStatus = 1;
			}else{
				$scope.dataModel.applicantList.maritalStatus = 0;
			}
			//登记时间赋值
			$scope.dataModel.houseInfoList.registerDate = $('#registerDate').val();
			
			//提交后台
			$.ajax({
				url:'../../houseVerifi/houseInfoSave.svc',
				type:'POST',
				data:JSON.stringify($scope.dataModel),
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
					});
					if($scope.dataModel.houseInfoList.proCode){
						$scope.tools.createQrcode.makeCode($scope.dataModel.houseInfoList.proCode);
					}
					
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