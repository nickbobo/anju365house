package com.sys.utils;


public class Function  {

	/**
	 * 菜单显示
	 */
	
	public String id;//节点编号
	
	public String name;//标题
	
	public String parentId;//父节点编号
	
	public String url;//地址
	
	public Children children = new Children();//菜单子集
	
	// 先序遍历，拼接JSON字符串
		 public String toString() {  
		  String result = "{"
		   + "\"id\":\"" + id + "\""
		   + ",\"name\":\"" + name +"\""
		   + ",\"url\":\"" + url +"\"";
		   result += ",\"children\":" + children.toString();
		  return result + "}";
		 }

		// 兄弟节点横向排序
		 public void sortChildren() {
		  if (children != null && children.getSize() != 0) {
		   children.sortChildren();
		  }
		 }
		 
		 // 添加孩子节点
		 public void addChild(Function node) {
		  this.children.addChild(node);
		 }

}
