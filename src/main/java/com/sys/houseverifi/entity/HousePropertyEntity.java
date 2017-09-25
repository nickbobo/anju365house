package com.sys.houseverifi.entity;

import com.eshop.frame.base.entity.BaseEntity;

import java.util.Date;

/**
 * 房屋产权人信息
 * Created by tian on 2017/7/31.
 */
public class HousePropertyEntity extends BaseEntity {
    private static final long serialVersionUID = 7281095726306866149L;

    private String id;

    private String ownershipNumber;//产权证号

    private String ownerName;//产权人姓名

    private Integer idType;//证件类型

    private String idNumber;//证件号码

    private String extended1;

    private String extended2;

    private String extended3;

    private String createName;

    private Date createDate;

    private String updateName;

    private Date updateDate;
    private String houseNumber;//房产证号

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOwnershipNumber() {
        return ownershipNumber;
    }

    public void setOwnershipNumber(String ownershipNumber) {
        this.ownershipNumber = ownershipNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public Integer getIdType() {
        return idType;
    }

    public void setIdType(Integer idType) {
        this.idType = idType;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getExtended1() {
        return extended1;
    }

    public void setExtended1(String extended1) {
        this.extended1 = extended1;
    }

    public String getExtended2() {
        return extended2;
    }

    public void setExtended2(String extended2) {
        this.extended2 = extended2;
    }

    public String getExtended3() {
        return extended3;
    }

    public void setExtended3(String extended3) {
        this.extended3 = extended3;
    }

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

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }
}
