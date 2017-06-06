/**
 * 数据存储：localstorage
 */
export function savaToLocal(id, key, value) { //存储数据
    let seller = window.localStorage.__seller__;
    if (!seller) { //没有这个seller对象
        seller = {};
        seller[id] = {};
    } else { //已有seller对象，判断有无id的子对象
        seller = JSON.parse(seller);
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    window.localStorage.__seller__ = JSON.stringify(seller);
}
export function loadFromlLocal(id, key, def) { //读取数据 def:读取不到时默认变量
    let seller = window.localStorage.__seller__;
    if (!seller) {
        return def;
    }
    seller = JSON.parse(seller)[id];
    if (!seller) { //判断seller[id]
        return def;
    }
    let ret = seller[key];
    return ret || def;
}