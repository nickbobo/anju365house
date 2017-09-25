package com.sys.dict.service;

import com.eshop.frame.cache.Cache;
import com.eshop.frame.dict.Dict;
import com.eshop.frame.dict.DictElem;
import com.eshop.frame.lang.Langs;
import com.eshop.frame.spring.SpringContextHolder;
import com.sys.dict.dao.DictTypeMapper;
import com.sys.dict.entity.DictGroupEntity;
import com.eshop.frame.SystemConfig;
import com.eshop.frame.cache.CacheManager;
import com.eshop.frame.cache.CacheWholeLoader;

import com.google.common.base.Function;
import com.google.common.base.Predicate;
import com.google.common.base.Splitter;
import com.google.common.cache.CacheBuilder;
import com.google.common.collect.Collections2;
import com.google.common.collect.ComparisonChain;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.sys.dict.entity.DictTypeEntity;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Validate;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.commons.lang3.tuple.Pair;

import java.util.*;

/**
 * Created by tian on 2017/8/4.
 */
public class NormalDict implements Dict {

    private final String code;
    private final String name;
    protected final boolean cacheAll;
    protected int groupType;
    protected Cache<String, DictElem> cache;

    protected DictTypeMapper dictTypeMapper = SpringContextHolder.getBean(DictTypeMapper.class);

    public NormalDict(DictGroupEntity entity) {
        this(entity.getGroupCode(), entity.getGroupName(), entity.getGroupType()
                , entity != null && (Langs.toInt(entity.getDictType(), 1) == 1 || Langs.isTrue(entity.getIsCache())));
    }

    public NormalDict(String code, String name, int groupType, boolean cacheAll) {
        this.code = code;
        this.name = name;
        this.groupType = groupType;
        this.cacheAll = cacheAll;

        initCache();
    }

    protected void initCache() {
        final Function<DictTypeEntity, Pair<String, DictElem>> transformer = new Function<DictTypeEntity, Pair<String, DictElem>>() {
            @Override
            public Pair<String, DictElem> apply(DictTypeEntity typeEntity) {
                final DictElem dictElem = new DictElem(typeEntity.getCode(), typeEntity.getName(), typeEntity.getPCode(), Langs.toInt(typeEntity.getSortNo(), Integer.MAX_VALUE), new Object[]{typeEntity.getFlag()});
                return Pair.of(dictElem.getKey(), dictElem);
            }
        };
        this.cache = CacheManager.getInstance().create(getCacheName(),
                getCacheBuilder(), new Function<String, DictElem>() {
                    @Override
                    public DictElem apply(String typeCode) {
                        final DictTypeEntity typeEntity = dictTypeMapper.selectByCode(NormalDict.this.code, typeCode);
                        return transformer.apply(typeEntity).getValue();
                    }
                }, new CacheWholeLoader<String, DictElem>() {
                    @Override
                    public List<Pair<String, DictElem>> load() {
                        final List<DictTypeEntity> typeEntities = dictTypeMapper.selectByGroup(NormalDict.this.code);
                        return Lists.transform(typeEntities, transformer);
                    }
                }, false, cacheAll);
    }

    protected String getCacheName() {
        return "dict_Elem_Cache" + "_" + this.code;
    }

    protected CacheBuilder getCacheBuilder() {
        final CacheBuilder<Object, Object> builder = CacheBuilder.newBuilder();
        if (!cacheAll)
            builder.maximumSize(SystemConfig.getInstance().getLong("system.cache.dict.maximumSize", 1000L));
        return builder;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }


    boolean isMatch(DictElem dictElem, String condition) {
        if (StringUtils.isNotBlank(condition) && dictElem != null && condition.equals(dictElem.getExtValue(0))) {
            return true;
        }
        return false;
    }

    @Override
    public String getValue(String key) {
        return getValue(key, key);
    }


    @Override
    public String reverse(String value) {
        Validate.notBlank(value);
        final Map<String, DictElem> elemMap = cache.loadAndGet();
        if (elemMap != null || elemMap.size() >= 1) {
            for (Map.Entry<String, DictElem> entry : elemMap.entrySet()) {
                if (value.equals(entry.getValue().getValue())) {
                    return entry.getKey();
                }
            }
            return null;
        }
        return null;
    }

    @Override
    public String[] getValues(String[] keys) {
        if (keys == null || keys.length == 0) {
            return new String[0];
        }
        String[] values = new String[keys.length];
        for (int i = 0, n = keys.length; i < n; i++) {
            values[i] = getValue(keys[i]);
        }
        return values;
    }

    @Override
    public String[] reverses(String[] values) {
        if (values == null || values.length == 0) {
            return new String[0];
        }
        String[] keys = new String[values.length];
        for (int i = 0, n = values.length; i < n; i++) {
            keys[i] = reverse(values[i]);
        }
        return keys;
    }

    @Override
    public String getValue(String key, String defaultValue) {
        try {
            return cache.get(key).getValue();
        } catch (Exception ex) {
            return defaultValue;
        }
    }

    @Override
    public DictElem getDictELem(String key) {
        try {
            return cache.get(key);
        } catch (Exception ex) {
        }
        return null;
    }

    @Override
    public List<DictElem> getDictElems() {
        final Map<String, DictElem> elemMap = cache.loadAndGet();
        final List<DictElem> dictElems = Lists.newArrayList(elemMap.values());

        Collections.sort(dictElems,
                this.groupType == Dict.TYPE_NUM || this.groupType == Dict.TYPE_BIT ?
                        NumberComparator : StringComparator);
        return dictElems;
    }

    @Override
    public Map<String, String> getDictMap() {
        final Map<String, DictElem> elemMap = cache.loadAndGet();
        return Maps.transformValues(elemMap, new Function<DictElem, String>() {
            @Override
            public String apply(DictElem dictElem) {
                return dictElem.getValue();
            }
        });
    }

    protected String[] getExtColumns() {
        return new String[]{};
    }

    @Override
    public List<DictElem> filter(String filterStr) {
        final Map<String, String> map = Splitter.on("&").withKeyValueSeparator("=").split(filterStr);
        final boolean hasKey = map.containsKey(DictElem.KEY_KEY);
        final boolean hasValue = map.containsKey(DictElem.KEY_VALUE);
        final String key = !hasKey ? null : map.get(DictElem.KEY_KEY);
        final String value = !hasValue ? null : map.get(DictElem.KEY_VALUE);
        final String[] extColumns = getExtColumns();
        final String[] extValues = extColumns == null ? new String[0] : new String[extColumns.length];
        if (extColumns != null && extColumns.length >= 1) {
            for (int i = 0; i < extColumns.length; i++) {
                extValues[i] = map.get(extColumns[i]);
            }
        }
        return this.cache.find(
                new Predicate<DictElem>() {
                    @Override
                    public boolean apply(DictElem dictElem) {
                        if (dictElem == null) return false;
                        if (hasKey && !key.equals(dictElem.getKey())) return false;
                        if (hasValue && !value.equals(dictElem.getValue())) return false;
                        for (int i = 0; i < extValues.length; i++) {
                            final String extValue = extValues[i];
                            if (StringUtils.isNotBlank(extValue) && !extValue.equals(dictElem.getExtValue(i)))
                                return false;
                        }
                        return true;
                    }
                }
        );
    }

    @Override
    public List<DictElem> filter(Predicate<DictElem> predicate) {
        return null;
    }

    @Override
    public List<DictElem> getTreeElems() {
        return getTreeElems(null);
    }

    @Override
    public List<DictElem> getTreeElems(String parentValue) {
        Validate.isTrue(groupType == Dict.TYPE_TREE, "字典%s[%s]非树形字典", this.name, this.code);
        final String _parentValue = StringUtils.trimToEmpty(parentValue);
        final Collection<DictElem> dictElems = Collections2.filter(cache.loadAndGet().values(), new Predicate<DictElem>() {
            @Override
            public boolean apply(DictElem dictElem) {
                return _parentValue.equals(StringUtils.trimToEmpty(dictElem.getPKey()));
            }
        });

        return new ArrayList<DictElem>(dictElems);
    }

    private static final Comparator NumberComparator = new Comparator<DictElem>() {
        @Override
        public int compare(DictElem o1, DictElem o2) {
            return ComparisonChain.start()
                    .compare(o1.getSortNo(), o2.getSortNo())
                    .compare(NumberUtils.toInt(o1.getKey(), Integer.MIN_VALUE), NumberUtils.toInt(o2.getKey(), Integer.MIN_VALUE))
                    .compare(o1.getKey(), o2.getKey())
                    .result();
        }
    };


    private static final Comparator StringComparator = new Comparator<DictElem>() {
        @Override
        public int compare(DictElem o1, DictElem o2) {
            return ComparisonChain.start()
                    .compare(o1.getSortNo(), o2.getSortNo())
                    .compare(o1.getKey(), o2.getKey())
                    .result();
        }
    };

    public static void main(String[] args) {
        System.out.printf("字典s% s%非树形字典", "AAA", "bbb");
    }

}
