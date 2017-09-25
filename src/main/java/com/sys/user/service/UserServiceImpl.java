package com.sys.user.service;

import com.eshop.frame.SystemConfig;
import com.eshop.frame.annotation.Request;
import com.eshop.frame.exception.BusinessException;
import com.eshop.frame.lang.CodeGenerators;
import com.eshop.frame.lang.Excels;
import com.eshop.frame.lang.MD5Utils;
import com.eshop.frame.web.SessionUtils;
import com.github.pagehelper.StringUtil;
import com.google.common.collect.Lists;
import com.sys.authority.dao.AuthorityMapper;
import com.sys.authority.service.AuthorityService;
import com.sys.company.entity.CompanyInfoEntity;
import com.sys.menu.dao.MenuMapper;
import com.sys.menu.entity.MenuViewEntity;
import com.sys.role.entity.RoleEntity;
import com.sys.user.dao.LoginMapper;
import com.sys.user.entity.UserEntity;

import javax.servlet.http.HttpServletRequest;

import com.sys.utils.Constants;
import com.sys.utils.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    private LoginMapper loginMapper;
    @Autowired
    private MenuMapper menuMapper;
    @Autowired
    private AuthorityService authorityService;

    public UserEntity getUserByLoginName(String loginName, char[] password) {
        return this.checkUser(loginName, String.valueOf(password));
    }

    @Override
    public UserEntity getUserInfo(HttpServletRequest req) {
        // Auto-generated method stub
        return SessionUtils.getUser(req);
    }

    public UserEntity checkUser(String loginName, String password) {
        UserEntity entity = loginMapper.checkUser(loginName);
        if (null == entity) {
            throw new BusinessException("USERCODE_OR_PASSWORD_IS_WRONG");
        }
        if (!MD5Util.MD5(password).equals(entity.getPassword())) {
            throw new BusinessException("USERCODE_OR_PASSWORD_IS_WRONG");
        }
        if (Constants.userAdmin == entity.getUserCatg()) {
            List<MenuViewEntity> list = menuMapper.getMenuInfoPage(null);
            entity.setObj(list);
        } else {
            if (StringUtil.isNotEmpty(entity.getRoleCode())) {
                List<MenuViewEntity> list = authorityService.getRoleMenuPerms(entity.getRoleCode());
                entity.setObj(list);
            }
        }

        return entity;

    }

    /**
     * 添加用户信息
     *
     * @param userInfo
     */
    public void addUserInfo(@Request("userInfo") UserEntity userInfo, HttpServletRequest request) {
        if (loginMapper.userIsPro(userInfo.getUserCode()) > 0) {
            throw new BusinessException("USER_CODE_IS_EXIST ");
        }
        if (loginMapper.idNumberIsPro(userInfo.getIdNumber()) > 0) {
            throw new BusinessException("IDNUMBER_IS_EXIST ");
        }
        UserEntity user = SessionUtils.getUser(request);
        userInfo.setCreateName(user.getUserCode());
        userInfo.setId(CodeGenerators.nextId() + "");
        //用户密码MD5加密
        userInfo.setPassword(MD5Util.MD5(userInfo.getPassword()));
        loginMapper.addUserInfo(userInfo);

    }

    /**
     * 用户信息更新
     *
     * @param userInfo 用户信息
     * @param type     类型 0 批量禁用更新 1 批量启用更新 2 单条信息更新
     * @param request
     */

    public void updateUserInfo(@Request("userInfo") UserEntity[] userInfo, @Request("type") String type, HttpServletRequest request) {
        //获取登录用户信息
        UserEntity user = SessionUtils.getUser(request);
        for (UserEntity userentity : userInfo) {
            userentity.setCreateName(user.getUserCode());
            //type 0 用户批量禁用
            if ("0".equals(type)) {
                userentity.setUserStatus(0);
            }
            //type 1 用户批量启用
            if ("1".equals(type)) {
                userentity.setUserStatus(1);
            }

        }
        loginMapper.updateUserInfo(Lists.newArrayList(userInfo));

    }

    /**
     * 用户信息列表查询
     *
     * @param userInfo
     * @return
     */
    public List<UserEntity> getUserInfoPage(@Request("userInfo") UserEntity userInfo, @Request("pageNum") Integer pageNum,
                                            @Request("pageSize") Integer pageSize) {
        List<UserEntity> list = loginMapper.getUserInfo(userInfo);
        return list;

    }

    /**
     * 获取角色信息（添加用户下拉框）
     *
     * @return
     */
    public List<RoleEntity> getRoleInfo() {
        List<RoleEntity> list = loginMapper.getRoleInfo();
        return list;
    }

    /**
     * 获去经济公司信息（添加用户下拉）
     *
     * @return
     */
    public List<CompanyInfoEntity> getCompanyInfo() {
        List<CompanyInfoEntity> list = loginMapper.getCompanyInfo();
        return list;

    }

    /**
     * 登录密码MD5加密
     *
     * @param initPassword
     * @return
     */
    public static String getMD5LoginPassword(String initPassword) {
        String password = MD5Util.MD5(initPassword);
        return password;
    }

    /**
     * 上传文件
     *
     * @param file
     * @param req
     */
    public void fileUplod(File file, HttpServletRequest req) {

    }

    public List<Map<String, String>> exclImpInfoRead(String impType, String catg_code, File file) {
        int cNum = SystemConfig.getInstance().getInt(""); // 总列数
        int tNum = SystemConfig.getInstance().getInt(""); // 标题行数
        String[] cName = SystemConfig.getInstance().getStringArray(""); // 列对应code

        // 可为空列（int[]{1,2,3}）
        String[] bColumns = SystemConfig.getInstance().getStringArray("");
        int[] blank = new int[bColumns.length];
        for (int i = 0; i < bColumns.length; i++) {
            blank[i] = Integer.valueOf(bColumns[i]);
        }

        // 检验列
        String[] dictTran = SystemConfig.getInstance().getStringArray("");
        int[] dictnum = new int[dictTran.length];
        for (int i = 0; i < dictTran.length; i++) {
            String[] str = dictTran[i].split(":");
            dictnum[i] = Integer.valueOf(str[0]);
            dictTran[i] = str[1];
        }
        List<Map<String, String>> maps = new ArrayList<Map<String, String>>();
        if (bColumns.length > 0) {
            Excels.Reader reader = Excels.newReaderBuilder(cNum).titleRowNum(tNum)
                    .blankColumns(blank)
                    .dicts(dictnum, dictTran).read(file);
            maps = reader.asMap(cName);
        } else {
            Excels.Reader reader = Excels.newReaderBuilder(cNum).titleRowNum(tNum)
                    .dicts(dictnum, dictTran).read(file);
            maps = reader.asMap(cName);
        }

        return maps;

    }

}
