package com.sys.houseverifi.entity;

import com.eshop.frame.base.entity.BaseEntity;

import java.util.Date;

/**
 * 申请人信息
 * Created by tian on 2017/7/31.
 */
public class ProposerInfoEntity extends BaseEntity {

    private static final long serialVersionUID = 680715595943090850L;

    private String id;

    private String ownershipNumber;//产权证号

    private String applicantName;//申请人名称

    private Integer applicantNature;//申请人性质

    private Integer idType;//证件类型

    private String idNumber;//证件号码

    private Integer nation;//民族

    private String address;//联系地址

    private Integer maritalStatus;//是否婚配

    private String mateName;//配偶姓名

    private Integer mateIdtype;//配偶证件类型

    private String mateIdnumber;//配偶证件号码

    private String extended1;

    private String extended2;

    private String extended3;

    private String createName;

    private Date createDate;

    private String updateName;

    private Date updateDate;

    private String mobile;
    private String houseNumber;//房产证号

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

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

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public Integer getApplicantNature() {
        return applicantNature;
    }

    public void setApplicantNature(Integer applicantNature) {
        this.applicantNature = applicantNature;
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

    public Integer getNation() {
        return nation;
    }

    public void setNation(Integer nation) {
        this.nation = nation;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(Integer maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getMateName() {
        return mateName;
    }

    public void setMateName(String mateName) {
        this.mateName = mateName;
    }

    public Integer getMateIdtype() {
        return mateIdtype;
    }

    public void setMateIdtype(Integer mateIdtype) {
        this.mateIdtype = mateIdtype;
    }

    public String getMateIdnumber() {
        return mateIdnumber;
    }

    public void setMateIdnumber(String mateIdnumber) {
        this.mateIdnumber = mateIdnumber;
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
