package com.sys.loan.service;

import com.eshop.frame.SystemConfig;
import com.eshop.frame.annotation.Request;
import com.eshop.frame.exception.BusinessException;
import com.eshop.frame.lang.CodeGenerators;
import com.eshop.frame.web.SessionUtils;
import com.github.pagehelper.StringUtil;
import com.sys.annex.service.UserAttService;
import com.sys.authority.service.AuthorityService;
import com.sys.houseverifi.entity.HouseInfoEntity;
import com.sys.houseverifi.entity.HousePropertyEntity;
import com.sys.loan.dao.LoanInfoMapper;
import com.sys.loan.entity.LoanInfoEntity;
import com.sys.user.entity.UserEntity;
import com.sys.utils.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 贷款预处理
 *
 * @author tian
 */
@Service
public class LoanInfoService {
    @Autowired
    private LoanInfoMapper loanInfoMapper;
    @Autowired
    private UserAttService userAttService;
    private static final Logger logger = LoggerFactory.getLogger(AuthorityService.class);

    /**
     * 贷款预处理信息添加
     *
     * @param loanInfo 贷款信息
     */
    public void addLoanInfo(@Request("loanInfo") LoanInfoEntity loanInfo, @Request("loanCode") String loanCode, HttpServletRequest request) {
        if (null == loanInfo || StringUtil.isEmpty(loanCode)) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
        UserEntity user = SessionUtils.getUser(request);
        loanInfo.setRoleCode(user.getRoleCode());
        loanInfo.setOrgCode(user.getOrgCode());
        try {
            loanInfoMapper.addLoanInfo(loanInfo);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessException("LOAN_INFO_ADD_ERROR");
        }

    }

    /**
     * 贷款信息查询列表
     *
     * @param loanInfo
     * @return
     */
    public List<LoanInfoEntity> getLoanInfoPage(@Request("loanInfo") LoanInfoEntity loanInfo) {
        List<LoanInfoEntity> list = loanInfoMapper.getLoanInfo(loanInfo);
        return list;
    }

    /**
     * 根据房源验证编号查询房子信息
     *
     * @param proCode 房源验证码
     * @return
     */
    public Map getHouseInfoByProCode(@Request("proCode") String proCode) {
        logger.info("（贷款验证）根据房源验证编号查询房子信息参数：" + proCode);
        if (StringUtil.isEmpty(proCode)) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
        HouseInfoEntity houseInfo = loanInfoMapper.getHouseInfoByProCode(proCode);
        if (null == houseInfo) {
            return null;
        }
        List<HousePropertyEntity> list = loanInfoMapper.getPropertyByproCode(proCode);
        Map map = new HashMap();
        map.put("houseInfo", houseInfo);
        map.put("propertyInfo", list);
        return map;
    }

    /**
     * 贷款证明材料上传
     *
     * @param attest     婚姻证明
     * @param loanAttest 贷款证明
     * @param loanCode   贷款单号
     * @param request
     */
    public String loanSaveOrUpdate(@Request("maritalAttest") String[] attest, @Request("loanAttest") String[] loanAttest, @Request("loanCode") String loanCode, HttpServletRequest request) {
        String path = request.getSession().getServletContext().getRealPath("") + File.separator + "tempPhoto";
        /**
         * 单款单号为空则新增
         */
        if (StringUtil.isEmpty(loanCode)) {
            //生成时间戳作为贷款单号
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSS");
            loanCode = sdf.format(date);
            userAttService.GenerateImage(attest, path, Constants.maritalAttest, loanCode);
            userAttService.GenerateImage(loanAttest, path, Constants.loanAttest, loanCode);
            return loanCode;
        } else {
            if (attest.length != 0) {
                userAttService.GenerateImage(attest, path, Constants.maritalAttest, loanCode);
                return null;
            } else if (loanAttest.length != 0) {
                userAttService.GenerateImage(loanAttest, path, Constants.loanAttest, loanCode);
                return null;
            } else {
                throw new BusinessException("PARAMS_IS_NULL");

            }
        }


    }


}
