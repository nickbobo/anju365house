package com.sys.annex.dao;

import com.eshop.frame.base.dao.BaseMapper;
import com.sys.annex.entity.UserAttEntity;
import com.sys.houseverifi.entity.HouseInfoEntity;
import com.sys.houseverifi.entity.HousePropertyEntity;
import com.sys.loan.entity.LoanInfoEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface UserAttMapper extends BaseMapper<UserAttEntity> {
    /**
     * 图片信息录入
     *
     * @param userAtt
     */
    public void addAttInfo(List<UserAttEntity> userAtt);

    /**
     * 图片信息删除
     *
     * @param loanCode 贷款单号
     * @param attType  附件类型
     */
    public void delAttInfo(@Param("userCode") String loanCode, @Param("attType") Integer attType);

    /**
     * 附件信息查询
     *
     * @param userCode
     * @param attType
     * @return
     */
    public List<UserAttEntity> getUserAttInfo(@Param("userCode") String userCode, @Param("attType") Integer attType);

}
