package com.sys.company.entity;

import com.eshop.frame.base.entity.BaseEntity;

import java.util.Date;

/**
 * 贷款信息实体类
 * Created by tian on 2017/8/3.
 */
public class CompanyInfoEntity extends BaseEntity {
    private static final long serialVersionUID = -3790715350903353047L;

    private String id;

    private String orgCode;//公司code

    private String shortName;//简称

    private String name;//全称

    private String pOrgCode;//父级code

    private Integer sortIndex;//顺序

    private Integer orgLevel;//级别

    private String extended1;

    private String extended2;

    private String extended3;

    private String createName;

    private Date createDate;

    private String updateName;

    private Date updateDate;
    
    private String telephone;//经纪公司电话
    
    private String pAbstract; //公司简介
    
    private String pLPerson;//公司法人
    
    private String pAdress; //公司地址
    
    private Integer isDel;//是否无效
    
    private Integer num;//子菜单个数
    
    
    public CompanyInfoEntity() {
		super();
	}

	public CompanyInfoEntity(String id, String orgCode, String shortName, String name, String pOrgCode,
			Integer sortIndex, Integer orgLevel, String createName, Date createDate, String updateName, Date updateDate,
			String telephone, String pAbstract, String pLPerson, String pAdress, Integer isDel) {
		super();
		this.id = id;
		this.orgCode = orgCode;
		this.shortName = shortName;
		this.name = name;
		this.pOrgCode = pOrgCode;
		this.sortIndex = sortIndex;
		this.orgLevel = orgLevel;
		this.createName = createName;
		this.createDate = createDate;
		this.updateName = updateName;
		this.updateDate = updateDate;
		this.telephone = telephone;
		this.pAbstract = pAbstract;
		this.pLPerson = pLPerson;
		this.pAdress = pAdress;
	}

	public Integer getNum() {
		return num;
	}
    
	public void setNum(Integer num) {
		this.num = num;
	}

	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getpOrgCode() {
        return pOrgCode;
    }

    public void setpOrgCode(String pOrgCode) {
        this.pOrgCode = pOrgCode;
    }

    public Integer getSortIndex() {
        return sortIndex;
    }

    public void setSortIndex(Integer sortIndex) {
        this.sortIndex = sortIndex;
    }

    public Integer getOrgLevel() {
        return orgLevel;
    }

    public void setOrgLevel(Integer orgLevel) {
        this.orgLevel = orgLevel;
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

	public Integer getIsDel() {
		return isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getpAbstract() {
		return pAbstract;
	}

	public void setpAbstract(String pAbstract) {
		this.pAbstract = pAbstract;
	}

	public String getpLPerson() {
		return pLPerson;
	}

	public void setpLPerson(String pLPerson) {
		this.pLPerson = pLPerson;
	}

	public String getpAdress() {
		return pAdress;
	}

	public void setpAdress(String pAdress) {
		this.pAdress = pAdress;
	}
    
    
}
