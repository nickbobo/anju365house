var M;
$(document).ready(function (e) {
    //选项卡类
    /*
     var menu = $(".menu").eq(0);
     M = new Class_program_menu(menu.find(".level2 a"),{
     bar: $("#menuItemList"),
     content: $("#frameContent")
     });
     */
    //var returnObj;
    M = new SPAmenu({
        bar: $("#menuItemList"),
        move: $("#moveButton"),
        iframe: $("#frameContent"),
        clear: true
        //show:[{
        //href: "exp.html",
        //txt: "例子页面",
        //title: "这里显示的是这个选项卡的提示信息"
        //}]
    });

    var svc = $.svc.getSVC("/menu/getFunctionsByUserType");
    svc.call(function (response) {
        var b = setMenuList(response.getResult());
        b.showMenu("f0");
        //b.showURL(ctx + "/views/orderManage/orderManage.html", "订单管理");
        //$.messager.alert("提示信息", res.info, "info");
    }, function () {
        $.messager.alert("提示信息", "加载菜单失败！", "error");
    });

    //var returnObj = [
    //	{txt:"首页", href:"#"},
    //	{txt:"接口操作",sub:[
    //		{txt:"手机充值接口", sub:[
    //			{txt:"电信充值", title:"电信话费充值接口页面", href:"page1.html"},
    //			{txt:"联通充值", title:"联通话费充值接口页面", href:"page2.html"},
    //			{txt:"移动充值", title:"移动话费充值接口页面", href:"page3.html"}
    //		]},
    //		{txt:"手机流量充值接口",sub:[
    //			{txt:"电信充值", title:"电信流量充值接口页面", href:"page4.html"},
    //			{txt:"联通充值", title:"联通流量充值接口页面", href:"page5.html"},
    //			{txt:"移动充值", title:"移动流量充值接口页面", href:"page6.html"},
    //		]}
    //	]},
    //	{txt:"用户档案",sub:[
    //		{txt:"用户账户", title:"用户账户的各项操作", sub:[
    //			{txt:"用户密码修改", href:"account1.html"},
    //			{txt:"用户账户金额查询", href:"account2.html"}
    //		]},
    //		{txt:"用户子账户",sub:[
    //			{txt:"子账户查询", href:"account3.html"},
    //			{txt:"资金流查询", href:"account4.html"},
    //			{txt:"库存查询", href:"account5.html"},
    //		]}
    //	]},
    //	{txt:"系统帮助",sub:[
    //		{txt:"用户注册帮助", title:"查看用户注册流程及注意事项", href:"help1.html"},
    //		{txt:"接口使用帮助", title:"查看接口使用帮助", href:"help2.html"},
    //		{txt:"常见问题帮助", title:"常见问题帮助", href:"help3.html"},
    //		{txt:"不常见问题帮助", title:"不常见问题帮助", href:"help4.html"}
    //	]}
    //];


    //显示菜单项并绑定事件
    //alert(returnObj);
    $("#logoutBtn").click(function () {
        if (!confirm("即将退出系统,是否继续!")) {
            return;
        }
        // var svc = $.svc.getSVC("/login/logout");
        // alert("-------1------0");
        // svc.send(function (response) {
        //     alert("-------1------");
        // }, function () {
        //     alert("-------2------");
        // });
        // alert("-------1------9");
        // $.ajax({
        //     type: 'post',
        //     url: ctx + 'login/logout.svc',
        //     cache: false,
        //     dataType: 'json',
        //     async: false
        // });
        window.location.href = 'sso/logout.svc';
        // window.location.href = 'main.html';
    });

});
/*
 [
 {
 "txt":"菜单名称",
 "title":"菜单title",
 "*href":"菜单链接",
 "sub":[{
 "txt":"",
 "title":"",
 "*href":
 "sub":.....
 }]
 }
 ]
 */
//按获得的数据设置页面多级菜单栏
//仅适合本页面框架
function setMenuList(menuObj) {
    var father = $("#nav");
    var father2 = $("#menu");

    var templateStr1 = "";
    var templateStr2 = "";
    var templateStr3 = "";
    //协调IE8 IE8下会使得某些属性双引号丢失
    var tempObj = father.find(".template").eq(0);
    templateStr1 = tempObj.prop("outerHTML").replace("template", "temp").toLowerCase();
    templateStr1 = templateStr1.replace(/([^\"\s\<]+=)([^\"\s\>]+)/g, "$1\"$2\"");
    tempObj.remove();

    tempObj = father2.find(".template");
    templateStr3 = $(tempObj[1]).prop("outerHTML").toLowerCase().replace(/([^\"\s\<]+=)([^\"\s\>]+)/g, "$1\"$2\"");
    templateStr2 = $(tempObj[0]).prop("outerHTML").toLowerCase().replace(/([^\"\s\<]+=)([^\"\s\>]+)/g, "$1\"$2\"").replace(templateStr3, "{#template2#}").replace("template", "");
    templateStr3 = templateStr3.replace("template", "");
    tempObj.remove();

    var htmlStr = "";
    var htmlStr2 = "";

    for (var x = 0; x < menuObj.length; x++) {
        var level1 = menuObj[x];
        if (!level1) continue;

        var temp1 = templateStr1;
        temp1 = temp1.replace("{#txt#}", level1.txt);
        if (!(level1.href) || (level1.sub && level1.sub.length > 0)) {
            temp1 = temp1.replace('href="{#href#}"', "");
            temp1 = temp1.replace('{#ship#}', "f" + x);
        } else {
            temp1 = temp1.replace('{#href#}', level1.href);
            temp1 = temp1.replace('ship="{#ship#}"', "");
        }

        if (level1.title) {
            temp1 = temp1.replace("{#title#}", level1.title);
        } else {
            temp1 = temp1.replace('title="{#title#}"', "");
        }
        htmlStr += temp1;

        if (level1.sub && level1.sub.length > 0) {
            for (var xx = 0; xx < level1.sub.length; xx++) {
                var level2 = level1.sub[xx];
                if (!level2) continue;
                var temp2 = templateStr2;

                var htmlStr3 = "";
                if (level2.sub && level2.sub.length > 0) {
                    for (var xxx = 0; xxx < level2.sub.length; xxx++) {
                        var level3 = level2.sub[xxx];
                        if (!level3) continue;
                        var temp3 = templateStr3;
                        temp3 = temp3.replace("{#txt3#}", level3.txt);
                        if (!(level3.href)) {
                            temp3 = temp3.replace('href="{#href3#}"', "");
                        } else {
                            temp3 = temp3.replace('{#href3#}', level3.href);
                        }
                        if (level3.title) {
                            temp3 = temp3.replace("{#title3#}", level3.title);
                        } else {
                            temp3 = temp3.replace('title="{#title3#}"', "");
                        }
                        htmlStr3 += temp3;
                    }
                }

                temp2 = temp2.replace("{#txt2#}", level2.txt);
                if (!(level2.href) || (level2.sub && level2.sub.length > 0)) {
                    temp2 = temp2.replace('href="{#href2#}"', "");
                } else {
                    temp2 = temp2.replace('{#href2#}', level2.href);
                }
                temp2 = temp2.replace("{#ship#}", "f" + x);
                if (level2.title) {
                    temp2 = temp2.replace("{#title2#}", level2.title);
                } else {
                    temp2 = temp2.replace('title="{#title2#}"', "");
                }
                temp2 = temp2.replace("{#template2#}", htmlStr3);
                htmlStr2 += temp2;
            }
        }
    }
    father.html(htmlStr);
    father2.html(htmlStr2);
    //协调二级菜单项如果没有三级菜单项情况 清除level2项
    var tempArray = father2.find(".level2");
    for (var i = 0; i < tempArray.length; i++) {
        if ($(tempArray[i]).children("*").length <= 0) {
            $(tempArray[i]).remove();
        }
    }
    father2.children("*").css("display", "none");

    //绑定事件到类实例
    father.children("*").click(function () {
        var nowShip = $(this).attr("ship");
        if (nowShip) {
            showLevel2(nowShip);
        }
    });
    //子菜单的显示隐藏
    father2.find("a[ship]").click(function () {
        var tempObj = $(this).parent();
        if (tempObj.hasClass("sel")) {
            tempObj.removeClass("sel");
        } else {
            tempObj.addClass("sel");
        }
    });
    father2.find("a[href]").click(function (e) {
        M.showItem(e, $(this));
    });

    //显示level2的菜单
    function showLevel2(ship) {
        father.children("a").removeClass("sel");
        father.children("a[ship='" + ship + "']").addClass("sel");

        var tempArray = father2.find("a[ship]");
        for (var i = 0; i < tempArray.length; i++) {
            var nowShip = $(tempArray[i]).attr("ship");
            var tempObj = $(tempArray[i]).parent();
            if (nowShip == ship) {
                tempObj.css("display", "block");
            } else {
                tempObj.css("display", "none");
            }
        }
    }

    //显示具体某个URL下的页面
    function showURL(urlStr, text) {
        var temp = father2.find("*[href='" + urlStr + "']").eq(0);
        if (temp.length <= 0) {
            //alert(urlStr);
            M.showItem(null, null, text, text, urlStr);
        } else {
            M.showItem(null, temp);
        }
    }

    return {showMenu: showLevel2, showURL: showURL};
}