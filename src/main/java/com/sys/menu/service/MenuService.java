package com.sys.menu.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.eshop.frame.annotation.Request;
import com.eshop.frame.exception.BusinessException;
import com.github.pagehelper.StringUtil;
import com.sys.menu.entity.MenuViewEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshop.frame.lang.CodeGenerators;
import com.eshop.frame.web.SessionUtils;
import com.mysql.fabric.xmlrpc.base.Array;
import com.sys.menu.dao.MenuMapper;
import com.sys.menu.entity.MenuEntity;
import com.sys.user.entity.UserEntity;
import com.sys.utils.Function;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


/**
 * 菜单显示
 *
 * @author tian
 */
@Service
public class MenuService {
    @Autowired
    private MenuMapper menuMapper;
    private static final Logger logger = LoggerFactory.getLogger(MenuService.class);

    /**
     * 菜单信息查询
     *
     * @param menu
     * @param pageNum
     * @param pageSize
     * @return
     */
    public List<MenuViewEntity> getMenuInfoPage(@Request("menu") MenuEntity menu, @Request("pageNum") Integer pageNum,
                                                @Request("pageSize") Integer pageSize) {
        List<MenuViewEntity> dataList = menuMapper.getMenuInfoPage(menu);
        return dataList;
    }

    /**
     * 添加菜单时树形列表显示
     *
     * @return
     */
    public List<MenuViewEntity> getMenuInfo() {
        List<MenuViewEntity> dataList = menuMapper.getMenuInfo();
        return dataList;
    }

    /**
     * 菜单添加
     *
     * @param menu
     * @param request
     */
    public void saveOrUpdate(@Request("menu") MenuEntity menu, HttpServletRequest request) {
        if (null == menu || StringUtil.isEmpty(menu.getMenuCode()) || StringUtil.isEmpty(menu.getChName())) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
        logger.info("菜单信息查询参数 : menuCode={},menuName={}", menu.getMenuCode(), menu.getChName());
        //菜单code不可重复
        if (menuMapper.menuCodeIsPro(menu.getMenuCode()) > 0) {
            throw new BusinessException("MENUCODE_IS_EXIST");
        }
        UserEntity user = SessionUtils.getUser(request);
        menu.setId(CodeGenerators.nextId() + "");
        menu.setCreateName(user.getUserCode());
        try {
            //添加菜单时如果有父级 则删除父级菜单URL
            if (StringUtil.isNotEmpty(menu.getParentCode())) {
                menuMapper.delUrlBycode(menu.getParentCode());
            }
            menuMapper.addMenu(menu);
            menuMapper.updateNumByPCode(menu.getParentCode());

        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessException("MENU_INFO_ADD_ERROR");
        }

    }

    /**
     * 根据菜单code删除菜单
     *
     * @param menuCode
     */
    public void delMenuInfo(@Request("menuCode") String menuCode) {
        logger.info("菜单信息删除参数 : menuCode={}", menuCode);
        if (StringUtil.isEmpty(menuCode)) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
        menuMapper.deleteMenu(menuCode);
    }

    /**
     * 根据菜单code更新菜单信息
     *
     * @param menu
     * @param request
     */
    public void updateMenuInfo(@Request("menu") MenuEntity menu, HttpServletRequest request) {
        logger.info("菜单信息更新参数 : menuCode={}", menu.getMenuCode());
        if (null == menu || StringUtil.isEmpty(menu.getMenuCode())) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
        UserEntity user = SessionUtils.getUser(request);
        menu.setCreateName(user.getUserCode());
        try {
            menuMapper.updateMenu(menu);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessException("MENU_INFO_UPDATE_ERROR");
        }

    }

}
