package com.sys.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

public class Children {
	private List list = new ArrayList();
	 
	 public int getSize() {
	  return list.size();
	 }
	 
	 public void addChild(Function node) {
	  list.add(node);
	 }
	 
	 // 拼接孩子节点的JSON字符串
	 public String toString() {
	  String result = "[";  
	  for (Iterator it = list.iterator(); it.hasNext();) {
	   result += ((Function) it.next()).toString();
	   result += ",";
	  }
	  if(list.size()>0){
		  result = result.substring(0, result.length() - 1);
	  }
	  result += "]";
	  return result;
	 }
	 
	 // 孩子节点排序
	 public void sortChildren() {
	  // 对本层节点进行排序
	  // 可根据不同的排序属性，传入不同的比较器，这里传入ID比较器
	  Collections.sort(list, new NodeIDComparator());
	  // 对每个节点的下一层节点进行排序
	  for (Iterator it = list.iterator(); it.hasNext();) {
	   ((Function) it.next()).sortChildren();
	  }
	 }

}