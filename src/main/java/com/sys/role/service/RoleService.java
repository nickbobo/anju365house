package com.sys.role.service;

import java.util.List;
import java.util.Map;

import com.eshop.frame.annotation.Request;
import com.eshop.frame.exception.BusinessException;
import com.eshop.frame.web.SessionUtils;
import com.sys.user.entity.UserEntity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.eshop.frame.lang.CodeGenerators;
import com.github.pagehelper.StringUtil;
import com.sys.company.entity.CompanyInfoEntity;
import com.sys.role.dao.RoleMapper;
import com.sys.role.entity.RoleEntity;

import javax.servlet.http.HttpServletRequest;

@Service
public class RoleService {
    @Autowired
    private RoleMapper roleMapper;
    private static final Logger logger = LoggerFactory.getLogger(RoleService.class);

    /**
     * 角色列表
     *
     * @param role     获取角色查询的条件
     * @param pageNum
     * @param pageSize
     * @return
     */
    public List<RoleEntity> findRoleInfoPage(@Request("role") RoleEntity role, @Request("pageNum") Integer pageNum,
                                             @Request("pageSize") Integer pageSize) {
        if (null == role) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
        List<RoleEntity> listRole = roleMapper.findRoleInfoPage(role);

        return listRole;
    }

    /**
     * 角色管理添加或修改
     *
     * @param role
     * @param request
     */
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, readOnly = false, rollbackFor = Exception.class)
    public void saveOrUpdateRole(@Request("role") RoleEntity role, HttpServletRequest request) {
        /* 从前端获取请求数据 */
        UserEntity user = SessionUtils.getUser(request);
        role.setCreateName(user.getUserCode());
        if (StringUtil.isEmpty(role.getRoleCode()) || StringUtil.isEmpty(role.getRoleName())) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
         /*id为空进行新增 id不为空进行修改*/
        if (StringUtil.isEmpty(role.getId())) {
            this.RoleCodeIsApprove(role.getRoleCode());
            role.setId(CodeGenerators.nextId() + "");
            try {
                roleMapper.addRole(role);
            } catch (Exception e) {
                e.printStackTrace();
                throw new BusinessException("ROLE_INFO_ADD_ERROR");
            }

        } else {
            try {
                roleMapper.updateRole(role);
            } catch (Exception e) {
                e.printStackTrace();
                throw new BusinessException("ROLE_INFO_UPDATE_ERROR");
            }
        }

    }

    /**
     * 根据ID删除角色(逻辑删除)
     *
     * @param roleCode 角色code
     */

    public void deleteRole(@Request("roleCode") String roleCode, HttpServletRequest request) {
        Long count = roleMapper.checkRole(roleCode);
        if (count > 0) {
            throw new BusinessException("USER_IS_EXIST");
        }
        UserEntity user = SessionUtils.getUser(request);
        roleMapper.deleteRoleByCode(roleCode, user.getUserCode());
    }

    /**
     * 角色code是否通过
     *
     * @param roleCode 角色code
     */
    public void RoleCodeIsApprove(@Request("roleCode") String roleCode) {
        Long count = roleMapper.RoleCodeIsApprove(roleCode);
        if (count > 0) {
            throw new BusinessException("ROLE_CODE_IS_EXIST");
        }

    }

}
