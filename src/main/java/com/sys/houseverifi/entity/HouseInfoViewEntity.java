package com.sys.houseverifi.entity;

import com.eshop.frame.base.entity.BaseEntity;

import java.util.Date;

/**
 * Created by tian on 2017/8/1.
 */
public class HouseInfoViewEntity extends BaseEntity {
    private static final long serialVersionUID = 7385001418971794077L;
    private String id;

    private String ownershipNumber;//产权证号

    private String registerDate;//登记时间

    private Integer totalNumber;//总层数

    private Integer seatLayer;//所在层

    private String buildingArea;//建筑面积

    private String jacketArea;//套内面积

    private String apportionedArea;//分摊面积

    private Integer housingUse;//规划用途

    private Integer housingNature;//房屋性质

    private String landCode;//地号

    private Integer houseCseeion;//房屋转让方式

    private String landUsera;//土地使用年限

    private String budingDate;//修建年代

    private Integer landWay;//土地使用权取得方式

    private Integer buildingStructure;//房屋结构

    private String houseAddress;//房屋坐落

    private String houseMemo;//备注信息

    private Integer houseStatus;//房屋状态

    private Integer transType;//交易类型

    private String houseOrigin;//房源信息来源

    private Integer isOn;//是否挂牌

    private Integer proStatus;//验证状态

    private String proDate;//验证日期

    private String ownerName;//产权人姓名

    private Integer ownweIdType;//证件类型

    private String ownerIdNumber;//证件号码

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

    private String mobile;//房子产权人信息
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

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }

    public Integer getTotalNumber() {
        return totalNumber;
    }

    public void setTotalNumber(Integer totalNumber) {
        this.totalNumber = totalNumber;
    }

    public Integer getSeatLayer() {
        return seatLayer;
    }

    public void setSeatLayer(Integer seatLayer) {
        this.seatLayer = seatLayer;
    }

    public String getBuildingArea() {
        return buildingArea;
    }

    public void setBuildingArea(String buildingArea) {
        this.buildingArea = buildingArea;
    }

    public String getJacketArea() {
        return jacketArea;
    }

    public void setJacketArea(String jacketArea) {
        this.jacketArea = jacketArea;
    }

    public String getApportionedArea() {
        return apportionedArea;
    }

    public void setApportionedArea(String apportionedArea) {
        this.apportionedArea = apportionedArea;
    }

    public Integer getHousingUse() {
        return housingUse;
    }

    public void setHousingUse(Integer housingUse) {
        this.housingUse = housingUse;
    }

    public Integer getHousingNature() {
        return housingNature;
    }

    public void setHousingNature(Integer housingNature) {
        this.housingNature = housingNature;
    }

    public String getLandCode() {
        return landCode;
    }

    public void setLandCode(String landCode) {
        this.landCode = landCode;
    }

    public Integer getHouseCseeion() {
        return houseCseeion;
    }

    public void setHouseCseeion(Integer houseCseeion) {
        this.houseCseeion = houseCseeion;
    }

    public String getLandUsera() {
        return landUsera;
    }

    public void setLandUsera(String landUsera) {
        this.landUsera = landUsera;
    }

    public String getBudingDate() {
        return budingDate;
    }

    public void setBudingDate(String budingDate) {
        this.budingDate = budingDate;
    }

    public Integer getLandWay() {
        return landWay;
    }

    public void setLandWay(Integer landWay) {
        this.landWay = landWay;
    }

    public Integer getBuildingStructure() {
        return buildingStructure;
    }

    public void setBuildingStructure(Integer buildingStructure) {
        this.buildingStructure = buildingStructure;
    }

    public String getHouseAddress() {
        return houseAddress;
    }

    public void setHouseAddress(String houseAddress) {
        this.houseAddress = houseAddress;
    }

    public String getHouseMemo() {
        return houseMemo;
    }

    public void setHouseMemo(String houseMemo) {
        this.houseMemo = houseMemo;
    }

    public Integer getHouseStatus() {
        return houseStatus;
    }

    public void setHouseStatus(Integer houseStatus) {
        this.houseStatus = houseStatus;
    }

    public Integer getTransType() {
        return transType;
    }

    public void setTransType(Integer transType) {
        this.transType = transType;
    }

    public String getHouseOrigin() {
        return houseOrigin;
    }

    public void setHouseOrigin(String houseOrigin) {
        this.houseOrigin = houseOrigin;
    }

    public Integer getIsOn() {
        return isOn;
    }

    public void setIsOn(Integer isOn) {
        this.isOn = isOn;
    }

    public Integer getProStatus() {
        return proStatus;
    }

    public void setProStatus(Integer proStatus) {
        this.proStatus = proStatus;
    }

    

    public String getProDate()
	{
		return proDate;
	}

	public void setProDate(String proDate)
	{
		this.proDate = proDate;
	}

	public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public Integer getOwnweIdType() {
        return ownweIdType;
    }

    public void setOwnweIdType(Integer ownweIdType) {
        this.ownweIdType = ownweIdType;
    }

    public String getOwnerIdNumber() {
        return ownerIdNumber;
    }

    public void setOwnerIdNumber(String ownerIdNumber) {
        this.ownerIdNumber = ownerIdNumber;
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

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    @Override
    public boolean equals(Object obj) {
        HouseInfoViewEntity s = (HouseInfoViewEntity) obj;
        if (null != houseNumber && null != ownershipNumber) {
            return houseNumber.equals(s.houseNumber) && ownershipNumber.equals(s.ownershipNumber);
        }
        if (null == houseNumber) {
            return ownershipNumber.equals(s.ownershipNumber);
        } else {
            return houseNumber.equals(s.houseNumber);
        }

    }

    @Override
    public int hashCode() {
        String in = "";
        if (null != houseNumber && null != ownershipNumber) {
            in = houseNumber + ownershipNumber;
        }
        if (null == houseNumber) {
            in = ownershipNumber;
        } else {
            in = houseNumber;
        }

        return in.hashCode();
    }
}
