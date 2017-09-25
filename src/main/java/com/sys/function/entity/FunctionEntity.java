package com.sys.function.entity;

import com.eshop.frame.base.entity.BaseEntity;

public class FunctionEntity extends BaseEntity {

    /**
     * 页面功能
     */
    private static final long serialVersionUID = -3467365830195075453L;


    private Long id;

    private String menuCode;

    private String fnCode;

    private String fnName;

    private String fnMemo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMenuCode() {
        return menuCode;
    }

    public void setMenuCode(String menuCode) {
        this.menuCode = menuCode;
    }

    public String getFnCode() {
        return fnCode;
    }

    public void setFnCode(String fnCode) {
        this.fnCode = fnCode;
    }

    public String getFnName() {
        return fnName;
    }

    public void setFnName(String fnName) {
        this.fnName = fnName;
    }

    public String getFnMemo() {
        return fnMemo;
    }

    public void setFnMemo(String fnMemo) {
        this.fnMemo = fnMemo;
    }


}
