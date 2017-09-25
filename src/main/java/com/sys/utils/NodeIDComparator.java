package com.sys.utils;

import java.util.Comparator;

public class NodeIDComparator implements Comparator  {

	@Override
	public int compare(Object o1, Object o2)
	{
		int j1 = Integer.parseInt(((Function)o1).id);
	     int j2 = Integer.parseInt(((Function)o2).id);
	     return (j1 < j2 ? -1 : (j1 == j2 ? 0 : 1));

	}

}
