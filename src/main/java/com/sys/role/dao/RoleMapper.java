package com.sys.role.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.eshop.frame.base.dao.BaseMapper;
import com.sys.menu.entity.MenuEntity;
import com.sys.role.entity.RoleEntity;



public interface RoleMapper extends BaseMapper<MenuEntity>{
	
	/**
	 * 角色列表
	 * @param role
	 * @return
	 */
	public List<RoleEntity> findRoleInfoPage(RoleEntity role);
	
	/**
	 * 添加角色
	 *
	 * @param params
	 */
	public void addRole(RoleEntity role);

	/**
	 * 更新角色信息
	 *
	 * @param params
	 */
	public void updateRole(RoleEntity role);

	/**
	 * 删除角色
	 *
	 * @param roleCode
	 */
	public void deleteRoleByCode(@Param("roleCode") String roleCode, @Param("updateName") String updateName);

	/**
	 * 角色删除前check 有用户属于该角色不可删除
	 *
	 * @param roleCode 角色code
	 * @return
	 */
	public Long checkRole(@Param("roleCode") String roleCode);

	/**
	 *新增时 角色code是否通过
	 *
	 * @param roleCode 角色code
	 * @return
	 */
	public Long RoleCodeIsApprove(@Param("roleCode") String roleCode);

}
