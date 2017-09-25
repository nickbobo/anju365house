package com.sys.user.service;

import javax.servlet.http.HttpServletRequest;

import com.sys.user.entity.UserEntity;



public interface UserService {
    UserEntity getUserByLoginName(String username,char[] password);
    UserEntity getUserInfo(HttpServletRequest req);
}
