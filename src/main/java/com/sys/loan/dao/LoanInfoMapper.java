package com.sys.loan.dao;

import com.eshop.frame.base.dao.BaseMapper;
import com.sys.houseverifi.entity.HouseInfoEntity;
import com.sys.houseverifi.entity.HouseInfoViewEntity;
import com.sys.houseverifi.entity.HousePropertyEntity;
import com.sys.loan.entity.LoanInfoEntity;
import com.sys.menu.entity.MenuEntity;
import com.sys.menu.entity.MenuViewEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface LoanInfoMapper extends BaseMapper<LoanInfoEntity> {
    /**
     * 贷款预处理信息录入
     *
     * @param loanInfo
     */
    public void addLoanInfo(LoanInfoEntity loanInfo);

    /**
     * 根据贷款单号更新贷款状态
     *
     * @param loanCode        贷款单号
     * @param applicantStatus 审批状态
     */
    public void updateLoanInfo(@Param("loanCode") String loanCode, @Param("applicantStatus") String applicantStatus);

    /**
     * 贷款信息查询
     *
     * @param loanInfo
     * @return
     */
    public List<LoanInfoEntity> getLoanInfo(LoanInfoEntity loanInfo);

    /**
     * 根据房源验证码查询房子信息
     *
     * @param proCode
     * @return
     */
    public HouseInfoEntity getHouseInfoByProCode(@Param("proCode") String proCode);

    /**
     * 根据房源验证码查询产权人信息
     *
     * @param proCode
     * @return
     */
    public List<HousePropertyEntity> getPropertyByproCode(@Param("proCode") String proCode);

}
