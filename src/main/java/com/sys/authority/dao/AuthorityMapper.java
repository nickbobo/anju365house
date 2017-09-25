package com.sys.authority.dao;

import com.eshop.frame.base.dao.BaseMapper;
import com.sys.authority.entity.AuthorityEntity;
import com.sys.menu.entity.MenuEntity;
import com.sys.menu.entity.MenuViewEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by tian on 2017/7/31.
 */
public interface AuthorityMapper extends BaseMapper<AuthorityEntity> {
    /**
     * 角色菜单权限添加
     *
     * @param number   id
     * @param roleCode 角色code
     * @param menuCode 菜单code
     * @param userName 操作人
     */
    public void addRoleMenu(@Param("number") Long number, @Param("roleCode") String roleCode, @Param("menuCode") String menuCode, @Param("userName") String userName);

    /**
     * 角色操作权限配置
     *
     * @param number   id
     * @param roleCode 角色code
     * @param fnCode   功能code
     * @param userName 操作用户
     */
    public void addRoleFunction(@Param("number") Long number, @Param("roleCode") String roleCode, @Param("fnCode") String fnCode, @Param("userName") String userName);

    /**
     * 角色菜单权限查询
     *
     * @param roleCode 角色code
     * @return
     */
    public List<MenuViewEntity> getRoleMenuPerms(@Param("roleCode") String roleCode);

    /**
     * 角色操作权限查询
     *
     * @param roleCode 角色code
     * @param menuCode 菜单code
     * @return
     */
    public List<AuthorityEntity> getRoleFnPermsPage(@Param("roleCode") String roleCode, @Param("menuCode") String menuCode);

    /**
     * 角色菜单权限删除
     *
     * @param roleCode
     * @param menuCode
     */
    public void delRoleMenuPerms(@Param("roleCode") String roleCode, @Param("menuCode") String menuCode);

    /**
     * 根据菜单code删除角色操作配置(菜单权限删除时先删除对应的菜单操作权限)
     *
     * @param list
     */
    public void delRoleFnPermsByMenuCd(List<?> list);

    /**
     * 删除角色操作权限配置
     *
     * @param list
     */
    public void delRoleFnPerms(List<?> list);

    /**
     * 根据角色code查询该角色未配置菜单
     *
     * @param roleCode 角色code
     * @return
     */
    public List<MenuViewEntity> getUnSetMenuInfo(@Param("roleCode") String roleCode);

    /**
     * 根据菜单code查询所有上级
     *
     * @param parentCode
     * @return
     */
    public List<MenuViewEntity> getMenuInfoByPcode(@Param("parentCode") String parentCode);
}
