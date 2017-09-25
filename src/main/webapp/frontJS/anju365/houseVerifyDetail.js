/**
 * Created by Administrator on 2017/7/31.
 */
var app=angular.module("houseVerifyDetailApp",[]);
app.controller('houseVerifyDetailCtrl',function($scope){
		//初始化数据字典
		$scope.state={
				"isShowSave":false,
				"isPass":false
		}
		$scope.dictionary = {
			applicantNatureData:applicantNatureData,	//申请人性质
			idTypeData:idTypeData,						//证件类型
			nationData:nationData,						//民族
			housingUseData:housingUseData,				//规划用途
			housingNatureData:housingNatureData,		//房屋性质
			houseCseeionData:houseCseeionData,			//房屋转让方式
			buildingStructureData:buildingStructureData,//房屋结构
		};
//发送ajax传送的参数
		$scope.id={
				"id":''
		};
    //数据模型
	
    $scope.dataModel = {
    		//申请人信息集合
    		applicantList:{
    			applicantName:'',	//申请人姓名
    			applicantNature:'',//申请人性质
    			idType:'',			//证件类型
    			idNumber:'',		//证件号码
    			nation:'',			//民族
    			mobile:'',		//联系方式
    			address:'',			//地址
    			maritalStatus:'',	//是否婚配
    			mateName:'',		//配偶姓名
    			mateIdtype:'',		//配偶证件类型
    			mateIdnumber:''		//配偶证件号码
    		},
    		//权利人信息集合
    		litigantList:[
    		    {
    		    	ownerName:'',	//权利人姓名
    		    	idType:'',		//证件类型
    		    	idNumber:''		//身份证
    		    }
    		],
    		//房屋信息集合
    		houseInfoList:{
    			ownershipNumber:'',	//房产证号
    			houseNumber:'',		//房产证号
    			registerDate:'',	//登记时机
    			totalNumber:'',		//总层数
    			seatLayer:'',		//所在层
    			buildingArea:'',	//建筑面积
    			jacketArea:'',		//套内面积
    			apportionedArea:'',	//分摊面积
    			housingUse:'',		//规划用途
    			housingNature:'',	//房屋性质
    			landCode:'',		//地号
    			houseCseeion:'',	//房屋转让方式
    			landUsera:'',		//土地使用年限
    			budingDate:'',		//修建年代
    			landWay:'',			//土地使用权取得方式
    			buildingStructure:'',	//房屋结构
    			houseAddress:'',	//房屋坐落
    			houseMemo:'',		//房屋备注信息
    			transType:'',		//交易类型  1委托交易、0自行交易
    			isOn:'',				//是否挂牌  1是、0否
    			proStatus:'',		//验证是否通过  0未验证、1验证通过、2未通过
    			proCode:'',			//房源验证码
    			houseFrom:''		//房屋信息来源
   		}
    	};
    
    $scope.tools = {
    		//获得url中的get参数
    		//name 需要获得参数的名称
    		GetQueryString:function(name){
    		  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    		  var r = window.location.search.substr(1).match(reg);
    		  if (r!=null)return decodeURIComponent(r[2]); 
    		  return null;
    		},
    		  //生成二维码
            createQrcode:new QRCode('img-container', {
                width:300,
                height:300,
                render:'table'
            })
    	};

    //方法
    $scope.ui={
       //根据href中的参数发送ajax获取数据渲染页面
    		
		render_detail:function(){
			$scope.id={
					"id":$scope.tools.GetQueryString("id")
			};
			$.ajax({
				url:'../../houseVerifi/getHouseInfo.svc',
				type:'POST',
				data:JSON.stringify($scope.id),
				success:function(data){
				
					if(data.succ){
						$scope.$apply(function(){
							//是否婚配传给后台数据调整
							if(data.result.applicantList.maritalStatus==1){
								data.result.applicantList.maritalStatus = true;
							}else{
								data.result.applicantList.maritalStatus = false;
							}
							
							$scope.dataModel=data.result;
							//判断是否显示房源验证码的框
							if(data.result.houseInfoList.proStatus==1){
								
								$scope.state.isPass=true;
							}else{
								
								$scope.state.isPass=false;
							}
							
							//判断二维码出现与否
							if($scope.dataModel.houseInfoList.proCode){
								$scope.tools.createQrcode.makeCode($scope.dataModel.houseInfoList.proCode);
							}
							
						})
						
					}else{
						$scope.state.errTip = data.message;
					}
				},
				error:function(data){
					$scope.state.errTip = '房源验证详情查询失败，请重新尝试，或联系技术人员处理！谢谢~';
				}
			});
		
		}
    }
    $scope.ui.render_detail();
});
function createWeChat(imgUrl){
	$('<div id="pop_page" style="display:none;position:fixed;top:0;right:0;bottom:0;left:0;background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNFMkE0MDBBOERFNTExRTVBRjUxRDg2NzNENDQ3NDNCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNFMkE0MDBCOERFNTExRTVBRjUxRDg2NzNENDQ3NDNCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0UyQTQwMDg4REU1MTFFNUFGNTFEODY3M0Q0NDc0M0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0UyQTQwMDk4REU1MTFFNUFGNTFEODY3M0Q0NDc0M0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz64ZzTUAAAAD0lEQVR42mIQFlXaDxBgAAGTAQpzue8GAAAAAElFTkSuQmCC) 0 0 repeat;background-size:1px 1px;z-index:1000;"><div style="background:#fff;padding:20px;width:340px;position:absolute;top:50%;left:50%;margin-top:-170px;margin-left:-170px;z-index:1000;"><img src="'+imgUrl+'" style="display:block;margin:0 auto;"></div></div>').appendTo('body');
	$('#pop_page').fadeIn(300); 
	$('#pop_page').on('click',function(){
		$(this).fadeOut(300,function(){
			$(this).remove();
		});
	});
}

$(function(){
	$('#img-container').on('click',function(){
		createWeChat($('#img-container img').attr('src'));
	});
});
