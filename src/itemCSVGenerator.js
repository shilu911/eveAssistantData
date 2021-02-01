const CONSTANTS = require('./constants');

const CATEGORY = CONSTANTS.CATEGORY;
const SIZE = CONSTANTS.SIZE;
const SUB_CATEGORY = CONSTANTS.SUB_CATEGORY;

const parse = require('csv-parse/lib/sync');
const assert = require('assert');
const fs = require('fs');

const text = require('../data/text.json');
const textMap = {};



text.forEach(item => textMap[item.en] = item.zh);
const result = {};
try {
  const data = fs.readFileSync('../data/stats.csv', 'utf8');
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true
  });
  records.forEach(record => {
    if (textMap[record.name]) {
      record.name_zh = textMap[record.name];
    }

    const data = {
      name_en: record.name,
      name_zh: textMap[record.name],
    }

    if (record.item_id.startsWith("41000000")) {
      // 矿物
      data.category = CATEGORY.MANUFACTURING_MATERIAL;
      data.subCategory = SUB_CATEGORY.MINERAL;
    } else if (record.item_id.startsWith("51000000")) {
      // 矿石
      data.category = CATEGORY.MANUFACTURING_MATERIAL;
      data.subCategory = SUB_CATEGORY.RAW_ORE;
    } else if (record.item_id.startsWith("101")) {
      // 护卫
      data.category = CATEGORY.SHIP;
      data.subCategory = SUB_CATEGORY.FRIGATE;
    } else if (record.item_id.startsWith("102")) {
      // 驱逐
      data.category = CATEGORY.SHIP;
      data.subCategory = SUB_CATEGORY.DESTROYER;
    } else if (record.item_id.startsWith("103")) {
      // 巡洋舰
      data.category = CATEGORY.SHIP;
      data.subCategory = SUB_CATEGORY.CRUISER;
    } else if (record.item_id.startsWith("104")) {
      // 战列巡洋舰
      data.category = CATEGORY.SHIP;
      data.subCategory = SUB_CATEGORY.BATTLECRUISER;
    } else if (record.item_id.startsWith("105")) {
      // 战列舰
      data.category = CATEGORY.SHIP;
      data.subCategory = SUB_CATEGORY.BATTLESHIP;
    } else if (record.item_id.startsWith("106")) {
      // 工业舰
      data.category = CATEGORY.SHIP;
      data.subCategory = SUB_CATEGORY.INDUSTRIAL_SHIP;
    } else if (record.item_id.startsWith("1100002") || record.item_id.startsWith("1100052")) {
      // 小磁轨炮
      data.category = CATEGORY.HIGH_SLOTS_MAIN_WEAPON;
      data.subCategory = SUB_CATEGORY.RAILGUN;
      data.size = SIZE.SMALL;
    } else if (record.item_id.startsWith("1100012") || record.item_id.startsWith("1100062")) {
      // 中磁轨炮
      data.category = CATEGORY.HIGH_SLOTS_MAIN_WEAPON;
      data.subCategory = SUB_CATEGORY.RAILGUN;
      data.size = SIZE.MEDIUM;
    }  else if (record.item_id.startsWith("1100022") || record.item_id.startsWith("1100072")) {
      // 大磁轨炮
      data.category = CATEGORY.HIGH_SLOTS_MAIN_WEAPON;
      data.subCategory = SUB_CATEGORY.RAILGUN;
      data.size = SIZE.LARGE;
    } else if (record.item_id.startsWith("1100211") || record.item_id.startsWith("1100251")) {
      // 小激光炮
      data.category = CATEGORY.HIGH_SLOTS_MAIN_WEAPON;
      data.subCategory = SUB_CATEGORY.LASER;
      data.size = SIZE.SMALL;
    } else if (record.item_id.startsWith("1100222") || record.item_id.startsWith("1100260")) {
      // 中激光炮
      data.category = CATEGORY.HIGH_SLOTS_MAIN_WEAPON;
      data.subCategory = SUB_CATEGORY.LASER;
      data.size = SIZE.MEDIUM;
    }  else if (record.item_id.startsWith("1100231") || record.item_id.startsWith("1100271")) {
      // 大激光炮
      data.category = CATEGORY.HIGH_SLOTS_MAIN_WEAPON;
      data.subCategory = SUB_CATEGORY.LASER;
      data.size = SIZE.LARGE;
    } else if (record.item_id.startsWith("1100412") || record.item_id.startsWith("1100451")) {
      // 小加农炮
      data.category = CATEGORY.HIGH_SLOTS_MAIN_WEAPON;
      data.subCategory = SUB_CATEGORY.CANNON;
      data.size = SIZE.SMALL;
    } else if (record.item_id.startsWith("1100422") || record.item_id.startsWith("1100461")) {
      // 中加农炮
      data.category = CATEGORY.HIGH_SLOTS_MAIN_WEAPON;
      data.subCategory = SUB_CATEGORY.CANNON;
      data.size = SIZE.MEDIUM;
    }  else if (record.item_id.startsWith("1100432") || record.item_id.startsWith("1100471")) {
      // 大加农炮
      data.category = CATEGORY.HIGH_SLOTS_MAIN_WEAPON;
      data.subCategory = SUB_CATEGORY.CANNON;
      data.size = SIZE.LARGE;
    } else if (record.item_id.startsWith("1100500")) {
      // 小裂解炮
      data.category = CATEGORY.HIGH_SLOTS_MAIN_WEAPON;
      data.subCategory = SUB_CATEGORY.DECOMPOSER;
      data.size = SIZE.SMALL;
    } else if (record.item_id.startsWith("1100505")) {
      // 中裂解炮
      data.category = CATEGORY.HIGH_SLOTS_MAIN_WEAPON;
      data.subCategory = SUB_CATEGORY.DECOMPOSER;
      data.size = SIZE.MEDIUM;
    } else if (record.item_id.startsWith("1101200") || record.item_id.startsWith("1101900")) {
      // 小导弹发射器
      data.category = CATEGORY.HIGH_SLOTS_MAIN_WEAPON;
      data.subCategory = SUB_CATEGORY.MISSILE_LAUNCHER;
      data.size = SIZE.SMALL;
    } else if (record.item_id.startsWith("1101300") || record.item_id.startsWith("1101500") || record.item_id.startsWith("1101700")) {
      // 中导弹发射器
      data.category = CATEGORY.HIGH_SLOTS_MAIN_WEAPON;
      data.subCategory = SUB_CATEGORY.MISSILE_LAUNCHER;
      data.size = SIZE.MEDIUM;
    }  else if (record.item_id.startsWith("1101400") || record.item_id.startsWith("1101600") || record.item_id.startsWith("110200")) {
      // 大导弹发射器
      data.category = CATEGORY.HIGH_SLOTS_MAIN_WEAPON;
      data.subCategory = SUB_CATEGORY.MISSILE_LAUNCHER;
      data.size = SIZE.LARGE;
    }
    result[record.item_id] = data;
  });
  console.log(result)
  fs.writeFile('../data/items.json', JSON.stringify(result), 'utf8', () =>{});
} catch (err) {
  console.error(err);
}

