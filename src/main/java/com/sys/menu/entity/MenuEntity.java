package com.sys.menu.entity;

import com.eshop.frame.base.entity.BaseEntity;

import java.util.Date;

public class MenuEntity extends BaseEntity{

	/**
	 * 菜单实体类
	 */
	private static final long serialVersionUID = 1882223027261194301L;
	
	private String id;
	
	private String menuCode;//菜单code
	
	private String enName;//英文名称

	private String chName;//中文名称
	
	private String parentCode;//父code
	
	private String menuUrl;//地址

	private Integer sortIndex;//菜单顺序

	private Integer menuLevel;//菜单级别

	private String extended1;//

	private String extended2;

	private String extended3;

	private String createName;

	private Date createDate;

	private String updateName;

	private Date updateDate;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMenuCode() {
		return menuCode;
	}

	public void setMenuCode(String menuCode) {
		this.menuCode = menuCode;
	}

	public String getEnName() {
		return enName;
	}

	public void setEnName(String enName) {
		this.enName = enName;
	}

	public String getChName() {
		return chName;
	}

	public void setChName(String chName) {
		this.chName = chName;
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
