package com.sys.houseverifi.entity;

import com.eshop.frame.base.entity.BaseEntity;

import java.util.Date;


/**
 * 房屋信息
 * Created by tian on 2017/7/31.
 */
public class HouseInfoEntity extends BaseEntity {

    private static final long serialVersionUID = -7188364434291188629L;

    private String id;

    private String proCode;//房源验证编号

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

    private String houseFrom;//房源信息来源

    private Integer isOn;//是否挂牌

    private Integer proStatus;//验证状态

    private String extended1;

    private String extended2;

    private String extended3;

    private String createName;

    private Date createDate;

    private String updateName;

    private Date updateDate;

    private String proDate;//验证日期

    private String roleCode;//角色code

    private String orgCode;//所属公司code

    private String proUser;//验证申请人
    private String houseNumber;//房产证号

    private Integer type;//0 产权证1房产证

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

    public String getHouseFrom() {
        return houseFrom;
    }

    public void setHouseFrom(String houseFrom) {
        this.houseFrom = houseFrom;
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

   

    public String getProDate()
	{
		return proDate;
	}

	public void setProDate(String proDate)
	{
		this.proDate = proDate;
	}

	public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public String getProUser() {
        return proUser;
    }

    public void setProUser(String proUser) {
        this.proUser = proUser;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
