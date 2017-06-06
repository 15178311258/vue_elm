/**
 * 解析url参数
 * @example ?id=12345&a=fgh
 * @return Object {id:12345,a:fgh}
 */
// export function urlParse() {
//     let url = window.location.search;
//     let obj = {};
//     // let reg = /[?&][^?&]+=[^?&]]+/g;这个正则好像不对
//     let reg = /(\w+)=(\w+)/ig;
//     let arr = url.match(reg);
//     //arr =["?id=12345","&a=fgh"]
//     if (arr) {
//         arr.forEach((item) => {
//             let tempArr = item.substring(1).split("=");
//             let key = decodeURIComponent(tempArr[0]);
//             let val = decodeURIComponent(tempArr[1]);
//             obj[key] = val;
//         });
//     }
//     return obj;
// };
export function urlParse() {
    let url = window.location.search;
    var obj = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            obj[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return obj;
};