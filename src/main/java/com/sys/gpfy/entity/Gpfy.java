package com.sys.gpfy.entity;

import java.util.Date;

public class Gpfy {
	private int id;//id
	private String wydz;//房屋坐落
	private double jzmj;//建筑面积
	private int cq;     //城区
	private String nd;  //年代
	private String gpyxqqs;//挂牌有效期起始
	private String gpyxqzz;//挂牌有效期结束；
	private int totelNo; //查询总条数
	
	
	public int getTotelNo() {
		return totelNo;
	}
	public void setTotelNo(int totelNo) {
		this.totelNo = totelNo;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getWydz() {
		return wydz;
	}
	public void setWydz(String wydz) {
		this.wydz = wydz;
	}
	public double getJzmj() {
		return jzmj;
	}
	public void setJzmj(double jzmj) {
		this.jzmj = jzmj;
	}
	public int getCq() {
		return cq;
	}
	public void setCq(int cq) {
		this.cq = cq;
	}
	public String getNd() {
		return nd;
	}
	public void setNd(String nd) {
		this.nd = nd;
	}
	public String getGpyxqqs() {
		return gpyxqqs;
	}
	public void setGpyxqqs(String gpyxqqs) {
		this.gpyxqqs = gpyxqqs;
	}
	public String getGpyxqzz() {
		return gpyxqzz;
	}
	public void setGpyxqzz(String gpyxqzz) {
		this.gpyxqzz = gpyxqzz;
	}
	
	@Override
	public String toString() {
		return "Gpfy [id=" + id + ", wydz=" + wydz + ", jzmj=" + jzmj + ", cq=" + cq + ", nd=" + nd + ", gpyxqqs="
				+ gpyxqqs + ", gpyxqzz=" + gpyxqzz + ", totelNo=" + totelNo + "]";
	}
	
	
	
}
