package com.sys.shrio;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.beans.factory.annotation.Autowired;

import com.eshop.frame.shiro.AbstractAccountRealm;
import com.sys.user.entity.UserEntity;
import com.sys.user.service.UserService;


public class DefaultRealm extends AbstractAccountRealm {
    @Autowired
    private UserService userService;

    @Override
    protected Object getCredentials(Object principal) {
        return ((UserEntity) principal).getPassword().toCharArray();
    }

    @Override
    protected Object getPrincipal(AuthenticationToken authenticationToken) {
        return userService.getUserByLoginName(((UsernamePasswordToken) authenticationToken).getUsername(),((UsernamePasswordToken) authenticationToken).getPassword());
    }
    @Override
    protected boolean isLock(Object principal) {
        return BooleanUtils.toBoolean(((UserEntity) principal).getIsLock(), Integer.valueOf(1), Integer.valueOf(0));
    }
   

}
