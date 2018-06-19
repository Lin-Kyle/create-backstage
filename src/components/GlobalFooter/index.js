import React, { Component } from 'react';
import {  Icon } from 'antd';
import styled from 'styled-components';


export default class GlobalFooter extends Component {
    render() {
        return (
           <GF>Copyright <Icon type="copyright" /> 2018 高朋网智能Bi系统</GF>
        )
    }
}

const GF = styled.div`
    padding: 0 16px;
    margin: 48px 0 24px 0;
    text-align: center;
`
