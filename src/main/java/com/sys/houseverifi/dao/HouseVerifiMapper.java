package com.sys.houseverifi.dao;

import java.util.List;
import java.util.Map;

import com.sys.houseverifi.entity.*;

import com.eshop.frame.base.dao.BaseMapper;
import org.apache.ibatis.annotations.Param;


public interface HouseVerifiMapper extends BaseMapper<HouseInfoViewEntity> {
    /**
     * 房屋信息添加
     *
     * @param houseInfo
     */
    public void addHouseInfo(HouseInfoEntity houseInfo);

    /**
     * 房屋信息更新
     *
     * @param houseInfo
     */
    public void updateHouseInfo(HouseInfoEntity houseInfo);

    /**
     * 申请人信息添加
     *
     * @param proposerInfo
     */
    public void addProposerInfo(ProposerInfoEntity proposerInfo);

    /**
     * 产权人信息添加
     *
     * @param list
     */
    public void addHousePropertyInfo(List<HousePropertyEntity> list);

    /**
     * 获取房源信息列表
     *
     * @param maps
     * @return
     */
    public List<HouseInfoViewEntity> getHoueInfo(Map<String, Object> maps);

    /**
     * 获取房子产权人信息
     *
     * @param maps
     * @return
     */
    public List<HouseInfoViewEntity> getPropertyInfo(Map<String, Object> maps);

    /**
     * 获得房源验证信息总数
     *
     * @param maps
     * @return
     */
    public Long getHoueInfoCount(Map<String, Object> maps);

    /**
     * 房产信息录入校验
     *
     * @param ownershipNumber 房产证号
     * @return
     */
    public Long isPro(@Param("ownershipNumber") String ownershipNumber,@Param("houseNumber") String houseNumber);

    /**
     * 根据房产证号查询产权人信息
     *
     * @param id
     * @return
     */
    public List<HousePropertyEntity> getPropertyInfoByNumber(@Param("id") String id);

    /**
     * 根据房产证号查询房子信息
     *
     * @param id
     * @return
     */
    public HouseInfoEntity getHouseInfoByNumber(@Param("id") String id);

    /**
     * 根据房产证号查询申请人信息
     *
     * @param id
     * @return
     */
    public ProposerInfoEntity getProposeInfoByNumber(@Param("id") String id);

    /**
     * 根据房产证号查询房子验证结果
     *
     * @param houseNum
     * @return
     */
    public HouseNoticeEntity getHouNoticeReu(@Param("houseNum") String houseNum,@Param("type") String type);

    /**
     *
     * @param houseInfo
     */
    public void updateHouseProStatus(HouseInfoEntity houseInfo);
    
    public List<HousePropertyEntity> getProperty(@Param("ownershipNumber") String ownershipNumber);

}
