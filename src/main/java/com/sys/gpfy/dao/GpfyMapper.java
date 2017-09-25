package com.sys.gpfy.dao;

import java.util.List;


import com.eshop.frame.base.dao.BaseMapper;
import com.sys.gpfy.entity.Gpfy;

public interface GpfyMapper extends BaseMapper<Gpfy> {
	/**
	 * 查询list
	 * @param gpfy
	 * @return
	 */
	public List<Gpfy> getGpfyList(Gpfy gpfy);
	
}
