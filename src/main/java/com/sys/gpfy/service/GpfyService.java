package com.sys.gpfy.service;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshop.frame.annotation.Request;
import com.eshop.frame.dict.Dict;
import com.eshop.frame.dict.DictElem;
import com.eshop.frame.dict.DictService;
import com.sys.gpfy.dao.GpfyMapper;
import com.sys.gpfy.entity.Gpfy;
@Service
public class GpfyService {
	@Autowired
	private GpfyMapper gpfymapper;
	@Autowired
    private DictService dictService;

	
	private static final Logger logger = LoggerFactory.getLogger(GpfyService.class);
	
	/**
	 * 房屋挂牌信息list
	 * @param gpfy
	 * @param pageNum
	 * @param pageSize
	 * @param request
	 * @return
	 */
	public List<Gpfy> getListPage(@Request("gpfy") Gpfy gpfy,
            @Request("pageNum") Integer pageNum, @Request("pageSize") Integer pageSize,HttpServletRequest request){
		//logger.info("淇℃伅鍒楄〃鍙傛暟"+entity);
//		if(pageNum==null || pageSize==null){
//			throw new BusinessException("PARAMS_IS_NULL").addScene("obj", "鏁版嵁鏈夎--");
//		}
		List<Gpfy> list = gpfymapper.getGpfyList(gpfy);
		
		return list;
	}
	
	/**
	 * 数据字典
	 * @return
	 */
	public List<DictElem> cityLevel() {
        Dict dict = dictService.getDict("levelCode");
        final List<DictElem> dictElems = dict.getDictElems();
        return dictElems;
    }
}
