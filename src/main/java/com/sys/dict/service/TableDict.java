package com.sys.dict.service;

import com.eshop.frame.cache.CacheManager;
import com.eshop.frame.cache.CacheWholeLoader;
import com.eshop.frame.dict.Dict;
import com.eshop.frame.dict.DictElem;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.sys.dict.entity.DictGroupEntity;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Validate;
import org.apache.commons.lang3.tuple.Pair;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by tian on 2017/8/4.
 */
public class TableDict extends NormalDict {

    private String tableName;
    private String codeColumn;
    private String nameColumn;
    private String extColumnStr;
    private String filterCond;
    private String orderStr;

    private boolean isWholeSql = false;
    private boolean hasWhere = false;
    private String selectClause;
    private String whereClause;
    private String orderClause;
    private String[] extColumns;
    private String prefixSql;


    public TableDict(DictGroupEntity entity) {
        super(entity);
        init(entity.getTableName(), entity.getCodeColumn(), entity.getNameColumn(), entity.getExtColumns(), entity.getFilterCond(), entity.getOrderClause());
    }

    public TableDict(String tableName, String codeColumn, String nameColumn, String orderStr) {
        super(StringUtils.join(new String[]{Validate.notBlank(tableName), Validate.notBlank(codeColumn), Validate.notBlank(nameColumn)}, "|"),
                StringUtils.join(new String[]{tableName, codeColumn, nameColumn}, "|"), Dict.TYPE_CHAR, false);
        init(tableName, codeColumn, nameColumn, null, null, orderStr);
    }

    private void init(String tableName, String codeColumn, String nameColumn, String extColumnStr, String filterCond, String orderStr) {
        this.tableName = Validate.notBlank(tableName).toLowerCase();
        this.codeColumn = Validate.notBlank(codeColumn).toLowerCase();
        this.nameColumn = Validate.notBlank(nameColumn).toLowerCase();

        this.extColumnStr = extColumnStr;
        this.filterCond = filterCond;
        this.orderStr = orderStr;

        isWholeSql = tableName.trim().toLowerCase().startsWith("select ");
        Validate.isTrue(!isWholeSql || !tableName.contains(" order "), "whole sql can not has order caluse");
        selectClause = getSelectClause();
        whereClause = getWhereClause();
        orderClause = getOrderClause();
        extColumns = StringUtils.isNotBlank(extColumnStr) ? StringUtils.split(extColumnStr, ",") : new String[0];
        this.prefixSql = getPrefixSql();

        initCache();
    }

    @Override
    protected void initCache() {
        final boolean isTree = this.groupType == Dict.TYPE_TREE;
        final String[] treePCodeColumns = new String[]{"p_" + this.codeColumn, "p" + this.codeColumn, "p" + StringUtils.capitalize(this.codeColumn)};

        final Function<Map<String, String>, Pair<String, DictElem>> transformer = new Function<Map<String, String>, Pair<String, DictElem>>() {
            @Override
            public Pair<String, DictElem> apply(Map<String, String> map) {
                Map<String, String> newMap=new HashMap<String, String>();
                for(String key:map.keySet()){
                    newMap.put(key.toLowerCase(),map.get(key));
                }
                final String code = newMap.get(TableDict.this.codeColumn);
                final String name = newMap.get(TableDict.this.nameColumn);
                final Object[] extCols = new Object[extColumns.length];
                for (int i = 0; i < extColumns.length; i++) {
                    extCols[i] = newMap.get(extColumns[i]);
                }
                String pCode = null;
                if (isTree) {
                    for (String treePCodeColumn : treePCodeColumns) {
                        if (newMap.containsKey(treePCodeColumn)) {
                            pCode = newMap.get(treePCodeColumn);
                            break;
                        }
                    }
                }
                return Pair.of(code, new DictElem(code, name, pCode, extCols));
            }
        };
        if (StringUtils.isBlank(this.prefixSql) || "null".equalsIgnoreCase(this.prefixSql))
            return;

        final String selectOneSql = StringUtils.join(new String[]{this.prefixSql, hasWhere ? " and " : " where ", this.codeColumn, "="}, " ");
        final String selectListSql = this.prefixSql + orderClause;
        this.cache = CacheManager.getInstance().create(getCacheName(),
                getCacheBuilder(), new Function<String, DictElem>() {
                    @Override
                    public DictElem apply(String typeCode) {
                        final String sql = selectOneSql + "'" + typeCode + "'" + orderClause;
                        final List<Map<String, String>> list = dictTypeMapper.selectListBySQL(sql);
                        return list == null || list.size() == 0 ? null : transformer.apply(list.get(0)).getValue();
                    }
                }, new CacheWholeLoader<String, DictElem>() {
                    @Override
                    public List<Pair<String, DictElem>> load() {
                        final List<Map<String, String>> list = dictTypeMapper.selectListBySQL(selectListSql);
                        return Lists.transform(list, transformer);
                    }
                }, false, this.cacheAll);
    }

    @Override
    protected String[] getExtColumns() {
        return this.extColumns;
    }

    private String getSelectClause() {
        StringBuilder select = new StringBuilder();
        select.append("select ")
                .append(codeColumn)
                .append(",")
                .append(nameColumn);
        if (StringUtils.isNotBlank(extColumnStr)) {
            select.append(",").append(extColumnStr);
        }

        select.append(" from ").append(tableName).append(" ");
        return select.toString();
    }

    private String getWhereClause() {
        final StringBuilder sb = new StringBuilder();
        if (StringUtils.isNotBlank(filterCond)) {
            sb.append(filterCond.toLowerCase().startsWith("where") ? " " : " where ").append(filterCond);
            hasWhere = true;
        }
        return sb.toString();
    }

    private String getOrderClause() {
        StringBuilder sb = new StringBuilder();
        if (StringUtils.isNotBlank(this.orderStr)) {
            sb.append(orderStr.toLowerCase().startsWith("order ") ? " " : " order by ").append(orderStr);
        }
        return sb.toString();
    }

    private String getPrefixSql() {
        final StringBuilder sql = new StringBuilder();
        if (isWholeSql) {
            sql.append(tableName);
        } else {
            //根据各分支拼接
            sql.append(selectClause);
            sql.append(whereClause);
        }
        return sql.toString();
    }

    @Override
    boolean isMatch(DictElem dictElem, String condition) {
        if (!StringUtils.isNotBlank(condition)) {
            return true;
        }

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> map = null;
        try {
            map = objectMapper.readValue(condition, Map.class);
        } catch (IOException e) {
            //TODO:
        }
        for (int i = 0; i < extColumns.length; i++) {
            String extColumn = extColumns[i];
            if (map.containsKey(extColumn)) {
                final String condValue = map.get(extColumn);
                final String typeValue = dictElem.getExtValue(i);
                if (condValue == null || !condValue.equals(typeValue)) {
                    return false;
                }
            }
        }
        return true;
    }

    private String getSQL() {
        return getSQL(null);
    }

    private String getSQL(String condition) {
        final StringBuilder sql = new StringBuilder();
        if (isWholeSql) {
            sql.append(tableName);
        } else {
            //根据各分支拼接
            sql.append(selectClause);
            sql.append(whereClause);

            if (StringUtils.isNotBlank(condition)) {
                sql.append(hasWhere ? " and " : " where ").append(condition);
            }
            sql.append(orderClause);
        }
        return sql.toString();
    }

//    List<DictType> getTypes() {
//        return getTypes(null);
//    }
//
//    List<DictType> getTypes(String condition) {
//        final StringBuilder sql = new StringBuilder();
//        if (isWholeSql) {
//            sql.append(tableName);
//        } else {
//            //根据各分支拼接
//            sql.append(selectClause);
//            sql.append(whereClause);
//
//            if (StringUtils.isNotBlank(condition)) {
//                sql.append(hasWhere ? " and " : " where ").append(condition);
//            }
//            sql.append(orderClause);
//        }
//        final SystemService systemService = ApplicationContextUtil.getContext().getBean(
//                SystemService.class);
//        List<Map<String, Object>> list = systemService.findForJdbc(sql.toString());
//        final List<DictType> retList = new ArrayList<DictType>(list.size());
//        for (Map<String, Object> map : list) {
//            retList.add(transform(map));
//        }
//        return retList;
//    }


//    DictType getType(String typeCode) {
//        final StringBuilder sql = new StringBuilder();
//        if (isWholeSql) {
//            sql.append("select from (").append(tableName).append(") where _code").append(" = '").append(typeCode).append("'");
//        } else {
//            //根据各分支拼接
//            sql.append(selectClause);
//            sql.append(" where ").append(codeColumn).append(" = '").append(typeCode).append("'");
//
//        }
//        final SystemService systemService = ApplicationContextUtil.getContext().getBean(
//                SystemService.class);
//        List<Map<String, Object>> list = systemService.findForJdbc(sql.toString());
//        return list == null || list.size() == 0 ? null : transform(list.get(0));
//    }

//    public DictType apply(Map<String, String> map) {
//        final String code = (String) map.get("_code");
//
//    }

//    @Override
//    public Pair<String, DictType> apply(Map<String, String> map) {
//        final String key = map.get("_code");
//        final String name = (String) map.get("_name");
//        final String[] extValues = new String[extColumns.length];
//        for (int i = 0; i < extColumns.length; i++) {
//            String extColumn = extColumns[i];
//            extValues[i] = map.get(extColumn);
//        }
//        final DictType dictType = new DictType(key, name, extValues);
//        return Pair.of(key, dictType);
//    }

}
