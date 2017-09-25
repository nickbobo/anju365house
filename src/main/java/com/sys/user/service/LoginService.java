package com.sys.user.service;

import com.eshop.frame.annotation.Request;
import com.eshop.frame.exception.SystemException;
import com.eshop.frame.rpc.ServiceConfig;
import com.eshop.frame.sso.SSOHelper;
import com.eshop.frame.web.SessionUtils;
import com.sys.user.entity.UserEntity;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.stereotype.Service;

import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Service
public class LoginService {
    public UserEntity frontLogin(HttpServletRequest request, @Request("userName") String userName
            , @Request("password") String password) {
        Subject subject = SecurityUtils.getSubject();
        if (subject.isAuthenticated()) {
            subject.logout();
        }
        UsernamePasswordToken token = new UsernamePasswordToken(userName, password);
        try {
            subject.login(token);
        } catch (IncorrectCredentialsException ex) {
            throw new SystemException("SYS_LOGIN_NAME_PWD_ERROR");
        }

        final UserEntity principal = (UserEntity) subject.getPrincipal();
        return principal;
    }

    public UserEntity login(HttpServletRequest request, @Request("randCode") String randCode
            , @Request("userName") String userName, @Request("password") String password) {
        //校验randCode
        if (randCode == null || !randCode.equals(SessionUtils.getRandCode(request))) {
            throw new SystemException("SYS_LOGIN_VALID_CODE_ERROR");
        } else {
            Subject subject = SecurityUtils.getSubject();
            if (subject.isAuthenticated()) {
                subject.logout();
            }
            UsernamePasswordToken token = new UsernamePasswordToken(userName, password);
            try {
                subject.login(token);
            } catch (IncorrectCredentialsException ex) {
                throw new SystemException("SYS_LOGIN_NAME_PWD_ERROR");
            }

            final UserEntity principal = (UserEntity) subject.getPrincipal();
            return principal;
        }

    }

    public void logout(HttpServletRequest request,HttpServletResponse response) {
        Subject subject = SecurityUtils.getSubject();
        if (subject.isAuthenticated()) {
            subject.logout();
        }
        try {
            WebUtils.issueRedirect(request, response, "/login.html");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void unauthorized() {
        throw new SystemException("SYS_LOGIN_NO_ACCESS_AUTH");
    }

    public void relogin() {
        throw new SystemException("SYS_LOGIN_NO_LOGIN_INFO");
    }

    public static void main(String[] args) {
        final ServiceConfig instance = ServiceConfig.getInstance();
        instance.getRedisTemplateName("");
        System.out.println(instance);
    }
}
