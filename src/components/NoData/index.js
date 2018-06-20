import React from 'react';
// TODO
const NoDate = (props) => {
    return <div style={{textAlign: 'center'}}>{ props.content ? props.content : '暂无数据'}</div>  
}

export default NoDate