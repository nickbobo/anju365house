package com.sys.loan.entity;

import com.eshop.frame.base.entity.BaseEntity;

import java.util.Date;

/**
 * 贷款信息实体类
 * Created by tian on 2017/8/3.
 */
public class LoanInfoEntity extends BaseEntity {

    private static final long serialVersionUID = -899081554289371570L;
    private String id;

    private String applicantName;//申请人名称

    private Integer applicantPhone;//申请人电话

    private Integer idType;//申请人证件类型

    private String idNumber;//申请人证件号码

    private Integer include;//申请人税前收入

    private String housingFund;//公积金账号

    private Integer price;//房屋总价

    private Integer firstPay;//首付款

    private String workAddress;//工作单位

    private String contactAddress;//联系地址

    private Integer maritalStatus;//婚姻状况

    private String mateName;//配偶姓名

    private Integer mateIdtype;//配偶证件类型

    private String mateIdnumber;//配偶证件号码

    private String maritalAttest;//婚姻证明

    private Integer applicantBank;//申请银行

    private Integer applicantMoney;//申请金额

    private Integer loanTerm;//贷款年限

    private Integer payMenthod;//还款方式

    private String proCode;//房源验证嘛

    private String orgCode;//操作人所属公司

    private String personalCredit;//个人征信

    private String loanCode;//贷款单号

    private Integer applicantStatus;//申请状态

    private String extended1;

    private String extended2;

    private String extended3;

    private String createName;

    private Date createDate;

    private String updateName;

    private Date updateDate;
    private String roleCode;//操作人所属角色

    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public Integer getApplicantPhone() {
        return applicantPhone;
    }

    public void setApplicantPhone(Integer applicantPhone) {
        this.applicantPhone = applicantPhone;
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

    public Integer getInclude() {
        return include;
    }

    public void setInclude(Integer include) {
        this.include = include;
    }

    public String getHousingFund() {
        return housingFund;
    }

    public void setHousingFund(String housingFund) {
        this.housingFund = housingFund;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getFirstPay() {
        return firstPay;
    }

    public void setFirstPay(Integer firstPay) {
        this.firstPay = firstPay;
    }

    public String getWorkAddress() {
        return workAddress;
    }

    public void setWorkAddress(String workAddress) {
        this.workAddress = workAddress;
    }

    public String getContactAddress() {
        return contactAddress;
    }

    public void setContactAddress(String contactAddress) {
        this.contactAddress = contactAddress;
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

    public String getMaritalAttest() {
        return maritalAttest;
    }

    public void setMaritalAttest(String maritalAttest) {
        this.maritalAttest = maritalAttest;
    }

    public Integer getApplicantBank() {
        return applicantBank;
    }

    public void setApplicantBank(Integer applicantBank) {
        this.applicantBank = applicantBank;
    }

    public Integer getApplicantMoney() {
        return applicantMoney;
    }

    public void setApplicantMoney(Integer applicantMoney) {
        this.applicantMoney = applicantMoney;
    }

    public Integer getLoanTerm() {
        return loanTerm;
    }

    public void setLoanTerm(Integer loanTerm) {
        this.loanTerm = loanTerm;
    }

    public Integer getPayMenthod() {
        return payMenthod;
    }

    public void setPayMenthod(Integer payMenthod) {
        this.payMenthod = payMenthod;
    }

    public String getProCode() {
        return proCode;
    }

    public void setProCode(String proCode) {
        this.proCode = proCode;
    }

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public String getPersonalCredit() {
        return personalCredit;
    }

    public void setPersonalCredit(String personalCredit) {
        this.personalCredit = personalCredit;
    }

    public String getLoanCode() {
        return loanCode;
    }

    public void setLoanCode(String loanCode) {
        this.loanCode = loanCode;
    }

    public Integer getApplicantStatus() {
        return applicantStatus;
    }

    public void setApplicantStatus(Integer applicantStatus) {
        this.applicantStatus = applicantStatus;
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
}
