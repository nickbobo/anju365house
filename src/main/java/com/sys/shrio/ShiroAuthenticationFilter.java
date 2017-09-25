package com.sys.shrio;

import com.eshop.frame.sso.SSOHelper;
import com.eshop.frame.web.SessionUtils;
import com.sys.user.entity.UserEntity;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.AuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by tian on 2017/8/4.
 */
public class ShiroAuthenticationFilter extends AuthenticationFilter {

    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
        Subject subject = this.getSubject(request, response);
        //未登录
        if (subject == null || !subject.isAuthenticated()) {
            return false;
        }
        return true;
    }
    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        final HttpServletRequest httpRequest = WebUtils.toHttp(request);
        final HttpServletResponse httpResponse= WebUtils.toHttp(response);
        UserEntity user = SessionUtils.getUser(httpRequest);
        if(null==user){
            httpResponse.sendRedirect("login.html");
        }
        return false;
    }
}
