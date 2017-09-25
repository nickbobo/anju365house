/**
 * Created by Administrator on 2017/7/7.
 */
//性质
var character = [
    {key:0,value:"个人"},
    {key:1,value:"企业"},
    {key:2,value:"国家机关"},
    {key:3,value:"事业单位"},
    {key:4,value:"其他"}
];

//证件类型
var identity = [
    {key:0,value:"居民身份证"},
    {key:1,value:"护照"},
    {key:2,value:"军官证"},
    {key:3,value:"士兵证"},
    {key:4,value:"港澳型行政区居民身份证"},
    {key:5,value:"台胞证"},
    {key:6,value:"警官证"},
    {key:7,value:"营业执照"},
    {key:8,value:"组织机构代码证"},
    {key:9,value:"社会团体法人登记证书"},
    {key:10,value:"往来大陆通行证"},
    {key:11,value:"文职干部证"},
    {key:12,value:"学员证"},
    {key:13,value:"事业单位法人证书"},
    {key:14,value:"其他"}
];

//民族
var nation = [
    {key:0,value:"汉族"},
    {key:1,value:"蒙古族"},
    {key:2,value:"回族"},
    {key:3,value:"藏族"},
    {key:4,value:"维吾尔族"},
    {key:5,value:"苗族"},
    {key:6,value:"彝族"},
    {key:7,value:"壮族"},
    {key:8,value:"布依族"},
    {key:9,value:"朝鲜族"},
    {key:10,value:"满族"},
    {key:11,value:"侗族"},
    {key:12,value:"瑶族"},
    {key:13,value:"白族"},
    {key:14,value:"土家族"},
    {key:15,value:"哈尼族"},
    {key:16,value:"哈萨克族"},
    {key:17,value:"傣族"},
    {key:18,value:"黎族"},
    {key:19,value:"僳僳族"},
    {key:20,value:"佤族"},
    {key:21,value:"畲族"},
    {key:22,value:"高山族"},
    {key:23,value:"拉祜族"},
    {key:24,value:"水族"},
    {key:25,value:"东乡族"},
    {key:26,value:"纳西族"},
    {key:27,value:"景颇族"},
    {key:28,value:"柯尔克孜族"},
    {key:29,value:"土族"},
    {key:30,value:"达斡尔族"},
    {key:31,value:"仫佬族"},
    {key:32,value:"羌族"},
    {key:33,value:"布朗族"},
    {key:34,value:"撒拉族"},
    {key:35,value:"毛南族"},
    {key:36,value:"仡佬族"},
    {key:37,value:"锡伯族"},
    {key:38,value:"阿昌族"},
    {key:39,value:"普米族"},
    {key:40,value:"塔吉克族"},
    {key:41,value:"怒族"},
    {key:42,value:"乌孜别克族"},
    {key:43,value:"俄罗斯族"},
    {key:44,value:"鄂温克族"},
    {key:45,value:"德昂族"},
    {key:46,value:"保安族"},
    {key:47,value:"裕固族"},
    {key:48,value:"京族"},
    {key:49,value:"塔塔尔族"},
    {key:50,value:"独龙族"},
    {key:51,value:"鄂伦春族"},
    {key:52,value:"赫哲族"},
    {key:53,value:"门巴族"},
    {key:54,value:"珞巴族"},
    {key:55,value:"基诺族"}
];
 //是否结婚
var isMarry=[
    {key:0,value:false},
    {key:1,value:true}
];
//交易类型
var dealType=[
      {key:0,value:false},  
      {key:1,value:true},  
]

//是否挂牌
var isSell=[
      {key:0,value:false},  
      {key:1,value:true},  
]
//模糊查询条件
var searchCond = [
    {key:0,value:"根据不动产证号查询(模糊)"},
    {key:1,value:"根据房产证号查询"}
];

//查封状态
var sealStatus = ['未查封','封杀'];
var freezeStatus = ['未冻结','冻结'];
var pledgeStatus = ['未抵押','抵押'];
var foreshowStatus = ['无贷款','有贷款'];
var signStatus = ['未签约','签约'];

//规划用途
var useMethods=[
    {key:0,value:'物业管理用房'},
    {key:1,value:'人防'},
    {key:3,value:'非人防'},
    {key:4,value:'地下室'},
    {key:5,value:'车库'},
    {key:6,value:'商住'},
    {key:7,value:'公寓'},
    {key:8,value:'住宅'},
    {key:9,value:'成套住宅'},
    {key:10,value:'非成套住宅'},
    {key:11,value:'集体宿舍'},
    {key:12,value:'库房'},
    {key:13,value:'工业'},
    {key:14,value:'公用设施'},
    {key:15,value:'铁路'},
    {key:16,value:'民航'},
    {key:17,value:'航运'},
    {key:18,value:'仓储'},
    {key:19,value:'商业服务'},
    {key:20,value:'经营'},
    {key:21,value:'旅游'},
    {key:22,value:'金融保险'},
    {key:23,value:'电讯信息'},
    {key:24,value:'教育'},
    {key:25,value:'医疗卫生'},
    {key:26,value:'科研'},
    {key:27,value:'文化'},
    {key:28,value:'新闻'},
    {key:29,value:'娱乐'},
    {key:30,value:'园林绿化'},
    {key:31,value:'体育'},
    {key:32,value:'办公'},
    {key:33,value:'军事'},
    {key:34,value:'涉外'},
    {key:35,value:'宗教'},
    {key:36,value:'监狱'},
    {key:37,value:'宗教'},
    {key:38,value:'社区用房'},
    {key:39,value:'公建'},
    {key:40,value:'服务型公寓'},
    {key:41,value:'写字间'},
    {key:42,value:'商业'},
    {key:43,value:'经适房'},
    {key:44,value:'别墅'}, 
    {key:45,value:'高档公寓'},
    {key:46,value:'工业、交通、仓储'},
    {key:47,value:'公共设施'},
    {key:48,value:'公共运输'},
    {key:49,value:'商业、金融、信息'},
    {key:50,value:'教育、医疗、卫生、科研'},
    {key:51,value:'文化、娱乐、体育'},
    {key:52,value:'其他'}    
];

//房屋性质
var houseCharacters=[
    {key:0,value:"存量房"},
    {key:1,value:'商品房 '},
    {key:2,value:'经济适用房'},
    {key:3,value:' 房改房'}
];

//房屋取得方式
var houseMethods=[
    {key:0,value:"买卖"},
    {key:1,value:'继承'},
    {key:2,value:'裁决'},
    {key:3,value:'赠与'}
];

//房屋结构
var houseStructures=[
    {key:0,value:"钢"},
    {key:1,value:'钢、钢筋混泥土'},
    {key:2,value:'钢筋混泥土'},
    {key:3,value:'混合'},
    {key:4,value:'砖木'},
    {key:5,value:'砖混'},
    {key:6,value:'土木'},
    {key:7,value:'其他'}
];

//交易方式
var sellMethods=[
    {key:0,value:"委托资金监管机构交割(另行签订协议)"},
    {key:1,value:"甲乙自行交易"}
];

//截止日期
var breakTimes=[
    {key:0,value:"1日内"},
    {key:1,value:'7日内'},
    {key:2,value:'14日内'},
    {key:3,value:'30日内'}
];

//解决方式
var handleMethods=[
    {key:0,value:"人民法院诉讼"},
    {key:1,value:'仲裁机构仲裁'},
    {key:2,value:'双方自行协商'}
];

//税费承担
var taxMethods = [
    {key:0,value:"卖方承担税费"},
    {key:1,value:'买方承担税费'},
    {key:2,value:'双方自行商定'}
];

//还款方式
var repayMethods = [
    {key:0,value:"等额本金"},
    {key:1,value:'等额本息'}
];










