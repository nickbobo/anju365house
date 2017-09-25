package com.sys.houseverifi.entity;

import com.eshop.frame.base.entity.BaseEntity;

import java.util.Date;

/**
 * Created by tian on 2017/8/9.
 */
public class HouseNoticeEntity extends BaseEntity {
    private static final long serialVersionUID = 7946904750564268464L;
    private String id;

    private String proCode;

    private String ownershipNumber;//房产证号

    private Integer sequestrationStauts;//查封状态

    private Integer freezeFlag;//冻结状态

    private Integer mortgageStatus;//抵押状态

    private Integer previewStatus;//预告状态

    private Integer signStatus;//签约状态

    private String verifyName;//验证申请人

    private String extended1;

    private String extended2;

    private String extended3;

    private Date proDate;//验证时间

    private String createName;

    private Date createDate;

    private String updateName;

    private Date updateDate;

    private Integer proStatus;//验证结果
    private String houseNumber;//房产证号

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProCode() {
        return proCode;
    }

    public void setProCode(String proCode) {
        this.proCode = proCode;
    }

    public String getOwnershipNumber() {
        return ownershipNumber;
    }

    public void setOwnershipNumber(String ownershipNumber) {
        this.ownershipNumber = ownershipNumber;
    }

    public Integer getSequestrationStauts() {
        return sequestrationStauts;
    }

    public void setSequestrationStauts(Integer sequestrationStauts) {
        this.sequestrationStauts = sequestrationStauts;
    }

    public Integer getFreezeFlag() {
        return freezeFlag;
    }

    public void setFreezeFlag(Integer freezeFlag) {
        this.freezeFlag = freezeFlag;
    }

    public Integer getMortgageStatus() {
        return mortgageStatus;
    }

    public void setMortgageStatus(Integer mortgageStatus) {
        this.mortgageStatus = mortgageStatus;
    }

    public Integer getPreviewStatus() {
        return previewStatus;
    }

    public void setPreviewStatus(Integer previewStatus) {
        this.previewStatus = previewStatus;
    }

    public Integer getSignStatus() {
        return signStatus;
    }

    public void setSignStatus(Integer signStatus) {
        this.signStatus = signStatus;
    }

    public String getVerifyName() {
        return verifyName;
    }

    public void setVerifyName(String verifyName) {
        this.verifyName = verifyName;
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

    public Date getProDate() {
        return proDate;
    }

    public void setProDate(Date proDate) {
        this.proDate = proDate;
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

    public Integer getProStatus() {
        return proStatus;
    }

    public void setProStatus(Integer proStatus) {
        this.proStatus = proStatus;
    }
}
