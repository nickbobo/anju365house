package com.sys.menu.dao;

import java.util.List;
import java.util.Map;

import com.eshop.frame.base.dao.BaseMapper;
import com.sys.menu.entity.MenuEntity;
import com.sys.menu.entity.MenuViewEntity;
import org.apache.ibatis.annotations.Param;


public interface MenuMapper extends BaseMapper<MenuEntity> {
    /**
     * 根据用户获取菜单权限
     *
     * @return
     */
    public List<MenuEntity> getMenuPermsByUser(@Param("roleCode") String roleCode);

    /**
     * 菜单信息添加
     *
     * @param menu
     */
    public void addMenu(MenuEntity menu);

    /**
     * 菜单信息更新
     *
     * @param menu
     */
    public void updateMenu(MenuEntity menu);

    /**
     * 菜单信息删除
     *
     * @param menuCode 菜单code
     */
    public void deleteMenu(@Param("menuCode") String menuCode);

    /**
     * 根据菜单code删除操作按钮
     *
     * @param list
     */
    public void delFnByMenuCode(List<?> list);

    /**
     * 根据角色查询该角色未配置的菜单权限信息
     *
     * @param roleCode 角色code
     * @return
     */
    public List<MenuEntity> getUnMenuPermsInfo(@Param("roleCode") String roleCode);

    /**
     * 菜单管理查询菜单列表
     *
     * @param menu
     * @return
     */
    public List<MenuViewEntity> getMenuInfoPage(MenuEntity menu);

    /**
     * 添加菜单时树形列表显示
     *
     * @return
     */
    public List<MenuViewEntity> getMenuInfo();

    /**
     * 菜单添加check
     *
     * @param menuCode
     * @return
     */
    public Long menuCodeIsPro(@Param("menuCode") String menuCode);

    /**
     * 根据菜单code删除URL
     *
     * @param menuCode
     */
    public void delUrlBycode(@Param("menuCode") String menuCode);

    /**
     * 根据父级code更新子级菜单个数
     *
     * @param parentCode
     */
    public void updateNumByPCode(@Param("parentCode") String parentCode);


}
