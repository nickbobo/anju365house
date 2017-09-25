/**
 * Created by Administrator on 2017/7/7.
 */
/*angular模块部分*/
var app=angular.module('loanApp',[]);
app.controller("loanCtrl",function($scope,$http){
    $scope.tools={
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
        }
    };
    $scope.state={
    	errTip:'',			//错误提示信息
    };
    
    $scope.pattern = {
		mobile:/^1(3|4|5|7|8)\d{9}$/,				//手机号码校验
		name:/^[\·\u4E00-\u9FFF\u3400-\u4DFF]+$/,	//仅仅允许输入中文和英文半角“·”
		identity:/^[a-zA-Z0-9]+$/,					//允许“英文、数字”
		num:/^[0-9]+$/,								//允许“数字”
	};

    $scope.dictionary={
    	idTypeData:idTypeData,			//证件类型
    	bankData:bankData,				//银行
    	payMenthodData:payMenthodData	//还款方式
    };
    
    $scope.dataModel={
    	applicantName:'',			//申请人名称
	    applicantPhone:'',			//申请人电话
	    idType:101,					//申请人证件类型
	    idNumber:'',				//申请人证件号码
	    include:'',					//申请人税前收入
	    housingFund:'',				//公积金账号
	    price:'',					//房屋总价
	    firstPay:'',				//首付款
	    workAddress:'',				//工作单位
	    contactAddress:'',			//联系地址
	    maritalStatus:0,			//婚姻状况
	    mateName:'',				//配偶姓名
	    mateIdtype:101,				//配偶证件类型
	    mateIdnumber:'',			//配偶证件号码
	    maritalAttest:'',			//婚姻证明
	    applicantBank:101,			//申请银行
	    applicantMoney:'',			//申请金额
	    loanTerm:30,				//贷款年限
	    payMenthod:101,				//还款方式
	    proCode:'',					//房源验证嘛
	    personalCredit:'',			//个人征信
	    loanCode:'',				//贷款单号
	    applicantStatus:'',			//申请状态
    };
    
    $scope.ui={
		//初始化错误提示信息
		initErr:function(){
			//从初始化错误提示
			$scope.state.errTip = '';
		},
    	//保存提交
        submit:function(){
        	if($scope.baseForm.applicantName.$error.required){
				$scope.state.errTip = '申请人姓名不能为空！';
				return false;
			}
			if($scope.baseForm.applicantName.$error.pattern){
				$scope.state.errTip = '申请人姓名格式不正确（只能输入中文及英文半角“.”）！';
				return false;
			}
			
			if($scope.baseForm.applicantPhone.$error.required){
				$scope.state.errTip = '联系电话不能为空！';
				return false;
			}
			if($scope.baseForm.applicantPhone.$error.pattern){
				$scope.state.errTip = '联系电话格式不正确！';
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
        	
        	if($scope.baseForm.include.$error.required){
				$scope.state.errTip = '月收入(税前)不能为空！';
				return false;
			}
			if(isNaN($scope.dataModel.include)){
				$scope.state.errTip = '月收入(税前)格式不正确（只能输入数字）！';
				return false;
			}
			
        	if($scope.baseForm.housingFund.$error.required){
				$scope.state.errTip = '公积金账号不能为空！';
				return false;
			}
			if($scope.baseForm.housingFund.$error.pattern){
				$scope.state.errTip = '公积金账号格式不正确（只能输入数字且为整数）！';
				return false;
			}
			
        	if($scope.baseForm.price.$error.required){
				$scope.state.errTip = '房屋总价不能为空！';
				return false;
			}
			if(isNaN($scope.dataModel.price)){
				$scope.state.errTip = '房屋总价格式不正确（只能输入数字）！';
				return false;
			}
			
        	if($scope.baseForm.firstPay.$error.required){
				$scope.state.errTip = '首付款不能为空！';
				return false;
			}
			if(isNaN($scope.dataModel.firstPay)){
				$scope.state.errTip = '首付款格式不正确（只能输入数字）！';
				return false;
			}
			
        	if($scope.baseForm.workAddress.$error.required){
				$scope.state.errTip = '工作单位不能为空！';
				return false;
			}
        	
        	if($scope.baseForm.contactAddress.$error.required){
				$scope.state.errTip = '联系地址不能为空！';
				return false;
			}
        	
        	if($scope.dataModel.maritalStatus == 1){
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
        	
        	if($scope.baseForm.applicantMoney.$error.required){
				$scope.state.errTip = '申请金额不能为空！';
				return false;
			}
			if(isNaN($scope.dataModel.applicantMoney)){
				$scope.state.errTip = '申请金额格式不正确（只能输入数字）！';
				return false;
			}
			
        	if($scope.baseForm.loanTerm.$error.required){
				$scope.state.errTip = '贷款年限不能为空！';
				return false;
			}
			if($scope.baseForm.loanTerm.$error.pattern){
				$scope.state.errTip = '贷款年限格式不正确（只能输入数字且为整数）！';
				return false;
			}
        	if($scope.baseForm.proCode.$error.required){
				$scope.state.errTip = '房源验证码不能为空！';
				return false;
			}
        	
        	//提交后台
    		$.ajax({
    			url:'../../houseVerifi/getHouseInfo.svc',
    			type:'POST',
    			data:JSON.stringify({
    				id:_houseNum
    			}),
    			success:function(data){
    				if(data.succ){
    					
    					window.location.href="loanApplyList.html";
    					
    				}else{
    					alert(data.message);
    				}
    			},
    			error:function(){
    				alert('房源验证详情查询失败，请重新尝试，或联系技术人员处理！谢谢~');
    			}
    		});
        	
      
        }
    };

});