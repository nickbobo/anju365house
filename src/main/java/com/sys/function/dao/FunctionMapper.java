package com.sys.function.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.eshop.frame.base.dao.BaseMapper;
import com.sys.function.entity.FunctionEntity;


public interface FunctionMapper extends BaseMapper<FunctionEntity> {
    /**
     * 页面操作按钮添加
     *
     * @param params
     */
    public void addFunction(Map<String, Object> params);

    /**
     * 页面操作按钮信息更新
     *
     * @param params
     */
    public void updateFunction(Map<String, Object> params);

    /**
     * 页面操作按钮信息删除
     *
     * @param list
     */
    public void delFunction(List<?> list);
    
    /**
     * 删除页面操作按钮时先删除角色和操作配置
     * @param list
     */
    public void delRoleFnPermsByFnCode(List<?> list);

    /**
     * 根据菜单code查询页面操作按钮
     *
     * @param menuCode 菜单code
     * @return
     */
    public List<FunctionEntity> getFnInfoByMc(@Param("menuCode") String menuCode);

    /**
     * 根据角色和菜单查询未配置的操作权限信息
     *
     * @param menuCode 菜单code
     * @param roleCode 角色code
     * @return
     */
    public List<FunctionEntity> getUnFnPermsInfo(@Param("menuCode") String menuCode, @Param("roleCode") String roleCode);
    
    /**
     * 根据用户获取操作权限
     * 
     * @return
     */
    public List<FunctionEntity>getFnPermsByUser(@Param("roleCode") String roleCode);
}
