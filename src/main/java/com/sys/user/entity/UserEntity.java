package com.sys.user.entity;

import com.eshop.frame.authz.AuthzEntity;
import com.eshop.frame.base.entity.BaseEntity;
import com.eshop.frame.sso.SSOEntity;

import java.util.Date;

/**
 *
 * @author tian
 *
 */
public class UserEntity extends BaseEntity  implements SSOEntity, AuthzEntity{
	/**
	 *
	 */
	private static final long serialVersionUID = -8958796737453473956L;

	private String id;

	private String userCode;

	private String userName;

	private String password;

	private String roleCode;

	private String orgCode;

	private Integer userStatus;

	private Integer isLock;

	private String extended1;

	private String extended2;

	private String extended3;

	private String createName;

	private Date createDate;

	private String updateName;

	private Date updateDate;

	private String idNumber;

	private String userMemo;

	private Object obj;

	private Integer userCatg;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public Integer getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(Integer userStatus) {
		this.userStatus = userStatus;
	}

	public Integer getIsLock() {
		return isLock;
	}

	public void setIsLock(Integer isLock) {
		this.isLock = isLock;
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

	public String getIdNumber() {
		return idNumber;
	}

	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}

	public String getUserMemo() {
		return userMemo;
	}

	public void setUserMemo(String userMemo) {
		this.userMemo = userMemo;
	}

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}

	public Integer getUserCatg() {
		return userCatg;
	}

	public void setUserCatg(Integer userCatg) {
		this.userCatg = userCatg;
	}

	private long lastAuthTimeMillis;

	@Override
	public long getLastAuthTimeMillis() {
		return lastAuthTimeMillis;
	}

	@Override
	public void getLastAuthTimeMillis(long lastAuthTimeMillis) {
		this.lastAuthTimeMillis = lastAuthTimeMillis;
	}

	@Override
	public String[] getRoles()
	{
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object getTicket()
	{
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setTicket(Object paramObject)
	{
		// TODO Auto-generated method stub

	}

	@Override
	public String getUsername()
	{
		// TODO Auto-generated method stub
		return null;
	}


}
