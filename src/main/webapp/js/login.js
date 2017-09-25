/**
 * Created by duxs on 16/5/2.
 */
//会话失效 前台框架跳转到登录页面
//检查登录页面是否嵌入在iframe框架中，如果是则替换当前的url，而不是跳转，以免产生浏览历史纪录导致前进后退中会遍历到
if (window.parent.showItem) top.location.replace(location.href);

//去除字符串两端空格的原型方法
if (!("Trim" in String.prototype)) {
    String.prototype.Trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
}

var dom = {};  //存储表单对象，节省dom查找的开销
var step = ""; //记录当前是否正在提交ajax 如果是 step="load" 否则是空字符

$(document).ready(function (e) {
    dom.verifyImage = $("#verifyImage");
    dom.verifyImagePath = ctx + "/randCodeImage";
    //初始加载验证码
    getVerifyImage();

    //获得3个输入框并为其绑定回车事件
    var tempArray = $("input[type='text'],input[type='password']");
    for (var i = 0; i < tempArray.length; i++) {
        dom[tempArray[i].id] = $(tempArray[i]);
        (function (obj, index) {
            obj.keyup(function (e) {
                var nowKey = e.keyCode;
                if (nowKey == 13) {
                    if (index >= tempArray.length - 1) {
                        login();
                    } else {
                        $(tempArray[index + 1]).focus();
                    }
                } else {
                    $(this).removeClass("error");
                }
            });
        })($(tempArray[i]), i);
    }

    //文字点击切换验证码
    $("#changeButton").click(function () {
        getVerifyImage();
        dom.verifyInput.focus();
        dom.verifyInput[0].select();
    });
    //验证码点击切换验证码
    dom.verifyImage.click(function () {
        getVerifyImage();
        dom.verifyInput.focus();
        dom.verifyInput[0].select();
    });

    //登录按钮事件绑定
    dom.loginBtn = $("#loginBtn");
    dom.loginBtn.click(function () {
        if (step != "") return false;
        login();
    });

    dom.messageTips = $("#messageTips");
});

//充值验证码图片
function getVerifyImage() {
    var path = dom.verifyImagePath;
    if (path.indexOf("?") > 0) {
        path += "&" + parseInt(Math.random() * 10000000);
    } else {
        path += "?" + parseInt(Math.random() * 10000000);
    }
    dom.verifyImage.attr("src", path);
}

//反馈提示信息
function showMessage(typeStr, msg, obj) {
    dom.messageTips.text(msg);
    dom.messageTips[0].className = "";
    dom.messageTips.addClass(typeStr);
    if (obj) {
        obj.focus();
        if (typeStr != "ok" && typeStr != "normal") {
            obj.addClass("error");
        }
    } else {
        dom.userInput.removeClass("error");
        dom.pwdInput.removeClass("error");
        dom.verifyInput.removeClass("error");
    }
}

//验证登录
function login() {
    if (step != "") return false;

    var user = dom.userInput.val().Trim();
    dom.userInput.val(user);

    var password = dom.pwdInput.val().Trim();
    dom.pwdInput.val(password);

    var verify = dom.verifyInput.val().Trim();
    dom.verifyInput.val(verify);

    if (user == '') {
        showMessage("warning", '请输入您的账号！', dom.userInput);
        return false;
    }
    if (password == '') {
        showMessage("warning", '请输入您的密码！', dom.pwdInput);
        return false;
    }
    /*if (verify == '') {
        showMessage("warning", '请输入验证码！', dom.verifyInput);
        return false;
    }*/

    showMessage("ok", '玩命登录中，请稍等~', dom.verifyInput);
    step = "load";

    dom.loginBtn.addClass("load");
    var loginSvc = $.svc.getSVC("/login/login");
    loginSvc.setParam("userName", user)
        .setParam("password", password)
        .setParam("randCode", verify)
        //.setParam("password", $("#userInput"))
        //.setParam("randCode", document.getElementById("verifyInput"))
        .showMessage(false)
        .success(function (response) {
            if (response.isSucc()) {
                setTimeout(function () {
                    top.location.href = 'frontView/index.html';
                }, 500);
            } else {
                step = "";
                dom.loginBtn.removeClass("load");
                getVerifyImage();
                dom.verifyInput.val("");
                showMessage("error", response.getMessage());
                return;
            }
        })
        .error(function (result) {
            step = "";
            dom.loginBtn.removeClass("load");
            getVerifyImage();
            dom.verifyInput.val("");
            dom.userInput.val("");
            dom.pwdInput.val("");
            dom.userInput.focus();
            showMessage("error", "提交失败，请稍后再试");
        })
        .send();
    //var p = '{"userName":"' + user + '", "password":"' + password + '","randCode":"' + verify + '"}';
    /* var p = "{\"method\":\"msgLog#getName\", \"args\":\"{}\"}"; */
    //$.ajax({
    //    type: 'post',
    //    url: ctx + '/login/login.svc',
    //    cache: false,
    //    dataType: 'json',
    //    async: false,
    //    data: {
    //        'params': p
    //    },
    //    success: function (data) {
    //        var resp = $.app.resp(data);
    //        if (resp.isSucc()) {
    //            setTimeout(function () {
    //                top.location.href = 'main.html';
    //            }, 500);
    //        } else {
    //            step = "";
    //            dom.loginBtn.removeClass("load");
    //            getVerifyImage();
    //            dom.verifyInput.val("");
    //            showMessage("error", resp.getMessage());
    //            return;
    //        }
    //    },
    //    error: function (result) {
    //        step = "";
    //        dom.loginBtn.removeClass("load");
    //        getVerifyImage();
    //        dom.verifyInput.val("");
    //        dom.userInput.val("");
    //        dom.pwdInput.val("");
    //        dom.userInput.focus();
    //        showMessage("error", "提交失败，请稍后再试");
    //    }
    //});
}

