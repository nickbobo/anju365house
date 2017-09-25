package com.sys.dict.service;

import com.eshop.frame.cache.Cache;
import com.eshop.frame.cache.CacheManager;
import com.eshop.frame.dict.AbstractDictService;
import com.eshop.frame.dict.Dict;
import com.eshop.frame.lang.Langs;
import com.google.common.base.Function;
import com.google.common.cache.CacheBuilder;
import com.sys.dict.dao.DictGroupMapper;
import com.sys.dict.dao.DictTypeMapper;
import com.sys.dict.entity.DictGroupEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by tian on 2017/8/4.
 */
@Service("dictService")
public class DictService extends AbstractDictService {


    private final static String KEY_DICT_GROUP = "dictGroupCache";

    @Autowired
    private DictGroupMapper dictGroupMapper;
    @Autowired
    private DictTypeMapper dictTypeMapper;
//    @Autowired
//    private RegionMapper regionMapper;

    //存放字典组信息
    final Cache<String, Dict> dictCache = CacheManager.getInstance().create(KEY_DICT_GROUP,
            CacheBuilder.newBuilder(), new Function<String, Dict>() {
                @Override
                public NormalDict apply(String groupCode) {
                    if (groupCode.contains(",")) {
                        final String[] strings = groupCode.split(",");
                        return new TableDict(strings[0], strings[1], strings[2], strings.length >= 4 ? strings[3] : null);
                    } else {
                        final DictGroupEntity dictGroup = dictGroupMapper.selectByGroupCode(groupCode);
                        if (dictGroup == null)
                            return null;
                        final int type = Langs.toInt(dictGroup.getDictType(), 1);
                        return type == 1 ? new NormalDict(dictGroup) : new TableDict(dictGroup);
                    }
                }
            });

//    //存放不可缓存的字典中文翻译信息
//    final Cache<NameDictKey, String> nameCache = CacheManager.getInstance().createCache(KEY_DICT_NAME,
//            CacheBuilder.newBuilder().maximumSize(1000000), new Creator<NameDictKey, String>() {
//                @Override
//                public String create(NameDictKey key) {
//                    final String groupCode = key.getGroupCode();
//                    final DictGroup dictGroup = dictCache.get(groupCode);
//                    final DictType type = dictGroup.getType(key.getTypeCode());
//                    return type == null ? BLANK_STRING : type.getName();
//                }
//            }, true);


    public Dict getDict(String dictCode) {
        return dictCache.get(dictCode);
    }


//    public DictGroupEntity[] select() {
//        final List<DictGroupEntity> entities = dictGroupMapper.selectAll();
//        final DictGroupEntity[] dictGroupEntities = entities.toArray(new DictGroupEntity[entities.size()]);
//        Transformers.transform(DictGroupEntity.class, dictGroupEntities, "isDel", "YesNo");
//        return dictGroupEntities;
////        return (List<DictGroupEntity>) dictGroupEntities;
//    }
/*    public Pair<String, String> getProvAndCityByPhoneCode(String phoneZone) {
        final Dict dict = getDict("Phone2Region");
        final String regionCode = dict.getValue(phoneZone);

        return Pair.of(regionCode.substring(0, 2), regionCode);
    }



    private Map<String, DictType> getDictTypes(NormalDict dictGroup) {
        final Map<String, DictType> map = Maps.newHashMap();
        if (dictGroup instanceof TableDict) {
            final String sql = ((TableDict) dictGroup).getSQL();
            final List<Map<String, String>> list = dictTypeMapper.selectListBySQL(sql);

//            Iterators.transform(list.iterator(), dictGroup);
        } else {
            final List<DictTypeEntity> list = dictTypeMapper.selectByGroup(((NormalDict) dictGroup).getKey());
            final Iterator<Pair<String, DictType>> transform = Iterators.transform(list.iterator(), dictGroup);
//            Lists.transform()
        }

//                    List<DictType> types = dictGroup.getTypes();
//                    Map<String, DictType> map = new LinkedHashMap<String, DictType>();
//                    if (types != null) {
//                        for (DictType type : types) {
//                            map.put(type.getKey().toLowerCase(), type);
//                        }
//                    }
        return map;
    }
    public void test() {
        final HashMap<String, String> map = Maps.newHashMap();
        map.put("sql", "select id,user_code from t_charge_user");
        final List<Map> maps = dictTypeMapper.selectBySQL(map);
        System.out.println(maps);
    }*/


}
