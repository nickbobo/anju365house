package com.sys.role.entity;

import java.util.Date;

import com.eshop.frame.base.entity.BaseEntity;

/**
 * Created by tian on 2017/8/2.
 * 角色信息表
 */
public class RoleEntity extends BaseEntity {
	private static final long serialVersionUID = -187037642078328487L;

	private String id;//角色ID
	private String roleCode;//角色code
	private String roleName;//角色名称
	private Integer isDel;//是否删除
	private String extended1;//扩展字段
	private String extended2;//扩展字段
	private String extended3;//扩展字段
	private String createName;//创建人
	private Date createDate;//创建时间
	private String updateName;//修改人
	private Date updateDate;//修改时间
	
	public RoleEntity() {
		// TODO Auto-generated constructor stub
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Integer getIsDel() {
		return isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
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
