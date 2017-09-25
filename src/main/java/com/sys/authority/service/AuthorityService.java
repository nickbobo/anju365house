package com.sys.authority.service;

import com.eshop.frame.annotation.Request;
import com.eshop.frame.exception.BusinessException;
import com.eshop.frame.lang.CodeGenerators;
import com.eshop.frame.web.SessionUtils;
import com.github.pagehelper.StringUtil;
import com.google.common.collect.Lists;
import com.sys.authority.dao.AuthorityMapper;
import com.sys.authority.entity.AuthorityEntity;
import com.sys.houseverifi.entity.HouseInfoViewEntity;
import com.sys.menu.entity.MenuEntity;
import com.sys.menu.entity.MenuViewEntity;
import com.sys.user.entity.UserEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 权限管理
 *
 * @author tian
 */
@Service
public class AuthorityService {
    @Autowired
    private AuthorityMapper authorityMapper;
    private static final Logger logger = LoggerFactory.getLogger(AuthorityService.class);

    /**
     * 角色菜单权限配置
     *
     * @param roleCode 角色code
     * @param menuCode 菜单code
     */
    public void addRoleMenu(@Request("roleCode") String roleCode, @Request("menuCode") String menuCode, HttpServletRequest request) {
        logger.info("角色菜单权限配置参数 : roleCode={},menuCode={}", roleCode, menuCode);
        if (StringUtil.isEmpty(roleCode) && StringUtil.isEmpty(menuCode)) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
        long number = CodeGenerators.nextId();
        menuCode = "'" + menuCode.replaceAll(",", "','") + "'";
        UserEntity user = SessionUtils.getUser(request);
        try {
            authorityMapper.addRoleMenu(number, roleCode, menuCode, user.getUserCode());
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessException("ROLE_AUTHORITY_ADD_ERROR");
        }

    }

    /**
     * 角色操作权限配置
     *
     * @param roleCode 角色code
     * @param fnCode   功能code
     * @param request
     */
    /*public void addRoleFunction(@Request("roleCode") String roleCode, @Request("fnCode") String fnCode, HttpServletRequest request) {
        long number = CodeGenerators.nextId();
        fnCode = "'" + fnCode.replaceAll(",", "','") + "'";
        UserEntity user = SessionUtils.getUser(request);
        String useName = user.getUserName();
        authorityMapper.addRoleFunction(number, roleCode, fnCode, useName);
    }*/

    /**
     * 角色菜单权限配置查询
     *
     * @param roleCode 角色code
     * @return
     */
    public List<MenuViewEntity> getRoleMenuPerms(@Request("roleCode") String roleCode) {
        logger.info("角色菜单权限查询参数 : roleCode={}", roleCode);
        List<MenuViewEntity> list = authorityMapper.getRoleMenuPerms(roleCode);
        return listGroup(list);

    }

/*
    public List<AuthorityEntity> getRoleFnPermsPage(@Request("roleCode") String roleCode, @Request("menuCode") String menuCode,
                                                    @Request("pageNum") Integer pageNum, @Request("pageSize") Integer pageSize) {
        return null;

    }
*/

    /**
     * 角色菜单权限删除
     *
     * @param roleCode
     * @param menuCode
     */
    public void delRoleMenuPerms(@Request("roleCode") String roleCode, @Request("menuCode") String menuCode) {
        logger.info("角色菜单权限删除参数 : roleCode={},menuCode={}", roleCode, menuCode);
        if (StringUtil.isEmpty(roleCode) && StringUtil.isEmpty(menuCode)) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
        menuCode = "'" + menuCode.replaceAll(",", "','") + "'";
        authorityMapper.delRoleMenuPerms(roleCode, menuCode);

    }

    /**
     * 角色操作权限删除
     *
     * @param list
     */
   /* public void delRoleFnPerms(@Request("List") AuthorityEntity[] list) {
        authorityMapper.delRoleFnPerms(Lists.newArrayList(list));
    }*/

    /**
     * 根据角色code查询角色未配置菜单
     *
     * @param roleCode 角色code
     * @return
     */
    public List<MenuViewEntity> getUnSetMenuInfo(@Request("roleCode") String roleCode) {
        logger.info("角色未配置菜单权限查询参数 : roleCode={}", roleCode);
        if (StringUtil.isEmpty(roleCode)) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
        List<MenuViewEntity> list = authorityMapper.getUnSetMenuInfo(roleCode);
        return list;
    }

    /**
     * list分组算法
     *
     * @param list
     * @return
     */
    public List<MenuViewEntity> listGroup(List<MenuViewEntity> list) {
        Map<String, List<MenuViewEntity>> groupMap = new HashMap();
        List<MenuViewEntity> resultList = new ArrayList<MenuViewEntity>();
        //遍历集合以c产权证号为键，以server为值保存到mapList中
        for (MenuViewEntity menu : list) {
            List<MenuViewEntity> tempList = groupMap.get(menu.getParentCode());
             /*如果取不到数据,那么直接new一个空的ArrayList**/
            if (null == tempList) {
                tempList = new ArrayList<MenuViewEntity>();
                tempList.add(menu);
                groupMap.put(menu.getParentCode(), tempList);
            } else {
                tempList.add(menu);
            }
        }
        for (String key : groupMap.keySet()) {
            Map<Object, Object> map = new HashMap<Object, Object>();
            if (null != key) {
                List<MenuViewEntity> plist = authorityMapper.getMenuInfoByPcode(key);
                list.addAll(plist);
            }
        }
        Set<MenuViewEntity> ts = new HashSet<MenuViewEntity>();
        ts.addAll(list);
        return new ArrayList<MenuViewEntity>(ts);
    }

}
