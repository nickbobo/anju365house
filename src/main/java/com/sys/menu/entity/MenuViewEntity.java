package com.sys.menu.entity;

import com.eshop.frame.base.entity.BaseEntity;

import java.util.Date;

/**
 * Created by tian on 2017/8/3.
 */
public class MenuViewEntity extends BaseEntity {
    private static final long serialVersionUID = -7233920397775653581L;

    private String id;//菜单code()

    private String name;//名称

    private String parentCode;//父code

    private String menuUrl;//地址

    private Integer sortIndex;//菜单顺序

    private Integer menuLevel;//菜单级别

    private String createName;

    private String createDate;

    private String updateName;

    private String updateDate;

    private Integer num;//子菜单数量

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getParentCode() {
        return parentCode;
    }

    public void setParentCode(String parentCode) {
        this.parentCode = parentCode;
    }

    public String getMenuUrl() {
        return menuUrl;
    }

    public void setMenuUrl(String menuUrl) {
        this.menuUrl = menuUrl;
    }

    public Integer getSortIndex() {
        return sortIndex;
    }

    public void setSortIndex(Integer sortIndex) {
        this.sortIndex = sortIndex;
    }

    public Integer getMenuLevel() {
        return menuLevel;
    }

    public void setMenuLevel(Integer menuLevel) {
        this.menuLevel = menuLevel;
    }

    public String getCreateName() {
        return createName;
    }

    public void setCreateName(String createName) {
        this.createName = createName;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getUpdateName() {
        return updateName;
    }

    public void setUpdateName(String updateName) {
        this.updateName = updateName;
    }

    public String getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    @Override
    public boolean equals(Object obj) {
        MenuViewEntity s=(MenuViewEntity)obj;
        return id.equals(s.id) ;
    }
    @Override
    public int hashCode() {
        String in = id ;
        return in.hashCode();
    }
}
