package com.sys.user.dao;

import java.util.List;
import java.util.Map;

import com.sys.authority.entity.AuthorityViewEntity;
import com.sys.company.entity.CompanyInfoEntity;
import com.sys.role.entity.RoleEntity;
import org.apache.ibatis.annotations.Param;

import com.eshop.frame.base.dao.BaseMapper;
import com.sys.menu.entity.MenuEntity;
import com.sys.user.entity.UserEntity;


public interface LoginMapper extends BaseMapper<UserEntity> {
    /**
     * 登录验证
     *
     * @return
     */
    public UserEntity checkUser(@Param("loginName") String loginName);

    /**
     * 用户信息添加
     *
     * @param userentity
     */
    public void addUserInfo(UserEntity userentity);

    /**
     * 用户信息更新
     *
     * @param userentity
     */
    public void updateUserInfo(UserEntity userentity);

    /**
     * 用户信息查询
     *
     * @param userentity
     * @return
     */
    public List<UserEntity> getUserInfo(UserEntity userentity);

    /**
     * 用户信息更新
     *
     * @param userentity
     */
    public void updateUserInfo(List<UserEntity> userentity);

    /**
     * 登录名是否存在
     *
     * @param userCode 登录名
     * @return
     */
    public Long userIsPro(@Param("userCode") String userCode);

    /**
     * 用户证件号码是否存在
     *
     * @param idNumber 证件号码
     * @return
     */
    public Long idNumberIsPro(@Param("idNumber") String idNumber);

    /**
     * 获取角色信息（添加用户下拉框）
     *
     * @return
     */
    public List<RoleEntity> getRoleInfo();

    /**
     * 获去经济公司信息（添加用户下拉）
     *
     * @return
     */
    public List<CompanyInfoEntity> getCompanyInfo();

    /**
     * 根据用户角色code查询显示权限
     *
     * @param roleCode 角色code
     * @return
     */
    public List<AuthorityViewEntity> getPermission(@Param("roleCode") String roleCode);


}
