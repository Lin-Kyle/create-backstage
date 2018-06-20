/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

// 检测是否URL
function isUrl(path) {
    return reg.test(path);
}

// 格式化菜单
function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let {path} = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            // 是否有访问权限
            authority: item.authority || parentAuthority
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

//Promise延遲
function fakeDelay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export {
    isUrl,
    formatter,
    fakeDelay
}
