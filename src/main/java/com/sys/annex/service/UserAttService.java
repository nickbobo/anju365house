package com.sys.annex.service;

import com.eshop.frame.SystemConfig;
import com.eshop.frame.annotation.Request;
import com.eshop.frame.exception.BusinessException;
import com.eshop.frame.lang.CodeGenerators;
import com.github.pagehelper.StringUtil;
import com.sys.annex.dao.UserAttMapper;
import com.sys.annex.entity.UserAttEntity;
import com.sys.authority.service.AuthorityService;
import com.sys.houseverifi.entity.HouseInfoEntity;
import com.sys.houseverifi.entity.HousePropertyEntity;
import com.sys.loan.dao.LoanInfoMapper;
import com.sys.loan.entity.LoanInfoEntity;
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
public class UserAttService {
    @Autowired
    private UserAttMapper userAttMapper;
    private static final Logger logger = LoggerFactory.getLogger(AuthorityService.class);

    /**
     * 图片信息上传
     *
     * @param data        图片数据
     * @param imgFilePath 路径
     * @param dataType    图片类型
     * @param userId      用户
     */
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, readOnly = false, rollbackFor = Exception.class)
    public void GenerateImage(String data[], String imgFilePath, int dataType, String userId) {
        if (data.length == 0) {
            throw new BusinessException("PARAMS_IS_NULL");
        }
        List<UserAttEntity> list = new ArrayList<UserAttEntity>();
        //图片解析
        BASE64Decoder decoder = new BASE64Decoder();
        for (int i = 0; i < data.length; i++) {
            try {
                String img = data[i].substring(data[i].indexOf(";base64,") + 8, data[i].length());
                byte[] b = decoder.decodeBuffer(img);
                for (int j = 0; j < b.length; ++j) {
                    if (b[j] < 0) {
                        b[j] += 256;
                    }
                }
                //生成序列ID
                String id = CodeGenerators.nextId() + "";
                String fileName = id + ".png";
                OutputStream out = new FileOutputStream(imgFilePath + "/" + fileName);
                out.write(b);
                out.flush();
                out.close();
                File file = new File(imgFilePath + "/" + fileName);
                if (file.exists()) {
                    UserAttEntity userAttEntity = new UserAttEntity();
                    userAttEntity.setId(id);
                    userAttEntity.setUserCode(userId);
                    userAttEntity.setAttName(getAttrName(dataType));
                    userAttEntity.setAttType(dataType);
                    userAttEntity.setFileType(1);
                    String url = SystemConfig.getInstance().getString("photo.save.url");
                    userAttEntity.setAttUrl(url + fileName);
                    list.add(userAttEntity);
                }
            } catch (Exception e) {
                throw new BusinessException("PHOTO_ANALYSIS_ERROR");
            }
        }
        try {
            userAttMapper.delAttInfo(userId, dataType);
            userAttMapper.addAttInfo(list);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            throw new BusinessException("PHOTO_SAVE_ERROR!");
        }


    }

    /**
     * 附件信息查询
     *
     * @param userCode
     * @param attType
     * @return
     */
    public List<UserAttEntity> getUserAttInfo(@Request("userCode") String userCode, @Request("attType") Integer attType) {
        return userAttMapper.getUserAttInfo(userCode, attType);


    }

    public String getAttrName(int type) {
        String attName = "";
        switch (type) {
            case Constants.maritalAttest:// 婚姻证明
                attName = "maritalAttest";
                break;
            case Constants.loanAttest:// 贷款证明
                attName = "loanAttest";
                break;
            case Constants.HT:// 合同
                attName = "contract";
                break;
            case Constants.YHK:// 银行卡
                attName = "bankCard";
                break;
            case Constants.YYZZ:// 营业执照
                attName = "license";
                break;
            case Constants.DPMM:// 店铺门头
                attName = "shop";
                break;
            case Constants.BRMG:// 本人免冠
                attName = "basePhoto";
                break;
            case Constants.QT:// 其他
                attName = "others";
                break;
        }
        return attName;
    }


}
