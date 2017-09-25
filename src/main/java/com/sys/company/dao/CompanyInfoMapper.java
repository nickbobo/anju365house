package com.sys.company.dao;

import com.eshop.frame.base.dao.BaseMapper;
import com.sys.company.entity.CompanyInfoEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface CompanyInfoMapper extends BaseMapper<CompanyInfoEntity> {


    /**
     * 经济公司信息添加
     *
     * @param menu
     */
    public void addCompany(CompanyInfoEntity menu);

    /**
     * 经济公司信息更新
     *
     * @param menu
     */
    public void updateCompany(CompanyInfoEntity menu);

    /**
     * 经济公司信息删除
     *
     * @param menuCode 菜单code
     */
    public void deleteCompany(@Param("orgCode") String orgCode,@Param("createName") String createName);

    /**
     * 经济公司管理查询经济公司列表
     *
     * @param company
     * @return
     */
    public List<CompanyInfoEntity> getCompanyInfo(CompanyInfoEntity company);
    
    
    /**
     * 经济公司管理新增列表
     *
     * @param company
     * @return
     */
    public List<CompanyInfoEntity> getCompanyList();
    
    /**
     * 经济公司管理查询详情
     *
     * @param company
     * @return
     */
    public List<CompanyInfoEntity> getCompanyForCode(CompanyInfoEntity company);
    
    
    /**
     * 经济公司管理查询详情树形结构图
     *
     * @param company
     */
    public List<CompanyInfoEntity> getCompanyForList(CompanyInfoEntity company);
    
   

    /**
     * 经济公司添加check
     *
     * @param orgCode
     * @return
     */
    public Long companyCodeCount(@Param("orgCode") String orgCode);
    
    /**
     * 查询该公司下是否拥有用户
     * @param orgCode
     * @return
     */
    public Long companyPersonCheck(@Param("orgCode") String orgCode);
    
    
    /**
     * 根据父级code更新子级菜单个数
     *
     * @param parentCode
     */
    public void updateNumByPCode(@Param("pOrgCode") String pOrgCode);
   
    
    
    
}
