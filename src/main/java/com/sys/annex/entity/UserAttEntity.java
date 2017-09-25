package com.sys.annex.entity;

import com.eshop.frame.base.entity.BaseEntity;

import java.util.Date;

/**
 * Created by tian on 2017/8/11.
 */
public class UserAttEntity extends BaseEntity {
    private static final long serialVersionUID = -4328937374168228682L;
    private Integer attType;//附件类型

    private String attName;//附件名字

    private String userCode;//用户

    private String id;

    private String attUrl;//附件地址

    private Integer fileType;//上传文件类型
    private String createName;

    private Date createDate;

    private String updateName;

    private Date updateDate;

    public String getCreateName() {
        return createName;
    }

    public void setCreateName(String createName) {
        this.createName = createName;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getUpdateName() {
        return updateName;
    }

    public void setUpdateName(String updateName) {
        this.updateName = updateName;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public Integer getAttType() {
        return attType;
    }

    public void setAttType(Integer attType) {
        this.attType = attType;
    }

    public String getAttName() {
        return attName;
    }

    public void setAttName(String attName) {
        this.attName = attName;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAttUrl() {
        return attUrl;
    }

    public void setAttUrl(String attUrl) {
        this.attUrl = attUrl;
    }

    public Integer getFileType() {
        return fileType;
    }

    public void setFileType(Integer fileType) {
        this.fileType = fileType;
    }
}
