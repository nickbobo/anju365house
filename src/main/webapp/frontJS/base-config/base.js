//性质
var applicantNatureData = [
	{key:101,value:"个人"},
	{key:102,value:"企业"},
	{key:103,value:"国家机关"},
	{key:104,value:"事业单位"},
	{key:105,value:"其他"}
];

var cq=[
        {key:650109,value:'米东区'},
        {key:650102,value:'天山区'},
        {key:650103,value:'沙依巴克区'},
        {key:650106,value:'经济技术开发区(头屯河区)'},
        {key:650105,value:'水磨沟区'},
        {key:650104,value:'高新技术开发区'},
        {key:650107,value:'达坂城区'},
        {key:650121,value:'乌鲁木齐县'},
        {key:650130,value:'甘泉堡经济技术开发区(工业区)'},
        {key:650122,value:'其他'},
      ]

//证件类型
var idTypeData = [
	{key:101,value:"居民身份证"},
	{key:102,value:"护照"},
	{key:103,value:"军官证"},
	{key:104,value:"士兵证"},
	{key:105,value:"港澳型行政区居民身份证"},
	{key:106,value:"台胞证"},
	{key:107,value:"警官证"},
	{key:108,value:"营业执照"},
	{key:109,value:"组织机构代码证"},
	{key:110,value:"社会团体法人登记证书"},
	{key:111,value:"往来大陆通行证"},
	{key:112,value:"文职干部证"},
	{key:113,value:"学员证"},
	{key:114,value:"事业单位法人证书"},
	{key:115,value:"其他"}
];

//规划用途
var housingUseData=[
	{key:101,value:'物业管理用房'},
	{key:102,value:'人防'},
	{key:103,value:'非人防'},
	{key:104,value:'地下室'},
	{key:105,value:'车库'},
	{key:106,value:'商住'},
	{key:107,value:'公寓'},
	{key:108,value:'住宅'},
	{key:109,value:'成套住宅'},
	{key:110,value:'非成套住宅'},
	{key:111,value:'集体宿舍'},
	{key:112,value:'库房'},
	{key:113,value:'工业'},
	{key:114,value:'公用设施'},
	{key:115,value:'铁路'},
	{key:116,value:'民航'},
	{key:117,value:'航运'},
	{key:118,value:'仓储'},
	{key:119,value:'商业服务'},
	{key:120,value:'经营'},
	{key:121,value:'旅游'},
	{key:122,value:'金融保险'},
	{key:123,value:'电讯信息'},
	{key:124,value:'教育'},
	{key:125,value:'医疗卫生'},
	{key:126,value:'科研'},
	{key:127,value:'文化'},
	{key:128,value:'新闻'},
	{key:129,value:'娱乐'},
	{key:130,value:'园林绿化'},
	{key:131,value:'体育'},
	{key:132,value:'办公'},
	{key:133,value:'军事'},
	{key:134,value:'涉外'},
	{key:135,value:'宗教'},
	{key:136,value:'监狱'},
	{key:137,value:'宗教'},
	{key:138,value:'社区用房'},
	{key:139,value:'公建'},
	{key:140,value:'服务型公寓'},
	{key:141,value:'写字间'},
	{key:142,value:'商业'},
	{key:143,value:'经适房'},
	{key:144,value:'别墅'}, 
	{key:145,value:'高档公寓'},
	{key:146,value:'工业、交通、仓储'},
	{key:147,value:'公共设施'},
	{key:148,value:'公共运输'},
	{key:149,value:'商业、金融、信息'},
	{key:150,value:'教育、医疗、卫生、科研'},
	{key:151,value:'文化、娱乐、体育'},
	{key:152,value:'其他'}
];

//房屋性质
var housingNatureData=[
    {key:101,value:'存量房'},
    {key:102,value:'商品房'},
    {key:103,value:'经济适用房'},
    {key:104,value:'房改房'}
];

//房屋转让方式、土地使用权取得方式
var houseCseeionData=[
    {key:101,value:"买卖"},
    {key:102,value:'继承'},
    {key:103,value:'裁决'},
    {key:104,value:'赠与'}
];

//房屋结构
var buildingStructureData=[
    {key:101,value:"钢"},
	{key:102,value:'钢、钢筋混泥土'},
	{key:103,value:'钢筋混泥土'},
	{key:104,value:'混合'},
	{key:105,value:'砖木'},
	{key:106,value:'砖混'},
	{key:107,value:'土木'},
	{key:108,value:'其他'}
];

//民族
var nationData = [
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
//银行
var bankData = [
    {key:101,value:'乌鲁木齐银行'},
    {key:102,value:'新疆银行'},
    {key:103,value:'天山银行'}
];
//还款方式
var payMenthodData = [
    {key:101,value:'等额本金'},
  	{key:102,value:'等额本息'}
];

//交易类型
var dealType = ['自行交易','委托交易'];
//是否挂牌/是否锁
var isHang = ['否','是'];
//房源验证状态
var houseCheckStatus = ['未验证','验证通过','未通过']; /*0,1,2*/
//贷款状态
var loanCheckStatus = ['未受理','受理','不受理']; /*0,1,2*/
/*var houseCheckStatus=[
   {key:0,value:'未验证'},
   {key:1,value:'验证通过'},
   {key:2,value:'未通过'}
];*/
//状态
var useStatus = ['无效','有效'];
//模糊查询条件
var searchCond = [
	{key:0,value:"根据不动产证号查询(模糊)"}
	/*{key:1,value:"根据房产证号查询"}*/
];









//查封状态
var sealStatus = ['未查封','封杀'];
var freezeStatus = ['未冻结','冻结'];
var pledgeStatus = ['未抵押','抵押'];
var foreshowStatus = ['无贷款','有贷款'];
var signStatus = ['未签约','签约'];