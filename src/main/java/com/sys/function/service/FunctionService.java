package com.sys.function.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshop.frame.annotation.Request;
import com.eshop.frame.lang.CodeGenerators;
import com.eshop.frame.web.SessionUtils;
import com.github.pagehelper.StringUtil;
import com.google.common.collect.Lists;
import com.sys.function.dao.FunctionMapper;
import com.sys.function.entity.FunctionEntity;
import com.sys.user.entity.UserEntity;

/**
 * 页面操作功能管理
 *
 * @author tian
 */
@Service
public class FunctionService {
    @Autowired
    private FunctionMapper functionMapper;

    /**
     * 页面操作按钮添加或更新
     *
     * @param params
     */
    public void saveOrUpdateFn(Map<String, Object> params, HttpServletRequest request) {
        UserEntity user = SessionUtils.getUser(request);
        params.put("userName", user.getUserName());
        if (StringUtil.isEmpty(params.get("id") + "")) {
            long number = CodeGenerators.nextId();
            params.put("id", number);
            functionMapper.addFunction(params);
        } else {
            functionMapper.updateFunction(params);
        }

    }

    /**
     * 页面操作按钮删除
     *
     * @param list
     */
    public void delFunction(@Request("List") FunctionEntity[] list) {
    	functionMapper.delRoleFnPermsByFnCode(Lists.newArrayList(list));
        functionMapper.delFunction(Lists.newArrayList(list));
    }

    /**
     * 页面操作按钮查询
     *
     * @param menuCode 菜单code
     * @return
     */
    public List<FunctionEntity> getFnInfoPage(@Request("menuCode") String menuCode) {
        List<FunctionEntity> list = functionMapper.getFnInfoByMc(menuCode);
        return list;

    }


}
