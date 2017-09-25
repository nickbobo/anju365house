package com.sys.houseverifi.service;

import com.eshop.frame.SystemConfig;
import com.eshop.frame.annotation.Request;
import com.eshop.frame.dict.Dict;
import com.eshop.frame.dict.DictElem;
import com.eshop.frame.exception.BusinessException;
import com.eshop.frame.lang.CodeGenerators;
import com.eshop.frame.web.SessionUtils;
import com.github.pagehelper.StringUtil;
import com.google.common.collect.Lists;
import com.sys.authority.service.AuthorityService;
import com.sys.dict.service.DictService;
import com.sys.houseverifi.dao.HouseVerifiMapper;
import com.sys.houseverifi.entity.*;
import com.sys.menu.entity.MenuViewEntity;
import com.sys.user.entity.UserEntity;
import com.sys.utils.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class HouseVerifiService {
    @Autowired
    private HouseVerifiMapper houseVerifiMapper;
    @Autowired
    private DictService dictservice;
    private static final Logger logger = LoggerFactory.getLogger(AuthorityService.class);

    /**
     * 房源信息添加
     *
     * @param proInfo 申请人信息
     * @param proper  权利人信息
     * @param house   房子信息
     * @param request
     */
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, readOnly = false, rollbackFor = Exception.class)
    public void houseInfoSave(@Request("applicantList") ProposerInfoEntity proInfo, @Request("litigantList") HousePropertyEntity[] proper, @Request("houseInfoList") HouseInfoEntity house) {
        if (null == proInfo || proper.length == 0 || null == house) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
        //房源验证是否存在
        isPro(house.getOwnershipNumber(), house.getHouseNumber());
        //获取登录用户信息
       // UserEntity user = SessionUtils.getUser(request);
        proInfo.setId(CodeGenerators.nextId() + "");
       // proInfo.setCreateName(user.getUserCode());
        proInfo.setOwnershipNumber(house.getOwnershipNumber());
        proInfo.setHouseNumber(house.getHouseNumber());
        house.setId(CodeGenerators.nextId() + "");
        //house.setCreateName(user.getUserCode());
        //house.setRoleCode(user.getRoleCode());
        //house.setOrgCode(user.getOrgCode());
        for (HousePropertyEntity hpInfo : proper) {
            hpInfo.setId(CodeGenerators.nextId() + "");
            hpInfo.setOwnershipNumber(house.getOwnershipNumber());
            hpInfo.setHouseNumber(house.getHouseNumber());
           // hpInfo.setCreateName(user.getUserCode());

        }
        try {
            houseVerifiMapper.addHouseInfo(house);
            houseVerifiMapper.addProposerInfo(proInfo);
            houseVerifiMapper.addHousePropertyInfo(Lists.newArrayList(proper));
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessException("HOUSE_INFO_ADD_ERROR");
        }
    }

    /**
     * 获取房源信息列表
     *
     * @param params
     * @return
     */
    public Map getHouseInfoPage(Map<String, Object> params, @Request("pageNum") Integer pageNum,
                                @Request("pageSize") Integer pageSize) {
        logger.info("获取房源信息列表参数：" + params);
       // UserEntity user = SessionUtils.getUser(request);
        //如果不是管理员角色 则赋值给，查询角色拥有的数据
        /*if (!SystemConfig.getInstance().getString("system.admin.roleCode").equals(user.getRoleCode())) {
            params.put("orgCode", user.getOrgCode());
            params.put("roleCode", user.getRoleCode());
        }
        params.put("userCode", user.getUserCode());*/

        List<HouseInfoViewEntity> houseList=new ArrayList<HouseInfoViewEntity>();
		Long total;
		try {
			houseList = houseVerifiMapper.getHoueInfo(params);
			total = houseVerifiMapper.getHoueInfoCount(params);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new BusinessException("DATA_SEARCH_ERROR");
		}
        /*Set<HouseInfoViewEntity> ts = new HashSet<HouseInfoViewEntity>();
        ts.addAll(houseList);*/
        Map<Object, Object> map = new HashMap<Object, Object>();
        map.put("houseInfo", houseList);
        map.put("total", total);
        return map;
    }

    /**
     * list分组算法
     *
     * @param list
     * @return
     */
    public List<Map> listGroup(List<HouseInfoViewEntity> list) {
        Map<String, List<HouseInfoViewEntity>> groupMap = new HashMap();
        List<Map> resultList = new ArrayList<Map>();
        //遍历集合以c产权证号为键，以server为值保存到mapList中
        for (HouseInfoViewEntity houseInfoViewEntity : list) {
            List<HouseInfoViewEntity> tempList = groupMap.get(houseInfoViewEntity.getOwnershipNumber());
             /*如果取不到数据,那么直接new一个空的ArrayList**/
            if (null == tempList) {
                tempList = new ArrayList<HouseInfoViewEntity>();
                tempList.add(houseInfoViewEntity);
                groupMap.put(houseInfoViewEntity.getOwnershipNumber(), tempList);
            } else {
                tempList.add(houseInfoViewEntity);
            }

        }
        for (String key : groupMap.keySet()) {
            Map<Object, Object> map = new HashMap<Object, Object>();
            map.put("ownershipNumber", key);
            map.put("list", groupMap.get(key));
            resultList.add(map);

        }

        return resultList;
    }

    /**
     * 房产校验
     *
     * @param ownershipNumber 房产证号
     */
    public void isPro(@Request("ownershipNumber") String ownershipNumber, @Request("houseNumber") String houseNumber) {
        logger.info("房产校验参数：ownershipNumber={},houseNumber={}", ownershipNumber, houseNumber);
        Long count = houseVerifiMapper.isPro(ownershipNumber, houseNumber);
        if (count > 0) {
            throw new BusinessException("HOUSE_INFO_IS_EXIST");
        }
    }

    /**
     * 根据房产证号查询房子详细信息
     *
     * @param id 房产证号
     * @return
     */
    public Map getHouseInfo(@Request("id") String id) {
        logger.info("房产校验参数：" + id);
        if (StringUtil.isEmpty(id)) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
        //根据房产证号获取房子信息和申请人信息
        HouseInfoEntity houseInfo = houseVerifiMapper.getHouseInfoByNumber(id);
        ProposerInfoEntity proposerInfo = houseVerifiMapper.getProposeInfoByNumber(id);
        List<HousePropertyEntity> list = houseVerifiMapper.getPropertyInfoByNumber(id);
        Map map = new HashMap();
        map.put("applicantList", proposerInfo);
        map.put("houseInfoList", houseInfo);
        map.put("litigantList", list);
        return map;
    }

    /**
     * 房源验证结果
     *
     * @param houseNum
     * @return
     */
    public HouseNoticeEntity getHouNoticeReu(@Request("houseNum") String houseNum, @Request("type") String type) {
        logger.info("房产校验参数：" + houseNum);
        if (StringUtil.isEmpty(houseNum)) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
        HouseNoticeEntity result = houseVerifiMapper.getHouNoticeReu(houseNum, type);
        if (null != result) {
            if (Constants.no == result.getFreezeFlag() &&
                    Constants.no == result.getMortgageStatus() &&
                    Constants.no == result.getPreviewStatus() &&
                    Constants.no == result.getSequestrationStauts() &&
                    Constants.no == result.getSignStatus()) {
                result.setProStatus(Constants.yes);
            } else {
                result.setProStatus(Constants.no);
            }
        }

        return result;
    }

    /**
     * 房源验证结果通知信息更新
     *
     * @param houseInfo
     * @param request
     */
    public void updateProStatus(@Request("houseInfo") HouseInfoEntity houseInfo, HttpServletRequest request) {
        if (null == houseInfo || null == houseInfo.getProStatus() || StringUtil.isEmpty(houseInfo.getHouseNumber())) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
        logger.info("房源验证结果参数 : proStatus={},proCode={},houseNum={}", houseInfo.getProStatus(), houseInfo.getProCode(), houseInfo.getHouseNumber());
        UserEntity user = SessionUtils.getUser(request);
        houseInfo.setProUser(user.getUserCode());
        try {
            houseVerifiMapper.updateHouseProStatus(houseInfo);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessException("HOUSE_INFO_UPDATE_ERROR");

        }

    }

    public void houseAttSave(@Request("houseImage") String[] iamges, @Request("ownershipNumber") String ownershipNumber, HttpServletRequest request) {
        System.out.print(iamges);
    }

}
