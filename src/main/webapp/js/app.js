/**
 * Created by duxs on 16/4/7.
 */

$.app = {
    name: "易销开发平台",
    ctx: "/house",
};

$.svc = {
    localSuffix: ".svc",
    remoteSuffix: ".rsvc",
    pageNumKey: "pageNum",
    pageSizeKey: "pageSize",
    //defaultPageSize: 10,
    dataType: "json",
    type: "POST",
    timeout: 10 * 1000,
    message: "没有AJAX申请",
    serviceStatus: {},
    status: {
        DOING: 0,
        COMPLETE: 1
    },
    //downloadXlsKey: "",

    getSVC: function (service) {
        //return new ServiceCall(service, false);
        return Service.create(service);
    },

    getRSVC: function (service) {
        return new ServiceCall(service, true);
    },

    createService: function (service) {
        return Service.create(service);
    },
    createGridService: function (service, grid) {
        return DataGridService.create(service, grid);
    }

}

function Response(data) {
    this.succ = data.succ || false;
    this.code = data.code || "0";
    this.message = data.message || "";
    this.result = data.result || {};
    this.token = data.token || "";
}

Response.prototype = {
    isSucc: function () {
        return this.succ;
    },

    getCode: function () {
        return this.code;
    },

    getMessage: function () {
        return this.message;
    },

    getResult: function () {
        return this.result;
    }
    ,
    getToken: function () {
        return this.token;
    }
}

function Class() {
}

Class.extend = function extend(props) {
    var prototype = new this();
    var _super = this.prototype;

    for (var name in props) {
        if (typeof props[name] == "function"
            && typeof _super[name] == "function") {

            prototype[name] = (function (super_fn, fn) {
                return function () {
                    var tmp = this.callSuper;

                    this.callSuper = super_fn;

                    var ret = fn.apply(this, arguments);

                    this.callSuper = tmp;

                    if (!this.callSuper) {
                        delete this.callSuper;
                    }
                    return ret;
                }
            })(_super[name], props[name])
        } else {
            prototype[name] = props[name];
        }
    }

    function Class() {
    }

    Class.prototype = prototype;
    Class.prototype.constructor = Class;

    Class.extend = extend;
    Class.create = Class.prototype.create = function () {
        var instance = new this();

        if (instance.init) {
            instance.init.apply(instance, arguments);
        }

        return instance;
    }

    return Class;
}

var Service = Class.extend({
    service: "",
    _showMessage: false,
    _params: {},
    token: 0,
    _success: null,
    _error: null,
    paramsMethod: null,

    init: function (service) {
        this.service = "";
        this._showMessage = false;
        this._params = {};
        this.token = 0;
        this._success = null;
        this._error = null;
        this.paramsMethod = null;

        //this.service = service;
        var serviceName, isOpts = false;
        if (typeof service == "string") {
            this.service = service;
        } else {
            this.service = service.id || service.name || service.service;
            isOpts = true;
        }
        if (!this.service) {
            alert("无效的参数,未找到service");
            return;
        }
        if (isOpts) {
            if (service.success && typeof service.success == "function") {
                this.success(service.success);
            }
            if (service.error && typeof service.error == "function") {
                this.error(service.error);
            }
            //if (service.query && typeof service.query == "function") {
            //    this.query("setQuery", service.query);
            //}
            if (service.params && typeof service.params == "function") {
                this.params(service.params);
            }
        }
    },
    setParam: function (name, value) {
        return this.param(name, value);
    },
    param: function (name, value) {
        if (value === undefined) {
            return this._params[name];
        } else {
            if (name.indexOf("/") != -1) {
                var names = name.split("/");
                var obj = value;
                for (var i = names.length - 1; i > 0; i--) {
                    var newObj = {};
                    newObj[names[i]] = obj;
                    obj = newObj;
                }
                this.setParam(names[0], obj);
            } else {
                if (this._params[name]) {
                    //$.extend(this._params, {name: value});
                    this._params[name] = value;
                } else {
                    this._params[name] = value;
                }
            }
            return this;
        }
    },

    setParams: function (_params) {
        return this.params(_params);
    },

    params: function (_params) {
        if (_params === undefined) {
            return this._params;
        } else {
            if (typeof(_params) == "object") {
                $.extend(this._params, _params);
            } else if (typeof (_params) == "function") {
                this.paramsMethod = _params || this.paramsMethod;
            }
            return this;
        }
    },

    success: function (success) {
        this._success = success || this._success;
        return this;
    },

    error: function (error) {
        this._error = error || this._error;
        return this;
    },

    showMessage: function (showMessage) {
        this._showMessage = showMessage;
        return this;
    },

    call: function (success, error) {
        return this.send(success, error);
    },

    send: function (success, error) {
        var url = ctx + this.service + (!this.isRemote ? $.svc.localSuffix : $.svc.remoteSuffix);
        var params = this.params()
        if (this.paramsMethod) {
            params = $.extend(params, this.paramsMethod());
        }
        this._send(url, params, success, error);
    },
    _beforeSend: function () {
        return true;
    },
    _afterSend: function () {
        this._params = {};
        return true;
    },
    _send: function (url, params, success, error) {
        //if (this.service == ""){
        //    Remo.flag = 400;
        //    CL.message = "提交的访问路径为空";
        //    return false;
        //}
        ////判断是否在发送中
        //if (CL.flag == 100){
        //    return false;
        //}
        var requestParams = typeof(params) == "string" ? params : JSON.stringify(params);

        this.success(success);
        this.error(error);
        var ajaxStatus = $.svc.serviceStatus[this.service];
        if (ajaxStatus && ajaxStatus == $.svc.status.DOING) {
            alert("请求正在执行中,请稍后再试");
            return;
        }
        $.svc.serviceStatus[this.service] = $.svc.status.DOING;
        if (!this._beforeSend()) {
            return;
        }

        var _this = this;
        $.ajax({
            type: 'post',
            url: url,
            cache: false,
            dataType: 'json',
            //async: false,
            data: requestParams,
            success: function (data) {
                $.svc.serviceStatus[this.service] = $.svc.status.COMPLETE;
                //只有当无权限或session失效时会产生,这时跳转到无权限页面
                if (typeof(data) == "string" && data.indexOf("<!DOCTYPE html>") >= 0) {
                    location.href = ctx + "/unauthorized.html"
                    return;
                }

                var response = new Response(data);
                //TODO : verify token
                if (_this._showMessage && !response.isSucc()) {
                    alert(response.getMessage());
                    return;
                }

                if (!_this._afterSend(response)) {
                    return;
                }

                if (typeof (_this._success) == "function") {
                    return _this._success(response, status);
                }

            },
            error: function (XHR, status, errorThrown) {
                $.svc.serviceStatus[this.service] = $.svc.status.COMPLETE;
                //if (status == "abort") {
                //    _this.message = "abort";
                //} else {
                //    _this.flag = 500;
                //    _this.message = "error";
                //}
                if (typeof(_this._error) == "function") {
                    _this._error(status, errorThrown);
                }
            }
        });
    }
});

var DataGridService = Service.extend({
    grid: null,
    excelModelId: "",
    _query: null,
    _dictFields: "",
    _dictCodes: "",
    hasParseDict: false,
    formatters: {},

    init: function (service, grid) {
        this.grid = null;
        this.excelModelId = "";
        this._query = null;
        this._dictFields = "";
        this._dictCodes = "";
        this.hasParseDict = false;

        this.callSuper(service);

        if (grid) {
            if (typeof (grid) === "string") {
                this.grid = $(grid.indexOf('#') == 0 ? grid : "#" + grid);
            } else {
                this.grid = grid;
            }
        } else {
            var _grid = service.gridId || service.gridName || service.grid || service.datagridId || service.datagridName || service.datagrid;
            if (typeof (_grid) === "string") {
                this.grid = $(_grid.indexOf('#') == 0 ? _grid : "#" + _grid);
            } else {
                this.grid = _grid;
            }
        }
        if (!this.grid) {
            alert("无效的参数,未找到grid");
            return;
        }
        if (typeof service == "object" && service.query && typeof service.query == "function") {
            this.query("setQuery", service.query);
        }
    },

    setPage: function (pageNum, pageSize) {
        this.param($.svc.pageNumKey, pageNum);
        this.param($.svc.pageSizeKey, pageSize);
        return this;
    },
    query: function () {
        if (arguments.length >= 2) {
            var arg0 = arguments[0], arg1 = arguments[1];
            if (arg0 && typeof arg0 == "string" && arg0 == "setQuery" && typeof arg1 == "function") {
                this._query = arg1;
                return this;
            }
        }
        if (this._query) {
            return this._query.apply(this, arguments);
        }
        return this.send.apply(this, arguments);
    },
    send: function (success, error) {
        var url = ctx + this.service + (!this.isRemote ? $.svc.localSuffix : $.svc.remoteSuffix);
        //纪录查询参数
        this._appendDictParamsWithFormat();
        this._appendPageParams();
        var params = this.params();
        if (this.paramsMethod) {
            $.extend(params, this.paramsMethod());
        }
        this.lastQuery(params);
        this._send(url, params, success, error);
    },

    lastQuery: function (params) {
        var opts = this.grid.datagrid('options');
        if (params) {
            opts["lastQueryParams"] = $.extend({}, params);
        } else {
            return $.extend({}, opts["lastQueryParams"] || {});
        }
    }
    ,
    excelMode: function (excelModel) {
        if (excelModel) {
            this.excelModelId = excelModel;
        } else {
            return excelModel;
        }
    }
    ,
    excel: function (_fileName, _fields) {
        if (!_fileName) {
            alert("文件名不能为空");
            return;
        }
        var params = this.lastQuery();
        params["pageNum"] = 1;
        params["pageSize"] = 10000;
        params["excelFlag"] = "true";
        params["excelFileName"] = _fileName;

        var fields = _fields || this._getAllDisplayFields();

        params["excelFields"] = fields;
        if (this.excelModelId) {
            //不需格式,由model定义格式
            params["excelModel"] = this.excelModelId;
        } else {
            //根据fields从datagrid定义中获取格式
            this._appendDisplayParamsWithStyle(fields, params);
        }
        var url = ctx + this.service + (!this.isRemote ? $.svc.localSuffix : $.svc.remoteSuffix);

        this._buildQueryForm("_xls_form_", url, params).submit();
    }
    ,
    _beforeSend: function () {
        if (!this.callSuper()) {
            return false;
        }
        this.grid.datagrid("loading");
        return true;
    }
    ,
    _afterSend: function (response) {
        if (!this.callSuper(response)) {
            this.grid.datagrid("loaded");
            return false;
        }
        if (response !== undefined && response.isSucc()) {
            var result = response.getResult();
            if (result.length == '0') {
                this.grid.datagrid("loadData", []);
            } else {
                this.grid.datagrid("loadData", result);
            }
            var pager = this.grid.datagrid("getPager");
            if (result[$.svc.pageNumKey]) {
                pager.pagination("refresh", {pageNumber: result[$.svc.pageNumKey]});
            }
            if (result[$.svc.pageSizeKey]) {
                pager.pagination("refresh", {pageSize: result[$.svc.pageSizeKey]});
            }

        }

        this.grid.datagrid("loaded");
        return true;
    }
    ,
    _buildQueryForm: function (formName, url, params) {
        //TODO:判断是否存在,存在则删除
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('name', formName);
        form.attr('target', '');
        form.attr('method', 'post');
        form.attr('enctype', "application/x-www-form-urlencoded");
        form.attr("encoding", "application/x-www-form-urlencoded");
        form.attr('action', url);
        $('body').append(form);  //将表单放置在web中
        for (var param in params) {
            var input = $('<input>');
            input.attr('type', 'hidden');
            input.attr('name', param);
            input.attr('value', params[param]);
            form.append(input);   //将查询参数控件提交到表单上
        }

        return form;
    }
    ,
    _getAllDisplayFields: function () {
        var opts = this.grid.datagrid('options');
        var columns = opts.columns;
        var fields = "";
        for (var i = 0, n = columns[0].length; i < n; i++) {
            var column = columns[0][i];
            if (!column.hidden && !column.checkbox && column.title && column.title != "选择"
                && column.field && column.field != "caozuo" && column.field != "operate" && column.title != "操作") {
                var field = column.field;
                fields += column.field + ",";
            }
        }
        if (fields.length >= 1)
            fields = fields.substring(0, fields.length - 1);
        return fields
    }
    ,
    _appendDisplayParamsWithStyle: function (_fields, params) {
        var opts = this.grid.datagrid('options');
        var columns = opts.columns;
        var fields = _fields.split(","), titles = "";
        for (var i = 0, n = columns[0].length; i < n; i++) {
            var column = columns[0][i];
            if (this._exists(fields, column.field)) {
                titles += column.title + ",";
            }
        }
        if (titles.length >= 1) {
            //this.params["fields"] = fields.substring(0, fields.length - 1);
            params["excelTitles"] = titles.substring(0, titles.length - 1);
        }
    }
    ,
    _exists: function (fields, field) {
        if (!fields || !field) return false;
        for (var i = 0, n = fields.length; i < n; i++) {
            if (fields[i] === field) {
                return true;
            }
        }
        return false;
    }
    ,
    _appendDictParamsWithFormat: function () {
        if (!this.hasParseDict) {
            var opts = this.grid.datagrid('options');
            var columns = opts.columns;
            var dictFields = "", dictCodes = "";
            for (var i = 0, n = columns[0].length; i < n; i++) {
                var column = columns[0][i];
                if (column.dict) {
                    dictFields += column.field + ",";
                    dictCodes += column.dict + ",";
                    //if (!column.formatter) {

                    var oldformatter = column.formatter;
                    if (oldformatter) {
                        this.formatters[column.field] = oldformatter;
                    }
                    var _this = this;
                    column.formatter = function (value, row, index) {
                        var realValue = value;
                        var oldFormatter = _this.formatters[this.field];
                        if (oldFormatter && typeof oldFormatter == "function") {
                            realValue = oldFormatter.call(this, value, row, index);
                        }
                        if (realValue == value) {
                            var s = this.field + "__name__";
                            return row[s] ? row[s] : realValue;
                        } else {
                            return realValue;
                        }
                    }
                    //}
                }
            }
            if (dictFields.length >= 1) {
                this._dictFields = dictFields.substring(0, dictFields.length - 1);
                this._dictCodes = dictCodes.substring(0, dictCodes.length - 1);
            }
            this.hasParseDict = true;
        }
        if (this._dictFields && this._dictCodes) {
            this.param("dictFields", this._dictFields);
            this.param("dictCodes", this._dictCodes);
        }

    }
    ,

    _appendPageParams: function () {
        if (!this._isSameParams(this.params(), this.lastQuery())) {
            var pagerOpts = this.grid.datagrid("getPager").pagination("options");
            this.setPage(1, this.param($.svc.pageSizeKey) || pagerOpts.pageSize);
        } else {
            var pageNum = this.param($.svc.pageNumKey);
            var pageSize = this.param($.svc.pageSizeKey);
            if (!pageNum || !pageSize) {
                var pagerOpts = this.grid.datagrid("getPager").pagination("options");
                pageNum = pageNum || pagerOpts.pageNumber;
                if(0==pageNum){
                	pageNum=1;
                }
                pageSize = pageSize || pagerOpts.pageSize;
                this.setPage(pageNum, pageSize);
            }
        }
    },
    _isSameParams: function (params1, params2) {
        params1 = params1 || {};
        params2 = params2 || {};
        for (var name in params1) {
            if (name != $.svc.pageNumKey) {
                var v1 = params1[name];
                var v2 = params2[name];
                if (v1 != v2) {
                    return false;
                }
            }
        }
        return true;
    }
});


var ctx = $.app.ctx;
(function () {
    if ($.fn.datagrid) {
        $.extend($.fn.datagrid.methods, {
            //注册服务
            service: function (jq, service) {
                if (!service) {
                    return $.data(jq[0], "datagrid").options.service;
                }
                return jq.each(function () {
                    var opts = $(this).datagrid("options");
                    opts.service = $.svc.createGridService(service, $(this));

                    $(this).datagrid('getPager').pagination({
                        loadMsg: '正在加载数据...',
                        onSelectPage: function (pageNumber, pageSize) {
                            opts.service.setPage(pageNumber, pageSize)
                            opts.service.query();
                        }
                    });
                });
            }
        });
    }
})(jQuery);