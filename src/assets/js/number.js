import accounting from 'accounting';
const {formatNumber} = accounting,
    //金额格式，切割数字保留两位小数
    money = (val) => formatNumber(val, 2, ',', '.');

export {
    money
}
