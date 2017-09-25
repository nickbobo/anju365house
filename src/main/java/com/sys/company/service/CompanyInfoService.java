package com.sys.company.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.eshop.frame.annotation.Request;
import com.eshop.frame.exception.BusinessException;
import com.eshop.frame.lang.CodeGenerators;
import com.eshop.frame.web.SessionUtils;
import com.github.pagehelper.StringUtil;
import com.sys.company.dao.CompanyInfoMapper;
import com.sys.company.entity.CompanyInfoEntity;
import com.sys.user.entity.UserEntity;


/**
 * 经济公司管理
 *
 * @author tian
 */
@Service
public class CompanyInfoService {
	@Autowired
	private CompanyInfoMapper companyMapper;
	private static final Logger logger = LoggerFactory.getLogger(CompanyInfoService.class);
	
	/**
     * 经济公司信息添加
     *
     * @param menu
     */
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, readOnly = false, rollbackFor = Exception.class)
    public void addCompany(@Request("company")CompanyInfoEntity company, HttpServletRequest request){
    	if(null==company || (StringUtil.isEmpty(company.getOrgCode()) && StringUtil.isEmpty(company.getpOrgCode())) ){
    		throw new BusinessException("PARAMS_IS_NULL");
    	}
    	UserEntity user = SessionUtils.getUser(request);
		company.setCreateName( user.getUserCode());
    	
    	if(StringUtil.isEmpty(company.getId())){
    		this.companyCodeCount(company.getOrgCode());
    		company.setId(CodeGenerators.nextId() + "");
    		companyMapper.addCompany(company);
    		companyMapper.updateNumByPCode(company.getpOrgCode());
    	}else{
    		throw new BusinessException("COMPANY_INFO_ADD_ERROR");
    	}
    }
    
    
    /**
     * 经济公司信息更新
     *
     * @param menu
     */
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, readOnly = false, rollbackFor = Exception.class)
    public void updateCompany(@Request("company")CompanyInfoEntity company, HttpServletRequest request){
    	if(null==company || (StringUtil.isEmpty(company.getOrgCode()) && StringUtil.isEmpty(company.getpOrgCode())) ){
    		throw new BusinessException("PARAMS_IS_NULL");
    	}
    	if(company.getIsDel()==1){
			throw new BusinessException("COMPANY_INFO_IS_DEL");
		}
    	UserEntity user = SessionUtils.getUser(request);
		company.setCreateName( user.getUserCode());
		if(StringUtil.isNotEmpty(company.getId())){
			companyMapper.updateCompany(company);
		}else{
			throw new BusinessException("COMPANY_INFO_UPDATE_ERROR");
		}
    	
    }

    /**
     * 经济公司信息删除
     *
     * @param menuCode 菜单code
     */
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, readOnly = false, rollbackFor = Exception.class)
    public void deleteCompany(@Request("orgCode") String orgCode,HttpServletRequest request){
    	if(null==orgCode){
    		throw new BusinessException("PARAMS_IS_NULL");
    	}
    	this.companyPersonCheck(orgCode);
    	this.companyCodeCount(orgCode);
    	
    	UserEntity user = SessionUtils.getUser(request);
    	companyMapper.deleteCompany(orgCode,user.getUserCode());
    	
    }

    /**
     * 经济公司管理查询经济公司列表
     *
     * @param company
     * @return
     */
    public List<CompanyInfoEntity> getCompanyInfoPage(@Request("company")CompanyInfoEntity company, @Request("pageNum") Integer pageNum,
            @Request("pageSize") Integer pageSize){
    	if(null==company ){
    		throw new BusinessException("PARAMS_IS_NULL");
    	}
    	List<CompanyInfoEntity> companyList=companyMapper.getCompanyInfo(company);
    	return companyList;
    }
    
    
    /**
     * 经济公司管理查询经济公司列表
     *
     * @param company
     * @return
     */
    public List<CompanyInfoEntity> getCompanyForCode(@Request("company")CompanyInfoEntity company){
    	if(null==company ){
    		throw new BusinessException("PARAMS_IS_NULL");
    	}
    	List<CompanyInfoEntity> companyList=companyMapper.getCompanyForCode(company);
    	return companyList;
    }
    
    
    /**
     * 经济公司管理新增列表
     *
     * @param company
     * @return
     */
    public List<CompanyInfoEntity> getCompanyList(){
    	List<CompanyInfoEntity> companyList=companyMapper.getCompanyList();
    	return companyList;
    	
    }

    /**
     * 经济公司管理查询详情树形结构图
     *
     * @param company
     */
    public List<CompanyInfoEntity> getCompanyForList(CompanyInfoEntity company){
    	List<CompanyInfoEntity> companyList=companyMapper.getCompanyForList(company);
    	return companyList;
    	
    }
    
    
    
    /**
     * 经济公司添加check
     *
     * @param orgCode
     * @return
     */
    public void companyCodeCount(@Param("orgCode") String orgCode){
    	Long count=companyMapper.companyCodeCount(orgCode);
    	if(count>0){
    		throw new BusinessException("ORG_CODE_IS_EXIST");
    	}
    	
    }
    
    
    /**
     * 查询该公司下是否拥有用户
     * @param orgCode
     * @return
     */
    public void companyPersonCheck(@Param("orgCode") String orgCode){
    	Long count=companyMapper.companyPersonCheck(orgCode);
    	if(count>0){
    		throw new BusinessException("COMPANY_USER_IS_EXIST");
    	}
    	
    }
    /*public static void main(String[] args) {
    	
    	for(int i =0;i<10;i++){
    		String a=CodeGenerators.nextId()+"";
    		System.err.println(a);
    	}
		
	}*/
    
	

}
